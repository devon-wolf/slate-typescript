import React, { useEffect, useMemo, useState } from 'react'
import { createEditor, BaseEditor } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'

// some type customization from SlateJS docs to get around typing quirkiness

type CustomText = { text : string }

type CustomElement = {
	type : 'paragraph',
	children: CustomText[]
}

declare module 'slate' {
	interface CustomTypes {
		Editor : BaseEditor & ReactEditor,
		Element : CustomElement,
		Text : CustomText
	}
}

// the actual component
const TextEditor = () => {
	const editor = useMemo(() => withReact(createEditor()), []);
	const [value, setValue] = useState([
		{
		  type: 'paragraph',
		  children: [{ text: 'A line of text in a paragraph.' }],
		},
	  ]);

	return (
		<Slate
			editor={editor}
			value={value}
			onChange={newValue => setValue(newValue)}
		>
			<Editable />
		</Slate>
	)
}

export default TextEditor
