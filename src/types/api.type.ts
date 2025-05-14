import { Company } from "./company.type";
import { User } from "./user.type";

export type LoginApiRequestType = {
  email: string;
  password: string;
};

export type LoginApiResponseType = {
  user: User;
  accessToken: string;
};

export type RegisterApiRequestType = {
  user: Pick<User, "name" | "email" | "password">;
  company: Pick<Company, "name" | "telephone" | "uen" | "entity" | "industry">;
};

export type RegisterApiResponseType = undefined;
