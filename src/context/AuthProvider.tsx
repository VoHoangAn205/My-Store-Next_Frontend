'use client';
import LoadingPageSkeleton from "@/components/loadingSkeleton/LoadingPageSkeleton";
import authService from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { setAccessToken, clearLocalAuthInfo, setUserInfo } = useAuthStore()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const initializeAuth = async () => {
            const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (!isLoggedIn) {
            setIsLoading(false);
            return;
        }

        try {
        const response = await authService.refreshToken();

        if(response?.accessToken) {
            setAccessToken(response.accessToken)
            const userInfo = await authService.getUserInfo()
            setUserInfo(userInfo)
        }
        } catch (err) {
            localStorage.removeItem("isLoggedIn");
            clearLocalAuthInfo()
        } finally {
            setIsLoading(false);
        }
        }
        initializeAuth()
    },[setAccessToken, clearLocalAuthInfo, setUserInfo])
    if (isLoading) {
        return <LoadingPageSkeleton/>
    }
    return <>{children}</>

}

export default AuthProvider