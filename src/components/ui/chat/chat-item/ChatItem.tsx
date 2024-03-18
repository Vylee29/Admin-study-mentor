import clsx from 'clsx';
import { format } from 'date-fns';
import { DATE_FORMAT } from '../../../../+core/constants/commons.constant';
import { RoomModel } from '../../../../+core/models/chat.model';
import TickDoubleIcon from '../../../../assets/icons/tick-double';

function ChatItem({
  chatItem,
  activeId,
  onClick,
}: {
  chatItem: RoomModel;
  activeId: string;
  onClick: (id: string) => void;
}) {
  return (
    <div
      className={clsx(
        'w-full flex items-center justify-between cursor-pointer hover:bg-blue-100 p-4 rounded-lg',
        { 'bg-blue-300 hover:bg-blue-300': activeId === chatItem.chatId },
      )}
      onClick={() => onClick(chatItem.chatId)}
    >
      <div className='flex items-center gap-5 max-w-full'>
        <div className='w-[50px] h-[50px] rounded-full'>
          <img
            alt='Avatar'
            className='w-full h-full object-cover rounded-full'
            src={
              chatItem.userReply.userId === chatItem.idOfUserCreateChat
                ? chatItem.userReply.avatar
                : chatItem.userChat.avatar
            }
          />
        </div>
        <div>
          <div className='font-bold text-xl'>{chatItem.userReply.name}</div>
          <div className='font-light text-base text-gray-200'>
            {chatItem.userReply.chats[chatItem.userReply.chats.length - 1].value}
          </div>
        </div>
      </div>
      <div className='flex flex-col items-end gap-2 max-w-full'>
        <div
          className={clsx('font-light text-gray-450 truncate', {
            'text-white-900': activeId === chatItem.chatId,
          })}
        >
          {format(
            chatItem.userReply.chats[chatItem.userReply.chats.length - 1].createdAt,
            DATE_FORMAT,
          )}
        </div>
        <TickDoubleIcon color='#4667DB' />
      </div>
    </div>
  );
}

export default ChatItem;
