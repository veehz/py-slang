import { ExprNS, StmtNS } from "../ast-types";
import { TokenType } from "../tokens";
import { Environment } from "./environment";
export type Node = {
    isEnvDependent?: boolean;
} & (StmtNS.Stmt | ExprNS.Expr | StatementSequence);
export interface StatementSequence {
    type: "StatementSequence";
    body: StmtNS.Stmt[];
    loc?: {
        start: {
            line: number;
            column: number;
        };
        end: {
            line: number;
            column: number;
        };
    };
}
export declare enum InstrType {
    RESET = "Reset",
    WHILE = "While",
    FOR = "For",
    ASSIGNMENT = "Assignment",
    ANN_ASSIGNMENT = "AnnAssignment",
    APPLICATION = "Application",
    UNARY_OP = "UnaryOperation",
    BINARY_OP = "BinaryOperation",
    BOOL_OP = "BoolOperation",
    COMPARE = "Compare",
    CALL = "Call",
    RETURN = "Return",
    BREAK = "Break",
    CONTINUE = "Continue",
    IF = "If",
    FUNCTION_DEF = "FunctionDef",
    LAMBDA = "Lambda",
    MULTI_LAMBDA = "MultiLambda",
    GROUPING = "Grouping",
    LITERAL = "Literal",
    VARIABLE = "Variable",
    TERNARY = "Ternary",
    PASS = "Pass",
    ASSERT = "Assert",
    IMPORT = "Import",
    GLOBAL = "Global",
    NONLOCAL = "NonLocal",
    Program = "Program",
    BRANCH = "Branch",
    POP = "Pop",
    ENVIRONMENT = "environment",
    MARKER = "marker",
    END_OF_FUNCTION_BODY = "EndOfFunctionBody"
}
interface BaseInstr {
    instrType: InstrType;
    srcNode: Node;
    isEnvDependent?: boolean;
}
export interface WhileInstr extends BaseInstr {
    instrType: InstrType.WHILE;
    test: ExprNS.Expr;
    body: StatementSequence;
}
export interface ForInstr extends BaseInstr {
    instrType: InstrType.FOR;
    init: ExprNS.Variable;
    test: ExprNS.Expr;
    update: Node;
    body: StatementSequence;
}
export interface AssmtInstr extends BaseInstr {
    instrType: InstrType.ASSIGNMENT;
    symbol: string;
    constant: boolean;
    declaration: boolean;
}
export interface UnOpInstr extends BaseInstr {
    instrType: InstrType.UNARY_OP;
    symbol: TokenType;
}
export interface BinOpInstr extends BaseInstr {
    instrType: InstrType.BINARY_OP;
    symbol: TokenType;
}
export interface AppInstr extends BaseInstr {
    instrType: InstrType.APPLICATION;
    numOfArgs: number;
    srcNode: Node;
}
export interface BranchInstr extends BaseInstr {
    instrType: InstrType.BRANCH;
    consequent: Node;
    alternate: Node | null | undefined;
}
export interface EnvInstr extends BaseInstr {
    instrType: InstrType.ENVIRONMENT;
    env: Environment;
}
export interface ArrLitInstr extends BaseInstr {
    arity: number;
}
export interface EndOfFunctionBodyInstr extends BaseInstr {
    instrType: InstrType.END_OF_FUNCTION_BODY;
}
export interface ResetInstr extends BaseInstr {
    instrType: InstrType.RESET;
}
export interface PopInstr extends BaseInstr {
    instrType: InstrType.POP;
}
export interface BoolOpInstr extends BaseInstr {
    instrType: InstrType.BOOL_OP;
    symbol: TokenType;
}
export type Instr = BaseInstr | WhileInstr | ForInstr | AssmtInstr | UnOpInstr | BinOpInstr | AppInstr | BranchInstr | EnvInstr | ArrLitInstr | EndOfFunctionBodyInstr | ResetInstr | PopInstr | BoolOpInstr;
export declare function typeTranslator(type: string): string;
export declare function operatorTranslator(operator: TokenType | string): string;
export {};
