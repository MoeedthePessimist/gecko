import { z } from "zod";
import { accountFormSchema } from "./employee-schema";

export const employementFormSchema = z.object({
  id: z.string().optional(),
  department: z.string().optional(),
  employmentType: z.string().optional(),
  status: z.string().optional(),
  dateJoined: z.date(),
  dateLeft: z.date().optional(),
  probationFrom: z.date().optional(),
  probationTo: z.date().optional(),
  directManager: z.string().optional(),
});

export type EmployementFormInputs = z.infer<typeof employementFormSchema>;
