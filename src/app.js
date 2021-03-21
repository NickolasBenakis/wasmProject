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
import Image from './image';
import CompressButton from './compress';
import WasmLoader from './loader.js';
import './styles.css';

// const WASM = new WasmLoader();
// console.log(WASM);

const App = () => {
  const beforeRef = useRef(null);
  const afterRef = useRef(null);

  const [state, setState] = useState({
    before: undefined,
    beforeSize: undefined,
    beforeResolution: undefined,
    after: undefined,
    afterSize: undefined,
    afterResolution: undefined,
  });

  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      setState((prevState) => ({
        ...prevState,
        before: event.target.result,
        beforeSize: event.loaded,
      }));
    };
  };

  const handleCompression = () => {
    const canvas = document.createElement('canvas');
    const MAX_WIDTH = window.innerWidth;
    const scaleSize = MAX_WIDTH / beforeRef.current.width;

    canvas.width = MAX_WIDTH;
    canvas.height = beforeRef.current.height * scaleSize;

    const ctx = canvas.getContext('2d');

    ctx.drawImage(beforeRef.current, 0, 0, canvas.width, canvas.height);

    const srcEncoded = ctx.canvas.toDataURL(beforeRef.current, 'image/png');
    console.log(ctx.canvas);
    setState((prevState) => ({ ...prevState, after: srcEncoded }));
  };

  return (
    <label className="container">
      <span className="title">Compress image</span>
      <form aria-label="form">
        <input
          name="upload"
          id="upload"
          type="file"
          accept=".jpeg, .jpg, .png"
          onChange={handleSubmit}
        />
        <div className="compare">
          {state.before ? (
            <Image
              size={state.beforeSize}
              src={state.before}
              ref={beforeRef}
              type="before"
            >
              <CompressButton onClick={handleCompression} />
            </Image>
          ) : null}
          {state.after ? (
            <Image src={state.after} ref={afterRef} type="after" />
          ) : null}
        </div>
      </form>
    </label>
  );
};

export default App;
