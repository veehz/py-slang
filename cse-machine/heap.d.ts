import { Closure } from "./closure";
import { Environment } from "./environment";
import { Value } from "./stash";
export type EnvArray = (Value & {
    readonly id: string;
    environment: Environment;
})[];
export type HeapObject = EnvArray | Closure;
/**
 * The heap stores all objects in each environment.
 */
export declare class Heap<T extends HeapObject = HeapObject> {
    private storage;
    constructor();
    add(...items: T[]): void;
    /** Checks the existence of `item` in the heap. */
    contains(item: T): boolean;
    /** Gets the number of items in the heap. */
    size(): number;
    /**
     * Removes `item` from current heap and adds it to `otherHeap`.
     * If the current heap does not contain `item`, nothing happens.
     * @returns whether the item transfer is successful
     */
    move(item: T, otherHeap: Heap<T>): boolean;
    /** Returns a copy of the heap's contents. */
    getHeap(): Set<T>;
}
