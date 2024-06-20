import { UploadChangeParam, UploadFile } from 'antd/es/upload';

export type SignedUrlResp = {
  fileKey: string;
  fileName: string;
  url: string;
};

export type FileReq = {
  fileKey: string;
  fileName: string;
};

export type FileAntd = UploadChangeParam<UploadFile<any>>;
