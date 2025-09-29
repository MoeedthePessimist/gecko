import { z } from "zod";
import { accountFormSchema } from "./employee-schema";

export const employementFormSchema = z.object({
  id: z.string().optional(),
  department: z.string().optional(),
  employmentType: z.string().optional(),
  status: z.string().optional(),
  dateJoined: z.date().or(z.string().optional()),
  dateLeft: z.date().optional().or(z.string().optional()),
  probationFrom: z.date().optional().or(z.string().optional()),
  probationTo: z.date().optional().or(z.string().optional()),
  directManager: z.string().optional(),
});

export type EmployementFormInputs = z.infer<typeof employementFormSchema>;
