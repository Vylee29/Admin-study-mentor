import { Tabs, TabsProps } from 'antd';
import { useState } from 'react';
import { RoomModel } from '../../+core/models/chat.model';
import ChatTab from '../../components/ui/chat/chat-tab/ChatTab';

function ChatPage() {
  const onChange = (key: string) => {
    console.log(key);
  };

  const questionExample = {
    id: 'string',
    title: 'Hoc Code Cung Toi',
    content: 'Ban Da Biet Code React Chua?',
    createAt: new Date().toString(),
    isCompleted: false,
  };
  const chatExample = {
    chatId: 'string',
    userId: 'string',
    value: 'Xin Chao Cac Ban',
    createdAt: new Date().toString(),
    textReplyId: 'string1',
  };
  const userForChat1 = {
    chatId: 'string',
    contactId: 'string',
    userId: 'string',
    isOnline: true,
    avatar:
      'https://images.unsplash.com/photo-1661174585122-83a2909163ad?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'David Nguyen',
    chats: [chatExample, chatExample],
    question: questionExample,
  };
  const userForChat2 = {
    chatId: 'string',
    contactId: 'string',
    userId: 'string',
    isOnline: true,
    avatar:
      'https://plus.unsplash.com/premium_photo-1705091981530-364352828985?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'David Nguyen',
    chats: [chatExample, chatExample],
    question: questionExample,
  };
  const chatList: RoomModel[] = [
    {
      chatId: '1',
      userChat: userForChat1,
      userReply: userForChat2,
    },
    {
      chatId: '2',
      userChat: userForChat1,
      userReply: userForChat2,
    },
    {
      chatId: '3',
      userChat: userForChat1,
      userReply: userForChat2,
    },
    {
      chatId: '4',
      userChat: userForChat1,
      userReply: userForChat2,
    },
    {
      chatId: '5',
      userChat: userForChat1,
      userReply: userForChat2,
    },
    {
      chatId: '6',
      userChat: userForChat1,
      userReply: userForChat2,
    },
    {
      chatId: '7',
      userChat: userForChat1,
      userReply: userForChat2,
    },
    {
      chatId: '8',
      userChat: userForChat1,
      userReply: userForChat2,
    },
  ];
  const [activeStudentId, setActiveStudentId] = useState<string>('');
  const [activeMentorId, setActiveMentorId] = useState<string>('');

  const handleClickStudentChatItem = (id: string) => {
    setActiveStudentId(id);
  };

  const handleClickMentorChatItem = (id: string) => {
    setActiveMentorId(id);
  };

  const items: TabsProps['items'] = [
    {
      key: 'students',
      label: 'Students',
      children: (
        <ChatTab
          title='Students'
          activeId={activeStudentId}
          chatList={chatList}
          onClick={handleClickStudentChatItem}
        />
      ),
    },
    {
      key: 'mentors',
      label: 'Mentors',
      children: (
        <ChatTab
          title='Mentors'
          activeId={activeMentorId}
          chatList={chatList}
          onClick={handleClickMentorChatItem}
        />
      ),
    },
  ];

  return (
    <div className='w-full flex gap-10 max-h-full'>
      <div className='w-[30%] bg-gray-100 p-5 max-h-full rounded-md shadow-md'>
        <Tabs defaultActiveKey='1' items={items} onChange={onChange} className='w-full' />
      </div>
      <div className='w-[70%] bg-gray-100 rounded-md shadow-md'></div>
    </div>
  );
}

export default ChatPage;
