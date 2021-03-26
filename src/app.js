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

import React, { useState, useRef } from 'react';
import Canvas from './components/canvas';
import Compress from './components/compress';
import Slider from './components/slider';
import WasmLoader from './loader.js';
import { dataURLtoBlob } from './util';
import useImageStore from './state/image';
import './styles.css';
import Ratio from './components/ratio';

const App = () => {
  const originalRef = useRef(null);
  const compressedRef = useRef(null);
  const { setField, setFields, ...state } = useImageStore();

  const handleCompressionLevel = (e) => {
    setField('compressionLevel', parseInt(e.target.value));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;
      image.onload = () => {
        const ctx = originalRef.current.getContext('2d');
        ctx.drawImage(
          image,
          0,
          0,
          originalRef.current.width,
          originalRef.current.height
        );

        setFields({
          original: event.target.result,
          originalSize: event.total,
        });
      };
    };
  };

  const handleCompression = (changeEvent) => {
    const compressOption = changeEvent.target.value;
    originalRef.current.toBlob(
      (blob) => {
        const image = new Image();
        const url = URL.createObjectURL(blob);
        image.src = url;
        image.onload = (e) => {
          const ctx = compressedRef.current.getContext('2d');
          ctx.drawImage(image, 0, 0);

          const size = blob.size;
          const ratio = 100 - (size / state.originalSize) * 100;

          setFields({
            compressed: url,
            compressedSize: size,
            ratio,
          });
        };
      },
      `image/${compressOption}`,
      state.compressionLevel / 100
    );
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
        <Canvas type="original" ref={originalRef} />
        <Canvas type="compressed" ref={compressedRef} />
      </section>
      {state.original ? (
        <section className="controls">
          <Compress onChange={handleCompression} />
          {/* <ScaleCanvas ref={originalRef} /> */}
          <Slider onChange={handleCompressionLevel} />
          <Ratio percentage={state.ratio} />
        </section>
      ) : null}
    </>
  );
};

export default App;
