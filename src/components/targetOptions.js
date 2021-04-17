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
            onChange={() => setField('useWebWorker', false)}
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
            onChange={() => setField('useWebWorker', true)}
          />
          <span>web-worker</span>
        </label>
        <label htmlFor="wasm">
          <input
            type="radio"
            id="wasm"
            name="execution"
            value="wasm"
            disabled
          />
          <span>
            wasm <code>(soon)</code>
          </span>
        </label>
      </div>
    </div>
  );
};

export default TargetOptions;
