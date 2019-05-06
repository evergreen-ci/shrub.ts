interface ChainCB<T> {
  (o: T): void;
}

export function chain<T>(ctor: { new (): T }, ...funcs: Array<ChainCB<T>>): T {
  const o = new ctor();
  for (const func of funcs) {
    func(o);
  }
  return o;
}
