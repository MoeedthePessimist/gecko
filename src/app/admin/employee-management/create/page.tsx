"use client";

import EmployeeAccountInformationForm from "@/components/forms/employee-account-info";
import { Form } from "@/components/ui/form";
import useEmployeeManagement from "@/hooks/use-employee";
import React from "react";

const CreateEmployeePage = () => {
  const { employeeForm } = useEmployeeManagement();

  return (
    <div>
      <Form {...employeeForm} handleSubmit={employeeForm.handleSubmit}>
        {/* <EmployeeGeneralInformationForm control={employeeForm.control} /> */}
        <EmployeeAccountInformationForm control={employeeForm.control} />
      </Form>
    </div>
  );
};

export default CreateEmployeePage;
