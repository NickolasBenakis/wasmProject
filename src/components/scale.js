import React from 'react';

const Scale = React.forwardRef(({ src }, canvasRef) => {
  const onMinus = () => {
    const image = new Image();
    image.src = src;
    image.onload = () => {};
    ref.current.width *= 0.6;
    ref.current.height *= 0.6;
  };

  const onPlus = () => {
    ref.current.width *= 1.2;
    ref.current.height *= 1.2;
  };

  return (
    <div>
      <button className="scale minus" onClick={onMinus}>
        -
      </button>
      <button className="scale plus" onClick={onPlus}>
        +
      </button>
    </div>
  );
});

export default Scale;
