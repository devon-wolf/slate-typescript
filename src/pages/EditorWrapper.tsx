import React, { useMemo, useContext } from 'react';
import { SocketContext } from '../socket/SocketProvider';
import './EditorWrapper.css';
import TextEditor from './TextEditor';
import FormatBar from '../components/FormatBar';
import { createEditor, BaseEditor } from 'slate';
import { withReact, ReactEditor } from 'slate-react';

// custom types required for slate to work
export type CustomEditor = BaseEditor & ReactEditor;

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

////////////////////////////////

// container for editor and sidebars
const EditorWrapper = () => {
	const editor = useMemo(() => withReact(createEditor()), []);
	const socket = useContext(SocketContext);

	return (
		<div className="editorWrapper">

			<aside className="leftSidebar">
				<FormatBar editor={editor}/>
			</aside>

			<TextEditor editor={editor}/>

			<aside className="rightSidebar">
				<button
					onClick={() => socket.emit('new doc', 'fake title')}
				>Save document</button>
			</aside>

		</div>
	)
}

export default EditorWrapper;
