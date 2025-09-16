"use client";

import { EmployeeFormInputs } from "@/schemas/employee-schema";
import React from "react";
import { Control } from "react-hook-form";
import { Card, CardContent } from "../ui/card";
import ControlledInput from "../controlled-input";
import ControlledSelect from "../controlled-select";
import { employeeStatusesList } from "@/enums/statuses.enum";
import ControlledDatePicker from "../controlled-date-picker";

type EmployeeEmployementInformationFormProps = {
  control: Control<EmployeeFormInputs>;
};

const EmployeeEmployementInformationForm: React.FC<
  EmployeeEmployementInformationFormProps
> = ({ control }) => {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ControlledSelect<EmployeeFormInputs>
          control={control}
          name={"employementInfo.department"}
          placeholder="Select Department"
          label="Department"
          list={[]} //TODO: data from the backend
        />
        <ControlledSelect<EmployeeFormInputs>
          control={control}
          name={"employementInfo.employmentType"}
          placeholder="Select Employement Type"
          label="Employement Type"
          list={[]} //TODO: data from the backend
        />
        <ControlledSelect<EmployeeFormInputs>
          control={control}
          name={"employementInfo.status"}
          placeholder="Select Status"
          label="Status"
          list={employeeStatusesList}
        />
        <ControlledSelect<EmployeeFormInputs>
          control={control}
          name={"employementInfo.directManager"}
          placeholder="Select Direct Manager"
          label="Direct Manager"
          list={[]} //TODO: data from the backend
        />
        <ControlledDatePicker<EmployeeFormInputs>
          control={control}
          name={"employementInfo.dateJoined"}
          placeholder="Enter Date Joined"
          label="Date Joined"
        />
        <ControlledDatePicker<EmployeeFormInputs>
          control={control}
          name={"employementInfo.dateLeft"}
          placeholder="Select Date Left"
          label="Date Left"
        />
        <ControlledDatePicker<EmployeeFormInputs>
          control={control}
          name={"employementInfo.probationFrom"}
          placeholder="Enter Probation From"
          label="Probation From"
        />
        <ControlledDatePicker<EmployeeFormInputs>
          control={control}
          name={"employementInfo.probationTo"}
          placeholder="Select Probation To"
          label="Probation To"
        />
      </CardContent>
    </Card>
  );
};

export default EmployeeEmployementInformationForm;
