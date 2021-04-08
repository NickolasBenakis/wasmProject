import React from 'react';

const isCompressed = (type) => type === 'compressed';

const Image = ({ type, src, ...props }) => {
  return (
    <img
      id={type}
      src={src}
      className={`preview ${isCompressed(type) ? 'compressed' : null}`}
      {...props}
    />
  );
};

export default Image;
