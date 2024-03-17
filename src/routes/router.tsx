import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/global/layout/Layout';
import ChatPage from '../pages/chat/ChatPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import DetailedInfoDemoPage from '../pages/detailed-info/DetailedInfoDemo';
import { HomePage } from '../pages/home/HomePage';
import { MentorsPage } from '../pages/mentors/MentorsPage';
import { NotFoundPage } from '../pages/not-found-page/NotFoundPage';
import ReportsPage from '../pages/reports/ReportsPage';
import { StudentsPage } from '../pages/students/StudentsPage';
import { VouchersPage } from '../pages/vouchers/VouchersPage';
import { MY_ROUTE } from './route.constant';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: MY_ROUTE.HOME, element: <HomePage /> },
      {
        path: MY_ROUTE.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: MY_ROUTE.STUDENTS,
        element: <StudentsPage />,
      },
      {
        path: MY_ROUTE.MENTORS,
        element: <MentorsPage />,
      },
      {
        path: MY_ROUTE.REPORTS,
        element: <ReportsPage />,
      },
      {
        path: MY_ROUTE.CHAT,
        element: <ChatPage />,
      },
      {
        path: MY_ROUTE.DETAILED_INFO,
        element: <DetailedInfoDemoPage />,
      },
      {
        path: MY_ROUTE.VOUCHERS,
        element: <VouchersPage />,
      },
    ],
  },
  { path: '/*', element: <NotFoundPage /> },
]);
