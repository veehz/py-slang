import { ExprNS, StmtNS } from "../ast-types";
import { Context } from "./context";
import { ControlItem } from "./control";
import { Environment } from "./environment";
import { StatementSequence } from "./types";
/**
 * Represents a python closure, the class is a runtime representation of a function.
 * Bundles the function's code (AST node) with environment in which its defined.
 * When Closure is called, a new environment will be created whose parent is the 'Environment' captured
 */
export declare class Closure {
    readonly id: string;
    /** AST node for function, either a 'def' or 'lambda' */
    node: StmtNS.FunctionDef | ExprNS.Lambda;
    /** Environment captures at time of function's definition, key for lexical scoping */
    environment: Environment;
    context: Context;
    readonly predefined: boolean;
    originalNode?: StmtNS.FunctionDef | ExprNS.Lambda;
    /** Stores local variables for scope check */
    localVariables: Set<string>;
    /** Unique ID defined for closure */
    /** Name of the constant declaration that the closure is assigned to */
    declaredName?: string;
    constructor(node: StmtNS.FunctionDef | ExprNS.Lambda, environment: Environment, context: Context, predefined?: boolean, localVariables?: Set<string>);
    static makeFromFunctionDef(node: StmtNS.FunctionDef, environment: Environment, context: Context, localVariables: Set<string>): Closure;
    static makeFromLambda(node: ExprNS.Lambda, environment: Environment, context: Context, localVariables: Set<string>): Closure;
}
export declare const isStatementSequence: (node: ControlItem) => node is StatementSequence;
