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

import React, {useEffect} from 'react';
import Image from './components/image';
import Controls from './components/controls';
import WasmLoader from './loader.js';
import useImageStore from './state/image';
import shallow from 'zustand/shallow';

import './styles.css';

const selectState = (state) => ({
  ...state,
});

const App = () => {
  const {
    setField,
    setFields,
    compressImage,
    uploadImage,
    ...state
  } = useImageStore(selectState, shallow);

  useEffect(() => {
    if (state.originalFile) {
      compressImage();
    }
  }, [state.type, state.compressionLevel]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadImage(file);
  };

  return (
    <>
      <label className="container">
        <span className="title">Upload an image to compress it</span>
        <input
          name="upload"
          className="custom-file-input"
          id="upload"
          type="file"
          accept=".jpeg, .jpg, .png"
          onChange={handleUpload}
        />
      </label>
      {state.compressedURL ? (
        <div className="download">
          <a
            target="_blank"
            href={state.compressedURL}
            download={state.compressedFile.name}
          >
            Download compressed file
          </a>
        </div>
      ) : null}
      <table className={state.originalURL ? 'compress show' : 'compress hide'}>
        <tbody>
          <tr>
            <td>original</td>
            <td>compressed</td>
          </tr>
          <tr>
            <td>
              <Image type="original" />
            </td>
            <td>
              <Image type="compressed" />
            </td>
          </tr>
        </tbody>
      </table>
      {state.originalURL ? <Controls /> : null}
    </>
  );
};

export default App;
