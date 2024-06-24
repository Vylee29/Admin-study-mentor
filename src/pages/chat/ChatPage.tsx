import { useMutation, useQuery } from '@tanstack/react-query';
import { Tabs, TabsProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MENTORS, STUDENTS } from '../../+core/constants/commons.constant';
import { SocketEvent } from '../../+core/enums/socket.enum';
import { ChatModel } from '../../+core/models/chat.model';
import { FileReq } from '../../+core/models/file.model';
import {
  getChatMessageListApi,
  getChatRoomListApi,
  getChatRoomListKeys,
} from '../../+core/services/chat.service';
import { RootState } from '../../+core/store';
import IMAGES from '../../assets/images';
import ChatTab from '../../components/ui/chat/chat-tab/ChatTab';
import ChatHeader from './components/ChatHeader';
import { ChatList } from './components/ChatList';
const items: TabsProps['items'] = [
  {
    key: STUDENTS,
    label: 'Students',
    children: <ChatTab title='Students' />,
  },
  {
    key: MENTORS,
    label: 'Mentors',
    children: <ChatTab title='Mentors' />,
  },
];

function ChatPage() {
  const collapsed = useSelector((state: RootState) => state.sidebar.collapsed);
  const [selectedTab, setSelectedTab] = useState<string>(STUDENTS);
  const [dataChat, setDataChat] = useState<ChatModel[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const [searchParams] = useSearchParams();
  const activeId = useMemo(() => searchParams.get('roomId') || '', [searchParams]);

  const onChange = (key: string) => {
    setSelectedTab(key);
  };

  const roomQuery = useQuery({
    queryKey: getChatRoomListKeys.all,
    queryFn: () => getChatRoomListApi(),
    select: (data) => data.data.listRoom,
  });

  const mutateGetMessage = useMutation({
    mutationFn: (id: string) => getChatMessageListApi(id),
    onSuccess: (resp) => {
      setDataChat(resp.data.listMessage);
    },
  });

  const socketReducer = useSelector((state: RootState) => state.socket.socket);

  useEffect(() => {
    socketReducer?.on(SocketEvent.RECEIVE_MESSAGE, (data: ChatModel) => {
      setDataChat((prev) => [...prev, data]);
    });
    return () => {
      socketReducer?.off(SocketEvent.RECEIVE_MESSAGE);
    };
  }, []);

  useEffect(() => {
    if (activeId) {
      mutateGetMessage.mutate(activeId);
    }
  }, [activeId]);

  const handleSubmit = async (value: string, files?: FileReq[] | null) => {
    if (socketReducer) {
      const chatContent: ChatModel = {
        questionId: uuidv4(),
        senderId: user?.user?.id || '',
        recipientId: roomQuery.data?.find((room) => room.roomId === activeId)?.senderId || '',
        roomId: activeId,
        content: value,
        files: files,
      };
      setDataChat((prev) => [...prev, chatContent]);
      socketReducer.emit(SocketEvent.SEND_MESSAGE, chatContent);
    }
  };

  return (
    <div
      className='fixed h-[calc(100vh-100px)] right-0 duration-200 ease-in-out'
      style={{
        left: collapsed ? '100px' : '280px',
      }}
    >
      <div className='absolute w-[30%] h-full bg-gray-100 p-5 rounded-xl shadow-md transition'>
        <Tabs
          defaultActiveKey='1'
          items={items}
          onChange={onChange}
          className='w-full'
          activeKey={selectedTab}
        />
      </div>
      <div className='absolute w-[70%] right-0 h-full '>
        <div className='h-full px-5'>
          <div className='h-full bg-gray-100 shadow-md rounded-xl'>
            <ChatHeader
              className='absolute top-4 left-12 right-12'
              avatar={
                roomQuery.data?.find((e) => e.roomId === activeId)?.avatar || IMAGES.defaultAvatar
              }
              name={
                roomQuery.data?.find((e) => e.roomId === activeId)?.title || IMAGES.defaultAvatar
              }
            />
            <ChatList
              avatar={
                roomQuery.data?.find((e) => e.roomId === activeId)?.avatar || IMAGES.defaultAvatar
              }
              dataList={dataChat}
              className='absolute left-12 right-12 top-20 max-h-[calc(100vh-356px)] overflow-auto'
              onSubmit={handleSubmit}
              classNameMessage='absolute bottom-2 left-10 right-10'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
