/**
 * Name and Value pair. Stores the value along with its JSON name.
 */
export class NV<T> {
  v?: T; // shorthand for value.
  constructor(public jsonName: string) {}

  isUndefined(): boolean {
    return typeof this.v === undefined;
  }
}

/**
 * Discard undefined properties when serializing an NV instances.
 */
export function handleOptional(key: string, value: any) {
  // Don't include undefined properties.
  if (value instanceof NV && value.isUndefined()) {
    return undefined;
  }
  return value;
}

// JS can't distinguish between ints and floats but Evergreen does, so we
// provide visual hints. The integer/float type difference is not enforced
// by typescript.
export type integer = number;
export type float = number;
