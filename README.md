# ts-flatten

A utility function that takes in a value and returns a flatted version of that value

## Installation

```shell
  npm install ts-flatten
```

## Usage

```js
const param = new Map([
  [[[[1, 2, 3, 4], new Set()]]],
  ['a', 1],
  ['b', null],
  ['c', { a: 1, b: 2 }],
]);

flatten(param);
/*
  Output:
  Map(4) {
    [ 1, 2, 3, 4 ] => Set(0) {}
    'a' => 1,
    'b' => null,
    'c' => { a: 1, b: 2 },
  }
*/
```

## License

[MIT](./LICENSE)
