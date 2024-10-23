import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

export const useCreateUrl = () => {
  return useMutation({
    mutationFn: (data: FieldValues) => axios.post("/api/link", data),
    onSuccess: () => {
      toast.success("Url Shortened successfully!");
    },
  });
};
