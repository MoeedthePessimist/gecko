import { z } from "zod";
import { bankFormSchema } from "./bank-schema";

export const companyFormSchema = (isUpdate?: boolean) =>
  z.object({
    name: z.string().nonempty("Company name is required"),
    entity: z.string().nonempty("Please select company entity"),
    industry: z.string().nonempty("Please select industry"),
    telephone: z.string().nonempty("Telephone number is required"),
    address: z.string().optional(),
    organizationIdType: z.string().optional(),
    csn: z.string().optional(),
    uen: z.string().nonempty("UEN is required"),
    logo: z.string().optional(),
    paidLeaves: z
      .number()
      .min(0, "Paid leaves must be a positive number")
      .default(24)
      .optional(),
    bank: bankFormSchema(isUpdate).optional(),
  });

export type CompanyFormInputs = z.infer<ReturnType<typeof companyFormSchema>>;
