import {
  CommentOutlined,
  DashboardOutlined,
  FileTextOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout as LayoutAntDesign, Menu } from 'antd';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { DEFAULT_TAB_ITEM_VALUE } from '../../../+core/constants/commons.constant';
import Logo from '../../ui/logo/Logo';
import Header from '../Header/Header';

const { Content, Sider, Footer } = LayoutAntDesign;

export default function Layout() {
  const menuList = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'student',
      icon: <UserOutlined />,
      label: 'Student',
    },
    {
      key: 'mentor',
      icon: <TeamOutlined />,
      label: 'Mentor',
    },
    {
      key: 'chat',
      icon: <CommentOutlined />,
      label: 'Chat',
    },
    {
      key: 'report',
      icon: <FileTextOutlined />,
      label: 'Report',
    },
    {
      key: 'detailed-info',
      icon: <FileTextOutlined />,
      label: 'Detailed Infor Demo',
    },
  ];

  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>(DEFAULT_TAB_ITEM_VALUE);
  const handleClickMenuItem = (e: any) => {
    navigate(e.key);
    setSelected(e.key);
  };

  const handleClickLogo = () => {
    navigate('/');
    setSelected(DEFAULT_TAB_ITEM_VALUE);
  };

  return (
    <LayoutAntDesign className='bg-white min-h-screen'>
      <Sider
        breakpoint='lg'
        collapsedWidth='0'
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        className='!w-[280px] !max-w-[250px] !min-w-[280px] !bg-blue-500 !px-5'
      >
        <div className='flex flex-col w-full'>
          <Logo title='Study Mentor' className='mt-5 ml-4' onClick={handleClickLogo} />
          <Menu
            className='mt-10 !bg-blue-500'
            theme='dark'
            mode='inline'
            selectedKeys={[selected]}
            items={menuList}
            onClick={handleClickMenuItem}
          />
        </div>
      </Sider>
      <LayoutAntDesign className={`bg-white duration-500 ease-in-out ' `}>
        <Header />
        <Content className='m-auto transition w-full p-6'>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </LayoutAntDesign>
    </LayoutAntDesign>
  );
}
