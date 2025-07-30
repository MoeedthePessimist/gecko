import { z } from "zod";

export const employementFormSchema = z.object({
  department: z.string().optional(),
  employmentType: z.string().optional(),
  status: z.string().optional(),
  directManager: z.record(z.any()),
  dateJoined: z.date(),
  dateLeft: z.date().optional(),
  probationFrom: z.date().optional(),
  probationTo: z.date().optional(),
});

export type EmployementFormInputs = z.infer<typeof employementFormSchema>;
