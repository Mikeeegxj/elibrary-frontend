"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export const authStore = create(
  persist(
    (set, get) => ({
      isAuth: false,
      userInfo: null,
      setAuth: (data) => set((state) => ({ isAuth: data })),
      setUserInfo: (data) => set((state) => ({userInfo : data})),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);