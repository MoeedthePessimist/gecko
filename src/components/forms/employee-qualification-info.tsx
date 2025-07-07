"use client";

import { EmployeeFormInputs } from "@/schemas/employee-schema";
import React from "react";
import { Control } from "react-hook-form";
import ControlledInput from "../controlled-input";
import AppButton from "../app-button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import CustomDialogTrigger from "../custom-dialog-trigger";

type EmployeeQualificationInformationFormProps = {
  control: Control<EmployeeFormInputs>;
};

const EmployeeQualificationInformationForm: React.FC<
  EmployeeQualificationInformationFormProps
> = ({ control }) => {
  return (
    <Dialog>
      <CustomDialogTrigger
        title="Add New Qualification"
        icon={<PlusCircle />}
        iconPosition="start"
        containerClasses="bg-accent text-white text-sm float-right"
      />
      <DialogContent>
        <DialogTitle>Add Employee Qualification</DialogTitle>
        <div className="grid grid-cols-1 gap-4 my-4">
          <ControlledInput<EmployeeFormInputs>
            control={control}
            name={`qualificationsInfo.${0}.nameOfInstitution`}
            placeholder="Enter Name of Institution"
            label="Name of Institution"
          />
          <ControlledInput<EmployeeFormInputs>
            control={control}
            name={`qualificationsInfo.${0}.level`}
            placeholder="Enter Level"
            label="Level"
          />
          <ControlledInput<EmployeeFormInputs>
            control={control}
            name={`qualificationsInfo.${0}.type`}
            placeholder="Enter Type"
            label="Type"
          />
          <ControlledInput<EmployeeFormInputs>
            control={control}
            name={`qualificationsInfo.${0}.startDate`}
            placeholder="Enter Start Date"
            label="Start Date"
            type={"date"}
          />
          <ControlledInput<EmployeeFormInputs>
            control={control}
            name={`qualificationsInfo.${0}.endDate`}
            placeholder="Enter End Date"
            label="End Date"
            type={"date"}
          />

          <ControlledInput<EmployeeFormInputs>
            control={control}
            name={`qualificationsInfo.${0}.expiryDate`}
            placeholder="Enter Expiry Date"
            label="Expiry Date"
            type={"date"}
          />
        </div>
        <DialogFooter>
          <AppButton
            title="Add Qualification"
            buttonOptions={{
              className: "bg-secondary text-white",
            }}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeQualificationInformationForm;
