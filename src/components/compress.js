import React from 'react';

const Compress = ({ onChange }) => {
  return (
    <div className="compress">
      <label htmlFor="compression">Choose compression:</label>
      <select
        name="compression"
        className="compression-list"
        id="compression"
        onChange={onChange}
      >
        <option value="png">png</option>
        <option value="jpeg">jpeg</option>
        <option value="webp">webp</option>
      </select>
    </div>
  );
};

export default Compress;
