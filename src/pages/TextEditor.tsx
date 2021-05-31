import React, { useMemo, useState, useCallback } from 'react'
import { createEditor, BaseEditor, Descendant } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import DefaultElement from '../elements/DefaultElement';
import CodeBlock from '../elements/CodeBlock';
import Leaf from '../elements/Leaf';
import { getLocalDocument, setLocalDocument } from '../services/local-storage';
// import { toggleBlockType, toggleFormat } from '../services/toggles';

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
}
//////////////////////////////////////////////////////

// Text Editor Component

const TextEditor = () => {
	const editor = useMemo(() => withReact(createEditor()), []);
	const [value, setValue] = useState<Descendant[]>(getLocalDocument() || [
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

	const handleKeyDown = (e : React.KeyboardEvent, editor : ReactEditor) => {
		if (!e.ctrlKey) return;

		switch (e.key) {
			case '`': {
				e.preventDefault()
				// toggleBlockType(editor, 'code');
				console.log('`');
				break;
			}

			case 'b': {
				e.preventDefault();
				// toggleFormat(editor, 'bold');
				console.log('b');
				break;
			}

			case 'i': {
				e.preventDefault();
				// toggleFormat(editor, 'italic');
				console.log('i');
				break;
			}
		}
	};

	return (
		<Slate
			editor={editor}
			value={value}
			onChange={newValue => {
				setValue(newValue);
				setLocalDocument(newValue);
			}}
		>
			<Editable
				renderElement={renderElement}
				renderLeaf={renderLeaf}
				onKeyDown={e => handleKeyDown(e, editor)}
			/>
		</Slate>
	);
}

export default TextEditor
