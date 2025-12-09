import { allowanceCommissionTypesEnum } from "@/enums/allowance-types.enum";
import { BaseType } from "./base.type";
import { applicationsStatusesEnum } from "@/enums/statuses.enum";
import { User } from "./user.type";
import { Company } from "./company.type";

export type Commission = BaseType & {
  name: allowanceCommissionTypesEnum;
  amount: number;
  date: Date;
  monthToApply: Date;
  status: applicationsStatusesEnum;
  remarks?: string;
  employee?: User;
  company?: Company;
};
