import { axiosPrivate, axiosPublic } from "@/lib/API"
import { AuthResponse, User } from "@/types"

const authService = {
    getUserInfo: async () => {
        const response = await axiosPrivate.get<User>("/user");
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