"use client";

import { EmployeeFormInputs } from "@/schemas/employee-schema";
import React from "react";
import { Control } from "react-hook-form";
import { Card, CardContent } from "../ui/card";
import ControlledInput from "../controlled-input";
import ControlledSelect from "../controlled-select";
import { cpfTablesList } from "@/enums/cpf-tables.enum";
import ControlledCheckbox from "../controlled-checkbox";
import ControlledDatePicker from "../controlled-date-picker";

type EmployeeSettingsInformationFormProps = {
  control: Control<EmployeeFormInputs>;
};

const EmployeeSettingsInformationForm: React.FC<
  EmployeeSettingsInformationFormProps
> = ({ control }) => {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 items-start">
        <div className="flex flex-col gap-2">
          <ControlledSelect<EmployeeFormInputs>
            control={control}
            name={"settingsInfo.cpfTable"}
            placeholder="Select CPF Table"
            label="CPF Table"
            list={cpfTablesList}
          />
          <ControlledCheckbox
            control={control}
            name={"settingsInfo.employerPaysCpf"}
            label="CPF is fully paid by Employer"
          />
        </div>

        <ControlledDatePicker<EmployeeFormInputs>
          control={control}
          name={"settingsInfo.prEffectiveDate"}
          label="PR Effective Date"
          placeholder="PR Effective Date"
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
        <div className="flex flex-col space-y-2">
          <ControlledSelect<EmployeeFormInputs>
            control={control}
            name={"settingsInfo.levy"}
            placeholder="Select Levy"
            label="Levy"
            list={[]}
          />
          <ControlledCheckbox
            control={control}
            name={"settingsInfo.noSdlContribution"}
            label="No SDL Contribution"
          />
          <ControlledCheckbox
            control={control}
            name={"settingsInfo.noShgContribution"}
            label="No Self Help Group Contribution"
          />
          <ControlledCheckbox
            control={control}
            name={"settingsInfo.useAttendanceRecords"}
            label="Use Attendance Records to Calculate Work Days"
          />
        </div>
        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"settingsInfo.maxPayToCalculate"}
          placeholder="Enter max pay"
          label="Max Pay to Calculate OT"
          type="number"
        />

        <div className="flex flex-col space-y-1">
          <h2 className="font-semibold">Deduction</h2>
          <Card>
            <CardContent className="flex flex-col gap-2">
              <ControlledInput<EmployeeFormInputs>
                control={control}
                name={"settingsInfo.deductionCdac"}
                placeholder="Enter CDAC"
                label="CDAC"
                type="number"
              />
              <ControlledInput<EmployeeFormInputs>
                control={control}
                name={"settingsInfo.deductionEcf"}
                placeholder="Enter ECF"
                label="ECF"
                type="number"
              />
              <ControlledInput<EmployeeFormInputs>
                control={control}
                name={"settingsInfo.deductionMbmf"}
                placeholder="Enter MBMF"
                label="MBMF"
                type="number"
              />
              <ControlledInput<EmployeeFormInputs>
                control={control}
                name={"settingsInfo.deductionEcfSinda"}
                placeholder="Enter SINDA"
                label="SINDA"
                type="number"
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col space-y-1">
          <h2 className="font-semibold">Allowance</h2>
          <Card>
            <CardContent className="flex flex-col gap-2">
              <ControlledInput<EmployeeFormInputs>
                control={control}
                name={"settingsInfo.allowanceCommission"}
                placeholder="Enter commission"
                label="Commission"
                type="number"
              />
              <ControlledInput<EmployeeFormInputs>
                control={control}
                name={"settingsInfo.allowanceErrorFee"}
                placeholder="Enter error fee"
                label="Error Fee"
                type="number"
              />
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeSettingsInformationForm;
