import api from "@/configs/axios";
import { API } from "@/constants/api";
import {
  CreateEmployeeRequestType,
  CreateEmployeeResponseType,
  GetEmployeeResponseType,
  GetEmployeesResponseType,
  MeApiResponseType,
} from "@/types/api.type";

export const me = async (): Promise<MeApiResponseType> => {
  const response = await api.get(API.ME);
  return response.data;
};

export const createEmployee = async (
  data: CreateEmployeeRequestType
): Promise<CreateEmployeeResponseType> => {
  const response = await api.post(API.CREATE_EMPLOYEE, data);
  return response.data;
};

export const getEmployees = async (): Promise<GetEmployeesResponseType> => {
  const response = await api.get(API.GET_EMPLOYEES);
  return response.data;
};

export const getEmployee = async (
  id: string
): Promise<GetEmployeeResponseType> => {
  const response = await api.get(API.GET_EMPLOYEE(id));
  return response.data;
};
