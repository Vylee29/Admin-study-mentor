import { Avatar } from 'antd';

type Props = {
  name: string;
  className?: string;
  avatar: string;
};
export default function ChatHeader({ className, name, avatar }: Props) {
  return (
    <div className={className}>
      {/* <div className='flex flex-col mb-4'>
                <span className='mb-4 text-lg font-bold text-black-800'>Lập trình JavaScript</span>
                <span className='font-bold text-[15px] text-primary-800'>Xem chi tiết</span>
            </div> */}
      <div className='flex gap-4 pb-2 pack-border-b-primary-400'>
        <Avatar size={40} src={avatar} />
        <div>
          <h1 className='m-0 text-base font-bold text-black-800'>{name}</h1>
          <span className='text-xs font-bold text-primary-600'>Hoạt động</span>
        </div>
      </div>
    </div>
  );
}
