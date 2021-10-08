export type MessageTypes ="Blink"| "Error" | "Title" | "Info" | "Good" | "Warning" | "Raw" | "Data";


export interface DSLoggerInterface {



    getRow():number;
    setRow(num:number):this;
    addRow():this;

    showAt(message: any,type :MessageTypes,row : number):this;
    show(message: any, type: MessageTypes) : this;
    showSleep(message : any,type : MessageTypes, sleep ?: number) : this;
    sleep(ms : number) : this;
    logSeperator() : this;
    logProgramTitle() : this;
    newServiceBar(name:string) : this;
    reInitServiceBar(name:string) : this;
    newProgressBar(name : string)  : this;
    incrementProgressBar(name : string, amount : number) : Promise<this>;
    newScreen() : this;
    splashScreen() : this;
}