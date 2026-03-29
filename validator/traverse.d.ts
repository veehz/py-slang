import { ASTNode } from "./types";
/**
 * Walks the AST via the visitor pattern and calls fn on each node.
 *
 * NOTE: This is a standalone utility — the main validation pipeline does NOT
 * use this function. The Resolver runs validators inline during its own
 * accept()-based traversal (see resolver.ts:runValidators), which provides
 * the Environment parameter needed by scope-aware validators like
 * no-reassignment. Prefer the Resolver pipeline for production use.
 */
export declare function traverseAST(node: ASTNode, fn: (node: ASTNode) => void): void;
