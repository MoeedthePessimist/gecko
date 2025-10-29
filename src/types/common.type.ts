import { AxiosError } from "axios";

export type SelectOptionsType = {
  code: string;
  name: string;
};

export type AxiosErrorWithMessage = AxiosError<{ message: string }>;
