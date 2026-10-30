import axios from "axios";
import { setUpInterceptors } from "./interceptors";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

setUpInterceptors(axiosPrivate, axiosPublic);