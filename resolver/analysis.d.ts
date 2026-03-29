import { StmtNS } from "../ast-types";
/**
 * Full analysis pipeline (single-pass):
 *   1. NameResolver (scope analysis, name lookup)  — Resolver class
 *   2. FeatureGate  (chapter sublanguage restrictions) — validators run inline during resolution
 *
 * Throws on first violation found.
 */
export declare function analyze(ast: StmtNS.FileInput, source: string, chapter?: number): void;
