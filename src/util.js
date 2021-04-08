export function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], { type: mimeString });
  return blob;
}

/**
 * getDataUrlFromFile
 *
 * @param {File | Blob} file
 * @returns {Promise<string>}
 */
export function getDataUrlFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

/**
 * loadImage
 *
 * @param {string} src
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

/**
 * createImage
 *
 * @param {string} src
 * @returns {Promise<HTMLImageElement>}
 */
export function createImage(src, id) {
  return new Promise((resolve, reject) => {
    const img = document.getElementById(id);
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

/**
 * drawImageInCanvas
 *
 * @param {HTMLImageElement} img
 * @param {string} type {original | compressed}
 * @returns {HTMLCanvasElement}
 */
export function drawImageInCanvas(img, type) {
  if (!['original', 'compressed'].includes(type)) {
    throw new Error('not compatible type');
  }
  const canvas = document.getElementById(type);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
}

export function handleScale(canvas) {
  const width = canvas.width;
  const height = canvas.height;

  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight;
  if (height >= maxHeight || width >= maxWidth) {
    const ctx = canvas.getContext('2d');
    ctx.scale(0.2, 0.2);
  }
}
