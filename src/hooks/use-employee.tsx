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
    defaultValues: {
      accountInfo: {
        name: "",
        identityNumber: "",
        identityType: "",
        gender: "",
        race: "",
        mobileNumber: "",
        email: "",
        password: "",
        repeatPassword: "",
        optionalEmail: "",
        allowLogin: false,
        dateOfBirth: new Date(),
      },
      generalInfo: {
        addresstype: "",
        houseNo: "",
        levelNo: "",
        unitNo: "",
        address: "",
        city: "",
        state: "",
        country: "",
        nationality: "",
        maritalStatus: "",
        role: "",
        homeTelephoneNumber: "",
        workTelephoneNumber: "",
        isNonResidentialDirector: "",
        bank: {
          bankName: "",
          bankSwiftCode: "",
          bankAccountNumber: "",
        },
      },
      settingsInfo: {
        cpfTable: "",
        employerPaysCpf: false,
        prEffectiveDate: new Date(),
        cpfNo: "",
        taxNo: "",
        workTable: {},
        leaveTable: {},
        levy: {},
        noSdlContribution: false,
        noShgContribution: false,
        useAttendanceRecords: false,
        maxPayToCalculate: 0,
        allowanceCommission: 0,
        allowanceErrorFee: 0,
        deductionCdac: 0,
        deductionEcf: 0,
        deductionMbmf: 0,
        deductionEcfSinda: 0,
      },
      jobInfo: {
        title: "",
        jobCategory: "",
        designation: "",
        basicRate: 0,
        payBasis: "",
        startDate: new Date(),
        endDate: new Date(),
      },
      employementInfo: {
        department: "",
        employmentType: "",
        status: "",
        directManager: {},
        dateJoined: new Date(),
        dateLeft: new Date(),
        probationFrom: new Date(),
        probationTo: new Date(),
      },
      qualificationsInfo: [],
      contactsInfo: [],
      documentsInfo: [],
    },
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

  const onMutateDocument = (
    data: DocumentFormInputs | string,
    isEdited: boolean,
    isDeleted: boolean
  ) => {
    const currentDocuments = employeeForm.watch("documentsInfo") || [];

    if (isDeleted) {
      const deletedDocumentId = data;
      const restDocuments = currentDocuments.filter(
        (document) => document.id !== deletedDocumentId
      );
      employeeForm.setValue("documentsInfo", restDocuments);
      return;
    }

    if (typeof data === "string") {
      return;
    }

    if (isEdited) {
      const editedDocumentId = data.id;

      const updatedDocuments = currentDocuments.map((document) =>
        document.id === editedDocumentId ? data : document
      );
      employeeForm.setValue("documentsInfo", updatedDocuments);
      return;
    }

    employeeForm.setValue("documentsInfo", [...currentDocuments, data]);
  };

  const onMutateContact = (
    data: ContactFormInputs | string,
    isEdited: boolean,
    isDeleted: boolean
  ) => {
    const currentContacts = employeeForm.watch("contactsInfo") || [];

    if (isDeleted) {
      const deletedContactId = data;
      const restContacts = currentContacts.filter(
        (contact) => contact.id !== deletedContactId
      );
      employeeForm.setValue("contactsInfo", restContacts);
      return;
    }

    if (typeof data === "string") {
      return;
    }

    if (isEdited) {
      const editedContactId = data.id;

      const updatedContacts = currentContacts.map((contact) =>
        contact.id === editedContactId ? data : contact
      );
      employeeForm.setValue("contactsInfo", updatedContacts);
      return;
    }

    employeeForm.setValue("contactsInfo", [...currentContacts, data]);
  };

  return {
    employeeForm,
    onSubmitEmployeeForm,
    qualificationForm,
    contactForm,
    documentForm,
    onMutateQualification,
    onMutateDocument,
    onMutateContact,
  };
};

export default useEmployeeManagement;
