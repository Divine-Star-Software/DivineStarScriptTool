import type { ConfigData } from "../meta/Config/ConfigData.structure";

export async function GetConfigData(fileName : string) : Promise<ConfigData> {

    try{
    const configDataRaw = await fs.readFile(fileName, "utf8");
    const removedComments = _removeComments(configDataRaw);

    const configData =  JSON.parse(removedComments);
    return <ConfigData> configData;
    } catch(error : any){
      console.log("!!!ERROR!!!");
      if(error.message.indexOf("no such file or directory") > -1)  {
          console.log("Config file not found.");
      }
      if(error.message.indexOf("Unexpected token u in JSON at position") > -1)  {
        console.log("Config file could not be parsed because of JSON error.\nError message is displayed below:");
        console.log(error.message);
    }
    console.log(error.message);
    
      process.exit(-1);
    }
    return <ConfigData> {};
}
function _removeComments(file: string) {
  return file.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
}