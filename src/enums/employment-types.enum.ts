export enum employmentTypesEnum {
  FULL_TIME = "Full Time",
  PART_TIME = "Part Time",
  CONTRACTOR = "Contractor",
  INTERN = "Intern",
  TEMPORARY = "Temporary",
  OTHER = "Other",
}

export const employmentTypesList = Object.values(employmentTypesEnum);

export const employmentTypesWithCode = Object.entries(employmentTypesEnum).map(
  ([_, name]) => ({
    code: name,
    name,
  })
);
