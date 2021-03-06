import { Descendant } from 'slate';

export const setLocalDocument = (value: Descendant[]): void => {
  localStorage.setItem('document', JSON.stringify(value));
};

export const getLocalDocument = (): Descendant[] | null => {
  const stringyDocument = localStorage.getItem('document');
  if (stringyDocument) return JSON.parse(stringyDocument);
  else return null;
};
