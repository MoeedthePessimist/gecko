import { weekDaysEnum } from "@/enums/week-days.enum";
import { workDayTypesEnum } from "@/enums/work-day-types.enum";

export type WorkingDay = {
  dayOfTheWeek: weekDaysEnum | string;
  workDayType: workDayTypesEnum | string;
  workStartTime: string;
  workEndTime: string;
  breakStartTime: string;
  breakEndTime: string;
};
