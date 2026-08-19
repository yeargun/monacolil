export interface IPosition {
  lineNumber: number
  column: number
}

export interface IRange {
  startLineNumber: number
  startColumn: number
  endLineNumber: number
  endColumn: number
}

export interface IStandaloneEditorConstructionOptions {
  value?: string
  language?: string
  theme?: string
  readOnly?: boolean
  fontSize?: number
  lineNumbers?: "on" | "off" | "relative"
  minimap?: { enabled?: boolean }
  [key: string]: unknown
}

export interface ITextModel {
  getValue(): string
  setValue(value: string): void
  getLineCount(): number
  getLineContent(lineNumber: number): string
  getOffsetAt(position: IPosition): number
  getPositionAt(offset: number): IPosition
  getLanguageId(): string
  getVersionId(): number
  uri: { toString(): string; path?: string }
  dispose(): void
}

export interface IStandaloneCodeEditor {
  getValue(): string
  setValue(value: string): void
  getModel(): ITextModel | null
  setModel(model: ITextModel | null): void
  getPosition(): IPosition | null
  setPosition(position: IPosition): void
  getSelection(): IRange | null
  setSelection(selection: IRange): void
  focus(): void
  layout(dimension?: { width: number; height: number }): void
  trigger(source: string, handlerId: string, payload?: unknown): void
  dispose(): void
  onDidChangeModelContent(listener: () => void): { dispose(): void }
  onDidChangeCursorPosition(listener: () => void): { dispose(): void }
}

export interface IStandaloneDiffEditor {
  getOriginalEditor(): IStandaloneCodeEditor
  getModifiedEditor(): IStandaloneCodeEditor
  layout(): void
  dispose(): void
}

export const editor: {
  create(domElement: HTMLElement, options?: IStandaloneEditorConstructionOptions): IStandaloneCodeEditor
  createDiffEditor(domElement: HTMLElement, options?: IStandaloneEditorConstructionOptions): IStandaloneDiffEditor
  createModel(value: string, language?: string, uri?: unknown): ITextModel
  getModels(): ITextModel[]
  getEditors(): IStandaloneCodeEditor[]
  setTheme(themeName: string): void
  defineTheme(themeName: string, themeData: unknown): void
  setModelLanguage(model: ITextModel, languageId: string): void
  setModelMarkers(model: ITextModel, owner: string, markers: unknown[]): void
  getModelMarkers(filter?: unknown): unknown[]
}

export const languages: {
  register(language: { id: string }): void
  registerCompletionItemProvider(selector: string, provider: unknown): { dispose(): void }
  registerHoverProvider(selector: string, provider: unknown): { dispose(): void }
  typescript?: unknown
}

export const Uri: {
  parse(value: string): { toString(): string; path?: string }
  file(path: string): { toString(): string; path?: string }
}

export const MarkerSeverity: {
  Hint: number
  Info: number
  Warning: number
  Error: number
}

export function bootMonaco(): typeof monaco
export function createMonaco(): typeof monaco
export function configureWorkers(baseHref?: string): void
export function attachTypescript(instance: typeof monaco): Promise<unknown>
export const ready: Promise<unknown>

declare const monaco: {
  editor: typeof editor
  languages: typeof languages
  Uri: typeof Uri
  MarkerSeverity: typeof MarkerSeverity
}

export default monaco
