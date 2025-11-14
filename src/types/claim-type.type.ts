import { BaseType } from "./base.type";

export type ClaimType = BaseType & {
  id?: string;
  isActive?: boolean;
  isArchived?: boolean;
  createDateTime?: Date | null;
  lastChangedDateTime?: Date | null;
  name: string;
  remarks?: string;
};

export type ClaimTypeWithNecessaryFields = Omit<
  ClaimType,
  "isActive" | "isArchived" | "createDateTime" | "lastChangedDateTime"
>;
