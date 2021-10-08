"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DSLogger = void 0;
/**
# DSLogger
---
Helper class for the programs output.

@author Luke Johnson
@since 9-19-2021
@version 0.0.1
*/
class DSLogger {
    constructor() {
        this.ProgressBar = LoadingBar;
        this.ServiceBar = ServiceBar;
        this.currentRow = 0;
        this.progressBars = {};
        this.serviceBars = {};
    }
    getRow() {
        return this.currentRow;
    }
    setRow(num) {
        this.currentRow = num;
        rdl.cursorTo(process.stdout, 0, this.currentRow);
        return this;
    }
    addRow() {
        this.currentRow++;
        return this;
    }
    newServiceBar(name) {
        const bar = new this.ServiceBar(this.currentRow, 31, 0, 80);
        this.currentRow++;
        this.serviceBars[name] = bar;
        return this;
    }
    reInitServiceBar(name) {
        this.serviceBars[name].reInit();
        return this;
    }
    newProgressBar(name) {
        const bar = new this.ProgressBar(this.currentRow, 30);
        this.currentRow++;
        bar.start();
        this.progressBars[name] = bar;
        return this;
    }
    async incrementProgressBar(name, amount) {
        await this.progressBars[name].addProgressPerfect(amount);
        return this;
    }
    sleep(ms) {
        var waitTill = new Date(new Date().getTime() + ms);
        while (waitTill > new Date()) { }
        ;
        return this;
    }
    newScreen() {
        console.clear();
        this.currentRow = 0;
        return this;
    }
    showAt(message, type, row) {
        let output = message;
        if (type != "Raw" && type != "Data") {
            output = this._addColor(type, message);
        }
        if (type == "Data") {
            output = JSON.stringify(message, null, 3);
        }
        rdl.cursorTo(process.stdout, 0, row);
        console.log(output);
        return this;
    }
    show(message, type) {
        let output = message;
        if (type != "Raw" && type != "Data") {
            output = this._addColor(type, message);
        }
        if (type == "Data") {
            output = JSON.stringify(message, null, 3);
        }
        const lines = this._countLines(output);
        rdl.cursorTo(process.stdout, 0, this.currentRow);
        this.currentRow += lines;
        console.log(output);
        return this;
    }
    showSleep(message, type, sleep = 800) {
        this.show(message, type);
        this.sleep(sleep);
        return this;
    }
    _addColor(type, message) {
        let returnString = "";
        switch (type) {
            case "Blink":
                returnString += "\x1b[5m";
                break;
            case "Error":
                returnString += "\x1b[1m\x1b[41m\x1b[37m";
                break;
            case "Title":
                returnString += "\x1b[37m\x1b[1m\x1b[45m";
                break;
            case "Info":
                returnString += "\x1b[1m\x1b[37m\x1b[46m";
                break;
            case "Good":
                returnString += "\x1b[1m\x1b[37m\x1b[42m";
                break;
            case "Warning":
                returnString += "\x1b[1m\x1b[37m\x1b[43m";
                break;
        }
        returnString += message + "\x1b[0m";
        return returnString;
    }
    _countLines(message) {
        return message.split(/\r\n|\r|\n/).length;
    }
    logSeperator() {
        this.show("{-----------------------------}", "Info");
        return this;
    }
    logProgramTitle() {
        this.show("[ Divine Star Script Tool ]", "Title");
        return this;
    }
    splashScreen() {
        let star = `            [1m[35m.[0m
           [1m[35m,[0m[1m[35mX[0m[1m[35m,[0m
          [1m[35m,[0m[1m[35mX[0m[1m[35mO[0m[1m[35mX[0m[1m[35m,[0m
    [1m[35m'[0m[1m[35mx[0m[1m[35mo[0m[1m[35mo[0m[1m[35mo[0m[1m[35mo[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mo[0m[1m[35mo[0m[1m[35mo[0m[1m[35mo[0m[1m[35mx[0m[1m[35m'[0m
      [1m[35m\`[0m[1m[35mX[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mX[0m[1m[35m\`[0m
        [1m[35m\`[0m[1m[35mX[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mX[0m[1m[35m\`[0m
        [1m[35mX[0m[1m[35mO[0m[1m[35mO[0m[1m[35mX[0m[1m[35m'[0m[1m[35mX[0m[1m[35mO[0m[1m[35mO[0m[1m[35mX[0m
       [1m[35mX[0m[1m[35mO[0m[1m[35mX[0m[1m[35m'[0m   [1m[35m'[0m[1m[35mX[0m[1m[35mO[0m[1m[35mX[0m
      [1m[35mX[0m[1m[35m'[0m         [1m[35m'[0m[1m[35mX[0m`;
        this.newScreen().show(star, "Raw").logProgramTitle();
        return this;
    }
}
exports.DSLogger = DSLogger;
class LoadingBar {
    constructor(row, size) {
        this.row = row;
        this.size = size;
        this.done = false;
        this.cursor = 0;
        this.timer = null;
    }
    start() {
        //    process.stdout.write("\x1B[?25l")
        for (let i = 0; i < this.size; i++) {
            process.stdout.write("-");
            //process.stdout.write("=");
        }
        rdl.cursorTo(process.stdout, 0, this.row);
    }
    autoFill() {
        rdl.cursorTo(process.stdout, 0, this.row);
        const prom = new Promise((resolve) => {
            this.start();
            rdl.cursorTo(process.stdout, 0, this.row);
            this.timer = setInterval(() => {
                this.addProgress(1);
                if (this.cursor >= this.size) {
                    clearInterval(this.timer);
                    resolve(true);
                    //  rdl.cursorTo(process.stdout, this.cursor, done);
                }
            }, 1200);
        });
        return prom;
    }
    /**Add Progress Percent
     * ---
     * Adds progress to the bar relative to the size.
     * @param percent Supply an int between 1 - 100
     */
    addProgressPerfect(percent) {
        const num = this.size * (percent / 100);
        return this.addProgress(num);
    }
    addProgress(amount) {
        rdl.cursorTo(process.stdout, this.cursor, this.row);
        let doneLocal = false;
        const prom = new Promise((resolve) => {
            let num = this.cursor + amount;
            const timer = setInterval(() => {
                if (this.done || doneLocal) {
                    clearInterval(timer);
                    resolve(true);
                    return;
                }
                this.cursor++;
                if (this.cursor >= this.size) {
                    this.done = true;
                    process.stdout.write("=");
                    console.log("\r");
                }
                else if (this.cursor >= num) {
                    process.stdout.write("=");
                    doneLocal = true;
                }
                else {
                    process.stdout.write("=");
                }
            }, 20);
        });
        return prom;
    }
    finish() {
        const left = this.size - this.cursor;
        this.addProgress(left);
    }
}
class ServiceBar {
    constructor(rows = 0, size = 32, start = 2, interval = 150) {
        this.rows = rows;
        this.size = size;
        this.start = start;
        this.interval = interval;
        this.cursor = 0;
        this._init();
    }
    clear() {
        clearInterval(this.inte);
    }
    reInit() {
        clearInterval(this.inte);
        this._init();
    }
    _init() {
        rdl.cursorTo(process.stdout, this.start, this.rows);
        for (let i = this.start; i < this.size; i++) {
            this._X();
        }
        this.cursor = this.start;
        this.inte = setInterval(() => {
            rdl.cursorTo(process.stdout, this.cursor, this.rows);
            this.cursor++;
            if (this.cursor % 2) {
                this._Bar();
            }
            else {
                this._O();
            }
            if (this.cursor == this.size) {
                this.cursor = this.start;
                this._Cap();
                rdl.cursorTo(process.stdout, this.start, this.rows);
                for (let i = this.start; i < this.size; i++) {
                    this._X();
                }
            }
        }, this.interval);
    }
    _O() {
        const char = "0";
        process.stdout.write(`\x1b[37m\x1b[45m${char}\x1b[0m`);
    }
    _X() {
        process.stdout.write("\x1b[37m\x1b[44mX\x1b[0m");
    }
    _Cap() {
        process.stdout.write("\x1b[37m\x1b[43m}\x1b[0m");
    }
    _Bar() {
        process.stdout.write("\x1b[37m\x1b[44m|\x1b[0m");
    }
}
