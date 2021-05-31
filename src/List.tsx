import React from 'react'

type ListProps = {
	data : Array<string>
}

const List = ({ data } : ListProps) => {
	return (
		<ul>
			{data.map(item => (
				<li>{item}</li>
			))}
		</ul>
	)
}

export default List