import {join} from 'path';
import {readFileSync, writeFileSync} from 'fs';
import {core} from '@salesforce/command';
import { FindAndCompile } from '../../../lib/find-compile';

var sass = require('sass'); // Import less the old fashioned way

core.Messages.importMessagesDirectory(join(__dirname, '..', '..', '..'));
const messages = core.Messages.loadMessages('dsy-sfdx-plugins', 'sass-compile');

export default class LessCompile extends FindAndCompile {

    public static description = messages.getMessage('commandDescription');
    public extensions:string[] = ["scss", "sass"];

    public static examples = [
        `$ sfdx dsy:sass:compile --path ./force-app/main/default/aura/ --recursive`
    ];

    protected compileFile = (filepath:string, filename:string) => {
        let self = this; // for the callback
        //let fileContents:string = readFileSync(filepath).toString();
        sass.render({file: filepath}, function(error, output) { 
            if (error != null) {
                // There was an error compiling this CSS file, error out
                self.error(new Error(`Could not compile ${ filepath }\n\n${ error }`));
            }
            let cssFileName:string = filepath.replace(self.extensionPattern, ".css");
            let disclaimeredCSS:string = `/* Auto Generated from ${ filename } - make changes there, not here */\n\n${ output.css }`;
            writeFileSync(cssFileName, disclaimeredCSS); // encodes as utf-8 by default which is good
        });
    }
  
}
