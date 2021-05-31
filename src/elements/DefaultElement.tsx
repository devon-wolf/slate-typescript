import { DefaultProps } from "../types";

const DefaultElement = ({ attributes, children } : DefaultProps) => {
	return <p {...attributes}>{children}</p>;
}

export default DefaultElement
