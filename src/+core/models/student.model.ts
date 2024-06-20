import { IPaginationInfo } from '../types/paging.type';

export interface IAvatar {
  fileName: string;
  fileKey: string;
}

export enum Status {
  ACTIVE = 0,
  IN_ACTIVE = 1,
}

export enum UserRole {
  STUDENT = 0,
  TUTOR = 1,
}

export type StudentModel = {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  status: Status;
  avatar?: IAvatar;
};

export type StudentListFilter = {
  search?: string;
};

export type StudentListReq = StudentListFilter & IPaginationInfo;

export type StudentTable = StudentModel;
