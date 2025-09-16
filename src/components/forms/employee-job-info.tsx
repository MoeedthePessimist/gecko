"use client";

import { EmployeeFormInputs } from "@/schemas/employee-schema";
import React from "react";
import { Control } from "react-hook-form";
import { Card, CardContent } from "../ui/card";
import ControlledInput from "../controlled-input";
import ControlledSelect from "../controlled-select";
import ControlledDatePicker from "../controlled-date-picker";

type EmployeeJobInformationFormProps = {
  control: Control<EmployeeFormInputs>;
};

const EmployeeJobInformationForm: React.FC<EmployeeJobInformationFormProps> = ({
  control,
}) => {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"jobInfo.title"}
          placeholder="Enter Job Title"
          label="Job Title"
        />
        <ControlledSelect<EmployeeFormInputs>
          control={control}
          name={"jobInfo.jobCategory"}
          placeholder="Select Job Category"
          label="Job Category"
          list={[]} //TODO: data from the backend
        />
        <ControlledSelect<EmployeeFormInputs>
          control={control}
          name={"jobInfo.designation"}
          placeholder="Select Designation"
          label="Designation"
          list={[]} //TODO: data from the backend
        />
        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"jobInfo.basicRate"}
          label="Basic Rate"
          placeholder="Enter Basic Rate"
          type="number"
        />
        <ControlledDatePicker<EmployeeFormInputs>
          control={control}
          name={"jobInfo.startDate"}
          placeholder="Enter Start Date"
          label="Start Date"
        />
        <ControlledDatePicker<EmployeeFormInputs>
          control={control}
          name={"jobInfo.endDate"}
          placeholder="Select End Date"
          label="End Date"
        />
      </CardContent>
    </Card>
  );
};

export default EmployeeJobInformationForm;
