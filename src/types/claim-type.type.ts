import { BaseType } from "./base.type";

export type ClaimType = BaseType & {
  name: string;
  remarks?: string;
};

export type ClaimTypeWithNecessaryFields = Omit<
  ClaimType,
  "isActive" | "isArchived" | "createDateTime" | "lastChangedDateTime"
>;
