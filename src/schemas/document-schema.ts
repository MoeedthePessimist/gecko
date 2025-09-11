import { z } from "zod";

export const documentFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional().default(""),
  category: z.string().optional().default(""),
  startDate: z.date().optional().default(new Date()),
  endDate: z.date().optional().default(new Date()),
  expiryDate: z.date().optional().default(new Date()),
  fileName: z.string().optional().default(""),
  remarks: z.string().optional().default(""),
});

export type DocumentFormInputs = z.infer<typeof documentFormSchema>;
