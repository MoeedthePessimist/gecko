import { z, ZodType } from "zod";
import { bankFormSchema } from "./bank-schema";
import { jobFormSchema } from "./job-schema";
import { employementFormSchema } from "./employement-schema";
import { qualificationFormSchema } from "./qualification-schema";
import { contactFormSchema } from "./contact-schema";
import { documentFormSchema } from "./document-schema";
import { workTableSchema } from "./work-table-schema";
import { leaveTableSchema } from "./leave-table-schema";
import { levySchema } from "./levy-schema";
import {
  CPF_NUMBER_REGEX,
  IDENTITY_NUMBER_REGEX,
  MOBILE_NUMBER_REGEX,
  PHONE_NUMBER_REGEX,
  TAX_NUMBER_REGEX,
} from "@/constants/regex";

export const accountFormSchema = (isUpdate?: boolean) =>
  z
    .object({
      name: z.string().nonempty("Please enter employee name"),
      identityNumber: z
        .string()
        .regex(IDENTITY_NUMBER_REGEX, "Please enter a valid identity number")
        .nonempty("Please enter employee identity number"),
      identityType: z.string().nonempty("Please select an identity type"),
      dateOfBirth: z.date().optional(),
      gender: z.string().nonempty("Please select employee gender"),
      race: z.string().nonempty("Please select employee race"),
      mobileNumber: z
        .string()
        .nonempty("Please enter a mobile number")
        .regex(
          MOBILE_NUMBER_REGEX,
          "Please enter a valid mobile number (Example: +923001234567, 447911123456)"
        ),
      email: z.string().email("Please enter a valid employee email"),
      password: isUpdate
        ? z.string().optional()
        : z.string().min(6, "Password must be at least 6 characters"),
      repeatPassword: z.string(),
      optionalEmail: z.string().optional(),
      allowLogin: z.boolean(),
      avatar: z.string().optional(),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: "Passwords do not match",
      path: ["repeatPassword"],
    });

export const generalFormSchema = (isUpdate?: boolean) =>
  z.object({
    addressType: z.string().optional(),
    houseNo: z.string().optional(),
    levelNo: z.string().optional(),
    unitNo: z.string().optional(),
    address: z.string().nonempty("Please enter employee address"),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    nationality: z.string().optional(),
    maritalStatus: z.string().optional(),
    role: z.string().nonempty("Please select employee role"),
    homeTelephoneNumber: z
      .string()
      .regex(
        PHONE_NUMBER_REGEX,
        "Please enter a valid telephone number (Example: +1 234-567-8901, (021) 3456789, 1234567890)"
      )
      .optional(),
    workTelephoneNumber: z
      .string()
      .regex(
        PHONE_NUMBER_REGEX,
        "Please enter a valid telephone number (Example: +1 234-567-8901, (021) 3456789, 1234567890)"
      )
      .optional(),
    isNonResidentialDirector: z.string().optional(),
    bank: bankFormSchema(isUpdate),
  });

export const settingFormSchema = z.object({
  cpfTable: z.string().optional(),
  employerPaysCpf: z.boolean().optional(),
  prEffectiveDate: z.date().optional(),
  cpfNo: z
    .string()
    .regex(
      CPF_NUMBER_REGEX,
      "Please enter a valid CPF number (Example: 123.456.789-09)"
    )
    .optional(),
  taxNo: z
    .string()
    .regex(
      TAX_NUMBER_REGEX,
      "Please enter a valid tax number (Example: AB123456C, 123456789012345)"
    )
    .optional(),
  workTable: workTableSchema.optional(),
  leaveTable: leaveTableSchema.optional(),
  levy: levySchema.optional(),
  noSdlContribution: z.boolean().optional(),
  noShgContribution: z.boolean().optional(),
  useAttendanceRecords: z.boolean().optional(),
  maxPayToCalculate: z.number().optional(),
  allowanceCommission: z.number().optional(),
  allowanceErrorFee: z.number().optional(),
  deductionCdac: z.number().optional(),
  deductionEcf: z.number().optional(),
  deductionMbmf: z.number().optional(),
  deductionEcfSinda: z.number().optional(),
});

export const employeeFormSchema = (isUpdate?: boolean): ZodType =>
  z.object({
    accountInfo: accountFormSchema(isUpdate),
    generalInfo: generalFormSchema(isUpdate),
    settingsInfo: settingFormSchema,
    jobInfo: jobFormSchema,
    employementInfo: employementFormSchema,
    qualificationsInfo: z.array(qualificationFormSchema),
    contactsInfo: z.array(contactFormSchema),
    documentsInfo: z.array(documentFormSchema),
  });

export type EmployeeFormInputs = z.infer<ReturnType<typeof employeeFormSchema>>;
export type SettingFormInputs = z.infer<typeof settingFormSchema>;
export type AccountFormInputs = z.infer<ReturnType<typeof accountFormSchema>>;
export type GeneralFormInputs = z.infer<ReturnType<typeof generalFormSchema>>;
