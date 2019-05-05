import 'mocha';
import { CommandDefinition, ExecutionType } from './command';
import { jsonReplacer } from './utils';

describe('CommandDefinition', () => {
  it('should have required properties', () => {
    const cmd = new CommandDefinition();
    cmd.functionName.set('dummyFunctionName');
    cmd.executionType.set(ExecutionType.Setup);
    cmd.displayName.set('dummyDisplayName');
    console.log(JSON.stringify(cmd, jsonReplacer));
  });
});
