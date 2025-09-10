"use client";
import React, { useEffect } from "react";
import ControlledInput from "../controlled-input";
import ControlledSelect from "../controlled-select";
import { gendersList } from "@/enums/genders.enum";
import { relationsList } from "@/enums/relations.enum";
import AppButton from "../app-button";
import { Edit, PlusCircle, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import CustomDialogTrigger from "../custom-dialog-trigger";
import useEmployeeManagement from "@/hooks/use-employee";
import { ContactFormInputs } from "@/schemas/contact-schema";
import { Control } from "react-hook-form";
import { Card, CardContent } from "../ui/card";
import useContacts from "@/hooks/use-contacts";
import { DialogClose } from "@radix-ui/react-dialog";

type EmployeeContactInformationFormProps = {
  handleContactMutated: (
    data: ContactFormInputs | string,
    isEdited: boolean,
    isDeleted: boolean
  ) => void;
  createdContacts: Array<ContactFormInputs>;
};

const EmployeeContactInformationForm: React.FC<
  EmployeeContactInformationFormProps
> = ({ handleContactMutated, createdContacts }) => {
  const {
    contactForm: { control, handleSubmit, reset },
  } = useEmployeeManagement();

  const {
    queryContacts,
    mutateContact,
    editContact,
    removeContact,
    mutationModalOpen,
    setMutationModalOpen,
    selectedContactId,
    setSelectedContactId,
  } = useContacts();

  const onCreate = (contact: ContactFormInputs) => {
    delete contact.id;
    mutateContact.mutate(contact);
  };

  const onDelete = (contact: ContactFormInputs) => {
    removeContact.mutate(contact.id || "");
  };

  const onUpdate = (contact: ContactFormInputs) => {
    editContact.mutate({ ...contact, id: selectedContactId });
  };

  const onPressEdit = (contact: ContactFormInputs) => {
    setSelectedContactId(contact.id || "");
    reset({
      ...contact,
    });
    setMutationModalOpen(true);
  };

  const openModal = () => {
    reset({
      id: "",
      name: "",
      email: "",
      workTelephoneNumber: "",
      mobileNumber: "",
      homeTelephoneNumber: "",
      gender: "",
      relation: "",
    });
    setSelectedContactId("");
    setMutationModalOpen(true);
  };

  const mutationSuccess = (
    data: ContactFormInputs | string,
    isEdited: boolean,
    isDeleted: boolean
  ) => {
    handleContactMutated(data, isEdited, isDeleted);
    setMutationModalOpen(false);
  };

  useEffect(() => {
    if (mutateContact.isSuccess) {
      const data: ContactFormInputs = mutateContact.data.data;
      mutationSuccess(data, false, false);
    }
  }, [mutateContact.isSuccess]);

  useEffect(() => {
    if (editContact.isSuccess) {
      const data: ContactFormInputs = editContact.data.data;
      mutationSuccess(data, true, false);
    }
  }, [editContact.isSuccess]);

  useEffect(() => {
    if (removeContact.isSuccess) {
      const data: string = removeContact.data.data;
      mutationSuccess(data, true, true);
    }
  }, [removeContact.isSuccess]);

  return (
    <div className="flex flex-col gap-4">
      <Dialog open={mutationModalOpen}>
        <CustomDialogTrigger
          title="Add New Contact"
          icon={<PlusCircle />}
          iconPosition="start"
          containerClasses="bg-accent text-white text-sm float-right md:max-w-[300px] self-end"
          openModal={openModal}
        />
        <DialogContent>
          <DialogTitle>Add Employee Contact</DialogTitle>
          <div className="grid grid-cols-1 gap-4 my-4">
            <ControlledInput<ContactFormInputs>
              control={control as Control<ContactFormInputs>}
              name={`name`}
              placeholder="Enter Name"
              label="Name"
            />
            <ControlledSelect<ContactFormInputs>
              control={control as Control<ContactFormInputs>}
              name={`gender`}
              placeholder="Select Gender"
              label="Gender"
              list={gendersList}
            />
            <ControlledSelect<ContactFormInputs>
              control={control as Control<ContactFormInputs>}
              name={`relation`}
              placeholder="Select Relation"
              label="Relation"
              list={relationsList}
            />
            <ControlledInput<ContactFormInputs>
              control={control as Control<ContactFormInputs>}
              name={`mobileNumber`}
              placeholder="Enter Mobile Number"
              label="Mobile Number"
            />
            <ControlledInput<ContactFormInputs>
              control={control as Control<ContactFormInputs>}
              name={`email`}
              placeholder="Enter Email"
              label="Email"
              type={"email"}
            />
            <ControlledInput<ContactFormInputs>
              control={control as Control<ContactFormInputs>}
              name={`homeTelephoneNumber`}
              placeholder="Enter Home Telephone Number"
              label="Home Telephone Number"
              type={"email"}
            />
          </div>
          <DialogFooter>
            {selectedContactId ? (
              <AppButton
                title="Update Contact"
                buttonOptions={{
                  className: "bg-secondary text-white",
                  onClick: handleSubmit(onUpdate),
                }}
                isLoading={editContact.isPending}
              />
            ) : (
              <AppButton
                title="Add Contact"
                buttonOptions={{
                  className: "bg-secondary text-white",
                  onClick: handleSubmit(onCreate),
                }}
                isLoading={mutateContact.isPending}
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
        {createdContacts.length === 0 && (
          <p className="text-sm text-semibold text-secondary">
            No contacts data
          </p>
        )}
        {createdContacts.map((contact) => {
          return (
            <Card>
              <CardContent className="flex justify-between">
                <p className="text-primary text-sm font-semibold">
                  {contact.name}
                </p>
                <div className="flex gap-2 cursor-pointer">
                  <Edit
                    className="hover:text-accent text-primary"
                    size="20"
                    onClick={() => onPressEdit(contact)}
                  />
                  <Trash
                    className="hover:text-accent text-primary"
                    size="20"
                    onClick={() => onDelete(contact)}
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

export default EmployeeContactInformationForm;
