import React from 'react';
import './EditorWrapper.css';
import TextEditor from './TextEditor';

const EditorWrapper = () => {
	return (
		<div className="editorWrapper">
			<aside className="leftSidebar">sidebar 1</aside>
			<TextEditor />
			<aside className="rightSidebar">sidebar 2</aside>
		</div>
	)
}

export default EditorWrapper;
