import { RoomModel } from '../../../../+core/models/chat.model';
import ChatItem from '../chat-item/ChatItem';

function ChatList({
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
      <div className='font-semibold text-3xl mb-4'>{title}</div>
      <div className='max-h-[500px] overflow-y-scroll'>
        {chatList &&
          chatList.length > 0 &&
          chatList.map((chatItem) => {
            return (
              <ChatItem
                chatItem={chatItem}
                key={chatItem.chatId}
                activeId={activeId}
                onClick={onClick}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ChatList;
