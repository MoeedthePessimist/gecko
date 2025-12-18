import { useTypedQuery } from "./use-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useAuthContext } from "@/context/auth-context";
import { getCompanyAdditionalData } from "@/api/company";
import { useGlobalModal } from "@/context/error-context";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { CompanyFormInputs, companyFormSchema } from "@/schemas/company-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const useCompany = () => {
  const { user } = useAuthContext();
  const company = user?.company;

  const companyId = user?.company?.id || "";

  const { showError, showSuccess } = useGlobalModal();
  const router = useRouter();
  const queryClient = useQueryClient();

  const companyForm = useForm<CompanyFormInputs>({
    resolver: zodResolver(companyFormSchema(true)),
    defaultValues: {
      name: company?.name || "",
      entity: company?.entity || "",
      industry: company?.industry || "",
      telephone: company?.telephone || "",
      address: company?.address || "",
      organizationIdType: company?.organizationIdType || "",
      csn: company?.csn || "",
      uen: company?.uen || "",
      logo: company?.logo || "",
      paidLeaves: company?.paidLeaves ?? 24,
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

  return {
    getCompanyAdditionalDataQuery,
  };
};

export default useCompany;
