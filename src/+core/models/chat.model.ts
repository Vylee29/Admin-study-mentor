import { QuestionModel } from './question.model';

export type TextModel = {
  chatId: string;
  userId: string;
  value: string;
  createdAt: string;
  textReplyId: string;
};

export type UserChatModel = {
  chatId: string;
  contactId: string;
  userId: string;
  isOnline: boolean;
  avatar: string;
  name: string;
  chats: TextModel[];
  question: QuestionModel;
};

export type RoomModel = {
  chatId: string;
  userChat: UserChatModel;
  userReply: UserChatModel;
};
