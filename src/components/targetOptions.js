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
      Choose execution context
      <label htmlFor="mainThread">
        <span>main thread</span>
        <input
          type="radio"
          id="mainThread"
          name="execution"
          value="mainThread"
          checked={state === 'mainThread'}
          onChange={() => setField('useWebWorker', false)}
        />
      </label>
      <label htmlFor="webWorker">
        <span>web-worker</span>
        <input
          type="radio"
          id="webWorker"
          name="execution"
          value="webWorker"
          checked={state === 'webWorker'}
          onChange={() => setField('useWebWorker', true)}
        />
      </label>
      <label htmlFor="wasm">
        <span>wasm</span>
        <input type="radio" id="wasm" name="execution" value="wasm" disabled />
      </label>
    </div>
  );
};

export default TargetOptions;
