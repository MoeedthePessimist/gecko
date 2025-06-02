"use client";

import AccumulationCard from "@/components/dashboard-cards/accumulation-card";
import LeaveCard from "@/components/dashboard-cards/leave-card";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import React from "react";

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
        <Card></Card>
        <div className="flex flex-col gap-4">
          <Card></Card>
          <Card className="flex justify-center items-center">
            <Calendar />
          </Card>
        </div>
      </div>

      {/* Calendar showing leave dates, and public holidays */}
    </div>
  );
};

export default AdminPage;
