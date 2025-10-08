import api from "@/configs/axios";
import { API } from "@/constants/api";
import {
  CreateEmployeeRequestType,
  CreateEmployeeResponseType,
  DeleteEmployeeResponseType,
  GetEmployeeResponseType,
  GetEmployeesResponseType,
  MeApiResponseType,
  UpdateEmployeeRequestType,
} from "@/types/api.type";
import { deleteContact } from "./contacts";

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

export const deleteEmployee = async (
  id: string
): Promise<DeleteEmployeeResponseType> => {
  const response = await api.delete(API.DELETE_EMPLOYEE(id));
  return response.data;
};

export const updateEmployee = async (data: {
  id: string;
  payload: UpdateEmployeeRequestType;
}): Promise<UpdateEmployeeRequestType> => {
  const response = await api.patch(API.UPDATE_EMPLOYEE(data.id), data.payload);
  return response.data;
};
