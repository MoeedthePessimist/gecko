import { z } from "zod";

export const documentFormSchema = z.object({
  title: z.string().optional(),
  category: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  expiryDate: z.date().optional(),
  fileName: z.string().optional(),
  remarks: z.string().optional(),
});

export type DocumentFormInputs = z.infer<typeof documentFormSchema>;
