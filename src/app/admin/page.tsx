"use client";
import DashboardCalendar from "@/components/dashboard-big-calendar";
import AccumulationCard from "@/components/dashboard-cards/accumulation-card";
import { DataTable } from "@/components/ui/data-table";
import { rolesEnum } from "@/enums/roles.enum";
import useDashboard from "@/hooks/use-dashboard";

const AdminPage = () => {
  const {
    leaves,
    columns,
    events,
    totalAnnualLeaves,
    totalClaimsAmount,
    totalMedicalLeaves,
  } = useDashboard(rolesEnum.ADMIN);

  console.log(events);

  return (
    <div className="flex flex-col w-full gap-2">
      {/* Leave notification */}
      <DataTable columns={columns} data={leaves} />

      {/*
       * claims
       * commissions
       * medical leave
       * annual leaves
       */}

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AccumulationCard
          title="Claims"
          accumulationContent={`$${totalClaimsAmount}`}
        />
        <AccumulationCard
          title="Medical Leave"
          accumulationContent={`${totalMedicalLeaves} Leaves`}
        />
        <AccumulationCard
          title="Annual Leave"
          accumulationContent={`${totalAnnualLeaves} Leaves`}
          colorClasses="bg-white text-primary"
        />
      </div>

      {/*
       * employee salaries for the month
       * remaining leave balance
       */}

      {/* <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="flex items-center justify-center">
          Employee Salary for the month
        </Card>
        <div className="flex flex-col gap-4">
          <Card className="flex items-center justify-center">
            Remaining Leave Balance
          </Card>
          <Card className="flex justify-center items-center">
            Calendar
          </Card>
        </div>
      </div> */}

      {/* Calendar showing leave dates, and public holidays */}
      <DashboardCalendar events={events} />
    </div>
  );
};

export default AdminPage;
