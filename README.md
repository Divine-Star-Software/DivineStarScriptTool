<h1 align="center">
 &#9733; Divine Star Script Tool &#9733;
</h1>



<p align="center">
<img src="https://divinestarapparel.com/wp-content/uploads/2021/02/logo-small.png"/>
</p>

---
![GitHub top language](https://img.shields.io/github/languages/top/lucasdamianjohnson/DivineStarScriptTool?color=purple&style=plastic)
![GitHub repo size](https://img.shields.io/github/repo-size/lucasdamianjohnson/DivineStarScriptTool?color=purple&style=plastic)
![GitHub latest release](https://img.shields.io/github/v/release/lucasdamianjohnson/DivineStarScriptTool?color=purple&style=plastic)
![GitHub latest version](https://img.shields.io/npm/v/dsst?color=purple&style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/lucasdamianjohnson/DivineStarScriptTool?color=purple&style=plastic)
![GitHub commit actiivty](https://img.shields.io/github/commit-activity/y/lucasdamianjohnson/DivineStarScriptTool?color=purple&style=plastic)
![GitHub followers](https://img.shields.io/github/followers/lucasdamianjohnson?color=purple&style=plastic)
![GitHub stars](https://img.shields.io/github/stars/lucasdamianjohnson/DivineStarScriptTool?color=purple&style=plastic)
![GitHub watchers](https://img.shields.io/github/watchers/lucasdamianjohnson/DivineStarScriptTool?color=purple&style=plastic)

### Dependencies
![chokidar](https://img.shields.io/github/package-json/dependency-version/lucasdamianjohnson/DivineStarScriptTool/chokidar?style=plastic)
![dsCom](https://img.shields.io/github/package-json/dependency-version/lucasdamianjohnson/DivineStarScriptTool/dscom?style=plastic)

---

## What It Does
This is a tool to create different versions of scripts. Simply it lets you define different code sections with a unqiue comment and either include or remove those
code sections to create different versions. You define where you want the tool to pull scripts from and where you want the scripts to be put.

## Uses

* Create different versions of the same program for different environments.
* Create auto backups of scripts.
* Create development and testing versions. 
* Use the same code base for multiple projects and have them auto sync.
* Detect file changes and auto copy changed files to a different location.

### How does it work?

Here is a breif video on the tool:

[![youtube video](https://img.youtube.com/vi/nD-cZW4t-i0/1.jpg)](https://www.youtube.com/watch?v=nD-cZW4t-i0)

For instance if we have this simple script:
```typescript
//@ds-test-start
tester.runTest();
//@ds-test-end
//@ds-perf-start
tester.runPerfTest();
//@ds-perf-end
```
If you run the tool it will prune out the code sections and make different versions for each defined output. 

So, if you wanted a build with just performance testing code you could use this tool to do that.

Or if you were developing code that has some minor changes for either different backends or platforms you could use to have the same codebase for both versions and auto sync
the code to the different environments. 


## How To Use
---
This is a command line tool. To install this you must have node and npm installed. 
First you must install it globally on your system.
```console
npm install -g dsst
```

After that it pretty simple to use. Here are the commands:

> ### Commands

| Command | Description | 
| --------------- | --------------- |
| __dsst --cc__ | Generate a default config file |
| __dsst -p__ | Parse and deploy scripts. |
| __dsst -a__ | Watch for changes and auto parse and deploy scripts. | 
| __dsst -i__ | Get info about the program. | 
| __dsst --help__ | In case you need more info. | 



Before you can use the tool you need to set up a config file. 

Use the command "dsst --cc" to make a default one in the directory you are currently in. 

It should then generate the following file. 
```json
{
    "sources": [
        {
            "dir": "/",
            "fileExtensions": [
                ".js"
            ],
            "id": "main"
        }
    ],
    "outputs": [
        {
            "dir": "/test/",
            "sourceID": "main",
            "codeSection": [
                "test",
                "log"
            ],
            "keepComments": false
        },
        {
            "dir": "/perf/",
            "sourceID": "main",
            "codeSection": [
                "perf"
            ],
            "keepComments": false
        },
        {
            "dir": "/dev/",
            "sourceID": "main",
            "codeSection": [
                "dev"
            ],
            "keepComments": false
        },
        {
            "dir": "/backup/",
            "sourceID": "main",
            "codeSection": "All",
            "keepComments": false
        }
    ],
    "codeSections": {
        "test": {
            "start": "@ds-test-start",
            "end": "@ds-test-end"
        },
        "log": {
            "start": "@ds-test-log",
            "end": "@ds-test-log"
        },
        "perf": {
            "start": "@ds-test-perf",
            "end": "@ds-test-perf"
        },
        "dev": {
            "start": "@ds-test-dev",
            "end": "@ds-test-dev"
        }
    }
}
```
From here you can set up the config however you like. 

The next section goes over each part of the config file. 

## The Config File

The tool requires a config file to run. 

### Sources

```json
 "sources": [
        {
            "dir": "/",
            "fileExtensions": [
                ".js"
            ],
            "id": "main"
        }
    ]
```
The sources param defines all the locations in which the tool will pull scripts from. 

It is an array that takes objects with 3 properities. 

> ### Source Properties

| Property | Description | 
| --------------- | --------------- |
| __dir__ | The directory to pull scripts from. |
| __fileExtensions__ | The file extensions to include. |
| __id__ | An idea to identify the source. Must be unique. | 


### Outputs

```json
    "outputs": [
        {
            "dir": "/test/",
            "sourceID": "main",
            "codeSection": [
                "test",
                "log"
            ],
            "keepComments": false
        },
    ]
```
The outputs param defines all the locations in which the tool will put scripts and what to do with them. 

It is an array that takes objects with 4 properities. 

> ### Outputs Properties

| Property | Description | 
| --------------- | --------------- |
| __dir__ | The directory to put scripts. |
| __sourceID__ | The id for the source to pull scripts from. |
| __codeSection__* | An array of strings of code sections to include. | |
| __keepComments__ | A boolean if set to false it will remove comments from the exported scripts.  | 

*Can also be string value of "all" to include all sections or "none" to remove all code sections. 

### Sources

```json
    "codeSections": {
        "test": {
            "start": "@ds-test-start",
            "end": "@ds-test-end"
        }
    }
```
The codeSections param defines all the code sections and their delimiters. 

It is an object that has a map of the code sections. 

You define a code section by adding a new entry to the object with the following properties:

> ### Code Section Properties

| Property | Description | 
| --------------- | --------------- |
| __start__ | The unique starting string for a code section. |
| __end__ | The unique ending string for a code section. |

__NOTE:__ The script will be looking for the start or end string with "//" appened to the front. Since these tags are meant to be used in commments like this:

> //CODE_SECTION_TAG

Later there will be more options for different languages that do not suppourt comments with forward slashes. If you have any request pleasse make an issue. 

---

## Command Output
### Config Validation

If you run either the parse or auto command you will see this sequence:

```console
            .
           ,X,
          ,XOX,
    'xooooOOOOOoooox'
      `XOOOOOOOOOX`
        `XOOOOOX`
        XOOX'XOOX
       XOX'   'XOX
      X'         'X
[ Divine Star Script Tool ]
Searching for config data...
Found config data.
Validating config data.
==============================
Validating sources...
Sources are good.
Validating outputs...
Outputs are good.
Validating code sections...
Code sections are good.
Data is good.
```

This is an example of a config file that passed all the test. 

The script does some type checking and makes sure things are linked together correctly between the outputs and sources. 

This is to ensure no errors occur when running the program and to prevent potential unwanted effects. 

---

### Script Parse

If you run the script parse command and or the auto command you will see this sequence if everything went correctly. 

```console
{-----------------------------}
[ Divine Star Script Tool ]
Running Script Parse
{-----------------------------}
==============================
Searching for script source.
D:/Divine Star Games/GAMES/IRRCODERAW/js
Found folder
Starting script mapping.
==============================
Finished Script Map
Starting script pruning.
==============================
Scripts were pruned.
Starting deploying..
==============================
Scripts succesfully deployed
```
---

### Auto

If you run the auto command you will first see the parse screen and then this screen. 

```console
{-----------------------------}
[ Divine Star Script Tool ]
Running Auto Mode
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX}
{-----------------------------}
DIRECTORY_TO_WATCH
```

Once you make an update in the directory a message will appear showing that it got the update and that it parsed and deployed the file. 

It should look something like this:

```console
{-----------------------------}
[ Divine Star Script Tool ]
Running Auto Mode
|0|0|0|0|0|0XXXXXXXXXXXXXXXXXXX}
{-----------------------------}
{----==== UP TO DATE ====----}
{-----------------------------}
TIME STAMP: 10:9:1 9/10/2021
[ UPDATE ]
FILE CHANGED
---
/index.js
{-----------------------------}
```




