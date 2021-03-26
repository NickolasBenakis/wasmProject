import React from 'react';

const Canvas = React.forwardRef(({ type, ...props }, canvasRef) => {
  return (
    <canvas id={type} ref={canvasRef} width="600" height="600" {...props} />
  );
});

export default Canvas;
