import { z } from "zod";
import { bankFormSchema } from "./bank-schema";
import {
  COMPANY_REGISTRATION_NUMBER_REGEX,
  PHONE_NUMBER_REGEX,
} from "@/constants/regex";

export const companyFormSchema = (isUpdate?: boolean) =>
  z.object({
    id: z.string().optional(),
    name: z.string().nonempty("Company name is required"),
    entity: z.string().nonempty("Please select company entity"),
    industry: z.string().nonempty("Please select industry"),
    telephone: z
      .string()
      .regex(
        PHONE_NUMBER_REGEX,
        "Please enter a valid telephone number (Example: +1 234-567-8901, (021) 3456789, 1234567890)"
      ),
    address: z.string().optional(),
    organizationIdType: z
      .string()
      .nonempty("Please select organization ID type"),
    csn: z.string().optional(),
    uen: z
      .string()
      .regex(
        COMPANY_REGISTRATION_NUMBER_REGEX,
        "Please enter a valid UEN number (Example: T08LL0001A, 12345678A)"
      )
      .nonempty("Please enter a registration number"),

    bank: bankFormSchema(isUpdate).optional(),
  });

export type CompanyFormInputs = z.infer<ReturnType<typeof companyFormSchema>>;
