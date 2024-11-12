import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { useErrorHandler } from "./useErrorHandler";

export const useCreateUrl = () => {
  const errorHandler = useErrorHandler();

  return useMutation({
    mutationFn: (data: FieldValues) => axios.post("/api/link", data),
    onSuccess: (response) => {
      toast.success("Url Shortened successfully!");
      return response.data;
    },
    onError: (error) => errorHandler(error),
  });
};
