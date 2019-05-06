import {
  CommandDefinition,
  Configuration,
  DisplayTaskDefinition,
  Task,
  TaskDependency,
  TaskSpec,
  Variant,
} from '../shrub_pb';

import { readFileSync } from 'fs';
import { assert } from 'chai';
import { chain } from '../utils/chain';
import { jsonReplacer } from '../utils/json';

function getName(i: number): string {
  return `aggregation_multiversion_fuzzer_${i.toString().padStart(3, '0')}`;
}

describe('shrub', () => {
  it('should generate agg fuzzer tasks', () => {
    const c = new Configuration();
    const nTasks = 10;
    const taskNames = [];
    const taskSpecs = [];

    // Define tasks and task specs for each execution task.
    for (let i = 0; i < nTasks; i++) {
      // The following indented block is for defining a single agg fuzzer task.
      {
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

        // Define a task.
        const task = new Task();
        task.setCommandsList(commands);
        task.addDependsOn(chain(TaskDependency, o => o.setName('compile')));
        c.addTasks(task);

        // Define a task spec.
        const ts = new TaskSpec();
        taskSpecs.push(ts);

        // Set names.
        const name = getName(i);
        task.setName(name);
        ts.setName(name);
        taskNames.push(name);
      }
    }

    // Define display task.
    const dt = new DisplayTaskDefinition();
    dt.setName('aggregation_multiversion_fuzzer');
    dt.setExecutionTasksList(taskNames);

    // Define variant.
    const v = new Variant();
    v.setName('linux-64');
    v.setTasksList(taskSpecs);
    v.addDisplayTasks(dt);
    c.addBuildvariants(v);

    // Assert result is correct.
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
