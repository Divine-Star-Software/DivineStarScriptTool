"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto = void 0;
const pruneSections = new Map();
/**
# Auto
---
Auto parse and move scripts to the needed location.

@author Luke Johnson
@since 9-19-2021
@version 1.0.5
*/
async function Auto(data) {
    await ScriptParse(data);
    await titleTop();
    const neededSections = new Map();
    const codeSections = data.codeSections;
    for (let o of data.outputs) {
        neededSections.set(o.codeSection, true);
    }
    for (let c of neededSections.keys()) {
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
            pruneSections.set(c, []);
        }
        else {
            pruneSections.set(c, codeSectionsArray);
        }
    }
    const sourceMap = {};
    data.sources.forEach((s) => {
        sourceMap[s.id] = [];
    });
    data.outputs.forEach((o) => {
        sourceMap[o.sourceID].push(o);
    });
    data.sources.forEach((s) => {
        initWatch(s, sourceMap[s.id]);
    });
}
exports.Auto = Auto;
function initWatch(input, outputs) {
    const directory = input.dir;
    dsCom.show(input.dir, "Good");
    chokidar.watch(directory).on("change", (path, stats) => {
        path = path.replace(/\\/g, "/");
        const file = path.replace(directory, "");
        (async () => {
            dsCom
                .showAt("{----==== UPDATE COMING ====----}", { type: "Warning", row: 5, col: 0 })
                .setRow(6);
            await Sleep(200);
            const fileRaw = await fs.readFile(path, "utf-8");
            dsCom.show(`--Updating file ${path}`, "Raw");
            await Sleep(100);
            for (let o of outputs) {
                const cs = pruneSections.get(o.codeSection);
                if (cs) {
                    dsCom.show(`--Prunning for ${o.codeSection}`, "Raw");
                    let newFile = await PruneScript(fileRaw, cs, o.keepComments);
                    dsCom.show(`==Done prunning for ${o.codeSection}`, "Raw");
                    await Sleep(100);
                    if (Array.isArray(o.dir)) {
                        for (let d of o.dir) {
                            dsCom.show(`--Writing to ${d}/${path}`, "Raw");
                            await fs.writeFile(`${d}/${path}`, newFile);
                            dsCom.show(`==Done writing to ${d}/${file}`, "Raw");
                        }
                    }
                    else {
                        const d = o.dir;
                        dsCom.show(`--Writing to ${d}/${file}`, "Raw");
                        await fs.writeFile(`${d}/${file}`, newFile);
                        dsCom.show(`==Done writing to ${d}/${file}`, "Raw");
                    }
                }
                await Sleep(500);
            }
            dsCom.setRow(6);
            _ShowAutoMessage(`FILE CHANGED`, `${file}`);
        })();
    });
}
async function titleTop() {
    await dsCom
        .newScreen()
        .show("Starting in auto mode", "Raw")
        .sleep(500)
        .newScreen()
        .showSeparator()
        .showProgramTitle()
        .sleep(100)
        .show("Running Auto Mode", "Blink")
        .newServiceBar("auto")
        .showSeparator();
}
async function _title() {
    await dsCom
        .newScreen()
        .showSeparator()
        .showProgramTitle()
        .show("Running Auto Mode", "Blink")
        .addRow()
        .reInitServiceBar("auto")
        .showSeparator();
}
async function _ShowAutoMessage(title, message) {
    await _title();
    const stamp = new Date(Date.now());
    const t = title.toUpperCase();
    const update = `TIME STAMP: ${stamp.getHours()}:${stamp.getMinutes()}:${stamp.getSeconds()} ${stamp.getDate()}/${stamp.getMonth() + 1}/${stamp.getFullYear()}
[ UPDATE ]
${t}
---
${message}`;
    dsCom
        .show("{----==== UP TO DATE ====----}", "Good")
        .logSeparator()
        .show(update, "Raw")
        .logSeparator();
}
