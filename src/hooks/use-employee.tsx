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

  const onSubmitDocumentForm = (data: DocumentFormInputs) => {
    console.log("qualification data => ", data);
  };

  const onSubmitContactForm = (data: ContactFormInputs) => {
    console.log("qualification data => ", data);
  };

  const onSubmitQualificationForm = (data: QualificationFormInputs) => {
    console.log("qualification data => ", data);
  };

  const onSubmitEmployeeForm = (data: EmployeeFormInputs) => {
    console.log("employee data => ", data);
  };

  return {
    employeeForm,
    onSubmitEmployeeForm,
    qualificationForm,
    onSubmitQualificationForm,
    contactForm,
    onSubmitContactForm,
    documentForm,
    onSubmitDocumentForm,
  };
};

export default useEmployeeManagement;
