"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComposeScriptMap = void 0;
let extension = [];
let totalFile = 0;
let scriptMapDir = "";
/**
# Compose Script Map
---
Compose a json object of the folder, it's sub-folders and all the files.

@author Luke Johnson
@since 10-7-2021
@version 1.0.5
*/
async function ComposeScriptMap(path = "", ext = [".js"]) {
    extension = ext;
    currentCount = 0;
    scriptMapDir = path;
    const count = await _getCount(path);
    const scriptMap = await _getDir(path);
    //const data = JSON.stringify(scriptMap, undefined, 5);
    //fs.writeFile("scriptmap.dsd", data);
    return scriptMap;
}
exports.ComposeScriptMap = ComposeScriptMap;
let currentCount = 0;
let fileCount = 0;
async function _getCount(path) {
    fileCount = 0;
    await _Count(path);
    return fileCount;
}
async function _Count(path) {
    const files = await fs.readdir(path);
    for (const file of files) {
        const scriptPath = `${path}/${file}`;
        const fileStat = await fs.lstat(scriptPath);
        if (!fileStat.isDirectory()) {
            fileCount++;
        }
        else {
            await _Count(scriptPath);
        }
    }
}
async function _getDir(path) {
    const dataReturn = {
        path: path,
        directories: [],
        files: [],
    };
    const files = await fs.readdir(path);
    const fileList = [];
    const dirList = [];
    for (const file of files) {
        const scriptPath = `${path}/${file}`;
        const fileStat = await fs.lstat(scriptPath);
        if (fileStat.isDirectory()) {
            if (scriptPath.includes(".git"))
                continue;
            const dirItem = await _getDir(scriptPath);
            dirList.push(dirItem);
        }
        if (fileStat.isFile()) {
            let skip = true;
            extension.forEach((ext) => {
                if (scriptPath.includes(`.${ext}`)) {
                    skip = false;
                }
            });
            if (skip)
                continue;
            let BD = new Date(fileStat.birthtime);
            let birthTime = `${BD.getHours()}:${BD.getMinutes()}`;
            let birthDate = `${BD.getDay()}-${BD.getMonth()}-${BD.getFullYear()}`;
            const filedataraw = await fs.readFile(scriptPath, "utf-8");
            totalFile++;
            currentCount++;
            await _addProgress();
            fileList.push({
                path: file,
                birthDate: `${birthTime} ${birthDate}`,
                data: filedataraw,
            });
        }
    }
    dataReturn.directories = dirList;
    dataReturn.files = fileList;
    return dataReturn;
}
async function _addProgress() {
    if (!(currentCount % 5)) {
        await dsCom.incrementProgressBar(`${scriptMapDir}-map`, (((100 / fileCount))));
    }
}
