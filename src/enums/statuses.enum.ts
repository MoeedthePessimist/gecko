export enum employeeStatusesEnum {
  EXISTING_EMPLOYEE = "Existing Employee",
  LEAVER = "Leaver",
  NEW_JOINER = "New Joiner",
  JOIN_AND_LEAVE_IN_SAME_MONTH = "Join and Leave in Same Month",
}

export const employeeStatusesList = Object.values(employeeStatusesEnum).sort(
  (a, b) => a.localeCompare(b)
);

export const employeeStatusesListWithCode = Object.entries(
  employeeStatusesEnum
).map(([_, name]) => ({
  code: name,
  name,
}));

export enum applicationsStatusesEnum {
  PENDING = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected",
  CANCELLED = "Cancelled",
}

export const allowanceCommissionStatusesList = Object.values(
  applicationsStatusesEnum
).sort((a, b) => a.localeCompare(b));

export const allowanceCommissionStatusesListWithCode = Object.entries(
  applicationsStatusesEnum
).map(([code, name]) => ({
  code,
  name,
}));

export enum todoStatusesEnum {
  PENDING = "Pending",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export const todoStatusesList = Object.values(todoStatusesEnum).sort((a, b) =>
  a.localeCompare(b)
);

export const todoStatusesListWithCode = Object.entries(todoStatusesEnum).map(
  ([_, name]) => ({
    code: name,
    name,
  })
);
