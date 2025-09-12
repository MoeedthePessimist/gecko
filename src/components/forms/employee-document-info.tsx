"use client";
import React, { useEffect } from "react";
import { Control } from "react-hook-form";
import ControlledInput from "../controlled-input";
import AppButton from "../app-button";
import { Edit, PlusCircle, Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import CustomDialogTrigger from "../custom-dialog-trigger";
import { DocumentFormInputs } from "@/schemas/document-schema";
import { FileUploader } from "../file-uploader";
import useEmployeeManagement from "@/hooks/use-employee";
import useUpload from "@/hooks/use-upload";
import useDocuments from "@/hooks/use-documents";
import { Card, CardContent } from "../ui/card";
import ControlledDatePicker from "../controlled-date-picker";

type EmployeeDocumentInformationFormProps = {
  handleDocumentMutated: (
    data: DocumentFormInputs | string,
    isEdited: boolean,
    isDeleted: boolean
  ) => void;
  createdDocuments: Array<DocumentFormInputs>;
};

const EmployeeDocumentInformationForm: React.FC<
  EmployeeDocumentInformationFormProps
> = ({ handleDocumentMutated, createdDocuments }) => {
  const {
    documentForm: {
      control,
      handleSubmit,
      reset,
      setValue,
      watch,
      formState: { errors },
    },
  } = useEmployeeManagement();

  console.log(errors);

  const {
    editDocument,
    mutateDocument,
    mutationModalOpen,
    queryDocuments,
    removeDocument,
    selectedDocumentId,
    setMutationModalOpen,
    setSelectedDocumentId,
  } = useDocuments();

  const { uploadMutation } = useUpload();

  const handleUpload = (file: File) => {
    uploadMutation.mutate(file);
  };

  const onCreate = (document: DocumentFormInputs) => {
    delete document.id;
    mutateDocument.mutate(document);
  };

  const onUpdate = (document: DocumentFormInputs) => {
    editDocument.mutate({ ...document, id: selectedDocumentId });
  };

  const onDelete = (document: DocumentFormInputs) => {
    removeDocument.mutate(document.id || "");
  };

  const openModal = () => {
    reset({
      id: "",
      title: "",
      category: "",
      fileName: "",
      remarks: "",
      startDate: null,
      endDate: null,
      expiryDate: null,
    });
    setSelectedDocumentId("");
    setMutationModalOpen(true);
  };

  const onPressEdit = (document: DocumentFormInputs) => {
    setSelectedDocumentId(document.id || "");
    reset({
      ...document,
      startDate: document.startDate ? new Date(document.startDate) : null,
      endDate: document.endDate ? new Date(document.endDate) : null,
      expiryDate: document.expiryDate ? new Date(document.expiryDate) : null,
    });
    setMutationModalOpen(true);
  };

  const mutationSuccess = (
    data: DocumentFormInputs | string,
    isEdited: boolean,
    isDeleted: boolean
  ) => {
    handleDocumentMutated(data, isEdited, isDeleted);
    setMutationModalOpen(false);
  };

  useEffect(() => {
    if (uploadMutation.isSuccess) {
      setValue("fileName", uploadMutation.data.data.fileName);
    }
  }, [uploadMutation.isSuccess]);

  useEffect(() => {
    if (mutateDocument.isSuccess) {
      const data: DocumentFormInputs = mutateDocument.data.data;
      mutationSuccess(data, false, false);
    }
  }, [mutateDocument.isSuccess]);

  useEffect(() => {
    if (editDocument.isSuccess) {
      const data: DocumentFormInputs = editDocument.data.data;
      mutationSuccess(data, true, false);
    }
  }, [editDocument.isSuccess]);

  useEffect(() => {
    if (removeDocument.isSuccess) {
      const data: string = removeDocument.data.data;
      mutationSuccess(data, true, true);
    }
  }, [removeDocument.isSuccess]);

  return (
    <div className="flex flex-col gap-4">
      <Dialog open={mutationModalOpen}>
        <CustomDialogTrigger
          title="Add New Document"
          icon={<PlusCircle />}
          iconPosition="start"
          containerClasses="bg-accent text-white text-sm float-right md:max-w-[300px] self-end"
          openModal={openModal}
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
            <ControlledDatePicker<DocumentFormInputs>
              control={control as Control<DocumentFormInputs>}
              name={"startDate"}
              label={"Start Date"}
              placeholder="Pick a start date"
            />
            <ControlledDatePicker<DocumentFormInputs>
              control={control as Control<DocumentFormInputs>}
              name={"endDate"}
              label={"End Date"}
              placeholder="Pick an end date"
            />
            <ControlledDatePicker<DocumentFormInputs>
              control={control as Control<DocumentFormInputs>}
              name={"expiryDate"}
              label={"Expiry Date"}
              placeholder="Pick an expiry date"
            />
            <FileUploader
              onSelected={handleUpload}
              fileName={watch("fileName")}
            />
          </div>
          <DialogFooter>
            {selectedDocumentId ? (
              <AppButton
                title="Update Document"
                buttonOptions={{
                  className: "bg-secondary text-white",
                  onClick: handleSubmit(onUpdate),
                }}
                isLoading={editDocument.isPending}
              />
            ) : (
              <AppButton
                title="Add Document"
                buttonOptions={{
                  className: "bg-secondary text-white",
                  onClick: handleSubmit(onCreate),
                }}
                isLoading={mutateDocument.isPending}
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
        {createdDocuments.length === 0 && (
          <p className="text-sm text-semibold text-secondary">
            No documents data
          </p>
        )}
        {createdDocuments.map((document) => {
          return (
            <Card key={document.id}>
              <CardContent className="flex justify-between">
                <p className="text-primary text-sm font-semibold">
                  {document.title}
                </p>
                <div className="flex gap-2 cursor-pointer">
                  <Edit
                    className="hover:text-accent text-primary"
                    size="20"
                    onClick={() => onPressEdit(document)}
                  />
                  <Trash
                    className="hover:text-accent text-primary"
                    size="20"
                    onClick={() => onDelete(document)}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeDocumentInformationForm;
