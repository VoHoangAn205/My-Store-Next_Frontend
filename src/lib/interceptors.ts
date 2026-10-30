import { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/useAuthStore";

let isRefreshing:boolean = false;

interface failedQuereItem {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}
let failedQueue: failedQuereItem[] = [];

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const progressQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export function setUpInterceptors (
  axiosPrivate: AxiosInstance,
  axiosPublic: AxiosInstance,
) {

  axiosPrivate.interceptors.request.use(
  (config) => {
     const state = useAuthStore.getState();
    const accessToken = useAuthStore.getState().accessToken
    if (accessToken && !config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig | undefined;
    
    if (!originalRequest) {
      return Promise.reject(error)
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest._retry = true;
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosPrivate(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      isRefreshing = true;
      originalRequest._retry = true;

      try {
        const response = await axiosPublic.post<{ accessToken: string }>("/refresh");
        const newAccessToken = response.data.accessToken;
        useAuthStore.getState().setAccessToken(newAccessToken)
        progressQueue(null, newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        try {
          progressQueue(refreshError, null);
        } catch (err) {
          console.error("Queue process failed ", err);
        }

        useAuthStore.getState().clearLocalAuthInfo();
        window.location.href = "/login"
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);
}