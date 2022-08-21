import { isPrimitive } from './utils';

function flatten<T>(items: T) {
  if (isPrimitive(items) || typeof items === 'function') {
    return items;
  }

  const keys = Object.keys(items);
  const isArray = Array.isArray(items);
  let output = isArray ? [] : {};

  for (const key of keys) {
    const item = items[key];

    if (isArray) {
      if (Array.isArray(item)) {
        (output as unknown[]).push(...(flatten(item) as unknown[]));
      } else {
        (output as unknown[]).push(flatten(item) as unknown);
      }
    } else {
      if (isPrimitive(item) || Array.isArray(item)) {
        (output as { [key: string]: unknown })[key] = flatten(item);
      } else {
        output = { ...output, ...flatten(item) };
      }
    }
  }

  return output;
}

export default flatten;
