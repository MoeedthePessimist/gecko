"use client";
import React, { useEffect } from "react";
import { Control } from "react-hook-form";
import ControlledInput from "../controlled-input";
import AppButton from "../app-button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import CustomDialogTrigger from "../custom-dialog-trigger";
import { DocumentFormInputs } from "@/schemas/document-schema";
import { FileUploader } from "../file-uploader";
import useEmployeeManagement from "@/hooks/use-employee";
import useUpload from "@/hooks/use-upload";

type EmployeeDocumentInformationFormProps = {
  handleQualificationMutated: (
    data: DocumentFormInputs | string,
    isEdited: boolean,
    isDeleted: boolean
  ) => void;
  createdDocuments: Array<DocumentFormInputs>;
};

const EmployeeDocumentInformationForm: React.FC<
  EmployeeDocumentInformationFormProps
> = ({ handleQualificationMutated, createdDocuments }) => {
  const {
    documentForm: { control, handleSubmit, reset, setValue, watch },
  } = useEmployeeManagement();

  const { uploadMutation } = useUpload();

  const handleUpload = (file: File) => {
    uploadMutation.mutate(file);
  };

  useEffect(() => {
    if (uploadMutation.isSuccess) {
      setValue("fileName", uploadMutation.data.data.fileName);
    }
  }, [uploadMutation.isSuccess]);

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
            control={control as Control<DocumentFormInputs>}
            name={`title`}
            placeholder="Enter Title"
            label="Title"
          />
          <ControlledInput<DocumentFormInputs>
            control={control as Control<DocumentFormInputs>}
            name={`category`}
            placeholder="Select Category"
            label="Category"
          />
          <ControlledInput<DocumentFormInputs>
            control={control as Control<DocumentFormInputs>}
            name={`startDate`}
            placeholder="Enter Start Date"
            type={"date"}
            label="Start Date"
          />
          <ControlledInput<DocumentFormInputs>
            control={control as Control<DocumentFormInputs>}
            name={`endDate`}
            placeholder="Enter End Date"
            label="End Date"
            type={"date"}
          />
          <ControlledInput<DocumentFormInputs>
            control={control as Control<DocumentFormInputs>}
            name={`expiryDate`}
            placeholder="Enter Expiry Date"
            label="Expiry Date"
            type={"date"}
          />
          <FileUploader
            onSelected={handleUpload}
            fileName={watch("fileName")}
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
