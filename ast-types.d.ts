import { Token } from "./tokenizer";
import { PyComplexNumber } from "./types";
export type FunctionParam = Token & {
    isStarred: boolean;
};
export type AssignTarget = ExprNS.Variable | ExprNS.Subscript;
export declare namespace ExprNS {
    interface Visitor<T> {
        visitBigIntLiteralExpr(expr: BigIntLiteral): T;
        visitBinaryExpr(expr: Binary): T;
        visitCompareExpr(expr: Compare): T;
        visitBoolOpExpr(expr: BoolOp): T;
        visitGroupingExpr(expr: Grouping): T;
        visitLiteralExpr(expr: Literal): T;
        visitUnaryExpr(expr: Unary): T;
        visitTernaryExpr(expr: Ternary): T;
        visitLambdaExpr(expr: Lambda): T;
        visitMultiLambdaExpr(expr: MultiLambda): T;
        visitVariableExpr(expr: Variable): T;
        visitCallExpr(expr: Call): T;
        visitListExpr(expr: List): T;
        visitSubscriptExpr(expr: Subscript): T;
        visitNoneExpr(expr: None): T;
        visitComplexExpr(expr: Complex): T;
    }
    abstract class Expr {
        abstract readonly kind: string;
        startToken: Token;
        endToken: Token;
        protected constructor(startToken: Token, endToken: Token);
        abstract accept(visitor: Visitor<any>): any;
    }
    class BigIntLiteral extends Expr {
        readonly kind = "BigIntLiteral";
        value: string;
        constructor(startToken: Token, endToken: Token, value: string);
        accept(visitor: Visitor<any>): any;
    }
    class Binary extends Expr {
        readonly kind = "Binary";
        left: Expr;
        operator: Token;
        right: Expr;
        constructor(startToken: Token, endToken: Token, left: Expr, operator: Token, right: Expr);
        accept(visitor: Visitor<any>): any;
    }
    class Compare extends Expr {
        readonly kind = "Compare";
        left: Expr;
        operator: Token;
        right: Expr;
        constructor(startToken: Token, endToken: Token, left: Expr, operator: Token, right: Expr);
        accept(visitor: Visitor<any>): any;
    }
    class BoolOp extends Expr {
        readonly kind = "BoolOp";
        left: Expr;
        operator: Token;
        right: Expr;
        constructor(startToken: Token, endToken: Token, left: Expr, operator: Token, right: Expr);
        accept(visitor: Visitor<any>): any;
    }
    class Grouping extends Expr {
        readonly kind = "Grouping";
        expression: Expr;
        constructor(startToken: Token, endToken: Token, expression: Expr);
        accept(visitor: Visitor<any>): any;
    }
    class Literal extends Expr {
        readonly kind = "Literal";
        value: true | false | number | string;
        constructor(startToken: Token, endToken: Token, value: true | false | number | string);
        accept(visitor: Visitor<any>): any;
    }
    class Unary extends Expr {
        readonly kind = "Unary";
        operator: Token;
        right: Expr;
        constructor(startToken: Token, endToken: Token, operator: Token, right: Expr);
        accept(visitor: Visitor<any>): any;
    }
    class Ternary extends Expr {
        readonly kind = "Ternary";
        predicate: Expr;
        consequent: Expr;
        alternative: Expr;
        constructor(startToken: Token, endToken: Token, predicate: Expr, consequent: Expr, alternative: Expr);
        accept(visitor: Visitor<any>): any;
    }
    class Lambda extends Expr {
        readonly kind = "Lambda";
        parameters: FunctionParam[];
        body: Expr;
        constructor(startToken: Token, endToken: Token, parameters: FunctionParam[], body: Expr);
        accept(visitor: Visitor<any>): any;
    }
    class MultiLambda extends Expr {
        readonly kind = "MultiLambda";
        parameters: FunctionParam[];
        body: StmtNS.Stmt[];
        varDecls: Token[];
        constructor(startToken: Token, endToken: Token, parameters: FunctionParam[], body: StmtNS.Stmt[], varDecls: Token[]);
        accept(visitor: Visitor<any>): any;
    }
    class Variable extends Expr {
        readonly kind = "Variable";
        name: Token;
        constructor(startToken: Token, endToken: Token, name: Token);
        accept(visitor: Visitor<any>): any;
    }
    class Call extends Expr {
        readonly kind = "Call";
        callee: Expr;
        args: Expr[];
        constructor(startToken: Token, endToken: Token, callee: Expr, args: Expr[]);
        accept(visitor: Visitor<any>): any;
    }
    class List extends Expr {
        readonly kind = "List";
        elements: Expr[];
        constructor(startToken: Token, endToken: Token, elements: Expr[]);
        accept(visitor: Visitor<any>): any;
    }
    class Subscript extends Expr {
        readonly kind = "Subscript";
        value: Expr;
        index: Expr;
        constructor(startToken: Token, endToken: Token, value: Expr, index: Expr);
        accept(visitor: Visitor<any>): any;
    }
    class None extends Expr {
        readonly kind = "None";
        constructor(startToken: Token, endToken: Token);
        accept(visitor: Visitor<any>): any;
    }
    class Complex extends Expr {
        readonly kind = "Complex";
        value: PyComplexNumber;
        constructor(startToken: Token, endToken: Token, value: string);
        accept(visitor: Visitor<any>): any;
    }
}
export declare namespace StmtNS {
    interface Visitor<T> {
        visitPassStmt(stmt: Pass): T;
        visitAssignStmt(stmt: Assign): T;
        visitAnnAssignStmt(stmt: AnnAssign): T;
        visitBreakStmt(stmt: Break): T;
        visitContinueStmt(stmt: Continue): T;
        visitReturnStmt(stmt: Return): T;
        visitFromImportStmt(stmt: FromImport): T;
        visitGlobalStmt(stmt: Global): T;
        visitNonLocalStmt(stmt: NonLocal): T;
        visitAssertStmt(stmt: Assert): T;
        visitIfStmt(stmt: If): T;
        visitWhileStmt(stmt: While): T;
        visitForStmt(stmt: For): T;
        visitFunctionDefStmt(stmt: FunctionDef): T;
        visitSimpleExprStmt(stmt: SimpleExpr): T;
        visitFileInputStmt(stmt: FileInput): T;
    }
    abstract class Stmt {
        abstract readonly kind: string;
        startToken: Token;
        endToken: Token;
        protected constructor(startToken: Token, endToken: Token);
        abstract accept(visitor: Visitor<any>): any;
    }
    class Pass extends Stmt {
        readonly kind = "Pass";
        constructor(startToken: Token, endToken: Token);
        accept(visitor: Visitor<any>): any;
    }
    class Assign extends Stmt {
        readonly kind = "Assign";
        target: AssignTarget;
        value: ExprNS.Expr;
        constructor(startToken: Token, endToken: Token, target: AssignTarget, value: ExprNS.Expr);
        accept(visitor: Visitor<any>): any;
    }
    class AnnAssign extends Stmt {
        readonly kind = "AnnAssign";
        target: ExprNS.Variable;
        value: ExprNS.Expr;
        ann: ExprNS.Expr;
        constructor(startToken: Token, endToken: Token, target: ExprNS.Variable, value: ExprNS.Expr, ann: ExprNS.Expr);
        accept(visitor: Visitor<any>): any;
    }
    class Break extends Stmt {
        readonly kind = "Break";
        constructor(startToken: Token, endToken: Token);
        accept(visitor: Visitor<any>): any;
    }
    class Continue extends Stmt {
        readonly kind = "Continue";
        constructor(startToken: Token, endToken: Token);
        accept(visitor: Visitor<any>): any;
    }
    class Return extends Stmt {
        readonly kind = "Return";
        value: ExprNS.Expr | null;
        constructor(startToken: Token, endToken: Token, value: ExprNS.Expr | null);
        accept(visitor: Visitor<any>): any;
    }
    class FromImport extends Stmt {
        readonly kind = "FromImport";
        module: Token;
        names: {
            name: Token;
            alias: Token | null;
        }[];
        constructor(startToken: Token, endToken: Token, module: Token, names: {
            name: Token;
            alias: Token | null;
        }[]);
        accept(visitor: Visitor<any>): any;
    }
    class Global extends Stmt {
        readonly kind = "Global";
        name: Token;
        constructor(startToken: Token, endToken: Token, name: Token);
        accept(visitor: Visitor<any>): any;
    }
    class NonLocal extends Stmt {
        readonly kind = "NonLocal";
        name: Token;
        constructor(startToken: Token, endToken: Token, name: Token);
        accept(visitor: Visitor<any>): any;
    }
    class Assert extends Stmt {
        readonly kind = "Assert";
        value: ExprNS.Expr;
        constructor(startToken: Token, endToken: Token, value: ExprNS.Expr);
        accept(visitor: Visitor<any>): any;
    }
    class If extends Stmt {
        readonly kind = "If";
        condition: ExprNS.Expr;
        body: Stmt[];
        elseBlock: Stmt[] | null;
        constructor(startToken: Token, endToken: Token, condition: ExprNS.Expr, body: Stmt[], elseBlock: Stmt[] | null);
        accept(visitor: Visitor<any>): any;
    }
    class While extends Stmt {
        readonly kind = "While";
        condition: ExprNS.Expr;
        body: Stmt[];
        constructor(startToken: Token, endToken: Token, condition: ExprNS.Expr, body: Stmt[]);
        accept(visitor: Visitor<any>): any;
    }
    class For extends Stmt {
        readonly kind = "For";
        target: Token;
        iter: ExprNS.Expr;
        body: Stmt[];
        constructor(startToken: Token, endToken: Token, target: Token, iter: ExprNS.Expr, body: Stmt[]);
        accept(visitor: Visitor<any>): any;
    }
    class FunctionDef extends Stmt {
        readonly kind = "FunctionDef";
        name: Token;
        parameters: FunctionParam[];
        body: Stmt[];
        varDecls: Token[];
        constructor(startToken: Token, endToken: Token, name: Token, parameters: FunctionParam[], body: Stmt[], varDecls: Token[]);
        accept(visitor: Visitor<any>): any;
    }
    class SimpleExpr extends Stmt {
        readonly kind = "SimpleExpr";
        expression: ExprNS.Expr;
        constructor(startToken: Token, endToken: Token, expression: ExprNS.Expr);
        accept(visitor: Visitor<any>): any;
    }
    class FileInput extends Stmt {
        readonly kind = "FileInput";
        statements: Stmt[];
        varDecls: Token[];
        constructor(startToken: Token, endToken: Token, statements: Stmt[], varDecls: Token[]);
        accept(visitor: Visitor<any>): any;
    }
}
