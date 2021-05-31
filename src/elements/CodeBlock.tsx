import { DefaultProps } from '../types';

const CodeBlock = ({ attributes, children } : DefaultProps) => {
	return (
		<pre {...attributes}>
			<code>{children}</code>
		</pre>
	);
}

export default CodeBlock
