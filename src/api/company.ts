import api from "@/configs/axios";
import { API } from "@/constants/api";
import { CompanyFormInputs } from "@/schemas/company-schema";
import {
  GetCompanyAdditionalDataResponseType,
  MutateCompanyAdditionalDataResponseType,
} from "@/types/api.type";

export const getCompanyAdditionalData = async (
  companyId: string
): Promise<GetCompanyAdditionalDataResponseType> => {
  const response = await api.get(API.GET_COMPANY_ADDITIONAL_DATA(companyId));
  return response.data;
};

export const mutateCompany = async (
  data: CompanyFormInputs
): Promise<MutateCompanyAdditionalDataResponseType> => {
  const response = await api.post(API.MUTATE_COMPANY, data);
  return response.data;
};
