import { NV } from './utils';

/**
 * Interface for environment variables, which is just a map of strings to strings.
 */
interface Env {
  [key: string]: string;
}

/**
 * Base class for CmdExec and CmdExecShell.
 */
class BaseCmdExec {
  background = new NV<boolean>('background');
  silent = new NV<boolean>('silent');
  continueOnErr = new NV<boolean>('continue_on_err');
  systemLog = new NV<boolean>('system_log');
  combineOutput = new NV<boolean>('redirect_standard_error_to_output');
  ignoreStdErr = new NV<boolean>('ignore_standard_error');
  ignoreStdOut = new NV<boolean>('ignore_standard_out');
  keepEmptyArgs = new NV<boolean>('keep_empty_args');
  workingDir = new NV<string>('working_dir');
}

export class CmdExec extends BaseCmdExec {
  command = new NV<string>('command');
  bin = new NV<string>('binary');
  args = new NV<string[]>('args');
  env = new NV<Env>('env');
}

export class CmdExecShell extends BaseCmdExec {
  script = new NV<string>('script');
}

export enum Operation {
  CmdExec = 'subprocess.exec',
  CmdExecShell = 'shell.exec',
}
