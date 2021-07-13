import React, { useCallback, useContext, useEffect } from 'react';
import '../pages/DocumentPage.css';
import { Descendant } from 'slate';
import { Slate, Editable, ReactEditor } from 'slate-react';
import DefaultElement from '../elements/DefaultElement';
import CodeBlock from '../elements/CodeBlock';
import Leaf from '../elements/Leaf';
import { toggleBlockType, toggleFormat } from '../services/toggles';
import { SocketContext } from '../socket/SocketProvider';
import { CustomEditor } from '../pages/DocumentPage';
import useEditor from '../hooks/useEditor';

type EditorProps = {
	editor: CustomEditor
	paramId: string
};

const TextEditor = ({ editor, paramId }: EditorProps) => {
	const socket = useContext(SocketContext);
	const { value, setValue } = useEditor();

	const renderElement = useCallback(props => {
		switch (props.element.type) {
			case 'code':
				return <CodeBlock {...props} />
			default:
				return <DefaultElement {...props} />
		};
	}, []);
	
	const renderLeaf = useCallback(props => {
		return <Leaf {...props} />
	}, []);

	// a better way to refactor this will be to make an object with each hotkey and the relevant callback/args
	const handleKeyDown = (e: React.KeyboardEvent, editor: ReactEditor) => {
		if(!e.ctrlKey) return;
		
		const hotKeys = ['`', 'b', 'i', 'u', '-'];
		if (!hotKeys.some(key => key === e.key)) return;
		
		e.preventDefault();

		switch (e.key) {
			case '`': {
				toggleBlockType(editor, 'code');
				break;
			}

			case 'b': {
				toggleFormat(editor, 'bold');
				break;
			}

			case 'i': {
				toggleFormat(editor, 'italic');
				break;
			}

			case 'u': {
				toggleFormat(editor, 'underline');
				break;
			}

			case '-': {
				toggleFormat(editor, 'strikethrough');
				break;
			}
		}
	};

	const handleDocumentChange = useCallback((update: { id: string, newValue: Descendant[] }) => {
		const { id, newValue } = update;
		if(id !== paramId) return;
		setValue(newValue);
	}, [setValue, paramId]);

	const handleOutgoingChange = (newValue: Descendant[]) => {
		handleDocumentChange({ id: paramId, newValue });
		socket.emit('client change', { id: paramId, newValue });
	};

	const handleDocumentFetch = useCallback(() => {
		socket.emit('fetch request', paramId);
	}, [socket, paramId]);

	useEffect(() => {
		socket.on('connection', handleDocumentFetch);
		socket.on('socket response', handleDocumentChange);
		socket.on('socket change', handleDocumentChange);
		return () => {
			socket.off('connection', handleDocumentFetch);
			socket.off('socket response', handleDocumentChange);
			socket.off('socket change', handleDocumentChange);
		}
	}, [handleDocumentChange, handleDocumentFetch, socket]);

	return (
		<Slate
			editor={editor}
			value={value}
			onChange={newValue => {
				handleOutgoingChange(newValue);
			}}
		>
				<Editable
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					onKeyDown={e => handleKeyDown(e, editor)}
					className="editor"
				/>
		</Slate>
	);
};

export default TextEditor;
