"use client";

import React from "react";
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

const EmployeeForm = () => {
  const { employeeForm } = useEmployeeManagement();

  return (
    <Form {...employeeForm} handleSubmit={employeeForm.handleSubmit}>
      <ImageUploader />
      <div className="flex flex-col">
        <EmployeeAccountInformationForm control={employeeForm.control} />
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
                  control={employeeForm.control}
                />
              </TabsContent>
              <TabsContent value={tabs[1].value}>
                <EmployeeSettingsInformationForm
                  control={employeeForm.control}
                />
              </TabsContent>
              <TabsContent value={tabs[2].value}>
                <EmployeeJobInformationForm control={employeeForm.control} />
              </TabsContent>
              <TabsContent value={tabs[3].value}>
                <EmployeeEmployementInformationForm
                  control={employeeForm.control}
                />
              </TabsContent>
              <TabsContent value={tabs[4].value}>
                <EmployeeQualificationInformationForm
                  control={employeeForm.control}
                />
              </TabsContent>
              <TabsContent value={tabs[5].value}>
                <EmployeeContactInformationForm
                  control={employeeForm.control}
                />
              </TabsContent>
              <TabsContent value={tabs[6].value}>
                <EmployeeDocumentInformationForm
                  control={employeeForm.control}
                />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
        <div className="justify-end items-end flex w-full">
          <AppButton
            title="Create Employee"
            buttonOptions={{
              className: "w-full md:w-auto bg-primary mt-4 !px-4 !py-2",
            }}
          />
        </div>
      </div>
    </Form>
  );
};

export default EmployeeForm;
