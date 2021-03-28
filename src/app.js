// import WasmLoader from './loader.js';

// window.addEventListener('load', () => {
//   console.log('loaded!');

//   const ML = new WasmLoader();
//   ML.wasm('/build/optimized.wasm').then((instance) => {
//     const { minusOne, fizzBuzz, __getString } = instance;

//     // document.write(minusOne(422));
//     // document.write(__getString(fizzBuzz(3)));
//   });

//   const submitHandler = () => {
//     const file = document.querySelector('#upload').files[0];

//     if (!file) return;
//   };

//   const button = document.querySelector('#submit');
//   button.addEventListener('click', submitHandler);
// });

import React, { useEffect } from 'react';
import Canvas from './components/canvas';
import EncoderList from './components/encoderList';
import Slider from './components/slider';
import WasmLoader from './loader.js';
import {
  getDataUrlFromFile,
  loadImage,
  drawImageInCanvas,
  handleScale,
} from './util';
import useImageStore from './state/image';
import './styles.css';
import Ratio from './components/ratio';
import shallow from 'zustand/shallow';

const selectState = (state) => ({
  ...state,
});

const App = () => {
  const { setField, setFields, compressImage, ...state } = useImageStore(
    selectState,
    shallow
  );

  useEffect(() => {
    compressImage();
  }, [state.type, state.compressionLevel]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = await getDataUrlFromFile(file);
    const image = await loadImage(fileUrl);

    drawImageInCanvas(image, 'original');
    setFields({
      originalURL: fileUrl,
      originalSize: file.size,
    });
  };

  return (
    <>
      <label className="container">
        <span className="title">Compress image</span>
        <input
          name="upload"
          id="upload"
          type="file"
          accept=".jpeg, .jpg, .png"
          onChange={handleUpload}
        />
      </label>
      <section className="compare">
        <Canvas type="original" />
        <Canvas type="compressed" />
      </section>
      {state.originalURL ? (
        <section className="controls">
          <EncoderList />
          <Slider />
          <Ratio />
        </section>
      ) : null}
    </>
  );
};

export default App;
