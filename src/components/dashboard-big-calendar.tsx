"use client";

import { useState } from "react";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEventType } from "@/types/common.type";
import { eventColors } from "@/constants/event-colors";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type DashboardCalendarType = {
  events: Array<CalendarEventType>;
};

const DashboardCalendar: React.FC<DashboardCalendarType> = ({ events }) => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>("month");

  const eventPropGetter = (event: CalendarEventType) => ({
    style: {
      backgroundColor: eventColors[event.type],
      color: "#000",
      borderRadius: "8px",
      padding: "2px 4px",
      border: "none",
      fontSize: "12px",
      fontWeight: 600,
    },
  });

  return (
    <div className="h-[700px] bg-white rounded-xl p-6 shadow">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventPropGetter}
        views={["month", "week", "day"]}
        date={date}
        view={view}
        onNavigate={(newDate) => setDate(newDate)}
        onView={(newView) => setView(newView)}
      />
    </div>
  );
};

export default DashboardCalendar;
