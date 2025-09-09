import { Company } from "./company.type";
import { Qualification } from "./qualification.type";
import { User } from "./user.type";

type ApiResponseType<T> = {
  data: T;
  status: number;
  success: boolean;
};

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

export type MeApiResponseType = {
  user: User;
};

export type GetQualificationsApiResponseType = ApiResponseType<Qualification[]>;

export type CreateQualificationApiRequestType = Omit<
  Qualification,
  "id" | "isActive" | "isArchived" | "createDateTime" | "lastChangedDateTime"
>;

export type CreateQualificationApiResponseType = ApiResponseType<Qualification>;

export type UpdateQualificationApiRequestType =
  CreateQualificationApiRequestType & {
    id: string;
  };

export type UpdateQualificationApiResponseType = ApiResponseType<Qualification>;

export type DeleteQualificationApiResponseType = ApiResponseType<string>;
