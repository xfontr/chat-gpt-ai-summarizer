import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import ENVIRONMENT from "../configs/environment.js";
import tryCatch from "../utils/tryCatch.js";

export const freeApiHandler = axios.create({
  timeout: 8_000,
});

export const apiHandler = axios.create({
  baseURL: ENVIRONMENT.openaiApiURL,
  timeout: 60_000,
});

export const RequestHandler = (handler: AxiosInstance) => {
  const Get = () => ({
    get: async <T>(endpoint: string, config: AxiosRequestConfig = {}) =>
      await tryCatch<T>(handler.get, endpoint, {
        ...config,
      }),

    getWithAuth: async <T>(
      endpoint: string,
      token: string,
      config: AxiosRequestConfig = {}
    ) =>
      await tryCatch<T>(handler.get, endpoint, {
        ...config,
        headers: { ...config?.headers, authorization: `Bearer ${token}` },
      }),
  });

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
    ...Get(),
    ...Post(),
  };
};

export const api = RequestHandler(apiHandler);

export const freeApi = RequestHandler(freeApiHandler);
