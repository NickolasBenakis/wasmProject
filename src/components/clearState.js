import React from 'react';
import useImageStore from '../state/image';

const selectState = (state) => state.clearState;

const ClearState = () => {
  const clearState = useImageStore(selectState);

  return (
    <button onClick={() => clearState()} className="clear">
      clear
    </button>
  );
};

export default ClearState;
