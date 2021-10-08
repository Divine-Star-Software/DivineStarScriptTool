import {Auto} from "../Commands/Auto/Auto.js";
import {ScriptParse} from "../Commands/ScriptParse/ScriptParse";
import { CreateDefaultConfig } from "../Commands/CreateDefaultConfig/CreateDefaultConfig.js";
(global as any).Auto = Auto;
(global as any).ScriptParse = ScriptParse;
(global as any).CreateDefaultConfig = CreateDefaultConfig;