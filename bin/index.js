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
const dsLog = require("dslog");
global.dsLog = dsLog;
dsLog.defineProgramTitle("[ Divine Star Script Tool ]").defineSplashScreen(() => {
    dsLog.newScreen().show(dsLog.getString("star"), "Raw").logProgramTitle();
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
    dsLog
        .defineHelpText('This program requires a config file to run. You can create a default config file by running the program with the "--cc" flag.')
        .addParam({
        flag: "a",
        name: "auto",
        desc: "Auto deploy and parse scripts.",
        type: "boolean"
    })
        .addParam({
        flag: "p",
        name: "parse",
        desc: "Parse and deploy scripts.",
        type: "boolean"
    })
        .addParam({
        flag: "cc",
        name: "create-config",
        desc: "Create a default config file in the current directory.",
        type: "boolean"
    })
        .addParam({
        flag: "i",
        name: "info",
        desc: "Get program info",
        type: "boolean"
    });
    (await dsLog.initProgramInput())
        .ifParamIsset("i", (value, args) => {
        DOING = "VERSION";
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
    if (DOING == "") {
    }
    ImportDependencies_js_1.ImportDependencies(dependencies);
    if (DOING == "") {
        dsLog
            .splashScreen()
            .show("No option selected. Run with --help to learn how to use this program.", "Raw");
        process.exit(1);
    }
    if (DOING == "VERSION") {
        var pjson = require("../package.json");
        //author
        dsLog
            .splashScreen()
            .show(`Version : ${pjson.version}`, "Info")
            .show(`Author : Divine Star`, "Info")
            .show(`License : ${pjson.license}`, "Info");
        process.exit(1);
    }
    if (DOING == "CREATECONFIG") {
        try {
            const data = GetConfigDataTemplate_js_1.GetConfigDataTemplate();
            (async () => {
                dsLog
                    .splashScreen()
                    .sleep(500)
                    .showSleep("Creating default config file.", "Info");
                await fs.writeFile("./.dsconfig", data);
                dsLog.showSleep("Config was created", "Good");
                process.exit(1);
            })();
        }
        catch (error) {
            console.log(error.message);
            process.exit(0);
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
        console.clear();
        process.exit();
    });
})();
