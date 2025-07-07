"use client";
import {
  employeeFormSchema,
  EmployeeFormInputs,
} from "@/schemas/employee-schema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rolesEnum } from "@/enums/roles.enum";
import { QualificationFormInputs } from "@/schemas/qualification-schema";
import { ContactFormInputs } from "@/schemas/contact-schema";
import { DocumentFormInputs } from "@/schemas/document-schema";

const useEmployeeManagement = () => {
  const employeeForm = useForm<EmployeeFormInputs>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      accountInfo: {
        dateOfBirth: undefined,
        email: "",
        gender: "",
        identityNumber: "",
        identityType: "",
        mobileNumber: "",
        name: "",
        password: "",
        race: "",
        repeatPassword: "",
      },
      generalInfo: {
        address: "",
        addresstype: "",
        bank: {
          bankAccountNumber: "",
          bankName: "",
          bankSwiftCode: "",
        },
        city: "",
        country: "",
        maritalStatus: "",
        nationality: "",
        role: rolesEnum.EMPLOYEE,
        state: "",
      },
      contactsInfo: [],
      documentsInfo: [],
      employementInfo: {
        dateJoined: undefined,
        dateLeft: undefined,
        department: "",
        directManager: "",
        employmentType: "",
        probationFrom: undefined,
        probationTo: undefined,
        status: "",
      },
      jobInfo: {
        basicRate: 0,
        designation: "",
        endDate: undefined,
        jobCategory: "",
        payBasis: "",
        startDate: undefined,
        title: "",
      },
      qualificationsInfo: [],
      settingsInfo: {
        cpfNo: "",
        cpfTable: "",
        leaveTable: "",
        taxNo: "",
        workTable: "",
      },
    },
  });

  const qualificationForm = useForm<QualificationFormInputs>({
    defaultValues: {
      comment: "",
      endDate: undefined,
      expiryDate: undefined,
      level: "",
      nameOfInstitution: "",
      startDate: undefined,
      type: "",
    },
  });

  const contactForm = useForm<ContactFormInputs>({
    defaultValues: {
      email: "",
      gender: "",
      mobileNumber: "",
      name: "",
      relation: "",
    },
  });

  const documentForm = useForm<DocumentFormInputs>({
    defaultValues: {
      category: "",
      endDate: undefined,
      expiryDate: undefined,
      fileName: "",
      remarks: "",
      startDate: undefined,
      title: "",
    },
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
