import { claimFormSchema } from "@/schemas/claim-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

const useClaims = () => {
  const claimForm = useForm({
    resolver: zodResolver(claimFormSchema),
    defaultValues: {
      ...initialFormState,
    },
  });

  const [openMutationModal, setOpenMutationModal] = useState<boolean>(false);
  const [selectedClaimId, setSelectedClaimId] = useState<string>("");

  return {
    claimForm,
    openMutationModal,
    setOpenMutationModal,
    selectedClaimId,
    setSelectedClaimId,
  };
};

export default useClaims;
