# @itslil/monaco-editor

[monaco-editor 0.56.0](https://github.com/microsoft/monaco-editor), reimplemented in [LilScript](https://github.com/yeargun/lilscript) and published as a dependency-free editor runtime.

This is **not** the official `monaco-editor` package. It is **not** 100% feature parity. Context menus, some contrib commands, view-zones, and GPU rendering still drift. The TypeScript language service is the official Microsoft worker.

**Site:** [yeargun.github.io/monacolil](https://yeargun.github.io/monacolil/)

```sh
npm install @itslil/monaco-editor
```

```html
<link rel="stylesheet" href="./node_modules/@itslil/monaco-editor/dist/monaco.css" />
<div id="editor" style="height: 480px"></div>
<script type="module">
  import monaco, { ready } from "@itslil/monaco-editor"

  await ready
  monaco.editor.create(document.getElementById("editor"), {
    value: "export function hello(name: string) {\n  return name\n}\n",
    language: "typescript",
    theme: "vs-dark",
  })
</script>
```

`MonacoEnvironment.getWorker` is installed on import. TypeScript and JavaScript use the real Microsoft `ts.worker` (`typescriptServices.js`). Solid TSX is accepted by that same worker (`jsx: Preserve`, `solid-js` extra lib). JSON / CSS / HTML hosts are LilScript.

Alias the import if you already write `from "monaco-editor"`:

```js
{
  "dependencies": { "@itslil/monaco-editor": "0.56.0" },
  "overrides": { "monaco-editor": "npm:@itslil/monaco-editor@0.56.0" }
}
```

The override will not give you a complete monaco-editor. Treat it as a port, not a silent swap.

## Why the headline is a folder, not the whole IDE

The fair table is independently compiled **submodules**: each monaco-editor-core file, other monaco imports left external. JS is **esbuild** minify, then the same `lilscript-codec` gzip-9 / Brotli-11. **Ratio is LilScript Brotli / JS Brotli.** Folders are listed largest JS Brotli first. This is not 100% feature parity.

| Lane | Files | JS minify | JS Brotli-11 | Lil Brotli-11 | Lil / JS |
| --- | ---: | --- | ---: | ---: | ---: |
| **`editor/common` (headline)** | 219 | esbuild | 240,863 | 163,337 | **0.68×** |
| `editor/browser` | 145 | esbuild | 201,293 | 95,524 | 0.47× |
| `base/browser` | 90 | esbuild | 129,443 | 96,230 | 0.74× |
| `base/common` | 122 | esbuild | 118,241 | 76,330 | 0.65× |
| `editor/contrib/find` | 10 | esbuild | 19,753 | 8,750 | 0.44× |
| `editor/contrib/colorPicker` | 20 | esbuild | 14,392 | 15,532 | 1.08× |

Median across 115 folders is on the site. Whole-page `ide.js` is a diagnostic only (JS also esbuild minify).

### Independent modules (`nontest-entire-module`)

992 Lil modules vs 994 monaco-editor-core files, each compiled alone. JS minify is esbuild. Summing those rows is a catalog, not the running editor.

| | JS minify | Raw | gzip-9 | Brotli-11 | Lil / JS |
| --- | --- | ---: | ---: | ---: | ---: |
| monaco-editor-core files (external imports) | esbuild | 4,466,650 | 1,425,897 | 1,255,455 | 1.00× |
| Lil modules (keepers, host external) | — | 2,132,061 | 717,722 | 624,522 | **0.50×** |

### Fair file pairs

JS side is the better Brotli of esbuild and Terser. Ratio is Lil / JS.

| Pair | JS minify | JS Brotli | Lil Brotli | Lil / JS |
| --- | --- | ---: | ---: | ---: |
| Piece tree + rb-tree | terser | 6,581 | 6,322 | 0.96× |
| Monarch compile | terser | 2,855 | 1,433 | 0.50× |
| Decoration interval tree | esbuild | 2,574 | 401 | 0.16× |
| Position + Range + Selection | terser | 1,595 | 753 | 0.47× |
| Myers diff | terser | 762 | 2,032 | 2.67× |
| Position | terser | 366 | 289 | 0.79× |

## TypeScript / Solid TSX

Both the Lil page and this package load the official Microsoft `ts.worker` from monaco-editor 0.56. Diagnostics, complete, hover, and Solid TSX go through `typescriptServices.js`. LilScript did not rewrite `tsc`.

## Compatibility

- `monaco.editor.create` / `createDiffEditor` / `createModel`
- Themes, find, fold, comments, markers, some language providers
- Official TypeScript worker for `typescript` and `javascript`
- **Not** a VS Code workbench, TextMate, GPU view-zones, or a complete contrib menu
- Types in this package describe the ported surface, not the full official `monaco.d.ts`

Zero runtime dependencies. The Microsoft worker is shipped in `dist/workers/ts.worker.js`.

## Rebuild

Published JavaScript in `dist/` is what npm installs. Rebuilding from `src/**/*.lil` needs a release [LilScript](https://github.com/yeargun/lilscript) compiler next to this repo, or `LILSCRIPT_COMPILER`.

```sh
npm install
npm run build
npm run check:site
npm run check:pack
```

## License

MIT. See [NOTICE.md](./NOTICE.md).
