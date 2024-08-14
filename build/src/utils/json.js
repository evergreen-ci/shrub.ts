"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonReplacer = jsonReplacer;
const chai_1 = require("chai");
/**
 * Remove the "_list" suffix from keys for arrays.
 */
function handleList(key, value, out) {
    key = key.replace(/_list$/, '');
    out[key] = value;
}
/**
 * The "_map" suffix indicates a protobuf map; protobuf maps are stored as an
 * array of key value pairs. We convert them to native JSON objects.
 */
function handleMap(key, value, out) {
    chai_1.assert.isTrue(Array.isArray(value), `keys ending in "_map" must have arrays for values, got ${key}: ${value}`);
    key = key.replace(/_map$/, '');
    const outMap = {};
    // Ignore empty arrays.
    if (value.length !== 0) {
        for (const elem of value) {
            outMap[elem[0]] = elem[1];
        }
        out[key] = outMap;
    }
}
function camelToSnake(key) {
    return key
        .split(/(?=[A-Z])/)
        .join('_')
        .toLowerCase();
}
function jsonReplacer(key, value) {
    // Falsy values are ignored because they are the default. See
    // protobuf's "wrappers.proto" for explicit defaults if the current
    // behavior is undesirable.
    if (!value || (Array.isArray(value) && value.length === 0)) {
        return undefined;
    }
    if (value && typeof value === 'object' && !Array.isArray(value)) {
        const replacement = {};
        for (const k of Object.getOwnPropertyNames(value)) {
            const snakeKey = camelToSnake(k);
            if (Array.isArray(value[k])) {
                if (snakeKey.endsWith('_list')) {
                    handleList(snakeKey, value[k], replacement);
                }
                else if (snakeKey.endsWith('_map')) {
                    handleMap(snakeKey, value[k], replacement);
                }
                else {
                    replacement[snakeKey] = value[k];
                }
            }
            else {
                // Copy the value verbatim for non-arrays.
                replacement[snakeKey] = value[k];
            }
        }
        return replacement;
    }
    else {
        // Ignore array values.
        return value;
    }
}
//# sourceMappingURL=json.js.map