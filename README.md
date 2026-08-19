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

Whole-page `ide.js` Brotli (npm monaco ~905 kB vs this port ~414 kB) and the summed catalog (~1.26 MB vs ~625 kB) look like a 2× win. Those totals mix complete modules with thin or incomplete ports. A 8–11× folder is usually missing UI, not magic compression. **Do not treat the product total as feature-complete monaco-editor.**

Fair evidence is independently compiled **submodules**: each monaco-editor-core file, other monaco imports left external, same `lilscript-codec` gzip-9 / Brotli-11.

| Lane | Files | JS Brotli-11 | Lil Brotli-11 | JS / Lil |
| --- | ---: | ---: | ---: | ---: |
| **`editor/common` (headline)** | 219 | 240,863 | 163,337 | **1.47×** |
| `base/browser` | 90 | 129,443 | 96,230 | 1.35× |
| `base/common` | 122 | 118,241 | 76,330 | 1.55× |
| `editor/browser` | 145 | 201,293 | 95,524 | 2.11× |
| `editor/contrib/find` | 10 | 19,753 | 8,750 | 2.26× |
| `editor/contrib/colorPicker` | 20 | 14,392 | 15,532 | 0.93× |

38 of 115 folders land in a comparable band (0.8–2.5×). Median of that band is **1.48×**. Folders far above 2.5× are called out as suspicious on the site.

### Independent modules (`nontest-entire-module`)

992 Lil modules vs 994 monaco-editor-core files, each compiled alone. Summing those rows is still not a product claim — it is a catalog, not the running editor.

| | Raw | gzip-9 | Brotli-11 |
| --- | ---: | ---: | ---: |
| monaco-editor-core files (external imports) | 4,466,650 | 1,425,897 | 1,255,455 |
| Lil modules (keepers, host external) | 2,132,061 | 717,722 | 624,522 |

### Fair file pairs

| Pair | JS Brotli | Lil Brotli | JS / Lil |
| --- | ---: | ---: | ---: |
| Piece tree + rb-tree | 6,581 | 6,322 | 1.04× |
| Position | 366 | 289 | 1.27× |
| Position + Range + Selection | 1,595 | 753 | 2.12× |
| Monarch compile | 2,855 | 1,433 | 1.99× |
| Myers diff | 762 | 2,032 | 0.38× |

Myers is larger in Lil. Piece tree is essentially a tie. That is the point of submodule rows.

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
