"use client";
import React from "react";
import ControlledInput from "../controlled-input";
import ControlledSelect from "../controlled-select";
import { gendersList } from "@/enums/genders.enum";
import { relationsList } from "@/enums/relations.enum";
import AppButton from "../app-button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import CustomDialogTrigger from "../custom-dialog-trigger";
import useEmployeeManagement from "@/hooks/use-employee";
import { ContactFormInputs } from "@/schemas/contact-schema";

type EmployeeContactInformationFormProps = {
  // control: Control<ContactFormInputs>;
};

const EmployeeContactInformationForm: React.FC<
  EmployeeContactInformationFormProps
> = ({}) => {
  const { contactForm, onSubmitContactForm } = useEmployeeManagement();

  return (
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
            control={contactForm.control}
            name={`contactsInfo.${0}.name`}
            placeholder="Enter Name"
            label="Name"
          />
          <ControlledSelect<ContactFormInputs>
            control={contactForm.control}
            name={`contactsInfo.${0}.gender`}
            placeholder="Select Gender"
            label="Gender"
            list={gendersList}
          />
          <ControlledSelect<ContactFormInputs>
            control={contactForm.control}
            name={`contactsInfo.${0}.relation`}
            placeholder="Select Relation"
            label="Relation"
            list={relationsList}
          />
          <ControlledInput<ContactFormInputs>
            control={contactForm.control}
            name={`contactsInfo.${0}.mobileNumber`}
            placeholder="Enter Mobile Number"
            label="Mobile Number"
          />
          <ControlledInput<ContactFormInputs>
            control={contactForm.control}
            name={`contactsInfo.${0}.email`}
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
  );
};

export default EmployeeContactInformationForm;
