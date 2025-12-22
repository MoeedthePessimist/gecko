"use client";

import { CompanyFormInputs } from "@/schemas/company-schema";
import React from "react";
import { Control } from "react-hook-form";
import { Card, CardContent } from "../ui/card";
import ControlledInput from "../controlled-input";
import ControlledSelect from "../controlled-select";
import { companyEntitiesListWithCode } from "@/enums/company-entities.enum";
import { industriesListWithCode } from "@/enums/industries.enum";
import { organizationIdTypesListWithCode } from "@/enums/organization-id-types.enum";
import { banksListWithCode } from "@/enums/banks.enum";

type CompanyFormProps = {
  control: Control<CompanyFormInputs>;
};

const CompanyForm: React.FC<CompanyFormProps> = ({ control }) => {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Company Name */}
        <ControlledInput<CompanyFormInputs>
          control={control}
          name={"name"}
          placeholder="Enter Company Name"
          label="Company Name"
        />

        {/* Entity */}
        <ControlledSelect<CompanyFormInputs>
          control={control}
          name={"entity"}
          list={companyEntitiesListWithCode}
          label="Entity"
          placeholder="Select Entity"
        />

        {/* Industry */}
        <ControlledSelect<CompanyFormInputs>
          control={control}
          name={"industry"}
          list={industriesListWithCode}
          label="Industry"
          placeholder="Select Industry"
        />

        {/* Telephone */}
        <ControlledInput<CompanyFormInputs>
          control={control}
          name={"telephone"}
          placeholder="Enter Telephone"
          label="Telephone"
        />

        {/* Address */}
        <ControlledInput<CompanyFormInputs>
          control={control}
          name={"address"}
          placeholder="Enter Address"
          label="Address"
        />

        {/* Organization ID Type */}
        <ControlledSelect<CompanyFormInputs>
          control={control}
          name={"organizationIdType"}
          list={organizationIdTypesListWithCode}
          label="Organization ID Type"
          placeholder="Select Organization ID Type"
        />

        {/* CSN */}
        <ControlledInput<CompanyFormInputs>
          control={control}
          name={"csn"}
          placeholder="Enter CSN"
          label="CSN"
        />

        {/* UEN */}
        <ControlledInput<CompanyFormInputs>
          control={control}
          name={"uen"}
          placeholder="Enter UEN"
          label="UEN"
        />

        {/* Paid Leaves */}
        <ControlledInput<CompanyFormInputs>
          control={control}
          name={"paidLeaves"}
          placeholder="Enter Paid Leaves"
          label="Paid Leaves"
          type="number"
        />

        {/* Bank Section Header */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Bank Information
          </h3>
          <div className="border-b border-gray-200"></div>
        </div>

        {/* Bank Name */}
        <ControlledSelect<CompanyFormInputs>
          control={control}
          name={"bank.bankName"}
          placeholder="Select Bank Name"
          label="Bank Name"
          list={banksListWithCode}
        />

        {/* Bank Account Number */}
        <ControlledInput<CompanyFormInputs>
          control={control}
          name={"bank.bankAccountNumber"}
          placeholder="Enter Bank Account Number"
          label="Bank Account Number"
          type="password"
        />

        {/* Bank Swift Code */}
        <ControlledInput<CompanyFormInputs>
          control={control}
          name={"bank.bankSwiftCode"}
          placeholder="Enter Bank Swift Code"
          label="Bank Swift Code"
          type="password"
        />
      </CardContent>
    </Card>
  );
};

export default CompanyForm;
