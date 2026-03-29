import { ExprNS } from "../ast-types";
import { TokenType } from "../tokens";
import { Context } from "./context";
import { Value } from "./stash";
export type BinaryOperator = "==" | "!=" | "===" | "!==" | "<" | "<=" | ">" | ">=" | "<<" | ">>" | ">>>" | "+" | "-" | "*" | "/" | "%" | "**" | "|" | "^" | "&" | "in" | "instanceof";
export declare function evaluateUnaryExpression(code: string, command: ExprNS.Unary, context: Context, operator: TokenType, value: Value): Value;
export declare function evaluateBinaryExpression(code: string, command: ExprNS.Binary, context: Context, operator: TokenType, left: Value, right: Value): Value;
export declare function isFalsy(value: Value): boolean;
export declare function evaluateBoolExpression(code: string, command: ExprNS.BoolOp, context: Context, operator: TokenType, left: Value, right: Value): Value;
