import React from 'react';
import Uploader from '../components/upload';
import useImageStore from '../state/image';
import TargetOptions from '../components/targetOptions';
import shallow from 'zustand/shallow';

const selectState = (state) => ({
  uploadImage: state.uploadImage,
  setField: state.setField,
});

const UploadPage = () => {
  const {uploadImage, setField} = useImageStore(selectState, shallow);

  const handleUpload = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadImage(file);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="upload-page">
      <label className="container">
        <span className="title">Upload an image to compress it</span>
        <Uploader onChange={handleUpload} />
      </label>
      <TargetOptions setField={setField} />
    </div>
  );
};

export default UploadPage;
