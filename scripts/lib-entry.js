import { bootMonaco } from "../dist/monaco.raw.js"
import { attachTypescript } from "../src/ts-language/attach-typescript.js"

export function configureWorkers(baseHref) {
  const base = baseHref ?? new URL("./workers/", import.meta.url).href
  globalThis.MonacoEnvironment = {
    getWorker(_id, label) {
      const file =
        label === "json"
          ? "json.worker.js"
          : label === "css" || label === "scss" || label === "less"
            ? "css.worker.js"
            : label === "html" || label === "handlebars" || label === "razor"
              ? "html.worker.js"
              : label === "typescript" || label === "javascript"
                ? "ts.worker.js"
                : "editor.worker.js"
      return new Worker(new URL(file, base), { name: String(label ?? file) })
    },
  }
}

configureWorkers()

export function createMonaco() {
  const monaco = bootMonaco()
  globalThis.monaco = monaco
  globalThis.__lilEditor = true
  return monaco
}

const monaco = createMonaco()
const ready = attachTypescript(monaco)

export { monaco, ready, bootMonaco, attachTypescript }
export default monaco
