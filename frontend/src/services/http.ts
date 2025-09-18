import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = <T>(url: string): Promise<AxiosResponse<T>> => {
  return axiosInstance.get<T>(url);
};

export const post = <T>(
  url: string,
  data: Record<string, unknown> = {}
): Promise<AxiosResponse<T>> => {
  return axiosInstance.post<T>(url, data);
};
