import { rolesEnum } from "@/enums/roles.enum";
import { useEffect, useState } from "react";
import { useTypedQuery } from "./use-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useAuthContext } from "@/context/auth-context";
import { getAdminDashboardData } from "@/api/dashboard";
import { LeaveWithNecessaryFields } from "@/types/leave.type";
import { CalendarEventType } from "@/types/common.type";
import { ColumnDef } from "@tanstack/react-table";
import useEmployeeManagement from "./use-employee";
import { cn, getAdminsWithSelectedFields } from "@/lib/utils";
import { applicationsStatusesEnum } from "@/enums/statuses.enum";

const useDashboard = (role: rolesEnum) => {
  const columns: ColumnDef<LeaveWithNecessaryFields>[] = [
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "totalDays",
      header: "Total days",
    },
    {
      accessorKey: "from",
      header: "From",
      cell: ({ row }) => {
        const raw = row.getValue("from");
        const date = new Date(raw as Date);

        return (
          <span>
            {date.toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </span>
        );
      },
    },
    {
      accessorKey: "to",
      header: "To",
      cell: ({ row }) => {
        const raw = row.getValue("to");
        const date = new Date(raw as Date);

        return (
          <span>
            {date.toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </span>
        );
      },
    },
    {
      accessorKey: "user",
      header: "Employee",
      cell: ({ row }) => {
        const raw = row.getValue("user");
        const userId = typeof raw === "string" ? raw : (raw as any)?.id;
        const name = users.find((user) => user.code === userId)?.name;
        return <span>{name ? name : "-"}</span>;
      },
    },
    {
      accessorKey: "monthToApply",
      header: "Month To Apply",
      cell: ({ row }) => {
        const raw = row.getValue("monthToApply");
        const date = raw ? new Date(raw as Date) : null;

        return (
          <span>
            {date
              ? date.toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                })
              : "-"}
          </span>
        );
      },
    },
    {
      accessorKey: "emailTo",
      header: "Email To",
      cell: ({ row }) => {
        const raw = row.getValue("emailTo");
        const emailTo = Array.isArray(raw) ? raw : [];
        return (
          <div className="flex flex-col gap-1">
            {emailTo.map((email: string) => (
              <div
                key={email}
                className="bg-amber-50 text-black rounded-full text-xs w-fit px-2 py-1"
              >
                {admins.find((admin) => admin.value === email)?.label}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const raw = row.getValue("status") as string;

        return (
          <div
            className={cn(
              "border-1 rounded-full font-semibold text-xs w-fit px-2 py-1",
              {
                "border-red-400 bg-red-400 text-white":
                  raw === applicationsStatusesEnum.REJECTED,
                "border-green-400 bg-green-400 text-white":
                  raw === applicationsStatusesEnum.APPROVED,
                "border-yellow-400 bg-yellow-400 text-white":
                  raw === applicationsStatusesEnum.PENDING,
              }
            )}
          >
            {raw}
          </div>
        );
      },
    },
  ];

  const [admins, setAdmins] = useState<Array<{ label: string; value: string }>>(
    []
  );
  const [users, setUsers] = useState<Array<{ code: string; name: string }>>([]);
  const {
    getEmployeesQuery: {
      isSuccess: isEmployeesQuerySuccess,
      isFetching: isEmployeesQueryFetching,
      data: employeesQueryData,
      isError: isEmployeesQueryError,
    },
  } = useEmployeeManagement();

  const { user } = useAuthContext();

  const companyId = user?.company?.id;

  const [leaves, setLeaves] = useState<Array<LeaveWithNecessaryFields>>([]);
  const [events, setEvents] = useState<Array<CalendarEventType>>([]);
  const [totalAnnualLeaves, setTotalAnnualLeaves] = useState<number>(0);
  const [totalMedicalLeaves, setTotalMedicalLeaves] = useState<number>(0);
  const [totalClaimsAmount, setTotalClaimsAmount] = useState<number>(0);

  const getAdminDashboardDataQuery = useTypedQuery({
    queryKey: [QUERY_KEYS.ADMIN_DASHBOARD(companyId || "")],
    queryFn: () => getAdminDashboardData(),
    enabled: role === rolesEnum.ADMIN,
  });

  useEffect(() => {
    if (getAdminDashboardDataQuery.isSuccess) {
      const data = getAdminDashboardDataQuery.data.data;

      setLeaves(data.leaves);
      setEvents(() => {
        return data.leaves.map((leave) => {
          const user = typeof leave.user === "string" ? null : leave.user;

          return {
            id: leave.id || "",
            title: `${user ? user.name : ""} - ${leave.type}`,
            start: new Date(leave.from ?? ""),
            end: new Date(leave.to ?? ""),
            type: leave.type,
          };
        });
      });
      setTotalAnnualLeaves(data.annualLeavesCount);
      setTotalMedicalLeaves(data.medicalLeavesCount);
      setTotalClaimsAmount(data.claimsTotal);
    }
  }, [getAdminDashboardDataQuery.isSuccess]);

  useEffect(() => {
    if (isEmployeesQuerySuccess) {
      setAdmins(getAdminsWithSelectedFields(employeesQueryData.data));
      setUsers(
        employeesQueryData.data.map((user) => ({
          code: (user.id ?? "").toString(),
          name: user.name,
        }))
      );
    } else if (isEmployeesQueryError) {
      setAdmins([]);
      setUsers([]);
    }
  }, [isEmployeesQuerySuccess, isEmployeesQueryError]);

  return {
    leaves,
    events,
    totalAnnualLeaves,
    totalMedicalLeaves,
    totalClaimsAmount,
    columns,
  };
};

export default useDashboard;
