import { z } from "zod";
import { bankFormSchema } from "./bank-schema";
import { jobFormSchema } from "./job-schema";
import { employementFormSchema } from "./employement-schema";
import { qualificationFormSchema } from "./qualification-schema";
import { contactFormSchema } from "./contact-schema";
import { documentFormSchema } from "./document-schema";

export const accountFormSchema = z.object({
  name: z.string().nonempty("Please enter employee name").default(""),
  identityNumber: z
    .string()
    .nonempty("Please enter employee identity number")
    .default(""),
  identityType: z
    .string()
    .nonempty("Please select an identity type")
    .default(""),
  dateOfBirth: z.date().optional().default(new Date()),
  gender: z.string().nonempty("Please select employee gender").default(""),
  race: z.string().nonempty("Please select employee race").default(""),
  mobileNumber: z.string().nonempty("Please enter a phone number").default(""),
  email: z.string().email("Please enter a valid employee email").default(""),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .default(""),
  repeatPassword: z.string().default(""),
  optionalEmail: z.string().optional().default(""),
  allowLogin: z.boolean().default(false),
});

export const generalFormSchema = z.object({
  addresstype: z.string().optional().default(""),
  houseNo: z.string().optional().default(""),
  levelNo: z.string().optional().default(""),
  unitNo: z.string().optional().default(""),
  address: z.string().nonempty("Please enter employee address").default(""),
  city: z.string().optional().default(""),
  state: z.string().optional().default(""),
  country: z.string().optional().default(""),
  nationality: z.string().optional().default(""),
  maritalStatus: z.string().optional().default(""),
  role: z.string().nonempty("Please select employee role").default(""),
  homeTelephoneNumber: z.string().optional().default(""),
  workTelephoneNumber: z.string().optional().default(""),
  isNonResidentialDirector: z.boolean().default(false),
  bank: bankFormSchema,
});

export const settingFormSchema = z.object({
  cpfTable: z.string().optional().default(""),
  employerPaysCpf: z.boolean().optional().default(false),
  prEffectiveDate: z.date().optional().default(new Date()),
  cpfNo: z.string().optional().default(""),
  taxNo: z.string().optional().default(""),
  workTable: z.record(z.any()).default({}),
  leaveTable: z.record(z.any()).default({}),
  levy: z.record(z.any()).optional().default({}),
  noSdlContribution: z.boolean().optional().default(false),
  noShgContribution: z.boolean().optional().default(false),
  useAttendanceRecords: z.boolean().optional().default(false),
  maxPayToCalculate: z.number().optional().default(0),
  allowanceCommission: z.number().optional().default(0),
  allowanceErrorFee: z.number().optional().default(0),
  deductionCdac: z.number().optional().default(0),
  deductionEcf: z.number().optional().default(0),
  deductionMbmf: z.number().optional().default(0),
  deductionEcfSinda: z.number().optional().default(0),
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
