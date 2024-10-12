import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAppContext } from "./useAppContext";

export const useLogin = () => {
  const { dispatch } = useAppContext();

  return useMutation({
    mutationFn: (data) => {
      return axios.post("/api/auth/login", data);
    },
    onSuccess: (response) => {
      const token = response.data?.token;

      localStorage.setItem("token", token);
      dispatch({
        type: "LOGIN",
        payload: token,
      });
    },
  });
};
