import React, {useCallback} from 'react';
import useImageStore from '../state/image';
import debounce from 'lodash/debounce';
import shallow from 'zustand/shallow';

const selectState = (state) => ({
  setField: state.setField,
});

const Slider = () => {
  const {setField} = useImageStore(selectState, shallow);

  const updateCompressionLevel = useCallback(
    (e) => {
      setField('quality', parseInt(e.target.value));
    },
    [setField]
  );

  return (
    <div className="slideContainer">
      <div>Slide compression</div>
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
