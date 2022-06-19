"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartSequence = void 0;
/**
# Start Sequence
---
When the program starts and needs to find the config data and validate it, it will run this.

@author Luke Johnson
@since 10-4-2021
@version 1.0.5
*/
async function StartSequence() {
    dsCom
        .splashScreen()
        .sleep(500)
        .showSleep("Searching for config data...", "Info", 200);
    const configData = await GetConfigData();
    dsCom
        .showSleep("Found config data.", "Good", 200)
        .showSleep("Validating config data.", "Info", 200)
        .newProgressBar("validate");
    try {
        await ValidateConfigData(configData);
        dsCom
            .showSleep("Data is good.", "Good", 300)
            .showSleep(configData, "Data", 300)
            .newScreen();
        return configData;
    }
    catch (error) {
        dsCom.show(`ERROR VALIDATING CONFIG DATA\n${error.message}`, "Error");
        process.exit();
    }
}
exports.StartSequence = StartSequence;
