import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  token: string;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  login: (token: string, email: string, username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      login: (token, email, username) =>
        set({ user: { token, email, username } }),

      logout: () => {
        set({ user: null });
        localStorage.removeItem("tiny-link-user");
      },
    }),
    {
      name: "tiny-link-user",
    }
  )
);
