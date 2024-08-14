interface ChainCB<T> {
    (o: T): void;
}
export declare function chain<T>(ctor: {
    new (): T;
}, ...funcs: Array<ChainCB<T>>): T;
export {};
