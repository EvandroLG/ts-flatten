import { isPrimitive } from './utils';

function flatten(items: unknown) {
  if (isPrimitive(items) || typeof items === 'function') {
    return items;
  }

  if (Array.isArray(items)) {
    return flatArray(items);
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

export default flatten;
