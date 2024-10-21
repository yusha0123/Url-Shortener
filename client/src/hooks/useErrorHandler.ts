import { useAuthStore } from "@/store/useAuthStore";
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
        const errorMessage =
          error.message || error.response.message || "Something went wrong!";
        toast.error(errorMessage);
      }
    },
    [logout]
  );

  return { errorHandler };
};
