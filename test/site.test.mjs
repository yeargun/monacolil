import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { describe, it } from "node:test"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const site = resolve(root, "_site")

describe("github pages artifact", () => {
  it("ships the landing page, results, and paired editors", () => {
    for (const path of [
      "index.html",
      "styles.css",
      "app.js",
      "results.json",
      ".nojekyll",
      "demos/lil/index.html",
      "demos/js/index.html",
      "demos/lil/ide.js",
      "demos/js/ide.js",
      "demos/lil/ts.worker.js",
      "demos/js/ts.worker.js",
    ]) {
      assert.equal(existsSync(resolve(site, path)), true, path)
    }
  })

  it("states the JS minifier and Lil / JS Brotli ratio", () => {
    const html = readFileSync(resolve(site, "index.html"), "utf8")
    const results = readFileSync(resolve(site, "results.json"), "utf8")
    assert.match(html, /@itslil\/monaco-editor/)
    assert.match(html, /not 100% feature parity/i)
    assert.match(html, /esbuild/)
    assert.match(html, /Lil \/ JS/)
    assert.doesNotMatch(html, /suspicious/i)
    assert.doesNotMatch(results, /suspicious/i)
    assert.match(results, /LilScript Brotli-11 \/ JS Brotli-11/)
  })

  it("keeps official TypeScript worker on the Lil demo", () => {
    const env = readFileSync(resolve(site, "demos/lil/monaco-env.js"), "utf8")
    assert.match(env, /ts\.worker\.js/)
    const lilTs = readFileSync(resolve(site, "demos/lil/ts.worker.js"))
    const jsTs = readFileSync(resolve(site, "demos/js/ts.worker.js"))
    assert.equal(lilTs.equals(jsTs), true)
    assert.ok(lilTs.byteLength > 1_000_000)
  })
})
