import { TutorState } from '../enums/user.enum';
import { FileReq } from './file.model';
import { IFileAttachment } from './tutor.model';

export enum UserRole {
  STUDENT = 0,
  TUTOR = 1,
  ADMIN = 2,
}

export type UserModel = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  gender: number;
  skill?: string;
  fullName: string;
  role: number;
  phone: string;
  tutorState?: TutorState;
  status: number;
  dateOfBirth?: number;
  averageRate: number;
  isOnline: boolean;
  avatar?: FileReq;
  subjects?: Subject[];
  certificates: IFileAttachment[];
};

export type Subject = {
  name: string;
};

export type OverviewTutorInfo = {
  revenue: number;
  numberOfQuestionsAnswered: number;
  numberOfComment: number;
  numberOfStudent: number;
};

export type ChartRevenueItem = {
  date: string;
  totalCost: number;
};

export type QuestionAnsweredItem = {
  questionId: string;
  studentId: string;
  name: string;
  avatar?: FileReq;
  expense: number;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
};

export type ResetPasswordReq = {
  passwordOld: string;
  passwordNew: string;
};

export type FeedbackReportInput = {
  content: string;
};

export type FeedbackReportReq = {
  reportId: string;
  fullName: string;
  userId: string;
  questionName: string;
  content: string;
  feedback: string;
};
