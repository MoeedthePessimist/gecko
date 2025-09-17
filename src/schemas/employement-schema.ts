import { z } from "zod";

export const employementFormSchema = z.object({
  id: z.string().optional(),
  department: z.string().optional().default(""),
  employmentType: z.string().optional().default(""),
  status: z.string().optional().default(""),
  dateJoined: z.date().default(new Date()),
  dateLeft: z.date().optional().default(new Date()),
  probationFrom: z.date().optional().default(new Date()),
  probationTo: z.date().optional().default(new Date()),
});

export type EmployementFormInputs = z.infer<typeof employementFormSchema>;
