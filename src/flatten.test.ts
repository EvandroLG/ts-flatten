import flatten from './flatten';

describe('flatten', () => {
  it('should not change primitive values', () => {
    expect(flatten(true)).toBeTruthy();
    expect(flatten(false)).toBeFalsy();
    expect(flatten(123)).toBe(123);
    expect(flatten('s')).toBe('s');
    expect(flatten(null)).toBeNull();
    expect(flatten(undefined)).toBeUndefined();
  });

  it('should flatten arrays', () => {
    expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
    expect(flatten([1, [2, [3, [4, [5]]]]])).toEqual([1, 2, 3, 4, 5]);
    expect(flatten([1, ['a', null], true])).toEqual([1, 'a', null, true]);
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
