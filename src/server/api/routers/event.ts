import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import s3 from "@/services/s3";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@/env.mjs";
import constraintImage from "@/utils/constraintImage";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import _, { update } from "lodash";
import checkCanEdit from "@/utils/checkCanEdit";
import {
  createEvent,
  updateEvent,
  getEventCategorie,
  getEventTypes,
} from "@/services/eventService";

export const eventRouter = createTRPCRouter({
  createEvent: createEvent,
  updateEvent: updateEvent,
  getEventCategorie: getEventCategorie,
  getEventTypes: getEventTypes,
});
