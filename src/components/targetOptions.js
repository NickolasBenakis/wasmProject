import React from 'react';

const TargetOptions = ({setField}) => {
  const [state, setState] = React.useState('mainThread');

  return (
    <div
      className="execution-options"
      onChange={(e) => {
        setState(e.target.value);
      }}
    >
      <div className="title">Choose execution target:</div>
      <div className="options">
        <label htmlFor="mainThread">
          <input
            type="radio"
            id="mainThread"
            name="execution"
            value="mainThread"
            checked={state === 'mainThread'}
            onChange={() => {
              setField('useWASM', false);
              setField('useWebWorker', false);
            }}
          />
          <span>main thread</span>
        </label>
        <label htmlFor="webWorker">
          <input
            type="radio"
            id="webWorker"
            name="execution"
            value="webWorker"
            checked={state === 'webWorker'}
            onChange={() => {
              setField('useWASM', false);
              setField('useWebWorker', true);
            }}
          />
          <span>web worker</span>
        </label>
        <label htmlFor="wasm">
          <input
            type="radio"
            id="wasm"
            name="execution"
            value="WASM"
            checked={state === 'WASM'}
            onChange={() => {
              setField('useWebWorker', false);
              setField('useWASM', true);
            }}
          />
          <span>web assembly</span>
        </label>
      </div>
    </div>
  );
};

export default TargetOptions;
