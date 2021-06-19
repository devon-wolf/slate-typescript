import React, { useMemo, useState, useCallback, useContext, useEffect } from 'react'
import { createEditor, BaseEditor, Descendant } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import DefaultElement from '../elements/DefaultElement';
import CodeBlock from '../elements/CodeBlock';
import Leaf from '../elements/Leaf';
import { toggleBlockType, toggleFormat } from '../services/toggles';
import FormatBar from '../components/FormatBar';
import { SocketContext } from '../socket/SocketProvider';

//////////////////////////////////////////////////////
// some type customization from SlateJS docs to get around typing quirkiness
type CustomEditor = BaseEditor & ReactEditor;

export type CustomText = {
	text : string,
	bold? : boolean,
	italic? : boolean,
	underline? : boolean,
	strikethrough? : boolean
};

type ParagraphElement = {
	type : 'paragraph',
	children : CustomText[]
};

type CodeElement = {
	type : 'code',
	children : CustomText[]
};

type CustomElement = ParagraphElement | CodeElement;
declare module 'slate' {
		interface CustomTypes {
		Editor : CustomEditor,
		Element : CustomElement,
		Text : CustomText
	}
};
//////////////////////////////////////////////////////

// Text Editor Component

const TextEditor = () => {
	const socket = useContext(SocketContext);

	const editor = useMemo(() => withReact(createEditor()), []);
	const [value, setValue] = useState<Descendant[]>([]);

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
			<FormatBar editor={editor} />
			<Editable
				renderElement={renderElement}
				renderLeaf={renderLeaf}
				onKeyDown={e => handleKeyDown(e, editor)}
			/>
		</Slate>
	);
};

export default TextEditor;
