const data = await fetch("./results.json").then((response) => {
  if (!response.ok) throw new Error(`Unable to load results: ${response.status}`)
  return response.json()
})

const formatter = new Intl.NumberFormat("en-US")

function times(value) {
  if (value == null || Number.isNaN(value)) return "—"
  return `${value.toFixed(2)}×`
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
  const cards = [
    {
      label: "JS minifier",
      value: "esbuild",
      geo: true,
    },
    {
      label: "median Lil / JS",
      value: times(summary.medianRatio),
      win: true,
    },
    {
      label: "folders",
      value: String(summary.folders),
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

function renderFolders() {
  document.querySelector("#folders-body").innerHTML = data.folders
    .map((row) => {
      const lil = row.lil ? formatter.format(row.lil.brotli11) : "—"
      return `
    <tr>
      <th scope="row">${row.key}</th>
      <td>${formatter.format(row.files)}</td>
      <td>${row.jsMinifier}</td>
      <td>${formatter.format(row.js.brotli11)}</td>
      <td>${lil}</td>
      <td><strong>${times(row.ratio)}</strong></td>
    </tr>`
    })
    .join("")
}

function renderModules() {
  const catalog = data.independentModules
  document.querySelector("#modules-body").innerHTML = `
    <tr>
      <th scope="row">monaco-editor-core files (externals)</th>
      <td>${formatter.format(catalog.files)}</td>
      <td>esbuild</td>
      <td>${formatter.format(catalog.js.raw)}</td>
      <td>${formatter.format(catalog.js.gzip9)}</td>
      <td>${formatter.format(catalog.js.brotli11)}</td>
      <td><strong>1.00×</strong></td>
    </tr>
    <tr>
      <th scope="row">Lil independent modules</th>
      <td>${formatter.format(catalog.scoredLil)}</td>
      <td>—</td>
      <td>${formatter.format(catalog.lil.raw)}</td>
      <td>${formatter.format(catalog.lil.gzip9)}</td>
      <td>${formatter.format(catalog.lil.brotli11)}</td>
      <td><strong>${times(catalog.ratio)}</strong></td>
    </tr>`

  document.querySelector("#pairs-body").innerHTML = data.pairs
    .map(
      (row) => `
    <tr>
      <th scope="row">${row.title}</th>
      <td>${row.jsMinifier}</td>
      <td>${formatter.format(row.js)}</td>
      <td>${formatter.format(row.lil)}</td>
      <td><strong>${times(row.ratio)}</strong></td>
    </tr>`,
    )
    .join("")
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
        <strong class="saving">${example.id === "lil" ? "lil" : "esbuild"}</strong>
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
  const rows = [
    ["ide.js (esbuild on JS)", p.js.ide, p.lil.ide],
    ["workers except tsc", {
      raw: p.js.workers.raw - (jsTs?.raw ?? 0),
      brotli: p.js.workers.brotli - (jsTs?.brotli ?? 0),
    }, {
      raw: p.lil.workers.raw - (lilTs?.raw ?? 0),
      brotli: p.lil.workers.brotli - (lilTs?.brotli ?? 0),
    }],
    ["editor CSS", p.js.css, p.lil.css],
  ]
  document.querySelector("#production-body").innerHTML = rows
    .map(([name, js, lil]) => {
      const r = lil.brotli / js.brotli
      return `
    <tr>
      <th scope="row">${name}</th>
      <td>${formatter.format(js.raw)}</td>
      <td>${formatter.format(js.brotli)}</td>
      <td>${formatter.format(lil.raw)}</td>
      <td>${formatter.format(lil.brotli)}</td>
      <td><strong>${times(r)}</strong></td>
    </tr>`
    })
    .join("")

  const bars = [
    { name: "JS ide.js Brotli · esbuild", value: p.js.ide.brotli, primary: false },
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
renderModules()
renderDemos()
renderProduction()
bindCopy()
bindProgress()
