import { weekDaysEnum } from "@/enums/week-days.enum";
import { workDayTypesEnum } from "@/enums/work-day-types.enum";
import { WorkTable } from "./work-table.type";

export type WorkingDay = {
  dayOfTheWeek: weekDaysEnum;
  workDayType: workDayTypesEnum;
  workStartTime: string;
  workEndTime: string;
  breakStartTime: string;
  breakEndTime: string;
  workTable: WorkTable;
};
