import {monaco,ready} from "./package/monaco.esm.js";
import {mountIde} from "../workbench.js";
await ready;
mountIde(monaco,{label:"LilScript Monaco",otherHref:"../js/", otherLabel:"Original Monaco →", languageFeatures:true, banner:"Current LilScript editor package. Partial Monaco API; CSS and workers are separate assets. See the library page for scope and size evidence."});
