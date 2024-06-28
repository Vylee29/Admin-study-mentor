import {
  QuestionEnum,
  QuestionStatus,
  QuestionStatusString,
  QuestionStep,
} from '../enums/question.enum';
import { IPaginationInfo } from '../types/paging.type';
import { FileReq } from './file.model';
import { Subject, UserModel } from './user.model';

export type QuestionModel = {
  id: string;
  title: string;
  content: string;
  createAt: string;
  isCompleted: boolean;
};

export interface AnswerResponseModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  fileAttachmentAnswers: FileReq[];
}

export type GetQuestionResponseModel = {
  questionId: string;
  createdAt: string;
  updatedAt: string;
  answerTime: number;
  content: string;
  price: string;
  status: QuestionStatus;
  isPaid: boolean;
  type: number;
  fileQuestions: FileReq[] | null;
  student: UserModel;
  tutor?: UserModel;
  subject: Subject;
  answers: AnswerResponseModel[] | null;
  isAnswered: boolean;
  roomId?: string;
  step?: QuestionStep;
  isAccepted: boolean;
  title?: string;
  questionType: QuestionEnum;
  timeMetting?: number;
  meetingURL?: string;
};

export type QuestionListFilter = {
  status?: QuestionStatusString;
};
export type QuestionListReq = QuestionListFilter & IPaginationInfo;
