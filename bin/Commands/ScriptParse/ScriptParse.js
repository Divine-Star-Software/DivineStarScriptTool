"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptParse = void 0;
const PruneScriptMap_js_1 = require("../../Helpers/ScriptMap/PruneScriptMap.js");
let codeSections = {};
const neededSections = new Map();
const scriptMaps = new Map();
let totalSources = 0;
/**
# Script Parse
---
Parse the scripts and move them to the needed location.

@author Luke Johnson
@since 9-19-2021
@version 1.0.5
*/
async function ScriptParse(data) {
    await titleTop();
    totalSources = data.sources.length;
    codeSections = data.codeSections;
    const sourceMap = {};
    data.sources.forEach((s) => {
        sourceMap[s.id] = [];
    });
    data.outputs.forEach((o) => {
        sourceMap[o.sourceID].push(o);
        if (!neededSections.get(o.codeSection)) {
            neededSections.set(o.codeSection, true);
        }
    });
    const proms = [];
    for (let s of data.sources) {
        await initParse(s, sourceMap[s.id]);
        dsCom.setRow(5).clearRows(5, 20);
    }
    dsCom.showSleep("All scripts parsed and deployed.", "Good", 500).newScreen();
}
exports.ScriptParse = ScriptParse;
async function initParse(source, outputs) {
    const dir = source.dir;
    dsCom.show("Searching for script source.", "Info").show(source.dir, "Raw");
    try {
        //find folder
        await fs.access(dir);
        dsCom
            .showSleep("Found folder", "Good", 200)
            .show("Starting script mapping.", "Info")
            .newProgressBar(`${dir}-map`);
        //create script map
        const scriptMap = await ComposeScriptMap(dir, source.fileExtensions);
        (await dsCom.incrementProgressBar("parse", ((1 / totalSources) * 100) / 3))
            .showSleep("Finished Script Map", "Good", 200)
            .show("Starting script pruning.", "Info")
            .newProgressBar(`${dir}-prune`);
        const numSections = neededSections.size;
        for (let c of neededSections.keys()) {
            const mapCopy = JSON.parse(JSON.stringify(scriptMap));
            const codeSectionsArray = [];
            if (Array.isArray(c)) {
                Object.keys(codeSections).forEach((cs) => {
                    if (c.indexOf(cs) == -1) {
                        codeSectionsArray.push(codeSections[cs]);
                    }
                });
            }
            if (c === "none" || c === "None") {
                Object.keys(codeSections).forEach((cs) => {
                    codeSectionsArray.push(codeSections[cs]);
                });
            }
            if (c === "all" || c === "All") {
            }
            const newMap = await (0, PruneScriptMap_js_1.PruneScriptMap)(mapCopy, codeSectionsArray);
            scriptMaps.set(c, newMap);
            await dsCom.incrementProgressBar(`${dir}-prune`, (1 / numSections) * 100);
        }
        (await dsCom.incrementProgressBar("parse", ((1 / totalSources) * 100) / 3))
            .show(`Scripts were pruned.`, "Good")
            .showSleep("Starting deploying..", "Info", 200)
            .newProgressBar(`${dir}-deploy`);
        //deploy
        const numOuputs = outputs.length;
        for (let o of outputs) {
            if (Array.isArray(o.dir)) {
                for (let d of o.dir) {
                    const map = scriptMaps.get(o.codeSection);
                    if (map) {
                        await DeployScriptMap(d, map, o.keepComments);
                    }
                }
            }
            else {
                const map = scriptMaps.get(o.codeSection);
                if (map) {
                    await DeployScriptMap(o.dir, map, o.keepComments);
                }
            }
            await dsCom.incrementProgressBar(`${dir}-deploy`, (1 / numOuputs) * 100);
        }
        (await dsCom.incrementProgressBar("parse", ((1 / totalSources) * 100) / 3)).showSleep("Scripts succesfully deployed", "Good");
        await Sleep(200);
    }
    catch (error) {
        if (error.message.includes("no such file or directory")) {
            dsCom.show(`Error the script directory was not found.`, "Error");
            dsCom.show(error.message, "Raw");
        }
        else {
            console.log(error);
        }
        process.exit(0);
    }
}
async function titleTop() {
    await dsCom
        .newScreen()
        .show("Starting script parse", "Raw")
        .sleep(300)
        .newScreen()
        .logSeparator()
        .logProgramTitle()
        .showSleep("Running Script Parse", "Blink")
        .logSeparator()
        .newProgressBar("parse");
}
