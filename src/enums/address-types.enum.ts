export enum addressTypesEnum {
  LOCAL_RESIDENTIAL_ADDRESS = "Local residential address",
  FOREIGN_ADDRESS = "Foreign address",
  LOCAL_CARE_OF_ADDRESS = "Local C/O address",
  NOT_AVAILABLE = "Not Available",
}

export const addressTypesList = Object.values(addressTypesEnum).sort((a, b) =>
  a.localeCompare(b)
);

export const addressTypesListWithCode = Object.entries(addressTypesEnum).map(
  ([_, name]) => ({
    code: name,
    name,
  })
);
