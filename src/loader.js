import ASLoader from '@assemblyscript/loader';

class WasmLoader {
  constructor() {
    this._imports = {
      env: {
        abort() {
          throw new Error('Abort called from wasm file');
        },
      },
      index: {
        log(input) {
          console.log(input);
        },
      },
    };
  }

  async wasm(path, imports = this._imports) {
    console.log(`fetching ${path}`);
    if (!ASLoader.instantiateStreaming) {
      return this.wasmFallback(path, imports);
    }
    const instance = await ASLoader.instantiateStreaming(fetch(path), imports);
    return instance?.exports;
  }

  async wasmFallback(path, imports) {
    console.log(`using fallback`);

    const response = await fetch(path);

    const bytes = await response?.arrayBuffer();
    const instance = await ASLoader.instantiate(bytes, imports);

    return instance?.exports;
  }
}

export default WasmLoader;
