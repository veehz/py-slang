import { ConductorError, ErrorType } from "@sourceacademy/conductor/common";
import { IRunnerPlugin } from "@sourceacademy/conductor/runner";
import { Context } from "./context";
import { ErrorValue } from "./stash";
export type WritableContext<T> = {
    stream: WritableStream<T>;
    writer: WritableStreamDefaultWriter<T>;
};
export type ReadableContext<T> = {
    stream: ReadableStream<T>;
    reader: ReadableStreamDefaultReader<T>;
};
export declare function createOutputStream(conductor: IRunnerPlugin): WritableContext<string>;
export declare function createErrorStream(conductor: IRunnerPlugin): WritableContext<ConductorError>;
export declare const createInputStream: (conductor: IRunnerPlugin) => ReadableContext<string>;
export declare const displayError: (context: Context, error: unknown, type: ErrorType) => Promise<ErrorValue>;
export declare const displayOutput: (context: Context, output: string) => Promise<void>;
export declare const receiveInput: (context: Context) => Promise<string>;
export declare const destroyStreams: (context: Context) => Promise<void>;
