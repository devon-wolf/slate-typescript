import { ReactEditor } from 'slate-react';

export type DefaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes: any;
  children: Array<string>;
};

export type FormatBarProps = {
  editor: ReactEditor;
};

export type FormatString = 'bold' | 'italic' | 'underline' | 'strikethrough';

export type TypeString = 'paragraph' | 'code';
