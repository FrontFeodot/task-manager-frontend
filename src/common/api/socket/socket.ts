import Cookies from 'js-cookie';
import { io, Socket } from 'socket.io-client';

import { AUTH_TOKEN } from '@common/utils/cookies';

import boardListeners from './socketListeners/boardListeners';
import tasksListeners from './socketListeners/taskEvents';

const BASE_URL = import.meta.env.VITE_BASE_URL;

let socketInstance: Socket | null = null;

export const getSocket = () => {
  if (!socketInstance) {
    const token = Cookies.get(AUTH_TOKEN);

    socketInstance = io(BASE_URL, {
      transports: ['websocket'],
      autoConnect: false,
      forceNew: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 10000,
      randomizationFactor: 0.5,
      auth: { token },
    });
  }
  return socketInstance;
};

export const connectSocket = () => {
  const socket = getSocket();
  if (!socket.connected) {
    socket.connect();
    boardListeners();
    tasksListeners();
  }
};

export const disconnectSocket = () => {
  const socket = getSocket();

  if (socket.connected) {
    socket.disconnect();
  }
};
