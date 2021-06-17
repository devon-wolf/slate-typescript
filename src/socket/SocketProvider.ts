import { createContext } from 'react';
import io from 'socket.io-client';

const url = 'http://localhost:7890';

export const socket = io(url, {
	withCredentials: true,
	extraHeaders: {
		"document-events": "a document event"
	}
});

export const SocketContext = createContext(socket);