import { z } from "zod";

export const qualificationFormSchema = z.object({
  id: z.string().optional(),
  nameOfInstitution: z.string().optional().default(""),
  level: z.string().optional().default(""),
  type: z.string().optional().default(""),
  startDate: z.date().optional().default(new Date()).nullable(),
  endDate: z.date().optional().default(new Date()).nullable(),
  expiryDate: z.date().optional().default(new Date()).nullable(),
  comment: z.string().optional(),
});

export type QualificationFormInputs = z.infer<typeof qualificationFormSchema>;
