export enum weekDaysEnum {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export const weekDaysList = Object.values(weekDaysEnum).sort((a, b) =>
  a.localeCompare(b)
);

export const weekDaysListWithCode = Object.entries(weekDaysEnum).map(
  ([_, name]) => ({
    code: name,
    name,
  })
);
