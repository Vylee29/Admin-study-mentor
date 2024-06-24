import { useQuery } from '@tanstack/react-query';
import Search from 'antd/es/input/Search';
import { getChatRoomListApi, getChatRoomListKeys } from '../../../../+core/services/chat.service';
import RoomList from '../room-list/RoomList';

function ChatTab({ title }: { title: string }) {
  const roomQuery = useQuery({
    queryKey: getChatRoomListKeys.all,
    queryFn: () => getChatRoomListApi(),
    select: (data) => data.data.listRoom,
  });

  return (
    <div className='w-full'>
      <Search placeholder='Search someone' allowClear size='large' className='mb-5' />
      <RoomList title={title} chatList={roomQuery.data || []} />
    </div>
  );
}

export default ChatTab;
