"use client";
import EmployeeForm from "@/components/forms/employee";
import SpinnerLoader from "@/components/ui/loader";
import useEmployeeManagement from "@/hooks/use-employee";
import { emit } from "process";
import React from "react";

interface UpdateEmployeePageProps {
  params: {
    id: string;
  };
}

const UpdateEmployeePage = ({ params }: UpdateEmployeePageProps) => {
  const { id } = params;

  const { getEmployeeQuery } = useEmployeeManagement(id);

  if (getEmployeeQuery.isLoading) {
    return <SpinnerLoader />;
  }

  return <EmployeeForm data={getEmployeeQuery?.data?.data} />;
};
export default UpdateEmployeePage;
