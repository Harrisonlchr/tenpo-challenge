import { authStore } from "@/store/auth-store";
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const apiInstances = new Map<string, AxiosInstance>();
export class AxiosSingleton {
  private axiosInstance: AxiosInstance;
  private constructor(baseURL: string, token?: string) {
    const apiConfig = {
      baseURL,
      timeout: 10000,
      headers: {
        "content-type": "application/json",
        Authorization: token && `Bearer ${token}`,
      },
    };
    this.axiosInstance = axios.create(apiConfig);
    this.axiosInstance.interceptors.request.use(
      this.requestInterceptor,
      this.requestErrorInterceptor
    );
    this.axiosInstance.interceptors.response.use(
      this.responseInterceptor,
      this.responseErrorInterceptor
    );
  }

  public static getInstance(baseUrl: string, token?: string): AxiosInstance {
    let instance = apiInstances.get(baseUrl);
    if (!instance) {
      instance = new AxiosSingleton(baseUrl, token).axiosInstance;
      apiInstances.set(baseUrl, instance);
    }
    return instance;
  }

  private requestInterceptor(
    config: InternalAxiosRequestConfig<unknown>
  ) {
    const token = authStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }

  private async requestErrorInterceptor(error: unknown): Promise<unknown> {
    return Promise.reject(error);
  }

  private responseInterceptor(response: AxiosResponse): AxiosResponse {
    return response.data;
  }

  private responseErrorInterceptor(error: unknown): Promise<unknown> {
    return Promise.reject(error);
  }
}
