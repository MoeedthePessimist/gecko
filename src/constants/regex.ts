export const MOBILE_NUMBER_REGEX = /^\+?[1-9]\d{6,14}$/;
export const PHONE_NUMBER_REGEX =
  /^\+?[0-9]{1,4}?[-.\s]?(\(?\d{1,3}\)?[-.\s]?)*\d{3,4}[-.\s]?\d{3,4}$/;
export const IDENTITY_NUMBER_REGEX = /^[A-Z0-9]{5,20}$/;
export const BANK_ACCOUNT_NUMBER_REGEX = /^[A-Z0-9]{8,34}$/;
export const BANK_SWIFT_CODE_REGEX =
  /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
export const CPF_NUMBER_REGEX = /^\d{11}$/;
export const TAX_NUMBER_REGEX = /^[A-Z0-9]{8,15}$/;
// export const COMPANY_REGISTRATION_NUMBER_REGEX = /^[A-Z0-9]{8,20}$/;
export const COMPANY_REGISTRATION_NUMBER_REGEX =
  /^(?:\d{8}[A-Z]|[A-Z]{1,2}\d{2}\d{5}[A-Z])$/;
