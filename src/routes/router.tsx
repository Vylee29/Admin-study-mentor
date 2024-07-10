import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/global/layout/Layout';
import NotFoundPage from '../pages/404/NotFoundPage';
import { CertificatesPage } from '../pages/certificates/CertificatesPage';
import ChatPage from '../pages/chat/ChatPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import UpsertGradePage from '../pages/grade/upsert-grade/UpsertGradePage';
import { HomePage } from '../pages/home/HomePage';
import { LevelsPage } from '../pages/level/LevelsPage';
import UpsertLevelPage from '../pages/level/upsert-level/UpsertLevelPage';
import LoginPage from '../pages/login/LoginPage';
import { QuestionsPage } from '../pages/questions/QuestionsPage';
import { ReportsPage } from '../pages/reports/ReportsPage';
import { StudentsPage } from '../pages/students/StudentsPage';
import UpsertSubjectPage from '../pages/subject/upsert-grade/UpsertSubjectPage';
import { TutorsPage } from '../pages/tutors/TutorsPage';
import { VouchersPage } from '../pages/vouchers/VouchersPage';
import UpsertVoucherPage from '../pages/vouchers/upsert-voucher/UpsertVoucherPage';
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
        path: MY_ROUTE.QUESTIONS,
        element: <QuestionsPage />,
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
      {
        path: MY_ROUTE.CERTIFICATES,
        element: <CertificatesPage />,
      },
      { path: MY_ROUTE.UPSERT_VOUCHER, element: <UpsertVoucherPage /> },
      { path: MY_ROUTE.LEVEL.self, element: <LevelsPage /> },
      { path: `${MY_ROUTE.LEVEL.self}/:id`, element: <UpsertLevelPage /> },
      { path: MY_ROUTE.LEVEL.CREATE, element: <UpsertLevelPage /> },
      { path: MY_ROUTE.GRADE.CREATE, element: <UpsertGradePage /> },
      { path: `${MY_ROUTE.GRADE.self}/:id`, element: <UpsertGradePage /> },
      { path: `${MY_ROUTE.SUBJECT.CREATE}`, element: <UpsertSubjectPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/*', element: <NotFoundPage /> },
]);
