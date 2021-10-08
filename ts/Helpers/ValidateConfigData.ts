import type {
  ConfigData,
  ConfigDataSource,
  ConfigDataOutput,
} from "../meta/Config/ConfigData.structure.js";
import type { DSLoggerInterface } from "../meta/DSLogger/DSLogger.interface.js";
declare const dsLog: DSLoggerInterface;
/**
# Validate Config Data
---
Valdiates the config data that was read in. 

@author Luke Johnson
@since 10-4-2021
@version 0.0.1
*/
export async function ValidateConfigData(data: ConfigData): Promise<boolean> {
  //check sources
  dsLog.show("Validating sources...", "Info");
  if (!Array.isArray(data.sources)) {
    throw new Error("Sources is not an array.");
  }
  await dsLog.incrementProgressBar("validate", 10);
  if (data?.sources[0] == undefined) {
    throw new Error("No sources provided.");
  }

  await dsLog.incrementProgressBar("validate", 10);

  if (data.sources[0]) {
    data.sources.forEach((item, key) => {
      if (!item.id) {
        throw new Error(`Error with source item ${key}: no id provided.`);
      }
      if (typeof item.id !== "string") {
        throw new Error(`Error with source item ${key}: id is not a string.`);
      }
      if (!item.dir) {
        throw new Error(
          `Error with source item ${key}: no direcotry provided.`
        );
      }
      if (typeof item.dir !== "string") {
        throw new Error(`Error with source item ${key}: dir is not a string.`);
      }
      if (!item.fileExtensions) {
        throw new Error(
          `Error with source item ${key}: no file extensions are provided.`
        );
      }
      if (!Array.isArray(item.fileExtensions)) {
        throw new Error(
          `Error with source item ${key}: fileExtensions is not an array.`
        );
      }
      if (item.fileExtensions.length >= 1) {
        item.fileExtensions.every((ext) => {
          if (typeof ext !== "string") {
            throw new Error(
              `Error with source item ${key}: fileExtensions ${ext} is not a string.`
            );
          }
        });
      }
    });
  }

  //check outputs

  (await dsLog.incrementProgressBar("validate", 10))
    .showSleep("Sources are good.", "Good", 300)
    .show("Validating outputs...", "Info");

  if (!Array.isArray(data.outputs)) {
    throw new Error("Sources is not an array.");
  }

  await dsLog.incrementProgressBar("validate", 10);

  if (data?.outputs[0] == undefined) {
    throw new Error("No sources provided.");
  }

  await dsLog.incrementProgressBar("validate", 10);

  if (data.outputs[0]) {
    data.outputs.forEach((item, key) => {
      if (!item.sourceID) {
        throw new Error(`Error with output item ${key}: no sourceID provided.`);
      }
      if (typeof item.sourceID !== "string") {
        throw new Error(
          `Error with output item ${key}: sourceID is not a string.`
        );
      }
      if (!item.dir) {
        throw new Error(
          `Error with output item ${key}: no dir paths provided.`
        );
      }
      if (
        typeof item.dir !== "string" &&
        !(Array.isArray(item.dir) && typeof item.dir[0] == "string")
      ) {
        throw new Error(
          `Error with output item ${key}: dir is not a string or a string array.`
        );
      }
      if (  !("keepComments" in item ) ) {
        throw new Error(`Error with output item ${key}: is not keepComments provided.`);
      }
      if (typeof item.keepComments !== "boolean") {
        throw new Error(
          `Error with output item ${key}: keepComments is not a boolean.`
        );
      }
      if (!item.codeSection) {
        throw new Error(
          `Error with output item ${key}: no codesection provided.`
        );
      }
      if (
        Array.isArray(item.codeSection) &&
        typeof item.codeSection[0] !== "string"
      ) {
        throw new Error(
          `Error with output item ${key}: the codesection provided is not a string.`
        );
      } else if (typeof item.codeSection === "string") {
        const acceptable = ["all", "All", "None", "none"];
        if (acceptable.indexOf(<string>item.codeSection) == -1) {
          throw new Error(
            `Error with output item ${key}: the codesection  provided [${item.codeSection}] is invalid.`
          );
        }
      } else {
        const keys = Object.keys(data.codeSections);
        item.codeSection.forEach((item) => {
          if (typeof item !== "string") {
            throw new Error(
              `Error with output item ${key}: the codesection provided [${item}] is not a string.`
            );
          }
          if (keys.indexOf(item) == -1) {
            throw new Error(
              `Error with output item ${key}: the codesection provided [${item}] is not listed in the code section for the config file.`
            );
          }
        });
      }
    });
  }

  (await dsLog.incrementProgressBar("validate", 10))
    .showSleep("Outputs are good.", "Good", 300)
    .show("Validating code sections...", "Info");
  //check code sections

  const sections = Object.keys(data.codeSections);
  if (sections.length < 1) {
    throw new Error(`Error with code sections. No code sections provided.`);
  }
  await dsLog.incrementProgressBar("validate", 10);

  sections.forEach((item) => {
    if (typeof item !== "string") {
      throw new Error(
        `Error with code section ${item}. Code section is not a string`
      );
    }
    if (!data.codeSections[item].start) {
      throw new Error(
        `Error with code section ${item}. Start is not provided.`
      );
    } else if (typeof data.codeSections[item].start !== "string") {
      throw new Error(
        `Error with code section ${item}. Start is not a string.`
      );
    }
    if (!data.codeSections[item].end) {
      throw new Error(`Error with code section ${item}. End is not provided.`);
    } else if (typeof data.codeSections[item].end !== "string") {
      throw new Error(`Error with code section ${item}. End is not a string.`);
    }
  });

  (await dsLog.incrementProgressBar("validate", 40)).show(
    "Code sections are good.",
    "Good"
  );

  return true;
}
