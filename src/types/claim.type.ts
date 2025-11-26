import { BaseType } from "./base.type";

export type Claim = BaseType & {
  type: string;
  amount: number;
  transactionDate: Date;
  monthToApply?: Date | null;
  fileName?: string;
  description?: string;
  emailTo: Array<string>;
};

export type ClaimWithNecessaryFields = Omit<
  Claim,
  "isActive" | "isArchived" | "createDateTime" | "lastChangedDateTime"
>;
