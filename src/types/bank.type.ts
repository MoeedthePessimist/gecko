import { BaseType } from "./base.type";

export type Bank = BaseType & {
  bankName?: string;
  bankSwiftCode?: string;
  bankAccountNumber?: string;
};

export type BankWithNecessaryFields = Omit<
  Bank,
  "isActive" | "isArchived" | "createDateTime" | "lastChangedDateTime"
>;
