"use client";
import {
  employeeFormSchema,
  EmployeeFormInputs,
} from "@/schemas/employee-schema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rolesEnum } from "@/enums/roles.enum";

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

  const onSubmit = (data: EmployeeFormInputs) => {
    console.log("employee data => ", data);
  };

  return {
    employeeForm,
    onSubmit,
  };
};

export default useEmployeeManagement;
