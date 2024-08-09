#!/usr/bin/env bash

mkdir -p build

. scripts/gen_shrub_proto_ts_files.sh

# Compile TS files.
tsc --build

# Copy JS files to build/. Use rsync to preserve directory structure.
rsync -R $(find src -name "*.js") build

# Copy type definition files to build/. Use rsync to preserve directory structure.
rsync -R $(find src -name "*.d.ts") build
