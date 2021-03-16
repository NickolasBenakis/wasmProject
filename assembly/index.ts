// The entry file of your WebAssembly module.
declare function log(n: string): void;

export function fizzBuzz(item: i32): String | null {

  if (item%15 === 0) {
    return "fizzbuzz"
  } else if (item%3 === 0) {
    return "fizz"
  } else if (item%5 === 0) {
    return "buzz"
  }

  return null;

}


export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function minusOne(a: i32): i32 {

  if (a === 42)  {
    abort();
  }

  return a - 1;
}

// memory.grow(2);

// store<u8>(0, 21);
// store<u8>(1, 99);

// export function readMemory(n: i32): i32 {
//   return load<u8>(n);
// }