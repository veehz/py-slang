import { StmtNS } from "../ast-types";
import { Context } from "../cse-machine/context";
import { RecursivePartial, Result } from "../types";
type Stmt = StmtNS.Stmt;
export interface IOptions {
    isPrelude: boolean;
    envSteps: number;
    stepLimit: number;
    chapter?: number;
}
export declare function runInContext(code: string, context: Context, options?: RecursivePartial<IOptions>): Promise<Result>;
export declare function runCSEMachine(code: string, program: Stmt, context: Context, options?: RecursivePartial<IOptions>): Promise<Result>;
export {};
