/**
 * Name and Value pair. Stores the value along with its JSON name.
 */
export class NV<T> {
  v?: T; // "v" is shorthand for "value".
  constructor(public jsonName: string) {}

  set(v: T): void {
    this.v = v;
  }

  get(): T {
    return this.v as T;
  }
}

/**
 * Use the explicitly specified key name and discard undefined properties
 * when serializing an NV instances.
 */
function fixupJSONKeyName(key: string, value: any) {
  if (value instanceof NV) {
    // Don't include undefined properties.
    if (typeof value === 'undefined') {
      return undefined;
    } else {
      return { [value.jsonName]: value.v };
    }
  }
  return { [key]: value };
}

interface JSONObj {
  [key: string]: any;
}

export function jsonReplacer(key: string, value: any) {
  if (value && typeof value === 'object') {
    const replacement: JSONObj = {};
    for (const k of Object.getOwnPropertyNames(value)) {
      Object.assign(replacement, fixupJSONKeyName(k, value[k]));
    }
    return replacement;
  }
  return value;
}

// JS can't distinguish between ints and floats but Evergreen does, so we
// provide visual hints. The integer/float type difference is not enforced
// by typescript.
export type integer = number;
export type float = number;
