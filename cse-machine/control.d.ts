import { StmtNS } from "../ast-types";
import { Stack } from "./stack";
import { Instr, Node } from "./types";
export type ControlItem = (Node | Instr) & {
    isEnvDependent?: boolean;
    skipEnv?: boolean;
};
export declare class Control extends Stack<ControlItem> {
    private numEnvDependentItems;
    constructor(program?: StmtNS.Stmt);
    canAvoidEnvInstr(): boolean;
    getNumEnvDependentItems(): number;
    pop(): ControlItem | undefined;
    push(...items: ControlItem[]): void;
    copy(): Control;
}
