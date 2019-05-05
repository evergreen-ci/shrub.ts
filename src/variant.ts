import { integer, NV } from './utils';

export class TaskSpec {
  taskName = new NV<string>('name');
  _stepback = new NV<boolean>('stepback');
  distros = new NV<string[]>('distros');

  name(taskName: string): TaskSpec {
    this.taskName.v = taskName;
    return this;
  }

  stepback(): TaskSpec {
    this._stepback.v = true;
    return this;
  }

  distro(d: string): TaskSpec {
    if (this.distros.isUndefined()) {
      this.distros.v = [];
    }
    this.distros.v.push(d);
    return this;
  }
}

export class DisplayTaskDefinition {
  private _name = new NV<string>('name');
  private _components = new NV<string[]>('execution_tasks');

  name(name: string): DisplayTaskDefinition {
    this._name.v = name;
    return this;
  }

  executionTask(taskName: string): DisplayTaskDefinition {
    if (this._components.isUndefined()) {
      this._components.v = [];
    }
    this._components.v.push(taskName);
    return this;
  }

  executionTasks(taskNames: string[]): DisplayTaskDefinition {
    for (const taskName of taskNames) {
      this.executionTask(taskName);
    }
    return this;
  }
}

interface Expansions {
  [key: string]: string;
}

export class Variant {
  private buildName = new NV<string>('name');
  private buildDisplayName = new NV<string>('display_name');
  private batchTimeSecs = new NV<integer>('batchtime');
  private taskSpecs = new NV<TaskSpec>('tasks');
  private distroRunOn = new NV<string[]>('run_on');
  private _expansions = new NV<Expansions>('expansions');
  private displayTaskSpecs = new NV<DisplayTaskDefinition>('display_tasks');

  getName(): string {
    return this.buildName.v;
  }

  displayName(name: string): Variant {
    this.buildDisplayName.v = name;
    return this;
  }

  batchTime(time: integer): Variant {
    this.batchTimeSecs.v = time;
    return this;
  }

  runOn(distro: string): Variant {
    if (this.distroRunOn.isUndefined()) {
      this.distroRunOn.v = [];
    }
    this.distroRunOn.v.push(distro);
    return this;
  }

  expansion(key: string, value: string): Variant {
    if (this._expansions.isUndefined()) {
      this._expansions.v = {};
    }
    this._expansions.v[key] = value;
    return this;
  }

  expansions(exps: Expansions): Variant {
    for (const k of Object.getOwnPropertyNames(exps)) {
      this.expansion(k, exps[k]);
    }
    return this;
  }
}


