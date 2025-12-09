"use client";

import DashboardCalendar from "@/components/dashboard-big-calendar";
import AccumulationCard from "@/components/dashboard-cards/accumulation-card";
import LeaveCard from "@/components/dashboard-cards/leave-card";
import { Card } from "@/components/ui/card";
import { CalendarEventType } from "@/types/common.type";
import React from "react";

const events: CalendarEventType[] = [
  {
    id: "1",
    title: "Sick Leave - John",
    start: new Date(2025, 11, 12),
    end: new Date(2025, 11, 14),
    type: "Annual leave",
  },
  {
    id: "2",
    title: "National Day",
    start: new Date(2025, 11, 23),
    end: new Date(2025, 11, 23),
    type: "Study leave",
  },
];

const AdminPage = () => {
  return (
    <div className="flex flex-col w-full gap-2">
      {/* Leave notification */}
      <LeaveCard />

      {/*
       * claims
       * commissions
       * medical leave
       * annual leaves
       */}

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AccumulationCard
          title="Claims"
          accumulationContent="$25,000"
          accumulationPercentage="+20.1%"
        />
        <AccumulationCard
          title="Commissions"
          accumulationContent="$135,000"
          accumulationPercentage="+20.1%"
          colorClasses="bg-white text-primary"
        />
        <AccumulationCard
          title="Medical Leave"
          accumulationContent="30 Leaves"
          accumulationPercentage="+20.1%"
        />
        <AccumulationCard
          title="Annual Leave"
          accumulationContent="40 Leaves"
          accumulationPercentage="+20.1%"
          colorClasses="bg-white text-primary"
        />
      </div>

      {/*
       * employee salaries for the month
       * remaining leave balance
       */}

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="flex items-center justify-center">
          Employee Salary for the month
        </Card>
        <div className="flex flex-col gap-4">
          <Card className="flex items-center justify-center">
            Remaining Leave Balance
          </Card>
          <Card className="flex justify-center items-center">
            {/* <Calendar /> */}
            Calendar
          </Card>
        </div>
      </div>

      {/* Calendar showing leave dates, and public holidays */}
      <DashboardCalendar events={events} />
    </div>
  );
};

export default AdminPage;
