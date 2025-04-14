import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useErrorHandler } from "./useErrorHandler";

export const useDeleteUrl = () => {
  const errorHandler = useErrorHandler();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      const deletePromise = axios.delete(`/api/link/${id}`);
      toast.promise(
        deletePromise,
        {
          loading: "Deleting URL...",
          success: "URL deleted successfully!",
          error: "Failed to delete URL.",
        },
        { id: `delete-url-${id}` }
      );
      return deletePromise;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
    },
    onError: (error) => {
      errorHandler(error);
    },
  });
};
