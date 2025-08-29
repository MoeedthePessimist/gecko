"use client";

import { EmployeeFormInputs } from "@/schemas/employee-schema";
import React, { useEffect } from "react";
import { Control } from "react-hook-form";
import ControlledInput from "../controlled-input";
import AppButton from "../app-button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import CustomDialogTrigger from "../custom-dialog-trigger";
import useQualifications from "@/hooks/use-qualifications";
import { QualificationFormInputs } from "@/schemas/qualification-schema";
import useEmployeeManagement from "@/hooks/use-employee";
import ControlledDatePicker from "../controlled-date-picker";

type EmployeeQualificationInformationFormProps = {};

const EmployeeQualificationInformationForm: React.FC<
  EmployeeQualificationInformationFormProps
> = ({}) => {
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

  const {
    qualificationForm: { control, handleSubmit, formState, watch },
  } = useEmployeeManagement();

  const onSubmit = (qualification: QualificationFormInputs) => {
    console.log(qualification);
  };

  useEffect(() => {
    console.log(watch());
    console.log(formState.errors);
  }, [watch("nameOfInstitution")]);

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
            control={control as Control<QualificationFormInputs>}
            name={`nameOfInstitution`}
            placeholder="Enter Name of Institution"
            label="Name of Institution"
          />
          <ControlledInput<QualificationFormInputs>
            control={control as Control<QualificationFormInputs>}
            name={`level`}
            placeholder="Enter Level"
            label="Level"
          />
          <ControlledInput<QualificationFormInputs>
            control={control as Control<QualificationFormInputs>}
            name={`type`}
            placeholder="Enter Type"
            label="Type"
          />
          <ControlledDatePicker<QualificationFormInputs>
            control={control as Control<QualificationFormInputs>}
            name={"startDate"}
            label={"Start Date"}
            placeholder="Pick a start date"
          />
          <ControlledDatePicker<QualificationFormInputs>
            control={control as Control<QualificationFormInputs>}
            name={"endDate"}
            label={"End Date"}
            placeholder="Pick an end date"
          />

          <ControlledDatePicker<QualificationFormInputs>
            control={control as Control<QualificationFormInputs>}
            name={"expiryDate"}
            label={"Expiry Date"}
            placeholder="Pick an expiry date"
          />
        </div>
        <DialogFooter>
          <AppButton
            title="Add Qualification"
            buttonOptions={{
              className: "bg-secondary text-white",
              onClick: handleSubmit(onSubmit),
            }}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeQualificationInformationForm;
