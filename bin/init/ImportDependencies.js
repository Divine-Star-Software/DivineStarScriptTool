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
    /*   if(dependencies.NEEDFSEXTRA){
        const fsExtra = require("fs-extra");
        (global as any).fsExtra = fsExtra;
      } */
    if (dependencies.NEEDRDL) {
        const rdl = require("readline");
        global.rdl = rdl;
    }
    /*  if (dependencies.NEEDPROMPT) {
       const prompt = require("prompt");
       (global as any).rdl = prompt;
     } */
}
exports.ImportDependencies = ImportDependencies;
