import { accessSync, constants, existsSync, mkdirSync, readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { spawnSync } from "node:child_process"
import { build as esbuild } from "esbuild"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const require = createRequire(import.meta.url)
const lilscriptRoot = process.env.LILSCRIPT_ROOT ?? resolve(root, "..", "lilscript")
const labRoot = resolve(lilscriptRoot, "benchmarks", "popular")
const dist = resolve(root, "dist")
const banner =
  "/*! @itslil/monaco-editor 0.56.0 | LilScript reimplementation of monaco-editor 0.56.0 | MIT */\n"

function compilerPath() {
  const candidates = [
    process.env.LILSCRIPT_COMPILER,
    resolve(lilscriptRoot, "target", "release", "lilscript"),
    resolve(lilscriptRoot, "target", "debug", "lilscript"),
  ].filter(Boolean)
  for (const candidate of candidates) {
    try {
      accessSync(candidate, constants.X_OK)
      return candidate
    } catch {
      // try next
    }
  }
  return null
}

function run(cmd, args) {
  const result = spawnSync(cmd, args, { cwd: root, stdio: "inherit" })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

function resolveMonacoRegister() {
  const candidates = [
    resolve(root, "node_modules/monaco-editor/esm/vs/languages/features/typescript/register.js"),
    resolve(labRoot, "node_modules/monaco-editor/esm/vs/languages/features/typescript/register.js"),
  ]
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate
  }
  throw new Error("monaco-editor TypeScript register.js not found. Run npm install.")
}

if (process.argv.includes("--compile")) {
  const compiler = compilerPath()
  if (!compiler) {
    throw new Error("LilScript compiler not found. Set LILSCRIPT_COMPILER or build lilscript.")
  }
  mkdirSync(dist, { recursive: true })
  run(compiler, [
    resolve(root, "src", "entry.lil"),
    "--target",
    "js-module",
    "--config",
    resolve(root, "lilscript.toml"),
    "-o",
    resolve(dist, "monaco.raw.js"),
  ])
}

const rawPath = resolve(dist, "monaco.raw.js")
if (!existsSync(rawPath)) {
  throw new Error("dist/monaco.raw.js is missing. Run with --compile after building LilScript.")
}

const jsHost = resolve(root, "src", "js-host.ts")
const shim = resolve(root, "src", "ts-language", "monaco-api-shim.js")
const workers = resolve(root, "src", "ts-language", "worker-client.js")
const register = resolveMonacoRegister()

const plugins = [
  {
    name: "monacolil-resolve",
    setup(build) {
      build.onResolve({ filter: /(^|\/)js-host(\.ts)?$/ }, () => ({ path: jsHost }))
      build.onResolve({ filter: /^monaco-ts-register$/ }, () => ({ path: register }))
      build.onResolve({ filter: /\/editor\/editor\.api\.js$/ }, () => ({ path: shim }))
      build.onResolve({ filter: /\/internal\/common\/workers\.js$/ }, () => ({ path: workers }))
    },
  },
]

const common = {
  absWorkingDir: root,
  entryPoints: [resolve(root, "scripts", "lib-entry.js")],
  bundle: true,
  platform: "browser",
  minify: true,
  banner: { js: banner },
  plugins,
  logOverride: {
    "import-is-undefined": "silent",
    "empty-import-meta": "silent",
  },
}

await esbuild({
  ...common,
  outfile: resolve(dist, "monaco.esm.js"),
  format: "esm",
})

await esbuild({
  ...common,
  outfile: resolve(dist, "monaco.cjs"),
  format: "cjs",
})

const raw = readFileSync(resolve(dist, "monaco.esm.js"), "utf8")
if (!raw.includes("bootMonaco") && !raw.includes("createMonaco")) {
  throw new Error("library bundle is missing the monaco boot export")
}

console.log("wrote dist/monaco.esm.js and dist/monaco.cjs")
void require
