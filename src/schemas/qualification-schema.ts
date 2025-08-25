import { z } from "zod";

export const qualificationFormSchema = z.object({
  nameOfInstitution: z.string().optional().default(""),
  level: z.string().optional().default(""),
  type: z.string().optional().default(""),
  startDate: z.date().optional().default(new Date()),
  endDate: z.date().optional().default(new Date()),
  expiryDate: z.date().optional().default(new Date()),
  comment: z.string().optional().default(""),
});

export type QualificationFormInputs = z.infer<typeof qualificationFormSchema>;
