import { protectedProcedureAdmin } from "@/server/api/trpc";
import { z } from "zod";

const transferOwnershipZod = z.object({
  clubId: z.string(),
  userEmail: z.string(),
});

export const transferOwnership = protectedProcedureAdmin
  .input(transferOwnershipZod)
  .mutation(async ({ input, ctx }) => {
    const { clubId, userEmail } = input;
    const { prisma } = ctx;

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const club = await prisma.club.findUnique({
      where: {
        id: clubId,
      },
    });

    if (!club) {
      throw new Error("Club not found");
    }

    await prisma.club.update({
      where: {
        id: clubId,
      },
      data: {
        owner: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return true;
  });

const removeUserZod = z.object({
  email: z.string(),
});

export const removeUser = protectedProcedureAdmin.input(removeUserZod).mutation(async ({ input, ctx }) => {
    const { email } = input;
    const { prisma } = ctx;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await prisma.user.delete({
      where: {
        email,
      },
      include: {
        sessions: true,
        accounts: true,
      },
    });

    return true;
  });
