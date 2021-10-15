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
    if (dependencies.NEEDRFSWATCH) {
        const chokidar = require("chokidar");
        global.chokidar = chokidar;
    }
}
exports.ImportDependencies = ImportDependencies;
