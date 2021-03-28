import React from 'react';
import useImageStore from '../state/image';

const selectState = (state) => state.setField;

const EncodersList = () => {
  const setField = useImageStore(selectState);

  const selectEncoder = (e) => {
    setField('type', e.target.value);
  };

  return (
    <div className="compress">
      <label htmlFor="compression">Choose encoder:</label>
      <a
        target="_blank"
        href="https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types"
      >
        Check available formats for browser
      </a>
      <select
        name="compression"
        className="compression-list"
        id="compression"
        onChange={selectEncoder}
        defaultValue="jpeg"
      >
        <option value="jpeg">jpeg</option>
        <option value="png">png</option>
        <option value="webp">webp</option>
      </select>
    </div>
  );
};

export default EncodersList;
