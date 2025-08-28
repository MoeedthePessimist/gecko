"use client";

import { EmployeeFormInputs } from "@/schemas/employee-schema";
import React from "react";
import { Control } from "react-hook-form";
import ControlledInput from "../controlled-input";
import AppButton from "../app-button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import CustomDialogTrigger from "../custom-dialog-trigger";
import useQualifications from "@/hooks/use-qualifications";
import { QualificationFormInputs } from "@/schemas/qualification-schema";

type EmployeeQualificationInformationFormProps = {
  control: Control<QualificationFormInputs>;
};

const EmployeeQualificationInformationForm: React.FC<
  EmployeeQualificationInformationFormProps
> = ({ control }) => {
  const {
    queryQualifications: { data: qualificationsData, isLoading, isError },
    mutateQualification: {
      mutate: createQualification,
      isPending: isCreatingQualification,
      isError: isCreateQualificationError,
      data: createdQualificationData,
    },
  } = useQualifications();

  console.log("qualificationsData", qualificationsData);

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
          <ControlledInput<QualificationFormInputs>
            control={control}
            name={`nameOfInstitution`}
            placeholder="Enter Name of Institution"
            label="Name of Institution"
          />
          <ControlledInput<QualificationFormInputs>
            control={control}
            name={`level`}
            placeholder="Enter Level"
            label="Level"
          />
          <ControlledInput<QualificationFormInputs>
            control={control}
            name={`type`}
            placeholder="Enter Type"
            label="Type"
          />
          <ControlledInput<QualificationFormInputs>
            control={control}
            name={`startDate`}
            placeholder="Enter Start Date"
            label="Start Date"
            type={"date"}
          />
          <ControlledInput<QualificationFormInputs>
            control={control}
            name={`endDate`}
            placeholder="Enter End Date"
            label="End Date"
            type={"date"}
          />

          <ControlledInput<QualificationFormInputs>
            control={control}
            name={`expiryDate`}
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
