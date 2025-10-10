import { z } from "zod";

export const workingDaySchema = z.object({
  id: z.string().optional(),
  dayOfTheWeek: z.string(),
  workDayType: z.string(),
  workStartTime: z.string(), // you could use regex/time validation if needed
  workEndTime: z.string(),
  breakStartTime: z.string(),
  breakEndTime: z.string(),
});

export type WorkingDayFormInputs = z.infer<typeof workingDaySchema>;
