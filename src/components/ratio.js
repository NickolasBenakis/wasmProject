import React from 'react';

const Ratio = ({ percentage = 0 }) => {
  return (
    <div className="ratio">
      {!!percentage && percentage}
      {!!percentage && <span>{percentage < 100 ? ' smaller' : ' bigger'}</span>}
    </div>
  );
};

export default Ratio;
