import { Dayjs } from 'dayjs';
import { Gender, Status } from '../enums/user.enum';
import { FileAntd, FileReq } from './file.model';

export type PersonalInformationInput = {
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: Dayjs;
  gender: number;
};

export type UpdatePersonalInformationInput = {
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: number;
  gender: number;
};

export type EducationInformationInput = {
  subjectIds: string[];
  levelIds: string[];
  gradeIds: string[];
  certificateFiles: FileAntd;
};

export type CertificatesInformationRequest = {
  certificates: FileReq[] | null;
  subjectIds: string[];
  userId: string;
};

export type CertificatesSubjectNotVerifyResp = {
  userId: string;
  certificates: FileReq[];
  subjects: Subject[];
};

export type Subject = {
  id: string;
  name: string;
};

export type MentorType = {
  id: string;
  image: string | null;
  name: string;
  age: number;
  rating: number;
};

export type UserResp = {
  id: string;
  fullName: string;
  email: string;
  role: number;
  phone: string;
  dateOfBirth: Date;
  gender: number;
  isActive: boolean;
  averageRate: number;
  avatar: FileReq;
  status: Status;
  createdAt: Date;
};

export type EducationInfoResp = {
  subjects: ISubject[];
};

export type ISubject = {
  id: string;
  name: string;
};

export type IGrade = {
  id: string;
  name: string;
};

export type ILevel = {
  id: string;
  name: string;
};

export type FileObject = {
  fileKey: string;
  fileName: string;
};

export type IUserProfileResp = {
  id: string;
  email: string;
  gender: Gender;
  avatar?: FileObject;
  fullName: string;
  role: any;
  phone: string;
  dateOfBirth?: Date;
  isActive: boolean;
  averageRate: number;
};

export type UserVoucherViewModel = {
  code: string;
  percentage: number;
  endDate: string;
  quantity: number;
};

export type BankAccountInput = {
  binBank: string;
  accountNumber: string;
  accountName: string;
};

export type BankItemResp = {
  id: number;
  name: string;
  code: string;
  bin: string;
  shortName: string;
  logo: string;
  transferSupported: number;
  lookupSupported: number;
  short_name: string;
  support: number;
  isTransfer: number;
  swift_code: string;
};

export type LookUpBankNumberReq = {
  bin: string;
  accountNumber: string;
};

export type LookUpBankNumberResp = {
  accountName: string;
};

export type QRCodeReq = {
  accountNo: string;
  accountName: string;
  acqId: number;
  amount?: number;
  addInfo?: string;
  format?: string;
  template?: string;
};

export type QRCodeResp = {
  acpId: number;
  accountName: string;
  qrCode: string;
  qrDataURL: string;
};

export type SignedUrlResp = {
  fileKey: string;
  fileName: string;
  url: string;
};

export type BankModel = {
  nameOfBanking: string | null;
  numberOfBanking: string | null;
  idOfBanking: string | null;
  nameUserOfBanking: string | undefined;
};
