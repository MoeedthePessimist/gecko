// ['NRIC', 'FIN', 'Malaysian IC', 'Work Permit']

export enum identitiesEnum {
  NRIC = "NRIC",
  FIN = "FIN",
  MALAYSIAN_IC = "Malaysian IC",
  WORK_PERMIT = "Work Permit",
  PASSPORT = "Passport",
}

export const identitiesList = Object.values(identitiesEnum).sort((a, b) =>
  a.localeCompare(b)
);

export const identitiesListWithCode = Object.entries(identitiesEnum).map(
  ([_, name]) => ({
    code: name,
    name,
  })
);
