import { Descendant } from 'slate';
import { io } from 'socket.io-client';

const serverURL = 'http://localhost:7890'

const socket = io(serverURL);

socket.on('document event', event => {
	// update document state
});

export const sendDocumentEvent = (value : Descendant[]) => {
	if (value)
		socket.emit('document event', value);
}