import { readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const lab = JSON.parse(readFileSync(resolve(root, "reports", "lab-sizes.json"), "utf8"))

function ratio(lil, js) {
  if (lil == null || !js) return null
  return lil / js
}

const folders = (lab.coreComparison?.folders ?? []).map((row) => {
  const js = row.js?.brotli ?? 0
  const lil = row.lil?.brotli ?? null
  return {
    key: row.key,
    files: row.files,
    scoredLil: row.scoredLil,
    jsMinifier: "esbuild",
    js: { raw: row.js.raw, gzip9: row.js.gzip, brotli11: js },
    lil: row.lil
      ? { raw: row.lil.raw, gzip9: row.lil.gzip, brotli11: lil }
      : null,
    ratio: ratio(lil, js),
  }
})
folders.sort((a, b) => (b.js.brotli11 ?? 0) - (a.js.brotli11 ?? 0))

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

const pairs = (lab.pairs ?? [])
  .filter((row) => row.js && row.lil)
  .map((row) => ({
    id: row.id,
    title: row.title,
    plugged: row.plugged,
    monacoFiles: row.monacoFiles,
    lilFiles: row.lilFiles,
    jsMinifier: row.js.lane ?? "esbuild",
    js: row.js.sizes.brotli,
    lil: row.lil.sizes.brotli,
    ratio: ratio(row.lil.sizes.brotli, row.js.sizes.brotli),
  }))
  .sort((a, b) => b.js - a.js)

const results = {
  pin: "monaco-editor@0.56.0",
  package: "@itslil/monaco-editor",
  featureParity: false,
  codec: "lilscript-codec gzip-9 / brotli-11",
  ratioNote: "ratio = LilScript Brotli-11 / JS Brotli-11",
  jsMinifier: {
    folders: "esbuild minify",
    production: "esbuild minify",
    pairs: "esbuild and terser; best Brotli-11",
  },
  vscodeCommit: lab.versions?.vscodeCommit,
  catalog: lab.catalog,
  headline: {
    key: headline?.key ?? "editor/common",
    files: headline?.files ?? 0,
    jsBrotli: headline?.js.brotli11 ?? 0,
    lilBrotli: headline?.lil?.brotli11 ?? 0,
    ratio: headline?.ratio ?? null,
    jsMinifier: "esbuild",
    note: "Largest JS folder. Independently compiled modules, other monaco imports left external. JS minified with esbuild. Ratio is Lil Brotli / JS Brotli.",
  },
  independentModules: {
    label: "nontest-entire-module",
    jsMinifier: "esbuild minify",
    note: "Each monaco-editor-core file is esbuild-minified with other monaco imports external, then scored Brotli-11 against the matching LilScript file compiled alone (js-module keepers). Ratio is Lil Brotli / JS Brotli. This is not the shipped editor bundle and not a claim of product parity.",
    files: totals?.files ?? 0,
    scoredLil: totals?.scoredLil ?? 0,
    js: {
      raw: totals?.js.raw ?? 0,
      gzip9: totals?.js.gzip ?? 0,
      brotli11: totals?.js.brotli ?? 0,
    },
    lil: totals?.lil
      ? {
          raw: totals.lil.raw,
          gzip9: totals.lil.gzip,
          brotli11: totals.lil.brotli,
        }
      : null,
    ratio: ratio(totals?.lil?.brotli, totals?.js?.brotli),
  },
  folderSummary: {
    folders: folders.length,
    scored: scored.length,
    medianRatio: median(scored.map((row) => row.ratio)),
    jsMinifier: "esbuild",
  },
  folders,
  pairs,
  production: {
    jsMinifier: "esbuild minify",
    note: "Diagnostic only. The Lil page is not a 100% feature-complete monaco-editor. JS side is esbuild minify of monaco-editor ESM. Ratio is Lil Brotli / JS Brotli.",
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
      blurb: "esbuild-minified monaco-editor, same chrome.",
    },
  ],
}

writeFileSync(resolve(root, "site", "results.json"), `${JSON.stringify(results, null, 2)}\n`)
console.log(
  `wrote site/results.json · ${folders.length} folders · headline ${results.headline.key} ${results.headline.ratio?.toFixed(2)}×`,
)
