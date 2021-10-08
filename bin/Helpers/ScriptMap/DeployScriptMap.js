"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeployScriptMap = void 0;
let deployPath = "";
let scriptPath = "";
/**
# Deploy Script Map
---
Given a script map it will replicate it at the given location.

@author Luke Johnson
@since 10-4-2021
@version 0.0.1
*/
async function DeployScriptMap(outdir, map) {
    deployPath = outdir;
    scriptPath = map.path;
    try {
        await _traverse(map);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.DeployScriptMap = DeployScriptMap;
function _getRelativePath(path) {
    const dir = path.replace(scriptPath, "");
    return `${deployPath}/${dir}`;
}
async function _traverse(map) {
    try {
        const path = _getRelativePath(map.path);
        try {
            await fs.access(path);
        }
        catch (error) {
            try {
                await fs.mkdir(path, { recursive: true });
            }
            catch (error) {
                console.log(error);
            }
        }
        for (let file of map.files) {
            await fs.writeFile(`${path}/${file.path}`, file.data);
        }
        // map.files.forEach((file) => {});
        map.directories.forEach((item) => {
            _traverse(item);
        });
        return map;
    }
    catch (error) {
        console.log(error);
        process.exit(0);
    }
}
