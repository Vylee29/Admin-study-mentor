import { FileReq } from './file.model';
import { QuestionModel } from './question.model';

export type TextModel = {
  textId: string;
  userId: string;
  value: string;
  createdAt: string;
  textReplyId: string;
};

export type UserChatModel = {
  roomId: string;
  contactId: string;
  userId: string;
  isOnline: boolean;
  avatar: string;
  name: string;
  chats: TextModel[];
  question: QuestionModel;
};

export type QuestionResp = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  answerTime: number;
  content: string;
  price: string;
  status: number;
  isPaid: boolean;
  type: number;
  googleMeetUrl: string;
  jobRunCount: number;
  step: number;
  title?: string;
};

export type RoomModel = {
  roomId: string;
  title: string;
  senderId: string;
  recipientId: string;
  createdAt: string;
  avatar?: string;
  question?: QuestionResp;
};

export type ChatModel = {
  questionId?: string;
  senderId: string;
  recipientId: string;
  roomId?: string;
  content: string;
  files?: FileReq[] | null;
  createdAt?: string;
};
