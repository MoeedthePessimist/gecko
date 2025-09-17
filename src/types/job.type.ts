import { payBasisEnum } from "@/enums/pay-basis.enum";

export type Job = {
  title?: string;
  jobCategory?: string;
  designation?: string;
  basicRate?: number;
  payBasis?: payBasisEnum | string;
  startDate?: Date | null;
  endDate?: Date | null;
};

export type JobWithNecessaryFields = Omit<
  Job,
  "isActive" | "isArchived" | "createDateTime" | "lastChangedDateTime"
>;
