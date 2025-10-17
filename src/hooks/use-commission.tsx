import { useTypedQuery } from "./use-query";
import {
  createCommission,
  deleteCommission,
  getCommissions,
  updateCommission,
} from "@/api/commission";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useMutation } from "@tanstack/react-query";
import {
  CreateCommissionResponseType,
  DeleteCommissionResponseType,
  UpdateCommissionResponseType,
} from "@/types/api.type";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commissionSchema } from "@/schemas/commission-schema";

const useCommission = () => {
  const commissionForm = useForm({
    resolver: zodResolver(commissionSchema),
    defaultValues: {
      name: "",
      amount: 0,
      date: new Date(),
      monthToApply: new Date(),
      status: "",
      employeeId: "",
    },
  });

  const getCommissionsQuery = useTypedQuery({
    queryFn: getCommissions,
    queryKey: QUERY_KEYS.COMMISSIONS,
  });

  const createCommissionMutation = useMutation({
    mutationFn: createCommission,
    onSuccess: (data: CreateCommissionResponseType) => {
      console.log("Commission created:", data);
    },
    onError: (error: AxiosError) => {
      console.error("Error creating commission:", error);
    },
  });

  const updateCommissionMutation = useMutation({
    mutationFn: updateCommission,
    onSuccess: (data: UpdateCommissionResponseType) => {
      console.log("Commission updated:", data);
    },
    onError: (error: AxiosError) => {
      console.error("Error updating commission:", error);
    },
  });

  const deleteCommissionMutation = useMutation({
    mutationFn: deleteCommission,
    onSuccess: (data: DeleteCommissionResponseType) => {
      console.log("Commission deleted:", data);
    },
    onError: (error: AxiosError) => {
      console.error("Error deleting commission:", error);
    },
  });

  return {
    getCommissionsQuery,
    createCommissionMutation,
    updateCommissionMutation,
    deleteCommissionMutation,
    commissionForm,
  };
};

export default useCommission;
