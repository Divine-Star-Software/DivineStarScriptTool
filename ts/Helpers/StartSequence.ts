import type { ConfigData } from "../meta/Config/ConfigData.structure.js";
declare const dsLog: DSLogger;

/**
# Start Sequence
---
When the program starts and needs to find the config data and validate it, it will run this. 

@author Luke Johnson
@since 10-4-2021
@version 1.0.5
*/
export async function StartSequence(): Promise<ConfigData> {

  
  dsLog
    .splashScreen()
    .sleep(500)
    .showSleep("Searching for config data...", "Info",500);

  const configData = await GetConfigData();
  dsLog
    .showSleep("Found config data.", "Good",500)
    .showSleep("Validating config data.", "Info", 500)
    .newProgressBar("validate");

  try {
    await ValidateConfigData(configData);
    dsLog
      .showSleep("Data is good.", "Good", 800)
      .showSleep(configData, "Data", 800)
      .newScreen();
    return configData;
  } catch (error: any) {
    dsLog.show(`ERROR VALIDATING CONFIG DATA\n${error.message}`, "Error");
    process.exit();
  }
}
