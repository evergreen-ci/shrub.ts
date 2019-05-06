// package: shrub
// file: src/shrub.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

export class Configuration extends jspb.Message {
  getFunctionsMap(): jspb.Map<string, CommandDefinition>;
  clearFunctionsMap(): void;
  clearTasksList(): void;
  getTasksList(): Array<Task>;
  setTasksList(value: Array<Task>): void;
  addTasks(value?: Task, index?: number): Task;

  clearTaskGroupsList(): void;
  getTaskGroupsList(): Array<TaskGroup>;
  setTaskGroupsList(value: Array<TaskGroup>): void;
  addTaskGroups(value?: TaskGroup, index?: number): TaskGroup;

  clearBuildvariantsList(): void;
  getBuildvariantsList(): Array<Variant>;
  setBuildvariantsList(value: Array<Variant>): void;
  addBuildvariants(value?: Variant, index?: number): Variant;

  clearPreList(): void;
  getPreList(): Array<CommandDefinition>;
  setPreList(value: Array<CommandDefinition>): void;
  addPre(value?: CommandDefinition, index?: number): CommandDefinition;

  clearPostList(): void;
  getPostList(): Array<CommandDefinition>;
  setPostList(value: Array<CommandDefinition>): void;
  addPost(value?: CommandDefinition, index?: number): CommandDefinition;

  clearTimeoutList(): void;
  getTimeoutList(): Array<CommandDefinition>;
  setTimeoutList(value: Array<CommandDefinition>): void;
  addTimeout(value?: CommandDefinition, index?: number): CommandDefinition;

  getExecTimeoutSecs(): number;
  setExecTimeoutSecs(value: number): void;

  getBatchtime(): number;
  setBatchtime(value: number): void;

  getStepback(): boolean;
  setStepback(value: boolean): void;

  getCommandType(): string;
  setCommandType(value: string): void;

  getIgnore(): string;
  setIgnore(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Configuration.AsObject;
  static toObject(includeInstance: boolean, msg: Configuration): Configuration.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Configuration, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Configuration;
  static deserializeBinaryFromReader(message: Configuration, reader: jspb.BinaryReader): Configuration;
}

export namespace Configuration {
  export type AsObject = {
    functionsMap: Array<[string, CommandDefinition.AsObject]>,
    tasksList: Array<Task.AsObject>,
    taskGroupsList: Array<TaskGroup.AsObject>,
    buildvariantsList: Array<Variant.AsObject>,
    preList: Array<CommandDefinition.AsObject>,
    postList: Array<CommandDefinition.AsObject>,
    timeoutList: Array<CommandDefinition.AsObject>,
    execTimeoutSecs: number,
    batchtime: number,
    stepback: boolean,
    commandType: string,
    ignore: string,
  }
}

export class CommandDefinition extends jspb.Message {
  getFunc(): string;
  setFunc(value: string): void;

  getType(): string;
  setType(value: string): void;

  getDisplayName(): string;
  setDisplayName(value: string): void;

  getCommand(): string;
  setCommand(value: string): void;

  clearVariantsList(): void;
  getVariantsList(): Array<string>;
  setVariantsList(value: Array<string>): void;
  addVariants(value: string, index?: number): string;

  getTimeoutSecs(): number;
  setTimeoutSecs(value: number): void;

  getParamsMap(): jspb.Map<string, google_protobuf_struct_pb.Struct>;
  clearParamsMap(): void;
  getVarsMap(): jspb.Map<string, string>;
  clearVarsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommandDefinition.AsObject;
  static toObject(includeInstance: boolean, msg: CommandDefinition): CommandDefinition.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CommandDefinition, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommandDefinition;
  static deserializeBinaryFromReader(message: CommandDefinition, reader: jspb.BinaryReader): CommandDefinition;
}

export namespace CommandDefinition {
  export type AsObject = {
    func: string,
    type: string,
    displayName: string,
    command: string,
    variantsList: Array<string>,
    timeoutSecs: number,
    paramsMap: Array<[string, google_protobuf_struct_pb.Struct.AsObject]>,
    varsMap: Array<[string, string]>,
  }
}

export class Variant extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getDisplayName(): string;
  setDisplayName(value: string): void;

  getBatchtime(): number;
  setBatchtime(value: number): void;

  clearTasksList(): void;
  getTasksList(): Array<TaskSpec>;
  setTasksList(value: Array<TaskSpec>): void;
  addTasks(value?: TaskSpec, index?: number): TaskSpec;

  clearRunOnList(): void;
  getRunOnList(): Array<string>;
  setRunOnList(value: Array<string>): void;
  addRunOn(value: string, index?: number): string;

  getExpansionsMap(): jspb.Map<string, google_protobuf_struct_pb.Struct>;
  clearExpansionsMap(): void;
  clearDisplayTasksList(): void;
  getDisplayTasksList(): Array<DisplayTaskDefinition>;
  setDisplayTasksList(value: Array<DisplayTaskDefinition>): void;
  addDisplayTasks(value?: DisplayTaskDefinition, index?: number): DisplayTaskDefinition;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Variant.AsObject;
  static toObject(includeInstance: boolean, msg: Variant): Variant.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Variant, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Variant;
  static deserializeBinaryFromReader(message: Variant, reader: jspb.BinaryReader): Variant;
}

export namespace Variant {
  export type AsObject = {
    name: string,
    displayName: string,
    batchtime: number,
    tasksList: Array<TaskSpec.AsObject>,
    runOnList: Array<string>,
    expansionsMap: Array<[string, google_protobuf_struct_pb.Struct.AsObject]>,
    displayTasksList: Array<DisplayTaskDefinition.AsObject>,
  }
}

export class DisplayTaskDefinition extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  clearExecutionTasksList(): void;
  getExecutionTasksList(): Array<string>;
  setExecutionTasksList(value: Array<string>): void;
  addExecutionTasks(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DisplayTaskDefinition.AsObject;
  static toObject(includeInstance: boolean, msg: DisplayTaskDefinition): DisplayTaskDefinition.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DisplayTaskDefinition, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DisplayTaskDefinition;
  static deserializeBinaryFromReader(message: DisplayTaskDefinition, reader: jspb.BinaryReader): DisplayTaskDefinition;
}

export namespace DisplayTaskDefinition {
  export type AsObject = {
    name: string,
    executionTasksList: Array<string>,
  }
}

export class TaskSpec extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getStepback(): boolean;
  setStepback(value: boolean): void;

  clearDistroList(): void;
  getDistroList(): Array<string>;
  setDistroList(value: Array<string>): void;
  addDistro(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TaskSpec.AsObject;
  static toObject(includeInstance: boolean, msg: TaskSpec): TaskSpec.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TaskSpec, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TaskSpec;
  static deserializeBinaryFromReader(message: TaskSpec, reader: jspb.BinaryReader): TaskSpec;
}

export namespace TaskSpec {
  export type AsObject = {
    name: string,
    stepback: boolean,
    distroList: Array<string>,
  }
}

export class TaskDependency extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getVariant(): string;
  setVariant(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TaskDependency.AsObject;
  static toObject(includeInstance: boolean, msg: TaskDependency): TaskDependency.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TaskDependency, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TaskDependency;
  static deserializeBinaryFromReader(message: TaskDependency, reader: jspb.BinaryReader): TaskDependency;
}

export namespace TaskDependency {
  export type AsObject = {
    name: string,
    variant: string,
  }
}

export class Task extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getPriority(): number;
  setPriority(value: number): void;

  clearDependsOnList(): void;
  getDependsOnList(): Array<TaskDependency>;
  setDependsOnList(value: Array<TaskDependency>): void;
  addDependsOn(value?: TaskDependency, index?: number): TaskDependency;

  clearCommandsList(): void;
  getCommandsList(): Array<CommandDefinition>;
  setCommandsList(value: Array<CommandDefinition>): void;
  addCommands(value?: CommandDefinition, index?: number): CommandDefinition;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Task.AsObject;
  static toObject(includeInstance: boolean, msg: Task): Task.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Task, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Task;
  static deserializeBinaryFromReader(message: Task, reader: jspb.BinaryReader): Task;
}

export namespace Task {
  export type AsObject = {
    name: string,
    priority: number,
    dependsOnList: Array<TaskDependency.AsObject>,
    commandsList: Array<CommandDefinition.AsObject>,
  }
}

export class TaskGroup extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getMaxHosts(): number;
  setMaxHosts(value: number): void;

  clearSetupGroupList(): void;
  getSetupGroupList(): Array<CommandDefinition>;
  setSetupGroupList(value: Array<CommandDefinition>): void;
  addSetupGroup(value?: CommandDefinition, index?: number): CommandDefinition;

  clearSetupTaskList(): void;
  getSetupTaskList(): Array<CommandDefinition>;
  setSetupTaskList(value: Array<CommandDefinition>): void;
  addSetupTask(value?: CommandDefinition, index?: number): CommandDefinition;

  clearTasksList(): void;
  getTasksList(): Array<string>;
  setTasksList(value: Array<string>): void;
  addTasks(value: string, index?: number): string;

  clearTeardownTasksList(): void;
  getTeardownTasksList(): Array<CommandDefinition>;
  setTeardownTasksList(value: Array<CommandDefinition>): void;
  addTeardownTasks(value?: CommandDefinition, index?: number): CommandDefinition;

  clearTeardownGroupsList(): void;
  getTeardownGroupsList(): Array<CommandDefinition>;
  setTeardownGroupsList(value: Array<CommandDefinition>): void;
  addTeardownGroups(value?: CommandDefinition, index?: number): CommandDefinition;

  clearTimeoutList(): void;
  getTimeoutList(): Array<CommandDefinition>;
  setTimeoutList(value: Array<CommandDefinition>): void;
  addTimeout(value?: CommandDefinition, index?: number): CommandDefinition;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TaskGroup.AsObject;
  static toObject(includeInstance: boolean, msg: TaskGroup): TaskGroup.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TaskGroup, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TaskGroup;
  static deserializeBinaryFromReader(message: TaskGroup, reader: jspb.BinaryReader): TaskGroup;
}

export namespace TaskGroup {
  export type AsObject = {
    name: string,
    maxHosts: number,
    setupGroupList: Array<CommandDefinition.AsObject>,
    setupTaskList: Array<CommandDefinition.AsObject>,
    tasksList: Array<string>,
    teardownTasksList: Array<CommandDefinition.AsObject>,
    teardownGroupsList: Array<CommandDefinition.AsObject>,
    timeoutList: Array<CommandDefinition.AsObject>,
  }
}

