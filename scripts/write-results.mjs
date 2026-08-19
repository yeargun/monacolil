import { readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const lab = JSON.parse(readFileSync(resolve(root, "reports", "lab-sizes.json"), "utf8"))

function ratio(lil, js) {
  if (lil == null || !js) return null
  return lil / js
}

function laneSizes(sizes) {
  if (!sizes) return null
  return { raw: sizes.raw, gzip9: sizes.gzip ?? sizes.gzip9, brotli11: sizes.brotli ?? sizes.brotli11 }
}

const headlineLane = "oxc"

function emptyLane() {
  return { raw: 0, gzip: 0, brotli: 0 }
}

function addLane(into, sizes) {
  if (!sizes) return
  into.raw += sizes.raw ?? 0
  into.gzip += sizes.gzip ?? sizes.gzip9 ?? 0
  into.brotli += sizes.brotli ?? sizes.brotli11 ?? 0
}

function comparableFile(row) {
  return (row.jsKind ?? "runtime") === "runtime" && row.js
}

const comparableFiles = (lab.coreComparison?.files ?? []).filter(comparableFile)
const grouped = new Map()
for (const row of comparableFiles) {
  const key = row.folder
  const list = grouped.get(key) ?? []
  list.push(row)
  grouped.set(key, list)
}

const folders = [...grouped.entries()].map(([key, rows]) => {
  const js = emptyLane()
  const lil = emptyLane()
  const jsLanes = { oxc: emptyLane(), esbuild: emptyLane(), terser: emptyLane() }
  let scoredLil = 0
  for (const row of rows) {
    addLane(js, row.jsLanes?.[headlineLane] ?? row.js)
    if (row.jsLanes) {
      addLane(jsLanes.oxc, row.jsLanes.oxc)
      addLane(jsLanes.esbuild, row.jsLanes.esbuild)
      addLane(jsLanes.terser, row.jsLanes.terser)
    }
    if (row.lil && row.lil.unique !== false) {
      addLane(lil, row.lil)
      scoredLil += 1
    }
  }
  const lilSizes = scoredLil ? lil : null
  return {
    key,
    files: rows.length,
    scoredLil,
    jsMinifier: "vite/oxc",
    js: laneSizes(js),
    lil: lilSizes ? laneSizes(lilSizes) : null,
    jsLanes: {
      oxc: laneSizes(jsLanes.oxc),
      esbuild: laneSizes(jsLanes.esbuild),
      terser: laneSizes(jsLanes.terser),
    },
    ratio: ratio(lilSizes?.brotli, js.brotli),
    ratioOxc: ratio(lilSizes?.brotli, jsLanes.oxc.brotli || js.brotli),
    ratioEsbuild: ratio(lilSizes?.brotli, jsLanes.esbuild.brotli),
    ratioTerser: ratio(lilSizes?.brotli, jsLanes.terser.brotli),
  }
})
folders.sort((a, b) => (b.js?.brotli11 ?? 0) - (a.js?.brotli11 ?? 0))

const scored = folders.filter((row) => row.ratio != null)

function median(values) {
  const rows = [...values].sort((a, b) => a - b)
  if (rows.length === 0) return null
  const mid = Math.floor(rows.length / 2)
  return rows.length % 2 ? rows[mid] : (rows[mid - 1] + rows[mid]) / 2
}

const totalsFromFiles = {
  files: comparableFiles.length,
  scoredLil: comparableFiles.filter((row) => row.lil && row.lil.unique !== false).length,
  jsLanes: { oxc: emptyLane(), esbuild: emptyLane(), terser: emptyLane() },
  lil: emptyLane(),
}
for (const row of comparableFiles) {
  if (row.jsLanes) {
    addLane(totalsFromFiles.jsLanes.oxc, row.jsLanes.oxc)
    addLane(totalsFromFiles.jsLanes.esbuild, row.jsLanes.esbuild)
    addLane(totalsFromFiles.jsLanes.terser, row.jsLanes.terser)
  }
  if (row.lil && row.lil.unique !== false) addLane(totalsFromFiles.lil, row.lil)
}
const totals = {
  ...(lab.coreComparison?.totals ?? {}),
  files: totalsFromFiles.files,
  scoredLil: totalsFromFiles.scoredLil,
  js: totalsFromFiles.jsLanes.oxc,
  jsLanes: totalsFromFiles.jsLanes,
  lil: totalsFromFiles.lil,
}
const production = lab.production
const headline = folders.find((row) => row.key === "editor/common")
const tooling = lab.coreComparison?.tooling ?? lab.tooling ?? {
  vite: "8.2.1",
  oxc: "vite@8.2.1 minify (Oxc, Vite 8 default)",
  esbuild: "0.28.1",
  terser: "5.50.0",
  rolldown: "1.2.4",
}

const pairs = (lab.pairs ?? [])
  .filter((row) => row.js && row.lil)
  .map((row) => ({
    id: row.id,
    title: row.title,
    plugged: row.plugged,
    monacoFiles: row.monacoFiles,
    lilFiles: row.lilFiles,
    jsMinifier: row.js.lanes?.oxc ? "vite/oxc" : (row.js.lane ?? "esbuild"),
    js: row.js.lanes?.oxc?.brotli ?? row.js.sizes.brotli,
    lil: row.lil.sizes.brotli,
    ratio: ratio(row.lil.sizes.brotli, row.js.lanes?.oxc?.brotli ?? row.js.sizes.brotli),
    jsLanes: row.js.lanes
      ? {
          oxc: laneSizes(row.js.lanes.oxc),
          esbuild: laneSizes(row.js.lanes.esbuild),
          terser: laneSizes(row.js.lanes.terser),
        }
      : null,
  }))
  .sort((a, b) => b.js - a.js)

const jsLanes = totals?.jsLanes ?? {}
const lilBrotli = totals?.lil?.brotli ?? 0
const minifiers = ["oxc", "esbuild", "terser"].map((id) => {
  const js = jsLanes[id]
  return {
    id,
    label: id === "oxc" ? "Vite 8 / Oxc" : id === "esbuild" ? "esbuild" : "Terser",
    version:
      id === "oxc"
        ? tooling.oxc ?? `vite@${tooling.vite}`
        : id === "esbuild"
          ? `esbuild@${tooling.esbuild}`
          : `terser@${tooling.terser}`,
    js: laneSizes(js),
    ratio: ratio(lilBrotli, js?.brotli),
    primary: id === headlineLane,
  }
})

const results = {
  pin: "monaco-editor@0.56.0",
  package: "@itslil/monaco-editor",
  featureParity: false,
  codec: "lilscript-codec gzip-9 / brotli-11",
  ratioNote: "ratio = LilScript Brotli-11 / JS Brotli-11",
  retention:
    "Library retention on both sides: JS keeps ESM exports; Lil export class is type-only so keepers call public constructors/methods. Unused privates may DCE. CSS-only and re-export JS files are excluded. Tiny Lil rows are incomplete ports, not a different tree-shaker.",
  tooling,
  jsMinifier: {
    headline: "vite/oxc",
    folders: "Vite 8 Oxc minify (default client minifier)",
    production: "Vite 8 Oxc minify; esbuild and Terser also scored",
    pairs: "Vite 8 Oxc / esbuild / Terser; Lil compiled with the same public-method keepers as the catalog",
  },
  vscodeCommit: lab.versions?.vscodeCommit,
  catalog: lab.catalog,
  headline: {
    key: headline?.key ?? "editor/common",
    files: headline?.files ?? 0,
    jsBrotli: headline?.js.brotli11 ?? 0,
    lilBrotli: headline?.lil?.brotli11 ?? 0,
    ratio: headline?.ratio ?? null,
    jsMinifier: "vite/oxc",
    note: "Largest JS folder among runtime JS files (CSS-only / re-export monaco files excluded). JS keeps ESM exports. Lil keepers retain public class methods. Ratio is Lil Brotli / Vite 8 Oxc Brotli.",
  },
  minifiers,
  independentModules: {
    label: "nontest-entire-module",
    jsMinifier: "vite/oxc",
    note: "Runtime monaco-editor-core files only. JS: other monaco imports external, all ESM exports kept, Vite 8 Oxc / esbuild / Terser. Lil: js-module keepers retain exported class methods whose types are in-file or imported. CSS-only and re-export JS files excluded. Ratio is Lil Brotli / JS Brotli.",
    files: totals?.files ?? 0,
    scoredLil: totals?.scoredLil ?? 0,
    js: laneSizes(jsLanes.oxc ?? totals?.js),
    lil: totals?.lil ? laneSizes(totals.lil) : null,
    jsLanes: {
      oxc: laneSizes(jsLanes.oxc),
      esbuild: laneSizes(jsLanes.esbuild),
      terser: laneSizes(jsLanes.terser),
    },
    ratio: ratio(lilBrotli, jsLanes.oxc?.brotli ?? totals?.js?.brotli),
  },
  folderSummary: {
    folders: folders.length,
    scored: scored.length,
    medianRatio: median(scored.map((row) => row.ratio)),
    jsMinifier: "vite/oxc",
  },
  folders,
  pairs,
  production: {
    jsMinifier: "vite/oxc",
    note: "Diagnostic only. JS ide.js is Vite 8 Oxc minify of monaco-editor ESM; esbuild and Terser lanes are also scored. Ratio is Lil Brotli / JS Brotli.",
    js: {
      ide: production.js.ide,
      workers: production.js.workers,
      css: production.js.css,
    },
    lil: {
      ide: production.lil.ide,
      workers: production.lil.workers,
      css: production.lil.css,
    },
    jsMinifiers: production.jsMinifiers ?? null,
    workers: (production.workers?.files ?? []).map((row) => ({
      name: row.name,
      js: row.sizes,
    })),
    lilWorkers: (production.lilWorkers?.files ?? []).map((row) => ({
      name: row.name,
      lil: row.sizes,
    })),
  },
  examples: [
    {
      id: "lil",
      title: "LilScript monaco",
      href: "./demos/lil/",
      blurb: "Compiled Lil editor + official Microsoft ts.worker.",
    },
    {
      id: "js",
      title: "npm monaco-editor 0.56",
      href: "./demos/js/",
      blurb: "monaco-editor workbench. Catalog JS is Vite 8 / Oxc.",
    },
  ],
}

writeFileSync(resolve(root, "site", "results.json"), `${JSON.stringify(results, null, 2)}\n`)
console.log(
  `wrote site/results.json · ${folders.length} folders · headline ${results.headline.key} ${results.headline.ratio?.toFixed(2)}× vite/oxc`,
)
