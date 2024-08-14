"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shrub_pb_1 = require("../shrub_pb");
const fs_1 = require("fs");
const chai_1 = require("chai");
const chain_1 = require("../utils/chain");
const json_1 = require("../utils/json");
function getName(i) {
    return `aggregation_multiversion_fuzzer_${i.toString().padStart(3, '0')}`;
}
describe('shrub', () => {
    it('should generate agg fuzzer tasks', () => {
        const c = new shrub_pb_1.Configuration();
        const nTasks = 10;
        const taskNames = [];
        const taskSpecs = [];
        // Define tasks and task specs for each execution task.
        for (let i = 0; i < nTasks; i++) {
            // The following indented block is for defining a single agg fuzzer task.
            {
                const commands = [
                    (0, chain_1.chain)(shrub_pb_1.CommandDefinition, o => o.setFunc('do setup')),
                    (0, chain_1.chain)(shrub_pb_1.CommandDefinition, o => o.setFunc('do multiversion setup')),
                    (0, chain_1.chain)(shrub_pb_1.CommandDefinition, o => o.setFunc('run jstestfuzz'), o => {
                        const m = o.getVarsMap();
                        m.set('jstestfuzz_var', '--numGeneratedFiles 5');
                        m.set('npm_command', 'agg-fuzzer');
                    }),
                    (0, chain_1.chain)(shrub_pb_1.CommandDefinition, o => o.setFunc('run tests'), o => {
                        const m = o.getVarsMap();
                        m.set('continue_on_failure', 'false');
                        m.set('resmoke_args', '--suites=generational_fuzzer');
                        m.set('should_shuffle', 'false');
                        m.set('task_path_suffix', 'false');
                        m.set('timeout_secs', '1800');
                    }),
                ];
                // Define a task.
                const task = new shrub_pb_1.Task();
                task.setCommandsList(commands);
                task.addDependsOn((0, chain_1.chain)(shrub_pb_1.TaskDependency, o => o.setName('compile')));
                c.addTasks(task);
                // Define a task spec.
                const ts = new shrub_pb_1.TaskSpec();
                taskSpecs.push(ts);
                // Set names.
                const name = getName(i);
                task.setName(name);
                ts.setName(name);
                taskNames.push(name);
            }
        }
        // Define display task.
        const dt = new shrub_pb_1.DisplayTaskDefinition();
        dt.setName('aggregation_multiversion_fuzzer');
        dt.setExecutionTasksList(taskNames);
        // Define variant.
        const v = new shrub_pb_1.Variant();
        v.setName('linux-64');
        v.setTasksList(taskSpecs);
        v.addDisplayTasks(dt);
        c.addBuildvariants(v);
        // Assert result is correct.
        const actualJsonStr = JSON.stringify(c.toObject(), json_1.jsonReplacer, 2);
        const expectedJsonStr = (0, fs_1.readFileSync)('src/tests/data/agg_fuzzer.json').toString();
        chai_1.assert.deepStrictEqual(JSON.parse(actualJsonStr), JSON.parse(expectedJsonStr));
    });
});
//# sourceMappingURL=agg_fuzzer.js.map