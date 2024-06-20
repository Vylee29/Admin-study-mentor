import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import nProgress from 'nprogress';
import { PROCESS_ENV } from '../constants/env.constant';
import { STORAGE } from '../constants/shared.contant';

export const api = axios.create({
  baseURL: PROCESS_ENV.BACKEND_API_ENDPOINT,
});

const nProgressHandler = (type: 'start' | 'stop') => {
  if (typeof window !== 'object') return;
  if (type === 'start') nProgress.start();
  else nProgress.done();
};

api.interceptors.request.use(
  async (config: AxiosRequestConfig | any): Promise<any> => {
    nProgressHandler('start');
    const token = Cookies.get(STORAGE.ACCESS_TOKEN);
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    nProgressHandler('stop');
    return response;
    // return response.data;
  },
  (error: AxiosError): Promise<AxiosError> => {
    // if (error.response?.status === 401) signOut();
    nProgressHandler('stop');
    return Promise.reject(error);
  },
);
