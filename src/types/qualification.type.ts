import { BaseType } from "./base.type";

export type Qualification = {
  nameOfInstitution: string;
  level: string;
  type: string;
  startDate?: Date | null | string;
  endDate?: Date | null | string;
  expiryDate?: Date | null | string;
  comment?: string;
} & BaseType;

export type QualificationWithNecessaryFields = Omit<
  Qualification,
  "isActive" | "isArchived" | "createDateTime" | "lastChangedDateTime"
>;
