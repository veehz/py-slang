import { BasicEvaluator, IRunnerPlugin } from "@sourceacademy/conductor/runner";
import type { PyodideInterface } from "pyodide";
export default abstract class PyodideEvaluator extends BasicEvaluator {
    protected pyodide: Promise<PyodideInterface>;
    private torchLoaded;
    constructor(conductor: IRunnerPlugin);
    protected abstract validateChunk(_chunk: string): void;
    evaluateChunk(chunk: string): Promise<void>;
}
export declare class ChapterPyodideEvaluator extends PyodideEvaluator {
    private chapter;
    constructor(conductor: IRunnerPlugin, chapter: number);
    protected validateChunk(chunk: string): void;
}
