import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const campusRouter = createTRPCRouter({
  getAllCampuses: publicProcedure.query(async () => {
    const campuses = await prisma.campus.findMany();
    return campuses;
  }),
});
