/**
 * Name and Value pair. Stores the value along with its JSON name.
 */
export class NV<T> {
  v?: T; // shorthand for value.
  constructor(public jsonName: string) {}
}

/**
 * Discard undefined properties when serializing an NV instances.
 */
export function serializeReplacer(key: string, value: any) {
  // Don't include undefined properties.
  if (value instanceof NV && value.v === undefined) {
    return undefined;
  }
  return value;
}
