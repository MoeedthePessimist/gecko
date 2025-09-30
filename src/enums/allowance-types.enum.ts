export enum allowanceCommissionTypesEnum {
  COMMISSION = "Commission",
  ERROR_FEE = "Error Fee",
}

export const allowanceCommissionTypesList = Object.values(
  allowanceCommissionTypesEnum
).sort((a, b) => a.localeCompare(b));

export const allowanceCommissionTypesWithCode = Object.entries(
  allowanceCommissionTypesEnum
).map(([code, name]) => ({
  code: name,
  name,
}));

export enum allowanceSpecialTypesEnum {
  ENTERTAINMENT = "Entertainment",
  TRANSPORTATION = "Transportation",
  BONUS = "Bonus",
  COMMISSION = "Commission",
  DIRECT_FEE = "Direct Fee",
  OTHERS = "Others",
}

export const allowanceSpecialTypesList = Object.values(
  allowanceSpecialTypesEnum
).sort((a, b) => a.localeCompare(b));

export const allowanceSpecialTypesWithCode = Object.entries(
  allowanceSpecialTypesEnum
).map(([code, name]) => ({
  code: name,
  name,
}));
