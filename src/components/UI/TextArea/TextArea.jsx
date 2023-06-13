import React, { useState } from 'react';

const TextArea = ({ value, onChange, placeholder }) => {
  const [rows, setRows] = useState(1);

  const handleChange = (e) => {
    const textareaLineHeight = 24; // Update this value based on your textarea's line height
    const previousRows = e.target.rows;
    e.target.rows = 1; // Reset the number of rows to 1 to calculate the new height

    const currentRows = Math.floor((e.target.scrollHeight - 8) / textareaLineHeight); // 8 is the padding/margin value

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    setRows(currentRows);
    onChange(e);
  };

  return (
    <textarea
      value={value}
      onChange={handleChange}
      style={{ resize: 'none' }}
      rows={rows}
      placeholder={placeholder}
    />
  );
};

export default TextArea;
