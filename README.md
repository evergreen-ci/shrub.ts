# shrub.ts – Generate Evergreen Project Configs in TypeScript and JavaScript

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)


## Overview

`shrub.ts` is a library for programatically building [Evergreen project configurations](https://github.com/evergreen-ci/evergreen/wiki/Project-Files).
It is especially useful for generating tasks dynamically through [the `generate.tasks` command](https://github.com/evergreen-ci/evergreen/wiki/Project-Commands#generate-tasks)

NOTE: this library has historically been community maintained but has fallen out of date. 

## Installation
watch this space


## Example

Suppose you want to write the following project configuration (from Evergreen's wiki):

```yaml
tasks:
- name: compile
  commands:
    - command: git.get_project
      params:
        directory: src
    - func: "compile and upload to s3"
```

You can use `shrub.ts` to build the above config:

```typescript
const c = new Configuration();

const getProjCommand = new CommandDefinition();
getProjCommand.setCommand('git.get_project');
getProjCommand.getParamsMap().set('directory', 'src');

const uploadCommand = new CommandDefinition();
uploadCommand.setFunc('compile and upload to s3');

const task = new Task();
task.setName('compile')
task.setCommandsList([
   getProjCommand,
   uploadCommand, 
]);

const c = new Configuration();
c.addTasks(task);

return JSON.stringify(c.toObject(), jsonReplacer);
```

If you are familiar with the chaining syntax used by 
[`shrub`](https://github.com/evergreen-ci/shrub) and [`shrub.py`](https://github.com/evergreen-ci/shrub/),
you can use a similar syntax in `shrub.ts`. It is more concise than the naive version above with
indentation resembling the structure of the generated config file:

```typescript
const c = new Configuration;

const task = chain(
    Task,
    o => o.setName('compile'),
    o => o.setCommandsList([
        chain(
            CommandDefinition,
            o => o.setCommand('git.getproject'),
            o => o.getParamsMap().set('directory', 'src')
        ),
        chain(CommandDefinition, o => o.setFunc('compile and upload to s3')),
    ]),
)

c.addTasks(task);

return JSON.stringify(c.toObject(), jsonReplacer);
```

For more advanced examples, please see [the `shrub.ts` integration tests](https://github.com/guoyr/shrub.ts/tree/master/src/tests).


## Development

Run `source scripts/gen_shrub_proto_ts_files.sh` after installing protobuf's command line tool.
