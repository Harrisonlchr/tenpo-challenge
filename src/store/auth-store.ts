import { externalApi } from "@/services/external-api";
import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

interface AuthState {
  token: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const authStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        login: async (email, password) => {
          const token = await externalApi.login(email, password);
          set({ token: token });
        },
        logout: () => {
          set({ token: null });
        },
      }),
      {
        name: "auth",
        storage: createJSONStorage(() => localStorage), // (optional) sessionStorage - by default, 'localStorage' is used
      }
    )
  )
);
