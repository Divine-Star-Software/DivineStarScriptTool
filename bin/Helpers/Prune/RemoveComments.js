"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveComments = void 0;
/**
# Remove Comments
---
Remove comments from a script.

@author Luke Johnson
@since 10-7-2021
@version 1.0.5
*/
function RemoveComments(file) {
    return file.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
}
exports.RemoveComments = RemoveComments;
