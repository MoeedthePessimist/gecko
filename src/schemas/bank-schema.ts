import { z } from "zod";

export const bankFormSchema = z.object({
  bankName: z.string().optional().default(""),
  bankSwiftCode: z.string().optional().default(""),
  bankAccountNumber: z.string().optional().default(""),
});

export type BankFormInputs = z.infer<typeof bankFormSchema>;
