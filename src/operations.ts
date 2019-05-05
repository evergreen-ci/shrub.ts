/**
 * Name and Value pair. Stores the value along with its JSON name.
 */
class NV<T> {
  v?: T; // shorthand for value.
  constructor(public jsonName: string) {}
}

export class CmdExec {
  background = new NV<boolean>('background');
  silent = new NV<boolean>('silent');
  continueOnErr = new NV<boolean>('continue_on_err');
}
