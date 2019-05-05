import { integer, NV } from './utils';
import { Operation } from './operations';

export enum ExecutionType {
  System = 'system',
  Setup = 'setup',
  Test = 'test',
}

interface Parameters {
  [key: string]: string;
}

type Vars = Parameters;

export class CommandDefinition {
  functionName = new NV<string>('func');
  displayName = new NV<string>('display_name');
  executionType = new NV<ExecutionType>('type');
  commandName = new NV<Operation>('command');
  timeoutSecs = new NV<integer>('timeout_secs');

  private runVariants = new NV<string[]>('variants');
  private parameters = new NV<Parameters>('params');
  private vars = new NV<Vars>('vars');

  variant(runVariant: string): CommandDefinition {
    if (this.runVariants.isUndefined()) {
      this.runVariants.v = [];
    }
    this.runVariants.v.push(runVariant);
    return this;
  }

  variants(runVariants: string[]): void {
    for (const v of runVariants) {
      this.variant(v);
    }
  }

  variable(key: string, value: string): void {
    if (this.vars.isUndefined()) {
      this.vars.v = {};
    }
    this.vars.v[key] = value;
  }

  variables(vars: Vars): void {
    for (const k of Object.getOwnPropertyNames(vars)) {
      this.variable(k, vars[k]);
    }
  }

  param(key: string, value: string): void {
    if (this.parameters.isUndefined()) {
      this.parameters.v = {};
    }
    this.parameters.v[key] = value;
  }

  params(parameters: Parameters): void {
    for (const k of Object.getOwnPropertyNames(parameters)) {
      this.param(k, parameters[k]);
    }
  }
}

export class CommandSequence {
  private cmdArray: CommandDefinition[] = [];

  command(): CommandDefinition {
    const c = new CommandDefinition();
    this.cmdArray.push(c);
    return c;
  }

  add(cmdDef: CommandDefinition): void {
    this.cmdArray.push(cmdDef);
  }

  extend(cmdDefs: CommandDefinition[]): void {
    for (const cmdDef of cmdDefs) {
      this.add(cmdDef);
    }
  }
}
