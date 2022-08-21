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
});
