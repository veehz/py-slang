/**
 * Import analysis for detecting and rewriting torch imports using Python's
 * built-in `ast` module via Pyodide.
 *
 * This avoids the limitations of py-slang's parser (which only supports a
 * subset of Python) by delegating to CPython's own parser running inside
 * Pyodide.
 */
import type { PyodideInterface } from "pyodide";
export interface TorchImportInfo {
    /** "import" for bare `import torch`, "from" for `from torch import ...` */
    type: "import" | "from";
    /** Full module path, e.g. "torch" or "torch.nn" */
    module: string;
    /** Imported names with optional aliases */
    names: {
        name: string;
        alias: string | null;
    }[];
    /** 1-based line number in the original source */
    line: number;
}
/**
 * Reset the helper loaded state. Useful for testing when pyodide
 * instances are recreated.
 */
export declare function resetHelperState(): void;
/**
 * Parses the source code using Python's `ast` module (via Pyodide) and
 * returns all `from … import …` statements whose root module is "torch".
 */
export declare function detectTorchImports(pyodide: PyodideInterface, source: string): Promise<TorchImportInfo[]>;
/**
 * Returns the set of top-level module roots for all non-torch
 * `from … import …` statements. These may need to be installed via micropip.
 */
export declare function getNonTorchImportRoots(pyodide: PyodideInterface, source: string): Promise<Set<string>>;
/**
 * Rewrites the source code by replacing torch import lines with
 * variable assignments that reference the injected `__sa_import_torch` global.
 *
 * Non-torch code is passed through unchanged.
 */
export declare function rewriteTorchImports(pyodide: PyodideInterface, source: string): Promise<{
    code: string;
    hasTorch: boolean;
}>;
