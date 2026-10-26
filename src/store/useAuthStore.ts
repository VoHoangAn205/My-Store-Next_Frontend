import { User } from "@/types";
import { create } from "zustand";

interface authState {
    userInfo: User | null;
    accessToken: string | null;
    authStatus: "loading" | "authed" | "guest";
    setUserInfo: (userInfo: User) => void;
    setAccessToken: (accessToken: string) => void;
    clearLocalAuthInfo: () => void;
    setAuthStatus: (status: "loading" | "authed" | "guest") => void;
}

export const useAuthStore = create<authState>((set) => ({
    userInfo: null,
    accessToken: null,
    authStatus: "loading",
    setUserInfo: (userInfo) => set(() => ({userInfo})),
    setAccessToken: (accessToken) => set(() => ({accessToken})),
    clearLocalAuthInfo: () => set (()=> ({ userInfo: null, accessToken: null})),
    setAuthStatus: (authStatus: "loading" | "authed" | "guest") => set (() => ({authStatus})),
}))