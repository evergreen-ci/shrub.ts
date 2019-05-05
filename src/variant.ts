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

  executionTask(taskName: string): void {
    if (this._components.isUndefined()) {
      this._components.v = [];
    }
    this._components.v.push(taskName);
  }

  executionTasks(taskNames: string[]): void {
    for (const taskName of taskNames) {
      this.executionTask(taskName);
    }
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

  runOn(distro: string): void {
    if (this.distroRunOn.isUndefined()) {
      this.distroRunOn.v = [];
    }
    this.distroRunOn.v.push(distro);
  }

  expansion(key: string, value: string): void {
    if (this._expansions.isUndefined()) {
      this._expansions.v = {};
    }
    this._expansions.v[key] = value;
  }

  expansions(exps: Expansions): void {
    for (const k of Object.getOwnPropertyNames(exps)) {
      this.expansion(k, exps[k]);
    }
  }
}


