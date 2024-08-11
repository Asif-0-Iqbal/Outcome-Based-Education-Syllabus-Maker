import React from 'react';
import { Quill } from 'react-quill';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const Parchment = Quill.import('parchment');

// Create a custom class for list styles
const ListStyle = new Parchment.Attributor.Class('list', 'ql-list', {
  scope: Parchment.Scope.BLOCK,
  whitelist: ['ordered', 'bullet', 'none'] // Define allowed list styles
});

// Create a custom button component
const AbcBullet = () => {
  const handleChangeList = (listStyle) => {
    const quill = window.quill; // Assuming Quill is exposed globally
    const format = listStyle === 'none' ? false : listStyle;
    quill.format('list', format);
  };

  return (
    <select onChange={(e) => handleChangeList(e.target.value)}>
      <option value="none">None</option>
      <option value="ordered">Numbered (a, b, c, ...)</option>
      <option value="bullet">Bullet</option>
    </select>
  );
};

export default AbcBullet;
