"use client";
import {
  employeeFormSchema,
  EmployeeFormInputs,
} from "@/schemas/employee-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QualificationFormInputs,
  qualificationFormSchema,
} from "@/schemas/qualification-schema";
import { ContactFormInputs, contactFormSchema } from "@/schemas/contact-schema";
import {
  DocumentFormInputs,
  documentFormSchema,
} from "@/schemas/document-schema";
import { Qualification } from "@/types/qualification.type";
import { BaseType } from "@/types/base.type";

const useEmployeeManagement = () => {
  const employeeForm = useForm({
    resolver: zodResolver(employeeFormSchema),
  });

  const qualificationForm = useForm({
    resolver: zodResolver(qualificationFormSchema),
  });

  const contactForm = useForm({
    resolver: zodResolver(contactFormSchema),
  });

  const documentForm = useForm({
    resolver: zodResolver(documentFormSchema),
  });

  const onSubmitEmployeeForm = (data: EmployeeFormInputs) => {
    console.log("employee data => ", data);
  };

  const onCreateQualification = (data: QualificationFormInputs) => {
    const currentQualifications =
      employeeForm.watch("qualificationsInfo") || [];
    employeeForm.setValue("qualificationsInfo", [
      ...currentQualifications,
      data,
    ]);
  };

  const onCreateDocument = (data: DocumentFormInputs) => {
    const currentDocuments = employeeForm.watch("documentsInfo") || [];
    employeeForm.setValue("documentsInfo", [...currentDocuments, data]);
  };

  const onCreateContact = (data: ContactFormInputs) => {
    const currentContacts = employeeForm.watch("contactsInfo") || [];
    employeeForm.setValue("contactsInfo", [...currentContacts, data]);
  };

  return {
    employeeForm,
    onSubmitEmployeeForm,
    qualificationForm,
    contactForm,
    documentForm,
    onCreateQualification,
    onCreateDocument,
    onCreateContact,
  };
};

export default useEmployeeManagement;
