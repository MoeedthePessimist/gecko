export enum wageTypesEnum {
  ORDINARY_WAGE = 'Ordinary Wage',
  ADDITIONAL_WAGE = 'Additional Wage',
}

export const wageTypesList = Object.values(wageTypesEnum).sort((a, b) =>
  a.localeCompare(b),
);

export const wageTypesWithCode = Object.entries(wageTypesEnum).map(
  ([code, name]) => ({
    code,
    name,
  }),
);
