export enum workDayTypesEnum {
  FULL_DAY = "FULL_DAY",
  HALF_DAY = "HALF_DAY",
  NO_WORK = "NO_WORK",
}

export const workDayTypesList = Object.values(workDayTypesEnum).sort((a, b) =>
  a.localeCompare(b)
);

export const workDayTypesListWithCode = Object.entries(workDayTypesEnum).map(
  ([code, name]) => ({
    code: name,
    name,
  })
);
