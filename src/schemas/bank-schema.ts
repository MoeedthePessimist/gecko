import {
  BANK_ACCOUNT_NUMBER_REGEX,
  BANK_SWIFT_CODE_REGEX,
} from "@/constants/regex";
import { z } from "zod";

export const bankFormSchema = (isUpdate?: boolean) =>
  z.object({
    id: z.string().optional(),
    bankName: z.string().nonempty("Bank name is required"),
    bankSwiftCode: isUpdate
      ? z
          .string()
          .regex(BANK_SWIFT_CODE_REGEX, "Please enter a valid bank swift code")
          .optional()
      : z
          .string()
          .regex(BANK_SWIFT_CODE_REGEX, "Please enter a valid bank swift code")
          .nonempty("Bank swift code is required"),
    bankAccountNumber: isUpdate
      ? z
          .string()
          .regex(
            BANK_ACCOUNT_NUMBER_REGEX,
            "Please enter a valid bank account number"
          )
          .optional()
      : z
          .string()
          .regex(
            BANK_ACCOUNT_NUMBER_REGEX,
            "Please enter a valid bank account number"
          )
          .nonempty("Bank account number is required"),
  });

export type BankFormInputs = z.infer<ReturnType<typeof bankFormSchema>>;
