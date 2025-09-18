import { z } from "zod";

export const leaveTableSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  leaveType: z.string(),
  workingYearFrom: z.number(),
  workingYearTo: z.number(),
  entitlement: z.number(),
  carryForward: z.number(),
});

export type LeaveTableFormInputs = z.infer<typeof leaveTableSchema>;
