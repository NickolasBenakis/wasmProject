import React from 'react';

const isCompressed = (type) => type === 'compressed';

const Image = ({type, src, ...props}) => {
  return (
    <img
      id={type}
      src={src}
      style={{display: 'none'}}
      className={`preview ${isCompressed(type) ? 'compressed' : undefined}`}
      {...props}
    />
  );
};

export default Image;
