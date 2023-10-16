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
