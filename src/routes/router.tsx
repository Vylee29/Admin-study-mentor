import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/global/layout/Layout';
import ChatPage from '../pages/chat/ChatPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import DetailedInfoDemoPage from '../pages/detailed-info/DetailedInfoDemo';
import { HomePage } from '../pages/home/HomePage';
import MentorPage from '../pages/mentor/MentorPage';
import { NotFoundPage } from '../pages/not-found-page/NotFoundPage';
import ReportPage from '../pages/report/ReportPage';
import { StudentPage } from '../pages/student/StudentPage';
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
        path: MY_ROUTE.STUDENT,
        element: <StudentPage />,
      },
      {
        path: MY_ROUTE.MENTOR,
        element: <MentorPage />,
      },
      {
        path: MY_ROUTE.REPORT,
        element: <ReportPage />,
      },
      {
        path: MY_ROUTE.CHAT,
        element: <ChatPage />,
      },
      {
        path: MY_ROUTE.DETAILED_INFO,
        element: <DetailedInfoDemoPage />,
      },
    ],
  },
  { path: '/*', element: <NotFoundPage /> },
]);
