import React, { useMemo, useState, useCallback, useContext, useEffect } from 'react';
import './EditorWrapper.css';
import { createEditor, BaseEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import DefaultElement from '../elements/DefaultElement';
import CodeBlock from '../elements/CodeBlock';
import Leaf from '../elements/Leaf';
import { toggleBlockType, toggleFormat } from '../services/toggles';
import FormatBar from '../components/FormatBar';
import { SocketContext } from '../socket/SocketProvider';
import { CustomEditor } from './EditorWrapper';

type EditorProps = {
	editor : CustomEditor
};

const TextEditor = ({ editor } : EditorProps) => {
	const socket = useContext(SocketContext);
	const [value, setValue] = useState<Descendant[]>([
		{
			type: 'paragraph',
			children: [{ text: 'A line of text in a paragraph' }]
		}
	]);

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
	const handleKeyDown = (e : React.KeyboardEvent, editor : ReactEditor) => {
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

	const handleDocumentChange = (documentValue : Descendant[]) => {
		setValue(documentValue);
	};

	const handleOutgoingChange = (documentValue : Descendant[]) => {
		handleDocumentChange(documentValue);
		socket.emit('client change', documentValue);
	};

	useEffect(() => {
		socket.on('doc status', handleDocumentChange);
		socket.on('socket change', handleDocumentChange);
		return () => {
			socket.off('socket change', handleDocumentChange);
		}
	}, [socket]);

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
