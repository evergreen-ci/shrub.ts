import { integer, NV } from './utils';

export class TaskSpec {
  taskName = new NV<string>('name');
  _stepback = new NV<boolean>('stepback');
  distros = new NV<string[]>('distros');

  name(taskName: string): TaskSpec {
    this.taskName.v = taskName;
    return this;
  }

  stepback(): void {
    this._stepback.v = true;
  }

  distro(d: string): void {
    if (typeof this.distros.v === 'undefined') {
      this.distros.v = [];
    }
    this.distros.v.push(d);
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
    if (typeof this._components.v === 'undefined') {
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
  private taskSpecs = new NV<TaskSpec[]>('tasks');
  private distroRunOn = new NV<string[]>('run_on');
  private _expansions = new NV<Expansions>('expansions');
  private displayTaskSpecs = new NV<DisplayTaskDefinition[]>('display_tasks');

  runOn(distro: string): void {
    if (typeof this.distroRunOn.v === 'undefined') {
      this.distroRunOn.v = [];
    }
    this.distroRunOn.v.push(distro);
  }

  expansion(key: string, value: string): void {
    if (typeof this._expansions.v === 'undefined') {
      this._expansions.v = {};
    }
    this._expansions.v[key] = value;
  }

  expansions(exps: Expansions): void {
    for (const k of Object.getOwnPropertyNames(exps)) {
      this.expansion(k, exps[k]);
    }
  }

  task(ts: TaskSpec): void {
    if (typeof this.taskSpecs.v === 'undefined') {
      this.taskSpecs.v = [];
    }
    this.taskSpecs.v.push(ts);
  }

  tasks(tss: TaskSpec[]): void {
    for (const ts of tss) {
      this.task(ts);
    }
  }

  displayTask(dt: DisplayTaskDefinition): void {
    if (typeof this.displayTaskSpecs.v === 'undefined') {
      this.displayTaskSpecs.v = [];
    }
    this.displayTaskSpecs.v.push(dt);
  }

  displayTasks(dts: DisplayTaskDefinition[]): void {
    for (const dt of dts) {
      this.displayTask(dt);
    }
  }
}


