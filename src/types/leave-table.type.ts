import { BaseType } from "./base.type";
import { Company } from "./company.type";

export type LeaveTable = BaseType & {
  title: string;
  description: string;
  leaveType: string;
  workingYearFrom: number;
  workingYearTo: number;
  entitlement: number;
  carryForward: number;
  company?: Company;
};

export type LeaveTableWithNecessaryFields = Omit<
  LeaveTable,
  "isActive" | "isArchived" | "createDateTime" | "lastChangedDateTime"
>;
