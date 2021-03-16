import WasmLoader from './loader.js';

window.addEventListener('load', () => {

	console.log("loaded!");

	const ML = new WasmLoader();
	ML.wasm('/build/optimized.wasm')
	.then(instance => {
		// const {minusOne, fizzBuzz, __getString} = instance;

		const {readMemory, memory} = instance;
		// document.write(minusOne(422));
		// document.write(__getString(fizzBuzz(3)));

		const memoryArray = new Uint8Array(memory.buffer);

		document.write(memoryArray[1]);
		document.write('<br />');
		memoryArray[2] = 42;

		document.write(readMemory(2));
	})

});