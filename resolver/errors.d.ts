import { Token } from "../tokenizer";
export declare namespace ResolverErrors {
    class BaseResolverError extends SyntaxError {
        line: number;
        col: number;
        constructor(name: string, message: string, line: number, col: number);
    }
    class NameNotFoundError extends BaseResolverError {
        constructor(line: number, col: number, source: string, start: number, current: number, suggestion: string | null);
    }
    class NameReassignmentError extends BaseResolverError {
        constructor(line: number, col: number, source: string, start: number, current: number, oldName: Token);
    }
}
