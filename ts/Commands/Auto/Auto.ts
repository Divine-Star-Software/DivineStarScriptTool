import type {
  ConfigData,
  ConfigDataSource,
  ConfigDataOutput,
} from "../../meta/Config/ConfigData.structure.js";
import type { DSLoggerInterface } from "../../meta/DSLogger/DSLogger.interface.js";
declare const dsLog: DSLoggerInterface;

const pruneSections: Map<string[] | string, ConfigDataCodeSection[]> =
  new Map();

/**
# Auto
---
Auto parse and move scripts to the needed location.

@author Luke Johnson
@since 9-19-2021
@version 0.0.1
*/
export async function Auto(data: ConfigData) {
  await ScriptParse(data);
  await titleTop();
  /*   setInterval(() => {
    _ShowAutoMessage(
      "File Updated",
      "File was suffucesfully parsed and deployed."
    );
  }, 3000); */

  const neededSections: Map<string | string[], true> = new Map();
  const codeSections: Record<string, ConfigDataCodeSection> = data.codeSections;
  for (let o of data.outputs) {
    neededSections.set(o.codeSection, true);
  }

  for (let c of neededSections.keys()) {
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
      pruneSections.set(c, []);
    } else {
      pruneSections.set(c, codeSectionsArray);
    }
  }

  const sourceMap: Record<string, ConfigDataOutput[]> = {};
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

let currentFile = new Map();

function initWatch(input: ConfigDataSource, outputs: ConfigDataOutput[]) {
  const directory = input.dir;

  dsLog.show(input.dir, "Good");

  //const deployDirectory = output.dir;

  const watcher = watch(
    directory,
    {
      recursive: true,
    },
    (event: any, file: any) => {
      if (!currentFile.get(file)) {
        currentFile.set(file, true);
      } else {
        return;
      }
      (async () => {
        dsLog.showAt("{----==== UPDATE COMING ====----}", "Warning", 5).setRow(6);
        await Sleep(500);
        file = file.replace("\\", "/");
        const path = `${directory}/${file}`;
        const fileRaw = await fs.readFile(path, "utf-8");
        dsLog.show(`--Updating file ${path}`, "Raw");
        await Sleep(100);
        for (let o of outputs) {
          const cs = pruneSections.get(o.codeSection);
          if (cs) {
            dsLog.show(`--Prunning for ${o.codeSection}`, "Raw");
            const newFile = await PruneScript(fileRaw, cs);
            dsLog.show(`==Done prunning for ${o.codeSection}`, "Raw");
            await Sleep(100);
            if (Array.isArray(o.dir)) {
              for (let d of o.dir) {
                dsLog.show(`--Writing to ${d}/${file}`, "Raw");
                await fs.writeFile(`${d}/${file}`, newFile);
                dsLog.show(`==Done writing to ${d}/${file}`, "Raw");
              }
            } else {
              const d = o.dir;
              dsLog.show(`--Writing to ${d}/${file}`, "Raw");
              await fs.writeFile(`${d}/${file}`, newFile);
              dsLog.show(`==Done writing to ${d}/${file}`, "Raw");
            }
          }
          await Sleep(500);
        }
        dsLog.setRow(6);
        _ShowAutoMessage(`File ${event}`, `${file}`);
        currentFile.delete(file);
      })();
    }
  );
}

async function titleTop() {
  await dsLog
    .newScreen()
    .show("Starting in auto mode", "Raw")
    .sleep(1000)
    .newScreen()
    .logSeperator()
    .logProgramTitle()
    .sleep(500)
    .show("Running Auto Mode", "Blink")
    .newServiceBar("auto")
    .logSeperator();
}

async function _title() {
  await dsLog
    .newScreen()
    .logSeperator()
    .logProgramTitle()
    .show("Running Auto Mode", "Blink")
    .addRow()
    .reInitServiceBar("auto")
    .logSeperator();
}

async function _ShowAutoMessage(title: string, message: string) {
  await _title();

  const stamp = new Date(Date.now());
  const t = title.toUpperCase();
  const update = `TIME STAMP: ${stamp.getHours()}:${stamp.getMinutes()}:${stamp.getSeconds()} ${stamp.getDate()}/${
    stamp.getMonth() + 1
  }/${stamp.getFullYear()}
[ UPDATE ]
${t}
---
${message}`;

  dsLog
    .show("{----==== UP TO DATE ====----}", "Good")
    .logSeperator()
    .show(update, "Raw")
    .logSeperator();
}
