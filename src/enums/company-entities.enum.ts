export enum companyEntitiesEnum {
  SOLE_PROPRIETORSHIP = "Sole Proprietorship",
  PARTNERSHIP = "Partnership",
  LIMITED_LIABILITY_PARTNERSHIP = "Limited Liability Partnership (LLP)",
  PRIVATE_LIMITED_COMPANY = "Private Limited Company (Pte Ltd)",
  PUBLIC_LIMITED_COMPANY = "Public Limited Company (PLC)",
  LIMITED_LIABILITY_COMPANY = "Limited Liability Company (LLC)",
  CORPORATION = "Corporation (Inc.)",
  NON_PROFIT_ORGANIZATION = "Non-Profit Organization",
  COOPERATIVE = "Cooperative",
  GOVERNMENT_AGENCY = "Government Agency",
  BRANCH_OFFICE = "Branch Office",
  SUBSIDIARY = "Subsidiary",
  ASSOCIATION = "Association",
  TRUST = "Trust",
  OTHER = "Other",
}

export const companyEntitiesList = Object.values(companyEntitiesEnum).sort(
  (a, b) => a.localeCompare(b)
);
export const companyEntitiesListWithCode = Object.entries(
  companyEntitiesEnum
).map(([_, name]) => ({
  code: name,
  name,
}));
