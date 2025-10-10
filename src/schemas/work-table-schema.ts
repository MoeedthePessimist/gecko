import { z } from "zod";
import { workingDaySchema } from "./working-day-schema";

export const workTableSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  dailyWorkingHours: z.number(),
  remarks: z.string(),
  workingDays: z.array(workingDaySchema),
});

export type WorkTableFormInputs = z.infer<typeof workTableSchema>;
