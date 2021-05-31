import { Transforms, Editor, Text } from 'slate';
// import { ReactEditor } from 'slate-react';
// import { CustomText } from '../pages/TextEditor';


// type FormatString = 'bold' | 'italic' | 'underline' | 'strikethrough';
// type TypeString = 'paragraph' | 'code';

// checks whether a format property is truthy on the node
const isFormatActive = (editor, format) => {
	const [match] = Editor.nodes(editor, {
		match: n => {
			return n[format] === true
		},
		universal: true
	});
	return !!match;
};

// checks whether a node is of a given type
const isBlockTypeActive = (editor, type) => {
	const [match] = Editor.nodes(editor, {
		match: n => n.type === type
	});
	return !!match;
};

// toggle a format property
export const toggleFormat = (editor, format) => {
	const isActive = isFormatActive(editor, format);
	Transforms.setNodes(
		editor,
		{ [format]: isActive ? null : true },
		{ match: n => Text.isText(n), split: true }
	);
};

// toggle a block type
export const toggleBlockType = (editor, type) => {
	const isActive = isBlockTypeActive(editor, type);
	Transforms.setNodes(
		editor,
		{ type: isActive ? null : type },
		{ match: n => Editor.isBlock(editor, n) }
	);
};