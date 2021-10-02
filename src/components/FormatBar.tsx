import React from 'react';
import { toggleBlockType, toggleFormat } from '../services/toggles';
import { FormatBarProps, FormatString, TypeString } from '../types';
import './FormatBar.css';

const FormatBar = ({ editor }: FormatBarProps): JSX.Element => {
  const handleBlockTypeToggle = (e: React.MouseEvent, type: TypeString) => {
    e.preventDefault();
    toggleBlockType(editor, type);
  };

  const handleFormatToggle = (e: React.MouseEvent, format: FormatString) => {
    e.preventDefault();
    toggleFormat(editor, format);
  };

  return (
    <div aria-label="formatting tools" className="formatBar">
      <span className="formatButtons">
        <button
          aria-label="toggle bold"
          onMouseDown={(e) => handleFormatToggle(e, 'bold')}
        >
          <i title="bold" className="fas fa-bold"></i>
        </button>

        <button
          aria-label="toggle italic"
          onMouseDown={(e) => handleFormatToggle(e, 'italic')}
        >
          <i title="italic" className="fas fa-italic"></i>
        </button>

        <button
          aria-label="toggle underline"
          onMouseDown={(e) => handleFormatToggle(e, 'underline')}
        >
          <i title="underline" className="fas fa-underline"></i>
        </button>

        <button
          aria-label="toggle strikethrough"
          onMouseDown={(e) => handleFormatToggle(e, 'strikethrough')}
        >
          <i title="strikethrough" className="fas fa-strikethrough"></i>
        </button>
      </span>
      <hr />
      <span className="blockTypeButtons">
        <button
          aria-label="toggle code block"
          onMouseDown={(e) => handleBlockTypeToggle(e, 'code')}
        >
          <i title="code" className="fas fa-code"></i>
        </button>
      </span>
    </div>
  );
};

export default FormatBar;
