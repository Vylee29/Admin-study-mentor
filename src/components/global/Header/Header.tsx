import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../+core/store';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

type Props = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const Header = ({ collapsed, setCollapsed }: Props) => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <header className='flex items-center h-16 shadow-xl'>
      <Button
        type='text'
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <div className='self-center m-auto text-2xl font-light text-center'>
        Welcome back, <span className='text-4xl font-medium'>{user.user?.fullName}</span>
      </div>
      <div className='flex items-center gap-4'>
        <div className='w-[55px] h-[55px] rounded-full cursor-pointer'>
          <img
            src='https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Admin'
            className='object-cover w-full h-full rounded-full'
          />
        </div>
        <div className='flex flex-col pr-2'>
          <div className='text-xl font-semibold'>Sterling</div>
          <div className='font-normal text-gray-400'>Super admin</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
