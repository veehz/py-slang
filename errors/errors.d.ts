import { ExprNS } from "../ast-types";
import { Context } from "../cse-machine/context";
import { Value } from "../cse-machine/stash";
import { Token } from "../tokenizer";
export declare enum ErrorType {
    IMPORT = "Import",
    RUNTIME = "Runtime",
    SYNTAX = "Syntax",
    TYPE = "Type"
}
export declare enum ErrorSeverity {
    WARNING = "Warning",
    ERROR = "Error"
}
export interface Locatable {
    startToken: Token;
    endToken: Token;
}
/**
 * Represents a specific position in source code
 * Line is 1-based, Column is 0-based
 */
export interface SourcePosition {
    line: number;
    column: number;
}
/**
 * Represents the span of code within source code from start to end
 * Can be null if source code is not available
 */
export interface SourceLocation {
    source?: string | null;
    start: SourcePosition;
    end: SourcePosition;
}
export interface SourceError {
    type: ErrorType;
    severity: ErrorSeverity;
    location: SourceLocation;
    explain(): string;
    elaborate(): string;
}
export declare const UNKNOWN_LOCATION: SourceLocation;
export declare class RuntimeSourceError implements SourceError {
    type: ErrorType;
    severity: ErrorSeverity;
    location: SourceLocation;
    message: string;
    constructor(node?: Locatable);
    explain(): string;
    elaborate(): string;
}
export declare function getFullLine(source: string, current: number): {
    lineIndex: number;
    fullLine: string;
};
export declare function createErrorIndicator(snippet: string, errorPos: number): string;
export declare class TypeConcatenateError extends RuntimeSourceError {
    constructor(source: string, node: ExprNS.Binary, wrongType: string);
}
export declare class UnsupportedOperandTypeError extends RuntimeSourceError {
    constructor(source: string, node: ExprNS.Binary | ExprNS.BoolOp | ExprNS.Unary, wrongType1: string, wrongType2: string, operand: string);
}
export declare class MissingRequiredPositionalError extends RuntimeSourceError {
    private functionName;
    private missingParamCnt;
    private missingParamName;
    constructor(source: string, node: ExprNS.Expr, functionName: string, params: number | ExprNS.Variable[], args: Value[], variadic: boolean);
    private joinWithCommasAndAnd;
}
export declare class TooManyPositionalArgumentsError extends RuntimeSourceError {
    private functionName;
    private expectedCount;
    private givenCount;
    constructor(source: string, node: ExprNS.Expr, functionName: string, params: number | ExprNS.Variable[], args: Value[], variadic: boolean);
}
export declare class ZeroDivisionError extends RuntimeSourceError {
    constructor(source: string, node: ExprNS.Binary);
}
export declare class StepLimitExceededError extends RuntimeSourceError {
    constructor(source: string, node: ExprNS.Binary | ExprNS.Expr);
}
export declare class ValueError extends RuntimeSourceError {
    constructor(source: string, node: ExprNS.Expr, context: Context, functionName: string);
}
export declare class TypeError extends RuntimeSourceError {
    constructor(source: string, node: ExprNS.Expr, context: Context, originalType: string, targetType: string);
}
export declare class SublanguageError extends RuntimeSourceError {
    constructor(source: string, node: ExprNS.Expr, context: Context, functionName: string, chapter: string, details?: string);
}
export declare class UnboundLocalError extends RuntimeSourceError {
    constructor(source: string, name: string, node: ExprNS.Expr);
}
export declare class NameError extends RuntimeSourceError {
    constructor(source: string, name: string, node: ExprNS.Variable);
}
export declare class BuiltinReassignmentError extends RuntimeSourceError {
    constructor(source: string, name: string, node: ExprNS.Expr);
}
export declare const MAGIC_OFFSET = 1;
export declare const SPECIAL_CHARS: RegExp;
