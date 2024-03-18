import { Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import { MENTORS, STUDENTS } from '../../+core/constants/commons.constant';
import { RoomModel } from '../../+core/models/chat.model';
import ChatArea from '../../components/ui/chat/chat-area/ChatArea';
import ChatTab from '../../components/ui/chat/chat-tab/ChatTab';

function ChatPage() {
  const onChange = (key: string) => {
    console.log(key);

    setSelectedTab(key);
  };

  const questionExample = {
    id: 'string',
    title: 'Hoc Code Cung Toi',
    content: 'Ban Da Biet Code React Chua?',
    createAt: new Date().toString(),
    isCompleted: false,
  };
  const chatExample1 = {
    textId: 'textId1',
    userId: 'string',
    value: 'Xin Chao Cac Ban Xin Chao Cac Ban Xin Chao Cac Ban Xin Chao Cac Ban',
    createdAt: new Date().toString(),
    textReplyId: 'string1',
  };
  const chatExample2 = {
    textId: 'textId2',
    userId: 'currentUser',
    value: 'Chao Cai Gi',
    createdAt: new Date().toString(),
    textReplyId: 'string1',
  };
  const userForChat1 = {
    roomId: 'roomId',
    contactId: 'string',
    userId: 'string',
    isOnline: true,
    avatar:
      'https://images.unsplash.com/photo-1661174585122-83a2909163ad?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'David Nguyen',
    chats: [chatExample1],
    question: questionExample,
  };
  const userForChat2 = {
    roomId: 'roomId',
    contactId: 'string',
    userId: 'currentUser',
    isOnline: true,
    avatar:
      'https://plus.unsplash.com/premium_photo-1705091981530-364352828985?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'David Nguyen',
    chats: [chatExample2],
    question: questionExample,
  };
  const chatList: RoomModel[] = [
    {
      chatId: '1',
      userChat: userForChat1,
      userReply: userForChat2,
      idOfUserCreateChat: 'string',
    },
    {
      chatId: '2',
      userChat: userForChat1,
      userReply: userForChat2,
      idOfUserCreateChat: 'currentUser',
    },
    {
      chatId: '3',
      userChat: userForChat1,
      userReply: userForChat2,
      idOfUserCreateChat: 'string',
    },
    {
      chatId: '4',
      userChat: userForChat1,
      userReply: userForChat2,
      idOfUserCreateChat: 'string',
    },
    {
      chatId: '5',
      userChat: userForChat1,
      userReply: userForChat2,
      idOfUserCreateChat: 'string',
    },
    {
      chatId: '6',
      userChat: userForChat1,
      userReply: userForChat2,
      idOfUserCreateChat: 'string',
    },
    {
      chatId: '7',
      userChat: userForChat1,
      userReply: userForChat2,
      idOfUserCreateChat: 'string',
    },
    {
      chatId: '8',
      userChat: userForChat1,
      userReply: userForChat2,
      idOfUserCreateChat: 'string',
    },
  ];
  const [activeStudent, setActiveStudent] = useState<RoomModel>();
  const [activeMentor, setActiveMentor] = useState<RoomModel>();
  const [chatArea, setChatArea] = useState<RoomModel>();
  const [selectedTab, setSelectedTab] = useState<string>(STUDENTS);

  const handleClickStudentChatItem = (id: string) => {
    const student = chatList.find((chat) => chat.chatId === id);

    setActiveStudent(student);
  };

  const handleClickMentorChatItem = (id: string) => {
    const mentor = chatList.find((chat) => chat.chatId === id);

    setActiveMentor(mentor);
  };

  useEffect(() => {
    if (selectedTab === STUDENTS) setChatArea(activeStudent);
    else setChatArea(activeMentor);
  }, [activeStudent, activeMentor]);

  const items: TabsProps['items'] = [
    {
      key: STUDENTS,
      label: 'Students',
      children: (
        <ChatTab
          title='Students'
          activeId={activeStudent?.chatId ?? ''}
          chatList={chatList}
          onClick={handleClickStudentChatItem}
        />
      ),
    },
    {
      key: MENTORS,
      label: 'Mentors',
      children: (
        <ChatTab
          title='Mentors'
          activeId={activeMentor?.chatId ?? ''}
          chatList={chatList}
          onClick={handleClickMentorChatItem}
        />
      ),
    },
  ];

  return (
    <div className='w-full flex gap-10 max-h-full'>
      <div className='w-[30%] bg-gray-100 p-5 max-h-full rounded-xl shadow-md'>
        <Tabs
          defaultActiveKey='1'
          items={items}
          onChange={onChange}
          className='w-full'
          activeKey={selectedTab}
        />
      </div>
      <div className='w-[70%] bg-gray-100 rounded-xl shadow-md p-5'>
        <ChatArea chatArea={chatArea} />
      </div>
    </div>
  );
}

export default ChatPage;
