import create from 'zustand';
import {devtools} from 'zustand/middleware';
import imageCompression from '../compression/compress';
import {createImage} from '../util';

const imageState = {
  progress: null,
  inputSize: null,
  outputSize: null,
  inputUrl: null,
  outputUrl: null,
  inputFile: null,
  outputFile: null,
};

const store = (set, get) => ({
  quality: 92,
  ratio: 0,
  useWebWorker: false,
  type: 'jpeg',
  webWorker: {
    ...imageState,
  },
  mainThread: {
    ...imageState,
  },
  getTarget: () => {
    const target = get().useWebWorker ? 'webWorker' : 'mainThread';
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
  compressImage: async () => {
    const target = get().useWebWorker ? 'webWorker' : 'mainThread';

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      onProgress: () => {},
      initialQuality: get().quality / 100,
      fileType: `image/${get().type}`,
      useWebWorker: get().useWebWorker,
    };
    const output = await imageCompression(get()[target]?.inputFile, options);
    console.log('output', output);

    const url = URL.createObjectURL(output);

    await createImage(url, 'compressed');
    set((prev) => ({
      ...prev,
      [target]: {
        ...prev[target],
        outputUrl: url,
        outputFile: output,
        outputSize: (output.size / 1024 / 1024).toFixed(2),
      },
    }));
  },
  uploadImage: async (file) => {
    if (!file) return;
    console.log(file);

    const url = URL.createObjectURL(file);

    await createImage(url, 'original');

    const target = get().useWebWorker ? 'webWorker' : 'mainThread';
    set((prev) => ({
      ...prev,
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
