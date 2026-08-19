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
const folders = (lab.coreComparison?.folders ?? []).map((row) => {
  const js = row.jsLanes?.[headlineLane] ?? row.js
  const lil = row.lil
  const jsBrotli = js?.brotli ?? js?.brotli11 ?? 0
  const lilBrotli = lil?.brotli ?? lil?.brotli11 ?? null
  return {
    key: row.key,
    files: row.files,
    scoredLil: row.scoredLil,
    jsMinifier: "vite/oxc",
    js: laneSizes(js),
    lil: lil ? laneSizes(lil) : null,
    jsLanes: {
      oxc: laneSizes(row.jsLanes?.oxc ?? js),
      esbuild: laneSizes(row.jsLanes?.esbuild),
      terser: laneSizes(row.jsLanes?.terser),
    },
    ratio: ratio(lilBrotli, jsBrotli),
    ratioOxc: ratio(lilBrotli, row.jsLanes?.oxc?.brotli ?? jsBrotli),
    ratioEsbuild: ratio(lilBrotli, row.jsLanes?.esbuild?.brotli),
    ratioTerser: ratio(lilBrotli, row.jsLanes?.terser?.brotli),
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

const totals = lab.coreComparison?.totals
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
  tooling,
  jsMinifier: {
    headline: "vite/oxc",
    folders: "Vite 8 Oxc minify (default client minifier)",
    production: "Vite 8 Oxc minify; esbuild and Terser also scored",
    pairs: "Vite 8 Oxc / esbuild / Terser; headline Vite/Oxc",
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
    note: "Largest JS folder. Independently compiled modules, other monaco imports left external. Headline JS is Vite 8 Oxc minify. Ratio is Lil Brotli / JS Brotli.",
  },
  minifiers,
  independentModules: {
    label: "nontest-entire-module",
    jsMinifier: "vite/oxc",
    note: "Each monaco-editor-core file is minified with Vite 8 Oxc, esbuild, and Terser, other monaco imports external, then scored Brotli-11 against the matching LilScript file compiled alone. Headline JS is Vite/Oxc. Ratio is Lil Brotli / JS Brotli.",
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
