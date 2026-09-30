import { InternalAxiosRequestConfig } from "axios";
import { axiosPrivate, axiosPublic } from "./API";

let accessTokenMemory: string | null = null;
let isRefreshing:boolean = false;

interface failedQuereItem {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}
let failedQueue: failedQuereItem[] = [];

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

export const setAccessToken = (token: string | null) => {
  accessTokenMemory = token;
};

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

axiosPrivate.interceptors.request.use(
  (config) => {
    if (accessTokenMemory && !config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${accessTokenMemory}`;
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

        setAccessToken(newAccessToken);
        progressQueue(null, newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        try {
          progressQueue(refreshError, null);
        } catch (err) {
          console.error("Queue process failed ", err);
        }

        setAccessToken(null);
        window.location.href = "/login"
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);
