"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportDependencies = void 0;
function ImportDependencies(dependencies) {
    if (dependencies.NEEDFS) {
        const { promises: fs } = require("fs");
        global.fs = fs;
    }
    if (dependencies.NEEDRFSWATCH) {
        const watch = require("fs").watch;
        global.watch = watch;
    }
    const dsLog = require("dslog");
    global.dsLog = dsLog;
    dsLog.defineProgramTitle("[ Divine Star Script Tool ]").defineSplashScreen(() => {
        dsLog.newScreen().show(dsLog.getString("star"), "Raw").logProgramTitle();
    });
    if (dependencies.NEEDRFSWATCH) {
        const chokidar = require("chokidar");
        global.chokidar = chokidar;
    }
}
exports.ImportDependencies = ImportDependencies;
