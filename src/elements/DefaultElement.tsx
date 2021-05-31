type DefaultProps = {
	attributes : any,
	children : Array<string>
}

const DefaultElement = ({ attributes, children } : DefaultProps) => {
	return <p {...attributes}>{children}</p>;
}

export default DefaultElement
