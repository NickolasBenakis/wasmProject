import React from 'react';

const Slider = ({ onChange }) => {
  return (
    <div className="slideContainer">
      <input
        type="range"
        min="1"
        max="100"
        defaultValue="10"
        className="slider"
        onChange={onChange}
      />
    </div>
  );
};

export default Slider;
