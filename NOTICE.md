# Notices

`@itslil/monaco-editor` is an independent LilScript reimplementation of
[`monaco-editor@0.56.0`](https://github.com/microsoft/monaco-editor). It is not
affiliated with or endorsed by Microsoft.

This is **not** 100% feature parity with monaco-editor or VS Code. Public
`monaco.editor.create` works for the ported surface. Context menus, view-zones,
GPU rendering, TextMate, and some contrib commands still drift.

The TypeScript language service is the official Microsoft `ts.worker`
(`typescriptServices.js`) from monaco-editor 0.56.0, not a LilScript rewrite.

Algorithms and API names derive from
[monaco-editor](https://github.com/microsoft/monaco-editor) and
[VS Code](https://github.com/microsoft/vscode) (`f487add297079a02eb836810185b165e50cadabc`),
distributed under the MIT license. The original license notice is preserved in
[LICENSE](./LICENSE).

The LilScript compiler is developed separately at
[yeargun/lilscript](https://github.com/yeargun/lilscript).
