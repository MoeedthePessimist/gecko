import { z } from "zod";

export const qualificationFormSchema = z.object({
  id: z.string().optional(),
  nameOfInstitution: z.string().nonempty("Please enter the institute name"),
  level: z.string().nonempty("Please enter qualification level"),
  type: z.string().nonempty("Please enter qualification type"),
  startDate: z.date().optional().nullable(),
  endDate: z.date().optional().nullable(),
  expiryDate: z.date().optional().nullable(),
  comment: z.string().optional(),
});

export type QualificationFormInputs = z.infer<typeof qualificationFormSchema>;
