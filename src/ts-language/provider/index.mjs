import {createRegister} from './register.mjs';
import {createFeatures} from './languageFeatures.mjs';
import {createWorkerManager} from './workerManager.mjs';
import {createMode} from './tsMode.mjs';
import {typescriptVersion} from './typescriptServicesMetadata.mjs';
import {libFileSet} from './lib.index.mjs';
import {languages,Emitter,Uri,editor,MarkerTag,MarkerSeverity,Range} from '../monaco-api-shim.js';
import {createWebWorker} from '../worker-client.js';
// Keep the original lazy initialization, including cached success/failure and
// asynchronous access from both onLanguage callbacks and explicit worker reads.
export function createProvider(moduleUrl) {
 let registerPromise,modePromise,api;
 async function loadMode() {
  if (!modePromise) modePromise=(async()=>{
   await 0;
   const features=createFeatures({typescriptDefaults:api.typescriptDefaults,libFileSet,Uri,editor,MarkerTag,MarkerSeverity,Range,languages});
   const {WorkerManager}=createWorkerManager({editor,createWebWorker,moduleUrl});
   return createMode({WorkerManager,languages,...features});
  })();
  return modePromise;
 }
 return async function loadRegister() {
  if (!registerPromise) registerPromise=(async()=>{
   await 0;
   return api=createRegister({typescriptVersion,languages,Emitter,loadMode});
  })();
  return registerPromise;
 };
}
