import React from 'react';
import EncoderList from './encoderList';
import Slider from './slider';
import WebworkerCheckbox from './checkbox';
import ClearState from './clearState';

const Controls = () => {
  const [minimized, setMinimized] = React.useState(false);

  return (
    <section
      id="controls"
      className={`controls ${minimized ? 'minimize' : ''}`}
    >
      <div className="minimize-container">
        <button
          className="minimize-btn"
          onClick={() => setMinimized(!minimized)}
        >
          {minimized ? 'Maximize' : 'Minimize'}
        </button>
        <ClearState />
      </div>
      <WebworkerCheckbox />
      <EncoderList />
      <Slider />
    </section>
  );
};

export default Controls;
