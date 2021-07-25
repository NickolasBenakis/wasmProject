import create from 'zustand';
import {devtools} from 'zustand/middleware';
// import imageCompression from '../compression/index.js';
import imageCompression from 'browser-image-compression';
import {drawFileInCanvas, canvasToFile} from '../compression/utils';
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
  useWASM: false,
  type: 'jpeg',
  webWorker: {
    ...imageInitialState,
  },
  mainThread: {
    ...imageInitialState,
  },
  wasm: {
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
    const webWorkertarget = get().useWebWorker;
    if (webWorkertarget) {
      return executionTarget.webWorker;
    }
    const wasmTarget = get().useWASM;
    if (wasmTarget) {
      return executionTarget.wasm;
    }
    return executionTarget.mainThread;
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
      : get().useWASM
      ? executionTarget.wasm
      : executionTarget.mainThread;

    set((prevState) => ({
      ...prevState,
      [target]: {
        ...prevState[target],
        progress: p,
      },
    }));
  },
  compressImageWithWasm: async () => {
    const target = get().wasm.inputFile;
    console.log('HELLO');
    const [image, canvas, ctx] = await drawFileInCanvas(target);

    const photonModule = await import('@silvia-odwyer/photon');

    const t0 = performance.now();
    const photonImage = photonModule.open_image(canvas, ctx);
    const resizedCanvas = photonModule.resize_img_browser(
      photonImage,
      image.width,
      image.height,
      1
    );
    const t1 = performance.now();

    const output = await canvasToFile(
      resizedCanvas,
      `image/${get().type}`,
      'resized',
      Date.now(),
      get().quality
    );

    const url = URL.createObjectURL(output);
    await createImage(url, 'compressed');

    console.log(output);

    set((prev) => ({
      ...prev,
      ratio: calculateRatio(
        (output.size / 1024 / 1024).toFixed(2),
        get().wasm?.inputSize
      ),
      wasm: {
        ...prev.wasm,
        time: t1 - t0,
        outputUrl: url,
        outputFile: output,
        outputSize: (output.size / 1024 / 1024).toFixed(2),
      },
    }));
  },

  compressImage: async () => {
    const target = get().useWebWorker
      ? executionTarget.webWorker
      : get().useWASM
      ? executionTarget.wasm
      : executionTarget.mainThread;

    if (target === executionTarget.wasm) {
      await get().compressImageWithWasm();
      return;
    }

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
      : get().useWASM
      ? executionTarget.wasm
      : executionTarget.mainThread;

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
