import { createContext } from 'react';
import io from 'socket.io-client';

const url = process.env.REACT_APP_SOCKET_URL;

export const socket = io(url as string, {
  withCredentials: true,
  extraHeaders: {
    'document-events': 'a document event',
  },
});

export const SocketContext = createContext(socket);
