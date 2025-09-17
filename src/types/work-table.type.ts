import { BaseType } from "./base.type";
import { Company } from "./company.type";
import { WorkingDay } from "./working-day.type";

export type WorkTable = BaseType & {
  title: string;
  dailyWorkingHours: number;
  remarks: string;
  workingDays: WorkingDay[];
  company: Company;
};

export type WorkTableWithNecessaryFields = Omit<
  WorkTable,
  "isActive" | "isArchived" | "createDateTime" | "lastChangedDateTime"
>;
