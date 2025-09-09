import api from "@/configs/axios";
import { API } from "@/constants/api";

import {
  GetQualificationsApiResponseType,
  CreateQualificationApiResponseType,
  CreateQualificationApiRequestType,
  UpdateQualificationApiRequestType,
  UpdateQualificationApiResponseType,
} from "@/types/api.type";

export const getQualifications =
  async (): Promise<GetQualificationsApiResponseType> => {
    const response = await api.get(API.GET_QUALIFICATION);
    return response.data;
  };

export const createQualification = async (
  data: CreateQualificationApiRequestType
): Promise<CreateQualificationApiResponseType> => {
  const response = await api.post(API.CREATE_QUALIFICATION, data);
  return response.data;
};

export const updateQualification = async (
  data: UpdateQualificationApiRequestType
): Promise<UpdateQualificationApiResponseType> => {
  const response = await api.patch(API.UPDATE_QUALIFICATION(data.id), data);
  return response.data;
};
