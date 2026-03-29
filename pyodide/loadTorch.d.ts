import type { PyodideInterface } from "pyodide";
/**
 * Loads the torch library into Pyodide by exposing the JS torch object
 * and running bridge.py to set up the Python-side `torch` module.
 *
 * After this call, `pyodide.globals.get("torch")` is the usable torch module.
 */
export declare function loadTorch(pyodide: PyodideInterface): Promise<void>;
