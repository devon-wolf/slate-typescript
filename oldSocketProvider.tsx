import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Descendant } from 'slate';

type SocketProps = {
	children : Node
}

const SocketContext = createContext([]);

const SocketProvider = ({ children } : SocketProps) => {
	const [editorValue, setEditorValue] = useState<Descendant[]>([]);

	const serverURL = 'http://localhost:7890'
	const socket = io(serverURL, {
		withCredentials: true,
		extraHeaders: {
			"document-events": "a document event"
		}
	});

	const useSocket = () => {
		socket.on('document event', newValue => {
			setEditorValue(newValue);
		});
	
		useEffect(() => {
			socket.emit('document event', editorValue);
		}, [editorValue])
	}

	const state = { useSocket }

	return (
		<SocketContext.Provider value={state}>{children}</SocketContext.Provider>
	);
}

export default SocketProvider;