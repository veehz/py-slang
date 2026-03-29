import { ExprNS, StmtNS } from "../ast-types";
declare const _default: {
    Lexer: import("moo").Lexer;
    ParserRules: ({
        name: string;
        symbols: any[];
        postprocess?: undefined;
    } | {
        name: string;
        symbols: (string | {
            literal: string;
        })[];
        postprocess: ([kw, mod, , names]: [any, any, any, any]) => StmtNS.FromImport;
    } | {
        name: string;
        symbols: (string | void | {
            type: string;
        })[];
        postprocess: ([first, rest]: [any, any]) => import("../tokenizer").Token;
    } | {
        name: string;
        symbols: (string | {
            literal: string;
        })[];
        postprocess: ([, ns]: [any, any]) => any;
    } | {
        name: string;
        symbols: (void | {
            type: string;
        })[];
        postprocess: ([t]: [any]) => {
            name: import("../tokenizer").Token;
            alias: null;
        };
    } | {
        name: string;
        symbols: (string | void | {
            type: string;
            literal?: undefined;
        } | {
            literal: string;
            type?: undefined;
        })[];
        postprocess: ([n, , ann, , v]: [any, any, any, any, any]) => StmtNS.AnnAssign;
    } | {
        name: string;
        symbols: {
            literal: string;
        }[];
        postprocess: ([t]: [any]) => StmtNS.Return;
    } | {
        name: string;
        symbols: {
            literal: string;
        }[];
        postprocess: ([t]: [any]) => StmtNS.Pass;
    } | {
        name: string;
        symbols: {
            literal: string;
        }[];
        postprocess: ([t]: [any]) => StmtNS.Break;
    } | {
        name: string;
        symbols: {
            literal: string;
        }[];
        postprocess: ([t]: [any]) => StmtNS.Continue;
    } | {
        name: string;
        symbols: (void | {
            literal: string;
            type?: undefined;
        } | {
            type: string;
            literal?: undefined;
        })[];
        postprocess: ([kw, n]: [any, any]) => StmtNS.Global;
    } | {
        name: string;
        symbols: (void | {
            literal: string;
            type?: undefined;
        } | {
            type: string;
            literal?: undefined;
        })[];
        postprocess: ([kw, n]: [any, any]) => StmtNS.NonLocal;
    } | {
        name: string;
        symbols: string[];
        postprocess: ([e]: [any]) => StmtNS.SimpleExpr;
    } | {
        name: string;
        symbols: (string | {
            literal: string;
        })[];
        postprocess: ([kw, test, , body]: [any, any, any, any]) => StmtNS.While;
    } | {
        name: string;
        symbols: (string | void | {
            literal: string;
            type?: undefined;
        } | {
            type: string;
            literal?: undefined;
        })[];
        postprocess: ([kw, target, , iter, , body]: [any, any, any, any, any, any]) => StmtNS.For;
    } | {
        name: string;
        symbols: (string | void | {
            literal: string;
            type?: undefined;
        } | {
            type: string;
            literal?: undefined;
        })[];
        postprocess: ([kw, name, params, , body]: [any, any, any, any, any]) => StmtNS.FunctionDef;
    } | {
        name: string;
        symbols: (string | {
            literal: string;
        })[];
        postprocess: ([kw, test, , body, elifs, elseBlock]: [any, any, any, any, any, any]) => StmtNS.If;
    } | {
        name: string;
        symbols: (string | void | {
            type: string;
        })[];
        postprocess: ([first, rest]: [any, any]) => any[];
    } | {
        name: string;
        symbols: any[];
        postprocess: ([x]: [any]) => any[];
    } | {
        name: string;
        symbols: any[];
        postprocess: ([, , stmts]: [any, any, any]) => any;
    } | {
        name: string;
        symbols: (void | {
            literal: string;
            type?: undefined;
        } | {
            type: string;
            literal?: undefined;
        })[];
        postprocess: ([, t]: [any, any]) => import("../tokenizer").Token[];
    } | {
        name: string;
        symbols: (string | void | {
            literal: string;
            type?: undefined;
        } | {
            type: string;
            literal?: undefined;
        })[];
        postprocess: ([params, , , t]: [any, any, any, any]) => any[];
    } | {
        name: string;
        symbols: (string | {
            literal: string;
        })[];
        postprocess: ([cons, , test, , alt]: [any, any, any, any, any]) => ExprNS.Ternary;
    } | {
        name: string;
        symbols: any[];
        postprocess: ([t]: [any]) => import("../tokenizer").Token;
    } | {
        name: string;
        symbols: any[];
        postprocess: ([op, arg]: [any, any]) => ExprNS.Unary;
    } | {
        name: string;
        symbols: any[];
        postprocess: ([obj, , idx, rsqb]: [any, any, any, any]) => ExprNS.Subscript;
    } | {
        name: string;
        symbols: (string | {
            literal: string;
        })[];
        postprocess: ([callee, , args, rparen]: [any, any, any, any]) => ExprNS.Call;
    } | {
        name: string;
        symbols: any[];
        postprocess: ([l, r]: [any, any]) => ExprNS.List;
    } | {
        name: string;
        symbols: (void | {
            type: string;
        })[];
        postprocess: ([t]: [any]) => ExprNS.Variable;
    } | {
        name: string;
        symbols: any[];
        postprocess: ([t]: [any]) => ExprNS.Literal;
    } | {
        name: string;
        symbols: any[];
        postprocess: ([t]: [any]) => ExprNS.BigIntLiteral;
    } | {
        name: string;
        symbols: any[];
        postprocess: ([t]: [any]) => ExprNS.Complex;
    } | {
        name: string;
        symbols: {
            literal: string;
        }[];
        postprocess: ([t]: [any]) => ExprNS.None;
    } | {
        name: string;
        symbols: (string | {
            literal: string;
        })[];
        postprocess: ([kw, params, , body]: [any, any, any, any]) => ExprNS.Lambda;
    } | {
        name: string;
        symbols: any[];
        postprocess: ([kw, params, , body]: [any, any, any, any]) => ExprNS.MultiLambda;
    })[];
    ParserStart: string;
};
export default _default;
