# SFDX Plugin Suite

A (hopefully) growing suite of (hopefully) useful plugins for the SFDX CLI created and maintained by Desynit Limited

## Setup

### Install from source

1. Install the SDFX CLI.
1. Clone the repository: `git clone git@github.com:Desynit/SFDX-Plugin-Suite.git`
1. Go into the repository: `cd SFDX-Plugin-Suite`
1. Install npm modules: `npm install`
1. Link the plugin: `sfdx plugins:link .`

### Install as plugin

1. Install plugin: `sfdx plugins:install @desynit/dsy-sfdx-plugins`

### Pre-requisites for SFDX projects

To use the less/sass compilation tools, you should ensure that sfdx does not try to push them to scratch orgs. Ensure 
that you have a `.forceignore` file in the root of your sfdx projects that contains the following (at least)

```
# Never push .less / .sass / .scss files
*.less
*.sass
*.scss
```

## Compile LESS - sfdx dsy:less:compile

Finds and compiles LESS files into CSS. 

Each LESS file that is found is compiled to CSS and then saved in the same location as the .less file, but with a .css
extension. 

Warning - *DO NOT* use `--recursive` and set the `--path` to something silly like `/` because there's nothing stopping this
plugin from finding and compiling every single LESS file on your hard drive...

```
USAGE
  $ sfdx dsy:less:compile

OPTIONS
  -r, --recursive                                  recursively through folders looking for LESS files 
  -p, --path=/path/to/source/folder                path to start looking for LESS files from
  -u, --targetusername=targetusername              username or alias for the target org; overrides default target org
  -v, --targetdevhubusername=targetdevhubusername  username or alias for the dev hub org; overrides default dev hub org
  --apiversion=apiversion                          override the api version used for api requests made by this command
  --json                                           format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)   logging level for this command invocation

EXAMPLES
  $ sfdx dsy:less:compile --path ./force-app/main/default/aura/ --recursive
```

_See code: [src/commands/dsy/less/compile.ts](https://github.com/Desynit/SFDX-Plugin-Suite/blob/v0.0.0/src/commands/dsy/less/compile.ts)_

## Compile SASS - sfdx dsy:sass:compile

Finds and compiles SASS and SCSS files into CSS

Each SASS/SCSS file that is found is compiled to CSS and then saved in the same location as the .sass/.scss file, but with a .css
extension. 

Warning - *DO NOT* use `--recursive` and set the `--path` to something silly like `/` because there's nothing stopping this
plugin from finding and compiling every single SASS/SCSS file on your hard drive...

```
USAGE
  $ sfdx dsy:sass:compile

OPTIONS
  -r, --recursive                                  recursively through folders looking for SASS/SCSS files 
  -p, --path=/path/to/source/folder                path to start looking for SASS/SCSS files from
  -u, --targetusername=targetusername              username or alias for the target org; overrides default target org
  -v, --targetdevhubusername=targetdevhubusername  username or alias for the dev hub org; overrides default dev hub org
  --apiversion=apiversion                          override the api version used for api requests made by this command
  --json                                           format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)   logging level for this command invocation

EXAMPLES
  $ sfdx dsy:sass:compile --path ./force-app/main/default/aura/ --recursive
```

_See code: [src/commands/dsy/less/compile.ts](https://github.com/Desynit/SFDX-Plugin-Suite/blob/v0.0.0/src/commands/dsy/less/compile.ts)_

<!-- commandsstop -->
<!-- debugging-your-plugin -->
## Debugging
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `dsy:less:compile` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx dsy:less:compile --recursive --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run dsy:less:compile --recursive --path /path/to/your/target
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!

## Publishing
Remember to call publish like so: `npm publish --access public` otherwise it will try to be private