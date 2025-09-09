"use client";
import React from "react";
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

  return (
    <div className="flex flex-col gap-4">
      <Dialog>
        <CustomDialogTrigger
          title="Add New Contact"
          icon={<PlusCircle />}
          iconPosition="start"
          containerClasses="bg-accent text-white text-sm float-right"
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
          </div>
          <DialogFooter>
            <AppButton
              title="Add Contact"
              buttonOptions={{
                className: "bg-secondary text-white",
              }}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {createdContacts.length === 0 && (
          <p className="text-sm text-semibold text-secondary">
            No qualifications data
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
                    // onClick={() => onEdit(contact)}
                  />
                  <Trash
                    className="hover:text-accent text-primary"
                    size="20"
                    // onClick={() => onDelete(contact)}
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
