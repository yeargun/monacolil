import {createProvider} from './ts-language/provider/index.mjs';
import {createAttach} from './ts-language/attach-factory.mjs';
export function createPackage(bootMonaco,moduleUrl) {
 const {attachTypescript}=createAttach(createProvider(moduleUrl));
function configureWorkers(baseHref) {
  const base = baseHref ?? new URL("./workers/", moduleUrl).href
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

function createMonaco() {
  const monaco = bootMonaco()
  globalThis.monaco = monaco
  globalThis.__lilEditor = true
  return monaco
}

const monaco = createMonaco()
const ready = attachTypescript(monaco)

return {monaco,ready,bootMonaco,attachTypescript,createMonaco,configureWorkers};
}
