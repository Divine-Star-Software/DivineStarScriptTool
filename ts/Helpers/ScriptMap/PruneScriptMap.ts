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
@version 1.0.5
*/
export async function PruneScriptMap(
  map: mapItem,
  codeSection: ConfigDataCodeSection[],
  keepComments : boolean = true
): Promise<mapItem> {
  try {
    const newMap = await _traverse(map, codeSection,keepComments);
    return newMap;
  } catch (error: any) {
    console.log(error);
    process.exit(0);
  }
}

async function _traverse(map: mapItem, codeSection: ConfigDataCodeSection[],keepComments : boolean = true) {
  for (let file of map.files) {
    file.data = await PruneScript(file.data, codeSection,keepComments);
  }

  map.directories.forEach((item) => {
    _traverse(item, codeSection);
  });
  return map;
}
