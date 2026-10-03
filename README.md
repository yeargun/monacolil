# @itslil/monaco-editor

An experimental Monaco 0.56.0 editor implementation in LilScript, with browser worker delivery and an interactive IDE demonstration.

[Live comparison and examples](https://yeargun.github.io/monacolil/) · [Checked repository package](https://yeargun.github.io/monacolil/downloads/package.tgz) · [Package build evidence](https://yeargun.github.io/monacolil/package-build.json)

```sh
npm install @itslil/monaco-editor
```

```js
import {monaco, ready} from "@itslil/monaco-editor"
await ready
monaco.editor.create(document.getElementById("editor"), {value: "const count = 1", language: "javascript"})
```

The repository download contains the checked build of this checkout. npm publication is independent; an npm install can resolve a different published snapshot.

## Comparison with the original

[Current raw, gzip and Brotli results and build times](COMPARISON.md) compare three independently targeted LilScript compilations with the smallest recorded original result for each codec from Terser, esbuild and Oxc. Exact bytes, configuration hashes, source inputs and commands are downloadable from the comparison page. Package formats and browser application bundles have different boundaries from the standalone comparison entries.

## Compatibility and scope

This is a partial editor implementation, not a complete Monaco API replacement. The namespace comparison excludes CSS and workers on both sides. The package includes separately delivered CSS, four LilScript workers and Microsoft’s pinned TypeScript worker. The TypeScript provider and worker are JavaScript dependencies, not claimed as LilScript rewrites.

## Rebuild and verify

Set `LILSCRIPT_COMPILER` to the current LilScript executable. Builds use one compiler job at a time.

```sh
npm ci
npm run build
npm test
npm run check:site
```

See [LICENSE](LICENSE) and [NOTICE.md](NOTICE.md) for licensing and upstream attribution.
