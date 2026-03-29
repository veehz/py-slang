import { EvaluatorCapability } from "./EvaluatorCapability";
interface IEvaluatorDefinition {
    /** The evaluator's identifier. */
    readonly id: string;
    /** The name of the evaluator. */
    readonly name: string;
    /** The path to the evaluator's script file. */
    readonly path: string;
    /** An array of this evaluator's capabilities. */
    readonly capabilities: EvaluatorCapability[];
}
export type { IEvaluatorDefinition };
