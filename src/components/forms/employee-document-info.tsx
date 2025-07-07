"use client";

import { EmployeeFormInputs } from "@/schemas/employee-schema";
import React from "react";
import { Control } from "react-hook-form";
import ControlledInput from "../controlled-input";
import AppButton from "../app-button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import CustomDialogTrigger from "../custom-dialog-trigger";

type EmployeeDocumentInformationFormProps = {
  control: Control<EmployeeFormInputs>;
};

const EmployeeDocumentInformationForm: React.FC<
  EmployeeDocumentInformationFormProps
> = ({ control }) => {
  return (
    <Dialog>
      <CustomDialogTrigger
        title="Add New Document"
        icon={<PlusCircle />}
        iconPosition="start"
        containerClasses="bg-accent text-white text-sm float-right"
      />
      <DialogContent>
        <DialogTitle>Add Employee Document</DialogTitle>
        <div className="grid grid-cols-1 gap-4 my-4">
          <ControlledInput<EmployeeFormInputs>
            control={control}
            name={`documentsInfo.${0}.title`}
            placeholder="Enter Title"
            label="Title"
          />
          <ControlledInput<EmployeeFormInputs>
            control={control}
            name={`documentsInfo.${0}.category`}
            placeholder="Select Category"
            label="Category"
          />
          <ControlledInput<EmployeeFormInputs>
            control={control}
            name={`documentsInfo.${0}.startDate`}
            placeholder="Enter Start Date"
            type={"date"}
            label="Start Date"
          />
          <ControlledInput<EmployeeFormInputs>
            control={control}
            name={`documentsInfo.${0}.endDate`}
            placeholder="Enter End Date"
            label="End Date"
            type={"date"}
          />
          <ControlledInput<EmployeeFormInputs>
            control={control}
            name={`documentsInfo.${0}.expiryDate`}
            placeholder="Enter Expiry Date"
            label="Expiry Date"
            type={"date"}
          />
          <ControlledInput<EmployeeFormInputs>
            control={control}
            name={`documentsInfo.${0}.fileName`}
            placeholder="Select File Name"
            label="File Name"
          />
        </div>
        <DialogFooter>
          <AppButton
            title="Add Document"
            buttonOptions={{
              className: "bg-secondary text-white",
            }}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDocumentInformationForm;
