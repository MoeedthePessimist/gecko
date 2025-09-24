export const QUERY_KEYS = {
  ME: ["me"],
  QUALIFICATIONS: ["qualifications"],
  CONTACTS: ["contacts"],
  DOCUMENTS: ["documents"],
  EMPLOYEES: ["employees"],
  EMPLOYEE: (id: string) => ["employee", id],
};
