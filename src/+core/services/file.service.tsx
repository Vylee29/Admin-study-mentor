import axios from 'axios';
import { api } from '../https/http';
import { BaseResp } from '../models/base.model';
import { SignedUrlResp } from '../models/file.model';

export const getSignedUrlApi = async (fileName: string) => {
  return api.post<BaseResp<SignedUrlResp>>(`/api/files/signed-url`, { fileName });
};

export const uploadFileToCloudApi = async (data: { url: string; file: File }) => {
  return axios.put<void>(data.url, data.file);
};

export const downloadFileApi = async (params: { fileKey: string }) => {
  return api.get<Blob>(`/api/files/download`, {
    params,
    responseType: 'blob',
  });
};
