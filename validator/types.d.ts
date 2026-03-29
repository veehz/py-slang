import { StmtNS, ExprNS } from "../ast-types";
import { Environment } from "../resolver/resolver";
export type ASTNode = StmtNS.Stmt | ExprNS.Expr;
export interface FeatureValidator {
    validate(node: ASTNode, env?: Environment): void;
}
export declare class FeatureNotSupportedError extends Error {
    node: ASTNode;
    feature: string;
    constructor(feature: string, node: ASTNode);
}
