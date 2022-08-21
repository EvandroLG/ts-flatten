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
  });
});
