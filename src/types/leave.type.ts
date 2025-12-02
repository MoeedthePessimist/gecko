import { BaseType } from "./base.type";

export type Leave = BaseType & {
  type: string;
  monthToApply?: Date | string | null;
  from: Date | string | null;
  to: Date | string | null;
  totalDays: number;
  file?: string;
  emailTo?: string[];
  remarks?: string;
  user: string;
};

export type LeaveWithNecessaryFields = Omit<
  Leave,
  "isActive" | "isArchived" | "createDateTime" | "lastChangedDateTime"
>;
