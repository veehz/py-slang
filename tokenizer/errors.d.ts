export declare namespace TokenizerErrors {
    class BaseTokenizerError extends SyntaxError {
        line: number;
        col: number;
        constructor(message: string, line: number, col: number);
    }
    class UnknownTokenError extends BaseTokenizerError {
        constructor(token: string, line: number, col: number, source: string, current: number);
    }
    class UnterminatedStringError extends BaseTokenizerError {
        constructor(line: number, col: number, source: string, start: number, current: number);
    }
    class NonFourIndentError extends BaseTokenizerError {
        constructor(line: number, col: number, source: string, start: number);
    }
    class InvalidNumberError extends BaseTokenizerError {
        constructor(line: number, col: number, source: string, start: number, current: number);
    }
    class InconsistentIndentError extends BaseTokenizerError {
        constructor(line: number, col: number, source: string, start: number);
    }
    class ForbiddenIdentifierError extends BaseTokenizerError {
        constructor(line: number, col: number, source: string, start: number);
    }
    class ForbiddenOperatorError extends BaseTokenizerError {
        constructor(line: number, col: number, source: string, start: number, current: number);
    }
    class NonMatchingParenthesesError extends BaseTokenizerError {
        constructor(line: number, col: number, source: string, current: number);
    }
    class NonMatchingBracketsError extends BaseTokenizerError {
        constructor(line: number, col: number, source: string, current: number);
    }
}
