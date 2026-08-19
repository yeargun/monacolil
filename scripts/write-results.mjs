import { readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const lab = JSON.parse(readFileSync(resolve(root, "reports", "lab-sizes.json"), "utf8"))

function ratio(js, lil) {
  if (!lil) return null
  return js / lil
}

const folders = (lab.coreComparison?.folders ?? []).map((row) => {
  const js = row.js?.brotli ?? 0
  const lil = row.lil?.brotli ?? null
  const r = ratio(js, lil)
  return {
    key: row.key,
    files: row.files,
    scoredLil: row.scoredLil,
    js: { raw: row.js.raw, gzip9: row.js.gzip, brotli11: js },
    lil: row.lil
      ? { raw: row.lil.raw, gzip9: row.lil.gzip, brotli11: lil }
      : null,
    ratio: r,
    band: r == null ? "unscored" : r < 0.8 ? "js-smaller" : r <= 2.5 ? "comparable" : "suspicious",
  }
})
folders.sort((a, b) => (b.js.brotli11 ?? 0) - (a.js.brotli11 ?? 0))

const scored = folders.filter((row) => row.ratio != null)
const comparable = scored.filter((row) => row.band === "comparable")
const suspicious = scored.filter((row) => row.band === "suspicious")
const smaller = scored.filter((row) => row.lil && row.lil.brotli11 < row.js.brotli11)

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
    js: row.js.sizes.brotli,
    lil: row.lil.sizes.brotli,
    ratio: row.js.sizes.brotli / row.lil.sizes.brotli,
  }))

const results = {
  pin: "monaco-editor@0.56.0",
  package: "@itslil/monaco-editor",
  featureParity: false,
  codec: "lilscript-codec gzip-9 / brotli-11",
  vscodeCommit: lab.versions?.vscodeCommit,
  catalog: lab.catalog,
  headline: {
    key: headline?.key ?? "editor/common",
    files: headline?.files ?? 0,
    jsBrotli: headline?.js.brotli11 ?? 0,
    lilBrotli: headline?.lil?.brotli11 ?? 0,
    ratio: headline?.ratio ?? null,
    note: "Largest scored folder. Independently compiled modules, other monaco imports left external. Not the running IDE.",
  },
  independentModules: {
    label: "nontest-entire-module",
    note: "Each monaco-editor-core file is esbuild-minified with other monaco imports external, then scored Brotli-11 against the matching LilScript file compiled alone (js-module keepers). This is not the shipped editor bundle and not a claim of product parity.",
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
  },
  folderSummary: {
    folders: folders.length,
    scored: scored.length,
    lilSmaller: smaller.length,
    comparable: comparable.length,
    suspicious: suspicious.length,
    medianRatio: median(scored.map((row) => row.ratio)),
    comparableMedian: median(comparable.map((row) => row.ratio)),
  },
  folders,
  pairs,
  production: {
    note: "Diagnostic only. The Lil page is not a 100% feature-complete monaco-editor. Whole-page Brotli gaps this large are not a fair product claim.",
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
      blurb: "Stock monaco-editor, same chrome.",
    },
  ],
}

writeFileSync(resolve(root, "site", "results.json"), `${JSON.stringify(results, null, 2)}\n`)
console.log(
  `wrote site/results.json · ${folders.length} folders · headline ${results.headline.key} ${results.headline.ratio?.toFixed(2)}×`,
)
