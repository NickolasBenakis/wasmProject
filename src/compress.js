import React from 'react';

const Compress = React.forwardRef(({ onClick }, ref) => {
  return <button onClick={onClick}>Compress</button>;
});

export default Compress;
