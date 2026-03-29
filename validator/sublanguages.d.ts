import { FeatureValidator } from "./types";
/**
 * Source Chapter 1: no lists, no loops, no reassignment, no break/continue, no nonlocal, no rest params.
 * Factory function returns a fresh set of validators (stateful ones reset each time).
 */
export declare function makeChapter1Validators(): FeatureValidator[];
/**
 * Source Chapter 2: no lists, no loops, no reassignment, no break/continue, no nonlocal, no rest params.
 * Linked-list library available (None as linked list expression).
 */
export declare function makeChapter2Validators(): FeatureValidator[];
/**
 * Source Chapter 3: lists, loops, and reassignment are all allowed.
 * for loops are restricted to range() only.
 */
export declare function makeChapter3Validators(): FeatureValidator[];
/**
 * Source Chapter 4: unrestricted. No validators.
 */
export declare function makeChapter4Validators(): FeatureValidator[];
export declare function makeValidatorsForChapter(chapter: number): FeatureValidator[];
