import { Descendant } from 'slate';

export const setLocalDocument = (value : Descendant[]) => {
	localStorage.setItem('document', JSON.stringify(value));
}

export const getLocalDocument = () => {
	const stringyDocument = localStorage.getItem('document');
	if (stringyDocument) return JSON.parse(stringyDocument);
	else return null;
}