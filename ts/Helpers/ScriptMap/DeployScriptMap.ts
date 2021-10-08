let deployPath = "";
let scriptPath = "";

/** 
# Deploy Script Map
---
Given a script map it will replicate it at the given location. 

@author Luke Johnson
@since 10-4-2021
@version 0.0.1
*/
export async function DeployScriptMap(
  outdir: string,
  map: mapItem,
  keepComments : boolean = true
): Promise<boolean> {
  deployPath = outdir;
  scriptPath = map.path;
  try {
    await _traverse(map,keepComments);
    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
}

function _getRelativePath(path: string): string {
  const dir = path.replace(scriptPath, "");
  return `${deployPath}/${dir}`;
}

async function _traverse(map: mapItem,keepComments : boolean = true) {
  try {
    const path = _getRelativePath(map.path);
    try {
      await fs.access(path);
    } catch (error: any) {
      try {
        await fs.mkdir(path,{recursive:true});
      } catch (error: any) {
        console.log(error);
      }
    }

    for (let file of map.files) {
      if(!keepComments){
        file.data = RemoveComments(file.data);
      } else {

      }
      await fs.writeFile(`${path}/${file.path}`, file.data);
    }

    // map.files.forEach((file) => {});
    map.directories.forEach((item) => {
      _traverse(item,keepComments);
    });
    return map;
  } catch (error: any) {
    console.log(error);
    process.exit(0);
  }
}
