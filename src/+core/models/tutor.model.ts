import { UserResp } from './profile.model';

export interface IFileAttachment {
  fileName: string;
  fileKey: string;
}

export enum UserRole {
  STUDENT = 0,
  TUTOR = 1,
}

export interface IAvatar {
  fileName: string;
  fileKey: string;
}

export type IGetUserResponse = {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatar?: IAvatar;
};

export interface TutorModel extends IGetUserResponse {
  status: number;
  certificate: IFileAttachment[];
  subject: string;
}
export type TutorTable = TutorModel & UserResp;
