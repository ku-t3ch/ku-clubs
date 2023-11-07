import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const clubtypeRouter = createTRPCRouter({
  getAllClubTypes: publicProcedure.query(async () => {
    const clubTypes = await prisma.clubType.findMany();
    return clubTypes;
  }),
});
