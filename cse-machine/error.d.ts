import { ErrorSeverity, ErrorType, RuntimeSourceError, SourceError, SourceLocation } from "../errors";
import { Context } from "./context";
export declare class CseError implements SourceError {
    message: string;
    type: ErrorType;
    severity: ErrorSeverity;
    location: SourceLocation;
    constructor(message: string, location?: SourceLocation);
    explain(): string;
    elaborate(): string;
}
export declare function handleRuntimeError(context: Context, error: RuntimeSourceError): never;
export declare class AssertionError extends RuntimeSourceError {
    readonly message: string;
    constructor(message: string);
    explain(): string;
    elaborate(): string;
}
