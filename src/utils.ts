export function isPrimitive(value: unknown) {
  return typeof value !== 'object' || value === null;
}
