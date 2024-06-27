import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/global/layout/Layout';
import NotFoundPage from '../pages/404/NotFoundPage';
import ChatPage from '../pages/chat/ChatPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import { HomePage } from '../pages/home/HomePage';
import LoginPage from '../pages/login/LoginPage';
import { ReportsPage } from '../pages/reports/ReportsPage';
import { StudentsPage } from '../pages/students/StudentsPage';
import { TutorsPage } from '../pages/tutors/TutorsPage';
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
        path: MY_ROUTE.TUTORS,
        element: <TutorsPage />,
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
        path: MY_ROUTE.VOUCHERS,
        element: <VouchersPage />,
      },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/*', element: <NotFoundPage /> },
]);
