import clsx from 'clsx';
import { format } from 'date-fns';
import { DATE_FORMAT } from '../../../../+core/constants/commons.constant';
import { RoomModel } from '../../../../+core/models/chat.model';
import IMAGES from '../../../../assets/images';

function RoomItem({
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
        { 'bg-blue-300 hover:bg-blue-300': activeId === chatItem.roomId },
      )}
      onClick={() => onClick(chatItem.roomId)}
    >
      <div className='flex items-center max-w-full gap-5'>
        <div className='w-[40px] h-[40px] rounded-full'>
          <img
            alt='Avatar'
            className='object-cover w-full h-full rounded-full'
            src={
              // chatItem.userReply.userId === chatItem.idOfUserCreateChat
              //   ? chatItem.userReply.avatar
              //   : chatItem.userChat.avatar
              chatItem.avatar || IMAGES.defaultAvatar
            }
          />
        </div>
        <div>
          <div className='text-base font-bold'>{chatItem.title}</div>
          <div className='text-sm font-light text-gray-200'>
            hello
            {/* {chatItem.userReply.chats[chatItem.userReply.chats.length - 1].value} */}
          </div>
        </div>
      </div>
      <div className='flex flex-col items-end max-w-full gap-2'>
        <div
          className={clsx('font-light text-gray-450 truncate', {
            'text-white-900': activeId === chatItem.roomId,
          })}
        >
          {format(chatItem.createdAt, DATE_FORMAT)}
        </div>
        <div></div>
        {/* <TickDoubleIcon color='#4667DB' /> */}
      </div>
    </div>
  );
}

export default RoomItem;
