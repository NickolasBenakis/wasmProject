import React from 'react';

const Uploader = ({onChange}) => {
  return (
    <div className="custom-upload">
      <span>Upload</span>
      <input
        title="hello"
        name="upload"
        className="custom-file-input"
        id="upload"
        type="file"
        accept=".jpeg, .jpg, .png"
        onChange={onChange}
      />
    </div>
  );
};

export default Uploader;
