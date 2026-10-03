import { configureOriginalWorkers } from "./monaco-env.js";
import * as monaco from "monaco-editor";
import { mountIde } from "../workbench.js";

configureOriginalWorkers();
globalThis.monaco = monaco;

mountIde(monaco, {
  label: "monaco-editor 0.56",
  otherHref: "../lil/",
  otherLabel: "← LilScript",
  languageFeatures: true,
  banner:
    "Original monaco-editor 0.56.0. The paired LilScript implementation has a smaller feature scope; library comparisons disclose that boundary.",
});
