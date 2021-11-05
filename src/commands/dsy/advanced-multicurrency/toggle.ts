import {flags} from '@salesforce/command';
import {core, SfdxCommand, FlagsConfig } from "@salesforce/command";
import {join} from 'path';
import * as puppeteer from "puppeteer";

// Initialise Messages with current Directory
core.Messages.importMessagesDirectory(join(__dirname, '..', '..', '..'));
const messages = core.Messages.loadMessages('@desynit/dsy-sfdx-plugins', 'advanced-multicurrency');

export default class EnableAdvancedMulticurrencySupport extends SfdxCommand {

    public static description = messages.getMessage('commandDescription');
    public static examples = [
        '$ sfdx dsy:advanced-currency:enable'
    ];

    protected static flagsConfig:FlagsConfig = {
        // flag with a value (-n, --name=VALUE)
        verbose: flags.builtin()
    };

    // Comment this out if your command does not require an org username
    protected static requiresUsername = true;

    // Comment this out if your command does not support a hub org username
    protected static supportsDevhubUsername = false;

    // I think it's a good idea to restrict this command to being run in an SFDX project folder,
    // though perhaps we could allow this decision to be overridden with a flag.
    protected static requiresProject = true;

    public async run(): Promise<any> {
        let result = await this.enableAdvancedMultiCurrency();
        return result;
    }

    private async enableAdvancedMultiCurrency() {
        const instanceUrl = this.org.getConnection().instanceUrl;
        const ADVANCED_MULTICURRENCY_PAGE = "/_ui/system/organization/AdvancedCurrencyEnable?isdtp=p1";
        // Fire up a headless browser
        const browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: !(process.env.BROWSER_DEBUG === "true")
        });
        
        // Get a page
        const page = await browser.newPage();
        // Access the site via the front door token
        await page.goto(
            `${instanceUrl}/secur/frontdoor.jsp?sid=${this.org.getConnection().accessToken}`,
            { waitUntil: ["domcontentloaded", "networkidle0"] }
        )

        this.debug("Opening advanced currency management confirm page");
        const navigationPromise = page.waitForNavigation();
        await page.goto(`${instanceUrl + ADVANCED_MULTICURRENCY_PAGE}`);
        await navigationPromise;

        // Confirm that we wish to enable multicurrency support
        this.debug("Clicking the 'Yes, I want to enable Advanced Currency Management.' checkbox");
        await page.click(
            'input[id="enable"]'
        );
        
        // Click the enable button
        this.debug("Clicking the enable button");
        await page.click(
            'input[name="enableButton"]'
        );
        await navigationPromise;

        // Close the browser
        browser.close();
        return "success";
    }
}
