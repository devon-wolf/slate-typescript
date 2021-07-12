import { useState } from 'react';
import { Descendant } from 'slate';

const useEditor = () => {
	const [value, setValue] = useState<Descendant[]>([
		{
			type: 'paragraph',
			children: [{ text: 'A line of text in a paragraph' }]
		}
	]);

	return { value, setValue };
};

export default useEditor;