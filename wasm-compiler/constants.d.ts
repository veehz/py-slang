import { WasmInstruction } from "@sourceacademy/wasm-util";
export declare const TYPE_TAG: {
    readonly INT: 0;
    readonly FLOAT: 1;
    readonly COMPLEX: 2;
    readonly BOOL: 3;
    readonly STRING: 4;
    readonly CLOSURE: 5;
    readonly NONE: 6;
    readonly UNBOUND: 7;
    readonly PAIR: 8;
};
export declare const ERROR_MAP: {
    readonly NEG_NOT_SUPPORT: readonly [0, "Unary minus operator used on unsupported operand."];
    readonly LOG_UNKNOWN_TYPE: readonly [1, "Calling log on an unknown runtime type."];
    readonly ARITH_OP_UNKNOWN_TYPE: readonly [2, "Calling an arithmetic operation on an unsupported runtime type."];
    readonly COMPLEX_COMPARISON: readonly [3, "Using an unsupported comparison operator on complex type."];
    readonly COMPARE_OP_UNKNOWN_TYPE: readonly [4, "Calling a comparison operation on unsupported operands."];
    readonly CALL_NOT_FX: readonly [5, "Calling a non-function value."];
    readonly FUNC_WRONG_ARITY: readonly [6, "Calling function with wrong number of arguments."];
    readonly UNBOUND: readonly [7, "Accessing an unbound value."];
    readonly HEAD_NOT_PAIR: readonly [8, "Accessing the head of a non-pair value."];
    readonly TAIL_NOT_PAIR: readonly [9, "Accessing the tail of a non-pair value."];
    readonly BOOL_UNKNOWN_TYPE: readonly [10, "Trying to convert an unknnown runtime type to a bool."];
    readonly BOOL_UNKNOWN_OP: readonly [11, "Unknown boolean binary operator."];
};
export declare const HEAP_PTR = "$_heap_pointer";
export declare const CURR_ENV = "$_current_env";
export declare const MAKE_INT_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const MAKE_FLOAT_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const MAKE_COMPLEX_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const MAKE_BOOL_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const MAKE_STRING_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const MAKE_CLOSURE_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const MAKE_NONE_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const MAKE_PAIR_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const GET_PAIR_HEAD_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const GET_PAIR_TAIL_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const SET_PAIR_HEAD_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const SET_PAIR_TAIL_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const importedLogs: {
    params(...params: {
        "~type": import("@sourceacademy/wasm-util").WasmNumericType;
    }[]): any;
    locals(...locals: {
        "~type": import("@sourceacademy/wasm-util").WasmNumericType;
    }[]): any;
    results(...results: {
        "~type": import("@sourceacademy/wasm-util").WasmNumericType;
    }[]): any;
    op: "import";
    moduleName: string;
    itemName: string;
    externType: import("@sourceacademy/wasm-util").WasmExternType;
}[];
export declare const LOG_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const NEG_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const ARITHMETIC_OP_TAG: {
    readonly ADD: 0;
    readonly SUB: 1;
    readonly MUL: 2;
    readonly DIV: 3;
};
export declare const ARITHMETIC_OP_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const COMPARISON_OP_TAG: {
    readonly EQ: 0;
    readonly NEQ: 1;
    readonly LT: 2;
    readonly LTE: 3;
    readonly GT: 4;
    readonly GTE: 5;
};
export declare const STRING_COMPARE_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const COMPARISON_OP_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const BOOLISE_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const BOOL_NOT_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const BOOL_BINARY_OP_TAG: {
    AND: number;
    OR: number;
};
export declare const ALLOC_ENV_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const PRE_APPLY_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const APPLY_FX_NAME = "$_apply";
export declare const applyFuncFactory: (bodies: WasmInstruction[][]) => import("@sourceacademy/wasm-util").WasmFunction;
export declare const GET_LEX_ADDR_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const SET_LEX_ADDR_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const SET_PARAM_FX: import("@sourceacademy/wasm-util").WasmFunction;
export declare const nativeFunctions: import("@sourceacademy/wasm-util").WasmFunction[];
