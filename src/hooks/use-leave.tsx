import { deleteLeave, getLeaves, mutateLeave } from "@/api/leave";
import { useGlobalModal } from "@/context/error-context";
import { AxiosErrorWithMessage } from "@/types/common.type";
import { Leave, LeaveWithNecessaryFields } from "@/types/leave.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useTypedQuery } from "./use-query";
import { GetLeavesResponseType } from "@/types/api.type";

const useLeave = (setLeaves: React.Dispatch<Array<Leave>>) => {
  const [selectedLeaveId, setSelectedLeaveId] = useState<string | null>(null);
  const { showError, showSuccess, closeError, closeSuccess } = useGlobalModal();

  const selectLeave = (id: string) => {
    setSelectedLeaveId(id);
  };

  const clearSelectedLeave = () => {
    setSelectedLeaveId(null);
  };

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

  useEffect(() => {
    if (getLeavesQuery.isSuccess) {
      setLeaves(getLeavesQuery.data.data);
    }
  }, [getLeavesQuery.isSuccess]);

  return {
    deleteLeaveMutation,
    mutateLeaveMutation,
    selectLeave,
    clearSelectedLeave,
    selectedLeaveId,
  };
};

export default useLeave;
