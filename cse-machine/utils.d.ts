import { Context } from "./context";
import { Control, ControlItem } from "./control";
import { Environment } from "./environment";
import { Value } from "./stash";
import { Node } from "./types";
export declare const isNode: (command: ControlItem) => command is Node;
type PropertySetter = Map<string, Transformer>;
type Transformer = (item: ControlItem) => ControlItem;
declare const propertySetter: PropertySetter;
export { propertySetter };
/**
 * Checks whether the evaluation of the given control item depends on the current environment.
 * The item is also considered environment dependent if its evaluation introduces
 * environment dependent items
 * @param item The control item to be checked
 * @return `true` if the item is environment depedent, else `false`.
 */
export declare function isEnvDependent(item: ControlItem | null | undefined): boolean;
export declare const envChanging: (command: ControlItem) => boolean;
export declare function pyDefineVariable(context: Context, name: string, value: Value, env?: Environment): void;
export declare function pyGetVariable(code: string, context: Context, name: string, node: Node): Value;
export declare const checkStackOverFlow: (_context: Context, _control: Control) => void;
export declare function pythonMod(a: number | bigint, b: number | bigint): number | bigint;
export default function assert(condition: boolean, message: string): asserts condition;
export declare function scanForAssignments(node: Node | Node[]): Set<string>;
export declare function typeTranslator(type: string): string;
export declare function operandTranslator(type: string): string;
