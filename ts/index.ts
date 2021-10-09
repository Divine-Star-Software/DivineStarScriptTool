#! /usr/bin/env node
/** 
 * ![](https://divinestarapparel.com/wp-content/uploads/2021/02/logo-small.png)
# &#9733; Divine Star Script Tool &#9733;

@author Luke Johnson
@since 9-19-2021
@version 0.0.1
*/

declare const dsLog: DSLogger;
import { ImportDependencies } from "./init/ImportDependencies.js";
import "./init/ImportHelpers.js";
import "./init/ImportCommands.js";
import { GetConfigDataTemplate } from "./Helpers/GetConfigDataTemplate.js";

const yargs = require("yargs");
(global as any).yargs = yargs;
const options = yargs
  .usage(
    `This program requires a config file to run. You can create a default config file by running the program with the "--cc" flag.`
  )
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
  })
  .option("i", {
    alias: "info",
    describe: "Get program info.",
    type: "boolean",
    demandOption: false,
  }).argv;

let DOING = "";

const dependencies: Dependencies = {
  NEEDFS: false,
  NEEDFSEXTRA: false,
  NEEDRFSWATCH: false,
  NEEDRDL: false,
  NEEDPROMPT: false,
};
if (options["i"]) {
  DOING = "VERSION";
}
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

ImportDependencies(dependencies);

if (DOING == "") {
  dsLog
    .splashScreen()
    .show(
      "No option selected. Run with --help to learn how to use this program.",
      "Raw"
    );
  process.exit(1);
}
if (DOING == "VERSION") {
  var pjson = require("../package.json");
  //author
  dsLog
    .splashScreen()
    .show(`Version : ${pjson.version}`, "Info")
    .show(`Author : ${pjson.author}`, "Info")
    .show(`License : ${pjson.license}`, "Info");
  process.exit(1);
}

if (DOING == "CREATECONFIG") {
  try {
    const data = GetConfigDataTemplate();
    (async () => {
      dsLog
        .splashScreen()
        .sleep(500)
        .showSleep("Creating default config file.", "Info");
      await fs.writeFile("./.dsconfig", data);
      dsLog.showSleep("Config was created", "Good");
      process.exit(1);
    })();
  } catch (error: any) {
    console.log(error.message);
    process.exit(0);
  }
} else {
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
