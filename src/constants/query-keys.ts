export const QUERY_KEYS = {
  ME: ["me"],
  QUALIFICATIONS: ["qualifications"],
  CONTACTS: ["contacts"],
  DOCUMENTS: ["documents"],
  USERS: (query: string) => ["employees", query],
  EMPLOYEE: (id: string) => ["employee", id],
  COMPANY_ADDITIONAL_DATA: (id: string) => ["company-additional-data", id],
  CLAIM_TYPES: (id: string) => ["claim-types", id],
  CLAIMS: (id: string) => ["claims", id],
  COMMISSIONS: ["commissions"],
};
