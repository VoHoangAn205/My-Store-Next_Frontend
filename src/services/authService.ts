import { axiosPrivate, axiosPublic } from "@/lib/API"
import { AuthResponse, User } from "@/types"

interface TokenFetching {
    accessToken: string
}

const authService = {
    getUserInfo: async (data: TokenFetching) => {  
        const response = await axiosPublic.get<User>("/user", {
            headers: {
                Authorization: `Bearer ${data.accessToken}`
            }
        });
        return response.data;
    },
    login: async (data: object) => {
        const response = await axiosPublic.post<AuthResponse>("/auth", data);
        return response.data;
    },
    refreshToken: async () => {
        const response = await axiosPublic.post<AuthResponse>("/refresh");
        return response.data;
    },
    logout: async () => {
        const response = await axiosPublic.post("/logout");
        return response.data;
    }
}

export default authService;