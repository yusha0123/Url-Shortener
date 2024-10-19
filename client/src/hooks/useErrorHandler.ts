import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";

export const useErrorHandler = () => {
  const { logout } = useAuthStore();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorHandler = (error: any) => {
    toast.dismiss();
    if (error?.response && error.response.status === 401) {
      toast.error("Session expired, please login again!");
      logout();
    } else {
      const errorMessage =
        error.message || error.response.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  return { errorHandler };
};
