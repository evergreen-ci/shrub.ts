import {
  CommandDefinition,
  Task,
  TaskDependency,
  Configuration,
  TaskSpec,
  DisplayTaskDefinition,
  Variant,
} from '../shrub_pb';

import { readFileSync } from 'fs';
import { assert } from 'chai';

interface AnyObj {
  [key: string]: any;
}

function jsonReplacer(key: string, value: any) {
  // Falsy values are ignored because they are the default. See
  // protobuf's "wrappers.proto" for explicit defaults if the current
  // behavior is undesirable.
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return undefined;
  }

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const replacement: AnyObj = {};
    for (const k of Object.getOwnPropertyNames(value)) {
      let snakeKey = k
        .split(/(?=[A-Z])/)
        .join('_')
        .toLowerCase();

      if (Array.isArray(value[k])) {
        if (snakeKey.endsWith('_list')) {
          // Remove the "_list" suffix from keys for arrays.

          snakeKey = snakeKey.replace(/_list$/, '');
          replacement[snakeKey] = value[k];
        } else if (snakeKey.endsWith('_map')) {
          // "_map" suffix indicates a protobuf map; protobuf maps are stored as an
          // array of key value pairs. We convert them to native JSON objects.

          assert.isTrue(
            Array.isArray(value[k]),
            `keys ending in "_map" must have arrays for values, got ${k}: ${
              value[k]
            }`
          );
          snakeKey = snakeKey.replace(/_map$/, '');

          const outMap: any = {};

          // Again, ignore empty arrays.
          if (value[k].length !== 0) {
            for (const elem of value[k]) {
              outMap[elem[0]] = elem[1];
            }
            replacement[snakeKey] = outMap;
          }
        } else {
          replacement[snakeKey] = value[k];
        }
      } else {
        replacement[k] = value[k];
      }
    }
    return replacement;
  }
  return value;
}

interface ChainCB<T> {
  (o: T): void;
}

function chain<T>(ctor: { new (): T }, ...funcs: Array<ChainCB<T>>): T {
  const o = new ctor();
  for (const func of funcs) {
    func(o);
  }
  return o;
}

describe('shrub', () => {
  it('should generate agg fuzzer tasks', () => {
    const c = new Configuration();
    const nTasks = 10;
    const taskNames = [];
    const taskSpecs = [];
    for (let i = 0; i < nTasks; i++) {
      const name = `aggregation_multiversion_fuzzer_${i
        .toString()
        .padStart(3, '0')}`;
      taskNames.push(name);

      const ts = new TaskSpec();
      ts.setName(name);
      taskSpecs.push(ts);

      const task = new Task();
      task.setName(name);

      // The following indented block is for defining a single agg fuzzer task.
      {
        const td = new TaskDependency();
        td.setName('compile');

        task.addDependsOn(td);

        const commands = [
          chain(CommandDefinition, o => o.setFunc('do setup')),
          chain(CommandDefinition, o => o.setFunc('do multiversion setup')),
          chain(
            CommandDefinition,
            o => o.setFunc('run jstestfuzz'),
            o => {
              const m = o.getVarsMap();
              m.set('jstestfuzz_var', '--numGeneratedFiles 5');
              m.set('npm_command', 'agg-fuzzer');
            }
          ),
          chain(
            CommandDefinition,
            o => o.setFunc('run tests'),
            o => {
              const m = o.getVarsMap();
              m.set('continue_on_failure', 'false');
              m.set('resmoke_args', '--suites=generational_fuzzer');
              m.set('should_shuffle', 'false');
              m.set('task_path_suffix', 'false');
              m.set('timeout_secs', '1800');
            }
          ),
        ];

        task.setCommandsList(commands);
      }

      c.addTasks(task);
    }

    const dt = new DisplayTaskDefinition();
    dt.setName('aggregation_multiversion_fuzzer');
    dt.setExecutionTasksList(taskNames);

    const v = new Variant();
    v.setName('linux-64');
    v.setTasksList(taskSpecs);
    v.addDisplayTasks(dt);

    c.addBuildvariants(v);

    const actualJsonStr = JSON.stringify(c.toObject(), jsonReplacer, 2);
    const expectedJsonStr = readFileSync(
      'src/tests/data/agg_fuzzer.json'
    ).toString();

    assert.deepStrictEqual(
      JSON.parse(actualJsonStr),
      JSON.parse(expectedJsonStr)
    );
  });
});
