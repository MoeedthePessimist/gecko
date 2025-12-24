import { useTypedQuery } from "./use-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useAuthContext } from "@/context/auth-context";
import { getCompanyAdditionalData, mutateCompany } from "@/api/company";
import { useGlobalModal } from "@/context/error-context";
import { useMutation } from "@tanstack/react-query";
import { CompanyFormInputs, companyFormSchema } from "@/schemas/company-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosErrorWithMessage } from "@/types/common.type";
import { useEffect } from "react";
import { User } from "@/types/user.type";

const useCompany = () => {
  const { user, setUser } = useAuthContext();
  const company = user?.company;

  const companyId = user?.company?.id || "";

  const { showError, showSuccess } = useGlobalModal();

  const companyForm = useForm<CompanyFormInputs>({
    resolver: zodResolver(companyFormSchema(true)),
    defaultValues: {
      id: company?.id,
      name: company?.name || "",
      entity: company?.entity || "",
      industry: company?.industry || "",
      telephone: company?.telephone || "",
      address: company?.address || "",
      organizationIdType: company?.organizationIdType || "",
      csn: company?.csn || "",
      uen: company?.uen || "",

      bank:
        company?.bank && typeof company?.bank !== "string"
          ? {
              id: company?.bank?.id || "",
              bankName: company?.bank?.bankName || "",
              bankAccountNumber: company?.bank?.bankAccountNumber || "",
              bankSwiftCode: company?.bank?.bankSwiftCode || "",
            }
          : undefined,
    },
  });

  const getCompanyAdditionalDataQuery = useTypedQuery({
    queryKey: [QUERY_KEYS.COMPANY_ADDITIONAL_DATA(companyId)],
    queryFn: () => getCompanyAdditionalData(companyId),
    enabled: !!companyId,
  });

  const mutateCompanyMutation = useMutation({
    mutationFn: mutateCompany,
    onSuccess: (data) => {
      console.log("Company mutated:", data);
      showSuccess("Company mutated successfully!");
      setUser({
        ...user,
        company: data.data,
      } as unknown as User);

      //Reset user's company in global context
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.error("Error mutating company:", error);
      showError(
        error.response?.data.message ||
          "Failed to mutate company. Please try again."
      );
    },
  });

  const onSubmitCompanyForm = (data: CompanyFormInputs) => {
    const { bank, ...rest } = data;
    const companyData = {
      ...rest,
      bankId: bank?.id || "",
      bankName: bank?.bankName,
      bankAccountNumber: bank?.bankAccountNumber,
      bankSwiftCode: bank?.bankSwiftCode,
    };

    mutateCompanyMutation.mutate(companyData);
  };

  useEffect(() => {
    if (user?.company) {
      companyForm.reset({
        id: company?.id,
        name: company?.name || "",
        entity: company?.entity || "",
        industry: company?.industry || "",
        telephone: company?.telephone || "",
        address: company?.address || "",
        organizationIdType: company?.organizationIdType || "",
        csn: company?.csn || "",
        uen: company?.uen || "",
        bank:
          company?.bank && typeof company?.bank !== "string"
            ? {
                id: company?.bank?.id || "",
                bankName: company?.bank?.bankName || "",
                bankAccountNumber: company?.bank?.bankAccountNumber || "",
                bankSwiftCode: company?.bank?.bankSwiftCode || "",
              }
            : undefined,
      });
    }
  }, [user?.company]);

  return {
    getCompanyAdditionalDataQuery,
    mutateCompanyMutation,
    companyForm,
    onSubmitCompanyForm,
  };
};

export default useCompany;
