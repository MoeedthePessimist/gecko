export enum payBasisEnum {
  HOURLY = 'Hourly',
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly',
}

export const payBasisList = Object.values(payBasisEnum).sort((a, b) =>
  a.localeCompare(b),
);

export const payBasisListWithCode = Object.entries(payBasisEnum).map(
  ([code, name]) => ({
    code,
    name,
  }),
);
