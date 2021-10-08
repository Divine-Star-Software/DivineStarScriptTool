import type {
  ConfigData,
  ConfigDataSource,
  ConfigDataOutput,
  ConfigDataCodeSection,
} from "../../meta/Config/ConfigData.structure.js";
import type {
  mapItem,
  filetiem,
} from "../../meta/ScriptMap/ScriptMap.structure";
/**
# Prune Script Map
---
Prunes a script map with the given code section. 

@author Luke Johnson
@since 10-4-2021
@version 0.0.1
*/
export async function PruneScriptMap(
  map: mapItem,
  codeSection: ConfigDataCodeSection[]
): Promise<mapItem> {
  try {
    const newMap = await _traverse(map, codeSection);
    return newMap;
  } catch (error: any) {
    console.log(error);
    process.exit(0);
  }
}

async function _traverse(map: mapItem, codeSection: ConfigDataCodeSection[]) {
  for (let file of map.files) {
    file.data = await PruneScript(file.data, codeSection);
  }

  map.directories.forEach((item) => {
    _traverse(item, codeSection);
  });
  return map;
}
