import { FeatureValidator } from "../types";
/**
 * Scope-aware validator that throws NameReassignmentError if a name is assigned more than once
 * within the same scope. Uses a WeakMap keyed on Environment so nested scopes are isolated.
 * Must be run inside the Resolver (with env passed) to work correctly.
 */
export declare function createNoReassignmentValidator(): FeatureValidator;
/** Stateless singleton for convenience — only use if you know names won't repeat across calls. */
export declare const NoReassignmentValidator: FeatureValidator;
