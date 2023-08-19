import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import s3 from "@/services/s3";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@/env.mjs";
import constraintImage from "@/utils/constraintImage";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

        const result = await s3.send(
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
          },
        });
        return "OK";
      } catch (error: any) {
        throw new Error(error.message);
      }
    }),
});
