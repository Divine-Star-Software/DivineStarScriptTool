//Dependencies
declare const fs: any;
declare const yargs: any;
declare const rdl: any;
declare const prompt: any;
declare const watch: any;
declare const fsExtra: any;
type ConfigData = import("./Config/ConfigData.structure").ConfigData;
type ConfigDataOutput =
  import("./Config/ConfigData.structure").ConfigDataOutput;
type ConfigDataSource =
  import("./Config/ConfigData.structure").ConfigDataSource;
type ConfigDataCodeSection =
  import("./Config/ConfigData.structure").ConfigDataCodeSection;
type mapItem = import("./ScriptMap/ScriptMap.structure").mapItem;
//Commands
declare const Auto: (data: configData) => Promise<void>;
declare const ScriptParse: (data: configData) => Promise<void>;
declare const CreateDefaultConfig: Function;
//Helpers
declare const ValidateConfigData: (data: configData) => boolean;
declare const StartSequence: () => Promise<configData>;
declare const Sleep: Function;
declare const PruneScript: (
  file: string,
  codeSection: ConfigDataCodeSection[],
  keepComments ?: boolean
) => string;
declare const ServiceBar: Function;
declare const ProgramSplashScreen: Function;
declare const RemoveComments: Function;
declare const GetConfigData: Function;
declare const ComposeScriptMap: (
  path: string,
  extension: string[]
) => Promise<mapItem>;
declare const DeployScriptMap: (
  outdir: string,
  map: mapItem,
  keepComments ?: boolean
) => Promise<boolean>;

type DSLoggerInterface =
  import("../../meta/DSLogger/DSLogger.interface").DSLoggerInterface;
declare const dsLog: DSLoggerInterface;

type Dependencies = {
  NEEDFS: boolean;
  NEEDFSEXTRA: boolean;
  NEEDRFSWATCH: boolean;
  NEEDRDL: boolean;
  NEEDPROMPT: boolean;
};
