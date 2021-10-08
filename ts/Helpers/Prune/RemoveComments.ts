/**
# Remove Comments
---
Remove comments from a script.

@author Luke Johnson
@since 10-7-2021
@version 0.0.1
*/
export function RemoveComments(file: string) {
    return file.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
  }