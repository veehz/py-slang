import { BasicEvaluator, IRunnerPlugin } from "@sourceacademy/conductor/runner";
export default class PyEvaluator extends BasicEvaluator {
    constructor(conductor: IRunnerPlugin);
    evaluateChunk(chunk: string): Promise<void>;
}
