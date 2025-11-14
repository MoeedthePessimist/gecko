import { claimFormSchema } from "@/schemas/claim-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { rolesEnum } from "@/enums/roles.enum";
import { AxiosErrorWithMessage, SelectOptionsType } from "@/types/common.type";
import { User } from "@/types/user.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetClaimsResponse, GetClaimTypesResponse } from "@/types/api.type";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useAuthContext } from "@/context/auth-context";
import { getClaimTypes } from "@/api/claim-type";
import { deleteClaim, getClaims, mutateClaim } from "@/api/claim";
import { Claim } from "@/types/claim.type";
import { useGlobalModal } from "@/context/error-context";

export const initialFormState = {
  id: "",
  name: "",
  amount: 0,
  emailTo: [],
  fileName: "",
  transactionDate: new Date(),
  monthToApply: new Date(),
  user: "",
};

export type MultiSelectOptionType = {
  label: string;
  value: string;
};

type UseClaimsProps = {
  getClaimTypesEnabled?: boolean;
  getClaimsEnabled?: boolean;
};

const useClaims = ({
  getClaimTypesEnabled,
  getClaimsEnabled,
}: UseClaimsProps) => {
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

  const getAdminsWithSelectedFields = (
    fetchedUsers: Array<User>
  ): Array<MultiSelectOptionType> => {
    return fetchedUsers
      .filter((users) => users.roles.includes(rolesEnum.ADMIN))
      .map((admin) => ({
        label: admin.name,
        value: admin.email,
      }));
  };

  return {
    claimForm,
    openMutationModal,
    setOpenMutationModal,
    selectedClaimId,
    setSelectedClaimId,
    getAdminsWithSelectedFields,
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
  };
};

export default useClaims;
