import { employmentTypesEnum } from "@/enums/employment-types.enum";
import { employeeStatusesEnum } from "@/enums/statuses.enum";
import { BaseType } from "./base.type";

export type Employment = BaseType & {
  department?: string;
  employmentType?: employmentTypesEnum | string;
  status?: employeeStatusesEnum | string;
  dateJoined: Date;
  dateLeft?: Date | null;
  probationFrom?: Date | null;
  probationTo?: Date | null;
  directManager?: string;
};

export type EmploymentWithNecessaryFields = Omit<
  Employment,
  "isActive" | "isArchived" | "createDateTime" | "lastChangedDateTime"
>;
