import React, { useMemo, useContext } from 'react';
import { SocketContext } from '../socket/SocketProvider';
import './DocumentPage.css';
import TextEditor from '../components/TextEditor';
import FormatBar from '../components/FormatBar';
import { createEditor, BaseEditor } from 'slate';
import { withReact, ReactEditor } from 'slate-react';
import { useParams } from 'react-router-dom';

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
const DocumentPage = () => {
	const editor = useMemo(() => withReact(createEditor()), []);
	const socket = useContext(SocketContext);
	const { id } = useParams<{ id: string}>();

	return (
		<div className="editorWrapper">

			<aside className="leftSidebar">
				<FormatBar editor={editor}/>
			</aside>

			<TextEditor editor={editor} paramId={id} />

			<aside className="rightSidebar">
				
				{/* should create a new document in the db with the current document contents and update the URL params with the new ID */}
				<button
					onClick={() => socket.emit('new doc', 'fake title')}>
					Save as new document
				</button>

				{/* should update the current document, using the ID from the URL params */}
				<button
					onClick={() => socket.emit('update doc', 'fake id')}>
					Save document changes
				</button>

				{/* should delete the current document, using the ID from the URL params, then redirect all viewers to homepage */}
				<button
					onClick={() => socket.emit('delete doc', 'fake id')}>
					Delete document
				</button>

			</aside>

		</div>
	)
}

export default DocumentPage;
