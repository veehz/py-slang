import { ILanguageDefinition } from "./types";
export declare function generateLanguageMap(languages: ILanguageDefinition[]): Map<string, ILanguageDefinition>;
/**
 * Retrieve by ID a definition for a language from the directory.
 * @param languageMap The language map of the directory.
 * @param languageId The ID of the language to get the definition of.
 * @returns The retrieved language definition, or undefined if not found.
 */
export declare function getLanguageDefinition(languageMap: Map<string, ILanguageDefinition>, languageId: string): ILanguageDefinition | undefined;
/**
 * Retrieve by ID a definition for an evaluator from a language definition.
 * @param language The language definition to get the evaluator definition from.
 * @param evaluatorId The ID of the evaluator to get the definition of.
 * @returns The retrieved evaluator definition, or undefined if not found.
 */
export declare function getEvaluatorDefinition(language: ILanguageDefinition, evaluatorId: string): import("./types").IEvaluatorDefinition | undefined;
