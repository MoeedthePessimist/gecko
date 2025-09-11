import { uploadFile } from "@/api/upload";
import { useMutation } from "@tanstack/react-query";
import React from "react";

const useUpload = () => {
  const uploadMutation = useMutation({
    mutationFn: uploadFile,
  });

  return {
    uploadMutation,
  };
};

export default useUpload;
