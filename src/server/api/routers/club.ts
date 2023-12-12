import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import s3 from "@/services/s3";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@/env.mjs";
import constraintImage from "@/utils/constraintImage";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import _ from "lodash";
import checkCanEdit from "@/utils/checkCanEdit";

export const clubRouter = createTRPCRouter({
  getAllClubs: publicProcedure
    .input(z.object({ search: z.string().optional() }).optional())
    .mutation(async ({ input }) => {
      const clubs = await prisma.club.findMany({
        where: {
          isPublic: true,
          approved: true,
          showOnIndex: true,
          OR: [
            {
              name: {
                contains: input?.search ? input?.search : "",
                mode: "insensitive",
              },
            },
          ],
        },
        select: {
          name: true,
          logo: true,
          views: true,
          id: true,
          campus: {
            select: {
              name: true,
            },
          },
          likes: {
            select: {
              id: true,
            },
          },
        },
      });

      return clubs.map((club) => ({ ...club, likes: club.likes.length }));
    }),
  addClub: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        detail: z.string(),
        campusId: z.string(),
        clubType: z.array(z.string()),
        logo: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const club = await prisma.club.findMany({
        where: {
          name: input.name,
        },
      });

      if (club.length > 0) {
        throw new Error("Club already exists");
      }

      try {
        const clubBucket = env.S3_ENV_TYPE === "development" ? "ku-clubs-development" : "ku-clubs";

        const logoBase64 = input.logo.split(",")[1];
        const logoKeyPath = `${uuidv4()}.png`;

        await s3.send(
          new PutObjectCommand({
            Bucket: clubBucket,
            Key: `logo/${logoKeyPath}`,
            Body: await constraintImage(Buffer.from(logoBase64!, "base64"), 500, 500),
          })
        );

        const url = await getSignedUrl(
          s3,
          new GetObjectCommand({
            Bucket: clubBucket,
            Key: `logo/${logoKeyPath}`,
          })
        );

        const logoUrl = url.split("?")[0];

        await prisma.club.create({
          data: {
            name: input.name,
            detail: input.detail,
            logo: logoUrl as string,
            owner: {
              connect: {
                email: ctx.session.user.email!,
              },
            },
            campus: {
              connect: {
                id: input.campusId,
              },
            },
            type: {
              connect: input.clubType.map((type) => ({
                id: type,
              })),
            },
          },
        });
        return "OK";
      } catch (error: any) {
        throw new Error(error.message);
      }
    }),
  getMyClubs: protectedProcedure.query(async ({ ctx }) => {
    let clubs = await prisma.club.findMany({
      where: {
        owner: {
          email: ctx.session.user.email!,
        },
      },
    });
    clubs = [
      ...clubs,
      ...(await prisma.club.findMany({
        where: {
          editor: {
            some: {
              email: ctx.session.user.email!,
            },
          },
        },
      })),
    ];

    return clubs;
  }),
  deleteClub: protectedProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const owner = await prisma.club.findUnique({
      where: {
        id: input,
      },
      select: {
        owner: {
          select: {
            email: true,
          },
        },
        logo: true,
      },
    });

    if (!owner) {
      throw new Error("Club not found");
    }

    if (owner?.owner.email !== ctx.session.user.email) {
      throw new Error("You are not owner");
    }

    const clubBucket = env.S3_ENV_TYPE === "development" ? "ku-clubs-development" : "ku-clubs";

    await s3.send(
      new PutObjectCommand({
        Bucket: clubBucket,
        Key: owner.logo.split(clubBucket)[1],
      })
    );

    await prisma.club.delete({
      where: {
        id: input,
      },
    });

    return "OK";
  }),
  updateClub: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        detail: z.string(),
        campusId: z.string(),
        clubType: z.array(z.string()),
        logo: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const owner = await prisma.club.findUnique({
        where: {
          id: input.id,
        },
        select: {
          owner: {
            select: {
              email: true,
            },
          },
          logo: true,
        },
      });

      if (!owner) {
        throw new Error("Club not found");
      }

      if (!(await checkCanEdit(input.id, ctx.session.user.email!))) {
        throw new Error("You can't edit this club");
      }

      const clubBucket = env.S3_ENV_TYPE === "development" ? "ku-clubs-development" : "ku-clubs";

      const logoBase64 = input.logo.split(",")[1];

      try {
        await s3.send(
          new PutObjectCommand({
            Bucket: clubBucket,
            Key: owner.logo.split(clubBucket)[1],
            Body: await constraintImage(Buffer.from(logoBase64!, "base64"), 500, 500),
          })
        );

        await prisma.club.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            detail: input.detail,
            campus: {
              connect: {
                id: input.campusId,
              },
            },
            type: {
              connect: input.clubType.map((type) => ({
                id: type,
              })),
            },
          },
        });

        return "OK";
      } catch (error: any) {
        console.log(error.message);
        throw new Error("Something went wrong");
      }
    }),
  settingEditor: protectedProcedure
    .input(z.object({ id: z.string(), emailList: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      const checkOwner = await ctx.prisma.club.findUnique({
        where: {
          id: input.id,
        },
        select: {
          owner: {
            select: {
              email: true,
            },
          },
          editor: true,
        },
      });

      if (!checkOwner) {
        throw new Error("you are not owner");
      }

      const allUser = await prisma.user.findMany();

      const isIntersect = _.intersectionWith(
        allUser.map((e) => e.email),
        input.emailList,
        _.isEqual
      );

      if (isIntersect.length !== input.emailList.length) {
        const complement = _.differenceWith(
          input.emailList,
          allUser.map((e) => e.email),
          _.isEqual
        );
        throw new Error(`[${complement.join(",")}] not found`);
      }

      const club = await ctx.prisma.club.update({
        where: {
          id: input.id,
        },
        data: {
          editor: {
            set: input.emailList.map((email) => ({
              email,
            })),
          },
        },
      });
      return club;
    }),
  settingClub: protectedProcedure
    .input(z.object({ id: z.string(), isPublic: z.boolean(), showOnIndex: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const checkOwner = await ctx.prisma.club.findUnique({
        where: {
          id: input.id,
        },
        select: {
          owner: {
            select: {
              email: true,
            },
          },
        },
      });

      if (!checkOwner) {
        throw new Error("you are not owner");
      }

      const club = await ctx.prisma.club.update({
        where: {
          id: input.id,
        },
        data: {
          isPublic: input.isPublic,
          showOnIndex: input.showOnIndex,
        },
      });
      return club;
    }),
  likeClub: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const isLiked = await prisma.club.findUnique({
        where: {
          id: input.id,
        },
        select: {
          likes: {
            where: {
              email: ctx.session.user.email!,
            },
          },
        },
      });

      if (isLiked?.likes.length !== 0) {
        await prisma.club.update({
          where: {
            id: input.id,
          },
          data: {
            likes: {
              disconnect: {
                email: ctx.session.user.email!,
              },
            },
          },
        });
      } else {
        await prisma.club.update({
          where: {
            id: input.id,
          },
          data: {
            likes: {
              connect: {
                email: ctx.session.user.email!,
              },
            },
          },
        });
      }
    }),
  getLikeAmount: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const club = await prisma.club.findUnique({
      where: {
        id: input,
      },
      select: {
        likes: {
          select: {
            id: true,
          },
        },
      },
    });

    return club?.likes.length;
  }),
});
