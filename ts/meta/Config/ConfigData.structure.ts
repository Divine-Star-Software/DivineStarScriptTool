export type ConfigDataCodeSection = {
  start: string;
  end: string;
};

export type ConfigDataSource = {
  id: string;
  dir: string;
  fileExtensions : string[];
};
export type ConfigDataOutput = {
  //The id of the source code. ID is provided above.
  sourceID: string;
  keepComments : boolean,
  dir: string | string[];
  //The code section to include into the export. You can specify None or All to either exclude or include all code sections.
  codeSection: string[] | "All" | "all" | "None" | "none";
};

export type ConfigData = {
  //Places to pull code from.
  sources: ConfigDataSource[];
  //Places to put code to.
  outputs: ConfigDataOutput[];
  //This defines the parsing deleimiters for the tool.
  codeSections: Record<string, ConfigDataCodeSection>;
};
