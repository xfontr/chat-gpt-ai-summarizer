import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import ENVIRONMENT from "../configs/environment.js";
import tryCatch from "../utils/tryCatch.js";

export const apiHandler = axios.create({
  baseURL: ENVIRONMENT.openaiApiURL,
  timeout: 60_000,
});

export const RequestHandler = (handler: AxiosInstance) => {
  const Post = () => ({
    post: async <T = unknown, R = unknown>(
      endpoint: string,
      body: R,
      config: AxiosRequestConfig = {}
    ) =>
      await tryCatch<T>(handler.post, endpoint, body, {
        ...config,
      }),

    postWithAuth: async <T = unknown, R = unknown>(
      endpoint: string,
      body: R,
      token: string,
      config: AxiosRequestConfig = {}
    ) =>
      await tryCatch<T>(handler.post, endpoint, body, {
        ...config,
        headers: { ...config?.headers, authorization: `Bearer ${token}` },
      }),
  });

  return {
    ...Post(),
  };
};

export const api = RequestHandler(apiHandler);
