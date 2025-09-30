import { z } from "zod";

export const bankFormSchema = z.object({
  id: z.string().optional(),
  bankName: z.string().nonempty("Bank name is required"),
  bankSwiftCode: z.string().nonempty("Bank swift code is required"),
  bankAccountNumber: z.string().nonempty("Bank account number is required"),
});

export type BankFormInputs = z.infer<typeof bankFormSchema>;
