import React from 'react';
import { DefaultProps } from '../types';

const CodeBlock = ({ attributes, children }: DefaultProps): JSX.Element => {
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
};

export default CodeBlock;
