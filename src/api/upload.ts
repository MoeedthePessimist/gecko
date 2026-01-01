import api from "@/configs/axios";
import { API } from "@/constants/api";
import { UploadFileApiResponseType } from "@/types/api.type";

export const uploadFile = async ({
  file,
  isPublic,
}: {
  file: File;
  isPublic?: string;
}): Promise<UploadFileApiResponseType> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post(API.UPLOAD(isPublic), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
