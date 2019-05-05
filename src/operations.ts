/**
 * Name and Value pair. Stores the value along with its JSON name.
 */
class NV<T> {
  value?: T;
  constructor(public jsonName: string) {}
}

export class CmdExec {
  background = new NV<boolean>('background');
  silent = new NV<boolean>('silent');
  continueOnErr = new NV<boolean>('continue_on_err');
}
