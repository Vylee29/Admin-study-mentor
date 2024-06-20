import Cookie from 'js-cookie';
import { STORAGE } from '../constants/shared.contant';
import { api } from '../https/http';
import { IAuthenResponseModel, LoginInput, SignUpInput } from '../models/authentication.model';
import { BaseResp } from '../models/base.model';

export const setAccessTokenCookie = async (accessToken: string) => {
  Cookie.set(STORAGE.ACCESS_TOKEN, accessToken, {
    path: '/',
  });
};

export const setAuthorityCookie = (authority: string) => {
  Cookie.set(STORAGE.AUTHORITY, authority, {
    path: '/',
  });
};

export const signUpApi = async (data: SignUpInput) => {
  return api.post<BaseResp<IAuthenResponseModel>>('/api/users/register', data);
};

export const loginApi = async (data: LoginInput) => {
  return api.post<BaseResp<IAuthenResponseModel>>('/api/users/login', data);
};
