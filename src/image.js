import React, { useState, useRef, useEffect } from 'react';

const Image = React.forwardRef(({ src, size, type, children }, ref) => {
  const [resolution, setResolution] = useState('');

  useEffect(
    function handleResolution() {
      setResolution(`${ref.current?.width} x ${ref.current?.height}`);
    },
    [src, size]
  );

  const getSize = () => {
    if (type === 'after') {
      var base64str = src.substr(22);
      console.log(base64str);
      var decoded = window.atob(base64str);
      return decoded.length;
    }
    return size;
  };

  return (
    <div>
      <img id={type} src={src} alt={type} ref={ref} />
      <div>{'Size: ' + getSize() / 1000 + ' Kb'}</div>
      {resolution ? <div>{'Resolution: ' + resolution}</div> : null}
      {children}
    </div>
  );
});

export default Image;
