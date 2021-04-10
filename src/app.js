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
    useWebWorker,
    quality,
    ratio,
    type,
    getTarget,
    ...state
  } = useImageStore(selectState, shallow);

  useEffect(() => {
    if (state[getTarget()].inputUrl) {
      compressImage();
    }
  }, [type, quality, useWebWorker]);

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
      {state.mainThread.outputUrl || state.webWorker.outputUrl ? (
        <table className="info">
          <tbody>
            <tr>
              <td>compressed info : </td>
              <td>
                {`Image size ${
                  state[getTarget()].outputSize
                } Mb, quality ${quality}/100, ${
                  ratio === 100 ? `~100` : ratio
                } ${ratio > 100 ? 'larger' : 'smaller'} %`}
              </td>
            </tr>
            <tr>
              <td>download : </td>
              <td>
                {' '}
                <a
                  target="_blank"
                  href={state[getTarget()].outputUrl}
                  download={state[getTarget()].outputFile.name}
                >
                  Download compressed file
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      ) : null}
      {/* //   <div className="download">
      //     <a
      //       target="_blank"
      //       href={state[getTarget()].outputUrl}
      //       download={state[getTarget()].outputFile.name}
      //     >
      //       Download compressed file
      //     </a>
      //   </div>
      // ) : null} */}
      <table
        className={
          state[getTarget()].inputUrl ? 'compress show' : 'compress hide'
        }
      >
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
      {state[getTarget()].inputUrl ? <Controls /> : null}
    </>
  );
};

export default App;
