export const MY_ROUTE = {
  HOME: '',
  DASHBOARD: '/dashboard',
  STUDENTS: '/students',
  TUTORS: '/tutors',
  REPORTS: '/reports',
  CHAT: '/chat',
  VOUCHERS: '/vouchers',
  UPSERT_VOUCHER: '/vouchers/:id',
  LEVEL: {
    self: '/level',
    CREATE: '/level/create',
    DETAIL: (id: string) => `/level/${id}`,
  },
  GRADE: {
    self: '/grade/:levelId',
    LIST: (levelId: string) => `/grade/${levelId}`,
    CREATE: '/grade/:levelId/create',
    CREATE_LEVEL: (levelId: string) => `/grade/${levelId}/create`,
    DETAIL: (levelId: string, id: string) => `/grade/${levelId}/${id}`,
  },
  SUBJECT: {
    self: '/subject/:levelId/:gradeId',
    CREATE: '/subject/:levelId/:gradeId/create',
    CREATE_GRADE: (levelId: string, gradeId: string) => `/subject/${levelId}/${gradeId}/create`,
    DETAIL: (id: string) => `/subject/:levelId/:gradeId/${id}`,
  },

  LOGIN: '/login',
  QUESTIONS: '/questions',
  CERTIFICATES: '/certificates',
};

export const DEFAULT_ROUTE = MY_ROUTE.HOME;
