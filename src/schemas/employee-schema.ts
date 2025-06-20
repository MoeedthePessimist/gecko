import { z } from "zod";
import { bankFormSchema } from "./bank-schema";
import { jobFormSchema } from "./job-schema";
import { employementFormSchema } from "./employement-schema";
import { qualificationFormSchema } from "./qualification-schema";
import { contactFormSchema } from "./contact-schema";
import { documentFormSchema } from "./document-schema";

export const accountFormSchema = z.object({
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

export const generalFormSchema = z.object({
  addresstype: z.string().optional(),
  address: z.string().nonempty("Please enter employee address"),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  nationality: z.string().optional(),
  maritalStatus: z.string().optional(),
  bank: bankFormSchema,
});

export const settingFormSchema = z.object({
  cpfTable: z.string().optional(),
  cpfNo: z.string().optional(),
  taxNo: z.string().optional(),
  workTable: z.string().nonempty("Please select employee work table"),
  leaveTable: z.string().nonempty("Please select employee leave table"),
});

export const employeeFormSchema = z.object({
  accountInfo: accountFormSchema,
  generalInfo: generalFormSchema,
  settingsInfo: settingFormSchema,
  jobInfo: jobFormSchema,
  employementInfo: employementFormSchema,
  qualificationsInfo: z.array(qualificationFormSchema),
  contactsInfo: z.array(contactFormSchema),
  documentsInfo: z.array(documentFormSchema),
});

export type EmployeeFormInputs = z.infer<typeof employeeFormSchema>;
export type SettingFormInputs = z.infer<typeof settingFormSchema>;
export type AccountFormInputs = z.infer<typeof accountFormSchema>;
export type GeneralFormInputs = z.infer<typeof generalFormSchema>;
