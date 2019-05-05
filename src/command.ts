import { integer, NV } from './utils';
import { Operation } from './operations';

export enum ExecutionType {
  System = 'system',
  Setup = 'setup',
  Test = 'test',
}

export class CommandDefinition {
  private functionName = new NV<string>('func');
  private displayName = new NV<string>('display_name');
  private executionType = new NV<ExecutionType>('type');
  private commandName = new NV<Operation>('command');
  private timeoutSecs = new NV<integer>('timeout_secs');
  private runVariants = new NV<string[]>('variants');
  private params = new NV<object>('params');
  private vars = new NV<object>('vars');

  func(functionName: string): CommandDefinition {
    this.functionName.v = functionName;
    return this;
  }

  type(executionType: ExecutionType): CommandDefinition {
    this.executionType.v = executionType;
    return this;
  }

  name(displayName: string): CommandDefinition {
    this.displayName.v = displayName;
    return this;
  }
}
