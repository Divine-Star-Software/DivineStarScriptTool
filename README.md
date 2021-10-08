<h1 align="center">
 &#9733; Divine Star Script Tool &#9733;
</h1>

---

<p align="center">
<img src="https://divinestarapparel.com/wp-content/uploads/2021/02/logo-small.png"/>
</p>


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
![yargs](https://img.shields.io/github/package-json/dependency-version/lucasdamianjohnson/DivineStarScriptTool/yargs)
![dslog](https://img.shields.io/github/package-json/dependency-version/lucasdamianjohnson/DivineStarScriptTool/dslog)
## What It Does
This is a tool to create different versions of scripts. Simply it lets you define different code sections with a unqiue comment and either include or remove those
code sections to create different versions. You define where you want the tool to pull scripts from and where you want the scripts to be put.

### How does it work?

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
After that it pretty simple to use. There is only three commands. 
```console
#Generate default config file
dsst --cc
#Parse and deploy scripts
dsst -p
#Watch for changes and auto parse and deploy scripts
dsst -a
```
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

* __dir__ => The directory to pull scripts from.
* __fileExtensions__ => The file extensions to include.
* __id__ => An idea to identify the source. Must be unique.

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

It is an array that takes objects with 3 properities. 

* __dir__ => The directory to put scripts.
* __sourceID__ => The id for the source to pull scripts from.
* __codeSection__ => An array of strings of code sections to include.
  * Can also be string value of "all" to include all sections or "none" to remove all code sections. 
* __keepComments__ A boolean if set to false it will remove comments from the exported scripts. 

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

* __start__ => The unique starting string for a code section.
* __end__ => The unique ending string for a code section.

## Uses

* Create different versions of the same program for different environments.
* Create auto backups of scripts.
* Create development and testing versions. 
* Use the same code base for multiple projects and have them auto sync.
* Detect file changes and auto copy changed files to a different location.

