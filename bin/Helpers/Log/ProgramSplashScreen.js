"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramSplashScreen = void 0;
/**
# Program Splash Screen
---
Shows the programs splash screen in the terminal.

@author Luke Johnson
@since 9-19-2021
@version 1.0.5
*/
function ProgramSplashScreen() {
    console.clear();
    let star = `        [1m[35m.[0m
       [1m[35m,[0m[1m[35mX[0m[1m[35m,[0m
      [1m[35m,[0m[1m[35mX[0m[1m[35mO[0m[1m[35mX[0m[1m[35m,[0m
[1m[35m'[0m[1m[35mx[0m[1m[35mo[0m[1m[35mo[0m[1m[35mo[0m[1m[35mo[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mo[0m[1m[35mo[0m[1m[35mo[0m[1m[35mo[0m[1m[35mx[0m[1m[35m'[0m
  [1m[35m\`[0m[1m[35mX[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mX[0m[1m[35m\`[0m
    [1m[35m\`[0m[1m[35mX[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mX[0m[1m[35m\`[0m
    [1m[35mX[0m[1m[35mO[0m[1m[35mO[0m[1m[35mX[0m[1m[35m'[0m[1m[35mX[0m[1m[35mO[0m[1m[35mO[0m[1m[35mX[0m
   [1m[35mX[0m[1m[35mO[0m[1m[35mX[0m[1m[35m'[0m   [1m[35m'[0m[1m[35mX[0m[1m[35mO[0m[1m[35mX[0m
  [1m[35mX[0m[1m[35m'[0m         [1m[35m'[0m[1m[35mX[0m`;
    console.log(star);
    dsLog.logProgramTitle();
}
exports.ProgramSplashScreen = ProgramSplashScreen;
