export function dataURLtoBlob(dataURL, type) {
  //http://mitgux.com/send-canvas-to-server-as-file-using-ajax
  // Decode the dataURL
  var binary = atob(dataURL.split(',')[1]);
  // Create 8-bit unsigned array
  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  // Return our Blob object
  return new Blob([new Uint8Array(array)], { type: `image/${type}` });
}
