import { expect, test } from '@salesforce/command/dist/test';

describe('dsy:less:compile', () => {
  test
    .stdout()
    .command(['dsy:less:compile'])
    .it('runs dsy:less:compile', (ctx) => {
      // TODO - actually assert some things - read the outputted css file, check it's contents, and then clean it up
    });
});
