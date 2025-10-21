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
import { ColumnDef } from "@tanstack/react-table";
import { Commission } from "@/types/commission.type";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";

const useCommission = (fetchCommissions = false) => {
  const [selectedCommission, setSelectedCommission] =
    useState<Commission | null>(null);

  const [mutationModal, setMutationModal] = useState<boolean>(false);

  const commissionForm = useForm({
    resolver: zodResolver(commissionSchema),
    defaultValues: {
      name: selectedCommission?.name || "",
      amount: selectedCommission?.amount || 0,
      date: selectedCommission?.date || new Date(),
      monthToApply: selectedCommission?.monthToApply || new Date(),
      status: selectedCommission?.status || "",
      employeeId: selectedCommission?.employee?.id || "",
    },
  });

  console.dir(commissionForm.getValues(), {
    depth: 0,
  });

  useEffect(() => {
    commissionForm.reset({
      id: selectedCommission?.id || "",
      name: selectedCommission?.name || "",
      amount: selectedCommission?.amount || 0,
      date: selectedCommission?.date || new Date(),
      monthToApply: selectedCommission?.monthToApply || new Date(),
      status: selectedCommission?.status || "",
      employeeId: selectedCommission?.employee?.id || "",
    });
  }, [selectedCommission]);

  const commissionColumns: ColumnDef<Commission>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "monthToApply",
      header: "Month To Apply",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "employee.name",
      header: "Employee",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const commission = row.original;

        return (
          <div className="flex gap-2">
            <EditIcon
              onClick={() => {
                setSelectedCommission(commission);
                //TODO: open mutation modal
                openMutationModal();
              }}
              className="cursor-pointer"
              width={16}
              height={16}
            />
            <Trash2Icon
              onClick={() => {
                setSelectedCommission(commission);
                //TODO: open delete confirmation modal
              }}
              className="cursor-pointer"
              height={16}
              width={16}
            />
          </div>
        );
      },
    },
  ];

  const getCommissionsQuery = useTypedQuery({
    queryFn: getCommissions,
    queryKey: QUERY_KEYS.COMMISSIONS,
    enabled: fetchCommissions,
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

  const openMutationModal = () => {
    setMutationModal(true);
  };

  const closeMutationModal = () => {
    setMutationModal(false);
  };

  return {
    getCommissionsQuery,
    createCommissionMutation,
    updateCommissionMutation,
    deleteCommissionMutation,
    commissionForm,
    commissionColumns,
    openMutationModal,
    closeMutationModal,
    selectedCommissionid: selectedCommission?.id,
  };
};

export default useCommission;
