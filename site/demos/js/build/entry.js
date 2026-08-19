import { editor } from "monaco-editor-core/esm/vs/editor/editor.api.js";

const SAMPLE = "function hello(name) {\n  const msg = \"hi \" + name;\n  return msg;\n}\n";

export function runDemo(editorHost, diffHost, logEl) {
  const ed = editor.create(editorHost, {
    value: SAMPLE,
    language: "javascript",
    theme: "vs-dark",
    lineNumbers: "on",
    minimap: { enabled: true },
    automaticLayout: true,
  });
  ed.setPosition({ lineNumber: 1, column: 23 });
  ed.trigger("keyboard", "type", { text: "!" });
  ed.trigger("keyboard", "undo", null);
  editor.setTheme("vs-dark");
  ed.layout();
  const found = ed.getModel().findMatches("msg", true, false, true, null, true);
  ed.setPosition({ lineNumber: 2, column: 10 });
  const highlights = ed.getModel().findMatches("msg", true, false, true, null, true);
  const word = ed.getModel().getWordAtPosition(ed.getPosition())?.word ?? "";
  ed.setPosition({ lineNumber: 2, column: 1 });
  ed.trigger("keyboard", "editor.action.commentLine", null);
  const diff = editor.createDiffEditor(diffHost, { automaticLayout: true, renderSideBySide: true });
  diff.setModel({
    original: editor.createModel("a\nb\nc\n", "plaintext"),
    modified: editor.createModel("a\nx\nc\n", "plaintext"),
  });
  const changes = diff.getLineChanges() ?? [];
  logEl.textContent =
    "value=" + ed.getValue().length +
    " matches=" + found.length +
    " folds=n/a" +
    " highlights=" + highlights.length +
    " hover=" + word +
    " diffs=" + changes.length;
}

export { editor };
