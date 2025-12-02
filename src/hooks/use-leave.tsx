import { deleteLeave, getLeaves, mutateLeave } from "@/api/leave";
import { useGlobalModal } from "@/context/error-context";
import { AxiosErrorWithMessage } from "@/types/common.type";
import { Leave, LeaveWithNecessaryFields } from "@/types/leave.type";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useTypedQuery } from "./use-query";
import { GetLeavesResponseType } from "@/types/api.type";
import useEmployeeManagement from "./use-employee";
import { getAdminsWithSelectedFields } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeaveFormInputs, leaveFormSchema } from "@/schemas/leave-schema";
import useUpload from "./use-upload";

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

const useLeave = (setLeaves: React.Dispatch<Array<Leave>>) => {
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

  useEffect(() => {
    if (getLeavesQuery.isSuccess) {
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
    uploadMutate(file);
  };

  useEffect(() => {
    if (isUploadSuccess) {
      leaveForm.setValue("file", uploadData.data.fileName);
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
  };
};

export default useLeave;
