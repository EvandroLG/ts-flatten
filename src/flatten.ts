import { isPrimitive } from './utils';

/*
 * Receives any type of value and returns a flatted version of that value
 * @param {unknown} items
 * @returns {unknown}
 */
function flatten(items: unknown) {
  if (
    isPrimitive(items) ||
    typeof items === 'function' ||
    typeof items === 'symbol'
  ) {
    return items;
  }

  if (Array.isArray(items)) {
    return flatArray(items);
  }

  if (items instanceof Set) {
    return new Set(items);
  }

  if (items instanceof Map) {
    return flatMap(items);
  }

  return flatObject(items as { [key: string]: unknown });
}

function flatArray(items: unknown[]) {
  return items.reduce((acc: unknown[], item) => acc.concat(flatten(item)), []);
}

function flatObject(items: { [key: string]: unknown }) {
  const keys = Object.keys(items);

  return keys.reduce((acc, key) => {
    const item = items[key];

    if (isPrimitive(item) || Array.isArray(item)) {
      acc[key] = flatten(item);
    } else {
      acc = { ...acc, ...flatten(item) };
    }

    return acc;
  }, {});
}

function flatMap(items) {
  const map = new Map();

  for (const [key, value] of items) {
    map.set(flatten(key), flatten(value));
  }

  return map;
}

export default flatten;
