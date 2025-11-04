import { BaseType } from "./base.type";
import { CompanyWithNecessaryFields } from "./company.type";

export type CpfTable = BaseType & {
  title: string;
  description: string;
  company?: CompanyWithNecessaryFields | string | null;
};

export type CpfTableWithNecessaryFields = Omit<
  CpfTable,
  "isActive" | "isArchived" | "createDateTime" | "lastChangedDateTime"
>;
