"use client";
import useEmployeeManagement from "@/hooks/use-employee";
import React from "react";
import SpinnerLoader from "./ui/loader";
import EmployeeForm from "./forms/employee";

type UpdateEmployeeFormWrapperProps = {
  id?: string;
};

const UpdateEmployeeFormWrapper: React.FC<UpdateEmployeeFormWrapperProps> = ({
  id,
}) => {
  const { getEmployeeQuery } = useEmployeeManagement(id);

  if (getEmployeeQuery.isLoading) {
    return <SpinnerLoader />;
  }
  return (
    <EmployeeForm
      data={getEmployeeQuery?.data?.data}
      isUpdate={true}
      userId={id}
    />
  );
};

export default UpdateEmployeeFormWrapper;
