import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RoomModel } from '../../../../+core/models/chat.model';
import RoomItem from '../room-item/RoomItem';

function RoomList({ title, chatList }: { title: string; chatList: RoomModel[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeId = useMemo(() => searchParams.get('roomId') || '', [searchParams]);

  return (
    <div className='w-full'>
      <div className='mb-4 text-3xl font-semibold'>{title}</div>
      <div className='max-h-[500px] overflow-y-scroll'>
        {chatList &&
          chatList.length > 0 &&
          chatList.map((chatItem) => {
            return (
              <RoomItem
                chatItem={chatItem}
                key={chatItem.roomId}
                activeId={activeId}
                onClick={() => {
                  setSearchParams({ roomId: chatItem.roomId });
                }}
              />
            );
          })}
      </div>
    </div>
  );
}

export default RoomList;
