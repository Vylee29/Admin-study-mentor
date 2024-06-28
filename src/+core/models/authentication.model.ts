import { Gender, UserType } from '../enums/user.enum';
import { UserResp } from './profile.model';

export type SignUpInput = {
  email: string;
  fullName: string;
  gender: Gender;
  password: string;
  type: UserType;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type IAuthenResponseModel = {
  accessToken: string;
  resetToken: string;
  user: UserResp;
};

export type ChangePasswordInput = {
  oldPassword: string;
  newPassword: string;
};

export type ResetPasswordInput = {
  email: string;
};
