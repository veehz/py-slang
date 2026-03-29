/**
 * Adapter for Nearley parser to match the interface of the old hand-written parser
 */
import { StmtNS } from "../ast-types";
/**
 * NearleyParser - Drop-in replacement for the old Parser class
 */
export declare class NearleyParser {
    private readonly source;
    constructor(source: string, _tokens?: unknown[]);
    /**
     * Parse the source code and return the AST
     */
    parse(): StmtNS.FileInput;
}
/**
 * Error class for parse errors
 */
export declare class ParseError extends SyntaxError {
    line: number;
    col: number;
    source: string;
    constructor(message: string, line: number, col: number, source: string);
}
/**
 * Convenience function to parse Python source code
 */
export declare function parse(source: string): StmtNS.FileInput;
