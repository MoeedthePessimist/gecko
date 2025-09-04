"use client";

import { EmployeeFormInputs } from "@/schemas/employee-schema";
import React, { useEffect } from "react";
import { Control } from "react-hook-form";
import ControlledInput from "../controlled-input";
import AppButton from "../app-button";
import { Delete, Edit, PlusCircle, Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import CustomDialogTrigger from "../custom-dialog-trigger";
import useQualifications from "@/hooks/use-qualifications";
import { QualificationFormInputs } from "@/schemas/qualification-schema";
import useEmployeeManagement from "@/hooks/use-employee";
import ControlledDatePicker from "../controlled-date-picker";
import { Qualification } from "@/types/qualification.type";
import { Card, CardContent } from "../ui/card";

type EmployeeQualificationInformationFormProps = {
  handleQualificationMutated: (data: QualificationFormInputs) => void;
  createdQualifications: Array<QualificationFormInputs>;
};

const EmployeeQualificationInformationForm: React.FC<
  EmployeeQualificationInformationFormProps
> = ({ handleQualificationMutated, createdQualifications }) => {
  const {
    queryQualifications: { data: qualificationsData, isLoading, isError },
    mutateQualification: {
      mutate: createQualification,
      isPending: isCreatingQualification,
      isError: isCreateQualificationError,
      data: createdQualificationData,
      isSuccess: isCreatedQualificationSuccess,
    },
    setSelectedQualificationId,
    mutationModalOpen,
    setMutationModalOpen,
    selectedQualificationId,
  } = useQualifications();

  const {
    qualificationForm: {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    },
  } = useEmployeeManagement();

  const onSubmit = (qualification: QualificationFormInputs) => {
    createQualification(qualification);
  };

  const onEdit = (qualification: QualificationFormInputs) => {
    setSelectedQualificationId(qualification.id || "");
    reset(qualification);
    setMutationModalOpen(true);
  };

  useEffect(() => {
    if (isCreatedQualificationSuccess) {
      const data: QualificationFormInputs = createdQualificationData.data;
      handleQualificationMutated(data);
      reset();
      setMutationModalOpen(false);
    }
  }, [isCreatedQualificationSuccess]);

  const openModal = () => {
    setMutationModalOpen(true);
    reset();
    setSelectedQualificationId("");
  };

  return (
    <div className="flex flex-col gap-4">
      <Dialog open={mutationModalOpen}>
        <CustomDialogTrigger
          title="Add New Qualification"
          icon={<PlusCircle />}
          iconPosition="start"
          containerClasses="bg-accent text-white text-sm float-right"
          openModal={openModal}
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
            {selectedQualificationId ? (
              <AppButton
                title="Update Qualification"
                buttonOptions={{
                  className: "bg-secondary text-white",
                }}
              />
            ) : (
              <AppButton
                title="Add Qualification"
                buttonOptions={{
                  className: "bg-secondary text-white",
                  onClick: handleSubmit(onSubmit),
                }}
                isLoading={isCreatingQualification}
              />
            )}
            <DialogClose>
              <AppButton
                title="Close"
                buttonOptions={{
                  className: "bg-accent text-white",
                  onClick: () => setMutationModalOpen(false),
                }}
              />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {createdQualifications.length === 0 && (
          <p className="text-sm text-semibold text-secondary">
            No qualifications data
          </p>
        )}
        {createdQualifications.map((qualification) => {
          return (
            <Card>
              <CardContent className="flex justify-between">
                <p className="text-primary text-sm font-semibold">
                  {qualification.type}
                </p>
                <div className="flex gap-2 cursor-pointer">
                  <Edit
                    className="hover:text-accent text-primary"
                    size="20"
                    onClick={() => onEdit(qualification)}
                  />
                  <Trash className="hover:text-accent text-primary" size="20" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeQualificationInformationForm;
