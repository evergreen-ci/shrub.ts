import { Task, TaskDependency } from "./shrub_pb";

function replacer(key: string, value: any) {

}

interface anyObj {
  [key: string]: any;
}

function jsonReplacer(key: string, value: any) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const replacement: anyObj = {};
    for (const k of Object.getOwnPropertyNames(value)) {
      let snakeKey = k.split(/(?=[A-Z])/).join('_').toLowerCase();
      if (Array.isArray(value[k])) {
        console.log(value[k]);
        snakeKey = snakeKey.replace(/_list$/, '');
        replacement[snakeKey] = value[k] as Array<any>;
      }
      Object.assign(replacement, {[snakeKey]: value[k]});
    }
    return replacement;
  }
  return value;
}

describe('CommandDefinition', () => {
  it('should have required properties', () => {
    const a = new Task();
    a.setName('dummyName');
    a.setPriority(10);

    let td = new TaskDependency();
    td.setName('taskDep');
    td.setVariant('variant');
    a.addDependsOn(td);
    a.getEnvMap().set("env", "envVal");

    console.log(JSON.stringify(a.toObject(), jsonReplacer));
  });
});
