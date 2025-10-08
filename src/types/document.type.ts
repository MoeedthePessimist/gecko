import { BaseType } from "./base.type";

export type Document = BaseType & {
  title: string;
  category: string;
  startDate?: Date | null | string;
  endDate?: Date | null | string;
  expiryDate?: Date | null | string;
  fileName?: string;
  remarks?: string;
};
export type DocumentWithNecessaryFields = Omit<
  Document,
  "isActive" | "isArchived" | "createDateTime" | "lastChangedDateTime"
>;
