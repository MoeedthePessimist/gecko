import { z } from "zod";

export const employeeSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const generalEmployeeInformationSchema = z.object({
  name: z.string().nonempty("Please enter employee name"),
  identityNumber: z.string().nonempty("Please enter employee identity number"),
  identityType: z.string().nonempty("Please select an identity type"),
  dateOfBirth: z.date(),
  gender: z.string().nonempty("Please select employee gender"),
  race: z.string().nonempty("Please select employee race"),
  mobileNumber: z.string().nonempty("Please enter a phone number"),
  email: z.string().email("Please enter a valid employee email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  repeatPassword: z.string(),
});

export type EmployeeFormInputs = z.infer<typeof employeeSchema>;
