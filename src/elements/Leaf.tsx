import React from 'react';

type LeafProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes: any;
  children: Array<string>;
  leaf: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
  };
};

const Leaf = ({ attributes, children, leaf }: LeafProps): JSX.Element => {
  const checkDecoration = ({ underline, strikethrough }: LeafProps['leaf']) => {
    if (underline && strikethrough) return 'underline line-through';
    if (underline) return 'underline';
    if (strikethrough) return 'line-through';
    else return 'none';
  };

  return (
    <span
      {...attributes}
      style={{
        fontWeight: leaf.bold ? 'bold' : 'normal',
        fontStyle: leaf.italic ? 'italic' : 'normal',
        textDecoration: checkDecoration(leaf),
      }}
    >
      {children}
    </span>
  );
};

export default Leaf;
