dsy-sfdx-cli-plugins
===

A suite of useful plugins for the SFDX CLI created and maintained by Desynit Limited

[![Version](https://img.shields.io/npm/v/dsy-sfdx-cli-plugins.svg)](https://npmjs.org/package/dsy-sfdx-cli-plugins)
[![CircleCI](https://circleci.com/gh/squibobblepants/dsy-sfdx-cli-plugins-sfdx-plugins/tree/master.svg?style=shield)](https://circleci.com/gh/squibobblepants/dsy-sfdx-cli-plugins-sfdx-plugins/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/squibobblepants/dsy-sfdx-cli-plugins-sfdx-plugins?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/dsy-sfdx-cli-plugins-sfdx-plugins/branch/master)
[![Codecov](https://codecov.io/gh/squibobblepants/dsy-sfdx-cli-plugins-sfdx-plugins/branch/master/graph/badge.svg)](https://codecov.io/gh/squibobblepants/dsy-sfdx-cli-plugins-sfdx-plugins)
[![Greenkeeper](https://badges.greenkeeper.io/squibobblepants/dsy-sfdx-cli-plugins-sfdx-plugins.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/squibobblepants/dsy-sfdx-cli-plugins-sfdx-plugins/badge.svg)](https://snyk.io/test/github/squibobblepants/dsy-sfdx-cli-plugins-sfdx-plugins)
[![Downloads/week](https://img.shields.io/npm/dw/dsy-sfdx-cli-plugins.svg)](https://npmjs.org/package/dsy-sfdx-cli-plugins)
[![License](https://img.shields.io/npm/l/dsy-sfdx-cli-plugins.svg)](https://github.com/squibobblepants/dsy-sfdx-cli-plugins-sfdx-plugins/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g dsy-sfdx-cli-plugins
$ dsy-sfdx-cli-plugins COMMAND
running command...
$ dsy-sfdx-cli-plugins (-v|--version|version)
dsy-sfdx-cli-plugins/0.0.0 win32-x64 node-v8.11.1
$ dsy-sfdx-cli-plugins --help [COMMAND]
USAGE
  $ dsy-sfdx-cli-plugins COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [dsy-sfdx-cli-plugins hello:org [FILE]](#dsy-sfdx-cli-plugins-helloorg-file)

## dsy-sfdx-cli-plugins hello:org [FILE]

Prints a greeting and your org id(s)!

```
USAGE
  $ dsy-sfdx-cli-plugins hello:org [FILE]

OPTIONS
  -f, --force
  -n, --name=name                                  name to print
  -u, --targetusername=targetusername              username or alias for the target org; overrides default target org
  -v, --targetdevhubusername=targetdevhubusername  username or alias for the dev hub org; overrides default dev hub org
  --apiversion=apiversion                          override the api version used for api requests made by this command
  --json                                           format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)   logging level for this command invocation

EXAMPLES
  $ sfdx hello:org --targetusername myOrg@example.com --targetdevhubusername devhub@org.com
     Hello world! This is org: MyOrg and I will be around until Tue Mar 20 2018!
     My hub org id is: 00Dxx000000001234
  

  $ sfdx hello:org --name myname --targetusername myOrg@example.com
     Hello myname! This is org: MyOrg and I will be around until Tue Mar 20 2018!
```

_See code: [src/commands/hello/org.ts](https://github.com/squibobblepants/dsy-sfdx-cli-plugins-sfdx-plugins/blob/v0.0.0/src/commands/hello/org.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
