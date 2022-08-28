import flatten from './flatten';

describe('flatten', () => {
  it('should not change primitive values and function', () => {
    expect(flatten(true)).toBeTruthy();
    expect(flatten(false)).toBeFalsy();
    expect(flatten(123)).toBe(123);
    expect(flatten('s')).toBe('s');
    expect(flatten(null)).toBeNull();
    expect(flatten(undefined)).toBeUndefined();
    const fn = () => {};
    expect(flatten(fn)).toBe(fn);
  });

  it('should flatten arrays', () => {
    const fn = () => {};

    expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
    expect(flatten([1, [2, [3, [4, [5], fn]]]])).toEqual([1, 2, 3, 4, 5, fn]);
    expect(flatten([1, ['a', null, fn], true])).toEqual([
      1,
      'a',
      null,
      fn,
      true,
    ]);
    expect(flatten([[], [undefined, ['a', 4]], false])).toEqual([
      undefined,
      'a',
      4,
      false,
    ]);
  });

  it('should flatten objects', () => {
    expect(flatten({ a: 1, b: 2, c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
    expect(flatten({ a: 1, b: { c: 3 }, d: 4 })).toEqual({ a: 1, c: 3, d: 4 });
  });

  it('should flatten set', () => {
    const param = new Set([1, 2, 3, 'a', null, undefined, []]);
    const result = flatten(param);

    expect(result).toEqual(param);
    expect(result === param).toBeFalsy();
  });

  it('should flatten map', () => {
    const param = new Map<any, any>([
      ['a', 1],
      ['b', null],
      ['c', { a: 1, b: 2 }],
      [[1, 2, 3, 4], new Set()],
    ]);
    const result = flatten(param);
    expect(result).toEqual(param);
    expect(result === param).toBeFalsy();
    expect(result.get('c')).toEqual(param.get('c'));
    expect(result.get('c') === param.get('c')).toBeFalsy();
    expect(Array.from(result.keys()).at(-1)).toEqual(
      Array.from(param.keys()).at(-1)
    );

    expect(
      Array.from(result.keys()).at(-1) === Array.from(param.keys()).at(-1)
    ).toBeFalsy();
  });

  it('should flatten nested arrays and objects', () => {
    expect(
      flatten([undefined, null, true, null, { a: { b: null, c: 1 } }])
    ).toEqual([undefined, null, true, null, { b: null, c: 1 }]);

    expect(
      flatten({ a: 'a', b: [true, false], c: { d: null, e: undefined } })
    ).toEqual({
      a: 'a',
      b: [true, false],
      d: null,
      e: undefined,
    });

    expect(flatten({ a: 1, b: { c: [3, 4] }, d: 4 })).toEqual({
      a: 1,
      c: [3, 4],
      d: 4,
    });
  });
});
