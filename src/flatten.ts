import { isPrimitive } from './utils';

function flatten<T>(items: T) {
  if (isPrimitive(items)) {
    return items;
  }

  const keys = Object.keys(items);
  const isArray = Array.isArray(items);
  let output = isArray ? [] : {};

  for (const key of keys) {
    const item = items[key];

    if (isArray) {
      if (Array.isArray(item)) {
        (output as Array<T>).push(...flatten(item));
      } else {
        (output as Array<T>).push(flatten(item));
      }
    } else {
      if (isPrimitive(item) || Array.isArray(item)) {
        output[key] = flatten(item);
      } else {
        output = { ...output, ...flatten(item) };
      }
    }
  }

  return output;
}

export default flatten;
