import { claimFormSchema } from "@/schemas/claim-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { rolesEnum } from "@/enums/roles.enum";
import { SelectOptionsType } from "@/types/common.type";
import { User } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";
import { GetClaimTypesResponse } from "@/types/api.type";
import { QUERY_KEYS } from "@/constants/query-keys";
import useAuth from "./use-auth";
import { useAuthContext } from "@/context/auth-context";
import { getClaimTypes } from "@/api/claim-type";

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

const useClaims = () => {
  const claimForm = useForm({
    resolver: zodResolver(claimFormSchema),
    defaultValues: {
      ...initialFormState,
    },
  });

  const { user } = useAuthContext();

  const getClaimTypesQuery = useQuery<GetClaimTypesResponse>({
    queryKey: QUERY_KEYS.CLAIM_TYPES(user?.company?.id || ""),
    queryFn: getClaimTypes,
  });

  const [openMutationModal, setOpenMutationModal] = useState<boolean>(false);
  const [selectedClaimId, setSelectedClaimId] = useState<string>("");
  const [admins, setAdmins] = useState<Array<MultiSelectOptionType>>([]);
  const [users, setUsers] = useState<Array<SelectOptionsType>>([]);
  const [claimTypes, setClaimTypes] = useState<Array<SelectOptionsType>>([]);

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
  };
};

export default useClaims;
