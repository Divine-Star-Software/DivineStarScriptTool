"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBar = void 0;
/**
# Service Bar
---
Makes a simple continous loading bar to show that the program is working.

@author Luke Johnson
@since 9-19-2021
@version 0.0.1
*/
function ServiceBar(rows = 0, size = 32, start = 2, interval = 150) {
    rdl.cursorTo(process.stdout, start, rows);
    for (let i = start; i < size; i++) {
        _X();
    }
    let cursor = start;
    const inte = setInterval(() => {
        rdl.cursorTo(process.stdout, cursor, rows);
        cursor++;
        if (cursor % 2) {
            _Bar();
        }
        else {
            _O();
        }
        if (cursor == size) {
            cursor = start;
            _Cap();
            rdl.cursorTo(process.stdout, start, rows);
            for (let i = start; i < size; i++) {
                _X();
            }
        }
    }, interval);
    return inte;
}
exports.ServiceBar = ServiceBar;
function _Cap() {
    process.stdout.write("\x1b[37m\x1b[43m}\x1b[0m");
}
function _Bar() {
    process.stdout.write("\x1b[37m\x1b[44m|\x1b[0m");
}
function _O() {
    process.stdout.write("\x1b[37m\x1b[45m0\x1b[0m");
}
function _X() {
    process.stdout.write("\x1b[37m\x1b[44mX\x1b[0m");
}
