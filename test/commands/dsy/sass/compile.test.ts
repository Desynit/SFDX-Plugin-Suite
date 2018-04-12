import { expect, test } from '@salesforce/command/dist/test';

describe('dsy:sass:compile', () => {
  test
    .stdout()
    .command(['dsy:sass:compile'])
    .it('runs dsy:sass:compile', (ctx) => {
      // TODO - actually assert some things - read the outputted css files, check it's contents, and then clean it up
    });
});
