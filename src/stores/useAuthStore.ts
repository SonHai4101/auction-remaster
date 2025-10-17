import { create } from "zustand";
import { HttpStatusCode } from "axios";
import type { User } from "@/constants/types";
import { axiosInstance } from "@/lib/axios";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

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

  logOut: () => void;
  loadFromSession: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  logIn: async (username, password) => {
    const res = await axiosInstance.post(`/auth/login`, {
      username,
      password,
    });
    if (res.status === HttpStatusCode.Ok) {
      const { accessToken, user } = res.data;
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("user", JSON.stringify(user));
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

  logOut: () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  loadFromSession: () => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      set({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        isLoading: true,
      });
    } else {
      set({ isLoading: true });
    }
  },
}));

export default useAuthStore;
