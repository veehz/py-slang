/**
 * Two-pass Python lexer: Moo tokenization → indent/dedent injection.
 *
 * Pass 1: moo.compile() produces a flat token stream.
 * Pass 2: processTokens() strips whitespace/comments, tracks enclosure
 *         depth, and emits synthetic indent/dedent tokens.
 */
import moo from "moo";
declare const pythonLexer: moo.Lexer;
export default pythonLexer;
