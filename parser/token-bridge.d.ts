import { Token } from "../tokenizer/tokenizer";
export declare function toAstToken(mooToken: {
    type?: string;
    value?: string;
    line?: number;
    col?: number;
    offset?: number;
}): Token;
