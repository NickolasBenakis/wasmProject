import React from 'react';

const initialState = {
  original: undefined,
  compressed: undefined,
  originalSize: 0,
  compressedSize: 0,
  compressionLevel: 92,
  ratio: 0,
};

const ImageContext = React.createContext(null);

const Provider = ({ children, ...props }) => {
  const [state, setState] = React.useState(initialState);

  return (
    <ImageContext.Provider value={/* some value */}>
      {children}
    </ImageContext.Provider>
  );
};
