// The entry file of your WebAssembly module.
declare function log(n: i32): void;

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function minusOne(a: i32): i32 {

  if (a === 42)  {
    abort();
  }

  log(a);

  return a - 1;
}