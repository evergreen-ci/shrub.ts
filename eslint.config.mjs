import globals from "globals";
import tseslint from "typescript-eslint";


export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.node }},
  { ignores: [
    "build/src/shrub_pb.js",
    "build/src/tests/agg_fuzzer.js",
    "build/src/utils/json.d.ts",
    "build/src/utils/json.js",
    "src/shrub_pb.js",
    "src/utils/json.ts",
    ]
  },
  ...tseslint.configs.recommended,
];
