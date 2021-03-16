import WasmLoader from './loader.js';

window.addEventListener('load', () => {

	console.log("loaded!");

	const ML = new WasmLoader();
	ML.wasm('/build/optimized.wasm')
	.then(instance => {
		const {minusOne, fizzBuzz, __getString} = instance;

		// document.write(minusOne(422));
		document.write(__getString(fizzBuzz(3)));

	})

});