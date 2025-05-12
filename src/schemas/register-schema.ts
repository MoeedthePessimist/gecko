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
  telephone: z.string().min(10, "Telephone number should be atleast 10 digits"),
  uen: z.string().nonempty("Please enter a registration number"),
  entity: z.string().nonempty("Please select a company entity"),
  industry: z.string().nonempty("Please select an industry type"),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export type UserRegisterFormInputs = z.infer<typeof userRegisterSchema>;
export type CompanyRegisterFormInputs = z.infer<typeof companyRegisterSchema>;
