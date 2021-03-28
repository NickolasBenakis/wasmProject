import React from 'react';

const Canvas = ({ type, ...props }) => {
  return <canvas id={type} width="400" height="400" {...props} />;
};

export default Canvas;
