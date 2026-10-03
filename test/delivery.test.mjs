import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {test} from 'node:test';
import vm from 'node:vm';

for (const format of ['esm', 'cjs']) test(`compiler ${format} package and lazy TypeScript registration`, async () => {
  const requests=[];
  globalThis.window=globalThis; // Browser timer APIs used by the TypeScript provider.
  globalThis.Worker=class {constructor(url,options){requests.push({url:String(url),options});}};
  const api=format==='esm' ? await import('../dist/monaco.esm.js') : createRequire(import.meta.url)('../dist/monaco.cjs');
  assert.equal(api.default,api.monaco);
  assert.equal(globalThis.monaco,api.monaco);
  assert.equal(requests.length,0);
  await api.ready;
  assert.equal(typeof api.monaco.languages.typescript.getTypeScriptWorker,'function');
  for (const [label,file] of [['json','json'],['scss','css'],['razor','html'],['javascript','ts'],['plain','editor']]) {
    globalThis.MonacoEnvironment.getWorker('test',label);
    assert.equal(requests.at(-1).url,new URL(`../dist/workers/${file}.worker.js`,import.meta.url).href);
  }
  api.configureWorkers('https://example.test/editor-workers/');
  globalThis.MonacoEnvironment.getWorker('test','typescript');
  assert.equal(requests.at(-1).url,'https://example.test/editor-workers/ts.worker.js');
});

for (const worker of ['editor','json','css','html']) test(`compiler ${worker} worker transport`,async()=>{
  const replies=[];
  const self={postMessage:message=>replies.push(message)};
  const context=vm.createContext({self,console});
  vm.runInContext(await readFile(new URL(`../dist/workers/${worker}.worker.js`,import.meta.url),'utf8'),context);
  self.onmessage({data:{id:17,method:'ping'}});
  assert.equal(replies.length,1);assert.equal(replies[0].id,17);assert.equal(replies[0].res,'pong');
  self.onmessage({data:{req:18,method:'unknown',uri:'inmemory:///example'}});
  assert.equal(replies[1].id,18);assert.equal(replies[1].res,'inmemory:///example');
});
