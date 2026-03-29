import { TokenType } from "../tokens";
export declare class Token {
    type: TokenType;
    lexeme: string;
    line: number;
    col: number;
    indexInSource: number;
    constructor(type: TokenType, lexeme: string, line: number, col: number, indexInSource: number);
}
