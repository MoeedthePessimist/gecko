"use server";

import AppButton from "@/components/app-button";
import EmployeeCard from "@/components/employee-card";
import SearchBar from "@/components/search-bar";
import { PlusCircle } from "lucide-react";
import React from "react";

const EmployeeManagementPage = () => {
  return (
    <div className="flex flex-col items-center gap-8 p-5 ">
      {/* searchbar and add button */}
      <div className="w-full flex gap-2">
        <SearchBar />
        <AppButton
          title="Add New Employee"
          buttonOptions={{
            className: "bg-accent text-white",
          }}
          icon={<PlusCircle />}
          iconPosition="end"
        />
      </div>
      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
      </div>
    </div>
  );
};

export default EmployeeManagementPage;
