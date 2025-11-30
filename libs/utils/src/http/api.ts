import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

export interface PagedMetaData {
  count: number;
}

export interface PagedLinks {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export interface PagedResponse<D = any, M = any> {
  meta: M;
  links: PagedLinks;
  data: D[];
}

export function authInterceptor(reqConfig: AxiosRequestConfig) {
  return {
    ...reqConfig,
    headers: {
      ...reqConfig.headers,
    } as any,
  };
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api/cost-management/v1/',
});

axiosInstance.interceptors.request.use(authInterceptor);

export default axiosInstance;


