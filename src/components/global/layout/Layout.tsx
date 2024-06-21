import {
  CommentOutlined,
  DashboardOutlined,
  FileTextOutlined,
  GiftOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout as LayoutAntDesign, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { DEFAULT_TAB_ITEM_VALUE } from '../../../+core/constants/commons.constant';
import { RootState } from '../../../+core/store';
import { Providers } from '../../../+core/store/provider';
import { MY_ROUTE } from '../../../routes/route.constant';
import Logo from '../../ui/logo/Logo';
import Header from '../Header/Header';

const menuList = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: 'students',
    icon: <UserOutlined />,
    label: 'Students',
  },
  {
    key: 'tutors',
    icon: <TeamOutlined />,
    label: 'Tutors',
  },
  {
    key: 'chat',
    icon: <CommentOutlined />,
    label: 'Chat',
  },
  {
    key: 'reports',
    icon: <FileTextOutlined />,
    label: 'Reports',
  },
  {
    key: 'vouchers',
    icon: <GiftOutlined />,
    label: 'Vouchers',
  },
  {
    key: 'detailed-info',
    icon: <FileTextOutlined />,
    label: 'Detailed Infor Demo',
  },
];

const { Content, Sider } = LayoutAntDesign;

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const [selected, setSelected] = useState<string>();
  const handleClickMenuItem = (e: any) => {
    navigate(e.key);
    setSelected(e.key);
  };

  const handleClickLogo = () => {
    navigate('/');
    setSelected(DEFAULT_TAB_ITEM_VALUE);
  };

  useEffect(() => {
    const firstPart = location.pathname.split('/')[1];
    const menuItem = menuList.find((item) => item.key === firstPart);

    if (menuItem) {
      setSelected(menuItem.key);
    } else setSelected(DEFAULT_TAB_ITEM_VALUE);
  }, []);

  useEffect(() => {
    console.log('isLoggedIn', isLoggedIn);
    if (isLoggedIn && !isLoggedIn) {
      navigate(MY_ROUTE.LOGIN);
    }
  }, [isLoggedIn]);

  return isLoggedIn === false ? (
    <Navigate to={MY_ROUTE.LOGIN} state={{ from: location }} />
  ) : (
    <LayoutAntDesign className='h-screen bg-white'>
      <Providers>
        <Sider breakpoint='lg' width={250} collapsed={collapsed} className=' !bg-blue-500 !px-5 '>
          <div className='flex flex-col w-full'>
            <Logo
              title={collapsed ? undefined : 'Study Mentor'}
              className='mt-5 '
              onClick={handleClickLogo}
            />
            <Menu
              className='mt-10 !bg-blue-500'
              theme='dark'
              mode='inline'
              selectedKeys={[selected || DEFAULT_TAB_ITEM_VALUE]}
              items={menuList}
              onClick={handleClickMenuItem}
            />
          </div>
        </Sider>
        <LayoutAntDesign className={`bg-white duration-500 ease-in-out ' `}>
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content
            className='w-full p-6 m-auto transition bg-white-900'
            style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px )' }}
          >
            <Outlet />
          </Content>
        </LayoutAntDesign>
      </Providers>
    </LayoutAntDesign>
  );
}
