import { ClaimFormInputs, claimFormSchema } from "@/schemas/claim-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AxiosErrorWithMessage,
  MultiSelectOptionType,
  SelectOptionsType,
} from "@/types/common.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetClaimsResponse, GetClaimTypesResponse } from "@/types/api.type";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useAuthContext } from "@/context/auth-context";
import { getClaimTypes } from "@/api/claim-type";
import { deleteClaim, getClaims, mutateClaim } from "@/api/claim";
import { Claim, ClaimWithNecessaryFields } from "@/types/claim.type";
import { useGlobalModal } from "@/context/error-context";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";

export const initialFormState = {
  id: "",
  type: "",
  amount: 0,
  emailTo: [],
  fileName: "",
  transactionDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  monthToApply: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  user: "",
};

type UseClaimsProps = {
  getClaimTypesEnabled?: boolean;
  getClaimsEnabled?: boolean;
};

const useClaims = ({
  getClaimTypesEnabled,
  getClaimsEnabled,
}: UseClaimsProps) => {
  const { showConfirmation, closeConfirmation } = useGlobalModal();

  const columns: ColumnDef<ClaimWithNecessaryFields>[] = [
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "transactionDate",
      header: "Transaction Date",
      cell: ({ row }) => {
        const raw = row.getValue("transactionDate");
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
      accessorKey: "monthToApply",
      header: "Month To Apply",
      cell: ({ row }) => {
        const raw = row.getValue("monthToApply");
        const date = new Date(raw as Date);

        return (
          <span>
            {date.toLocaleString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const claim = row.original;
        return (
          <div className="flex gap-2 cursor-pointer">
            <Edit size={20} onClick={() => onClickEdit(claim)} />
            <Trash size={20} onClick={() => onClickDelete(claim.id)} />
          </div>
        );
      },
    },
    // {
    //   accessorKey: "emailTo",
    //   header: "Email To",
    //   cell: ({ row }) => {
    //     const raw = row.getValue("emailTo");
    //     console.log(raw);
    //     const emailTo = Array.isArray(raw) ? Array(raw) : [];
    //     return emailTo.map((email) => (
    //       <div className="border-1 rounded-full text-xs w-fit px-1">
    //         {email}
    //       </div>
    //     ));
    //   },
    // },
  ];

  const claimForm = useForm({
    resolver: zodResolver(claimFormSchema),
    defaultValues: {
      ...initialFormState,
    },
  });

  const { user } = useAuthContext();
  const { showError, showSuccess } = useGlobalModal();

  const getClaimTypesQuery = useQuery<GetClaimTypesResponse>({
    queryKey: QUERY_KEYS.CLAIM_TYPES(user?.company?.id || ""),
    queryFn: getClaimTypes,
    enabled: getClaimTypesEnabled,
  });

  const getClaimsQuery = useQuery<GetClaimsResponse>({
    queryKey: QUERY_KEYS.CLAIMS(user?.company?.id || ""),
    queryFn: getClaims,
    enabled: getClaimsEnabled,
  });

  const mutateClaimMutation = useMutation({
    mutationFn: mutateClaim,
    onSuccess: (data) => {
      console.log("Claim mutated:", data);
      showSuccess("Claim mutated successfully!");
      setOpenMutationModal(false);
      getClaimsQuery.refetch();
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.error("Error mutating claim:", error);
      showError(
        error.response?.data.message ||
          "Failed to mutate claim. Please try again."
      );
    },
  });

  const deleteClaimMutation = useMutation({
    mutationFn: deleteClaim,
    onSuccess: (data) => {
      console.log("Claim deleted:", data);
      showSuccess("Claim deleted successfully!");
      closeConfirmation();
      getClaimsQuery.refetch();
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.error("Error deleting claim:", error);
      showError(
        error.response?.data.message ||
          "Failed to delete claim. Please try again."
      );
    },
  });

  const [openMutationModal, setOpenMutationModal] = useState<boolean>(false);
  const [selectedClaimId, setSelectedClaimId] = useState<string>("");
  const [admins, setAdmins] = useState<Array<MultiSelectOptionType>>([]);
  const [users, setUsers] = useState<Array<SelectOptionsType>>([]);
  const [claimTypes, setClaimTypes] = useState<Array<SelectOptionsType>>([]);
  const [claims, setClaims] = useState<Array<Claim>>([]);

  const onMutate = (data: ClaimFormInputs) => {
    if (!data.id) {
      delete data.id;
    }
    mutateClaimMutation.mutate(data);
  };

  useEffect(() => {
    if (getClaimsQuery.isSuccess) {
      setClaims(getClaimsQuery.data.data);
    }
  }, [getClaimsQuery.isSuccess]);

  const onClickDelete = (id?: string) => {
    if (id) {
      showConfirmation("Are you sure you want to delete this claim", () => {
        deleteClaimMutation.mutate(id);
      });
    }
  };

  const onClickEdit = (claim: ClaimWithNecessaryFields) => {
    claimForm.reset({
      ...claim,
      user: user?.id,
      transactionDate: new Date(claim.transactionDate),
      monthToApply: new Date(claim?.monthToApply ?? ""),
    });
    setSelectedClaimId(claim?.id || "");
    setOpenMutationModal(true);
  };

  return {
    claimForm,
    openMutationModal,
    setOpenMutationModal,
    selectedClaimId,
    setSelectedClaimId,
    admins,
    setAdmins,
    users,
    setUsers,
    getClaimTypesQuery,
    claimTypes,
    setClaimTypes,
    mutateClaimMutation,
    deleteClaimMutation,
    getClaimsQuery,
    claims,
    setClaims,
    onMutate,
    columns,
  };
};

export default useClaims;
