import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export const useSignup = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: (data) => {
      return axios.post("/api/auth/register", data);
    },
    onSuccess: ({ data: { token } }) => {
      toast.success("Registration Successful!");
      const { email, username }: DecodedToken = jwtDecode(token);
      login(token, email, username);
    },
  });
};
