import 'mocha';
import { CommandDefinition, ExecutionType } from './command';
import { handleOptional } from './utils';

describe('CommandDefinition', () => {
  it('should have required properties', () => {
    const cmd = new CommandDefinition();
    cmd
      .func('dummyFunctionName')
      .type(ExecutionType.Setup)
      .name('dummyDisplayName');
    console.log(JSON.stringify(cmd, handleOptional));
  });
});
