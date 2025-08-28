"use client";
import React from "react";
import { Control } from "react-hook-form";
import ControlledInput from "../controlled-input";
import AppButton from "../app-button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import CustomDialogTrigger from "../custom-dialog-trigger";
import { DocumentFormInputs } from "@/schemas/document-schema";

type EmployeeDocumentInformationFormProps = {
  control: Control<DocumentFormInputs>;
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
          <ControlledInput<DocumentFormInputs>
            control={control}
            name={`title`}
            placeholder="Enter Title"
            label="Title"
          />
          <ControlledInput<DocumentFormInputs>
            control={control}
            name={`category`}
            placeholder="Select Category"
            label="Category"
          />
          <ControlledInput<DocumentFormInputs>
            control={control}
            name={`startDate`}
            placeholder="Enter Start Date"
            type={"date"}
            label="Start Date"
          />
          <ControlledInput<DocumentFormInputs>
            control={control}
            name={`endDate`}
            placeholder="Enter End Date"
            label="End Date"
            type={"date"}
          />
          <ControlledInput<DocumentFormInputs>
            control={control}
            name={`expiryDate`}
            placeholder="Enter Expiry Date"
            label="Expiry Date"
            type={"date"}
          />
          <ControlledInput<DocumentFormInputs>
            control={control}
            name={`fileName`}
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
