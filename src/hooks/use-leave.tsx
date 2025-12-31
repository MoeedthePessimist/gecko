import {
  deleteLeave,
  getLeaveDetails,
  getLeaves,
  mutateLeave,
} from "@/api/leave";
import { useGlobalModal } from "@/context/error-context";
import { AxiosErrorWithMessage } from "@/types/common.type";
import { Leave, LeaveWithNecessaryFields } from "@/types/leave.type";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useTypedQuery } from "./use-query";
import { GetLeavesResponseType, UserLeaveDetailsType } from "@/types/api.type";
import useEmployeeManagement from "./use-employee";
import { cn, getAdminsWithSelectedFields } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeaveFormInputs, leaveFormSchema } from "@/schemas/leave-schema";
import useUpload from "./use-upload";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import { applicationsStatusesEnum } from "@/enums/statuses.enum";

const initialFormState = {
  id: "",
  type: "",
  monthToApply: null,
  from: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  to: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 2),
  totalDays: 0,
  file: "",
  emailTo: [] as string[],
  user: "",
};

const useLeave = (
  setLeaves: React.Dispatch<Array<Leave>>,
  setSelectedUserDetails?: React.Dispatch<UserLeaveDetailsType>,
  isDashboard?: boolean
) => {
  const columns: ColumnDef<LeaveWithNecessaryFields>[] = [
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "totalDays",
      header: "Total days",
    },
    {
      accessorKey: "from",
      header: "From",
      cell: ({ row }) => {
        const raw = row.getValue("from");
        const date = new Date(raw as Date);

        return (
          <span>
            {date.toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </span>
        );
      },
    },
    {
      accessorKey: "to",
      header: "To",
      cell: ({ row }) => {
        const raw = row.getValue("to");
        const date = new Date(raw as Date);

        return (
          <span>
            {date.toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </span>
        );
      },
    },
    {
      accessorKey: "user",
      header: "Employee",
      cell: ({ row }) => {
        const raw = row.getValue("user");
        const userId = typeof raw === "string" ? raw : (raw as any)?.id;
        const name = users.find((user) => user.code === userId)?.name;
        return <span>{name ? name : "-"}</span>;
      },
    },
    {
      accessorKey: "monthToApply",
      header: "Month To Apply",
      cell: ({ row }) => {
        const raw = row.getValue("monthToApply");
        const date = raw ? new Date(raw as Date) : null;

        return (
          <span>
            {date
              ? date.toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                })
              : "-"}
          </span>
        );
      },
    },
    {
      accessorKey: "emailTo",
      header: "Email To",
      cell: ({ row }) => {
        const raw = row.getValue("emailTo");
        const emailTo = Array.isArray(raw) ? raw : [];
        return (
          <div className="flex flex-col gap-1">
            {emailTo.map((email: string) => (
              <div
                key={email}
                className="bg-amber-50 text-black rounded-full text-xs w-fit px-2 py-1"
              >
                {admins.find((admin) => admin.value === email)?.label}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const raw = row.getValue("status") as string;

        return (
          <div
            className={cn(
              "border-1 rounded-full font-semibold text-xs w-fit px-2 py-1",
              {
                "border-red-400 bg-red-400 text-white":
                  raw === applicationsStatusesEnum.REJECTED,
                "border-green-400 bg-green-400 text-white":
                  raw === applicationsStatusesEnum.APPROVED,
                "border-yellow-400 bg-yellow-400 text-white":
                  raw === applicationsStatusesEnum.PENDING,
              }
            )}
          >
            {raw}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const claim = row.original;
        return (
          !isDashboard && (
            <div className="flex gap-2 cursor-pointer">
              <Edit size={20} onClick={() => onClickEdit(claim)} />
              <Trash size={20} onClick={() => onClickDelete(claim.id)} />
            </div>
          )
        );
      },
    },
  ];

  const leaveForm = useForm({
    resolver: zodResolver(leaveFormSchema),
    defaultValues: { ...initialFormState },
  });

  const [selectedLeaveId, setSelectedLeaveId] = useState<string | null>(null);
  const [openMutationModal, setOpenMutationModal] = useState<boolean>(false);

  const {
    showError,
    showSuccess,
    closeError,
    closeSuccess,
    showConfirmation,
    closeConfirmation,
  } = useGlobalModal();
  const [admins, setAdmins] = useState<Array<{ label: string; value: string }>>(
    []
  );
  const [users, setUsers] = useState<Array<{ code: string; name: string }>>([]);

  const selectLeave = (id: string) => {
    setSelectedLeaveId(id);
  };

  const clearSelectedLeave = () => {
    setSelectedLeaveId(null);
  };

  const {
    getEmployeesQuery: {
      isSuccess: isEmployeesQuerySuccess,
      isFetching: isEmployeesQueryFetching,
      data: employeesQueryData,
      isError: isEmployeesQueryError,
    },
  } = useEmployeeManagement();

  const mutateLeaveMutation = useMutation({
    mutationFn: mutateLeave,
    onSuccess: (data) => {
      showSuccess("Leave mutated successfully");
      refreshLeaves();
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.error(error);
      showError(
        error.response?.data.message ||
          "Failed to update employee. Please try again."
      );
    },
  });

  const getUserLeaveDetailsMutation = useMutation({
    mutationFn: getLeaveDetails,
    onSuccess: (data) => {
      setSelectedUserDetails && setSelectedUserDetails(data.data);
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.error(error);
      // showError(
      //   error.response?.data.message ||
      //     "Failed to update employee. Please try again."
      // );
    },
  });

  const {
    uploadMutation: {
      mutate: uploadMutate,
      isPending: isUploadingPending,
      isSuccess: isUploadSuccess,
      data: uploadData,
    },
  } = useUpload();

  const getLeavesQuery = useTypedQuery<GetLeavesResponseType>({
    queryKey: ["leaves"],
    queryFn: getLeaves,
  });

  const refreshLeaves = () => {
    getLeavesQuery.refetch();
  };

  const deleteLeaveMutation = useMutation({
    mutationFn: deleteLeave,
    onSuccess: (data) => {
      showSuccess("Leave deleted successfully");
      closeConfirmation();
      refreshLeaves();
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.error(error);
      showError(
        error.response?.data.message ||
          "Failed to delete leave. Please try again."
      );
    },
  });

  const onMutate = (data: LeaveFormInputs) => {
    mutateLeaveMutation.mutate(data);
  };

  const onDelete = (id: string) => {
    showConfirmation("Are you sure you want to delete this leave record?", () =>
      deleteLeaveMutation.mutate(id)
    );
  };

  const onClickEdit = (leave: LeaveWithNecessaryFields) => {
    leaveForm.reset({
      ...leave,
      from: new Date(leave?.from ?? ""),
      to: new Date(leave?.to ?? ""),
      monthToApply: new Date(leave?.monthToApply ?? ""),
      user: typeof leave.user === "string" ? leave.user : leave.user.id,
    });
    setSelectedLeaveId(leave?.id || "");
    setOpenMutationModal(true);
  };

  const onClickDelete = (id?: string) => {
    if (id) {
      showConfirmation("Are you sure you want to delete this claim", () => {
        deleteLeaveMutation.mutate(id);
      });
    }
  };

  useEffect(() => {
    if (getLeavesQuery.isSuccess) {
      console.log(getLeavesQuery.data.data);
      setLeaves(getLeavesQuery.data.data);
    }
  }, [getLeavesQuery.isSuccess]);

  useEffect(() => {
    if (isEmployeesQuerySuccess) {
      setAdmins(getAdminsWithSelectedFields(employeesQueryData.data));
      setUsers(
        employeesQueryData.data.map((user) => ({
          code: (user.id ?? "").toString(),
          name: user.name,
        }))
      );
    } else if (isEmployeesQueryError) {
      setAdmins([]);
      setUsers([]);
    }
  }, [isEmployeesQuerySuccess, isEmployeesQueryError]);

  const openModal = () => {
    leaveForm.reset({
      ...initialFormState,
    });
    setSelectedLeaveId("");
    setOpenMutationModal(true);
  };

  const handleUpload = (file: File) => {
    uploadMutate({ file });
  };

  useEffect(() => {
    if (isUploadSuccess) {
      leaveForm.setValue("file", uploadData.data.url);
    }
  }, [isUploadSuccess]);

  useEffect(() => {
    const from = leaveForm.watch("from");
    const to = leaveForm.watch("to");

    if (from && to) {
      const days = Math.floor(
        (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)
      );
      leaveForm.setValue("totalDays", days);
    }
  }, [leaveForm.watch("from"), leaveForm.watch("to")]);

  useEffect(() => {
    if (!!leaveForm.watch("user")) {
      getUserLeaveDetailsMutation.mutate(leaveForm.watch("user"));
    }
  }, [leaveForm.watch("user")]);

  return {
    selectLeave,
    clearSelectedLeave,
    selectedLeaveId,
    users,
    admins,
    isEmployeesQueryFetching,
    openMutationModal,
    setOpenMutationModal,
    openModal,
    leaveForm,
    onMutate,
    onDelete,
    isLeaveMutatePending: mutateLeaveMutation.isPending,
    isLeaveDeletePending: deleteLeaveMutation.isPending,
    handleUpload,
    isUploadingPending,
    columns,
  };
};

export default useLeave;
