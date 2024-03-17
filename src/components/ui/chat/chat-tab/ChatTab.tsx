import Search from 'antd/es/input/Search';
import { RoomModel } from '../../../../+core/models/chat.model';
import ChatList from '../chat-list/ChatList';

function ChatTab({
  title,
  chatList,
  activeId,
  onClick,
}: {
  title: string;
  chatList: RoomModel[];
  activeId: string;
  onClick: (id: string) => void;
}) {
  return (
    <div className='w-full'>
      <Search placeholder='Search someone' allowClear size='large' className='mb-5' />
      <ChatList title={title} activeId={activeId} chatList={chatList} onClick={onClick} />
    </div>
  );
}

export default ChatTab;
