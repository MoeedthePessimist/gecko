import { useTypedQuery } from "./use-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useAuthContext } from "@/context/auth-context";
import { getCompanyAdditionalData } from "@/api/company";

const useCompany = () => {
  const { user } = useAuthContext();

  const companyId = user?.company?.id || "";

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
