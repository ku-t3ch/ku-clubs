import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedureAdmin,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const adminRouter = createTRPCRouter({
  getAllClubs: protectedProcedureAdmin.query(async () => {
    return (await prisma.club.findMany({
      include: {
        owner: true,
        likes: true, 
      },
    }));
  }),
  approveClub: protectedProcedureAdmin
    .input(z.object({ id: z.string(), approved: z.boolean() }))
    .mutation(async ({ input }) => {
      return await prisma.club.update({
        where: {
          id: input.id,
        },
        data: {
          approved: input.approved,
        },
      });
    }),
});
