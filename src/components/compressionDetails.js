import React from 'react';
import {calculateCompressedTime} from '../util';

const CompressionDetails = ({
  outputSize = 0,
  ratio = 0,
  outputUrl = '',
  outputFileName = '',
  time = 0,
  display = false,
}) => {
  return (
    <table className={`info ${display ? 'display' : 'hidden'}`}>
      <tbody>
        <tr>
          <td>compressed info : </td>
          <td>
            {`Image size ${outputSize} Mb, ${
              ratio === 100 ? `~100` : ratio.toFixed(2)
            } % ${ratio > 100 ? 'larger' : 'smaller'}`}
          </td>
        </tr>
        <tr>
          <td>Compressed Time : </td>
          <td>{`${calculateCompressedTime(time)} s`}</td>
        </tr>
        <tr>
          <td>download : </td>
          <td>
            <a target="_blank" href={outputUrl} download={outputFileName}>
              Download compressed file
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CompressionDetails;
