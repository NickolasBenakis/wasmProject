import React, {useEffect} from 'react';
import {createImage} from '../util';
import useImageStore from '../state/image';
import Image from '../components/image';
import Controls from '../components/controls';
import shallow from 'zustand/shallow';
import CompressionDetails from '../components/compressionDetails';

const selectState = (state) => ({
  ...state,
});

const textSizeHeadline = (size) => (size == null ? '' : size + ' Mb');

const CompressionPage = () => {
  const {
    compressImage,
    uploadImage,
    useWebWorker,
    useWASM,
    quality,
    ratio,
    type,
    getTarget,
    clearState,
    ...state
  } = useImageStore(selectState, shallow);

  useEffect(() => {
    if (state[getTarget()].inputUrl) {
      compressImage();
    }
  }, [type, quality, useWebWorker, useWASM]);

  useEffect(async () => {
    await createImage(state[getTarget()].inputUrl, 'original');
  }, []);

  return (
    <>
      <CompressionDetails
        display={
          state.mainThread.outputUrl ||
          state.webWorker.outputUrl ||
          state.wasm.outputUrl
        }
        outputFileName={state[getTarget()].outputFile?.name || ''}
        outputSize={state[getTarget()].outputSize}
        ratio={ratio}
        outputUrl={state[getTarget()].outputUrl}
        time={state[getTarget()].time}
      />
      <table
        className={
          state[getTarget()].inputUrl ? 'compress show' : 'compress hide'
        }
      >
        <tbody>
          <tr>
            <td>{`Original ${textSizeHeadline(
              state[getTarget()].inputSize
            )}`}</td>
            <td>{`Compressed ${textSizeHeadline(
              state[getTarget()].outputSize
            )}`}</td>
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
      <Controls />
    </>
  );
};

export default CompressionPage;
