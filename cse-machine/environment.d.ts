import { ExprNS } from "../ast-types";
import { Closure } from "./closure";
import { Context } from "./context";
import { Heap } from "./heap";
import { Value } from "./stash";
export interface Frame {
    [name: string]: Value;
}
export interface Environment {
    readonly id: string;
    name: string;
    tail: Environment | null;
    callExpression?: ExprNS.Call;
    head: Frame;
    heap: Heap;
    thisContext?: Value;
    closure?: Closure;
}
export declare const uniqueId: (context: Context) => string;
export declare const createEnvironment: (context: Context, closure: Closure, args: Value[], callExpression: ExprNS.Call) => Environment;
export declare const createSimpleEnvironment: (context: Context, name: string, tail?: Environment | null) => Environment;
export declare const createProgramEnvironment: (context: Context, isPrelude: boolean) => Environment;
export declare const createBlockEnvironment: (context: Context, name?: string) => Environment;
export declare const currentEnvironment: (context: Context) => Environment;
export declare const getGlobalEnvironment: (context: Context) => Environment | null;
export declare const popEnvironment: (context: Context) => Environment | undefined;
export declare const pushEnvironment: (context: Context, environment: Environment) => void;
