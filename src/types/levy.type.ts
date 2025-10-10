import { BaseType } from "./base.type";

export type Levy = BaseType & {
  sector: string;
  skillLevel: string;
  quotaTier?: string;
  levyAmount: number;
  effectiveDate: Date;
  expiryDate: Date;
};
export type LevyWithNecessaryFields = Omit<
  Levy,
  "isActive" | "isArchived" | "createDateTime" | "lastChangedDateTime"
>;
