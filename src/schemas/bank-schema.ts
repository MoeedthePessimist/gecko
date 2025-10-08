import { z } from "zod";

export const bankFormSchema = (isUpdate?: boolean) =>
  z.object({
    id: z.string().optional(),
    bankName: z.string().nonempty("Bank name is required"),
    bankSwiftCode: isUpdate
      ? z.string().optional()
      : z.string().nonempty("Bank swift code is required"),
    bankAccountNumber: isUpdate
      ? z.string().optional()
      : z.string().nonempty("Bank account number is required"),
  });

export type BankFormInputs = z.infer<ReturnType<typeof bankFormSchema>>;
