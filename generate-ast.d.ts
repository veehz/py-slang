import fs from "fs";
interface FieldOverride {
    fieldType: string;
    constructorType: string;
    transform: string;
}
interface AstWriterConfig {
    additionalImports?: string[];
    typeAliases?: string[];
    fieldOverrides?: Record<string, FieldOverride>;
}
export declare class AstWriter {
    private config;
    indentationLevel: number;
    fp?: fs.WriteStream;
    constructor(config?: AstWriterConfig);
    main(): void;
    private setup;
    private tearDown;
    private convertToReadableForm;
    private splitFields;
    private defineAst;
    private classDef;
    private defineVisitorInterface;
    private indent;
    private dedent;
    private writeSingleLine;
    writeRaw(chunk: string): void;
}
export {};
