import { z } from "zod";

export const bankFormSchema = z.object({
  bankName: z.string().optional(),
  bankSwiftCode: z.string().optional(),
  bankAccountNumber: z.string().optional(),
});

export type BankFormInputs = z.infer<typeof bankFormSchema>;
