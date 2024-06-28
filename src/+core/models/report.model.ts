import { UserType } from '../enums/user.enum';
import { FileReq } from './file.model';

export enum OptionReport {
  STUDENT = '0',
  TUTOR = '1',
}

export type ReportListFilter = {
  option: OptionReport;
};

export type ReportModel = {
  reportId: string;
  questionName: string;
  FullName: string;
  content: string;
  userId: string;
  attachFiles?: FileReq[];
  createdAt: Date;
  questionId: string;
  questionTitle: string;
  hasFeedback: boolean;
  userType: UserType;
};

export type ReportTable = {
  reportId: string;
  key: string;
  questionName: string;
  FullName: string;
  content: string;
  userId: string;
  attachFiles?: FileReq[];
  createdAt: Date;
  questionId: string;
  questionTitle: string;
  hasFeedback: boolean;
  userType: UserType;
};
