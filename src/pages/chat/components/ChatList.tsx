import { Avatar, Image } from 'antd';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { PROCESS_ENV } from '../../../+core/constants/env.constant';
import { ChatModel } from '../../../+core/models/chat.model';
import { FileReq } from '../../../+core/models/file.model';
import { RootState } from '../../../+core/store';
import MessageForm from './MessageForm';

type Props = {
  dataList: ChatModel[];
  avatar: string;
  onSubmit: (value: string, files?: FileReq[] | null) => void;
  classNameMessage?: string;
  className?: string;
  isLoadingEnd?: boolean;
  isSideBar?: boolean;
};

export function ChatList({
  dataList,
  avatar,
  onSubmit,
  classNameMessage,
  className,
  isLoadingEnd,
  isSideBar,
}: Props) {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user);
  function scrollToBottom() {
    if (!chatContainerRef.current) {
      return;
    }
    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    if (dataList) {
      setTimeout(scrollToBottom);
    }
  }, [dataList]);

  return (
    <div>
      <div className={clsx('animate__animated animate__fadeIn', className)} ref={chatContainerRef}>
        {dataList.length === 0 ? (
          <div className='flex flex-col items-center justify-center gap-2 pt-4'>
            <Avatar size={40} src={avatar} />
            <div>
              <h1 className='m-0 text-base font-bold text-black-800'>Hãy nhắn tin với nhau nào</h1>
            </div>
          </div>
        ) : (
          dataList.map((item, index) => {
            const checkedMine = item.senderId === user.user?.id;
            let checked = !checkedMine;

            if (index !== 0 && item.recipientId && dataList[index - 1]?.recipientId) {
              checked = dataList[index - 1]?.recipientId !== item.recipientId;
            }

            return (
              <div
                key={index}
                className={clsx(
                  `flex flex-col gap-4`,
                  index !== 0 ? (checked ? 'mt-8' : 'mt-[10px]') : isSideBar ? 'mt-[10px]' : '',
                )}
              >
                <ChatItem
                  value={item.content}
                  createdAt={item.createdAt}
                  checkedMine={checkedMine}
                  className={!checkedMine && index === dataList.length - 1 ? 'type' : ''}
                  avatar={
                    isSideBar
                      ? undefined
                      : checked
                      ? !checkedMine
                        ? avatar
                        : undefined
                      : undefined
                  }
                  files={item.files}
                />
              </div>
            );
          })
        )}
        {isLoadingEnd && (
          <div className={clsx(`flex flex-col gap-4`, 'mt-8')}>
            <ChatItem value={''} createdAt={''} checkedMine={false} avatar={avatar} isLoadingEnd />
          </div>
        )}
      </div>
      <MessageForm onSubmit={onSubmit} className={classNameMessage} isSideBar />
    </div>
  );
}

type ChatItemProps = {
  value: string;
  createdAt?: string;
  avatar?: string;
  files?: FileReq[] | null;
  checkedMine: boolean;
  isLoadingEnd?: boolean;
  className?: string;
};

function ChatItem({ value, avatar, files, checkedMine, isLoadingEnd, className }: ChatItemProps) {
  return (
    <div className={clsx('flex gap-4 w-full', !checkedMine ? 'justify-start' : 'justify-end')}>
      {avatar ? (
        <div style={{ flex: `0 0 40px` }}>
          <Avatar size={40} src={avatar} />
        </div>
      ) : (
        <div style={{ flex: `0 0 40px` }}></div>
      )}

      {isLoadingEnd ? (
        <div className='flex items-end self-center h-4 gap-1 px-3 py-2 bg-gray-100 rounded-2xl'>
          <div className='w-1.5 h-1.5 rounded-full bg-gray-800 animation-message'></div>
          <div className='w-1.5 h-1.5 rounded-full bg-gray-800 animation-message animation-delay-100'></div>
          <div className='w-1.5 h-1.5 rounded-full bg-gray-800 animation-message animation-delay-200'></div>
        </div>
      ) : (
        // <CustomSkeletonParagraph height={40} className='!rounded-lg' />
        <div className={clsx('flex flex-col gap-[10px] ', avatar ? 'items-start' : 'items-end')}>
          {value && (
            <div className='flex items-center w-fit'>
              <div
                className='px-4 py-2 text-base bg-white-800 rounded-2xl w-fit tag-p'
                style={{ whiteSpace: checkedMine ? 'pre-line' : '' }}
              >
                {/* <div></div> */}
                <ReactMarkdown className={className}>{value}</ReactMarkdown>
              </div>
            </div>
          )}
          {files && (
            <div
              className={clsx(
                'flex flex-wrap gap-2 max-w-[416px]',
                avatar ? 'justify-start' : 'justify-end',
              )}
            >
              {files.map((file) => (
                <div key={file.fileKey} className='flex items-center gap-2'>
                  <Image
                    className='max-w-[200px] max-h-[100px] rounded-lg'
                    src={`${PROCESS_ENV.PHOTO}${file.fileKey}`}
                    alt='anh'
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
