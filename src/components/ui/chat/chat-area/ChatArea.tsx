import { SendOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { RoomModel, TextModel, UserChatModel } from '../../../../+core/models/chat.model';
import AttachmentIcon from '../../../../assets/icons/attachment';
import ThreeDotIcon from '../../../../assets/icons/three-dot';
import Question from '../../../../pages/chat/components/Question';

function ChatArea({ chatArea }: { chatArea?: RoomModel }) {
  const [chats, setChats] = useState<TextModel[]>([]);
  const [currentUser, setCurrentUser] = useState<UserChatModel>();
  const [userReply, setUserReply] = useState<UserChatModel>();
  const [inputValue, setInputValue] = useState<string>('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUserReply(
      chatArea?.userReply.userId === chatArea?.idOfUserCreateChat
        ? chatArea?.userReply
        : chatArea?.userChat,
    );
    setCurrentUser(
      chatArea?.userChat?.userId === chatArea?.idOfUserCreateChat
        ? chatArea?.userReply
        : chatArea?.userChat,
    );
  }, [chatArea?.chatId]);

  useEffect(() => {
    currentUser && userReply && setChats([...userReply.chats, ...currentUser.chats]);
  }, [currentUser, userReply]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (currentUser && userReply) {
      const newChat: TextModel = {
        textId: (Math.random() * (999 - 1) + 1).toString(),
        userId: currentUser?.userId,
        value: inputValue,
        createdAt: new Date().toString(),
        textReplyId: userReply?.userId,
      };
      chats && setChats([...chats, newChat]);
      setInputValue('');
    }
  };

  const handleEnterInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentUser && userReply) {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chats) {
      setTimeout(scrollToBottom);
    }
  }, [chats]);

  function scrollToBottom() {
    if (!chatContainerRef.current) {
      return;
    }
    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }

  return (
    <div className='w-full h-full'>
      {chatArea?.chatId && userReply && currentUser ? (
        <div className='w-full h-full relative'>
          <div className='flex items-center justify-between pb-6 border-b-[1px] border-gray-400 border-l-0 border-t-0 border-r-0 border-solid'>
            <div className='flex items-center gap-6'>
              <div className='w-[75px] h-[75px] rounded-full'>
                <img
                  src={userReply.avatar ?? ''}
                  alt='Avatar'
                  className='w-full h-full rounded-full'
                />
              </div>
              <div>
                <div className='font-semibold text-3xl'>{userReply.name ?? ''}</div>
                <div className='font-light text-gray-200'>
                  {userReply.isOnline ? 'Online' : 'Offline'}
                </div>
              </div>
            </div>
            <Button className='w-10 h-10 bg-transparent border-none shadow-none'>
              <ThreeDotIcon color={'#4667DB'} />
            </Button>
          </div>
          <div>
            <Question
              name={userReply.name}
              content={userReply.question.content}
              title={userReply.question.title}
              createAt={userReply.question.createAt}
            />
          </div>
          <div className='mt-8 h-[400px] overflow-y-scroll pb-5' ref={chatContainerRef}>
            {chats &&
              chats.length > 0 &&
              chats.map((chat: TextModel) => {
                return chat.userId === chatArea.idOfUserCreateChat ? (
                  <div className='mt-4 flex items-end gap-2' key={chat.textId}>
                    <div className='w-6 h-6 rounded-full'>
                      <img
                        src={userReply.avatar}
                        alt='Avatar'
                        className='w-full h-full rounded-full'
                      />
                    </div>
                    <div className='text-left p-4 rounded-2xl bg-gray-550 max-w-[400px] w-fit'>
                      {chat.value}
                    </div>
                  </div>
                ) : (
                  <div
                    key={chat.textId}
                    className='mt-4 text-right p-4 rounded-2xl bg-blue-400 text-white-900 max-w-[400px] w-fit ml-auto my-0 mr-0 mt-4'
                  >
                    {chat.value}
                  </div>
                );
              })}
          </div>
          <div className='absolute bottom-0 left-0 right-0 mt-8'>
            <Input
              addonAfter={<SendOutlined className='cursor-pointer' onClick={handleSendMessage} />}
              addonBefore={<AttachmentIcon color='#333333' className='h-4 w-4 cursor-pointer' />}
              placeholder='Send something ...'
              onChange={handleInputChange}
              onKeyDown={handleEnterInput}
              value={inputValue}
              size='large'
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ChatArea;
