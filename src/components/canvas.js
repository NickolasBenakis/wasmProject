import React, { useState, useEffect, useRef } from 'react';

const Canvas = React.forwardRef(
  ({ src = '', size, type, children }, canvasRef) => {
    return <canvas id={type} ref={canvasRef} width="600" height="600" />;
  }
);

export default Canvas;
