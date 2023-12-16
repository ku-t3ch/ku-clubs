import { z } from "zod";
import { createTRPCRouter, protectedProcedureAdmin } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { transferOwnership } from "@/services/clubService";

export const adminRouter = createTRPCRouter({
  getAllClubs: protectedProcedureAdmin.query(async () => {
    return await prisma.club.findMany({
      include: {
        owner: true,
        likes: true,
      },
    });
  }),
  transferOwnership: transferOwnership,
  getAllUsers: protectedProcedureAdmin.query(async () => {
    return await prisma.user.findMany();
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
  removeClub: protectedProcedureAdmin
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.club.delete({
        where: {
          id: input.id,
        },
      });
    }),
  addAdmin: protectedProcedureAdmin
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.user.update({
        where: {
          email: input.email,
        },
        data: {
          isAdmin: true,
        },
      });
    }),
  getAllAdmins: protectedProcedureAdmin.query(async () => {
    return await prisma.user.findMany({
      where: {
        isAdmin: true,
      },
    });
  }),
  removeAdmin: protectedProcedureAdmin
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const checkIsSelf = await prisma.user.findFirst({
        where: {
          email: input.email,
          isAdmin: true,
        },
      });

      if (!checkIsSelf) {
        throw new Error("User is not an admin");
      }

      if (checkIsSelf?.email === ctx.session.user.email) {
        throw new Error("Cannot remove yourself as admin");
      }

      return await prisma.user.update({
        where: {
          email: input.email,
        },
        data: {
          isAdmin: false,
        },
      });
    }),
});
