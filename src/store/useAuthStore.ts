import { User } from "@/types";
import { create } from "zustand";

interface authState {
    userInfo: User | null;
    accessToken: string | null;
    setUserInfo: (userInfo: User) => void;
    setAccessToken: (accessToken: string) => void;
    clearLocalAuthInfo: () => void;
}

export const useAuthStore = create<authState>((set) => ({
    userInfo: null,
    accessToken: null,
    setUserInfo: (userInfo) => set(() => ({userInfo})),
    setAccessToken: (accessToken) => set(() => ({accessToken})),
    clearLocalAuthInfo: () => set (()=> ({ userInfo: null, accessToken: null}))
}))