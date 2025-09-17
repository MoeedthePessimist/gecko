import { BaseType } from "./base.type";

export type Document = BaseType & {
  title: string;
  category: string;
  startDate: Date | null;
  endDate: Date | null;
  expiryDate: Date | null;
  fileName: string;
  remarks: string;
};
export type DocumentWithNecessaryFields = Omit<
  Document,
  "isActive" | "isArchived" | "createDateTime" | "lastChangedDateTime"
>;
