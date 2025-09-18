import { z } from "zod";

export const levySchema = z.object({
  id: z.string().optional(),
  sector: z.string(),
  skillLevel: z.string(),
  quotaTier: z.string().optional(),
  levyAmount: z.number(),
  effectiveDate: z.date(),
  expiryDate: z.date(),
});

export type LevyFormInputs = z.infer<typeof levySchema>;
