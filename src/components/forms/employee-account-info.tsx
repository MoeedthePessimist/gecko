"use client";

import { EmployeeFormInputs } from "@/schemas/employee-schema";
import React from "react";
import { Control } from "react-hook-form";
import { Card, CardContent } from "../ui/card";
import ControlledInput from "../controlled-input";
import ControlledSelect from "../controlled-select";
import { identitiesList } from "@/enums/identities.enum";
import { gendersList } from "@/enums/genders.enum";
import { raceList } from "@/enums/race.enum";
import ControlledCheckbox from "../controlled-checkbox";
import ControlledDatePicker from "../controlled-date-picker";

type EmployeeAccountInformationFormProps = {
  control: Control<EmployeeFormInputs>;
};

const EmployeeAccountInformationForm: React.FC<
  EmployeeAccountInformationFormProps
> = ({ control }) => {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"accountInfo.name"}
          placeholder="Enter Name"
          label="Name"
        />
        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"accountInfo.email"}
          label="Email"
          placeholder="Enter Email"
        />
        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"accountInfo.password"}
          placeholder="Enter Password"
          label="Password"
          type="password"
        />
        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"accountInfo.repeatPassword"}
          placeholder="Repeat the password"
          label="Repeat Password"
          type="password"
        />

        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"accountInfo.mobileNumber"}
          placeholder="Enter Mobile Number"
          label="Mobile Number"
        />
        <ControlledSelect<EmployeeFormInputs>
          control={control}
          name={"accountInfo.identityType"}
          placeholder="Select Identity type"
          label="Identity Type"
          list={identitiesList}
        />

        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"accountInfo.identityNumber"}
          placeholder="Select Identity Number"
          label="Identity Number"
        />

        <ControlledDatePicker<EmployeeFormInputs>
          control={control}
          name={"accountInfo.dateOfBirth"}
          placeholder="Select Date of Birth"
          label="Date of Birth"
        />

        <ControlledSelect<EmployeeFormInputs>
          control={control}
          name={"accountInfo.gender"}
          placeholder="Select Gender"
          label="Gender"
          list={gendersList}
        />

        <ControlledSelect<EmployeeFormInputs>
          control={control}
          name={"accountInfo.race"}
          placeholder="Select Race"
          label="Race"
          list={raceList}
        />

        <div className="flex flex-col space-y-2">
          <ControlledInput<EmployeeFormInputs>
            control={control}
            name={"accountInfo.optionalEmail"}
            placeholder="Enter Optional Email"
            label="Optional Email"
            type="email"
          />
          <ControlledCheckbox<EmployeeFormInputs>
            control={control}
            name={"accountInfo.allowLogin"}
            label="Allow Login"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeAccountInformationForm;
