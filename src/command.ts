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
  private functionName = new NV<string>('func');
  private displayName = new NV<string>('display_name');
  private executionType = new NV<ExecutionType>('type');
  private commandName = new NV<Operation>('command');
  private timeoutSecs = new NV<integer>('timeout_secs');
  private runVariants = new NV<string[]>('variants');
  private parameters = new NV<Parameters>('params');
  private vars = new NV<Vars>('vars');

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

  command(commandName: Operation): CommandDefinition {
    this.commandName.v = commandName;
    return this;
  }

  timeout(timeoutSecs: integer): CommandDefinition {
    this.timeoutSecs.v = timeoutSecs;
    return this;
  }

  variant(runVariant: string): CommandDefinition {
    if (typeof this.runVariants.v === 'undefined') {
      this.runVariants.v = [];
    }
    this.runVariants.v.push(runVariant);
    return this;
  }

  variants(runVariants: string[]): CommandDefinition {
    for (const v of runVariants) {
      this.variant(v);
    }
    return this;
  }

  variable(key: string, value: string): CommandDefinition {
    if (typeof this.vars.v === 'undefined') {
      this.vars.v = {};
    }
    this.vars.v[key] = value;
    return this;
  }

  variables(vars: Vars): CommandDefinition {
    for (const k of Object.getOwnPropertyNames(vars)) {
      this.variable(k, vars[k]);
    }
    return this;
  }

  param(key: string, value: string): CommandDefinition {
    if (typeof this.parameters.v === 'undefined') {
      this.parameters.v = {};
    }
    this.parameters.v[key] = value;
    return this;
  }

  params(parameters: Parameters): CommandDefinition {
    for (const k of Object.getOwnPropertyNames(parameters)) {
      this.param(k, parameters[k]);
    }
    return this;
  }
}

export class CommandSequence {
  private cmdArray: CommandDefinition[] = [];

  command(): CommandDefinition {
    const c = new CommandDefinition();
    this.cmdArray.push(c);
    return c;
  }

  add(cmdDef: CommandDefinition): CommandSequence {
    this.cmdArray.push(cmdDef);
    return this;
  }

  extend(cmdDefs: CommandDefinition[]): CommandSequence {
    for (const cmdDef of cmdDefs) {
      this.add(cmdDef);
    }
    return this;
  }
}
