"use client";

import { EmployeeFormInputs } from "@/schemas/employee-schema";
import React from "react";
import { Control } from "react-hook-form";
import { Card, CardContent } from "../ui/card";
import ControlledInput from "../controlled-input";
import ControlledSelect from "../controlled-select";
import { cpfTablesList } from "../../../../gecko_be/src/enums/cpf-tables.enum";

type EmployeeSettingsInformationFormProps = {
  control: Control<EmployeeFormInputs>;
};

const EmployeeSettingsInformationForm: React.FC<
  EmployeeSettingsInformationFormProps
> = ({ control }) => {
  return (
    <Card>
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ControlledSelect<EmployeeFormInputs>
          control={control}
          name={"settingsInfo.cpfTable"}
          placeholder="Select CPF Table"
          label="CPF Table"
          list={cpfTablesList}
        />
        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"settingsInfo.cpfNo"}
          label="CPF Number"
          placeholder="Enter CPF Number"
        />
        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"settingsInfo.taxNo"}
          placeholder="Enter Tax Number"
          label="Tax Number"
        />
        <ControlledSelect<EmployeeFormInputs>
          control={control}
          name={"settingsInfo.leaveTable"}
          placeholder="Select Leave Table"
          label="Leave Table"
          list={[]}
        />

        <ControlledSelect<EmployeeFormInputs>
          control={control}
          name={"settingsInfo.workTable"}
          placeholder="Select Work Table"
          label="Work Table"
          list={[]}
        />
      </CardContent>
    </Card>
  );
};

export default EmployeeSettingsInformationForm;
