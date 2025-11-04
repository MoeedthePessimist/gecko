import {
  COMPANY_REGISTRATION_NUMBER_REGEX,
  PHONE_NUMBER_REGEX,
} from "@/constants/regex";
import { z } from "zod";

export const userRegisterSchema = z
  .object({
    name: z.string().nonempty("Please enter a name"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const companyRegisterSchema = z.object({
  name: z.string().nonempty("Please enter a company name"),
  telephone: z
    .string()
    .regex(
      PHONE_NUMBER_REGEX,
      "Please enter a valid telephone number (Example: +1 234-567-8901, (021) 3456789, 1234567890)"
    ),
  uen: z
    .string()
    .regex(
      COMPANY_REGISTRATION_NUMBER_REGEX,
      "Please enter a valid UEN number (Example: T08LL0001A, 12345678A)"
    )
    .nonempty("Please enter a registration number"),
  entity: z.string().nonempty("Please select a company entity"),
  industry: z.string().nonempty("Please select an industry type"),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export type UserRegisterFormInputs = z.infer<typeof userRegisterSchema>;
export type CompanyRegisterFormInputs = z.infer<typeof companyRegisterSchema>;
