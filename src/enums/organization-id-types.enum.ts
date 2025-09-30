export enum organizationIdTypesEnum {
  REGISTRATION_NUMBER = "Registration Number",
  BUSINESS_LICENSE = "Business License",
  TAX_IDENTIFICATION_NUMBER = "Tax Identification Number (TIN)",
  EMPLOYER_IDENTIFICATION_NUMBER = "Employer Identification Number (EIN)",
  COMPANY_REGISTRATION_NUMBER = "Company Registration Number (CRN)",
  VAT_NUMBER = "VAT Number",
  UEN = "Unique Entity Number (UEN)",
  DUNS_NUMBER = "D-U-N-S Number",
  TRADE_LICENSE = "Trade License",
  NATIONAL_ID = "National ID",
  PASSPORT_NUMBER = "Passport Number",
  OTHER = "Other",
}

export const organizationIdTypesList = Object.values(
  organizationIdTypesEnum
).sort((a, b) => a.localeCompare(b));

export const organizationIdTypesListWithCode = Object.entries(
  organizationIdTypesEnum
).map(([code, name]) => ({
  code: name,
  name,
}));
