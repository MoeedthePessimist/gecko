import { BaseType } from "./base.type";

export type Qualification = {
  nameOfInstitution: string;
  level: string;
  type: string;
  startDate: Date | null;
  endDate: Date | null;
  expiryDate: Date | null;
  comment?: string;
} & BaseType;
