"use client";
import { Form } from "../ui/form";
import useEmployeeManagement from "@/hooks/use-employee";
import EmployeeAccountInformationForm from "./employee-account-info";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import tabs from "../../../public/data/employee-form-tabs.json";
import EmployeeGeneralInformationForm from "./employee-general-info";
import EmployeeSettingsInformationForm from "./employee-settings-info";
import EmployeeJobInformationForm from "./employee-job-info";
import EmployeeEmployementInformationForm from "./employee-employment-info";
import EmployeeQualificationInformationForm from "./employee-qualification-info";
import EmployeeContactInformationForm from "./employee-contact-info";
import EmployeeDocumentInformationForm from "./employee-document-info";
import { Card, CardContent, CardHeader } from "../ui/card";
import AppButton from "../app-button";
import ImageUploader from "../image-uploader";
import { Control } from "react-hook-form";
import { EmployeeFormInputs } from "@/schemas/employee-schema";
import { QualificationFormInputs } from "@/schemas/qualification-schema";
import { ContactFormInputs } from "@/schemas/contact-schema";
import { DocumentFormInputs } from "@/schemas/document-schema";
import { User } from "@/types/user.type";
import React, { useEffect } from "react";
import useCompany from "@/hooks/use-company";

type EmployeeFormProps = {
  data?: User;
  isUpdate?: boolean;
  userId?: string;
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  data,
  isUpdate = false,
  userId = "",
}) => {
  const {
    employeeForm,
    onMutateQualification,
    onMutateContact,
    onMutateDocument,
    createEmployeeMutation,
    updateEmployeeMutation,
    onProfileImageUpload,
  } = useEmployeeManagement(undefined, data, isUpdate);

  const { getCompanyAdditionalDataQuery } = useCompany();

  const companyAdditionalData = getCompanyAdditionalDataQuery.data?.data;

  const onSubmit = (data: EmployeeFormInputs) => {
    if (isUpdate) {
      if (data.accountInfo.password === "") {
        delete data.accountInfo.password;
      }
      if (data.generalInfo.bank.bankAccountNumber === "") {
        delete data.generalInfo.bank.bankAccountNumber;
      }
      if (data.generalInfo.bank.bankSwiftCode === "") {
        delete data.generalInfo.bank.bankSwiftCode;
      }
      updateEmployeeMutation.mutate({
        id: userId,
        payload: {
          id: userId,
          ...data,
        },
      });
      return;
    }
    createEmployeeMutation.mutate(data);
  };

  console.log(employeeForm.formState.errors);
  console.log(employeeForm.getValues());

  useEffect(() => {
    if (isUpdate) {
      console.log("unregistering");
      employeeForm.unregister("accountInfo.password");
      employeeForm.unregister("accountInfo.repeatPassword");
      employeeForm.unregister("generalInfo.bank.bankAccountNumber");
      employeeForm.unregister("generalInfo.bank.bankSwiftCode");
    }
  }, [isUpdate]);

  return (
    <Form {...employeeForm} handleSubmit={employeeForm.handleSubmit}>
      <ImageUploader
        onImageUpload={onProfileImageUpload}
        currentImage={employeeForm.watch("accountInfo.avatar")}
      />
      <div className="flex flex-col">
        <EmployeeAccountInformationForm
          control={employeeForm.control as Control<EmployeeFormInputs>}
        />
        <Card>
          <Tabs defaultValue={tabs[0].value}>
            <CardHeader>
              <TabsList>
                {tabs.map((tab, idx) => (
                  <TabsTrigger
                    value={tab.value}
                    key={idx}
                    className="cursor-pointer"
                  >
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value={tabs[0].value}>
                <EmployeeGeneralInformationForm
                  control={employeeForm.control as Control<EmployeeFormInputs>}
                />
              </TabsContent>
              <TabsContent value={tabs[1].value}>
                <EmployeeSettingsInformationForm
                  control={employeeForm.control as Control<EmployeeFormInputs>}
                  leviesList={companyAdditionalData?.levies || []}
                  leaveTablesList={companyAdditionalData?.leaveTables || []}
                  workTablesList={companyAdditionalData?.workTables || []}
                  cpfTablesList={companyAdditionalData?.cpfTables || []}
                />
              </TabsContent>
              <TabsContent value={tabs[2].value}>
                <EmployeeJobInformationForm
                  control={employeeForm.control as Control<EmployeeFormInputs>}
                  jobCategoriesList={companyAdditionalData?.jobCategories || []}
                  designationsList={companyAdditionalData?.designations || []}
                />
              </TabsContent>
              <TabsContent value={tabs[3].value}>
                <EmployeeEmployementInformationForm
                  control={employeeForm.control as Control<EmployeeFormInputs>}
                  managersList={companyAdditionalData?.users || []}
                  departmentsList={companyAdditionalData?.departments || []}
                />
              </TabsContent>
              <TabsContent value={tabs[4].value}>
                <EmployeeQualificationInformationForm
                  handleQualificationMutated={onMutateQualification}
                  createdQualifications={
                    (employeeForm.watch(
                      "qualificationsInfo"
                    ) as Array<QualificationFormInputs>) || []
                  }
                />
              </TabsContent>
              <TabsContent value={tabs[5].value}>
                <EmployeeContactInformationForm
                  handleContactMutated={onMutateContact}
                  createdContacts={
                    (employeeForm.watch(
                      "contactsInfo"
                    ) as Array<ContactFormInputs>) || []
                  }
                />
              </TabsContent>
              <TabsContent value={tabs[6].value}>
                <EmployeeDocumentInformationForm
                  handleDocumentMutated={onMutateDocument}
                  createdDocuments={
                    (employeeForm.watch(
                      "documentsInfo"
                    ) as Array<DocumentFormInputs>) || []
                  }
                />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
        <div className="justify-end items-end flex w-full">
          <AppButton
            title={!isUpdate ? "Create Employee" : "Update Employee"}
            buttonOptions={{
              className: "w-full md:w-auto bg-primary mt-4 !px-4 !py-2",
              onClick: () => employeeForm.handleSubmit(onSubmit)(),
            }}
          />
        </div>
      </div>
    </Form>
  );
};

export default EmployeeForm;
