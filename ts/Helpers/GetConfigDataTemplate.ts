import type { ConfigData } from "../meta/Config/ConfigData.structure";

export function GetConfigDataTemplate(): string {
  const configData: ConfigData = {
    sources: [
      {
        dir: "/",
        fileExtensions: ["js"],
        id: "main",
      },
    ],
    outputs: [
      {
        dir: "/test/",
        sourceID: "main",
        codeSection: ["test", "log"],
        keepComments: false,
      },
      {
        dir: "/perf/",
        sourceID: "main",
        codeSection: ["perf"],
        keepComments: false,
      },
      {
        dir: "/dev/",
        sourceID: "main",
        codeSection: ["dev"],
        keepComments: false,
      },
      {
        dir: "/backup/",
        sourceID: "main",
        codeSection: "All",
        keepComments: false,
      },
    ],
    codeSections: {
      test: {
        start: "@ds-test-start",
        end: "@ds-test-end",
      },
      log: {
        start: "@ds-test-log",
        end: "@ds-test-log",
      },
      perf: {
        start: "@ds-test-perf",
        end: "@ds-test-perf",
      },
      dev: {
        start: "@ds-test-dev",
        end: "@ds-test-dev",
      },
    },
  };

  return JSON.stringify(configData,null,4);
}
