import React from 'react';

const Canvas = ({type, ...props}) => {
  return <canvas id={type} className="preview" {...props} />;
};

export default Canvas;
