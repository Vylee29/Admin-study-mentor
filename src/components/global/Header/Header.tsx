import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../+core/store';
import { setCollapsed } from '../../../+core/store/reducers/sidebar.reducer';
import { onConnect, onDisconnect } from '../../../+core/store/reducers/socket.reducer';
import { defaultSocket } from '../../../socket';

const Header = () => {
  const user = useSelector((state: RootState) => state.user);
  const collapsed = useSelector((state: RootState) => state.sidebar.collapsed);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.user?.id) {
      dispatch(onDisconnect());

      const socket = defaultSocket(user?.user?.id);

      if (socket) {
        const onConnectSocket = () => {
          dispatch(onConnect(socket));
          console.log('connect with id:', user?.user?.id);
        };

        const onDisconnectSocket = () => {
          dispatch(onDisconnect());
        };

        socket.on('connect', onConnectSocket);
        socket.on('disconnect', onDisconnectSocket);
        socket.on('error', (error) => {
          console.error('Socket error:', error);
        });

        return () => {
          socket.off('connect', onConnectSocket);
          socket.off('disconnect', onDisconnectSocket);
          socket.off('error');
        };
      }
    }
  }, [user?.user?.id]);

  return (
    <header className='flex items-center h-16 shadow-xl'>
      <Button
        type='text'
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => {
          dispatch(setCollapsed(!collapsed));
        }}
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
