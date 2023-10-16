import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useAppContext } from "./useAppContext";

export const useSignup = () => {
  const toast = useToast();
  const { dispatch } = useAppContext();
  return useMutation({
    mutationFn: (data) => {
      return axios.post("/api/auth/register", data);
    },
    onSuccess: (response) => {
      toast({
        title: "Registration Successful!",
        status: "success",
      });
      const user = {
        email: response.data.email,
        token: response.data.token,
      };
      localStorage.setItem("token", JSON.stringify(user));
      dispatch({
        type: "LOGIN",
        payload: user,
      });
    },
  });
};
