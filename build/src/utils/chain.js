"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chain = chain;
function chain(ctor, ...funcs) {
    const o = new ctor();
    for (const func of funcs) {
        func(o);
    }
    return o;
}
//# sourceMappingURL=chain.js.map