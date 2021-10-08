import { PruneScriptMap } from "../../Helpers/ScriptMap/PruneScriptMap.js";
import type {
  ConfigData,
  ConfigDataSource,
  ConfigDataOutput,
  ConfigDataCodeSection,
} from "../../meta/Config/ConfigData.structure.js";
import type { DSLoggerInterface } from "../../meta/DSLogger/DSLogger.interface.js";
declare const dsLog: DSLoggerInterface;

let codeSections: Record<string, ConfigDataCodeSection> = {};
const neededSections: Map<string | string[], boolean> = new Map();
const scriptMaps: Map<string | string[], mapItem> = new Map();
let totalSources = 0;

/**
# Script Parse
---
Parse the scripts and move them to the needed location. 

@author Luke Johnson
@since 9-19-2021
@version 0.0.1
*/
export async function ScriptParse(data: ConfigData) {
  await titleTop();

  totalSources = data.sources.length;
  codeSections = data.codeSections;
  const sourceMap: Record<string, ConfigDataOutput[]> = {};
  data.sources.forEach((s) => {
    sourceMap[s.id] = [];
  });
  data.outputs.forEach((o) => {
    sourceMap[o.sourceID].push(o);
    if (!neededSections.get(o.codeSection)) {
      neededSections.set(o.codeSection, true);
    }
  });
  const proms: Promise<void>[] = [];
  data.sources.forEach((s) => {
    proms.push(initParse(s, sourceMap[s.id]));
  });
  await Promise.all(proms);

  dsLog.showSleep("All scripts parsed and deployed.", "Good", 1500);
}

async function initParse(
  source: ConfigDataSource,
  outputs: ConfigDataOutput[]
) {
  const dir = source.dir;
  dsLog.show("Searching for script source.", "Info").show(source.dir, "Raw");

  try {
    //find folder
    await fs.access(dir);
    dsLog
      .showSleep("Found folder", "Good", 500)
      .show("Starting script mapping.", "Info")
      .newProgressBar(`${dir}-map`);

    //create script map
    const scriptMap = await ComposeScriptMap(dir, source.fileExtensions);

    (await dsLog.incrementProgressBar("parse", ((1 / totalSources) * 100) / 3))
      .showSleep("Finished Script Map", "Good", 500)
      .show("Starting script pruning.", "Info")
      .newProgressBar(`${dir}-prune`);

    const numSections = neededSections.size;
    for (let c of neededSections.keys()) {

      const mapCopy = JSON.parse(JSON.stringify(scriptMap));

      const codeSectionsArray: ConfigDataCodeSection[] = [];
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

      const newMap = await PruneScriptMap(mapCopy, codeSectionsArray);
      scriptMaps.set(c, newMap);
      await dsLog.incrementProgressBar(`${dir}-prune`, (1 / numSections) * 100);
    }
    (await dsLog.incrementProgressBar("parse", ((1 / totalSources) * 100) / 3))
      .show(`Scripts were pruned.`, "Good")
      .showSleep("Starting deploying..", "Info", 500)
      .newProgressBar(`${dir}-deploy`);

    //deploy
    const numOuputs = outputs.length;
    for (let o of outputs) {
      if (Array.isArray(o.dir)) {
        for (let d of o.dir) {
          const map = scriptMaps.get(o.codeSection);
          if (map) {
         
            await DeployScriptMap(d, map,o.keepComments);
          }
        }
      } else {
        const map = scriptMaps.get(o.codeSection);
        if (map) {
          await DeployScriptMap(o.dir, map,o.keepComments);
        }
      }
      await dsLog.incrementProgressBar(`${dir}-deploy`, (1 / numOuputs) * 100);
    }

    (
      await dsLog.incrementProgressBar("parse", ((1 / totalSources) * 100) / 3)
    ).showSleep("Scripts succesfully deployed", "Good");

    await Sleep(500);
  } catch (error: any) {
    if (error.message.includes("no such file or directory")) {
      dsLog.show(`Error the script directory was not found.`, "Error");
      dsLog.show(error.message, "Raw");
    } else {
      console.log(error);
    }

    process.exit(0);
  }
}

async function titleTop() {
  await dsLog
    .newScreen()
    .show("Starting script parse", "Raw")
    .sleep(1000)
    .newScreen()
    .logSeperator()
    .logProgramTitle()
    .showSleep("Running Script Parse", "Blink")
    .logSeperator()
    .newProgressBar("parse");
}
