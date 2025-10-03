import api from "@/configs/axios";
import { API } from "@/constants/api";
import { GetCompanyAdditionalDataResponseType } from "@/types/api.type";

export const getCompanyAdditionalData = async (
  companyId: string
): Promise<GetCompanyAdditionalDataResponseType> => {
  const response = await api.get(API.GET_COMPANY_ADDITIONAL_DATA(companyId));
  return response.data;
};
