import {flags} from '@oclif/command';
import {join} from 'path';
import {readdirSync, lstatSync, existsSync} from 'fs';
import {SfdxCommand, core} from '@salesforce/command';

core.Messages.importMessagesDirectory(join(__dirname, '..', '..'));
const messages = core.Messages.loadMessages('@desynit/dsy-sfdx-plugins', 'source-move');

/**
 * TODO 
 * 
 * It may actually be easier to just figure out how to re-scan the directory rather than replacing entries, but you know!
 * 
 * OR
 * 
 * Maybe we could take the path and do a find and replace?
 * 
 * OR
 * 
 * We could make it more like a move command, with a from-to setup that updates the filepaths in sources files too. 
 * That would work. 
 */

export class PushAndTest extends SfdxCommand {
    public static examples = [
        '$ sfdx dsy:source:move -s force-app/default/main/classes/wrong/directory -d force-app/default/main/classes/correct/directory'
    ];
    public static args = []; // No default args (I think)

    protected static flagsConfig = {
        // @TODO: copy in the push flags AND the test flags from the SFDX commands...
    };

    // Comment this out if your command does not require an org username
    //protected static requiresUsername = true;

    // Comment this out if your command does not support a hub org username
    // protected static supportsDevhubUsername = true;

    // I think it's a good idea to restrict this command to being run in an SFDX project folder,
    // though perhaps we could allow this decision to be overridden with a flag.
    //protected static requiresProject = true;

    public async run(): Promise<any> { // tslint:disable-line:no-any
        
        // Return an object to be displayed with --json
        return {  };
    }
}