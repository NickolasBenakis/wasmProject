import React from 'react';
import useImageStore from '../state/image';

const selectState = (state) => state.ratio;

const Ratio = () => {
  const ratio = useImageStore(selectState);

  if (!ratio) return null;

  return (
    <div className="ratio">
      <span>{ratio}</span>
      <span>{ratio < 100 ? ' smaller' : ' bigger'}</span>
    </div>
  );
};

export default Ratio;
