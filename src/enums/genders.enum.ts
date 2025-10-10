// enum of genders
export enum gendersEnum {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
  PREFER_NOT_TO_SAY = "Prefer not to say",
}

export const gendersList = Object.values(gendersEnum).sort((a, b) =>
  a.localeCompare(b)
);

export const gendersListWithCode = Object.entries(gendersEnum).map(
  ([_, name]) => ({
    code: name,
    name,
  })
);
