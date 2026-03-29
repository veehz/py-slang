/**
 * Indentation errors for the Moo-based lexer.
 * Messages follow CPython wording for familiarity.
 */
export declare class UnexpectedIndentError extends SyntaxError {
    line: number;
    col: number;
    constructor(line: number, col: number);
}
export declare class InconsistentDedentError extends SyntaxError {
    line: number;
    col: number;
    constructor(line: number, col: number);
}
