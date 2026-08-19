const data = await fetch("./results.json").then((response) => {
  if (!response.ok) throw new Error(`Unable to load results: ${response.status}`)
  return response.json()
})

const formatter = new Intl.NumberFormat("en-US")

function times(value) {
  if (value == null || Number.isNaN(value)) return "—"
  return `${value.toFixed(2)}×`
}

function bytes(value) {
  if (value == null) return "—"
  return formatter.format(value)
}

function laneBrotli(lanes, id) {
  return lanes?.[id]?.brotli11 ?? lanes?.[id]?.brotli ?? null
}

function renderHero() {
  const headline = data.headline
  document.querySelector("#hero-ratio").innerHTML = `${headline.ratio.toFixed(2)}<span>×</span>`
  document.querySelector("#hero-bytes").textContent =
    `${formatter.format(headline.jsBrotli)} B → ${formatter.format(headline.lilBrotli)} B`
  document.querySelector("#hero-modules").textContent = String(data.catalog.ported)
  document.querySelector("#hero-median").textContent = times(data.folderSummary.medianRatio)
}

function renderFolderCards() {
  const summary = data.folderSummary
  const vite = data.tooling?.vite ?? "8.2.1"
  const cards = [
    {
      label: "headline JS minify",
      value: "Vite 8 / Oxc",
      geo: true,
    },
    {
      label: "median Lil / Oxc",
      value: times(summary.medianRatio),
      win: true,
    },
    {
      label: "Vite",
      value: vite,
    },
    {
      label: "catalog modules",
      value: `${data.catalog.ported}/${data.independentModules.files}`,
    },
  ]
  document.querySelector("#folder-cards").innerHTML = cards
    .map(
      (card) => `
    <article class="perf-card${card.win ? " win" : ""}${card.geo ? " geo" : ""}">
      <strong>${card.value}</strong>
      <span>${card.label}</span>
    </article>
  `,
    )
    .join("")
}

function folderId(key) {
  return key.replace(/[^\w./-]+/g, "_")
}

function renderFolders() {
  document.querySelector("#folders-body").innerHTML = data.folders
    .map((row) => {
      const lil = row.lil ? bytes(row.lil.brotli11) : "—"
      const convert = row.conversionHref ?? `#conversion/${folderId(row.key)}`
      return `
    <tr>
      <th scope="row">
        <a class="folder-jump" href="${convert}">${row.key}</a>
        <a class="lil-link" href="${row.lilHref}" target="_blank" rel="noreferrer">.lil ↗</a>
      </th>
      <td>${bytes(row.files)}</td>
      <td>${bytes(laneBrotli(row.jsLanes, "oxc") ?? row.js?.brotli11)}</td>
      <td>${bytes(laneBrotli(row.jsLanes, "esbuild"))}</td>
      <td>${bytes(laneBrotli(row.jsLanes, "terser"))}</td>
      <td>${lil}</td>
      <td><strong>${times(row.ratioOxc ?? row.ratio)}</strong></td>
    </tr>`
    })
    .join("")
}

function renderMinifiers() {
  const lil = data.independentModules.lil
  const rows = (data.minifiers ?? []).map((row) => {
    const cls = row.primary ? " primary-lane" : ""
    return `
    <tr class="${cls}">
      <th scope="row">${row.label}</th>
      <td>${row.version}</td>
      <td>${bytes(row.js?.raw)}</td>
      <td>${bytes(row.js?.gzip9)}</td>
      <td>${bytes(row.js?.brotli11)}</td>
      <td><strong>${times(row.ratio)}</strong></td>
    </tr>`
  })
  rows.push(`
    <tr>
      <th scope="row">Lil independent modules</th>
      <td>—</td>
      <td>${bytes(lil.raw)}</td>
      <td>${bytes(lil.gzip9)}</td>
      <td>${bytes(lil.brotli11)}</td>
      <td>—</td>
    </tr>`)
  document.querySelector("#minifiers-body").innerHTML = rows.join("")
}

function renderModules() {
  const catalog = data.independentModules
  const tooling = data.tooling ?? {}
  document.querySelector("#modules-body").innerHTML = `
    <tr class="primary-lane">
      <th scope="row">monaco-editor-core files (externals)</th>
      <td>${bytes(catalog.files)}</td>
      <td>Vite 8 / Oxc · vite@${tooling.vite ?? "8.2.1"}</td>
      <td>${bytes(catalog.js.raw)}</td>
      <td>${bytes(catalog.js.gzip9)}</td>
      <td>${bytes(catalog.js.brotli11)}</td>
      <td><strong>1.00×</strong></td>
    </tr>
    <tr>
      <th scope="row">same files</th>
      <td>${bytes(catalog.files)}</td>
      <td>esbuild@${tooling.esbuild ?? "0.28.1"}</td>
      <td>${bytes(catalog.jsLanes.esbuild.raw)}</td>
      <td>${bytes(catalog.jsLanes.esbuild.gzip9)}</td>
      <td>${bytes(catalog.jsLanes.esbuild.brotli11)}</td>
      <td><strong>${times(catalog.lil.brotli11 / catalog.jsLanes.esbuild.brotli11)}</strong></td>
    </tr>
    <tr>
      <th scope="row">same files</th>
      <td>${bytes(catalog.files)}</td>
      <td>terser@${tooling.terser ?? "5.50.0"}</td>
      <td>${bytes(catalog.jsLanes.terser.raw)}</td>
      <td>${bytes(catalog.jsLanes.terser.gzip9)}</td>
      <td>${bytes(catalog.jsLanes.terser.brotli11)}</td>
      <td><strong>${times(catalog.lil.brotli11 / catalog.jsLanes.terser.brotli11)}</strong></td>
    </tr>
    <tr>
      <th scope="row">Lil independent modules</th>
      <td>${bytes(catalog.scoredLil)}</td>
      <td>—</td>
      <td>${bytes(catalog.lil.raw)}</td>
      <td>${bytes(catalog.lil.gzip9)}</td>
      <td>${bytes(catalog.lil.brotli11)}</td>
      <td><strong>${times(catalog.ratio)}</strong></td>
    </tr>`

  document.querySelector("#pairs-body").innerHTML = data.pairs
    .map((row) => {
      const oxc = laneBrotli(row.jsLanes, "oxc") ?? row.js
      const esbuild = laneBrotli(row.jsLanes, "esbuild")
      const terser = laneBrotli(row.jsLanes, "terser")
      const lilLinks = (row.lilHrefs ?? [])
        .map((item) => `<a class="lil-link" href="${item.href}" target="_blank" rel="noreferrer">${item.file} ↗</a>`)
        .join(" ")
      return `
    <tr>
      <th scope="row">
        <span>${row.title}</span>
        <span class="pair-lils">${lilLinks}</span>
      </th>
      <td>${bytes(oxc)}</td>
      <td>${bytes(esbuild)}</td>
      <td>${bytes(terser)}</td>
      <td>${bytes(row.lil)}</td>
      <td><strong>${times(row.ratio)}</strong></td>
    </tr>`
    })
    .join("")
}

function conversionState() {
  const hash = decodeURIComponent(location.hash || "")
  const match = hash.match(/^#conversion\/(.+)$/)
  return {
    folderId: match?.[1] ?? "",
    query: document.querySelector("#convert-query")?.value.trim().toLowerCase() ?? "",
  }
}

function renderConversions() {
  const body = document.querySelector("#convert-body")
  const count = document.querySelector("#convert-count")
  const clear = document.querySelector("#convert-clear")
  if (!body) return
  const { folderId: selected, query } = conversionState()
  const rows = (data.conversions ?? []).filter((row) => {
    if (selected && row.folderId !== selected) return false
    if (!query) return true
    return [row.monaco, row.lil, row.impl, row.folder].some((value) =>
      String(value ?? "").toLowerCase().includes(query),
    )
  })
  const folderLabel = data.folders.find((row) => folderId(row.key) === selected)?.key
  clear.hidden = !selected && !query
  clear.textContent = folderLabel ? `${folderLabel} · clear` : "all modules"
  count.textContent = `${formatter.format(rows.length)} / ${formatter.format(data.conversions?.length ?? 0)}`
  body.innerHTML = rows
    .map((row) => {
      const impl = row.implHref
        ? `<a class="lil-link dim" href="${row.implHref}" target="_blank" rel="noreferrer">${row.impl} ↗</a>`
        : ""
      return `
    <tr>
      <th scope="row">
        <a class="js-link" href="${row.jsHref}" target="_blank" rel="noreferrer">${row.monaco} ↗</a>
      </th>
      <td class="lil-cell">
        <a class="lil-link loud" href="${row.lilHref}" target="_blank" rel="noreferrer">${row.lil} ↗</a>
        ${impl}
      </td>
      <td>${bytes(row.jsBrotli)}</td>
      <td>${bytes(row.lilBrotli)}</td>
      <td><strong>${times(row.ratio)}</strong></td>
    </tr>`
    })
    .join("")
}

function bindConversion() {
  const input = document.querySelector("#convert-query")
  const clear = document.querySelector("#convert-clear")
  input?.addEventListener("input", () => renderConversions())
  clear?.addEventListener("click", () => {
    if (input) input.value = ""
    history.replaceState(null, "", `${location.pathname}${location.search}#conversion`)
    renderConversions()
    document.querySelector("#conversion")?.scrollIntoView({ behavior: "smooth", block: "start" })
  })
  window.addEventListener("hashchange", () => {
    if (location.hash.startsWith("#conversion")) renderConversions()
  })
  if (location.hash.startsWith("#conversion/")) {
    document.querySelector("#conversion")?.scrollIntoView({ behavior: "instant", block: "start" })
  }
}

function renderDemos() {
  const demoGrid = document.querySelector("#demo-grid")
  demoGrid.innerHTML = data.examples
    .map(
      (example, index) => `
    <article class="demo-card" style="--order:${index}">
      <header>
        <div>
          <span class="case-number">${String(index + 1).padStart(2, "0")}</span>
          <h3>${example.title}</h3>
        </div>
        <strong class="saving">${example.id === "lil" ? "lil" : "vite/oxc"}</strong>
      </header>
      <div class="demo-frame-wrap">
        <iframe
          src="${example.href}"
          title="${example.title}"
          loading="lazy"
        ></iframe>
      </div>
      <footer>
        <span>${example.blurb}</span>
        <div>
          <a href="${example.href}">open ↗</a>
          <button class="replay" type="button" aria-label="Replay ${example.title}">replay ↻</button>
        </div>
      </footer>
    </article>
  `,
    )
    .join("")

  demoGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".replay")
    if (!button) return
    const iframe = button.closest(".demo-card").querySelector("iframe")
    iframe.src = iframe.src
  })
}

function renderProduction() {
  const p = data.production
  const jsTs = p.workers.find((row) => row.name === "ts.worker.js")?.js
  const lilTs = p.lilWorkers.find((row) => row.name === "ts.worker.js")?.lil
  const lanes = p.jsMinifiers ?? {}
  const rows = [
    ["ide.js · Vite 8 / Oxc", lanes.oxc ?? p.js.ide, p.lil.ide],
    ["ide.js · esbuild 0.28.1", lanes.esbuild, p.lil.ide],
    ["ide.js · Terser 5.50.0", lanes.terser, p.lil.ide],
    ["workers except tsc", {
      raw: p.js.workers.raw - (jsTs?.raw ?? 0),
      brotli: p.js.workers.brotli - (jsTs?.brotli ?? 0),
    }, {
      raw: p.lil.workers.raw - (lilTs?.raw ?? 0),
      brotli: p.lil.workers.brotli - (lilTs?.brotli ?? 0),
    }],
    ["editor CSS", p.js.css, p.lil.css],
  ].filter(([, js]) => js)
  document.querySelector("#production-body").innerHTML = rows
    .map(([name, js, lil]) => {
      const r = lil.brotli / js.brotli
      return `
    <tr>
      <th scope="row">${name}</th>
      <td>${bytes(js.raw)}</td>
      <td>${bytes(js.brotli)}</td>
      <td>${bytes(lil.raw)}</td>
      <td>${bytes(lil.brotli)}</td>
      <td><strong>${times(r)}</strong></td>
    </tr>`
    })
    .join("")

  const bars = [
    { name: "JS ide.js Brotli · Vite 8 / Oxc", value: (lanes.oxc ?? p.js.ide).brotli, primary: false },
    { name: "JS ide.js Brotli · esbuild", value: lanes.esbuild?.brotli ?? p.js.ide.brotli, primary: false },
    { name: "JS ide.js Brotli · Terser", value: lanes.terser?.brotli ?? p.js.ide.brotli, primary: false },
    { name: "Lil ide.js Brotli", value: p.lil.ide.brotli, primary: true },
  ]
  const max = Math.max(...bars.map((bar) => bar.value))
  document.querySelector("#total-bar").innerHTML = bars
    .map((bar) => {
      const width = Math.max(18, (bar.value / max) * 100)
      const cls = bar.primary ? "bar-lil" : "bar-official"
      return `<div class="${cls}" style="width:${width}%"><span>${bar.name}</span><strong>${formatter.format(bar.value)} B</strong></div>`
    })
    .join("")
}

function bindCopy() {
  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy]")
    if (!button) return
    await navigator.clipboard.writeText(button.dataset.copy)
    button.textContent = "copied"
    window.setTimeout(() => {
      button.textContent = "copy"
    }, 1200)
  })
}

function bindProgress() {
  const bar = document.querySelector(".progress")
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
  }
  window.addEventListener("scroll", update, { passive: true })
  update()
}

renderHero()
renderFolderCards()
renderFolders()
renderMinifiers()
renderModules()
renderConversions()
renderDemos()
renderProduction()
bindConversion()
bindCopy()
bindProgress()
