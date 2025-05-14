export enum deductionTypesEnum {
  ADVANCE_PAY = 'Advance Pay',
  LOAN = 'Loan',
  CDAC_FUND = 'CDAC Fund',
  MBM_FUND = 'MBM Fund',
  SINDA_FUND = 'SINDA Fund',
  EC_FUND = 'EC Fund',
  DONATION = 'Donation',
}

export const deductionTypesList = Object.values(deductionTypesEnum).sort(
  (a, b) => a.localeCompare(b),
);
export const deductionTypesListWithCode = Object.entries(
  deductionTypesEnum,
).map(([code, name]) => ({
  code,
  name,
}));
