import {join} from 'path';
import {readFileSync, writeFileSync} from 'fs';
import {core} from '@salesforce/command';
import { FindAndCompile } from '../../../lib/find-compile';
import less = require('less'); // Import less the old fashioned way

core.Messages.importMessagesDirectory(join(__dirname, '..', '..', '..'));
const messages = core.Messages.loadMessages('dsy-sfdx-plugins', 'less-compile');

export default class LessCompile extends FindAndCompile {

    public static description = messages.getMessage('commandDescription');
    public static examples = [
        '$ sfdx dsy:less:compile --path ./force-app/main/default/aura/ --recursive'
    ];

    public extensions: string[] = ['less'];

    protected compileFile = (filepath: string, filename: string) => {
        const self = this; // for the callback
        const fileContents: string = readFileSync(filepath).toString();

        less.render(fileContents, function(error, output) {
            if (error != null) {
                // There was an error compiling this CSS file, error out
                self.error(new Error(`Could not compile ${ filepath }\n\n${ error }`));
            }
            // Save the CSS file with the same name but a different extension
            const cssFileName: string = filepath.replace(self.extensionPattern, '.css');
            const disclaimeredCSS: string = `/* Auto Generated from ${ filename } - make changes there, not here */\n\n${ output.css }`;
            writeFileSync(cssFileName, disclaimeredCSS); // encodes as utf-8 by default which is good
        });
    }
}
