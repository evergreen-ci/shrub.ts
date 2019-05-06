import { integer, NV } from "./utils";
import { CommandSequence } from "./command";



export class Task {
  name = new NV<string>('name');
  priorityOverride = new NV<integer>('priority');
  dependencies = new NV<TaskDependency[]>('depends_on');
  commands = new NV<CommandSequence>('commands');
}