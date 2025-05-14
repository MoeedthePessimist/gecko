export enum raceEnum {
  ASIAN = 'Asian',
  BLACK = 'Black',
  HISPANIC = 'Hispanic',
  NATIVE_AMERICAN = 'Native American',
  PACIFIC_ISLANDER = 'Pacific Islander',
  WHITE = 'White',
  OTHER = 'Other',
}

export const raceList = Object.values(raceEnum).sort((a, b) =>
  a.localeCompare(b),
);

export const raceListWithCode = Object.entries(raceEnum).map(
  ([code, name]) => ({
    code,
    name,
  }),
);
