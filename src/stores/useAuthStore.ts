import { create } from "zustand";
import { HttpStatusCode } from "axios";
import { persist } from "zustand/middleware";
import type { User } from "@/constants/types";
import { axiosInstance } from "@/lib/axios";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;

  logIn: (
    username: string,
    password: string
  ) => Promise<{
    user: User;
    accessToken: string;
  }>;

  register: (
    username: string,
    password: string,
    email: string
  ) => Promise<void>;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      logIn: async (username, password) => {
        const res = await axiosInstance.post(`/auth/login`, {
          username,
          password,
        });
        if (res.status === HttpStatusCode.Ok) {
          const { accessToken, user } = res.data;
          sessionStorage.setItem("accessToken", accessToken);
          // localStorage.setItem("user", JSON.stringify(user));
          set({
            user,
            isAuthenticated: true,
          });
        }
        return res.data;
      },

      register: async (username, password, email) => {
        const res = await axiosInstance.post("/auth/register", {
          username,
          password,
          email,
        });
        return res.data;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
