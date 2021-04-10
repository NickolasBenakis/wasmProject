import React from 'react';
import useImageStore from '../state/image';
import shallow from 'zustand/shallow';

const selectState = (state) => ({
  setField: state.setField,
  useWebWorker: state.useWebWorker,
});

const Checkbox = () => {
  const {setField, useWebWorker} = useImageStore(selectState, shallow);

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        value={useWebWorker}
        onChange={() => setField(!useWebWorker)}
        name="webworker"
      />
      <label htmlFor="webworker">use webworker</label>
    </div>
  );
};

export default Checkbox;
