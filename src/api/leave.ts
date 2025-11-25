import api from "@/configs/axios";
import { API } from "@/constants/api";
import {
  GetLeavesResponseType,
  MutateLeaveRequestType,
  MutateleaveResponseType,
} from "@/types/api.type";

export const mutateLeave = async (
  data: MutateLeaveRequestType
): Promise<MutateleaveResponseType> => {
  const response = await api.post<MutateleaveResponseType>(
    API.MUTATE_LEAVE(),
    data
  );

  return response.data;
};

export const getLeaves = async (): Promise<GetLeavesResponseType> => {
  const response = await api.get<GetLeavesResponseType>(API.GET_LEAVES());
  return response.data;
};

export const deleteLeave = async (
  id: string
): Promise<MutateleaveResponseType> => {
  const response = await api.delete<MutateleaveResponseType>(
    API.DELETE_LEAVE(id)
  );

  return response.data;
};

// export const getLeaveDetails = async (): Promise<
