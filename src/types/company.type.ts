import { BaseType } from "./base.type";
import { companyEntitiesEnum } from "@/enums/company-entities.enum";
import { industriesEnum } from "@/enums/industries.enum";
import { organizationIdTypesEnum } from "@/enums/organization-id-types.enum";
import { User } from "./user.type";
import { BankWithNecessaryFields } from "./bank.type";

export type Company = BaseType & {
  name: string;
  entity: companyEntitiesEnum | string;
  industry: industriesEnum | string;
  telephone: string;
  address?: string;
  organizationIdType: organizationIdTypesEnum | string;
  csn?: string;
  uen: string;
  users?: string[] | User[];
  allowances?: string[];
  claims?: string[];
  claimTypes?: string[];
  commissions?: string[];
  deductions?: string[];
  departments?: string[];
  designations?: string[];
  holidays?: string[];
  workTables?: string[];
  jobCategories?: string[];
  leaves?: string[];
  leaveTables?: string[];
  overtimes?: string[];
  payslips?: string[];
  resignations?: string[];
  terminationsTypes?: string[];
  paidLeaves?: number;
  bank?: string | BankWithNecessaryFields;
  logo?: string;
};

export type CompanyWithNecessaryFields = Omit<
  Company,
  "isActive" | "isArchived" | "createDateTime" | "lastChangedDateTime"
>;
