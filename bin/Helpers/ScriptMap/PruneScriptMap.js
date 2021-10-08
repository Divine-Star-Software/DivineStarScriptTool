"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PruneScriptMap = void 0;
/**
# Prune Script Map
---
Prunes a script map with the given code section.

@author Luke Johnson
@since 10-4-2021
@version 0.0.1
*/
async function PruneScriptMap(map, codeSection) {
    try {
        const newMap = await _traverse(map, codeSection);
        return newMap;
    }
    catch (error) {
        console.log(error);
        process.exit(0);
    }
}
exports.PruneScriptMap = PruneScriptMap;
async function _traverse(map, codeSection) {
    for (let file of map.files) {
        file.data = await PruneScript(file.data, codeSection);
    }
    map.directories.forEach((item) => {
        _traverse(item, codeSection);
    });
    return map;
}
