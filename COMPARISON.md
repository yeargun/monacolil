# Current comparison with the original

Partial Monaco editor namespace versus the original Monaco 0.56.0 namespace. CSS and all workers are excluded from both JavaScript sizes. This implementation is not a complete Monaco replacement, so the difference combines feature scope and compiler output. Download the checked package for CSS, LilScript workers and the upstream TypeScript worker.

Each compression row uses a separate LilScript compilation targeting that objective. Original results are the smallest of Terser, esbuild and Oxc for the named codec.

| Objective | LilScript bytes | Original minified bytes | Original minifier | LilScript build (s) | Original bundle + minify (s) |
|---|---:|---:|---|---:|---:|
| raw | 228,019 | 4,528,715 | Oxc | 35.752 | 1.400 |
| gzip | 62,291 | 1,143,993 | Oxc | 27.322 | 1.400 |
| brotli | 54,211 | 883,285 | Terser | 81.826 | 48.329 |

Original version: `monaco-editor@0.56.0`. gzip level 9; Brotli quality 11/window 22. Each time is one sequential fresh-output build on the recorded shared machine. Original timing starts from installed ESM and does not include the original repository’s TypeScript compilation. Dependency installation, tests and final file compression are excluded.

Validation: 18 checks across raw, gzip and Brotli main entries. This does not cover every package format or establish complete upstream API equivalence.

[Artifacts, hashes and settings](site/comparison.json) · [Commands, source identities and timings](site/comparison-builds.json) · [Exact checked source inputs](site/comparison-artifacts/sources.tar.gz).
