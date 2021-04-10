import React from 'react';
import Ratio from './ratio';
import EncoderList from './encoderList';
import Slider from './slider';
import WebworkerCheckbox from '../components/checkbox';

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
          Minimize
        </button>
      </div>
      <WebworkerCheckbox />
      <EncoderList />
      <Slider />
      {/* <Ratio /> */}
    </section>
  );
};

export default Controls;
