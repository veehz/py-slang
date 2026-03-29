import { BasicEvaluator, IRunnerPlugin } from "@sourceacademy/conductor/runner";
export default class PyEvaluator extends BasicEvaluator {
    private context;
    private options;
    constructor(conductor: IRunnerPlugin);
    evaluateChunk(chunk: string): Promise<void>;
}
