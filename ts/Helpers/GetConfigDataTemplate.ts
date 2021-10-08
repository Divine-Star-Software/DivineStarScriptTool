import type { ConfigData } from "../meta/Config/ConfigData.structure";

export function GetConfigDataTemplate() : ConfigData{

    const configData : ConfigData = {
        sources : [],
        outputs : [],
        codeSections : {}
    };
    
    return configData;
}