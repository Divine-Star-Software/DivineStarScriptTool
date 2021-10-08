export function ImportDependencies(
dependencies : Dependencies
) {

  if(dependencies.NEEDFS){
    const { promises: fs } = require("fs");
    (global as any).fs = fs;
  }
  if(dependencies.NEEDRFSWATCH){
    const watch = require ("fs").watch;
    (global as any).watch = watch;
  }
  if(dependencies.NEEDFSEXTRA){
    const fsExtra = require("fs-extra");
    (global as any).fsExtra = fsExtra;
  }
  if (dependencies.NEEDRDL) {
    const rdl = require("readline");
    (global as any).rdl = rdl;
  }
  if (dependencies.NEEDPROMPT) {
    const prompt = require("prompt");
    (global as any).rdl = prompt;
  }
}
