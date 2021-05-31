type DefaultProps = {
	attributes : any,
	children : Array<string>
}

const CodeBlock = ({ attributes, children } : DefaultProps) => {
	return (
		<pre {...attributes}>
			<code>{children}</code>
		</pre>
	);
}

export default CodeBlock
