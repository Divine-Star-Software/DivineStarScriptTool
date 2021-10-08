#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImportDependencies_js_1 = require("./init/ImportDependencies.js");
require("./init/ImportHelpers.js");
require("./init/ImportCommands.js");
const GetConfigDataTemplate_js_1 = require("./Helpers/GetConfigDataTemplate.js");
const yargs = require("yargs");
global.yargs = yargs;
const options = yargs
    .usage(`This program requires a config file to run. You can create a default config file by running the program with the "--cc" flag.`)
    .option("a", {
    alias: "auto",
    describe: "Auto deploy and parse scripts.",
    type: "boolean",
    demandOption: false,
})
    .option("p", {
    alias: "parse",
    describe: "Parse and deploy scripts.",
    type: "boolean",
    demandOption: false,
})
    .option("cc", {
    alias: "create-config",
    describe: "Create a default config file in the current directory.",
    type: "boolean",
    demandOption: false,
}).argv;
let DOING = "";
const dependencies = {
    NEEDFS: false,
    NEEDFSEXTRA: false,
    NEEDRFSWATCH: false,
    NEEDRDL: false,
    NEEDPROMPT: false,
};
if (options["a"]) {
    DOING = "AUTO";
    dependencies.NEEDFS = true;
    dependencies.NEEDRFSWATCH = true;
    dependencies.NEEDFSEXTRA = true;
    dependencies.NEEDRDL = true;
}
if (options["p"]) {
    DOING = "PARSE";
    dependencies.NEEDFS = true;
    dependencies.NEEDRDL = true;
}
if (options["cc"]) {
    DOING = "CREATECONFIG";
    dependencies.NEEDFS = true;
    //dependencies.NEEDPROMPT = true;
    dependencies.NEEDRDL = true;
}
if (DOING == "") {
    dependencies.NEEDRDL = true;
}
ImportDependencies_js_1.ImportDependencies(dependencies);
if (DOING == "") {
    dsLog
        .splashScreen()
        .show("No option selected. Run with --help to learn how to use this program.", "Raw");
    process.exit(0);
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
process.on("beforeExit", (code) => {
    // console.clear();
});
process.on("exit", (code) => {
    // console.clear();
});
process.on("SIGINT", function () {
    console.clear();
    process.exit();
});
