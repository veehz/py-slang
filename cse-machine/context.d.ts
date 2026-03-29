import { ConductorError } from "@sourceacademy/conductor/common";
import { StmtNS } from "../ast-types";
import { ModuleContext, NativeStorage } from "../types";
import { Control } from "./control";
import { Environment } from "./environment";
import { CseError } from "./error";
import { Stash } from "./stash";
import { ReadableContext, WritableContext } from "./streams";
import { Node } from "./types";
export declare class Context {
    control: Control;
    stash: Stash;
    streams: {
        initialised: false;
    } | {
        initialised: true;
        stdout: WritableContext<string>;
        stderr: WritableContext<ConductorError>;
        stdin: ReadableContext<string>;
    };
    errors: CseError[];
    moduleContexts: {
        [name: string]: ModuleContext;
    };
    runtime: {
        break: boolean;
        debuggerOn: boolean;
        isRunning: boolean;
        environmentTree: EnvTree;
        environments: Environment[];
        nodes: Node[];
        control: Control | null;
        stash: Stash | null;
        objectCount: number;
        envStepsTotal: number;
        breakpointSteps: number[];
        changepointSteps: number[];
    };
    /**
     * Used for storing the native context and other values
     */
    nativeStorage: NativeStorage;
    constructor(program?: StmtNS.Stmt);
    createGlobalEnvironment: () => Environment;
    createEmptyRuntime: () => {
        break: boolean;
        debuggerOn: boolean;
        isRunning: boolean;
        environmentTree: EnvTree;
        environments: never[];
        value: undefined;
        nodes: never[];
        control: null;
        stash: null;
        objectCount: number;
        envSteps: number;
        envStepsTotal: number;
        breakpointSteps: never[];
        changepointSteps: never[];
    };
    createEmptyStreams: () => {
        initialised: false;
    };
    reset(program?: StmtNS.Stmt): void;
    copy(): Context;
    private copyEnvironment;
}
export declare class EnvTree {
    private _root;
    private map;
    get root(): EnvTreeNode | null;
    insert(environment: Environment): void;
    getTreeNode(environment: Environment): EnvTreeNode | undefined;
}
export declare class EnvTreeNode {
    readonly environment: Environment;
    parent: EnvTreeNode | null;
    private _children;
    constructor(environment: Environment, parent: EnvTreeNode | null);
    get children(): EnvTreeNode[];
    resetChildren(newChildren: EnvTreeNode[]): void;
    private clearChildren;
    private addChildren;
    addChild(newChild: EnvTreeNode): EnvTreeNode;
}
