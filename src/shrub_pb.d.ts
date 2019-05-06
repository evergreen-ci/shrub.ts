// package: shrub
// file: src/shrub.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

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

  getEnvMap(): jspb.Map<string, string>;
  clearEnvMap(): void;
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
    envMap: Array<[string, string]>,
  }
}

