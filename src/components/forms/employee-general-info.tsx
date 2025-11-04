"use client";

import { EmployeeFormInputs } from "@/schemas/employee-schema";
import React from "react";
import { Control } from "react-hook-form";
import { Card, CardContent } from "../ui/card";
import ControlledInput from "../controlled-input";
import ControlledSelect from "../controlled-select";
import { addressTypesListWithCode } from "@/enums/address-types.enum";
import { countriesListWithCode } from "@/enums/countries.enum";
import { nationalitiesListWithCode } from "@/enums/nationalities.enum";
import { maritalStatusesListWithCode } from "@/enums/marital-statuses.enum";
import { banksListWithCode } from "@/enums/banks.enum";
import { rolesListWithCode } from "@/enums/roles.enum";
import { booleanOptionsWithCode } from "@/constants/options";

type EmployeeGeneralInformationFormProps = {
  control: Control<EmployeeFormInputs>;
};

const EmployeeGeneralInformationForm: React.FC<
  EmployeeGeneralInformationFormProps
> = ({ control }) => {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ControlledSelect<EmployeeFormInputs>
          control={control}
          name={"generalInfo.addressType"}
          list={addressTypesListWithCode}
          label="Address Type"
          placeholder="Select Address Type"
        />
        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"generalInfo.houseNo"}
          placeholder="Enter House Number"
          label="House Number"
        />
        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"generalInfo.levelNo"}
          placeholder="Enter Level Number"
          label="Level Number"
        />
        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"generalInfo.unitNo"}
          placeholder="Enter Unit Number"
          label="Unit Number"
        />
        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"generalInfo.address"}
          placeholder="Address"
          label="Address"
        />
        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"generalInfo.city"}
          placeholder="Enter City"
          label="City"
        />
        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"generalInfo.state"}
          placeholder="Enter State"
          label="State"
        />
        <ControlledSelect<EmployeeFormInputs>
          control={control}
          name={"generalInfo.country"}
          placeholder="Select Country"
          label="Country"
          list={countriesListWithCode}
        />
        <ControlledSelect<EmployeeFormInputs>
          control={control}
          name={"generalInfo.nationality"}
          placeholder="Select Nationality"
          label="Nationality"
          list={nationalitiesListWithCode}
        />
        <ControlledSelect<EmployeeFormInputs>
          control={control}
          name={"generalInfo.maritalStatus"}
          placeholder="Select Marital Status"
          label="Marital Status"
          list={maritalStatusesListWithCode}
        />
        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"generalInfo.homeTelephoneNumber"}
          placeholder="Enter Home Telephone Number"
          label="Home Telephone Number"
        />
        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"generalInfo.workTelephoneNumber"}
          placeholder="Enter Work Telephone Number"
          label="Work Telephone Number"
        />
        <ControlledSelect<EmployeeFormInputs>
          control={control}
          name={"generalInfo.bank.bankName"}
          placeholder="Select Bank Name"
          label="Bank Name"
          list={banksListWithCode}
        />
        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"generalInfo.bank.bankAccountNumber"}
          placeholder="Enter Bank Account Number"
          label="Bank Account Number"
          type="password"
        />
        <ControlledInput<EmployeeFormInputs>
          control={control}
          name={"generalInfo.bank.bankSwiftCode"}
          placeholder="Enter Bank Swift Code"
          label="Bank Swift Code"
          type="password"
        />
        <ControlledSelect<EmployeeFormInputs>
          control={control}
          name={"generalInfo.role"}
          placeholder="Select Role"
          label="Role"
          list={rolesListWithCode}
        />
        <ControlledSelect<EmployeeFormInputs>
          control={control}
          name={"generalInfo.isNonResidentialDirector"}
          placeholder="Select"
          label="Non Resident-Director"
          list={booleanOptionsWithCode}
        />
      </CardContent>
    </Card>
  );
};

export default EmployeeGeneralInformationForm;
