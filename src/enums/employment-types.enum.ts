export enum employmentTypesEnum {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACTOR = "CONTRACTOR",
  INTERN = "INTERN",
  TEMPORARY = "TEMPORARY",
  OTHER = "OTHER",
}

export const employmentTypesList = Object.values(employmentTypesEnum);

export const employmentTypesWithCode = Object.entries(employmentTypesEnum).map(
  ([code, name]) => ({
    code: name,
    name,
  })
);
