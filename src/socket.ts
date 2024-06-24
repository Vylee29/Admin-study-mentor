'use client';

import { io } from 'socket.io-client';
import { PROCESS_ENV } from './+core/constants/env.constant';

export const defaultSocket = (userId: string) =>
  io(`${PROCESS_ENV.BACKEND_API_ENDPOINT}?userId=${userId}`, {
    transports: ['websocket'],
  });
