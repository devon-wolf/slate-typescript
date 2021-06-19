import React, { useMemo } from 'react';
import './EditorWrapper.css';
import TextEditor from './TextEditor';
import FormatBar from '../components/FormatBar';

import { createEditor, BaseEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import DefaultElement from '../elements/DefaultElement';
import CodeBlock from '../elements/CodeBlock';
import Leaf from '../elements/Leaf';
import { toggleBlockType, toggleFormat } from '../services/toggles';

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

const EditorWrapper = () => {
	const editor = useMemo(() => withReact(createEditor()), []);
	return (
		<div className="editorWrapper">

			<aside className="leftSidebar">
				<FormatBar editor={editor}/>
			</aside>

			<TextEditor editor={editor}/>

			<aside className="rightSidebar"></aside>

		</div>
	)
}

export default EditorWrapper;
