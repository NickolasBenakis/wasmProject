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

import React from 'react';
import useImageStore from './state/image';
import CompressionPage from './pages/compressionPage';
import UploadPage from './pages/uploadPage';
import './styles.css';

const selectState = (state) => state.uploaded;

const App = () => {
  const uploaded = useImageStore(selectState);

  if (uploaded) {
    return <CompressionPage />;
  }

  return <UploadPage />;
};

export default App;
