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

const CompressionPage = () => {
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
    clearState,
    ...state
  } = useImageStore(selectState, shallow);

  useEffect(() => {
    if (state[getTarget()].inputUrl) {
      compressImage();
    }
  }, [type, quality, useWebWorker]);

  useEffect(async () => {
    await createImage(state[getTarget()].inputUrl, 'original');
  }, []);

  return (
    <>
      {state.mainThread.outputUrl || state.webWorker.outputUrl ? (
        <CompressionDetails
          outputFileName={state[getTarget()].outputFile.name}
          outputSize={state[getTarget()].outputSize}
          ratio={ratio}
          outputUrl={state[getTarget()].outputUrl}
          time={state[getTarget()].time}
        />
      ) : null}
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
      <Controls />
    </>
  );
};

export default CompressionPage;
