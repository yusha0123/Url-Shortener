import { useAuthStore } from "@/store/useAuthStore";
import { isAxiosError } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";

export const useErrorHandler = () => {
  const { logout } = useAuthStore();

  const errorHandler = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: any) => {
      toast.dismiss();
      if (error?.response && error.response.status === 401) {
        toast.error("Session expired, please login again!");
        logout();
      } else {
        let errorMessage;
        const fallbackMessage = "Something went wrong!";

        if (isAxiosError(error)) {
          errorMessage = error?.response?.data?.message || fallbackMessage;
        } else {
          errorMessage = error.message || fallbackMessage;
        }
        toast.error(errorMessage);
      }
    },
    [logout]
  );

  return errorHandler;
};
