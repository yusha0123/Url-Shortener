import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

export const useLogin = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: (data: FieldValues) => axios.post("/api/auth/login", data),
    onSuccess: ({ data: { token } }) => {
      const { email, username }: DecodedToken = jwtDecode(token);
      toast.success(`Welcome ${username}!`);
      login(token, email, username);
    },
  });
};
