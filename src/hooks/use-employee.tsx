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

  const onMutateQualification = (
    data: QualificationFormInputs | string,
    isEdited: boolean,
    isDeleted: boolean
  ) => {
    const currentQualifications =
      employeeForm.watch("qualificationsInfo") || [];

    if (isDeleted) {
      const deletedQualificationId = data;
      const restQualifications = currentQualifications.filter(
        (qualification) => qualification.id !== deletedQualificationId
      );
      employeeForm.setValue("qualificationsInfo", restQualifications);
      return;
    }

    if (typeof data === "string") {
      return;
    }

    if (isEdited) {
      const editedQualificationId = data.id;

      const updatedQualifications = currentQualifications.map((qualification) =>
        qualification.id === editedQualificationId ? data : qualification
      );
      employeeForm.setValue("qualificationsInfo", updatedQualifications);
      return;
    }

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
    onMutateQualification,
    onCreateDocument,
    onCreateContact,
  };
};

export default useEmployeeManagement;
