import { z } from "zod";

export const qualificationFormSchema = z.object({
  nameOfInstitution: z.string().optional(),
  level: z.string().optional(),
  type: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  expiryDate: z.date().optional(),
  comment: z.string().optional(),
});

export type QualificationFormInputs = z.infer<typeof qualificationFormSchema>;
