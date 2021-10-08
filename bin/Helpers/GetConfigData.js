"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConfigData = void 0;
async function GetConfigData() {
    try {
        const configDataRaw = await fs.readFile("dsconfig.dsd", "utf8");
        const removedComments = _removeComments(configDataRaw);
        const configData = JSON.parse(removedComments);
        return configData;
    }
    catch (error) {
        console.log("!!!ERROR!!!");
        if (error.message.indexOf("no such file or directory") > -1) {
            console.log("Config file not found.");
        }
        if (error.message.indexOf("Unexpected token u in JSON at position") > -1) {
            console.log("Config file could not be parsed because of JSON error.\nError message is displayed below:");
            console.log(error.message);
        }
        console.log(error.message);
        process.exit(-1);
    }
    return {};
}
exports.GetConfigData = GetConfigData;
function _removeComments(file) {
    return file.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
}
