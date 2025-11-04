"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import Avatar from "./avatar";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import TitleValuePair from "./title-value-pair";
import AppButton from "./app-button";
import { EditIcon, Trash2 } from "lucide-react";
import { User } from "@/types/user.type";
import { useAuthContext } from "@/context/auth-context";
import useEmployeeManagement from "@/hooks/use-employee";
import { useRouter } from "next/navigation";
import { useGlobalModal } from "@/context/error-context";

type EmployeeCardProps = {
  employee?: User;
  deleteEmployeeMutation: ReturnType<
    typeof useEmployeeManagement
  >["deleteEmployeeMutation"];
};

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  deleteEmployeeMutation,
}) => {
  const { user } = useAuthContext();
  const isOwner = user?.id === employee?.id;

  const navigation = useRouter();

  const { showConfirmation, showError, showSuccess, closeConfirmation } =
    useGlobalModal();

  const {
    mutate: deleteEmployee,
    isPending: isDeletingEmployee,
    isSuccess,
    isError,
  } = deleteEmployeeMutation;

  const handleUpdateClick = () => {
    const employeeId = employee?.id;

    if (employeeId) {
      navigation.push(`/admin/employee-management/update/${employeeId}`);
    }

    return;
  };

  const handleDeleteEmployee = () => {
    if (employee?.id) {
      deleteEmployee(employee.id);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      showSuccess("Employee deleted successfully.");
      closeConfirmation();
    }
    if (isError) {
      showError("Failed to delete employee. Please try again.");
    }
  }, [isSuccess, isError]);

  const onDelete = () => {
    showConfirmation(
      "Are you sure you want to delete this employee? This action cannot be undone.",
      handleDeleteEmployee,
      {
        confirmText: "Delete Employee",
        isDestructive: true,
      }
    );
  };

  return (
    <Card className="rounded-xl flex flex-col p-4 w-full border-2 relative">
      {isOwner && (
        <p className="text-white bg-accent px-4 text-sm rounded-sm absolute -top-2 -right-2 z-20">
          You
        </p>
      )}
      <CardHeader className="relative w-full h-32">
        <Image
          src="/images/cover-placeholder.jpg"
          alt="cover placeholder"
          fill
          className="object-cover rounded-xl"
        />
        <div
          className="flex flex-row gap-2 md:gap-4 absolute z-10 -bottom-8 md:-bottom-14 left-10 items-end
        "
        >
          <Avatar
            name={employee?.name || ""}
            avatar={employee?.avatar || "https://github.com/shadcn.png"}
            containerClasses="w-16 h-16 md:w-24 md:h-24"
          />
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 lg:grid-cols-3 mt-10 gap-4">
        <TitleValuePair title="ID" value={employee?.identityNumber || "N/A"} />
        <TitleValuePair title="Name" value={employee?.name || "N/A"} />
        <TitleValuePair title="Email" value={employee?.email || "N/A"} />
        <TitleValuePair
          title="Job Category"
          value={employee?.job?.jobCategory || "N/A"}
        />
        <TitleValuePair
          title="Designation"
          value={employee?.job?.designation || "N/A"}
        />
        <TitleValuePair title="Phone" value={employee?.mobileNumber || "N/A"} />
      </CardContent>

      <CardFooter className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AppButton
          buttonOptions={{
            className:
              "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white",
            disabled: isOwner,
            onClick: handleUpdateClick,
          }}
          title="Edit"
          icon={<EditIcon />}
          iconPosition="start"
        />

        <AppButton
          buttonOptions={{
            className:
              "bg-white text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white",
            disabled: isOwner,
            onClick: onDelete,
          }}
          isLoading={isDeletingEmployee}
          title="Delete"
          icon={<Trash2 />}
          iconPosition="end"
        />
      </CardFooter>
    </Card>
  );
};

export default EmployeeCard;
