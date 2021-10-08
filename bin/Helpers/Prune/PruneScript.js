"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PruneScript = void 0;
/**
# Prune Script
---
Parses a script given the code sections.

@author Luke Johnson
@since 10-7-2021
@version 0.0.1
*/
async function PruneScript(file, codeSection) {
    let newData = file;
    for (let cs of codeSection) {
        while (newData.indexOf(`//${cs.start}`) != -1) {
            const startIndex = newData.indexOf(`//${cs.start}`);
            const endIndex = newData.indexOf(`//${cs.end}`) + cs.end.length + 2;
            newData = newData.replace(newData.substring(startIndex, endIndex), "");
        }
    }
    return newData;
}
exports.PruneScript = PruneScript;
