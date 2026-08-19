import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"

const json = execFileSync("npm", ["pack", "--dry-run", "--json"], {
  encoding: "utf8",
})
const result = JSON.parse(json)[0]
const required = new Set([
  "dist/monaco.esm.js",
  "dist/monaco.cjs",
  "dist/monaco.css",
  "dist/workers/ts.worker.js",
  "dist/workers/editor.worker.js",
  "dist/workers/json.worker.js",
  "dist/workers/css.worker.js",
  "dist/workers/html.worker.js",
  "types/monaco.d.ts",
  "LICENSE",
  "NOTICE.md",
  "README.md",
])
const files = new Set(result.files.map(({ path }) => path))
for (const path of required) {
  if (!files.has(path)) throw new Error(`npm tarball is missing ${path}`)
}
if ([...files].some((path) => path.startsWith("src/") || path.startsWith("site/"))) {
  throw new Error("npm tarball must not include src or site")
}
const manifest = JSON.parse(readFileSync("package.json", "utf8"))
if (manifest.name !== "@itslil/monaco-editor") throw new Error("unexpected package name")
if (manifest.dependencies && Object.keys(manifest.dependencies).length) {
  throw new Error("package must stay dependency-free")
}
console.log(
  `npm pack: ${result.entryCount} files, ${result.size} bytes packed, ${result.unpackedSize} bytes unpacked`,
)
