import React, { useState, useEffect, useRef } from 'react';

const Canvas = React.forwardRef(
  ({ src = '', size, type, children }, canvasRef) => {
    return <canvas id={type} ref={canvasRef} width="400" height="400" />;
  }
);

export default Canvas;
