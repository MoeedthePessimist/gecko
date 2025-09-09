import { BaseType } from "./base.type";

export type Contact = BaseType & {
  name: string;
  relation: string;
  gender: string;
  mobileNumber: string;
  email: string;
  homeTelephoneNumber: string;
  workTelephoneNumber: string;
};
