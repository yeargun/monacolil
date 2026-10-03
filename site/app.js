import {renderComparison} from './objective-comparison.js';
const comparison=await fetch('./comparison.json').then(r=>{if(!r.ok)throw Error('Comparison failed to load');return r.json()});
renderComparison(comparison);
const data=await fetch('./results.json').then(r=>r.json());
const demoGrid=document.querySelector('#demo-grid');
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
renderDemos();
