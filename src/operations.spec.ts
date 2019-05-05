import { CmdExec } from './operations';
import { serializeReplacer } from './utils';

import 'mocha';

describe('CmdExec', () => {
  it('should have required properties', () => {
    const cmd = new CmdExec();
    cmd.background.v = false;
    console.log(JSON.stringify(cmd, serializeReplacer));
  });
});
