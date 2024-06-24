import { api } from '../https/http';
import { ChatModel, RoomModel } from '../models/chat.model';
import { initKeys } from '../utilities/query-key.utility';

export const getChatRoomListKeys = initKeys('chatRoomList');
export const getChatRoomListApi = async () => {
  return api.get<{ listRoom: RoomModel[] }>(`/api/roomchat/listRoom`);
};

export const getChatMessageListKeys = initKeys('chatMessageList');
export const getChatMessageListApi = async (roomId: string) => {
  return api.get<{ listMessage: ChatModel[] }>(`/api/roomchat/MessageRoom/${roomId}`);
};
