export enum maritalStatusesEnum {
  SINGLE = "Single",
  MARRIED = "Married",
  DIVORCED = "Divorced",
  WIDOWED = "Widowed",
  SEPARATED = "Separated",
  REGISTERED_PARTNERSHIP = "Registered Partnership",
  CIVIL_UNION = "Civil Union",
  DOMESTIC_PARTNERSHIP = "Domestic Partnership",
  PREFER_NOT_TO_SAY = "Prefer not to say",
}

export const maritalStatusesList = Object.values(maritalStatusesEnum).sort(
  (a, b) => a.localeCompare(b)
);

export const maritalStatusesListWithCode = Object.entries(
  maritalStatusesEnum
).map(([_, name]) => ({
  code: name,
  name,
}));
