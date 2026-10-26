'use client';
import authService from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

let initPromise: Promise<void> | null = null;

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { setAccessToken, clearLocalAuthInfo, setUserInfo, setAuthStatus } = useAuthStore();

    useEffect(() => {
        initPromise ??= (async () => {
            const { accessToken } = await authService.refreshToken();
            setAccessToken(accessToken);
            setUserInfo(await authService.getUserInfo({accessToken}));
        })();

        initPromise
            .then(() => setAuthStatus("authed"))
            .catch((err) => {
                initPromise = null;
                clearLocalAuthInfo();
                setAuthStatus("guest");
            })
    },[setAccessToken, clearLocalAuthInfo, setUserInfo]);

    return <>{children}</>

}

export default AuthProvider;