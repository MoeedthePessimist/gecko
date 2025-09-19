import { z } from "zod";

export const bankFormSchema = z.object({
  bankName: z.string(),
  bankSwiftCode: z.string(),
  bankAccountNumber: z.string(),
});

export type BankFormInputs = z.infer<typeof bankFormSchema>;
