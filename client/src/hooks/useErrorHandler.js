import { useToast } from "@chakra-ui/react";
import { useLogout } from "./useLogout";

export const useErrorHandler = () => {
  const toast = useToast();
  const { logout } = useLogout();
  const errorHandler = (error) => {
    toast.closeAll();
    if (error.response && error.response.status === 401) {
      toast({
        title: "Unauthorized Access!",
        description: "please login again.",
        status: "error",
      });
      logout();
    } else {
      toast({
        title: "Something went Wrong!",
        status: "error",
      });
    }
  };
  return { errorHandler };
};
