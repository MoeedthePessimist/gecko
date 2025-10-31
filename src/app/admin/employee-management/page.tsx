"use client";

import AppButton from "@/components/app-button";
import EmployeeCard from "@/components/employee-card";
import SearchBar from "@/components/search-bar";
import SpinnerLoader from "@/components/ui/loader";
import { ADMIN_ROUTES } from "@/constants/routes";
import useEmployeeManagement from "@/hooks/use-employee";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

const EmployeeManagementPage = () => {
  const {
    getEmployeesQuery: {
      data: employeesData,
      isFetching: isFetchingEmployees,
      isRefetching: isRefetchingEmployees,
      refetch: refetchEmployeesData,
    },
    deleteEmployeeMutation,
  } = useEmployeeManagement();

  useEffect(() => {
    if (deleteEmployeeMutation.isSuccess) {
      refetchEmployeesData();
    }
  }, [deleteEmployeeMutation.isSuccess]);

  return (
    <div className="flex flex-col items-center gap-8 p-5 ">
      {/* searchbar and add button */}
      <div className="w-full flex gap-2">
        <SearchBar />
        <Link href={ADMIN_ROUTES.CREATE_EMPLOYEE}>
          <AppButton
            title="Add New Employee"
            buttonOptions={{
              className: "bg-accent text-white",
            }}
            icon={<PlusCircle />}
            iconPosition="end"
          />
        </Link>
      </div>
      {/* Employee Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {(isFetchingEmployees || isRefetchingEmployees) && <SpinnerLoader />}
        {employeesData &&
          employeesData.data.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              deleteEmployeeMutation={deleteEmployeeMutation}
            />
          ))}
        {employeesData && employeesData.data.length === 0 && (
          <p className="text-center col-span-full">No Employees Found</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeManagementPage;
