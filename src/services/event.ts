import { protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const getEvent = publicProcedure.query(({ ctx }) => {});

const createEventInputZod = z.object({
  name: z.string(),
  detail: z.string(),
  categories: z.array(z.string()),
  types: z.array(z.string()),
  clubId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  location: z
    .object({
      name: z.string(),
      position: z.string(),
      room: z.string(),
    })
    .optional(),
});

export const createEvent = protectedProcedure.input(createEventInputZod).mutation(({ ctx }) => {
  const { prisma, req, session } = ctx;
});

export const updateEvent = protectedProcedure.mutation(({ ctx }) => {});

export const removeEvent = protectedProcedure.mutation(({ ctx }) => {});
