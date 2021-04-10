import create from 'zustand';
import {devtools} from 'zustand/middleware';
import imageCompression from '../compression/compress';
import {createImage} from '../util';

const store = (set, get) => ({
  originalURL: undefined,
  compressedURL: undefined,
  originalFile: undefined,
  compressedFile: undefined,
  originalSize: 0,
  compressedSize: 0,
  compressionLevel: 92,
  ratio: 0,
  useWebWorker: false,
  type: 'jpeg',
  webWorker: {
    progress: null,
    inputSize: null,
    outputSize: null,
    inputUrl: null,
    outputUrl: null,
  },
  mainThread: {
    progress: null,
    inputSize: null,
    outputSize: null,
    inputUrl: null,
    outputUrl: null,
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
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      onProgress: () => {},
      initialQuality: get().compressionLevel / 100,
      fileType: `image/${get().type}`,
      useWebWorker: get().useWebWorker,
    };
    const output = await imageCompression(get().originalFile, options);
    console.log('output', output);
    const url = URL.createObjectURL(output);

    await createImage(url, 'compressed');
    set((prev) => ({
      ...prev,
      compressedURL: url,
      compressedSize: (output.size / 1024 / 1024).toFixed(2),
      compressedFile: output,
    }));
  },
  uploadImage: async (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);

    await createImage(url, 'original');
    console.log(file);
    set((prev) => ({
      ...prev,
      originalURL: url,
      //  size in MBs
      originalSize: (file.size / 1024 / 1024).toFixed(2),
      originalFile: file,
    }));
  },
});

export default create(devtools(store, 'imageStore'));
