#! /usr/bin/env node
"use strict";
/**
 * ![](https://divinestarapparel.com/wp-content/uploads/2021/02/logo-small.png)
# &#9733; Divine Star Script Tool &#9733;

@author Luke Johnson
@since 9-19-2021
@version 1.0.5
*/
Object.defineProperty(exports, "__esModule", { value: true });
const ImportDependencies_js_1 = require("./init/ImportDependencies.js");
require("./init/ImportHelpers.js");
require("./init/ImportCommands.js");
const GetConfigDataTemplate_js_1 = require("./Helpers/GetConfigDataTemplate.js");
const dsCom = require("dscom");
global.dsCom = dsCom;
dsCom
    .defineProgramTitle("[ Divine Star Script Tool ]")
    .defineSplashScreen(() => {
    dsCom.newScreen().show(dsCom.getString("star"), "Raw").logProgramTitle();
});
(async () => {
    let DOING = "";
    const dependencies = {
        NEEDFS: false,
        NEEDFSEXTRA: false,
        NEEDRFSWATCH: false,
        NEEDRDL: false,
        NEEDPROMPT: false,
    };
    let configFileName = ".dsconfig";
    dsCom
        .defineSleepTime(10)
        .defineHelpText('This program requires a config file to run. You can create a default config file by running the program with the "--cc" flag.')
        .addParam({
        flag: "c",
        name: "config-file",
        desc: "Override the default config file name for running the tool.",
        type: "string",
    })
        .addParam({
        flag: "a",
        name: "auto",
        desc: "Auto deploy and parse scripts.",
        type: "boolean",
    })
        .addParam({
        flag: "p",
        name: "parse",
        desc: "Parse and deploy scripts.",
        type: "boolean",
    })
        .addParam({
        flag: "cc",
        name: "create-config",
        desc: "Create a default config file in the current directory.",
        type: "boolean",
    })
        .addParam({
        flag: "i",
        name: "info",
        desc: "Get program info",
        type: "boolean",
    });
    (await dsCom.initProgramInput())
        .ifParamIsset("i", (value, args) => {
        DOING = "VERSION";
        return true;
    })
        .ifParamIsset("config-file", (value, args) => {
        configFileName = value;
        return true;
    })
        .ifParamIsset("auto", (value, args) => {
        DOING = "AUTO";
        dependencies.NEEDFS = true;
        dependencies.NEEDRFSWATCH = true;
        dependencies.NEEDFSEXTRA = true;
        return true;
    })
        .ifParamIsset("p", (value, args) => {
        DOING = "PARSE";
        dependencies.NEEDFS = true;
        return true;
    })
        .ifParamIsset("cc", (value, args) => {
        DOING = "CREATECONFIG";
        dependencies.NEEDFS = true;
        return true;
    });
    (0, ImportDependencies_js_1.ImportDependencies)(dependencies);
    if (DOING == "") {
        dsCom
            .splashScreen()
            .show("No option selected. Run with --help to learn how to use this program.", "Raw");
        process.exit(1);
    }
    if (DOING == "VERSION") {
        var pjson = require("../package.json");
        //author
        dsCom
            .splashScreen()
            .show(`Version : ${pjson.version}`, "Info")
            .show(`Author : Divine Star`, "Info")
            .show(`License : ${pjson.license}`, "Info");
        process.exit(1);
    }
    if (DOING == "CREATECONFIG") {
        try {
            const data = (0, GetConfigDataTemplate_js_1.GetConfigDataTemplate)();
            (async () => {
                dsCom
                    .splashScreen()
                    .sleep(500)
                    .showSleep("Creating default config file.", "Info");
                await fs.writeFile(`./${configFileName}`, data);
                dsCom.showSleep("Config was created", "Good");
                process.exit(1);
            })();
        }
        catch (error) {
            dsCom.ERROR.show(error.message).exit();
        }
    }
    else {
        //The functions below require the config data.
        (async () => {
            //Get and validate the config data
            const configData = await StartSequence();
            if (DOING == "AUTO") {
                Auto(configData);
            }
            if (DOING == "PARSE") {
                ScriptParse(configData);
            }
        })();
    }
    process.on("SIGINT", function () {
        dsCom.CLEAR.exit();
    });
})();
