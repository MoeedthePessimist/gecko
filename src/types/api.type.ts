import { EmployeeFormInputs } from "@/schemas/employee-schema";
import { Company } from "./company.type";
import { Contact } from "./contact.type";
import { Document } from "./document.type";
import { Qualification } from "./qualification.type";
import { User } from "./user.type";
import { SelectOptionsType } from "./common.type";
import { ClaimTypeWithNecessaryFields } from "./claim-type.type";
import { Claim, ClaimWithNecessaryFields } from "./claim.type";
import { Commission } from "./commission.type";
import { Leave, LeaveWithNecessaryFields } from "./leave.type";

type ApiResponseType<T> = {
  data: T;
  status: number;
  success: boolean;
};

/*
AUTH API TYPES
*/

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

/*
USER API TYPES
*/

export type MeApiResponseType = {
  user: User;
};

/*
QUALIFICATTION API TYPES
*/

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

/*
CONTACT API TYPES
*/
export type GetContactsApiResponseType = ApiResponseType<Contact[]>;

export type CreateContactApiRequestType = Omit<
  Contact,
  "id" | "isActive" | "isArchived" | "createDateTime" | "lastChangedDateTime"
>;

export type CreateContactApiResponseType = ApiResponseType<Contact>;

export type UpdateContactApiRequestType = CreateContactApiRequestType & {
  id: string;
};

export type UpdateContactApiResponseType = ApiResponseType<Contact>;

export type DeleteContactApiResponseType = ApiResponseType<string>;

/*
DOCUMENT API TYPES
*/
export type GetDocumentsApiResponseType = ApiResponseType<Document[]>;

export type CreateDocumentApiRequestType = Omit<
  Document,
  "id" | "isActive" | "isArchived" | "createDateTime" | "lastChangedDateTime"
>;

export type CreateDocumentApiResponseType = ApiResponseType<Document>;

export type UpdateDocumentApiRequestType = CreateDocumentApiRequestType & {
  id: string;
};

export type UpdateDocumentApiResponseType = ApiResponseType<Document>;

export type DeleteDocumentApiResponseType = ApiResponseType<string>;

/*
UPLOAD API TYPES
*/
export type UploadFileApiResponseType = ApiResponseType<{
  fileName: string;
  fileSize: string | number;
}>;

/**
 * EMPLOYEE API TYPES
 */
export type CreateEmployeeRequestType = EmployeeFormInputs;
export type CreateEmployeeResponseType = ApiResponseType<User>;

export type GetUsersResponseType = ApiResponseType<Array<User>>;
export type GetUserResponseType = ApiResponseType<User>;

export type DeleteEmployeeResponseType = ApiResponseType<string>;

export type UpdateEmployeeRequestType = EmployeeFormInputs & { id: string };
export type UpdateEmployeeResponseType = ApiResponseType<User>;

/**
 * COMPANY API TYPES
 */

export type GetCompanyAdditionalDataResponseType = ApiResponseType<{
  cpfTables: Array<SelectOptionsType>;
  workTables: Array<SelectOptionsType>;
  levies: Array<SelectOptionsType>;
  leaveTables: Array<SelectOptionsType>;
  jobCategories: Array<SelectOptionsType>;
  designations: Array<SelectOptionsType>;
  departments: Array<SelectOptionsType>;
  users: Array<SelectOptionsType>;
}>;

export type MutateCompanyAdditionalDataResponseType = ApiResponseType<Company>;
export type MutateCompanyAdditionalDataRequestType = {
  data: Company;
};

/**
 * CLAIM TYPE API TYPES
 */

export type GetClaimTypesResponse = ApiResponseType<
  Array<ClaimTypeWithNecessaryFields>
>;

/**
 * CLAIM API TYPES
 */

export type GetClaimsResponse = ApiResponseType<
  Array<ClaimWithNecessaryFields>
>;

export type MutateClaimRequest = ClaimWithNecessaryFields;
export type MutateClaimResponse = ApiResponseType<Claim>;

export type DeleteClaimResponse = ApiResponseType<boolean>;
/*
 * COMMISSION API TYPES
 */
export type GetCommissionDataResponseType = ApiResponseType<Array<Commission>>;

export type CreateCommissionRequestType = Commission;
export type CreateCommissionResponseType = ApiResponseType<Commission>;

export type UpdateCommissionRequestType = { id: string; data: Commission };
export type UpdateCommissionResponseType = ApiResponseType<Commission>;

export type DeleteCommissionResponseType = ApiResponseType<string>;

/**
 * LEAVE API TYPES
 */

export type GetLeavesResponseType = ApiResponseType<Array<Leave>>;

export type MutateleaveResponseType = ApiResponseType<Leave>;
export type MutateLeaveRequestType = LeaveWithNecessaryFields;

export type DeleteLeaveResponseType = ApiResponseType<string>;

export type ApproveLeaveResponseType = ApiResponseType<Leave>;

export type UserLeaveDetailsType = {
  totalLeavesTaken: number;
  leavesCarriedForward: number;
  user: User;
};

export type MutateGetUserLeaveDetailsResponseType =
  ApiResponseType<UserLeaveDetailsType>;

/**
 * DASHBOARD API
 */

export type GetAdminDashboardDataResponseType = ApiResponseType<{
  annualLeavesCount: number;
  medicalLeavesCount: number;
  claimsTotal: number;
  leaves: Array<LeaveWithNecessaryFields>;
}>;
