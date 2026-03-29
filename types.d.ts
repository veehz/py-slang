import { Context } from "./cse-machine/context";
import { Value } from "./cse-machine/stash";
import { SourceLocation } from "./errors";
import { ModuleFunctions } from "./modules/moduleTypes";
export declare class CSEBreak {
}
export declare class PyComplexNumber {
    real: number;
    imag: number;
    constructor(real: number, imag: number);
    static fromNumber(value: number): PyComplexNumber;
    static fromBigInt(value: bigint): PyComplexNumber;
    static fromString(str: string): PyComplexNumber;
    static fromValue(value: number | bigint | string | PyComplexNumber): PyComplexNumber;
    /**
     * operations
     */
    add(other: PyComplexNumber): PyComplexNumber;
    sub(other: PyComplexNumber): PyComplexNumber;
    mul(other: PyComplexNumber): PyComplexNumber;
    div(other: PyComplexNumber): PyComplexNumber;
    pow(other: PyComplexNumber): PyComplexNumber;
    toString(): string;
    private toPythonComplexFloat;
    equals(other: PyComplexNumber): boolean;
}
export interface None {
    type: "NoneType";
    loc?: SourceLocation | null;
}
export interface ComplexLiteral {
    type: "Literal";
    complex: PyComplexNumber;
    loc?: SourceLocation | null;
}
/**
 * Helper type to recursively make properties that are also objects
 * partial
 *
 * By default, `Partial<Array<T>>` is equivalent to `Array<T | undefined>`. For this type, `Array<T>` will be
 * transformed to Array<Partial<T>> instead
 */
export type RecursivePartial<T> = T extends Array<infer U> ? Array<RecursivePartial<U>> : T extends object ? Partial<{
    [K in keyof T]: RecursivePartial<T[K]>;
}> : T;
export type Result = Finished | Error | SuspendedCseEval;
export interface SuspendedCseEval {
    status: "suspended-cse-eval";
    context: Context;
}
export interface Finished {
    status: "finished";
    context: Context;
    value: Value;
    representation: Representation;
}
export declare class Representation {
    representation: string;
    constructor(representation: string);
    toString(value: Value): string;
}
export interface NativeStorage {
    builtins: Map<string, Value>;
    previousProgramsIdentifiers: Set<string>;
    operators: Map<string, (...operands: Value[]) => Value>;
    maxExecTime: number;
    loadedModules: Record<string, ModuleFunctions>;
    loadedModuleTypes: Record<string, Record<string, string>>;
}
export interface ModuleContext {
    state: null | unknown;
    tabs: null | unknown[];
}
