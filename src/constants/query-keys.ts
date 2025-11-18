export const QUERY_KEYS = {
  ME: ["me"],
  QUALIFICATIONS: ["qualifications"],
  CONTACTS: ["contacts"],
  DOCUMENTS: ["documents"],
  EMPLOYEES: ["employees"],
  EMPLOYEE: (id: string) => ["employee", id],
  COMPANY_ADDITIONAL_DATA: (id: string) => ["company-additional-data", id],
  COMMISSIONS: ["commissions"],
};
