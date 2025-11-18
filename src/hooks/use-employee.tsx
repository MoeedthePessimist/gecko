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
import { useMutation } from "@tanstack/react-query";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "@/api/user";
import { AxiosError } from "axios";
import { useTypedQuery } from "./use-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { User } from "@/types/user.type";
import { formatRoles } from "@/lib/utils";
import { rolesEnum } from "@/enums/roles.enum";
import { Qualification } from "@/types/qualification.type";
import { Document } from "@/types/document.type";
import { Contact } from "@/types/contact.type";
import { AxiosErrorWithMessage } from "@/types/common.type";
import { useGlobalModal } from "@/context/error-context";
import { useRouter } from "next/navigation";
import { ADMIN_ROUTES } from "@/constants/routes";

const useEmployeeManagement = (
  id?: string,
  employeeData?: User,
  isUpdate?: boolean
) => {
  const { showError, showSuccess } = useGlobalModal();
  const router = useRouter();

  const employeeForm = useForm({
    resolver: zodResolver(employeeFormSchema(isUpdate)),
    defaultValues: {
      accountInfo: {
        name: employeeData?.name || "",
        identityNumber: employeeData?.identityNumber || "",
        identityType: employeeData?.identityType || "",
        gender: employeeData?.gender || "",
        race: employeeData?.race || "",
        mobileNumber: employeeData?.mobileNumber || "",
        email: employeeData?.email || "",
        password: "",
        repeatPassword: "",
        optionalEmail: employeeData?.optionalEmail || "",
        allowLogin: employeeData?.allowLogin || false,
        dateOfBirth: new Date(employeeData?.dateOfBirth || new Date()),
        avatar: employeeData?.avatar || "",
      },
      generalInfo: {
        houseNo: employeeData?.houseNo || "",
        levelNo: employeeData?.levelNo || "",
        unitNo: employeeData?.unitNo || "",
        address: employeeData?.address || "",
        city: employeeData?.city || "",
        state: employeeData?.state || "",
        role: employeeData?.roles
          ? formatRoles(employeeData?.roles as rolesEnum[])[0]
          : "",
        isNonResidentialDirector: employeeData?.isNonResidentialDirector || "",
        bank: employeeData?.bank || undefined,
        addressType: employeeData?.addressType || undefined,
        country: employeeData?.country || undefined,
        postalCode: employeeData?.postalCode || "",
        nationality: employeeData?.nationality || undefined,
        maritalStatus: employeeData?.maritalStatus || undefined,
        homeTelephoneNumber: employeeData?.homeTelephoneNumber || "",
        workTelephoneNumber: employeeData?.workTelephoneNumber || "",
      },
      settingsInfo: {
        cpfTable: employeeData?.cpfTable?.id || undefined,
        employerPaysCpf: employeeData?.employerPaysCpf || false,
        prEffectiveDate: new Date(employeeData?.prEffectiveDate || new Date()),
        cpfNumber: employeeData?.cpfNumber || "",
        taxNumber: employeeData?.taxNumber || "",
        workTable: employeeData?.workTable?.id || undefined,
        leaveTable: employeeData?.leaveTable?.id || undefined,
        levy: employeeData?.levy?.id || undefined,
        noSdlContribution: employeeData?.noSdlContribution || false,
        noShgContribution: employeeData?.noShgContribution || false,
        useAttendanceRecords: employeeData?.useAttendanceRecords || false,
        maxPayToCalculate: employeeData?.maxPayToCalculate || 0,
        allowanceCommission: employeeData?.allowanceCommission || 0,
        allowanceErrorFee: employeeData?.allowanceErrorFee || 0,
        deductionCdac: employeeData?.deductionCdac || 0,
        deductionEcf: employeeData?.deductionEcf || 0,
        deductionMbmf: employeeData?.deductionMbmf || 0,
        deductionEcfSinda: employeeData?.deductionEcfSinda || 0,
      },
      jobInfo: {
        title: employeeData?.job?.title || "",
        jobCategory: employeeData?.job?.jobCategory || "",
        designation: employeeData?.job?.designation || "",
        basicRate: employeeData?.job?.basicRate || 0,
        startDate: new Date(employeeData?.job?.startDate || new Date()),
        endDate: new Date(employeeData?.job?.endDate || new Date()),
      },
      employementInfo: {
        department: employeeData?.employment?.department || "",
        dateJoined: new Date(
          employeeData?.employment?.dateJoined || new Date()
        ),
        dateLeft: new Date(employeeData?.employment?.dateLeft || new Date()),
        probationFrom: new Date(
          employeeData?.employment?.probationFrom || new Date()
        ),
        probationTo: new Date(
          employeeData?.employment?.probationTo || new Date()
        ),
        employmentType: employeeData?.employment?.employmentType || undefined,
        status: employeeData?.employment?.status || undefined,
        directManager: employeeData?.employment?.directManager || undefined,
      },
      qualificationsInfo: employeeData?.qualifications || [],
      contactsInfo: employeeData?.contacts || [],
      documentsInfo: employeeData?.documents || [],
    },
  });

  const createEmployeeMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: (data) => {
      console.log(data);
      showSuccess("Employee created successfully!");
      employeeForm.reset();
      router.push(ADMIN_ROUTES.EMPLOYEE_MANAGEMENT);
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.error(error);
      showError(
        error.response?.data.message ||
          "Failed to create employee. Please try again."
      );
    },
  });

  const deleteEmployeeMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: AxiosError) => {
      console.error(error);
    },
  });

  const updateEmployeeMutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: (data) => {
      console.log(data);
      showSuccess("Employee updated successfully!");
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.error(error);
      showError(
        error.response?.data.message ||
          "Failed to update employee. Please try again."
      );
    },
  });

  const getEmployeeQuery = useTypedQuery({
    queryKey: [QUERY_KEYS.EMPLOYEE, id],
    queryFn: () => getEmployee(id!),
    enabled: !!id,
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
        (qualification: Qualification) =>
          qualification.id !== deletedQualificationId
      );
      employeeForm.setValue("qualificationsInfo", restQualifications);
      return;
    }

    if (typeof data === "string") {
      return;
    }

    if (isEdited) {
      const editedQualificationId = data.id;

      const updatedQualifications = currentQualifications.map(
        (qualification: Qualification) =>
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
        (document: Document) => document.id !== deletedDocumentId
      );
      employeeForm.setValue("documentsInfo", restDocuments);
      return;
    }

    if (typeof data === "string") {
      return;
    }

    if (isEdited) {
      const editedDocumentId = data.id;

      const updatedDocuments = currentDocuments.map((document: Document) =>
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
        (contact: Contact) => contact.id !== deletedContactId
      );
      employeeForm.setValue("contactsInfo", restContacts);
      return;
    }

    if (typeof data === "string") {
      return;
    }

    if (isEdited) {
      const editedContactId = data.id;

      const updatedContacts = currentContacts.map((contact: Contact) =>
        contact.id === editedContactId ? data : contact
      );
      employeeForm.setValue("contactsInfo", updatedContacts);
      return;
    }

    employeeForm.setValue("contactsInfo", [...currentContacts, data]);
  };

  const onProfileImageUpload = (fileName: string) => {
    employeeForm.setValue("accountInfo.avatar", fileName);
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
    createEmployeeMutation,
    deleteEmployeeMutation,
    updateEmployeeMutation,
    getEmployeeQuery,
    onProfileImageUpload,
  };
};

export default useEmployeeManagement;
