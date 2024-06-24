import { useMutation } from '@tanstack/react-query';
import { UploadFile } from 'antd';
import { useState } from 'react';
import { FileReq } from '../models/file.model';
import { getSignedUrlApi, uploadFileToCloudApi } from '../services/file.service';
import { handleError } from '../utilities/failure-handler.utitlity';

export const useUploadFileApi = () => {
  const [isFetching, setIsFetching] = useState(false);

  const uploadToBackend = useMutation({
    mutationFn: (data: string) => getSignedUrlApi(data),
    onError: handleError,
  });

  const uploadFileToCloud = useMutation({
    mutationFn: (data: { url: string; file: File }) => uploadFileToCloudApi(data),
  });

  const uploadFile = async (file: UploadFile): Promise<FileReq> => {
    setIsFetching(true);
    return new Promise((resolve, reject) => {
      uploadToBackend.mutate(file.name, {
        onSuccess: (resp) => {
          // upload to cloud

          uploadFileToCloud.mutate(
            {
              file: file.originFileObj as File,
              url: resp.data.data.url,
            },
            {
              onSuccess: () => {
                setIsFetching(false);
                resolve({
                  fileKey: resp.data.data.fileKey,
                  fileName: resp.data.data.fileName,
                });
              },
              onError: (error: any) => {
                setIsFetching(false);
                // handleError(error as AxiosError);
                reject(error);
              },
            },
          );
        },
        onError: (error) => {
          setIsFetching(false);
          // handleError(error as AxiosError);
          reject(error);
        },
      });
    });
  };

  // temporary solution
  const uploadMultipleFiles = async (files: UploadFile[]): Promise<FileReq[] | null> => {
    if (!files) return null;

    const uploadedFiles: FileReq[] = [];

    for (const file of files) {
      const uploadedFile = await uploadFile(file);
      uploadedFiles.push(uploadedFile);
    }

    return uploadedFiles;
  };

  // const uploadMultipleFiles = async (files: UploadFile[]): Promise<FileReq[] | null> => {
  //     if (!files) return null;

  //     const promises = files.map((file) => uploadFile(file));
  //     const uploadedFiles = await Promise.all(promises);

  //     return uploadedFiles;
  // };

  return { isFetching, uploadFile, uploadMultipleFiles };
};
