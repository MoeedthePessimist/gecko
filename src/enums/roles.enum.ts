export enum rolesEnum {
  ADMIN = 'Admin',
  EMPLOYEE = 'Employee',
}

export const rolesList = Object.values(rolesEnum).sort((a, b) =>
  a.localeCompare(b),
);

export const rolesListWithCode = Object.entries(rolesEnum).map(
  ([code, name]) => ({
    code,
    name,
  }),
);
