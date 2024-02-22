import checkCanEdit from "@/utils/checkCanEdit";
import { protectedProcedure, protectedProcedureEditorOwner } from "../../trpc";
import z from "zod";
import { prisma } from "@/server/db";

export const updateMenageTeamZod = z.object({
  clubId: z.string(),
  president: z.string(),
  vice_president: z.string(),
  secretary: z.string(),
  treasurer: z.string(),
});

export const updateMenageTeam = protectedProcedureEditorOwner
  .input(updateMenageTeamZod)
  .mutation(async ({ input, ctx }) => {
    if (!(await checkCanEdit(input.clubId, ctx.session.user.email!))) {
      throw new Error("You can't edit this club");
    }

    await prisma.club.update({
      where: {
        id: input.clubId,
      },
      data: {
        president:
          input.president.length > 0
            ? {
                connect: {
                  email: input.president,
                },
              }
            : {
                disconnect: true,
              },
        vice_president:
          input.vice_president.length > 0
            ? {
                connect: {
                  email: input.vice_president,
                },
              }
            : {
                disconnect: true,
              },
        secretary:
          input.secretary.length > 0
            ? {
                connect: {
                  email: input.secretary,
                },
              }
            : {
                disconnect: true,
              },
        treasurer:
          input.treasurer.length > 0
            ? {
                connect: {
                  email: input.treasurer,
                },
              }
            : {
                disconnect: true,
              },
      },
    });

    return;
  });
