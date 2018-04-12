import {flags} from '@oclif/command';
import {join} from 'path';
import {readdirSync, lstatSync, existsSync} from 'fs';
import {SfdxCommand, core} from '@salesforce/command';

core.Messages.importMessagesDirectory(join(__dirname, '..', '..'));
const messages = core.Messages.loadMessages('@desynit/dsy-sfdx-plugins', 'find-and-compile');

export class FindAndCompile extends SfdxCommand {
    public static examples = [
        '$ sfdx dsy:sass:compile --path ./force-app/main/default/aura/ --recursive'
    ];
    public static args = []; // No default args (I think)

    protected static flagsConfig = {
        // flag with a value (-n, --name=VALUE)
        path: flags.string({char: 'p', description: messages.getMessage('pathFlagDescription')}),
        recursive: flags.boolean({char: 'r', description: messages.getMessage('recursiveFlagDescription')})
    };

    // Comment this out if your command does not require an org username
    // protected static requiresUsername = true;

    // Comment this out if your command does not support a hub org username
    // protected static supportsDevhubUsername = true;

    // I think it's a good idea to restrict this command to being run in an SFDX project folder,
    // though perhaps we could allow this decision to be overridden with a flag.
    protected static requiresProject = true;

    // This needs to be overridden / set
    public extensions: string[];
    public extensionPattern: RegExp;

    public async run(): Promise<any> { // tslint:disable-line:no-any
        // Default to the current directory
        const path = this.flags.path || '.';

        // If the folder doesn't exist, bail right now
        if (!existsSync(path)) {
            this.error(new Error(`Folder does not exist: ${ path }`));
        }
        // If our file extension(s) haven't been specified, bail right now
        if (this.extensions == null) {
            this.error(new Error('Filename extensions must be specified'));
        }

        // Set our RegExp just once
        this.extensionPattern = new RegExp('\\.(' + this.extensions.join('|') + ')$');

        // Find some files and compile them
        this.findFilesByExtension(path, this.flags.recursive, this.compileFile);

        // Return an object to be displayed with --json
        return { path };
    }

    protected findFilesByExtension = (startFolder: string, recursive: boolean, callback: (filepath: string, filename: string) => void) => {
        const files = readdirSync(startFolder);
        files.forEach((filename) => {
            const filepath = join(startFolder, filename);
            const stat = lstatSync(filepath);

            if (stat.isDirectory() && recursive) {
                // If the file we are looking at is a directory, and we have chosen to recurse, do so now
                this.findFilesByExtension(filepath, recursive, callback);
            } else if (this.extensionPattern.test(filepath)) {
                // If the matches the extension, do the callback
                callback(filepath, filename);
            }
        });
    }

    protected compileFile = (filepath: string, filename: string) => {
        const self = this; // for the callback
        // This is a stub, so error if we get here
        self.error(new Error('NotImplemented: you must override compileFile'));
    }
}
