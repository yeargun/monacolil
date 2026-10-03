import {dirname,resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {readdirSync,readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {buildPackage} from './compiler-package.mjs'
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..')
// Compatibility factory sources are committed, with exact upstream provenance.
const record=JSON.parse(readFileSync(resolve(root,'src/ts-language/provider/provenance.json'),'utf8'))
const hash=path=>createHash('sha256').update(readFileSync(path)).digest('hex')
for(const [file,sha] of Object.entries(record.sources)) {
 if(hash(resolve(root,'node_modules/monaco-editor/esm/vs/languages/features/typescript',file))!==sha)throw Error(`TypeScript provider source changed: ${file}`)
}
for(const [file,sha] of Object.entries(record.derived)) {
 if(hash(resolve(root,'src/ts-language/provider',file))!==sha)throw Error(`TypeScript provider factory changed without a provenance update: ${file}`)
}
const workers=readdirSync(resolve(root,'node_modules/monaco-editor/min/vs/assets')).filter(name=>/^ts\.worker-.*\.js$/.test(name))
if(workers.length!==1)throw Error('Expected one pinned Microsoft TypeScript worker')
await buildPackage({root,profiles:[{name:'public',config:'lilscript.toml'},...['editor','json','css','html'].map(name=>({name:`${name}-worker`,target:'js',config:`config/${name}-worker.toml`}))],
 assets:[{source:'styles/monaco.css',destination:'monaco.css'}],
 providerAssets:[{package:'monaco-editor',version:'0.56.0',source:`min/vs/assets/${workers[0]}`,destination:'workers/ts.worker.js'}],
})
