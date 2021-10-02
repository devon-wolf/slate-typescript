import React from 'react';
import { DefaultProps } from '../types';

const DefaultElement = ({
  attributes,
  children,
}: DefaultProps): JSX.Element => {
  return <p {...attributes}>{children}</p>;
};

export default DefaultElement;
