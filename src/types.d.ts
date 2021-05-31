import { ReactEditor } from 'slate-react';

export type DefaultProps = {
	attributes : any,
	children : Array<string>
}

export type FormatBarProps = {
	editor : ReactEditor
};

export type FormatString = 'bold' | 'italic' | 'underline' | 'strikethrough';

export type TypeString = 'paragraph' | 'code';