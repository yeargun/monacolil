# @itslil/monaco-editor

[monaco-editor 0.56.0](https://github.com/microsoft/monaco-editor), reimplemented in [LilScript](https://github.com/yeargun/lilscript) and published as a dependency-free editor runtime.

This is **not** the official `monaco-editor` package. It is **not** 100% feature parity. Context menus, some contrib commands, view-zones, and GPU rendering still drift. The TypeScript language service is the official Microsoft worker.

**Site:** [yeargun.github.io/monacolil](https://yeargun.github.io/monacolil/) — every submodule folder links to its `.lil` tree, and every monaco file has a JS → Lil conversion row.

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

The fair table is independently compiled **submodules**: each runtime monaco-editor-core file, other monaco imports left external. This is a **library** comparison, not an app tree-shake. JS keeps ESM exports. Lil `export class` is type-only, so keepers call public constructors and methods; unused privates may still DCE. CSS-only and re-export JS files (for example `dialog.js` is only a CSS import) are excluded. Tiny Lil rows are incomplete ports of that file, not a different minifier.

Headline JS is **Vite 8 / Oxc** minify (`vite@8.2.1`, Rolldown 1.2.4). The same sources are also scored with **esbuild 0.28.1** and **Terser 5.50.0**, then the same `lilscript-codec` gzip-9 / Brotli-11. **Ratio is LilScript Brotli / JS Brotli.** Folders are listed largest Vite/Oxc Brotli first. This is not 100% feature parity.

| Lane | Files | Vite 8 / Oxc | esbuild | Terser | Lil Brotli-11 | Lil / Oxc |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| **`editor/common` (headline)** | 219 | 235,070 | 240,785 | 237,120 | 175,936 | **0.75×** |
| `editor/browser` | 145 | 197,141 | 201,215 | 197,532 | 95,335 | 0.48× |
| `base/browser` | 86 | 126,564 | 129,248 | 127,097 | 92,728 | 0.73× |
| `base/common` | 119 | 114,493 | 117,744 | 114,928 | 75,799 | 0.66× |
| `editor/contrib/find` | 10 | 19,433 | 19,753 | 19,416 | 8,732 | 0.45× |
| `editor/contrib/colorPicker` | 20 | 14,258 | 14,392 | 14,222 | 15,536 | 1.09× |

Median across folders is on the site. Whole-page `ide.js` is a diagnostic only (JS scored with all three minifiers).

### JS minifiers on the catalog

982 scored Lil modules vs 984 runtime monaco-editor-core files. Same files, three JS minifiers.

| JS minifier | Version | Raw | gzip-9 | Brotli-11 | Lil / JS |
| --- | --- | ---: | ---: | ---: | ---: |
| **Vite 8 / Oxc (headline)** | vite@8.2.1 | 4,405,882 | 1,396,195 | 1,226,629 | **0.51×** |
| esbuild | 0.28.1 | 4,460,663 | 1,423,243 | 1,253,565 | 0.50× |
| Terser | 5.50.0 | 4,436,140 | 1,400,304 | 1,230,200 | 0.51× |
| Lil modules (keepers, host external) | — | 2,164,093 | 722,898 | 630,383 | — |

Oxc is smaller than esbuild on this catalog. Terser lands between them.

### Fair file pairs

Same three JS minifiers. Lil uses the same public-method keepers as the catalog. Ratio is Lil / Vite 8 Oxc.

| Pair | Vite 8 / Oxc | esbuild | Terser | Lil Brotli | Lil / Oxc |
| --- | ---: | ---: | ---: | ---: | ---: |
| Piece tree + rb-tree | 6,463 | 6,685 | 6,581 | 6,389 | 0.99× |
| Decoration interval tree | 2,583 | 2,574 | 2,613 | 1,547 | 0.60× |
| Monarch compile | 2,836 | 2,906 | 2,855 | 1,539 | 0.54× |
| Position + Range + Selection | 1,587 | 1,621 | 1,595 | 753 | 0.47× |
| Myers diff | 753 | 774 | 762 | 2,070 | 2.75× |
| Position | 368 | 389 | 366 | 494 | 1.34× |

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
