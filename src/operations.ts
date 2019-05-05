import { NV } from "./utils";

export class CmdExec {
  background = new NV<boolean>('background');
  silent = new NV<boolean>('silent');
  continueOnErr = new NV<boolean>('continue_on_err');
}
