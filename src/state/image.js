import create from 'zustand';
import {devtools} from 'zustand/middleware';
import imageCompression from '../compression/index.js';
import {createImage} from '../util';

const executionTarget = Object.freeze({
  mainThread: 'mainThread',
  webWorker: 'webWorker',
  wasm: 'wasm',
});

const imageInitialState = {
  progress: 0,
  inputSize: null,
  outputSize: null,
  inputUrl: null,
  outputUrl: null,
  inputFile: null,
  outputFile: null,
  time: 0,
};

const initialState = {
  uploaded: false,
  quality: 92,
  ratio: 0,
  useWebWorker: false,
  type: 'jpeg',
  webWorker: {
    ...imageInitialState,
  },
  mainThread: {
    ...imageInitialState,
  },
};

const calculateRatio = (output, input) => {
  const diff = output / input;
  return (1 - diff) * 100;
};

const store = (set, get) => ({
  ...initialState,
  clearState: () => {
    const uploadInput = document.getElementById('upload');
    const originalImage = document.getElementById('original');
    const compressedImage = document.getElementById('compressed');
    originalImage.src = '';
    compressedImage.src = '';

    if (uploadInput) {
      uploadInput.value = '';
    }
    set((prevState) => ({
      ...prevState,
      ...initialState,
    }));
  },
  getTarget: () => {
    const target = get().useWebWorker
      ? executionTarget.webWorker
      : executionTarget.mainThread;
    return target;
  },
  setField: (key, value) => {
    if (!key in get()) {
      throw new Error('undefined key in store');
    }
    set((prevState) => ({...prevState, [key]: value}));
  },
  setFields: (newState) => {
    set((prevState) => ({...prevState, ...newState}));
  },
  onProgress: (p) => {
    const target = get().useWebWorker
      ? executionTarget.webWorker
      : executionTarget.mainThread;
    set((prevState) => ({
      ...prevState,
      [target]: {
        ...prevState[target],
        progress: p,
      },
    }));
  },
  compressImage: async () => {
    const target = get().useWebWorker
      ? executionTarget.webWorker
      : executionTarget.mainThread;

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      onProgress: () => {},
      initialQuality: get().quality / 100,
      fileType: `image/${get().type}`,
      useWebWorker: get().useWebWorker,
    };

    try {
      const t0 = performance.now();
      const output = await imageCompression(get()[target]?.inputFile, options);
      const t1 = performance.now();
      console.log('output', output);

      const url = URL.createObjectURL(output);

      await createImage(url, 'compressed');

      set((prev) => ({
        ...prev,
        ratio: calculateRatio(
          (output.size / 1024 / 1024).toFixed(2),
          get()[target]?.inputSize
        ),
        [target]: {
          ...prev[target],
          time: t1 - t0,
          outputUrl: url,
          outputFile: output,
          outputSize: (output.size / 1024 / 1024).toFixed(2),
        },
      }));
    } catch (error) {
      console.warn(error);
    }
  },
  uploadImage: async (file) => {
    if (!file) return;
    console.log(file);

    const url = URL.createObjectURL(file);

    const target = get().useWebWorker
      ? executionTarget.webWorker
      : executionTarget.mainThread;
    debugger;
    set((prev) => ({
      ...prev,
      uploaded: true,
      [target]: {
        ...prev[target],
        inputUrl: url,
        inputSize: (file.size / 1024 / 1024).toFixed(2),
        inputFile: file,
      },
    }));
  },
});

export default create(devtools(store, 'imageStore'));
