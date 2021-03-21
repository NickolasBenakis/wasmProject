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

import React, { useState, useRef, useEffect } from 'react';
// import Image from './image';
import Canvas from './components/canvas';
import Compress from './components/compress';
import Slider from './components/slider';
import WasmLoader from './loader.js';
import './styles.css';

// const WASM = new WasmLoader();
// console.log(WASM);

const App = () => {
  const originalRef = useRef(null);
  const compressedRef = useRef(null);
  const [state, setState] = useState({
    original: undefined,
    compressed: undefined,
    originalSize: 0,
    compressedSize: 0,
    compressionLevel: 0.92,
  });

  const handleCompressionLevel = (e) => {
    setState((prevState) => ({
      ...prevState,
      compressionLevel: parseInt(e.target.value),
    }));
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
        setState((prevState) => ({
          ...prevState,
          original: event.target.result,
          originalSize: event.total,
        }));
      };
    };
  };

  const handleCompression = (changeEvent) => {
    const compressOption = changeEvent.target.value;
    const ctx = originalRef.current.getContext('2d');
    const srcEncoded = ctx.canvas.toDataURL(
      `image/${compressOption}`,
      state.compressionLevel / 100
    );

    const image = new Image();
    image.src = srcEncoded;
    image.onload = (e) => {
      const ctx = compressedRef.current.getContext('2d');
      ctx.drawImage(image, 0, 0);

      const base64str = btoa(srcEncoded);
      const decoded = atob(base64str);

      setState((prevState) => ({
        ...prevState,
        compressed: srcEncoded,
        compressedSize: decoded.length,
      }));
    };
  };

  console.log(state);

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
        </section>
      ) : null}
    </>
  );
};

export default App;
