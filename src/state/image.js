import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { dataURItoBlob } from '../util';

const store = (set, get) => ({
  originalURL: undefined,
  compressedURL: undefined,
  originalSize: 0,
  compressedSize: 0,
  compressionLevel: 92,
  ratio: 0,
  type: 'jpeg',
  setField: (key, value) => {
    if (!key in get()) {
      throw new Error('undefined key in store');
    }
    set((prevState) => ({ ...prevState, [key]: value }));
  },
  setFields: (newState) => {
    set((prevState) => ({ ...prevState, ...newState }));
  },
  compressImage: () => {
    const temporaryImage = new Image();
    temporaryImage.src = get().originalURL;
    temporaryImage.onload = function drawAnImageToCanvas() {
      const temporaryCanvas = document.createElement('canvas');
      const temporaryCTX = temporaryCanvas.getContext('2d');
      temporaryCTX.drawImage(
        temporaryImage,
        0,
        0,
        temporaryImage.width,
        temporaryImage.height
      );

      const compressionLevel = get().compressionLevel / 100;
      const compressedURL = temporaryCanvas.toDataURL(
        `image/${get().type}`,
        compressionLevel
      );

      const compressedBlob = dataURItoBlob(compressedURL);
      const ratio = 100 - (compressedBlob.size / get().originalSize) * 100;
      set((prevState) => ({
        ...prevState,
        compressedURL,
        compressedSize: compressedBlob.size,
        ratio,
      }));

      const compressedCanvas = document.getElementById('compressed');
      const compressedContext = compressedCanvas.getContext('2d');
      compressedContext.drawImage(
        temporaryImage,
        0,
        0,
        compressedCanvas.width,
        compressedCanvas.height
      );
    };
  },
});

export default create(devtools(store, 'imageStore'));
