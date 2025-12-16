import { AxiosError } from "axios";

export type SelectOptionsType = {
  code: string;
  name: string;
};

export type AxiosErrorWithMessage = AxiosError<{ message: string }>;

export type MultiSelectOptionType = {
  label: string;
  value: string;
};

export type CalendarEventType = {
  id: string | number;
  title: string;
  start: Date | string;
  end: Date | string;
  type: string;
};
