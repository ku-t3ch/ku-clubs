import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import s3 from "@/services/s3";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@/env.mjs";
import constraintImage from "@/utils/constraintImage";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import _ from "lodash";

export const clubRouter = createTRPCRouter({
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
    const clubs = await prisma.club.findMany({
      where: {
        owner: {
          email: ctx.session.user.email!,
        },
      },
    });

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
      console.log(input);

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

      if (owner?.owner.email !== ctx.session.user.email) {
        throw new Error("You are not owner");
      }

      const clubBucket = env.S3_ENV_TYPE === "development" ? "ku-clubs-development" : "ku-clubs";

      const logoBase64 = input.logo.split(",")[1];

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
});
