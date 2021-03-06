
import { ServiceBar } from "../Helpers/Log/ServiceBar.js";
import {GetConfigData} from "../Helpers/GetConfigData.js";
import {Sleep} from "../Helpers/Log/Sleep.js";
//import {DSCommander} from "../Helpers/Log/DSCommander.js";
import {StartSequence} from "../Helpers/StartSequence.js";
import {ValidateConfigData} from "../Helpers/ValidateConfigData.js";
import {ComposeScriptMap} from "../Helpers/ScriptMap/ComposeScriptMap.js";
import {PruneScript} from "../Helpers/Prune/PruneScript.js";
import {DeployScriptMap} from "../Helpers/ScriptMap/DeployScriptMap.js";
import {RemoveComments} from "../Helpers/Prune/RemoveComments.js";
(global as any).RemoveComments = RemoveComments;
(global as any).DeployScriptMap = DeployScriptMap;
(global as any).PruneScript = PruneScript;
(global as any).ComposeScriptMap = ComposeScriptMap;
(global as any).ValidateConfigData = ValidateConfigData;
(global as any).StartSequence = StartSequence;
(global as any).ServiceBar = ServiceBar;
(global as any).GetConfigData = GetConfigData;
(global as any).Sleep = Sleep;

