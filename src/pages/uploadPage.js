import React from 'react';
import Uploader from '../components/upload';
import useImageStore from '../state/image';

const selectState = (state) => state.uploadImage;

const UploadPage = () => {
  const uploadImage = useImageStore(selectState);

  const handleUpload = async (e) => {
    e.preventDefault();
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
    </div>
  );
};

export default UploadPage;
