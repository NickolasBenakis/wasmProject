import React, {useCallback} from 'react';
import useImageStore from '../state/image';
import debounce from 'lodash/debounce';
import shallow from 'zustand/shallow';

const selectState = (state) => ({
  setField: state.setField,
  quality: state.quality,
});

const Slider = () => {
  const {setField, quality} = useImageStore(selectState, shallow);

  const updateCompressionLevel = useCallback(
    (e) => {
      setField('quality', parseInt(e.target.value));
    },
    [setField]
  );

  return (
    <div className="slideContainer">
      <div>quality level {` ${quality}/100`}</div>
      <input
        type="range"
        min="1"
        max="100"
        defaultValue="92"
        className="slider"
        onChange={debounce(updateCompressionLevel, 300)}
      />
    </div>
  );
};

export default Slider;
