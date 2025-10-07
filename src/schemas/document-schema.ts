import { z } from "zod";

export const documentFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().nonempty("Please enter a title"),
  category: z.string().nonempty("Please enter a category"),
  startDate: z.date().optional().or(z.string().optional()).nullable(),
  endDate: z.date().optional().or(z.string().optional()).nullable(),
  expiryDate: z.date().optional().or(z.string().optional()).nullable(),
  fileName: z.string().optional(),
  remarks: z.string().optional(),
});

export type DocumentFormInputs = z.infer<typeof documentFormSchema>;
