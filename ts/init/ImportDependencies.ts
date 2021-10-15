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

if(dependencies.NEEDRFSWATCH){
const chokidar  = require("chokidar");
(global as any).chokidar = chokidar;
}



}
