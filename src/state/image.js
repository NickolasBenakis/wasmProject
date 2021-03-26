import create from 'zustand';
import { devtools } from 'zustand/middleware';

const store = (set, get) => ({
  original: undefined,
  compressed: undefined,
  originalSize: 0,
  compressedSize: 0,
  compressionLevel: 92,
  ratio: 0,
  setField: (key, value) => {
    if (!key in get()) {
      throw new Error('undefined key in store');
    }
    set((prevState) => ({ ...prevState, [key]: value }));
  },
  setFields: (newState) => {
    set((prevState) => ({ ...prevState, ...newState }));
  },
});

export default create(devtools(store, 'imageStore'));
