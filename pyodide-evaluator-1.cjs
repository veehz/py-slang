'use strict';

var R$1;!function(R){R[R.CALL=0]="CALL",R[R.RETURN=1]="RETURN",R[R.RETURN_ERR=2]="RETURN_ERR";}(R$1||(R$1={}));

var O$2;!function(O){O[O.PROTOCOL_VERSION=0]="PROTOCOL_VERSION",O[O.PROTOCOL_MIN_VERSION=0]="PROTOCOL_MIN_VERSION",O[O.SETUP_MESSAGES_BUFFER_SIZE=10]="SETUP_MESSAGES_BUFFER_SIZE";}(O$2||(O$2={}));

var _$2;!function(_){_.UNKNOWN="__unknown",_.INTERNAL="__internal",_.EVALUATOR="__evaluator",_.EVALUATOR_SYNTAX="__evaluator_syntax",_.EVALUATOR_TYPE="__evaluator_type",_.EVALUATOR_RUNTIME="__evaluator_runtime";}(_$2||(_$2={}));

let t$3 = class t{t=[];i=[];push(t){this.i.push(t);}pop(){if(0===this.t.length){if(0===this.i.length)throw new Error("queue is empty");let t=this.t;this.t=this.i.reverse(),this.i=t;}return this.t.pop()}get length(){return this.t.length+this.i.length}clone(){const s=new t;return s.t=[...this.t],s.i=[...this.i],s}};let s$2 = class s{h=new t$3;u=new t$3;push(t){0!==this.u.length?this.u.pop()(t):this.h.push(t);}async pop(){return 0!==this.h.length?this.h.pop():new Promise(((t,s)=>{this.u.push(t);}))}tryPop(){if(0!==this.h.length)return this.h.pop()}constructor(){this.push=this.push.bind(this);}};

let o$1 = class o extends Error{name="ConductorError";errorType=_$2.UNKNOWN;constructor(r){super(r);}};

let s$1 = class s extends o$1{name="ConductorInternalError";errorType=_$2.INTERNAL;constructor(r){super(r);}};

class h{name;u;p=new s$2;async receive(){return this.p.pop()}tryReceive(){return this.p.tryPop()}send(s,t){this.u.send(s,t);}close(){this.u.unsubscribe(this.p.push);}constructor(s){this.name=s.name,this.u=s,this.u.subscribe(this.p.push);}}

async function t$2(t){return (await import(/* webpackIgnore: true */t)).plugin}

async function r$2(r){return await t$2(r)}

let t$1 = class t{type=R$1.CALL;data;constructor(s,t,r){this.data={fn:s,args:t,invokeId:r};}};let r$1 = class r{type=R$1.RETURN_ERR;data;constructor(s,t){this.data={invokeId:s,err:t};}};let a$1 = class a{type=R$1.RETURN;data;constructor(s,t){this.data={invokeId:s,res:t};}};

function s(s,o){const c=[];let a=0;return s.subscribe((async n=>{switch(n.type){case R$1.CALL:{const{fn:r,args:c,invokeId:a}=n.data;try{const t=await o[r](...c);a>0&&s.send(new a$1(a,t));}catch(e){a>0&&s.send(new r$1(a,e));}break}case R$1.RETURN:{const{invokeId:e,res:t}=n.data;c[e]?.[0]?.(t),delete c[e];break}case R$1.RETURN_ERR:{const{invokeId:e,err:t}=n.data;c[e]?.[1]?.(t),delete c[e];break}}})),new Proxy({},{get(e,t,r){const o=Reflect.get(e,t,r);if(o)return o;const i="string"==typeof t&&"$"===t.charAt(0)?(...e)=>{s.send(new t$1(t,e,0));}:(...e)=>{const r=++a;return s.send(new t$1(t,e,r)),new Promise(((e,t)=>{c[r]=[e,t];}))};return Reflect.set(e,t,i,r),i}})}

var _$1,n;!function(_){_.CHUNK="__chunk",_.FILE="__file_rpc",_.SERVICE="__service",_.STANDARD_IO="__stdio",_.RESULT="__result",_.ERROR="__error",_.STATUS="__status",_.PLUGIN="__plugin";}(_$1||(_$1={})),function(_){_.HOST_MAIN="__host_main",_.RUNNER_MAIN="__runner_main";}(n||(n={}));

var O$1;!function(O){O[O.VOID=0]="VOID",O[O.BOOLEAN=1]="BOOLEAN",O[O.NUMBER=2]="NUMBER",O[O.CONST_STRING=3]="CONST_STRING",O[O.EMPTY_LIST=4]="EMPTY_LIST",O[O.PAIR=5]="PAIR",O[O.ARRAY=6]="ARRAY",O[O.CLOSURE=7]="CLOSURE",O[O.OPAQUE=8]="OPAQUE",O[O.LIST=9]="LIST";}(O$1||(O$1={}));

var a;!function(a){a[a.HELLO=0]="HELLO",a[a.ABORT=1]="ABORT",a[a.ENTRY=2]="ENTRY";}(a||(a={}));

class t{type=a.ABORT;data;constructor(s){this.data={minVersion:s};}}class e{type=a.HELLO;data={version:O$2.PROTOCOL_VERSION}}

var N$1;!function(N){N[N.ONLINE=0]="ONLINE",N[N.EVAL_READY=1]="EVAL_READY",N[N.RUNNING=2]="RUNNING",N[N.WAITING=3]="WAITING",N[N.BREAKPOINT=4]="BREAKPOINT",N[N.STOPPED=5]="STOPPED",N[N.ERROR=6]="ERROR";}(N$1||(N$1={}));

let p$1 = class p{id=n.RUNNER_MAIN;t;i;o;u;h;l;p;m;_;j;v;C=new Map([[a.HELLO,function(s){s.data.version<O$2.PROTOCOL_MIN_VERSION?(this.l.send(new t(O$2.PROTOCOL_MIN_VERSION)),console.error(`Host's protocol version (${s.data.version}) must be at least ${O$2.PROTOCOL_MIN_VERSION}`)):console.log(`Host is using protocol version ${s.data.version}`);}],[a.ABORT,function(s){console.error(`Host expects at least protocol version ${s.data.minVersion}, but we are on version ${O$2.PROTOCOL_VERSION}`),this.o.terminate();}],[a.ENTRY,function(t){this.t.startEvaluator(t.data);}]]);requestFile(t){return this.u.requestFile(t)}async requestChunk(){return (await this.h.receive()).chunk}async requestInput(){const{message:t}=await this.p.receive();return t}tryRequestInput(){const t=this.p.tryReceive();return t?.message}sendOutput(t){this.p.send({message:t});}sendResult(t){this.m.send({result:t});}sendError(t){this._.send({error:t});}updateStatus(t,s){this.j.send({status:t,isActive:s});}hostLoadPlugin(t){this.v.$requestLoadPlugin(t);}async hostQueryPluginResolutions(t){return this.v.queryPluginResolutions(t)}registerPlugin(t,...s){return this.o.registerPlugin(t,...s)}unregisterPlugin(t){this.o.unregisterPlugin(t);}registerModule(t){if(!this.i)throw new s$1("Evaluator has no data interface");return this.registerPlugin(t,this.t)}unregisterModule(t){this.unregisterPlugin(t);}async importAndRegisterExternalPlugin(t,...s){const e=await t$2(t);return this.registerPlugin(e,...s)}async importAndRegisterExternalModule(t){const s=await r$2(t);return this.registerModule(s)}static channelAttach=[_$1.FILE,_$1.CHUNK,_$1.SERVICE,_$1.STANDARD_IO,_$1.RESULT,_$1.ERROR,_$1.STATUS,_$1.PLUGIN];constructor(t,[e$1,r,i,n,u,a,h$1,l],p){this.o=t,this.u=s(e$1,{}),this.h=new h(r),this.l=i,this.p=new h(n),this.m=u,this._=a,this.j=h$1,this.v=s(l,{}),this.l.send(new e),this.l.subscribe((t=>{this.C.get(t.type)?.call(this,t);})),this.t=new p(this),this.i=this.t.hasDataInterface??false;}};

class r{conductor;async startEvaluator(r){const i=await this.conductor.requestFile(r);if(!i)throw new s$1("Cannot load entrypoint file");for(this.conductor.sendResult(await this.evaluateFile(r,i));;){const t=await this.conductor.requestChunk();this.conductor.sendResult(await this.evaluateChunk(t));}}async evaluateFile(t,r){return this.evaluateChunk(r)}constructor(t){this.conductor=t;}}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getAugmentedNamespace(n) {
  if (Object.prototype.hasOwnProperty.call(n, '__esModule')) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			var isInstance = false;
      try {
        isInstance = this instanceof a;
      } catch {}
			if (isInstance) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var nearley$2 = {exports: {}};

var nearley$1 = nearley$2.exports;

var hasRequiredNearley;

function requireNearley () {
	if (hasRequiredNearley) return nearley$2.exports;
	hasRequiredNearley = 1;
	(function (module) {
		(function(root, factory) {
		    if (module.exports) {
		        module.exports = factory();
		    } else {
		        root.nearley = factory();
		    }
		}(nearley$1, function() {

		    function Rule(name, symbols, postprocess) {
		        this.id = ++Rule.highestId;
		        this.name = name;
		        this.symbols = symbols;        // a list of literal | regex class | nonterminal
		        this.postprocess = postprocess;
		        return this;
		    }
		    Rule.highestId = 0;

		    Rule.prototype.toString = function(withCursorAt) {
		        var symbolSequence = (typeof withCursorAt === "undefined")
		                             ? this.symbols.map(getSymbolShortDisplay).join(' ')
		                             : (   this.symbols.slice(0, withCursorAt).map(getSymbolShortDisplay).join(' ')
		                                 + " ● "
		                                 + this.symbols.slice(withCursorAt).map(getSymbolShortDisplay).join(' ')     );
		        return this.name + " → " + symbolSequence;
		    };


		    // a State is a rule at a position from a given starting point in the input stream (reference)
		    function State(rule, dot, reference, wantedBy) {
		        this.rule = rule;
		        this.dot = dot;
		        this.reference = reference;
		        this.data = [];
		        this.wantedBy = wantedBy;
		        this.isComplete = this.dot === rule.symbols.length;
		    }

		    State.prototype.toString = function() {
		        return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
		    };

		    State.prototype.nextState = function(child) {
		        var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
		        state.left = this;
		        state.right = child;
		        if (state.isComplete) {
		            state.data = state.build();
		            // Having right set here will prevent the right state and its children
		            // form being garbage collected
		            state.right = undefined;
		        }
		        return state;
		    };

		    State.prototype.build = function() {
		        var children = [];
		        var node = this;
		        do {
		            children.push(node.right.data);
		            node = node.left;
		        } while (node.left);
		        children.reverse();
		        return children;
		    };

		    State.prototype.finish = function() {
		        if (this.rule.postprocess) {
		            this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
		        }
		    };


		    function Column(grammar, index) {
		        this.grammar = grammar;
		        this.index = index;
		        this.states = [];
		        this.wants = {}; // states indexed by the non-terminal they expect
		        this.scannable = []; // list of states that expect a token
		        this.completed = {}; // states that are nullable
		    }


		    Column.prototype.process = function(nextColumn) {
		        var states = this.states;
		        var wants = this.wants;
		        var completed = this.completed;

		        for (var w = 0; w < states.length; w++) { // nb. we push() during iteration
		            var state = states[w];

		            if (state.isComplete) {
		                state.finish();
		                if (state.data !== Parser.fail) {
		                    // complete
		                    var wantedBy = state.wantedBy;
		                    for (var i = wantedBy.length; i--; ) { // this line is hot
		                        var left = wantedBy[i];
		                        this.complete(left, state);
		                    }

		                    // special-case nullables
		                    if (state.reference === this.index) {
		                        // make sure future predictors of this rule get completed.
		                        var exp = state.rule.name;
		                        (this.completed[exp] = this.completed[exp] || []).push(state);
		                    }
		                }

		            } else {
		                // queue scannable states
		                var exp = state.rule.symbols[state.dot];
		                if (typeof exp !== 'string') {
		                    this.scannable.push(state);
		                    continue;
		                }

		                // predict
		                if (wants[exp]) {
		                    wants[exp].push(state);

		                    if (completed.hasOwnProperty(exp)) {
		                        var nulls = completed[exp];
		                        for (var i = 0; i < nulls.length; i++) {
		                            var right = nulls[i];
		                            this.complete(state, right);
		                        }
		                    }
		                } else {
		                    wants[exp] = [state];
		                    this.predict(exp);
		                }
		            }
		        }
		    };

		    Column.prototype.predict = function(exp) {
		        var rules = this.grammar.byName[exp] || [];

		        for (var i = 0; i < rules.length; i++) {
		            var r = rules[i];
		            var wantedBy = this.wants[exp];
		            var s = new State(r, 0, this.index, wantedBy);
		            this.states.push(s);
		        }
		    };

		    Column.prototype.complete = function(left, right) {
		        var copy = left.nextState(right);
		        this.states.push(copy);
		    };


		    function Grammar(rules, start) {
		        this.rules = rules;
		        this.start = start || this.rules[0].name;
		        var byName = this.byName = {};
		        this.rules.forEach(function(rule) {
		            if (!byName.hasOwnProperty(rule.name)) {
		                byName[rule.name] = [];
		            }
		            byName[rule.name].push(rule);
		        });
		    }

		    // So we can allow passing (rules, start) directly to Parser for backwards compatibility
		    Grammar.fromCompiled = function(rules, start) {
		        var lexer = rules.Lexer;
		        if (rules.ParserStart) {
		          start = rules.ParserStart;
		          rules = rules.ParserRules;
		        }
		        var rules = rules.map(function (r) { return (new Rule(r.name, r.symbols, r.postprocess)); });
		        var g = new Grammar(rules, start);
		        g.lexer = lexer; // nb. storing lexer on Grammar is iffy, but unavoidable
		        return g;
		    };


		    function StreamLexer() {
		      this.reset("");
		    }

		    StreamLexer.prototype.reset = function(data, state) {
		        this.buffer = data;
		        this.index = 0;
		        this.line = state ? state.line : 1;
		        this.lastLineBreak = state ? -state.col : 0;
		    };

		    StreamLexer.prototype.next = function() {
		        if (this.index < this.buffer.length) {
		            var ch = this.buffer[this.index++];
		            if (ch === '\n') {
		              this.line += 1;
		              this.lastLineBreak = this.index;
		            }
		            return {value: ch};
		        }
		    };

		    StreamLexer.prototype.save = function() {
		      return {
		        line: this.line,
		        col: this.index - this.lastLineBreak,
		      }
		    };

		    StreamLexer.prototype.formatError = function(token, message) {
		        // nb. this gets called after consuming the offending token,
		        // so the culprit is index-1
		        var buffer = this.buffer;
		        if (typeof buffer === 'string') {
		            var lines = buffer
		                .split("\n")
		                .slice(
		                    Math.max(0, this.line - 5), 
		                    this.line
		                );

		            var nextLineBreak = buffer.indexOf('\n', this.index);
		            if (nextLineBreak === -1) nextLineBreak = buffer.length;
		            var col = this.index - this.lastLineBreak;
		            var lastLineDigits = String(this.line).length;
		            message += " at line " + this.line + " col " + col + ":\n\n";
		            message += lines
		                .map(function(line, i) {
		                    return pad(this.line - lines.length + i + 1, lastLineDigits) + " " + line;
		                }, this)
		                .join("\n");
		            message += "\n" + pad("", lastLineDigits + col) + "^\n";
		            return message;
		        } else {
		            return message + " at index " + (this.index - 1);
		        }

		        function pad(n, length) {
		            var s = String(n);
		            return Array(length - s.length + 1).join(" ") + s;
		        }
		    };

		    function Parser(rules, start, options) {
		        if (rules instanceof Grammar) {
		            var grammar = rules;
		            var options = start;
		        } else {
		            var grammar = Grammar.fromCompiled(rules, start);
		        }
		        this.grammar = grammar;

		        // Read options
		        this.options = {
		            keepHistory: false,
		            lexer: grammar.lexer || new StreamLexer,
		        };
		        for (var key in (options || {})) {
		            this.options[key] = options[key];
		        }

		        // Setup lexer
		        this.lexer = this.options.lexer;
		        this.lexerState = undefined;

		        // Setup a table
		        var column = new Column(grammar, 0);
		        this.table = [column];

		        // I could be expecting anything.
		        column.wants[grammar.start] = [];
		        column.predict(grammar.start);
		        // TODO what if start rule is nullable?
		        column.process();
		        this.current = 0; // token index
		    }

		    // create a reserved token for indicating a parse fail
		    Parser.fail = {};

		    Parser.prototype.feed = function(chunk) {
		        var lexer = this.lexer;
		        lexer.reset(chunk, this.lexerState);

		        var token;
		        while (true) {
		            try {
		                token = lexer.next();
		                if (!token) {
		                    break;
		                }
		            } catch (e) {
		                // Create the next column so that the error reporter
		                // can display the correctly predicted states.
		                var nextColumn = new Column(this.grammar, this.current + 1);
		                this.table.push(nextColumn);
		                var err = new Error(this.reportLexerError(e));
		                err.offset = this.current;
		                err.token = e.token;
		                throw err;
		            }
		            // We add new states to table[current+1]
		            var column = this.table[this.current];

		            // GC unused states
		            if (!this.options.keepHistory) {
		                delete this.table[this.current - 1];
		            }

		            var n = this.current + 1;
		            var nextColumn = new Column(this.grammar, n);
		            this.table.push(nextColumn);

		            // Advance all tokens that expect the symbol
		            var literal = token.text !== undefined ? token.text : token.value;
		            var value = lexer.constructor === StreamLexer ? token.value : token;
		            var scannable = column.scannable;
		            for (var w = scannable.length; w--; ) {
		                var state = scannable[w];
		                var expect = state.rule.symbols[state.dot];
		                // Try to consume the token
		                // either regex or literal
		                if (expect.test ? expect.test(value) :
		                    expect.type ? expect.type === token.type
		                                : expect.literal === literal) {
		                    // Add it
		                    var next = state.nextState({data: value, token: token, isToken: true, reference: n - 1});
		                    nextColumn.states.push(next);
		                }
		            }

		            // Next, for each of the rules, we either
		            // (a) complete it, and try to see if the reference row expected that
		            //     rule
		            // (b) predict the next nonterminal it expects by adding that
		            //     nonterminal's start state
		            // To prevent duplication, we also keep track of rules we have already
		            // added

		            nextColumn.process();

		            // If needed, throw an error:
		            if (nextColumn.states.length === 0) {
		                // No states at all! This is not good.
		                var err = new Error(this.reportError(token));
		                err.offset = this.current;
		                err.token = token;
		                throw err;
		            }

		            // maybe save lexer state
		            if (this.options.keepHistory) {
		              column.lexerState = lexer.save();
		            }

		            this.current++;
		        }
		        if (column) {
		          this.lexerState = lexer.save();
		        }

		        // Incrementally keep track of results
		        this.results = this.finish();

		        // Allow chaining, for whatever it's worth
		        return this;
		    };

		    Parser.prototype.reportLexerError = function(lexerError) {
		        var tokenDisplay, lexerMessage;
		        // Planning to add a token property to moo's thrown error
		        // even on erroring tokens to be used in error display below
		        var token = lexerError.token;
		        if (token) {
		            tokenDisplay = "input " + JSON.stringify(token.text[0]) + " (lexer error)";
		            lexerMessage = this.lexer.formatError(token, "Syntax error");
		        } else {
		            tokenDisplay = "input (lexer error)";
		            lexerMessage = lexerError.message;
		        }
		        return this.reportErrorCommon(lexerMessage, tokenDisplay);
		    };

		    Parser.prototype.reportError = function(token) {
		        var tokenDisplay = (token.type ? token.type + " token: " : "") + JSON.stringify(token.value !== undefined ? token.value : token);
		        var lexerMessage = this.lexer.formatError(token, "Syntax error");
		        return this.reportErrorCommon(lexerMessage, tokenDisplay);
		    };

		    Parser.prototype.reportErrorCommon = function(lexerMessage, tokenDisplay) {
		        var lines = [];
		        lines.push(lexerMessage);
		        var lastColumnIndex = this.table.length - 2;
		        var lastColumn = this.table[lastColumnIndex];
		        var expectantStates = lastColumn.states
		            .filter(function(state) {
		                var nextSymbol = state.rule.symbols[state.dot];
		                return nextSymbol && typeof nextSymbol !== "string";
		            });

		        if (expectantStates.length === 0) {
		            lines.push('Unexpected ' + tokenDisplay + '. I did not expect any more input. Here is the state of my parse table:\n');
		            this.displayStateStack(lastColumn.states, lines);
		        } else {
		            lines.push('Unexpected ' + tokenDisplay + '. Instead, I was expecting to see one of the following:\n');
		            // Display a "state stack" for each expectant state
		            // - which shows you how this state came to be, step by step.
		            // If there is more than one derivation, we only display the first one.
		            var stateStacks = expectantStates
		                .map(function(state) {
		                    return this.buildFirstStateStack(state, []) || [state];
		                }, this);
		            // Display each state that is expecting a terminal symbol next.
		            stateStacks.forEach(function(stateStack) {
		                var state = stateStack[0];
		                var nextSymbol = state.rule.symbols[state.dot];
		                var symbolDisplay = this.getSymbolDisplay(nextSymbol);
		                lines.push('A ' + symbolDisplay + ' based on:');
		                this.displayStateStack(stateStack, lines);
		            }, this);
		        }
		        lines.push("");
		        return lines.join("\n");
		    };
		    
		    Parser.prototype.displayStateStack = function(stateStack, lines) {
		        var lastDisplay;
		        var sameDisplayCount = 0;
		        for (var j = 0; j < stateStack.length; j++) {
		            var state = stateStack[j];
		            var display = state.rule.toString(state.dot);
		            if (display === lastDisplay) {
		                sameDisplayCount++;
		            } else {
		                if (sameDisplayCount > 0) {
		                    lines.push('    ^ ' + sameDisplayCount + ' more lines identical to this');
		                }
		                sameDisplayCount = 0;
		                lines.push('    ' + display);
		            }
		            lastDisplay = display;
		        }
		    };

		    Parser.prototype.getSymbolDisplay = function(symbol) {
		        return getSymbolLongDisplay(symbol);
		    };

		    /*
		    Builds a the first state stack. You can think of a state stack as the call stack
		    of the recursive-descent parser which the Nearley parse algorithm simulates.
		    A state stack is represented as an array of state objects. Within a
		    state stack, the first item of the array will be the starting
		    state, with each successive item in the array going further back into history.

		    This function needs to be given a starting state and an empty array representing
		    the visited states, and it returns an single state stack.

		    */
		    Parser.prototype.buildFirstStateStack = function(state, visited) {
		        if (visited.indexOf(state) !== -1) {
		            // Found cycle, return null
		            // to eliminate this path from the results, because
		            // we don't know how to display it meaningfully
		            return null;
		        }
		        if (state.wantedBy.length === 0) {
		            return [state];
		        }
		        var prevState = state.wantedBy[0];
		        var childVisited = [state].concat(visited);
		        var childResult = this.buildFirstStateStack(prevState, childVisited);
		        if (childResult === null) {
		            return null;
		        }
		        return [state].concat(childResult);
		    };

		    Parser.prototype.save = function() {
		        var column = this.table[this.current];
		        column.lexerState = this.lexerState;
		        return column;
		    };

		    Parser.prototype.restore = function(column) {
		        var index = column.index;
		        this.current = index;
		        this.table[index] = column;
		        this.table.splice(index + 1);
		        this.lexerState = column.lexerState;

		        // Incrementally keep track of results
		        this.results = this.finish();
		    };

		    // nb. deprecated: use save/restore instead!
		    Parser.prototype.rewind = function(index) {
		        if (!this.options.keepHistory) {
		            throw new Error('set option `keepHistory` to enable rewinding')
		        }
		        // nb. recall column (table) indicies fall between token indicies.
		        //        col 0   --   token 0   --   col 1
		        this.restore(this.table[index]);
		    };

		    Parser.prototype.finish = function() {
		        // Return the possible parsings
		        var considerations = [];
		        var start = this.grammar.start;
		        var column = this.table[this.table.length - 1];
		        column.states.forEach(function (t) {
		            if (t.rule.name === start
		                    && t.dot === t.rule.symbols.length
		                    && t.reference === 0
		                    && t.data !== Parser.fail) {
		                considerations.push(t);
		            }
		        });
		        return considerations.map(function(c) {return c.data; });
		    };

		    function getSymbolLongDisplay(symbol) {
		        var type = typeof symbol;
		        if (type === "string") {
		            return symbol;
		        } else if (type === "object") {
		            if (symbol.literal) {
		                return JSON.stringify(symbol.literal);
		            } else if (symbol instanceof RegExp) {
		                return 'character matching ' + symbol;
		            } else if (symbol.type) {
		                return symbol.type + ' token';
		            } else if (symbol.test) {
		                return 'token matching ' + String(symbol.test);
		            } else {
		                throw new Error('Unknown symbol type: ' + symbol);
		            }
		        }
		    }

		    function getSymbolShortDisplay(symbol) {
		        var type = typeof symbol;
		        if (type === "string") {
		            return symbol;
		        } else if (type === "object") {
		            if (symbol.literal) {
		                return JSON.stringify(symbol.literal);
		            } else if (symbol instanceof RegExp) {
		                return symbol.toString();
		            } else if (symbol.type) {
		                return '%' + symbol.type;
		            } else if (symbol.test) {
		                return '<' + String(symbol.test) + '>';
		            } else {
		                throw new Error('Unknown symbol type: ' + symbol);
		            }
		        }
		    }

		    return {
		        Parser: Parser,
		        Grammar: Grammar,
		        Rule: Rule,
		    };

		})); 
	} (nearley$2));
	return nearley$2.exports;
}

var nearleyExports = requireNearley();
var nearley = /*@__PURE__*/getDefaultExportFromCjs(nearleyExports);

var moo$2 = {exports: {}};

var moo$1 = moo$2.exports;

var hasRequiredMoo;

function requireMoo () {
	if (hasRequiredMoo) return moo$2.exports;
	hasRequiredMoo = 1;
	(function (module) {
		(function(root, factory) {
		  if (module.exports) {
		    module.exports = factory();
		  } else {
		    root.moo = factory();
		  }
		}(moo$1, function() {

		  var hasOwnProperty = Object.prototype.hasOwnProperty;
		  var toString = Object.prototype.toString;
		  var hasSticky = typeof new RegExp().sticky === 'boolean';

		  /***************************************************************************/

		  function isRegExp(o) { return o && toString.call(o) === '[object RegExp]' }
		  function isObject(o) { return o && typeof o === 'object' && !isRegExp(o) && !Array.isArray(o) }

		  function reEscape(s) {
		    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, function(x) {
		      if (x === '-') return '\\x2d'
		      return '\\' + x
		    })
		  }
		  function reGroups(s) {
		    var re = new RegExp('|' + s);
		    return re.exec('').length - 1
		  }
		  function reCapture(s) {
		    return '(' + s + ')'
		  }
		  function reUnion(regexps) {
		    if (!regexps.length) return '(?!)'
		    var source =  regexps.map(function(s) {
		      return "(?:" + s + ")"
		    }).join('|');
		    return "(?:" + source + ")"
		  }

		  function regexpOrLiteral(obj) {
		    if (typeof obj === 'string') {
		      return '(?:' + reEscape(obj) + ')'

		    } else if (isRegExp(obj)) {
		      // TODO: consider /u support
		      if (obj.ignoreCase) throw new Error('RegExp /i flag not allowed')
		      if (obj.global) throw new Error('RegExp /g flag is implied')
		      if (obj.sticky) throw new Error('RegExp /y flag is implied')
		      if (obj.multiline) throw new Error('RegExp /m flag is implied')
		      return obj.source

		    } else {
		      throw new Error('Not a pattern: ' + obj)
		    }
		  }

		  function pad(s, length) {
		    if (s.length > length) {
		      return s
		    }
		    return Array(length - s.length + 1).join(" ") + s
		  }

		  function lastNLines(string, numLines) {
		    var position = string.length;
		    var lineBreaks = 0;
		    while (true) {
		      var idx = string.lastIndexOf("\n", position - 1);
		      if (idx === -1) {
		        break;
		      } else {
		        lineBreaks++;
		      }
		      position = idx;
		      if (lineBreaks === numLines) {
		        break;
		      }
		      if (position === 0) {
		        break;
		      }
		    }
		    var startPosition = 
		      lineBreaks < numLines ?
		      0 : 
		      position + 1;
		    return string.substring(startPosition).split("\n")
		  }

		  function objectToRules(object) {
		    var keys = Object.getOwnPropertyNames(object);
		    var result = [];
		    for (var i = 0; i < keys.length; i++) {
		      var key = keys[i];
		      var thing = object[key];
		      var rules = [].concat(thing);
		      if (key === 'include') {
		        for (var j = 0; j < rules.length; j++) {
		          result.push({include: rules[j]});
		        }
		        continue
		      }
		      var match = [];
		      rules.forEach(function(rule) {
		        if (isObject(rule)) {
		          if (match.length) result.push(ruleOptions(key, match));
		          result.push(ruleOptions(key, rule));
		          match = [];
		        } else {
		          match.push(rule);
		        }
		      });
		      if (match.length) result.push(ruleOptions(key, match));
		    }
		    return result
		  }

		  function arrayToRules(array) {
		    var result = [];
		    for (var i = 0; i < array.length; i++) {
		      var obj = array[i];
		      if (obj.include) {
		        var include = [].concat(obj.include);
		        for (var j = 0; j < include.length; j++) {
		          result.push({include: include[j]});
		        }
		        continue
		      }
		      if (!obj.type) {
		        throw new Error('Rule has no type: ' + JSON.stringify(obj))
		      }
		      result.push(ruleOptions(obj.type, obj));
		    }
		    return result
		  }

		  function ruleOptions(type, obj) {
		    if (!isObject(obj)) {
		      obj = { match: obj };
		    }
		    if (obj.include) {
		      throw new Error('Matching rules cannot also include states')
		    }

		    // nb. error and fallback imply lineBreaks
		    var options = {
		      defaultType: type,
		      lineBreaks: !!obj.error || !!obj.fallback,
		      pop: false,
		      next: null,
		      push: null,
		      error: false,
		      fallback: false,
		      value: null,
		      type: null,
		      shouldThrow: false,
		    };

		    // Avoid Object.assign(), so we support IE9+
		    for (var key in obj) {
		      if (hasOwnProperty.call(obj, key)) {
		        options[key] = obj[key];
		      }
		    }

		    // type transform cannot be a string
		    if (typeof options.type === 'string' && type !== options.type) {
		      throw new Error("Type transform cannot be a string (type '" + options.type + "' for token '" + type + "')")
		    }

		    // convert to array
		    var match = options.match;
		    options.match = Array.isArray(match) ? match : match ? [match] : [];
		    options.match.sort(function(a, b) {
		      return isRegExp(a) && isRegExp(b) ? 0
		           : isRegExp(b) ? -1 : isRegExp(a) ? 1 : b.length - a.length
		    });
		    return options
		  }

		  function toRules(spec) {
		    return Array.isArray(spec) ? arrayToRules(spec) : objectToRules(spec)
		  }

		  var defaultErrorRule = ruleOptions('error', {lineBreaks: true, shouldThrow: true});
		  function compileRules(rules, hasStates) {
		    var errorRule = null;
		    var fast = Object.create(null);
		    var fastAllowed = true;
		    var unicodeFlag = null;
		    var groups = [];
		    var parts = [];

		    // If there is a fallback rule, then disable fast matching
		    for (var i = 0; i < rules.length; i++) {
		      if (rules[i].fallback) {
		        fastAllowed = false;
		      }
		    }

		    for (var i = 0; i < rules.length; i++) {
		      var options = rules[i];

		      if (options.include) {
		        // all valid inclusions are removed by states() preprocessor
		        throw new Error('Inheritance is not allowed in stateless lexers')
		      }

		      if (options.error || options.fallback) {
		        // errorRule can only be set once
		        if (errorRule) {
		          if (!options.fallback === !errorRule.fallback) {
		            throw new Error("Multiple " + (options.fallback ? "fallback" : "error") + " rules not allowed (for token '" + options.defaultType + "')")
		          } else {
		            throw new Error("fallback and error are mutually exclusive (for token '" + options.defaultType + "')")
		          }
		        }
		        errorRule = options;
		      }

		      var match = options.match.slice();
		      if (fastAllowed) {
		        while (match.length && typeof match[0] === 'string' && match[0].length === 1) {
		          var word = match.shift();
		          fast[word.charCodeAt(0)] = options;
		        }
		      }

		      // Warn about inappropriate state-switching options
		      if (options.pop || options.push || options.next) {
		        if (!hasStates) {
		          throw new Error("State-switching options are not allowed in stateless lexers (for token '" + options.defaultType + "')")
		        }
		        if (options.fallback) {
		          throw new Error("State-switching options are not allowed on fallback tokens (for token '" + options.defaultType + "')")
		        }
		      }

		      // Only rules with a .match are included in the RegExp
		      if (match.length === 0) {
		        continue
		      }
		      fastAllowed = false;

		      groups.push(options);

		      // Check unicode flag is used everywhere or nowhere
		      for (var j = 0; j < match.length; j++) {
		        var obj = match[j];
		        if (!isRegExp(obj)) {
		          continue
		        }

		        if (unicodeFlag === null) {
		          unicodeFlag = obj.unicode;
		        } else if (unicodeFlag !== obj.unicode && options.fallback === false) {
		          throw new Error('If one rule is /u then all must be')
		        }
		      }

		      // convert to RegExp
		      var pat = reUnion(match.map(regexpOrLiteral));

		      // validate
		      var regexp = new RegExp(pat);
		      if (regexp.test("")) {
		        throw new Error("RegExp matches empty string: " + regexp)
		      }
		      var groupCount = reGroups(pat);
		      if (groupCount > 0) {
		        throw new Error("RegExp has capture groups: " + regexp + "\nUse (?: … ) instead")
		      }

		      // try and detect rules matching newlines
		      if (!options.lineBreaks && regexp.test('\n')) {
		        throw new Error('Rule should declare lineBreaks: ' + regexp)
		      }

		      // store regex
		      parts.push(reCapture(pat));
		    }


		    // If there's no fallback rule, use the sticky flag so we only look for
		    // matches at the current index.
		    //
		    // If we don't support the sticky flag, then fake it using an irrefutable
		    // match (i.e. an empty pattern).
		    var fallbackRule = errorRule && errorRule.fallback;
		    var flags = hasSticky && !fallbackRule ? 'ym' : 'gm';
		    var suffix = hasSticky || fallbackRule ? '' : '|';

		    if (unicodeFlag === true) flags += "u";
		    var combined = new RegExp(reUnion(parts) + suffix, flags);
		    return {regexp: combined, groups: groups, fast: fast, error: errorRule || defaultErrorRule}
		  }

		  function compile(rules) {
		    var result = compileRules(toRules(rules));
		    return new Lexer({start: result}, 'start')
		  }

		  function checkStateGroup(g, name, map) {
		    var state = g && (g.push || g.next);
		    if (state && !map[state]) {
		      throw new Error("Missing state '" + state + "' (in token '" + g.defaultType + "' of state '" + name + "')")
		    }
		    if (g && g.pop && +g.pop !== 1) {
		      throw new Error("pop must be 1 (in token '" + g.defaultType + "' of state '" + name + "')")
		    }
		  }
		  function compileStates(states, start) {
		    var all = states.$all ? toRules(states.$all) : [];
		    delete states.$all;

		    var keys = Object.getOwnPropertyNames(states);
		    if (!start) start = keys[0];

		    var ruleMap = Object.create(null);
		    for (var i = 0; i < keys.length; i++) {
		      var key = keys[i];
		      ruleMap[key] = toRules(states[key]).concat(all);
		    }
		    for (var i = 0; i < keys.length; i++) {
		      var key = keys[i];
		      var rules = ruleMap[key];
		      var included = Object.create(null);
		      for (var j = 0; j < rules.length; j++) {
		        var rule = rules[j];
		        if (!rule.include) continue
		        var splice = [j, 1];
		        if (rule.include !== key && !included[rule.include]) {
		          included[rule.include] = true;
		          var newRules = ruleMap[rule.include];
		          if (!newRules) {
		            throw new Error("Cannot include nonexistent state '" + rule.include + "' (in state '" + key + "')")
		          }
		          for (var k = 0; k < newRules.length; k++) {
		            var newRule = newRules[k];
		            if (rules.indexOf(newRule) !== -1) continue
		            splice.push(newRule);
		          }
		        }
		        rules.splice.apply(rules, splice);
		        j--;
		      }
		    }

		    var map = Object.create(null);
		    for (var i = 0; i < keys.length; i++) {
		      var key = keys[i];
		      map[key] = compileRules(ruleMap[key], true);
		    }

		    for (var i = 0; i < keys.length; i++) {
		      var name = keys[i];
		      var state = map[name];
		      var groups = state.groups;
		      for (var j = 0; j < groups.length; j++) {
		        checkStateGroup(groups[j], name, map);
		      }
		      var fastKeys = Object.getOwnPropertyNames(state.fast);
		      for (var j = 0; j < fastKeys.length; j++) {
		        checkStateGroup(state.fast[fastKeys[j]], name, map);
		      }
		    }

		    return new Lexer(map, start)
		  }

		  function keywordTransform(map) {

		    // Use a JavaScript Map to map keywords to their corresponding token type
		    // unless Map is unsupported, then fall back to using an Object:
		    var isMap = typeof Map !== 'undefined';
		    var reverseMap = isMap ? new Map : Object.create(null);

		    var types = Object.getOwnPropertyNames(map);
		    for (var i = 0; i < types.length; i++) {
		      var tokenType = types[i];
		      var item = map[tokenType];
		      var keywordList = Array.isArray(item) ? item : [item];
		      keywordList.forEach(function(keyword) {
		        if (typeof keyword !== 'string') {
		          throw new Error("keyword must be string (in keyword '" + tokenType + "')")
		        }
		        if (isMap) {
		          reverseMap.set(keyword, tokenType);
		        } else {
		          reverseMap[keyword] = tokenType;
		        }
		      });
		    }
		    return function(k) {
		      return isMap ? reverseMap.get(k) : reverseMap[k]
		    }
		  }

		  /***************************************************************************/

		  var Lexer = function(states, state) {
		    this.startState = state;
		    this.states = states;
		    this.buffer = '';
		    this.stack = [];
		    this.reset();
		  };

		  Lexer.prototype.reset = function(data, info) {
		    this.buffer = data || '';
		    this.index = 0;
		    this.line = info ? info.line : 1;
		    this.col = info ? info.col : 1;
		    this.queuedToken = info ? info.queuedToken : null;
		    this.queuedText = info ? info.queuedText: "";
		    this.queuedThrow = info ? info.queuedThrow : null;
		    this.setState(info ? info.state : this.startState);
		    this.stack = info && info.stack ? info.stack.slice() : [];
		    return this
		  };

		  Lexer.prototype.save = function() {
		    return {
		      line: this.line,
		      col: this.col,
		      state: this.state,
		      stack: this.stack.slice(),
		      queuedToken: this.queuedToken,
		      queuedText: this.queuedText,
		      queuedThrow: this.queuedThrow,
		    }
		  };

		  Lexer.prototype.setState = function(state) {
		    if (!state || this.state === state) return
		    this.state = state;
		    var info = this.states[state];
		    this.groups = info.groups;
		    this.error = info.error;
		    this.re = info.regexp;
		    this.fast = info.fast;
		  };

		  Lexer.prototype.popState = function() {
		    this.setState(this.stack.pop());
		  };

		  Lexer.prototype.pushState = function(state) {
		    this.stack.push(this.state);
		    this.setState(state);
		  };

		  var eat = hasSticky ? function(re, buffer) { // assume re is /y
		    return re.exec(buffer)
		  } : function(re, buffer) { // assume re is /g
		    var match = re.exec(buffer);
		    // will always match, since we used the |(?:) trick
		    if (match[0].length === 0) {
		      return null
		    }
		    return match
		  };

		  Lexer.prototype._getGroup = function(match) {
		    var groupCount = this.groups.length;
		    for (var i = 0; i < groupCount; i++) {
		      if (match[i + 1] !== undefined) {
		        return this.groups[i]
		      }
		    }
		    throw new Error('Cannot find token type for matched text')
		  };

		  function tokenToString() {
		    return this.value
		  }

		  Lexer.prototype.next = function() {
		    var index = this.index;

		    // If a fallback token matched, we don't need to re-run the RegExp
		    if (this.queuedGroup) {
		      var token = this._token(this.queuedGroup, this.queuedText, index);
		      this.queuedGroup = null;
		      this.queuedText = "";
		      return token
		    }

		    var buffer = this.buffer;
		    if (index === buffer.length) {
		      return // EOF
		    }

		    // Fast matching for single characters
		    var group = this.fast[buffer.charCodeAt(index)];
		    if (group) {
		      return this._token(group, buffer.charAt(index), index)
		    }

		    // Execute RegExp
		    var re = this.re;
		    re.lastIndex = index;
		    var match = eat(re, buffer);

		    // Error tokens match the remaining buffer
		    var error = this.error;
		    if (match == null) {
		      return this._token(error, buffer.slice(index, buffer.length), index)
		    }

		    var group = this._getGroup(match);
		    var text = match[0];

		    if (error.fallback && match.index !== index) {
		      this.queuedGroup = group;
		      this.queuedText = text;

		      // Fallback tokens contain the unmatched portion of the buffer
		      return this._token(error, buffer.slice(index, match.index), index)
		    }

		    return this._token(group, text, index)
		  };

		  Lexer.prototype._token = function(group, text, offset) {
		    // count line breaks
		    var lineBreaks = 0;
		    if (group.lineBreaks) {
		      var matchNL = /\n/g;
		      var nl = 1;
		      if (text === '\n') {
		        lineBreaks = 1;
		      } else {
		        while (matchNL.exec(text)) { lineBreaks++; nl = matchNL.lastIndex; }
		      }
		    }

		    var token = {
		      type: (typeof group.type === 'function' && group.type(text)) || group.defaultType,
		      value: typeof group.value === 'function' ? group.value(text) : text,
		      text: text,
		      toString: tokenToString,
		      offset: offset,
		      lineBreaks: lineBreaks,
		      line: this.line,
		      col: this.col,
		    };
		    // nb. adding more props to token object will make V8 sad!

		    var size = text.length;
		    this.index += size;
		    this.line += lineBreaks;
		    if (lineBreaks !== 0) {
		      this.col = size - nl + 1;
		    } else {
		      this.col += size;
		    }

		    // throw, if no rule with {error: true}
		    if (group.shouldThrow) {
		      var err = new Error(this.formatError(token, "invalid syntax"));
		      throw err;
		    }

		    if (group.pop) this.popState();
		    else if (group.push) this.pushState(group.push);
		    else if (group.next) this.setState(group.next);

		    return token
		  };

		  if (typeof Symbol !== 'undefined' && Symbol.iterator) {
		    var LexerIterator = function(lexer) {
		      this.lexer = lexer;
		    };

		    LexerIterator.prototype.next = function() {
		      var token = this.lexer.next();
		      return {value: token, done: !token}
		    };

		    LexerIterator.prototype[Symbol.iterator] = function() {
		      return this
		    };

		    Lexer.prototype[Symbol.iterator] = function() {
		      return new LexerIterator(this)
		    };
		  }

		  Lexer.prototype.formatError = function(token, message) {
		    if (token == null) {
		      // An undefined token indicates EOF
		      var text = this.buffer.slice(this.index);
		      var token = {
		        text: text,
		        offset: this.index,
		        lineBreaks: text.indexOf('\n') === -1 ? 0 : 1,
		        line: this.line,
		        col: this.col,
		      };
		    }
		    
		    var numLinesAround = 2;
		    var firstDisplayedLine = Math.max(token.line - numLinesAround, 1);
		    var lastDisplayedLine = token.line + numLinesAround;
		    var lastLineDigits = String(lastDisplayedLine).length;
		    var displayedLines = lastNLines(
		        this.buffer, 
		        (this.line - token.line) + numLinesAround + 1
		      )
		      .slice(0, 5);
		    var errorLines = [];
		    errorLines.push(message + " at line " + token.line + " col " + token.col + ":");
		    errorLines.push("");
		    for (var i = 0; i < displayedLines.length; i++) {
		      var line = displayedLines[i];
		      var lineNo = firstDisplayedLine + i;
		      errorLines.push(pad(String(lineNo), lastLineDigits) + "  " + line);
		      if (lineNo === token.line) {
		        errorLines.push(pad("", lastLineDigits + token.col + 1) + "^");
		      }
		    }
		    return errorLines.join("\n")
		  };

		  Lexer.prototype.clone = function() {
		    return new Lexer(this.states, this.state)
		  };

		  Lexer.prototype.has = function(tokenType) {
		    return true
		  };


		  return {
		    compile: compile,
		    states: compileStates,
		    error: Object.freeze({error: true}),
		    fallback: Object.freeze({fallback: true}),
		    keywords: keywordTransform,
		  }

		})); 
	} (moo$2));
	return moo$2.exports;
}

var mooExports = requireMoo();
var moo = /*@__PURE__*/getDefaultExportFromCjs(mooExports);

/**
 * Indentation errors for the Moo-based lexer.
 * Messages follow CPython wording for familiarity.
 */
class UnexpectedIndentError extends SyntaxError {
    constructor(line, col) {
        super(`IndentationError at line ${line}: unexpected indent`);
        this.line = line;
        this.col = col;
        this.name = "UnexpectedIndentError";
    }
}
class InconsistentDedentError extends SyntaxError {
    constructor(line, col) {
        super(`IndentationError at line ${line}: unindent does not match any outer indentation level`);
        this.line = line;
        this.col = col;
        this.name = "InconsistentDedentError";
    }
}

/**
 * Two-pass Python lexer: Moo tokenization → indent/dedent injection.
 *
 * Pass 1: moo.compile() produces a flat token stream.
 * Pass 2: processTokens() strips whitespace/comments, tracks enclosure
 *         depth, and emits synthetic indent/dedent tokens.
 */
// ── Moo configuration (unchanged) ──────────────────────────────────────────
const kwType = moo.keywords({
    kw_def: "def",
    kw_if: "if",
    kw_elif: "elif",
    kw_else: "else",
    kw_while: "while",
    kw_for: "for",
    kw_in: "in",
    kw_return: "return",
    kw_pass: "pass",
    kw_break: "break",
    kw_continue: "continue",
    kw_and: "and",
    kw_or: "or",
    kw_not: "not",
    kw_is: "is",
    kw_lambda: "lambda",
    kw_from: "from",
    kw_import: "import",
    kw_global: "global",
    kw_nonlocal: "nonlocal",
    kw_as: "as",
    kw_assert: "assert",
    kw_True: "True",
    kw_False: "False",
    kw_None: "None",
    // Forbidden keywords (surface as their own type so callers can error nicely)
    forbidden_async: "async",
    forbidden_await: "await",
    forbidden_yield: "yield",
    forbidden_with: "with",
    forbidden_del: "del",
    forbidden_try: "try",
    forbidden_except: "except",
    forbidden_finally: "finally",
    forbidden_raise: "raise",
    forbidden_class: "class",
});
const mooLexer = moo.compile({
    newline: { match: /\n/, lineBreaks: true },
    ws: /[ \t]+/,
    comment: /#[^\n]*/,
    number_complex: /(?:\d+\.?\d*|\.\d+)[jJ]/,
    number_float: /(?:\d+\.\d*|\.\d+)(?:[eE][+-]?\d+)?/,
    number_hex: /0[xX][0-9a-fA-F]+/,
    number_oct: /0[oO][0-7]+/,
    number_bin: /0[bB][01]+/,
    number_int: /\d+/,
    string_triple_double: /"""(?:[^\\]|\\.)*?"""/,
    string_triple_single: /'''(?:[^\\]|\\.)*?'''/,
    string_double: /"(?:[^"\\]|\\.)*"/,
    string_single: /'(?:[^'\\]|\\.)*'/,
    doublestar: "**",
    doubleslash: "//",
    doubleequal: "==",
    notequal: "!=",
    lessequal: "<=",
    greaterequal: ">=",
    doublecolon: "::",
    ellipsis: "...",
    lparen: "(",
    rparen: ")",
    lsqb: "[",
    rsqb: "]",
    lbrace: "{",
    rbrace: "}",
    colon: ":",
    comma: ",",
    plus: "+",
    minus: "-",
    star: "*",
    slash: "/",
    percent: "%",
    less: "<",
    greater: ">",
    equal: "=",
    dot: ".",
    semi: ";",
    name: { match: /[a-zA-Z_][a-zA-Z0-9_]*/, type: kwType },
});
// ── Openers / closers for enclosure tracking ───────────────────────────────
const OPENERS = new Set(["(", "[", "{"]);
const CLOSERS = new Set([")", "]", "}"]);
// ── Synthetic token factory ────────────────────────────────────────────────
function syntheticToken(type, ref) {
    return {
        type,
        value: "",
        text: "",
        toString: ref.toString,
        offset: ref.offset,
        lineBreaks: 0,
        line: ref.line,
        col: ref.col,
    };
}
// ── Pass 2: processTokens ──────────────────────────────────────────────────
function processTokens(raw) {
    const out = [];
    const indentStack = [""];
    let enclosureDepth = 0;
    let i = 0;
    // Reject leading indentation (whitespace before the first real token
    // with no preceding newline).
    {
        let j = 0;
        while (j < raw.length && (raw[j].type === "comment" || raw[j].type === "newline"))
            j++;
        if (j < raw.length && raw[j].type === "ws") {
            throw new UnexpectedIndentError(raw[j].line, raw[j].col);
        }
    }
    while (i < raw.length) {
        const tok = raw[i];
        // Always skip whitespace and comments
        if (tok.type === "ws" || tok.type === "comment") {
            i++;
            continue;
        }
        // Track enclosure depth
        if (OPENERS.has(tok.text)) {
            enclosureDepth++;
            out.push(tok);
            i++;
            continue;
        }
        if (CLOSERS.has(tok.text)) {
            enclosureDepth--;
            out.push(tok);
            i++;
            continue;
        }
        // Inside enclosures: skip newlines
        if (tok.type === "newline" && enclosureDepth > 0) {
            i++;
            continue;
        }
        // Newline outside enclosures: emit newline then handle indentation
        if (tok.type === "newline") {
            out.push(tok);
            i++;
            // Consume blank lines, comments, and whitespace to find the next
            // real token's indentation level.
            let indent = "";
            while (i < raw.length) {
                const next = raw[i];
                if (next.type === "ws") {
                    indent = next.text;
                    i++;
                    continue;
                }
                if (next.type === "comment") {
                    i++;
                    // After a comment there must be a newline (or EOF).
                    // Skip the newline too, then reset indent for the next line.
                    if (i < raw.length && raw[i].type === "newline") {
                        i++;
                    }
                    indent = "";
                    continue;
                }
                if (next.type === "newline") {
                    // Blank line — skip it, reset indent
                    i++;
                    indent = "";
                    continue;
                }
                // Found a real token
                break;
            }
            // If we've hit EOF after newlines, just emit remaining dedents
            if (i >= raw.length) {
                const ref = raw[raw.length - 1];
                while (indentStack.length > 1) {
                    indentStack.pop();
                    out.push(syntheticToken("dedent", ref));
                }
                continue;
            }
            const currentIndent = indentStack[indentStack.length - 1];
            if (indent === currentIndent) ;
            else if (indent.startsWith(currentIndent) && indent.length > currentIndent.length) {
                // Deeper indent
                indentStack.push(indent);
                out.push(syntheticToken("indent", raw[i]));
            }
            else {
                // Dedent — pop until we find a matching level
                while (indentStack.length > 1 && indentStack[indentStack.length - 1] !== indent) {
                    indentStack.pop();
                    out.push(syntheticToken("dedent", raw[i]));
                }
                if (indentStack[indentStack.length - 1] !== indent) {
                    throw new InconsistentDedentError(raw[i].line, raw[i].col);
                }
            }
            continue;
        }
        // Everything else: emit as-is
        out.push(tok);
        i++;
    }
    // EOF: emit remaining dedents
    if (indentStack.length > 1) {
        const ref = raw.length > 0
            ? raw[raw.length - 1]
            : {
                toString: () => "",
                offset: 0,
                line: 1,
                col: 1,
            };
        while (indentStack.length > 1) {
            indentStack.pop();
            out.push(syntheticToken("dedent", ref));
        }
    }
    return out;
}
class PythonLexer {
    constructor() {
        this.tokens = [];
        this.pos = 0;
    }
    reset(data, state) {
        if (state && "pos" in state) {
            this.pos = state.pos;
        }
        else if (data !== undefined) {
            mooLexer.reset(data);
            const raw = [];
            let tok;
            while ((tok = mooLexer.next())) {
                raw.push(tok);
            }
            this.tokens = processTokens(raw);
            this.pos = 0;
        }
        return this;
    }
    next() {
        if (this.pos >= this.tokens.length)
            return undefined;
        return this.tokens[this.pos++];
    }
    save() {
        return { pos: this.pos };
    }
    has(name) {
        return name === "indent" || name === "dedent" || mooLexer.has(name);
    }
    formatError(token, message) {
        return mooLexer.formatError(token, message);
    }
    pushState(state) {
        mooLexer.pushState(state);
    }
    popState() {
        mooLexer.popState();
    }
    setState(state) {
        mooLexer.setState(state);
    }
    [Symbol.iterator]() {
        return {
            next: () => {
                const token = this.next();
                return { value: token, done: !token };
            },
        };
    }
}
const pythonLexer = new PythonLexer();

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

var DEFAULT_CONFIG = {
  // minimum relative difference between two compared values,
  // used by all comparison functions
  relTol: 1e-12,
  // minimum absolute difference between two compared values,
  // used by all comparison functions
  absTol: 1e-15,
  // type of default matrix output. Choose 'matrix' (default) or 'array'
  matrix: 'Matrix',
  // type of default number output. Choose 'number' (default) 'BigNumber', 'bigint', or 'Fraction'
  number: 'number',
  // type of fallback used for config { number: 'bigint' } when a value cannot be represented
  // in the configured numeric type. Choose 'number' (default) or 'BigNumber'.
  numberFallback: 'number',
  // number of significant digits in BigNumbers
  precision: 64,
  // predictable output type of functions. When true, output type depends only
  // on the input types. When false (default), output type can vary depending
  // on input values. For example `math.sqrt(-4)` returns `complex('2i')` when
  // predictable is false, and returns `NaN` when true.
  predictable: false,
  // random seed for seeded pseudo random number generation
  // null = randomly seed
  randomSeed: null
};

/**
 * Get a property of a plain object
 * Throws an error in case the object is not a plain object or the
 * property is not defined on the object itself
 * @param {Object} object
 * @param {string} prop
 * @return {*} Returns the property value when safe
 */
function getSafeProperty(object, prop) {
  // only allow getting safe properties of a plain object
  if (isSafeProperty(object, prop)) {
    return object[prop];
  }
  if (typeof object[prop] === 'function' && isSafeMethod(object, prop)) {
    throw new Error('Cannot access method "' + prop + '" as a property');
  }
  throw new Error('No access to property "' + prop + '"');
}

/**
 * Set a property on a plain object.
 * Throws an error in case the object is not a plain object or the
 * property would override an inherited property like .constructor or .toString
 * @param {Object} object
 * @param {string} prop
 * @param {*} value
 * @return {*} Returns the value
 */
// TODO: merge this function into access.js?
function setSafeProperty(object, prop, value) {
  // only allow setting safe properties of a plain object
  if (isSafeProperty(object, prop)) {
    object[prop] = value;
    return value;
  }
  throw new Error('No access to property "' + prop + '"');
}

/**
 * Test whether a property is safe to use on an object or Array.
 * For example .toString and .constructor are not safe
 * @param {Object | Array} object
 * @param {string} prop
 * @return {boolean} Returns true when safe
 */
function isSafeProperty(object, prop) {
  if (!isPlainObject(object) && !Array.isArray(object)) {
    return false;
  }
  // SAFE: whitelisted
  // e.g length
  if (hasOwnProperty(safeNativeProperties, prop)) {
    return true;
  }
  // UNSAFE: inherited from Object prototype
  // e.g constructor
  if (prop in Object.prototype) {
    // 'in' is used instead of hasOwnProperty for nodejs v0.10
    // which is inconsistent on root prototypes. It is safe
    // here because Object.prototype is a root object
    return false;
  }
  // UNSAFE: inherited from Function prototype
  // e.g call, apply
  if (prop in Function.prototype) {
    // 'in' is used instead of hasOwnProperty for nodejs v0.10
    // which is inconsistent on root prototypes. It is safe
    // here because Function.prototype is a root object
    return false;
  }
  return true;
}

/**
 * Check whether a method is safe.
 * Throws an error when that's not the case (for example for `constructor`).
 * @param {Object} object
 * @param {string} method
 * @return {boolean} Returns true when safe, false otherwise
 */
function isSafeMethod(object, method) {
  if (object === null || object === undefined || typeof object[method] !== 'function') {
    return false;
  }
  // UNSAFE: ghosted
  // e.g overridden toString
  // Note that IE10 doesn't support __proto__ and we can't do this check there.
  if (hasOwnProperty(object, method) && Object.getPrototypeOf && method in Object.getPrototypeOf(object)) {
    return false;
  }
  // SAFE: whitelisted
  // e.g toString
  if (hasOwnProperty(safeNativeMethods, method)) {
    return true;
  }
  // UNSAFE: inherited from Object prototype
  // e.g constructor
  if (method in Object.prototype) {
    // 'in' is used instead of hasOwnProperty for nodejs v0.10
    // which is inconsistent on root prototypes. It is safe
    // here because Object.prototype is a root object
    return false;
  }
  // UNSAFE: inherited from Function prototype
  // e.g call, apply
  if (method in Function.prototype) {
    // 'in' is used instead of hasOwnProperty for nodejs v0.10
    // which is inconsistent on root prototypes. It is safe
    // here because Function.prototype is a root object
    return false;
  }
  return true;
}
function isPlainObject(object) {
  return typeof object === 'object' && object && object.constructor === Object;
}
var safeNativeProperties = {
  length: true,
  name: true
};
var safeNativeMethods = {
  toString: true,
  valueOf: true,
  toLocaleString: true
};

/**
 * A map facade on a bare object.
 *
 * The small number of methods needed to implement a scope,
 * forwarding on to the SafeProperty functions. Over time, the codebase
 * will stop using this method, as all objects will be Maps, rather than
 * more security prone objects.
 */
class ObjectWrappingMap {
  constructor(object) {
    this.wrappedObject = object;
    this[Symbol.iterator] = this.entries;
  }
  keys() {
    return Object.keys(this.wrappedObject).filter(key => this.has(key)).values();
  }
  get(key) {
    return getSafeProperty(this.wrappedObject, key);
  }
  set(key, value) {
    setSafeProperty(this.wrappedObject, key, value);
    return this;
  }
  has(key) {
    return isSafeProperty(this.wrappedObject, key) && key in this.wrappedObject;
  }
  entries() {
    return mapIterator(this.keys(), key => [key, this.get(key)]);
  }
  forEach(callback) {
    for (var key of this.keys()) {
      callback(this.get(key), key, this);
    }
  }
  delete(key) {
    if (isSafeProperty(this.wrappedObject, key)) {
      delete this.wrappedObject[key];
    }
  }
  clear() {
    for (var key of this.keys()) {
      this.delete(key);
    }
  }
  get size() {
    return Object.keys(this.wrappedObject).length;
  }
}

/**
 * Create a new iterator that maps over the provided iterator, applying a mapping function to each item
 */
function mapIterator(it, callback) {
  return {
    next: () => {
      var n = it.next();
      return n.done ? n : {
        value: callback(n.value),
        done: false
      };
    }
  };
}

// type checks for all known types
//
// note that:
//
// - check by duck-typing on a property like `isUnit`, instead of checking instanceof.
//   instanceof cannot be used because that would not allow to pass data from
//   one instance of math.js to another since each has it's own instance of Unit.
// - check the `isUnit` property via the constructor, so there will be no
//   matches for "fake" instances like plain objects with a property `isUnit`.
//   That is important for security reasons.
// - It must not be possible to override the type checks used internally,
//   for security reasons, so these functions are not exposed in the expression
//   parser.

function isNumber(x) {
  return typeof x === 'number';
}
function isBigNumber(x) {
  if (!x || typeof x !== 'object' || typeof x.constructor !== 'function') {
    return false;
  }
  if (x.isBigNumber === true && typeof x.constructor.prototype === 'object' && x.constructor.prototype.isBigNumber === true) {
    return true;
  }
  if (typeof x.constructor.isDecimal === 'function' && x.constructor.isDecimal(x) === true) {
    return true;
  }
  return false;
}
function isBigInt(x) {
  return typeof x === 'bigint';
}
function isComplex(x) {
  return x && typeof x === 'object' && Object.getPrototypeOf(x).isComplex === true || false;
}
function isFraction(x) {
  return x && typeof x === 'object' && Object.getPrototypeOf(x).isFraction === true || false;
}
function isUnit(x) {
  return x && x.constructor.prototype.isUnit === true || false;
}
function isString(x) {
  return typeof x === 'string';
}
var isArray = Array.isArray;
function isMatrix(x) {
  return x && x.constructor.prototype.isMatrix === true || false;
}

/**
 * Test whether a value is a collection: an Array or Matrix
 * @param {*} x
 * @returns {boolean} isCollection
 */
function isCollection(x) {
  return Array.isArray(x) || isMatrix(x);
}
function isDenseMatrix(x) {
  return x && x.isDenseMatrix && x.constructor.prototype.isMatrix === true || false;
}
function isSparseMatrix(x) {
  return x && x.isSparseMatrix && x.constructor.prototype.isMatrix === true || false;
}
function isRange(x) {
  return x && x.constructor.prototype.isRange === true || false;
}
function isIndex(x) {
  return x && x.constructor.prototype.isIndex === true || false;
}
function isBoolean(x) {
  return typeof x === 'boolean';
}
function isResultSet(x) {
  return x && x.constructor.prototype.isResultSet === true || false;
}
function isHelp(x) {
  return x && x.constructor.prototype.isHelp === true || false;
}
function isFunction(x) {
  return typeof x === 'function';
}
function isDate(x) {
  return x instanceof Date;
}
function isRegExp(x) {
  return x instanceof RegExp;
}
function isObject(x) {
  return !!(x && typeof x === 'object' && x.constructor === Object && !isComplex(x) && !isFraction(x));
}

/**
 * Returns `true` if the passed object appears to be a Map (i.e. duck typing).
 *
 * Methods looked for are `get`, `set`, `keys` and `has`.
 *
 * @param {Map | object} object
 * @returns
 */
function isMap(object) {
  // We can use the fast instanceof, or a slower duck typing check.
  // The duck typing method needs to cover enough methods to not be confused with DenseMatrix.
  if (!object) {
    return false;
  }
  return object instanceof Map || object instanceof ObjectWrappingMap || typeof object.set === 'function' && typeof object.get === 'function' && typeof object.keys === 'function' && typeof object.has === 'function';
}
function isNull(x) {
  return x === null;
}
function isUndefined(x) {
  return x === undefined;
}
function isAccessorNode(x) {
  return x && x.isAccessorNode === true && x.constructor.prototype.isNode === true || false;
}
function isArrayNode(x) {
  return x && x.isArrayNode === true && x.constructor.prototype.isNode === true || false;
}
function isAssignmentNode(x) {
  return x && x.isAssignmentNode === true && x.constructor.prototype.isNode === true || false;
}
function isBlockNode(x) {
  return x && x.isBlockNode === true && x.constructor.prototype.isNode === true || false;
}
function isConditionalNode(x) {
  return x && x.isConditionalNode === true && x.constructor.prototype.isNode === true || false;
}
function isConstantNode(x) {
  return x && x.isConstantNode === true && x.constructor.prototype.isNode === true || false;
}
function isFunctionAssignmentNode(x) {
  return x && x.isFunctionAssignmentNode === true && x.constructor.prototype.isNode === true || false;
}
function isFunctionNode(x) {
  return x && x.isFunctionNode === true && x.constructor.prototype.isNode === true || false;
}
function isIndexNode(x) {
  return x && x.isIndexNode === true && x.constructor.prototype.isNode === true || false;
}
function isNode(x) {
  return x && x.isNode === true && x.constructor.prototype.isNode === true || false;
}
function isObjectNode(x) {
  return x && x.isObjectNode === true && x.constructor.prototype.isNode === true || false;
}
function isOperatorNode(x) {
  return x && x.isOperatorNode === true && x.constructor.prototype.isNode === true || false;
}
function isParenthesisNode(x) {
  return x && x.isParenthesisNode === true && x.constructor.prototype.isNode === true || false;
}
function isRangeNode(x) {
  return x && x.isRangeNode === true && x.constructor.prototype.isNode === true || false;
}
function isRelationalNode(x) {
  return x && x.isRelationalNode === true && x.constructor.prototype.isNode === true || false;
}
function isSymbolNode(x) {
  return x && x.isSymbolNode === true && x.constructor.prototype.isNode === true || false;
}
function isChain(x) {
  return x && x.constructor.prototype.isChain === true || false;
}
function typeOf(x) {
  var t = typeof x;
  if (t === 'object') {
    if (x === null) return 'null';
    if (isBigNumber(x)) return 'BigNumber'; // Special: weird mashup with Decimal
    if (x.constructor && x.constructor.name) return x.constructor.name;
    return 'Object'; // just in case
  }
  return t; // can be 'string', 'number', 'boolean', 'function', 'bigint', ...
}

/**
 * Clone an object
 *
 *     clone(x)
 *
 * Can clone any primitive type, array, and object.
 * If x has a function clone, this function will be invoked to clone the object.
 *
 * @param {*} x
 * @return {*} clone
 */
function clone$2(x) {
  var type = typeof x;

  // immutable primitive types
  if (type === 'number' || type === 'bigint' || type === 'string' || type === 'boolean' || x === null || x === undefined) {
    return x;
  }

  // use clone function of the object when available
  if (typeof x.clone === 'function') {
    return x.clone();
  }

  // array
  if (Array.isArray(x)) {
    return x.map(function (value) {
      return clone$2(value);
    });
  }
  if (x instanceof Date) return new Date(x.valueOf());
  if (isBigNumber(x)) return x; // bignumbers are immutable

  // object
  if (isObject(x)) {
    return mapObject(x, clone$2);
  }
  if (type === 'function') {
    // we assume that the function is immutable
    return x;
  }
  throw new TypeError("Cannot clone: unknown type of value (value: ".concat(x, ")"));
}

/**
 * Apply map to all properties of an object
 * @param {Object} object
 * @param {function} callback
 * @return {Object} Returns a copy of the object with mapped properties
 */
function mapObject(object, callback) {
  var clone = {};
  for (var key in object) {
    if (hasOwnProperty(object, key)) {
      clone[key] = callback(object[key]);
    }
  }
  return clone;
}

/**
 * Deep test equality of all fields in two pairs of arrays or objects.
 * Compares values and functions strictly (ie. 2 is not the same as '2').
 * @param {Array | Object} a
 * @param {Array | Object} b
 * @returns {boolean}
 */
function deepStrictEqual(a, b) {
  var prop, i, len;
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (i = 0, len = a.length; i < len; i++) {
      if (!deepStrictEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  } else if (typeof a === 'function') {
    return a === b;
  } else if (a instanceof Object) {
    if (Array.isArray(b) || !(b instanceof Object)) {
      return false;
    }
    for (prop in a) {
      // noinspection JSUnfilteredForInLoop
      if (!(prop in b) || !deepStrictEqual(a[prop], b[prop])) {
        return false;
      }
    }
    for (prop in b) {
      // noinspection JSUnfilteredForInLoop
      if (!(prop in a)) {
        return false;
      }
    }
    return true;
  } else {
    return a === b;
  }
}

/**
 * A safe hasOwnProperty
 * @param {Object} object
 * @param {string} property
 */
function hasOwnProperty(object, property) {
  return object && Object.hasOwnProperty.call(object, property);
}

/**
 * Shallow version of pick, creating an object composed of the picked object properties
 * but not for nested properties
 * @param {Object} object
 * @param {string[]} properties
 * @return {Object}
 */
function pickShallow(object, properties) {
  var copy = {};
  for (var i = 0; i < properties.length; i++) {
    var key = properties[i];
    var value = object[key];
    if (value !== undefined) {
      copy[key] = value;
    }
  }
  return copy;
}

var MATRIX_OPTIONS = ['Matrix', 'Array']; // valid values for option matrix
var NUMBER_OPTIONS = ['number', 'BigNumber', 'bigint', 'Fraction']; // valid values for option number

// create a read-only version of config
var config$1 = function config(options) {
  if (options) {
    throw new Error('The global config is readonly. \n' + 'Please create a mathjs instance if you want to change the default configuration. \n' + 'Example:\n' + '\n' + '  import { create, all } from \'mathjs\';\n' + '  const mathjs = create(all);\n' + '  mathjs.config({ number: \'BigNumber\' });\n');
  }
  return Object.freeze(DEFAULT_CONFIG);
};
_extends(config$1, DEFAULT_CONFIG, {
  MATRIX_OPTIONS,
  NUMBER_OPTIONS
});

var typedFunction$2 = {exports: {}};

var typedFunction$1 = typedFunction$2.exports;

var hasRequiredTypedFunction;

function requireTypedFunction () {
	if (hasRequiredTypedFunction) return typedFunction$2.exports;
	hasRequiredTypedFunction = 1;
	(function (module, exports$1) {
		(function (global, factory) {
		  module.exports = factory() ;
		})(typedFunction$1, (function () {
		  function ok() {
		    return true;
		  }
		  function notOk() {
		    return false;
		  }
		  function undef() {
		    return undefined;
		  }
		  const NOT_TYPED_FUNCTION = 'Argument is not a typed-function.';

		  /**
		   * @typedef {{
		   *   params: Param[],
		   *   fn: function,
		   *   test: function,
		   *   implementation: function
		   * }} Signature
		   *
		   * @typedef {{
		   *   types: Type[],
		   *   hasAny: boolean,
		   *   hasConversion: boolean,
		   *   restParam: boolean
		   * }} Param
		   *
		   * @typedef {{
		   *   name: string,
		   *   typeIndex: number,
		   *   test: function,
		   *   isAny: boolean,
		   *   conversion?: ConversionDef,
		   *   conversionIndex: number,
		   * }} Type
		   *
		   * @typedef {{
		   *   from: string,
		   *   to: string,
		   *   convert: function (*) : *
		   * }} ConversionDef
		   *
		   * @typedef {{
		   *   name: string,
		   *   test: function(*) : boolean,
		   *   isAny?: boolean
		   * }} TypeDef
		   */

		  /**
		   * @returns {() => function}
		   */
		  function create() {
		    // data type tests

		    /**
		     * Returns true if the argument is a non-null "plain" object
		     */
		    function isPlainObject(x) {
		      return typeof x === 'object' && x !== null && x.constructor === Object;
		    }
		    const _types = [{
		      name: 'number',
		      test: function (x) {
		        return typeof x === 'number';
		      }
		    }, {
		      name: 'string',
		      test: function (x) {
		        return typeof x === 'string';
		      }
		    }, {
		      name: 'boolean',
		      test: function (x) {
		        return typeof x === 'boolean';
		      }
		    }, {
		      name: 'Function',
		      test: function (x) {
		        return typeof x === 'function';
		      }
		    }, {
		      name: 'Array',
		      test: Array.isArray
		    }, {
		      name: 'Date',
		      test: function (x) {
		        return x instanceof Date;
		      }
		    }, {
		      name: 'RegExp',
		      test: function (x) {
		        return x instanceof RegExp;
		      }
		    }, {
		      name: 'Object',
		      test: isPlainObject
		    }, {
		      name: 'null',
		      test: function (x) {
		        return x === null;
		      }
		    }, {
		      name: 'undefined',
		      test: function (x) {
		        return x === undefined;
		      }
		    }];
		    const anyType = {
		      name: 'any',
		      test: ok,
		      isAny: true
		    };

		    // Data structures to track the types. As these are local variables in
		    // create(), each typed universe will get its own copy, but the variables
		    // will only be accessible through the (closures of the) functions supplied
		    // as properties of the typed object, not directly.
		    // These will be initialized in clear() below
		    let typeMap; // primary store of all types
		    let typeList; // Array of just type names, for the sake of ordering

		    // And similar data structures for the type conversions:
		    let nConversions = 0;
		    // the actual conversions are stored on a property of the destination types

		    // This is a temporary object, will be replaced with a function at the end
		    let typed = {
		      createCount: 0
		    };

		    /**
		     * Takes a type name and returns the corresponding official type object
		     * for that type.
		     *
		     * @param {string} typeName
		     * @returns {TypeDef} type
		     */
		    function findType(typeName) {
		      const type = typeMap.get(typeName);
		      if (type) {
		        return type;
		      }
		      // Remainder is error handling
		      let message = 'Unknown type "' + typeName + '"';
		      const name = typeName.toLowerCase();
		      let otherName;
		      for (otherName of typeList) {
		        if (otherName.toLowerCase() === name) {
		          message += '. Did you mean "' + otherName + '" ?';
		          break;
		        }
		      }
		      throw new TypeError(message);
		    }

		    /**
		     * Adds an array `types` of type definitions to this typed instance.
		     * Each type definition should be an object with properties:
		     * 'name' - a string giving the name of the type; 'test' - function
		     * returning a boolean that tests membership in the type; and optionally
		     * 'isAny' - true only for the 'any' type.
		     *
		     * The second optional argument, `before`, gives the name of a type that
		     * these types should be added before. The new types are added in the
		     * order specified.
		     * @param {TypeDef[]} types
		     * @param {string | boolean} [beforeSpec='any'] before
		     */
		    function addTypes(types) {
		      let beforeSpec = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'any';
		      const beforeIndex = beforeSpec ? findType(beforeSpec).index : typeList.length;
		      const newTypes = [];
		      for (let i = 0; i < types.length; ++i) {
		        if (!types[i] || typeof types[i].name !== 'string' || typeof types[i].test !== 'function') {
		          throw new TypeError('Object with properties {name: string, test: function} expected');
		        }
		        const typeName = types[i].name;
		        if (typeMap.has(typeName)) {
		          throw new TypeError('Duplicate type name "' + typeName + '"');
		        }
		        newTypes.push(typeName);
		        typeMap.set(typeName, {
		          name: typeName,
		          test: types[i].test,
		          isAny: types[i].isAny,
		          index: beforeIndex + i,
		          conversionsTo: [] // Newly added type can't have any conversions to it
		        });
		      }
		      // update the typeList
		      const affectedTypes = typeList.slice(beforeIndex);
		      typeList = typeList.slice(0, beforeIndex).concat(newTypes).concat(affectedTypes);
		      // Fix the indices
		      for (let i = beforeIndex + newTypes.length; i < typeList.length; ++i) {
		        typeMap.get(typeList[i]).index = i;
		      }
		    }

		    /**
		     * Removes all types and conversions from this typed instance.
		     * May cause previously constructed typed-functions to throw
		     * strange errors when they are called with types that do not
		     * match any of their signatures.
		     */
		    function clear() {
		      typeMap = new Map();
		      typeList = [];
		      nConversions = 0;
		      addTypes([anyType], false);
		    }

		    // initialize the types to the default list
		    clear();
		    addTypes(_types);

		    /**
		     * Removes all conversions, leaving the types alone.
		     */
		    function clearConversions() {
		      let typeName;
		      for (typeName of typeList) {
		        typeMap.get(typeName).conversionsTo = [];
		      }
		      nConversions = 0;
		    }

		    /**
		     * Find the type names that match a value.
		     * @param {*} value
		     * @return {string[]} Array of names of types for which
		     *                  the type test matches the value.
		     */
		    function findTypeNames(value) {
		      const matches = typeList.filter(name => {
		        const type = typeMap.get(name);
		        return !type.isAny && type.test(value);
		      });
		      if (matches.length) {
		        return matches;
		      }
		      return ['any'];
		    }

		    /**
		     * Check if an entity is a typed function created by any instance
		     * @param {any} entity
		     * @returns {boolean}
		     */
		    function isTypedFunction(entity) {
		      return entity && typeof entity === 'function' && '_typedFunctionData' in entity;
		    }

		    /**
		     * Find a specific signature from a (composed) typed function, for example:
		     *
		     *   typed.findSignature(fn, ['number', 'string'])
		     *   typed.findSignature(fn, 'number, string')
		     *   typed.findSignature(fn, 'number,string', {exact: true})
		     *
		     * This function findSignature will by default return the best match to
		     * the given signature, possibly employing type conversions.
		     *
		     * The (optional) third argument is a plain object giving options
		     * controlling the signature search. Currently the only implemented
		     * option is `exact`: if specified as true (default is false), only
		     * exact matches will be returned (i.e. signatures for which `fn` was
		     * directly defined). Note that a (possibly different) type matching
		     * `any`, or one or more instances of TYPE matching `...TYPE` are
		     * considered exact matches in this regard, as no conversions are used.
		     *
		     * This function returns a "signature" object, as does `typed.resolve()`,
		     * which is a plain object with four keys: `params` (the array of parameters
		     * for this signature), `fn` (the originally supplied function for this
		     * signature), `test` (a generated function that determines if an argument
		     * list matches this signature, and `implementation` (the function to call
		     * on a matching argument list, that performs conversions if necessary and
		     * then calls the originally supplied function).
		     *
		     * @param {Function} fn                   A typed-function
		     * @param {string | string[]} signature
		     *     Signature to be found, can be an array or a comma separated string.
		     * @param {object} options  Controls the signature search as documented
		     * @return {{ params: Param[], fn: function, test: function, implementation: function }}
		     *     Returns the matching signature, or throws an error when no signature
		     *     is found.
		     */
		    function findSignature(fn, signature, options) {
		      if (!isTypedFunction(fn)) {
		        throw new TypeError(NOT_TYPED_FUNCTION);
		      }

		      // Canonicalize input
		      const exact = options && options.exact;
		      const stringSignature = Array.isArray(signature) ? signature.join(',') : signature;
		      const params = parseSignature(stringSignature);
		      const canonicalSignature = stringifyParams(params);

		      // First hope we get lucky and exactly match a signature
		      if (!exact || canonicalSignature in fn.signatures) {
		        // OK, we can check the internal signatures
		        const match = fn._typedFunctionData.signatureMap.get(canonicalSignature);
		        if (match) {
		          return match;
		        }
		      }

		      // Oh well, we did not; so we have to go back and check the parameters
		      // one by one, in order to catch things like `any` and rest params.
		      // Note here we can assume there is at least one parameter, because
		      // the empty signature would have matched successfully above.
		      const nParams = params.length;
		      let remainingSignatures;
		      if (exact) {
		        remainingSignatures = [];
		        let name;
		        for (name in fn.signatures) {
		          remainingSignatures.push(fn._typedFunctionData.signatureMap.get(name));
		        }
		      } else {
		        remainingSignatures = fn._typedFunctionData.signatures;
		      }
		      for (let i = 0; i < nParams; ++i) {
		        const want = params[i];
		        const filteredSignatures = [];
		        let possibility;
		        for (possibility of remainingSignatures) {
		          const have = getParamAtIndex(possibility.params, i);
		          if (!have || want.restParam && !have.restParam) {
		            continue;
		          }
		          if (!have.hasAny) {
		            // have to check all of the wanted types are available
		            const haveTypes = paramTypeSet(have);
		            if (want.types.some(wtype => !haveTypes.has(wtype.name))) {
		              continue;
		            }
		          }
		          // OK, this looks good
		          filteredSignatures.push(possibility);
		        }
		        remainingSignatures = filteredSignatures;
		        if (remainingSignatures.length === 0) break;
		      }
		      // Return the first remaining signature that was totally matched:
		      let candidate;
		      for (candidate of remainingSignatures) {
		        if (candidate.params.length <= nParams) {
		          return candidate;
		        }
		      }
		      throw new TypeError('Signature not found (signature: ' + (fn.name || 'unnamed') + '(' + stringifyParams(params, ', ') + '))');
		    }

		    /**
		     * Find the proper function to call for a specific signature from
		     * a (composed) typed function, for example:
		     *
		     *   typed.find(fn, ['number', 'string'])
		     *   typed.find(fn, 'number, string')
		     *   typed.find(fn, 'number,string', {exact: true})
		     *
		     * This function find will by default return the best match to
		     * the given signature, possibly employing type conversions (and returning
		     * a function that will perform those conversions as needed). The
		     * (optional) third argument is a plain object giving options contolling
		     * the signature search. Currently only the option `exact` is implemented,
		     * which defaults to "false". If `exact` is specified as true, then only
		     * exact matches will be returned (i.e. signatures for which `fn` was
		     * directly defined). Uses of `any` and `...TYPE` are considered exact if
		     * no conversions are necessary to apply the corresponding function.
		     *
		     * @param {Function} fn                   A typed-function
		     * @param {string | string[]} signature
		     *     Signature to be found, can be an array or a comma separated string.
		     * @param {object} options  Controls the signature match as documented
		     * @return {function}
		     *     Returns the function to call for the given signature, or throws an
		     *     error if no match is found.
		     */
		    function find(fn, signature, options) {
		      return findSignature(fn, signature, options).implementation;
		    }

		    /**
		     * Convert a given value to another data type, specified by type name.
		     *
		     * @param {*} value
		     * @param {string} typeName
		     */
		    function convert(value, typeName) {
		      // check conversion is needed
		      const type = findType(typeName);
		      if (type.test(value)) {
		        return value;
		      }
		      const conversions = type.conversionsTo;
		      if (conversions.length === 0) {
		        throw new Error('There are no conversions to ' + typeName + ' defined.');
		      }
		      for (let i = 0; i < conversions.length; i++) {
		        const fromType = findType(conversions[i].from);
		        if (fromType.test(value)) {
		          return conversions[i].convert(value);
		        }
		      }
		      throw new Error('Cannot convert ' + value + ' to ' + typeName);
		    }

		    /**
		     * Stringify parameters in a normalized way
		     * @param {Param[]} params
		     * @param {string} [','] separator
		     * @return {string}
		     */
		    function stringifyParams(params) {
		      let separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
		      return params.map(p => p.name).join(separator);
		    }

		    /**
		     * Parse a parameter, like "...number | boolean"
		     * @param {string} param
		     * @return {Param} param
		     */
		    function parseParam(param) {
		      const restParam = param.indexOf('...') === 0;
		      const types = !restParam ? param : param.length > 3 ? param.slice(3) : 'any';
		      const typeDefs = types.split('|').map(s => findType(s.trim()));
		      let hasAny = false;
		      let paramName = restParam ? '...' : '';
		      const exactTypes = typeDefs.map(function (type) {
		        hasAny = type.isAny || hasAny;
		        paramName += type.name + '|';
		        return {
		          name: type.name,
		          typeIndex: type.index,
		          test: type.test,
		          isAny: type.isAny,
		          conversion: null,
		          conversionIndex: -1
		        };
		      });
		      return {
		        types: exactTypes,
		        name: paramName.slice(0, -1),
		        // remove trailing '|' from above
		        hasAny,
		        hasConversion: false,
		        restParam
		      };
		    }

		    /**
		     * Expands a parsed parameter with the types available from currently
		     * defined conversions.
		     * @param {Param} param
		     * @return {Param} param
		     */
		    function expandParam(param) {
		      const typeNames = param.types.map(t => t.name);
		      const matchingConversions = availableConversions(typeNames);
		      let hasAny = param.hasAny;
		      let newName = param.name;
		      const convertibleTypes = matchingConversions.map(function (conversion) {
		        const type = findType(conversion.from);
		        hasAny = type.isAny || hasAny;
		        newName += '|' + conversion.from;
		        return {
		          name: conversion.from,
		          typeIndex: type.index,
		          test: type.test,
		          isAny: type.isAny,
		          conversion,
		          conversionIndex: conversion.index
		        };
		      });
		      return {
		        types: param.types.concat(convertibleTypes),
		        name: newName,
		        hasAny,
		        hasConversion: convertibleTypes.length > 0,
		        restParam: param.restParam
		      };
		    }

		    /**
		     * Return the set of type names in a parameter.
		     * Caches the result for efficiency
		     *
		     * @param {Param} param
		     * @return {Set<string>} typenames
		     */
		    function paramTypeSet(param) {
		      if (!param.typeSet) {
		        param.typeSet = new Set();
		        param.types.forEach(type => param.typeSet.add(type.name));
		      }
		      return param.typeSet;
		    }

		    /**
		     * Parse a signature with comma separated parameters,
		     * like "number | boolean, ...string"
		     *
		     * @param {string} signature
		     * @return {Param[]} params
		     */
		    function parseSignature(rawSignature) {
		      const params = [];
		      if (typeof rawSignature !== 'string') {
		        throw new TypeError('Signatures must be strings');
		      }
		      const signature = rawSignature.trim();
		      if (signature === '') {
		        return params;
		      }
		      const rawParams = signature.split(',');
		      for (let i = 0; i < rawParams.length; ++i) {
		        const parsedParam = parseParam(rawParams[i].trim());
		        if (parsedParam.restParam && i !== rawParams.length - 1) {
		          throw new SyntaxError('Unexpected rest parameter "' + rawParams[i] + '": ' + 'only allowed for the last parameter');
		        }
		        // if invalid, short-circuit (all the types may have been filtered)
		        if (parsedParam.types.length === 0) {
		          return null;
		        }
		        params.push(parsedParam);
		      }
		      return params;
		    }

		    /**
		     * Test whether a set of params contains a restParam
		     * @param {Param[]} params
		     * @return {boolean} Returns true when the last parameter is a restParam
		     */
		    function hasRestParam(params) {
		      const param = last(params);
		      return param ? param.restParam : false;
		    }

		    /**
		     * Create a type test for a single parameter, which can have one or multiple
		     * types.
		     * @param {Param} param
		     * @return {function(x: *) : boolean} Returns a test function
		     */
		    function compileTest(param) {
		      if (!param || param.types.length === 0) {
		        // nothing to do
		        return ok;
		      } else if (param.types.length === 1) {
		        return findType(param.types[0].name).test;
		      } else if (param.types.length === 2) {
		        const test0 = findType(param.types[0].name).test;
		        const test1 = findType(param.types[1].name).test;
		        return function or(x) {
		          return test0(x) || test1(x);
		        };
		      } else {
		        // param.types.length > 2
		        const tests = param.types.map(function (type) {
		          return findType(type.name).test;
		        });
		        return function or(x) {
		          for (let i = 0; i < tests.length; i++) {
		            if (tests[i](x)) {
		              return true;
		            }
		          }
		          return false;
		        };
		      }
		    }

		    /**
		     * Create a test for all parameters of a signature
		     * @param {Param[]} params
		     * @return {function(args: Array<*>) : boolean}
		     */
		    function compileTests(params) {
		      let tests, test0, test1;
		      if (hasRestParam(params)) {
		        // variable arguments like '...number'
		        tests = initial(params).map(compileTest);
		        const varIndex = tests.length;
		        const lastTest = compileTest(last(params));
		        const testRestParam = function (args) {
		          for (let i = varIndex; i < args.length; i++) {
		            if (!lastTest(args[i])) {
		              return false;
		            }
		          }
		          return true;
		        };
		        return function testArgs(args) {
		          for (let i = 0; i < tests.length; i++) {
		            if (!tests[i](args[i])) {
		              return false;
		            }
		          }
		          return testRestParam(args) && args.length >= varIndex + 1;
		        };
		      } else {
		        // no variable arguments
		        if (params.length === 0) {
		          return function testArgs(args) {
		            return args.length === 0;
		          };
		        } else if (params.length === 1) {
		          test0 = compileTest(params[0]);
		          return function testArgs(args) {
		            return test0(args[0]) && args.length === 1;
		          };
		        } else if (params.length === 2) {
		          test0 = compileTest(params[0]);
		          test1 = compileTest(params[1]);
		          return function testArgs(args) {
		            return test0(args[0]) && test1(args[1]) && args.length === 2;
		          };
		        } else {
		          // arguments.length > 2
		          tests = params.map(compileTest);
		          return function testArgs(args) {
		            for (let i = 0; i < tests.length; i++) {
		              if (!tests[i](args[i])) {
		                return false;
		              }
		            }
		            return args.length === tests.length;
		          };
		        }
		      }
		    }

		    /**
		     * Find the parameter at a specific index of a Params list.
		     * Handles rest parameters.
		     * @param {Param[]} params
		     * @param {number} index
		     * @return {Param | null} Returns the matching parameter when found,
		     *                        null otherwise.
		     */
		    function getParamAtIndex(params, index) {
		      return index < params.length ? params[index] : hasRestParam(params) ? last(params) : null;
		    }

		    /**
		     * Get all type names of a parameter
		     * @param {Params[]} params
		     * @param {number} index
		     * @return {string[]} Returns an array with type names
		     */
		    function getTypeSetAtIndex(params, index) {
		      const param = getParamAtIndex(params, index);
		      if (!param) {
		        return new Set();
		      }
		      return paramTypeSet(param);
		    }

		    /**
		     * Test whether a type is an exact type or conversion
		     * @param {Type} type
		     * @return {boolean} Returns true when
		     */
		    function isExactType(type) {
		      return type.conversion === null || type.conversion === undefined;
		    }

		    /**
		     * Helper function for creating error messages: create an array with
		     * all available types on a specific argument index.
		     * @param {Signature[]} signatures
		     * @param {number} index
		     * @return {string[]} Returns an array with available types
		     */
		    function mergeExpectedParams(signatures, index) {
		      const typeSet = new Set();
		      signatures.forEach(signature => {
		        const paramSet = getTypeSetAtIndex(signature.params, index);
		        let name;
		        for (name of paramSet) {
		          typeSet.add(name);
		        }
		      });
		      return typeSet.has('any') ? ['any'] : Array.from(typeSet);
		    }

		    /**
		     * Create
		     * @param {string} name             The name of the function
		     * @param {array.<*>} args          The actual arguments passed to the function
		     * @param {Signature[]} signatures  A list with available signatures
		     * @return {TypeError} Returns a type error with additional data
		     *                     attached to it in the property `data`
		     */
		    function createError(name, args, signatures) {
		      let err, expected;
		      const _name = name || 'unnamed';

		      // test for wrong type at some index
		      let matchingSignatures = signatures;
		      let index;
		      for (index = 0; index < args.length; index++) {
		        const nextMatchingDefs = [];
		        matchingSignatures.forEach(signature => {
		          const param = getParamAtIndex(signature.params, index);
		          const test = compileTest(param);
		          if ((index < signature.params.length || hasRestParam(signature.params)) && test(args[index])) {
		            nextMatchingDefs.push(signature);
		          }
		        });
		        if (nextMatchingDefs.length === 0) {
		          // no matching signatures anymore, throw error "wrong type"
		          expected = mergeExpectedParams(matchingSignatures, index);
		          if (expected.length > 0) {
		            const actualTypes = findTypeNames(args[index]);
		            err = new TypeError('Unexpected type of argument in function ' + _name + ' (expected: ' + expected.join(' or ') + ', actual: ' + actualTypes.join(' | ') + ', index: ' + index + ')');
		            err.data = {
		              category: 'wrongType',
		              fn: _name,
		              index,
		              actual: actualTypes,
		              expected
		            };
		            return err;
		          }
		        } else {
		          matchingSignatures = nextMatchingDefs;
		        }
		      }

		      // test for too few arguments
		      const lengths = matchingSignatures.map(function (signature) {
		        return hasRestParam(signature.params) ? Infinity : signature.params.length;
		      });
		      if (args.length < Math.min.apply(null, lengths)) {
		        expected = mergeExpectedParams(matchingSignatures, index);
		        err = new TypeError('Too few arguments in function ' + _name + ' (expected: ' + expected.join(' or ') + ', index: ' + args.length + ')');
		        err.data = {
		          category: 'tooFewArgs',
		          fn: _name,
		          index: args.length,
		          expected
		        };
		        return err;
		      }

		      // test for too many arguments
		      const maxLength = Math.max.apply(null, lengths);
		      if (args.length > maxLength) {
		        err = new TypeError('Too many arguments in function ' + _name + ' (expected: ' + maxLength + ', actual: ' + args.length + ')');
		        err.data = {
		          category: 'tooManyArgs',
		          fn: _name,
		          index: args.length,
		          expectedLength: maxLength
		        };
		        return err;
		      }

		      // Generic error
		      const argTypes = [];
		      for (let i = 0; i < args.length; ++i) {
		        argTypes.push(findTypeNames(args[i]).join('|'));
		      }
		      err = new TypeError('Arguments of type "' + argTypes.join(', ') + '" do not match any of the defined signatures of function ' + _name + '.');
		      err.data = {
		        category: 'mismatch',
		        actual: argTypes
		      };
		      return err;
		    }

		    /**
		     * Find the lowest index of all types of a parameter
		     * @param {Param} param
		     * @return {number} Returns the index of the lowest type in typed.types
		     */
		    function getLowestTypeIndex(param) {
		      let min = typeList.length + 1;
		      for (let i = 0; i < param.types.length; i++) {
		        min = Math.min(min, param.types[i].typeIndex);
		      }
		      return min;
		    }

		    /**
		     * Find the lowest index of the conversion of all types of the parameter
		     * having a conversion
		     * @param {Param} param
		     * @return {number} Returns the lowest index of the conversions of this type
		     */
		    function getLowestConversionIndex(param) {
		      let min = nConversions + 1;
		      for (let i = 0; i < param.types.length; i++) {
		        if (!isExactType(param.types[i])) {
		          min = Math.min(min, param.types[i].conversionIndex);
		        }
		      }
		      return min;
		    }

		    /**
		     * Compare two params. The return value is a number that is
		     * negative when param1 should be considered first, positive
		     * when param2 should be considered first, and zero when the
		     * params are indistinguishable. Primarily as a debugging aid,
		     * the value is always less than one in absolute value, and
		     * a smaller absolute value indicates a less important distinction
		     * between the parameters.
		     * @param {Param} param1
		     * @param {Param} param2
		     * @return {number} negative, positive, or zero depending on whether
		     *                  param1 should be ordered before, after, or equivalently
		     *                  to param2
		     */
		    function compareParams(param1, param2) {
		      // We compare a number of metrics on a param in turn:
		      // 1) 'any' parameters are the least preferred
		      if (param1.hasAny) {
		        if (!param2.hasAny) {
		          return 0.1;
		        }
		      } else if (param2.hasAny) {
		        return -0.1;
		      }

		      // 2) Prefer non-rest to rest parameters
		      if (param1.restParam) {
		        if (!param2.restParam) {
		          return 0.01;
		        }
		      } else if (param2.restParam) {
		        return -0.01;
		      }

		      // 3) Prefer lower type index:
		      const typeDiff = getLowestTypeIndex(param1) - getLowestTypeIndex(param2);
		      if (typeDiff < 0) {
		        return -1e-3;
		      }
		      if (typeDiff > 0) {
		        return 0.001;
		      }

		      // 4) Prefer exact type match to conversions, with a strength that
		      //    grows with the conversion index
		      const conv1 = getLowestConversionIndex(param1);
		      const conv2 = getLowestConversionIndex(param2);
		      if (param1.hasConversion) {
		        if (!param2.hasConversion) {
		          return (1 + conv1) * 0.000001;
		        }
		      } else if (param2.hasConversion) {
		        return -(1 + conv2) * 0.000001;
		      }

		      // 5) Prefer lower conversion index
		      const convDiff = conv1 - conv2;
		      if (convDiff < 0) {
		        return -1e-7;
		      }
		      if (convDiff > 0) {
		        return 0.0000001;
		      }

		      // Don't have a basis for preference
		      return 0;
		    }

		    /**
		     * Compare two signatures. The result is a number that is negative
		     * when the first signature should be preferred to the second, positive
		     * when the second signature should be preferred, and zero in case the
		     * two signatures are essentially equivalent. Primarily as a debugging
		     * aid, a larger absolute value indicates a more "important" difference.
		     *
		     * @param {Signature} signature1
		     * @param {Signature} signature2
		     * @return {number} returns a negative number when signature1 must get a
		     *                  lower index than signature2, a positive number when the
		     *                  opposite holds, or zero when both are equivalent.
		     */
		    function compareSignatures(signature1, signature2) {
		      const pars1 = signature1.params;
		      const pars2 = signature2.params;
		      const last1 = last(pars1);
		      const last2 = last(pars2);
		      const hasRest1 = hasRestParam(pars1);
		      const hasRest2 = hasRestParam(pars2);
		      // We compare a number of metrics on signatures in turn:
		      // 1) An "any rest param" is least preferred
		      if (hasRest1 && last1.hasAny) {
		        if (!hasRest2 || !last2.hasAny) {
		          return 10000000;
		        }
		      } else if (hasRest2 && last2.hasAny) {
		        return -1e7;
		      }

		      // 2) Minimize the number of 'any' parameters
		      let any1 = 0;
		      let conv1 = 0;
		      let par;
		      for (par of pars1) {
		        if (par.hasAny) ++any1;
		        if (par.hasConversion) ++conv1;
		      }
		      let any2 = 0;
		      let conv2 = 0;
		      for (par of pars2) {
		        if (par.hasAny) ++any2;
		        if (par.hasConversion) ++conv2;
		      }
		      if (any1 !== any2) {
		        return (any1 - any2) * 1000000;
		      }

		      // 3) A conversion rest param is less preferred
		      if (hasRest1 && last1.hasConversion) {
		        if (!hasRest2 || !last2.hasConversion) {
		          return 100000;
		        }
		      } else if (hasRest2 && last2.hasConversion) {
		        return -1e5;
		      }

		      // 4) Minimize the number of conversions
		      if (conv1 !== conv2) {
		        return (conv1 - conv2) * 10000;
		      }

		      // 5) Prefer no rest param
		      if (hasRest1) {
		        if (!hasRest2) {
		          return 1000;
		        }
		      } else if (hasRest2) {
		        return -1e3;
		      }

		      // 6) Prefer shorter with rest param, longer without
		      const lengthCriterion = (pars1.length - pars2.length) * (hasRest1 ? -100 : 100);
		      if (lengthCriterion !== 0) {
		        return lengthCriterion;
		      }

		      // Signatures are identical in each of the above metrics.
		      // In particular, they are the same length.
		      // We can therefore compare the parameters one by one.
		      // First we count which signature has more preferred parameters.
		      const comparisons = [];
		      let tc = 0;
		      for (let i = 0; i < pars1.length; ++i) {
		        const thisComparison = compareParams(pars1[i], pars2[i]);
		        comparisons.push(thisComparison);
		        tc += thisComparison;
		      }
		      if (tc !== 0) {
		        return (tc < 0 ? -10 : 10) + tc;
		      }

		      // They have the same number of preferred parameters, so go by the
		      // earliest parameter in which we have a preference.
		      // In other words, dispatch is driven somewhat more by earlier
		      // parameters than later ones.
		      let c;
		      let bonus = 9;
		      const decrement = bonus / (comparisons.length + 1);
		      for (c of comparisons) {
		        if (c !== 0) {
		          return (c < 0 ? -bonus : bonus) + c;
		        }
		        bonus -= decrement;
		      }

		      // It's a tossup:
		      return 0;
		    }

		    /**
		     * Produce a list of all conversions from distinct types to one of
		     * the given types.
		     *
		     * @param {string[]} typeNames
		     * @return {ConversionDef[]} Returns the conversions that are available
		     *                        resulting in any given type (if any)
		     */
		    function availableConversions(typeNames) {
		      if (typeNames.length === 0) {
		        return [];
		      }
		      const types = typeNames.map(findType);
		      if (typeNames.length === 1) return types[0].conversionsTo;

		      // Here, for each type that occurs as the from-type of any conversion
		      // to any of the types found, we must select the conversion of
		      // lowest index from that type. So first collect the types.
		      const knownTypes = new Set(typeNames);
		      const convertibleTypes = new Set();
		      for (let i = 0; i < types.length; ++i) {
		        for (const match of types[i].conversionsTo) {
		          if (!knownTypes.has(match.from)) convertibleTypes.add(match.from);
		        }
		      }

		      // Now get the lowest-index conversion for each type
		      const matches = [];
		      for (const typeName of convertibleTypes) {
		        let bestIndex = nConversions + 1;
		        let bestConversion = null;
		        for (let i = 0; i < types.length; ++i) {
		          for (const match of types[i].conversionsTo) {
		            if (match.from === typeName && match.index < bestIndex) {
		              bestIndex = match.index;
		              bestConversion = match;
		            }
		          }
		        }
		        matches.push(bestConversion);
		      }
		      return matches;
		    }

		    /**
		     * Preprocess arguments before calling the original function:
		     * - if needed convert the parameters
		     * - in case of rest parameters, move the rest parameters into an Array
		     * @param {Param[]} params
		     * @param {function} fn
		     * @return {function} Returns fn or a wrapped function if needed. If it
		     *                    has conversions, the function will be named to indicate
		     *                    what conversions are occurring.
		     */
		    function compileArgsPreprocessing(params, fn) {
		      let fnConvert = fn;

		      // TODO: can we make this wrapper function smarter/simpler?

		      let name = '';
		      if (params.some(p => p.hasConversion)) {
		        const restParam = hasRestParam(params);
		        const compiledConversions = params.map(compileArgConversion);
		        name = compiledConversions.map(conv => conv.name).join(';');
		        fnConvert = function convertArgs() {
		          const args = [];
		          const last = restParam ? arguments.length - 1 : arguments.length;
		          for (let i = 0; i < last; i++) {
		            args[i] = compiledConversions[i](arguments[i]);
		          }
		          if (restParam) {
		            args[last] = arguments[last].map(compiledConversions[last]);
		          }
		          return fn.apply(this, args);
		        };
		      }
		      let fnPreprocess = fnConvert;
		      if (hasRestParam(params)) {
		        const offset = params.length - 1;
		        fnPreprocess = function preprocessRestParams() {
		          return fnConvert.apply(this, slice(arguments, 0, offset).concat([slice(arguments, offset)]));
		        };
		      }
		      if (name) Object.defineProperty(fnPreprocess, 'name', {
		        value: name
		      });
		      return fnPreprocess;
		    }

		    /**
		     * Compile conversion for a parameter to the right type
		     * @param {Param} param
		     * @return {function} Returns the wrapped function that will convert arguments
		     *
		     */
		    function compileArgConversion(param) {
		      let test0, test1, conversion0, conversion1;
		      const tests = [];
		      const conversions = [];
		      let name = '';
		      param.types.forEach(function (type) {
		        if (type.conversion) {
		          name += type.conversion.from + '~>' + type.conversion.to + ',';
		          tests.push(findType(type.conversion.from).test);
		          conversions.push(type.conversion.convert);
		        }
		      });
		      if (name) name = name.slice(0, -1);else name = 'pass';

		      // create optimized conversion functions depending on the number of conversions
		      let convertor = arg => arg;
		      switch (conversions.length) {
		        case 0:
		          break;
		        case 1:
		          test0 = tests[0];
		          conversion0 = conversions[0];
		          convertor = function convertArg(arg) {
		            if (test0(arg)) {
		              return conversion0(arg);
		            }
		            return arg;
		          };
		          break;
		        case 2:
		          test0 = tests[0];
		          test1 = tests[1];
		          conversion0 = conversions[0];
		          conversion1 = conversions[1];
		          convertor = function convertArg(arg) {
		            if (test0(arg)) {
		              return conversion0(arg);
		            }
		            if (test1(arg)) {
		              return conversion1(arg);
		            }
		            return arg;
		          };
		          break;
		        default:
		          convertor = function convertArg(arg) {
		            for (let i = 0; i < conversions.length; i++) {
		              if (tests[i](arg)) {
		                return conversions[i](arg);
		              }
		            }
		            return arg;
		          };
		      }
		      Object.defineProperty(convertor, 'name', {
		        value: name
		      });
		      return convertor;
		    }

		    /**
		     * Split params with union types in to separate params.
		     *
		     * For example:
		     *
		     *     splitParams([['Array', 'Object'], ['string', 'RegExp'])
		     *     // returns:
		     *     // [
		     *     //   ['Array', 'string'],
		     *     //   ['Array', 'RegExp'],
		     *     //   ['Object', 'string'],
		     *     //   ['Object', 'RegExp']
		     *     // ]
		     *
		     * @param {Param[]} params
		     * @return {Param[]}
		     */
		    function splitParams(params) {
		      function _splitParams(params, index, paramsSoFar) {
		        if (index < params.length) {
		          const param = params[index];
		          let resultingParams = [];
		          if (param.restParam) {
		            // split the types of a rest parameter in two:
		            // one with only exact types, and one with exact types and conversions
		            const exactTypes = param.types.filter(isExactType);
		            if (exactTypes.length < param.types.length) {
		              resultingParams.push({
		                types: exactTypes,
		                name: '...' + exactTypes.map(t => t.name).join('|'),
		                hasAny: exactTypes.some(t => t.isAny),
		                hasConversion: false,
		                restParam: true
		              });
		            }
		            resultingParams.push(param);
		          } else {
		            // split all the types of a regular parameter into one type per param
		            resultingParams = param.types.map(function (type) {
		              return {
		                types: [type],
		                name: type.name,
		                hasAny: type.isAny,
		                hasConversion: type.conversion,
		                restParam: false
		              };
		            });
		          }

		          // recurse over the groups with types
		          return flatMap(resultingParams, function (nextParam) {
		            return _splitParams(params, index + 1, paramsSoFar.concat([nextParam]));
		          });
		        } else {
		          // we've reached the end of the parameters.
		          return [paramsSoFar];
		        }
		      }
		      return _splitParams(params, 0, []);
		    }

		    /**
		     * Test whether two param lists represent conflicting signatures
		     * @param {Param[]} params1
		     * @param {Param[]} params2
		     * @return {boolean} Returns true when the signatures conflict, false otherwise.
		     */
		    function conflicting(params1, params2) {
		      const ii = Math.max(params1.length, params2.length);
		      for (let i = 0; i < ii; i++) {
		        const typeSet1 = getTypeSetAtIndex(params1, i);
		        const typeSet2 = getTypeSetAtIndex(params2, i);
		        let overlap = false;
		        let name;
		        for (name of typeSet2) {
		          if (typeSet1.has(name)) {
		            overlap = true;
		            break;
		          }
		        }
		        if (!overlap) {
		          return false;
		        }
		      }
		      const len1 = params1.length;
		      const len2 = params2.length;
		      const restParam1 = hasRestParam(params1);
		      const restParam2 = hasRestParam(params2);
		      return restParam1 ? restParam2 ? len1 === len2 : len2 >= len1 : restParam2 ? len1 >= len2 : len1 === len2;
		    }

		    /**
		     * Helper function for `resolveReferences` that returns a copy of
		     * functionList wihe any prior resolutions cleared out, in case we are
		     * recycling signatures from a prior typed function construction.
		     *
		     * @param {Array.<function|typed-reference>} functionList
		     * @return {Array.<function|typed-reference>}
		     */
		    function clearResolutions(functionList) {
		      return functionList.map(fn => {
		        if (isReferToSelf(fn)) {
		          return referToSelf(fn.referToSelf.callback);
		        }
		        if (isReferTo(fn)) {
		          return makeReferTo(fn.referTo.references, fn.referTo.callback);
		        }
		        return fn;
		      });
		    }

		    /**
		     * Take a list of references, a list of functions functionList, and a
		     * signatureMap indexing signatures into functionList, and return
		     * the list of resolutions, or a false-y value if they don't all
		     * resolve in a valid way (yet).
		     *
		     * @param {string[]} references
		     * @param {Array<function|typed-reference} functionList
		     * @param {Object.<string, integer>} signatureMap
		     * @return {function[] | false} resolutions
		     */
		    function collectResolutions(references, functionList, signatureMap) {
		      const resolvedReferences = [];
		      let reference;
		      for (reference of references) {
		        let resolution = signatureMap[reference];
		        if (typeof resolution !== 'number') {
		          throw new TypeError('No definition for referenced signature "' + reference + '"');
		        }
		        resolution = functionList[resolution];
		        if (typeof resolution !== 'function') {
		          return false;
		        }
		        resolvedReferences.push(resolution);
		      }
		      return resolvedReferences;
		    }

		    /**
		     * Resolve any references in the functionList for the typed function
		     * itself. The signatureMap tells which index in the functionList a
		     * given signature should be mapped to (for use in resolving typed.referTo)
		     * and self provides the destions of a typed.referToSelf.
		     *
		     * @param {Array<function | typed-reference-object>} functionList
		     * @param {Object.<string, function>} signatureMap
		     * @param {function} self  The typed-function itself
		     * @return {Array<function>} The list of resolved functions
		     */
		    function resolveReferences(functionList, signatureMap, self) {
		      const resolvedFunctions = clearResolutions(functionList);
		      const isResolved = new Array(resolvedFunctions.length).fill(false);
		      let leftUnresolved = true;
		      while (leftUnresolved) {
		        leftUnresolved = false;
		        let nothingResolved = true;
		        for (let i = 0; i < resolvedFunctions.length; ++i) {
		          if (isResolved[i]) continue;
		          const fn = resolvedFunctions[i];
		          if (isReferToSelf(fn)) {
		            resolvedFunctions[i] = fn.referToSelf.callback(self);
		            // Preserve reference in case signature is reused someday:
		            resolvedFunctions[i].referToSelf = fn.referToSelf;
		            isResolved[i] = true;
		            nothingResolved = false;
		          } else if (isReferTo(fn)) {
		            const resolvedReferences = collectResolutions(fn.referTo.references, resolvedFunctions, signatureMap);
		            if (resolvedReferences) {
		              resolvedFunctions[i] = fn.referTo.callback.apply(this, resolvedReferences);
		              // Preserve reference in case signature is reused someday:
		              resolvedFunctions[i].referTo = fn.referTo;
		              isResolved[i] = true;
		              nothingResolved = false;
		            } else {
		              leftUnresolved = true;
		            }
		          }
		        }
		        if (nothingResolved && leftUnresolved) {
		          throw new SyntaxError('Circular reference detected in resolving typed.referTo');
		        }
		      }
		      return resolvedFunctions;
		    }

		    /**
		     * Validate whether any of the function bodies contains a self-reference
		     * usage like `this(...)` or `this.signatures`. This self-referencing is
		     * deprecated since typed-function v3. It has been replaced with
		     * the functions typed.referTo and typed.referToSelf.
		     * @param {Object.<string, function>} signaturesMap
		     */
		    function validateDeprecatedThis(signaturesMap) {
		      // TODO: remove this deprecation warning logic some day (it's introduced in v3)

		      // match occurrences like 'this(' and 'this.signatures'
		      const deprecatedThisRegex = /\bthis(\(|\.signatures\b)/;
		      Object.keys(signaturesMap).forEach(signature => {
		        const fn = signaturesMap[signature];
		        if (deprecatedThisRegex.test(fn.toString())) {
		          throw new SyntaxError('Using `this` to self-reference a function ' + 'is deprecated since typed-function@3. ' + 'Use typed.referTo and typed.referToSelf instead.');
		        }
		      });
		    }

		    /**
		     * Create a typed function
		     * @param {String} name               The name for the typed function
		     * @param {Object.<string, function>} rawSignaturesMap
		     *                                    An object with one or
		     *                                    multiple signatures as key, and the
		     *                                    function corresponding to the
		     *                                    signature as value.
		     * @return {function}  Returns the created typed function.
		     */
		    function createTypedFunction(name, rawSignaturesMap) {
		      typed.createCount++;
		      if (Object.keys(rawSignaturesMap).length === 0) {
		        throw new SyntaxError('No signatures provided');
		      }
		      if (typed.warnAgainstDeprecatedThis) {
		        validateDeprecatedThis(rawSignaturesMap);
		      }

		      // Main processing loop for signatures
		      const parsedParams = [];
		      const originalFunctions = [];
		      const signaturesMap = {};
		      const preliminarySignatures = []; // may have duplicates from conversions
		      let signature;
		      for (signature in rawSignaturesMap) {
		        // A) Protect against polluted Object prototype:
		        if (!Object.prototype.hasOwnProperty.call(rawSignaturesMap, signature)) {
		          continue;
		        }
		        // B) Parse the signature
		        const params = parseSignature(signature);
		        if (!params) continue;
		        // C) Check for conflicts
		        parsedParams.forEach(function (pp) {
		          if (conflicting(pp, params)) {
		            throw new TypeError('Conflicting signatures "' + stringifyParams(pp) + '" and "' + stringifyParams(params) + '".');
		          }
		        });
		        parsedParams.push(params);
		        // D) Store the provided function and add conversions
		        const functionIndex = originalFunctions.length;
		        originalFunctions.push(rawSignaturesMap[signature]);
		        const conversionParams = params.map(expandParam);
		        // E) Split the signatures and collect them up
		        let sp;
		        for (sp of splitParams(conversionParams)) {
		          const spName = stringifyParams(sp);
		          preliminarySignatures.push({
		            params: sp,
		            name: spName,
		            fn: functionIndex
		          });
		          if (sp.every(p => !p.hasConversion)) {
		            signaturesMap[spName] = functionIndex;
		          }
		        }
		      }
		      preliminarySignatures.sort(compareSignatures);

		      // Note the forward reference to theTypedFn
		      const resolvedFunctions = resolveReferences(originalFunctions, signaturesMap, theTypedFn);

		      // Fill in the proper function for each signature
		      let s;
		      for (s in signaturesMap) {
		        if (Object.prototype.hasOwnProperty.call(signaturesMap, s)) {
		          signaturesMap[s] = resolvedFunctions[signaturesMap[s]];
		        }
		      }
		      const signatures = [];
		      const internalSignatureMap = new Map(); // benchmarks faster than object
		      for (s of preliminarySignatures) {
		        // Note it's only safe to eliminate duplicates like this
		        // _after_ the signature sorting step above; otherwise we might
		        // remove the wrong one.
		        if (!internalSignatureMap.has(s.name)) {
		          s.fn = resolvedFunctions[s.fn];
		          signatures.push(s);
		          internalSignatureMap.set(s.name, s);
		        }
		      }

		      // we create a highly optimized checks for the first couple of signatures with max 2 arguments
		      const ok0 = signatures[0] && signatures[0].params.length <= 2 && !hasRestParam(signatures[0].params);
		      const ok1 = signatures[1] && signatures[1].params.length <= 2 && !hasRestParam(signatures[1].params);
		      const ok2 = signatures[2] && signatures[2].params.length <= 2 && !hasRestParam(signatures[2].params);
		      const ok3 = signatures[3] && signatures[3].params.length <= 2 && !hasRestParam(signatures[3].params);
		      const ok4 = signatures[4] && signatures[4].params.length <= 2 && !hasRestParam(signatures[4].params);
		      const ok5 = signatures[5] && signatures[5].params.length <= 2 && !hasRestParam(signatures[5].params);
		      const allOk = ok0 && ok1 && ok2 && ok3 && ok4 && ok5;

		      // compile the tests
		      for (let i = 0; i < signatures.length; ++i) {
		        signatures[i].test = compileTests(signatures[i].params);
		      }
		      const test00 = ok0 ? compileTest(signatures[0].params[0]) : notOk;
		      const test10 = ok1 ? compileTest(signatures[1].params[0]) : notOk;
		      const test20 = ok2 ? compileTest(signatures[2].params[0]) : notOk;
		      const test30 = ok3 ? compileTest(signatures[3].params[0]) : notOk;
		      const test40 = ok4 ? compileTest(signatures[4].params[0]) : notOk;
		      const test50 = ok5 ? compileTest(signatures[5].params[0]) : notOk;
		      const test01 = ok0 ? compileTest(signatures[0].params[1]) : notOk;
		      const test11 = ok1 ? compileTest(signatures[1].params[1]) : notOk;
		      const test21 = ok2 ? compileTest(signatures[2].params[1]) : notOk;
		      const test31 = ok3 ? compileTest(signatures[3].params[1]) : notOk;
		      const test41 = ok4 ? compileTest(signatures[4].params[1]) : notOk;
		      const test51 = ok5 ? compileTest(signatures[5].params[1]) : notOk;

		      // compile the functions
		      for (let i = 0; i < signatures.length; ++i) {
		        signatures[i].implementation = compileArgsPreprocessing(signatures[i].params, signatures[i].fn);
		      }
		      const fn0 = ok0 ? signatures[0].implementation : undef;
		      const fn1 = ok1 ? signatures[1].implementation : undef;
		      const fn2 = ok2 ? signatures[2].implementation : undef;
		      const fn3 = ok3 ? signatures[3].implementation : undef;
		      const fn4 = ok4 ? signatures[4].implementation : undef;
		      const fn5 = ok5 ? signatures[5].implementation : undef;
		      const len0 = ok0 ? signatures[0].params.length : -1;
		      const len1 = ok1 ? signatures[1].params.length : -1;
		      const len2 = ok2 ? signatures[2].params.length : -1;
		      const len3 = ok3 ? signatures[3].params.length : -1;
		      const len4 = ok4 ? signatures[4].params.length : -1;
		      const len5 = ok5 ? signatures[5].params.length : -1;

		      // simple and generic, but also slow
		      const iStart = allOk ? 6 : 0;
		      const iEnd = signatures.length;
		      // de-reference ahead for execution speed:
		      const tests = signatures.map(s => s.test);
		      const fns = signatures.map(s => s.implementation);
		      const generic = function generic() {

		        for (let i = iStart; i < iEnd; i++) {
		          if (tests[i](arguments)) {
		            return fns[i].apply(this, arguments);
		          }
		        }
		        return typed.onMismatch(name, arguments, signatures);
		      };

		      // create the typed function
		      // fast, specialized version. Falls back to the slower, generic one if needed
		      function theTypedFn(arg0, arg1) {

		        if (arguments.length === len0 && test00(arg0) && test01(arg1)) {
		          return fn0.apply(this, arguments);
		        }
		        if (arguments.length === len1 && test10(arg0) && test11(arg1)) {
		          return fn1.apply(this, arguments);
		        }
		        if (arguments.length === len2 && test20(arg0) && test21(arg1)) {
		          return fn2.apply(this, arguments);
		        }
		        if (arguments.length === len3 && test30(arg0) && test31(arg1)) {
		          return fn3.apply(this, arguments);
		        }
		        if (arguments.length === len4 && test40(arg0) && test41(arg1)) {
		          return fn4.apply(this, arguments);
		        }
		        if (arguments.length === len5 && test50(arg0) && test51(arg1)) {
		          return fn5.apply(this, arguments);
		        }
		        return generic.apply(this, arguments);
		      }

		      // attach name the typed function
		      try {
		        Object.defineProperty(theTypedFn, 'name', {
		          value: name
		        });
		      } catch (err) {
		        // old browsers do not support Object.defineProperty and some don't support setting the name property
		        // the function name is not essential for the functioning, it's mostly useful for debugging,
		        // so it's fine to have unnamed functions.
		      }

		      // attach signatures to the function.
		      // This property is close to the original collection of signatures
		      // used to create the typed-function, just with unions split:
		      theTypedFn.signatures = signaturesMap;

		      // Store internal data for functions like resolve, find, etc.
		      // Also serves as the flag that this is a typed-function
		      theTypedFn._typedFunctionData = {
		        signatures,
		        signatureMap: internalSignatureMap
		      };
		      return theTypedFn;
		    }

		    /**
		     * Action to take on mismatch
		     * @param {string} name      Name of function that was attempted to be called
		     * @param {Array} args       Actual arguments to the call
		     * @param {Array} signatures Known signatures of the named typed-function
		     */
		    function _onMismatch(name, args, signatures) {
		      throw createError(name, args, signatures);
		    }

		    /**
		     * Return all but the last items of an array or function Arguments
		     * @param {Array | Arguments} arr
		     * @return {Array}
		     */
		    function initial(arr) {
		      return slice(arr, 0, arr.length - 1);
		    }

		    /**
		     * return the last item of an array or function Arguments
		     * @param {Array | Arguments} arr
		     * @return {*}
		     */
		    function last(arr) {
		      return arr[arr.length - 1];
		    }

		    /**
		     * Slice an array or function Arguments
		     * @param {Array | Arguments | IArguments} arr
		     * @param {number} start
		     * @param {number} [end]
		     * @return {Array}
		     */
		    function slice(arr, start, end) {
		      return Array.prototype.slice.call(arr, start, end);
		    }

		    /**
		     * Return the first item from an array for which test(arr[i]) returns true
		     * @param {Array} arr
		     * @param {function} test
		     * @return {* | undefined} Returns the first matching item
		     *                         or undefined when there is no match
		     */
		    function findInArray(arr, test) {
		      for (let i = 0; i < arr.length; i++) {
		        if (test(arr[i])) {
		          return arr[i];
		        }
		      }
		      return undefined;
		    }

		    /**
		     * Flat map the result invoking a callback for every item in an array.
		     * https://gist.github.com/samgiles/762ee337dff48623e729
		     * @param {Array} arr
		     * @param {function} callback
		     * @return {Array}
		     */
		    function flatMap(arr, callback) {
		      return Array.prototype.concat.apply([], arr.map(callback));
		    }

		    /**
		     * Create a reference callback to one or multiple signatures
		     *
		     * Syntax:
		     *
		     *     typed.referTo(signature1, signature2, ..., function callback(fn1, fn2, ...) {
		     *       // ...
		     *     })
		     *
		     * @returns {{referTo: {references: string[], callback}}}
		     */
		    function referTo() {
		      const references = initial(arguments).map(s => stringifyParams(parseSignature(s)));
		      const callback = last(arguments);
		      if (typeof callback !== 'function') {
		        throw new TypeError('Callback function expected as last argument');
		      }
		      return makeReferTo(references, callback);
		    }
		    function makeReferTo(references, callback) {
		      return {
		        referTo: {
		          references,
		          callback
		        }
		      };
		    }

		    /**
		     * Create a reference callback to the typed-function itself
		     *
		     * @param {(self: function) => function} callback
		     * @returns {{referToSelf: { callback: function }}}
		     */
		    function referToSelf(callback) {
		      if (typeof callback !== 'function') {
		        throw new TypeError('Callback function expected as first argument');
		      }
		      return {
		        referToSelf: {
		          callback
		        }
		      };
		    }

		    /**
		     * Test whether something is a referTo object, holding a list with reference
		     * signatures and a callback.
		     *
		     * @param {Object | function} objectOrFn
		     * @returns {boolean}
		     */
		    function isReferTo(objectOrFn) {
		      return objectOrFn && typeof objectOrFn.referTo === 'object' && Array.isArray(objectOrFn.referTo.references) && typeof objectOrFn.referTo.callback === 'function';
		    }

		    /**
		     * Test whether something is a referToSelf object, holding a callback where
		     * to pass `self`.
		     *
		     * @param {Object | function} objectOrFn
		     * @returns {boolean}
		     */
		    function isReferToSelf(objectOrFn) {
		      return objectOrFn && typeof objectOrFn.referToSelf === 'object' && typeof objectOrFn.referToSelf.callback === 'function';
		    }

		    /**
		     * Check if name is (A) new, (B) a match, or (C) a mismatch; and throw
		     * an error in case (C).
		     *
		     * @param { string | undefined } nameSoFar
		     * @param { string | undefined } newName
		     * @returns { string } updated name
		     */
		    function checkName(nameSoFar, newName) {
		      if (!nameSoFar) {
		        return newName;
		      }
		      if (newName && newName !== nameSoFar) {
		        const err = new Error('Function names do not match (expected: ' + nameSoFar + ', actual: ' + newName + ')');
		        err.data = {
		          actual: newName,
		          expected: nameSoFar
		        };
		        throw err;
		      }
		      return nameSoFar;
		    }

		    /**
		     * Retrieve the implied name from an object with signature keys
		     * and function values, checking whether all value names match
		     *
		     * @param { {string: function} } obj
		     */
		    function getObjectName(obj) {
		      let name;
		      for (const key in obj) {
		        // Only pay attention to own properties, and only if their values
		        // are typed functions or functions with a signature property
		        if (Object.prototype.hasOwnProperty.call(obj, key) && (isTypedFunction(obj[key]) || typeof obj[key].signature === 'string')) {
		          name = checkName(name, obj[key].name);
		        }
		      }
		      return name;
		    }

		    /**
		     * Copy all of the signatures from the second argument into the first,
		     * which is modified by side effect, checking for conflicts
		     *
		     * @param {Object.<string, function|typed-reference>} dest
		     * @param {Object.<string, function|typed-reference>} source
		     */
		    function mergeSignatures(dest, source) {
		      let key;
		      for (key in source) {
		        if (Object.prototype.hasOwnProperty.call(source, key)) {
		          if (key in dest) {
		            if (source[key] !== dest[key]) {
		              const err = new Error('Signature "' + key + '" is defined twice');
		              err.data = {
		                signature: key,
		                sourceFunction: source[key],
		                destFunction: dest[key]
		              };
		              throw err;
		            }
		            // else: both signatures point to the same function, that's fine
		          }
		          dest[key] = source[key];
		        }
		      }
		    }
		    const saveTyped = typed;

		    /**
		     * Originally the main function was a typed function itself, but then
		     * it might not be able to generate error messages if the client
		     * replaced the type system with different names.
		     *
		     * Main entry: typed([name], functions/objects with signatures...)
		     *
		     * Assembles and returns a new typed-function from the given items
		     * that provide signatures and implementations, each of which may be
		     * * a plain object mapping (string) signatures to implementing functions,
		     * * a previously constructed typed function, or
		     * * any other single function with a string-valued property `signature`.
		      * The name of the resulting typed-function will be given by the
		     * string-valued name argument if present, or if not, by the name
		     * of any of the arguments that have one, as long as any that do are
		     * consistent with each other. If no name is specified, the name will be
		     * an empty string.
		     *
		     * @param {string} maybeName [optional]
		     * @param {(function|object)[]} signature providers
		     * @returns {typed-function}
		     */
		    typed = function (maybeName) {
		      const named = typeof maybeName === 'string';
		      const start = named ? 1 : 0;
		      let name = named ? maybeName : '';
		      const allSignatures = {};
		      for (let i = start; i < arguments.length; ++i) {
		        const item = arguments[i];
		        let theseSignatures = {};
		        let thisName;
		        if (typeof item === 'function') {
		          thisName = item.name;
		          if (typeof item.signature === 'string') {
		            // Case 1: Ordinary function with a string 'signature' property
		            theseSignatures[item.signature] = item;
		          } else if (isTypedFunction(item)) {
		            // Case 2: Existing typed function
		            theseSignatures = item.signatures;
		          }
		        } else if (isPlainObject(item)) {
		          // Case 3: Plain object, assume keys = signatures, values = functions
		          theseSignatures = item;
		          if (!named) {
		            thisName = getObjectName(item);
		          }
		        }
		        if (Object.keys(theseSignatures).length === 0) {
		          const err = new TypeError('Argument to \'typed\' at index ' + i + ' is not a (typed) function, ' + 'nor an object with signatures as keys and functions as values.');
		          err.data = {
		            index: i,
		            argument: item
		          };
		          throw err;
		        }
		        if (!named) {
		          name = checkName(name, thisName);
		        }
		        mergeSignatures(allSignatures, theseSignatures);
		      }
		      return createTypedFunction(name || '', allSignatures);
		    };
		    typed.create = create;
		    typed.createCount = saveTyped.createCount;
		    typed.onMismatch = _onMismatch;
		    typed.throwMismatchError = _onMismatch;
		    typed.createError = createError;
		    typed.clear = clear;
		    typed.clearConversions = clearConversions;
		    typed.addTypes = addTypes;
		    typed._findType = findType; // For unit testing only
		    typed.referTo = referTo;
		    typed.referToSelf = referToSelf;
		    typed.convert = convert;
		    typed.findSignature = findSignature;
		    typed.find = find;
		    typed.isTypedFunction = isTypedFunction;
		    typed.warnAgainstDeprecatedThis = true;

		    /**
		     * add a type (convenience wrapper for typed.addTypes)
		     * @param {{name: string, test: function}} type
		     * @param {boolean} [beforeObjectTest=true]
		     *                          If true, the new test will be inserted before
		     *                          the test with name 'Object' (if any), since
		     *                          tests for Object match Array and classes too.
		     */
		    typed.addType = function (type, beforeObjectTest) {
		      let before = 'any';
		      if (beforeObjectTest !== false && typeMap.has('Object')) {
		        before = 'Object';
		      }
		      typed.addTypes([type], before);
		    };

		    /**
		     * Verify that the ConversionDef conversion has a valid format.
		     *
		     * @param {conversionDef} conversion
		     * @return {void}
		     * @throws {TypeError|SyntaxError}
		     */
		    function _validateConversion(conversion) {
		      if (!conversion || typeof conversion.from !== 'string' || typeof conversion.to !== 'string' || typeof conversion.convert !== 'function') {
		        throw new TypeError('Object with properties {from: string, to: string, convert: function} expected');
		      }
		      if (conversion.to === conversion.from) {
		        throw new SyntaxError('Illegal to define conversion from "' + conversion.from + '" to itself.');
		      }
		    }

		    /**
		     * Add a conversion
		     *
		     * @param {ConversionDef} conversion
		     * @param {{override: boolean}} [options]
		     * @returns {void}
		     * @throws {TypeError}
		     */
		    typed.addConversion = function (conversion) {
		      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
		        override: false
		      };
		      _validateConversion(conversion);
		      const to = findType(conversion.to);
		      const existing = to.conversionsTo.find(other => other.from === conversion.from);
		      if (existing) {
		        if (options && options.override) {
		          typed.removeConversion({
		            from: existing.from,
		            to: conversion.to,
		            convert: existing.convert
		          });
		        } else {
		          throw new Error('There is already a conversion from "' + conversion.from + '" to "' + to.name + '"');
		        }
		      }
		      to.conversionsTo.push({
		        from: conversion.from,
		        to: to.name,
		        convert: conversion.convert,
		        index: nConversions++
		      });
		    };

		    /**
		     * Convenience wrapper to call addConversion on each conversion in a list.
		     *
		     * @param {ConversionDef[]} conversions
		     * @param {{override: boolean}} [options]
		     * @returns {void}
		     * @throws {TypeError}
		     */
		    typed.addConversions = function (conversions, options) {
		      conversions.forEach(conversion => typed.addConversion(conversion, options));
		    };

		    /**
		     * Remove the specified conversion. The format is the same as for
		     * addConversion, and the convert function must match or an error
		     * is thrown.
		     *
		     * @param {{from: string, to: string, convert: function}} conversion
		     * @returns {void}
		     * @throws {TypeError|SyntaxError|Error}
		     */
		    typed.removeConversion = function (conversion) {
		      _validateConversion(conversion);
		      const to = findType(conversion.to);
		      const existingConversion = findInArray(to.conversionsTo, c => c.from === conversion.from);
		      if (!existingConversion) {
		        throw new Error('Attempt to remove nonexistent conversion from ' + conversion.from + ' to ' + conversion.to);
		      }
		      if (existingConversion.convert !== conversion.convert) {
		        throw new Error('Conversion to remove does not match existing conversion');
		      }
		      const index = to.conversionsTo.indexOf(existingConversion);
		      to.conversionsTo.splice(index, 1);
		    };

		    /**
		     * Produce the specific signature that a typed function
		     * will execute on the given arguments. Here, a "signature" is an
		     * object with properties 'params', 'test', 'fn', and 'implementation'.
		     * This last property is a function that converts params as necessary
		     * and then calls 'fn'. Returns null if there is no matching signature.
		     * @param {typed-function} tf
		     * @param {any[]} argList
		     * @returns {{params: string, test: function, fn: function, implementation: function}}
		     */
		    typed.resolve = function (tf, argList) {
		      if (!isTypedFunction(tf)) {
		        throw new TypeError(NOT_TYPED_FUNCTION);
		      }
		      const sigs = tf._typedFunctionData.signatures;
		      for (let i = 0; i < sigs.length; ++i) {
		        if (sigs[i].test(argList)) {
		          return sigs[i];
		        }
		      }
		      return null;
		    };
		    return typed;
		  }
		  var typedFunction = create();

		  return typedFunction;

		}));
		
	} (typedFunction$2));
	return typedFunction$2.exports;
}

var typedFunctionExports = requireTypedFunction();
var typedFunction = /*@__PURE__*/getDefaultExportFromCjs(typedFunctionExports);

/**
 * Create a factory function, which can be used to inject dependencies.
 *
 * The created functions are memoized, a consecutive call of the factory
 * with the exact same inputs will return the same function instance.
 * The memoized cache is exposed on `factory.cache` and can be cleared
 * if needed.
 *
 * Example:
 *
 *     const name = 'log'
 *     const dependencies = ['config', 'typed', 'divideScalar', 'Complex']
 *
 *     export const createLog = factory(name, dependencies, ({ typed, config, divideScalar, Complex }) => {
 *       // ... create the function log here and return it
 *     }
 *
 * @param {string} name           Name of the function to be created
 * @param {string[]} dependencies The names of all required dependencies
 * @param {function} create       Callback function called with an object with all dependencies
 * @param {Object} [meta]
 *     Optional object with meta information that will be attached
 *     to the created factory function as property `meta`. For explanation
 *     of what meta properties can be specified and what they mean, see
 *     docs/core/extension.md.
 * @returns {function}
 */
function factory(name, dependencies, create, meta) {
  function assertAndCreate(scope) {
    // we only pass the requested dependencies to the factory function
    // to prevent functions to rely on dependencies that are not explicitly
    // requested.
    var deps = pickShallow(scope, dependencies.map(stripOptionalNotation));
    assertDependencies(name, dependencies, scope);
    return create(deps);
  }
  assertAndCreate.isFactory = true;
  assertAndCreate.fn = name;
  assertAndCreate.dependencies = dependencies.slice().sort();
  if (meta) {
    assertAndCreate.meta = meta;
  }
  return assertAndCreate;
}

/**
 * Assert that all dependencies of a list with dependencies are available in the provided scope.
 *
 * Will throw an exception when there are dependencies missing.
 *
 * @param {string} name   Name for the function to be created. Used to generate a useful error message
 * @param {string[]} dependencies
 * @param {Object} scope
 */
function assertDependencies(name, dependencies, scope) {
  var allDefined = dependencies.filter(dependency => !isOptionalDependency(dependency)) // filter optionals
  .every(dependency => scope[dependency] !== undefined);
  if (!allDefined) {
    var missingDependencies = dependencies.filter(dependency => scope[dependency] === undefined);

    // TODO: create a custom error class for this, a MathjsError or something like that
    throw new Error("Cannot create function \"".concat(name, "\", ") + "some dependencies are missing: ".concat(missingDependencies.map(d => "\"".concat(d, "\"")).join(', '), "."));
  }
}
function isOptionalDependency(dependency) {
  return dependency && dependency[0] === '?';
}
function stripOptionalNotation(dependency) {
  return dependency && dependency[0] === '?' ? dependency.slice(1) : dependency;
}

/**
 * @typedef {{sign: '+' | '-' | '', coefficients: number[], exponent: number}} SplitValue
 */

/**
 * Check if a number is integer
 * @param {number | boolean} value
 * @return {boolean} isInteger
 */
function isInteger(value) {
  if (typeof value === 'boolean') {
    return true;
  }
  return isFinite(value) ? value === Math.round(value) : false;
}

/**
 * Calculate the sign of a number
 * @param {number} x
 * @returns {number}
 */
var sign$2 = Math.sign || function (x) {
  if (x > 0) {
    return 1;
  } else if (x < 0) {
    return -1;
  } else {
    return 0;
  }
};

/**
 * Formats a number in a given base
 * @param {number} n
 * @param {number} base
 * @param {number} size
 * @returns {string}
 */
function formatNumberToBase(n, base, size) {
  var prefixes = {
    2: '0b',
    8: '0o',
    16: '0x'
  };
  var prefix = prefixes[base];
  var suffix = '';
  if (size) {
    if (size < 1) {
      throw new Error('size must be in greater than 0');
    }
    if (!isInteger(size)) {
      throw new Error('size must be an integer');
    }
    if (n > 2 ** (size - 1) - 1 || n < -(2 ** (size - 1))) {
      throw new Error("Value must be in range [-2^".concat(size - 1, ", 2^").concat(size - 1, "-1]"));
    }
    if (!isInteger(n)) {
      throw new Error('Value must be an integer');
    }
    if (n < 0) {
      n = n + 2 ** size;
    }
    suffix = "i".concat(size);
  }
  var sign = '';
  if (n < 0) {
    n = -n;
    sign = '-';
  }
  return "".concat(sign).concat(prefix).concat(n.toString(base)).concat(suffix);
}

/**
 * Convert a number to a formatted string representation.
 *
 * Syntax:
 *
 *    format(value)
 *    format(value, options)
 *    format(value, precision)
 *    format(value, fn)
 *
 * Where:
 *
 *    {number} value   The value to be formatted
 *    {Object} options An object with formatting options. Available options:
 *                     {string} notation
 *                         Number notation. Choose from:
 *                         'fixed'          Always use regular number notation.
 *                                          For example '123.40' and '14000000'
 *                         'exponential'    Always use exponential notation.
 *                                          For example '1.234e+2' and '1.4e+7'
 *                         'engineering'    Always use engineering notation.
 *                                          For example '123.4e+0' and '14.0e+6'
 *                         'auto' (default) Regular number notation for numbers
 *                                          having an absolute value between
 *                                          `lowerExp` and `upperExp` bounds, and
 *                                          uses exponential notation elsewhere.
 *                                          Lower bound is included, upper bound
 *                                          is excluded.
 *                                          For example '123.4' and '1.4e7'.
 *                         'bin', 'oct, or
 *                         'hex'            Format the number using binary, octal,
 *                                          or hexadecimal notation.
 *                                          For example '0b1101' and '0x10fe'.
 *                     {number} wordSize    The word size in bits to use for formatting
 *                                          in binary, octal, or hexadecimal notation.
 *                                          To be used only with 'bin', 'oct', or 'hex'
 *                                          values for 'notation' option. When this option
 *                                          is defined the value is formatted as a signed
 *                                          twos complement integer of the given word size
 *                                          and the size suffix is appended to the output.
 *                                          For example
 *                                          format(-1, {notation: 'hex', wordSize: 8}) === '0xffi8'.
 *                                          Default value is undefined.
 *                     {number} precision   A number between 0 and 16 to round
 *                                          the digits of the number.
 *                                          In case of notations 'exponential',
 *                                          'engineering', and 'auto',
 *                                          `precision` defines the total
 *                                          number of significant digits returned.
 *                                          In case of notation 'fixed',
 *                                          `precision` defines the number of
 *                                          significant digits after the decimal
 *                                          point.
 *                                          `precision` is undefined by default,
 *                                          not rounding any digits.
 *                     {number} lowerExp    Exponent determining the lower boundary
 *                                          for formatting a value with an exponent
 *                                          when `notation='auto`.
 *                                          Default value is `-3`.
 *                     {number} upperExp    Exponent determining the upper boundary
 *                                          for formatting a value with an exponent
 *                                          when `notation='auto`.
 *                                          Default value is `5`.
 *    {Function} fn    A custom formatting function. Can be used to override the
 *                     built-in notations. Function `fn` is called with `value` as
 *                     parameter and must return a string. Is useful for example to
 *                     format all values inside a matrix in a particular way.
 *
 * Examples:
 *
 *    format(6.4)                                        // '6.4'
 *    format(1240000)                                    // '1.24e6'
 *    format(1/3)                                        // '0.3333333333333333'
 *    format(1/3, 3)                                     // '0.333'
 *    format(21385, 2)                                   // '21000'
 *    format(12.071, {notation: 'fixed'})                // '12'
 *    format(2.3,    {notation: 'fixed', precision: 2})  // '2.30'
 *    format(52.8,   {notation: 'exponential'})          // '5.28e+1'
 *    format(12345678, {notation: 'engineering'})        // '12.345678e+6'
 *
 * @param {number} value
 * @param {Object | Function | number} [options]
 * @return {string} str The formatted value
 */
function format$2(value, options) {
  if (typeof options === 'function') {
    // handle format(value, fn)
    return options(value);
  }

  // handle special cases
  if (value === Infinity) {
    return 'Infinity';
  } else if (value === -Infinity) {
    return '-Infinity';
  } else if (isNaN(value)) {
    return 'NaN';
  }
  var {
    notation,
    precision,
    wordSize
  } = normalizeFormatOptions(options);

  // handle the various notations
  switch (notation) {
    case 'fixed':
      return toFixed$1(value, precision);
    case 'exponential':
      return toExponential$1(value, precision);
    case 'engineering':
      return toEngineering$1(value, precision);
    case 'bin':
      return formatNumberToBase(value, 2, wordSize);
    case 'oct':
      return formatNumberToBase(value, 8, wordSize);
    case 'hex':
      return formatNumberToBase(value, 16, wordSize);
    case 'auto':
      // remove trailing zeros after the decimal point
      return toPrecision(value, precision, options).replace(/((\.\d*?)(0+))($|e)/, function () {
        var digits = arguments[2];
        var e = arguments[4];
        return digits !== '.' ? digits + e : e;
      });
    default:
      throw new Error('Unknown notation "' + notation + '". ' + 'Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}

/**
 * Normalize format options into an object:
 *   {
 *     notation: string,
 *     precision: number | undefined,
 *     wordSize: number | undefined
 *   }
 */
function normalizeFormatOptions(options) {
  // default values for options
  var notation = 'auto';
  var precision;
  var wordSize;
  if (options !== undefined) {
    if (isNumber(options)) {
      precision = options;
    } else if (isBigNumber(options)) {
      precision = options.toNumber();
    } else if (isObject(options)) {
      if (options.precision !== undefined) {
        precision = _toNumberOrThrow(options.precision, () => {
          throw new Error('Option "precision" must be a number or BigNumber');
        });
      }
      if (options.wordSize !== undefined) {
        wordSize = _toNumberOrThrow(options.wordSize, () => {
          throw new Error('Option "wordSize" must be a number or BigNumber');
        });
      }
      if (options.notation) {
        notation = options.notation;
      }
    } else {
      throw new Error('Unsupported type of options, number, BigNumber, or object expected');
    }
  }
  return {
    notation,
    precision,
    wordSize
  };
}

/**
 * Split a number into sign, coefficients, and exponent
 * @param {number | string} value
 * @return {SplitValue}
 *              Returns an object containing sign, coefficients, and exponent
 */
function splitNumber(value) {
  // parse the input value
  var match = String(value).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
  if (!match) {
    throw new SyntaxError('Invalid number ' + value);
  }
  var sign = match[1];
  var digits = match[2];
  var exponent = parseFloat(match[4] || '0');
  var dot = digits.indexOf('.');
  exponent += dot !== -1 ? dot - 1 : digits.length - 1;
  var coefficients = digits.replace('.', '') // remove the dot (must be removed before removing leading zeros)
  .replace(/^0*/, function (zeros) {
    // remove leading zeros, add their count to the exponent
    exponent -= zeros.length;
    return '';
  }).replace(/0*$/, '') // remove trailing zeros
  .split('').map(function (d) {
    return parseInt(d);
  });
  if (coefficients.length === 0) {
    coefficients.push(0);
    exponent++;
  }
  return {
    sign,
    coefficients,
    exponent
  };
}

/**
 * Format a number in engineering notation. Like '1.23e+6', '2.3e+0', '3.500e-3'
 * @param {number | string} value
 * @param {number} [precision]        Optional number of significant figures to return.
 */
function toEngineering$1(value, precision) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }
  var split = splitNumber(value);
  var rounded = roundDigits(split, precision);
  var e = rounded.exponent;
  var c = rounded.coefficients;

  // find nearest lower multiple of 3 for exponent
  var newExp = e % 3 === 0 ? e : e < 0 ? e - 3 - e % 3 : e - e % 3;
  if (isNumber(precision)) {
    // add zeroes to give correct sig figs
    while (precision > c.length || e - newExp + 1 > c.length) {
      c.push(0);
    }
  } else {
    // concatenate coefficients with necessary zeros
    // add zeros if necessary (for example: 1e+8 -> 100e+6)
    var missingZeros = Math.abs(e - newExp) - (c.length - 1);
    for (var i = 0; i < missingZeros; i++) {
      c.push(0);
    }
  }

  // find difference in exponents
  var expDiff = Math.abs(e - newExp);
  var decimalIdx = 1;

  // push decimal index over by expDiff times
  while (expDiff > 0) {
    decimalIdx++;
    expDiff--;
  }

  // if all coefficient values are zero after the decimal point and precision is unset, don't add a decimal value.
  // otherwise concat with the rest of the coefficients
  var decimals = c.slice(decimalIdx).join('');
  var decimalVal = isNumber(precision) && decimals.length || decimals.match(/[1-9]/) ? '.' + decimals : '';
  var str = c.slice(0, decimalIdx).join('') + decimalVal + 'e' + (e >= 0 ? '+' : '') + newExp.toString();
  return rounded.sign + str;
}

/**
 * Format a number with fixed notation.
 * @param {number | string} value
 * @param {number} [precision=undefined]  Optional number of decimals after the
 *                                        decimal point. null by default.
 */
function toFixed$1(value, precision) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }
  var splitValue = splitNumber(value);
  var rounded = typeof precision === 'number' ? roundDigits(splitValue, splitValue.exponent + 1 + precision) : splitValue;
  var c = rounded.coefficients;
  var p = rounded.exponent + 1; // exponent may have changed

  // append zeros if needed
  var pp = p + (precision || 0);
  if (c.length < pp) {
    c = c.concat(zeros$1(pp - c.length));
  }

  // prepend zeros if needed
  if (p < 0) {
    c = zeros$1(-p + 1).concat(c);
    p = 1;
  }

  // insert a dot if needed
  if (p < c.length) {
    c.splice(p, 0, p === 0 ? '0.' : '.');
  }
  return rounded.sign + c.join('');
}

/**
 * Format a number in exponential notation. Like '1.23e+5', '2.3e+0', '3.500e-3'
 * @param {number | string} value
 * @param {number} [precision]  Number of digits in formatted output.
 *                              If not provided, the maximum available digits
 *                              is used.
 */
function toExponential$1(value, precision) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }

  // round if needed, else create a clone
  var split = splitNumber(value);
  var rounded = precision ? roundDigits(split, precision) : split;
  var c = rounded.coefficients;
  var e = rounded.exponent;

  // append zeros if needed
  if (c.length < precision) {
    c = c.concat(zeros$1(precision - c.length));
  }

  // format as `C.CCCe+EEE` or `C.CCCe-EEE`
  var first = c.shift();
  return rounded.sign + first + (c.length > 0 ? '.' + c.join('') : '') + 'e' + (e >= 0 ? '+' : '') + e;
}

/**
 * Format a number with a certain precision
 * @param {number | string} value
 * @param {number} [precision=undefined] Optional number of digits.
 * @param {{lowerExp: number | undefined, upperExp: number | undefined}} [options]
 *                                       By default:
 *                                         lowerExp = -3 (incl)
 *                                         upper = +5 (excl)
 * @return {string}
 */
function toPrecision(value, precision, options) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }

  // determine lower and upper bound for exponential notation.
  var lowerExp = _toNumberOrDefault$1(options === null || options === void 0 ? void 0 : options.lowerExp, -3);
  var upperExp = _toNumberOrDefault$1(options === null || options === void 0 ? void 0 : options.upperExp, 5);
  var split = splitNumber(value);
  var rounded = precision ? roundDigits(split, precision) : split;
  if (rounded.exponent < lowerExp || rounded.exponent >= upperExp) {
    // exponential notation
    return toExponential$1(value, precision);
  } else {
    var c = rounded.coefficients;
    var e = rounded.exponent;

    // append trailing zeros
    if (c.length < precision) {
      c = c.concat(zeros$1(precision - c.length));
    }

    // append trailing zeros
    // TODO: simplify the next statement
    c = c.concat(zeros$1(e - c.length + 1 + (c.length < precision ? precision - c.length : 0)));

    // prepend zeros
    c = zeros$1(-e).concat(c);
    var dot = e > 0 ? e : 0;
    if (dot < c.length - 1) {
      c.splice(dot + 1, 0, '.');
    }
    return rounded.sign + c.join('');
  }
}

/**
 * Round the number of digits of a number *
 * @param {SplitValue} split       A value split with .splitNumber(value)
 * @param {number} precision  A positive integer
 * @return {SplitValue}
 *              Returns an object containing sign, coefficients, and exponent
 *              with rounded digits
 */
function roundDigits(split, precision) {
  // create a clone
  var rounded = {
    sign: split.sign,
    coefficients: split.coefficients,
    exponent: split.exponent
  };
  var c = rounded.coefficients;

  // prepend zeros if needed
  while (precision <= 0) {
    c.unshift(0);
    rounded.exponent++;
    precision++;
  }
  if (c.length > precision) {
    var removed = c.splice(precision, c.length - precision);
    if (removed[0] >= 5) {
      var i = precision - 1;
      c[i]++;
      while (c[i] === 10) {
        c.pop();
        if (i === 0) {
          c.unshift(0);
          rounded.exponent++;
          i++;
        }
        i--;
        c[i]++;
      }
    }
  }
  return rounded;
}

/**
 * Create an array filled with zeros.
 * @param {number} length
 * @return {Array}
 */
function zeros$1(length) {
  var arr = [];
  for (var i = 0; i < length; i++) {
    arr.push(0);
  }
  return arr;
}

/**
 * Count the number of significant digits of a number.
 *
 * For example:
 *   2.34 returns 3
 *   0.0034 returns 2
 *   120.5e+30 returns 4
 *
 * @param {number} value
 * @return {number} digits   Number of significant digits
 */
function digits(value) {
  return value.toExponential().replace(/e.*$/, '') // remove exponential notation
  .replace(/^0\.?0*|\./, '') // remove decimal point and leading zeros
  .length;
}

/**
 * Compares two floating point numbers.
 * @param {number} a - First value to compare
 * @param {number} b - Second value to compare
 * @param {number} [relTol=1e-09] - The relative tolerance, indicating the maximum allowed difference relative to the larger absolute value. Must be greater than 0.
 * @param {number} [absTol=1e-12] - The minimum absolute tolerance, useful for comparisons near zero. Must be at least 0.
 * @return {boolean} whether the two numbers are nearly equal
 *
 * @throws {Error} If `relTol` is less than or equal to 0.
 * @throws {Error} If `absTol` is less than 0.
 *
 * @example
 * nearlyEqual(1.000000001, 1.0, 1e-8);            // true
 * nearlyEqual(1.000000002, 1.0, 0);            // false
 * nearlyEqual(1.0, 1.009, undefined, 0.01);       // true
 * nearlyEqual(0.000000001, 0.0, undefined, 1e-8); // true
 */
function nearlyEqual$1(a, b) {
  var relTol = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e-8;
  var absTol = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  if (relTol <= 0) {
    throw new Error('Relative tolerance must be greater than 0');
  }
  if (absTol < 0) {
    throw new Error('Absolute tolerance must be at least 0');
  }

  // NaN
  if (isNaN(a) || isNaN(b)) {
    return false;
  }
  if (!isFinite(a) || !isFinite(b)) {
    return a === b;
  }
  if (a === b) {
    return true;
  }

  // abs(a-b) <= max(rel_tol * max(abs(a), abs(b)), abs_tol)
  return Math.abs(a - b) <= Math.max(relTol * Math.max(Math.abs(a), Math.abs(b)), absTol);
}

/**
 * Returns a value with the magnitude of x and the sign of y.
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
function copysign(x, y) {
  var signx = true ;
  var signy = y > 0 ? true : y < 0 ? false : 1 / y === Infinity;
  return signx ^ signy ? -x : x;
}
function _toNumberOrThrow(value, onError) {
  if (isNumber(value)) {
    return value;
  } else if (isBigNumber(value)) {
    return value.toNumber();
  } else {
    onError();
  }
}
function _toNumberOrDefault$1(value, defaultValue) {
  if (isNumber(value)) {
    return value;
  } else if (isBigNumber(value)) {
    return value.toNumber();
  } else {
    return defaultValue;
  }
}

/**
 * Create a typed-function which checks the types of the arguments and
 * can match them against multiple provided signatures. The typed-function
 * automatically converts inputs in order to find a matching signature.
 * Typed functions throw informative errors in case of wrong input arguments.
 *
 * See the library [typed-function](https://github.com/josdejong/typed-function)
 * for detailed documentation.
 *
 * Syntax:
 *
 *     math.typed(name, signatures) : function
 *     math.typed(signatures) : function
 *
 * Examples:
 *
 *     // create a typed function with multiple types per argument (type union)
 *     const fn2 = typed({
 *       'number | boolean': function (b) {
 *         return 'b is a number or boolean'
 *       },
 *       'string, number | boolean': function (a, b) {
 *         return 'a is a string, b is a number or boolean'
 *       }
 *     })
 *
 *     // create a typed function with an any type argument
 *     const log = typed({
 *       'string, any': function (event, data) {
 *         console.log('event: ' + event + ', data: ' + JSON.stringify(data))
 *       }
 *     })
 *
 * @param {string} [name]                          Optional name for the typed-function
 * @param {Object<string, function>} signatures   Object with one or multiple function signatures
 * @returns {function} The created typed-function.
 */


// returns a new instance of typed-function
var _createTyped2 = function _createTyped() {
  // initially, return the original instance of typed-function
  // consecutively, return a new instance from typed.create.
  _createTyped2 = typedFunction.create;
  return typedFunction;
};
var dependencies$w = ['?BigNumber', '?Complex', '?DenseMatrix', '?Fraction'];

/**
 * Factory function for creating a new typed instance
 * @param {Object} dependencies   Object with data types like Complex and BigNumber
 * @returns {Function}
 */
var createTyped = /* #__PURE__ */factory('typed', dependencies$w, function createTyped(_ref) {
  var {
    BigNumber,
    Complex,
    DenseMatrix,
    Fraction
  } = _ref;
  // TODO: typed-function must be able to silently ignore signatures with unknown data types

  // get a new instance of typed-function
  var typed = _createTyped2();

  // define all types. The order of the types determines in which order function
  // arguments are type-checked (so for performance it's important to put the
  // most used types first).
  typed.clear();
  typed.addTypes([{
    name: 'number',
    test: isNumber
  }, {
    name: 'Complex',
    test: isComplex
  }, {
    name: 'BigNumber',
    test: isBigNumber
  }, {
    name: 'bigint',
    test: isBigInt
  }, {
    name: 'Fraction',
    test: isFraction
  }, {
    name: 'Unit',
    test: isUnit
  },
  // The following type matches a valid variable name, i.e., an alphanumeric
  // string starting with an alphabetic character. It is used (at least)
  // in the definition of the derivative() function, as the argument telling
  // what to differentiate over must (currently) be a variable.
  // TODO: deprecate the identifier type (it's not used anymore, see https://github.com/josdejong/mathjs/issues/3253)
  {
    name: 'identifier',
    test: s => isString && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(s)
  }, {
    name: 'string',
    test: isString
  }, {
    name: 'Chain',
    test: isChain
  }, {
    name: 'Array',
    test: isArray
  }, {
    name: 'Matrix',
    test: isMatrix
  }, {
    name: 'DenseMatrix',
    test: isDenseMatrix
  }, {
    name: 'SparseMatrix',
    test: isSparseMatrix
  }, {
    name: 'Range',
    test: isRange
  }, {
    name: 'Index',
    test: isIndex
  }, {
    name: 'boolean',
    test: isBoolean
  }, {
    name: 'ResultSet',
    test: isResultSet
  }, {
    name: 'Help',
    test: isHelp
  }, {
    name: 'function',
    test: isFunction
  }, {
    name: 'Date',
    test: isDate
  }, {
    name: 'RegExp',
    test: isRegExp
  }, {
    name: 'null',
    test: isNull
  }, {
    name: 'undefined',
    test: isUndefined
  }, {
    name: 'AccessorNode',
    test: isAccessorNode
  }, {
    name: 'ArrayNode',
    test: isArrayNode
  }, {
    name: 'AssignmentNode',
    test: isAssignmentNode
  }, {
    name: 'BlockNode',
    test: isBlockNode
  }, {
    name: 'ConditionalNode',
    test: isConditionalNode
  }, {
    name: 'ConstantNode',
    test: isConstantNode
  }, {
    name: 'FunctionNode',
    test: isFunctionNode
  }, {
    name: 'FunctionAssignmentNode',
    test: isFunctionAssignmentNode
  }, {
    name: 'IndexNode',
    test: isIndexNode
  }, {
    name: 'Node',
    test: isNode
  }, {
    name: 'ObjectNode',
    test: isObjectNode
  }, {
    name: 'OperatorNode',
    test: isOperatorNode
  }, {
    name: 'ParenthesisNode',
    test: isParenthesisNode
  }, {
    name: 'RangeNode',
    test: isRangeNode
  }, {
    name: 'RelationalNode',
    test: isRelationalNode
  }, {
    name: 'SymbolNode',
    test: isSymbolNode
  }, {
    name: 'Map',
    test: isMap
  }, {
    name: 'Object',
    test: isObject
  } // order 'Object' last, it matches on other classes too
  ]);
  typed.addConversions([{
    from: 'number',
    to: 'BigNumber',
    convert: function convert(x) {
      if (!BigNumber) {
        throwNoBignumber(x);
      }

      // note: conversion from number to BigNumber can fail if x has >15 digits
      if (digits(x) > 15) {
        throw new TypeError('Cannot implicitly convert a number with >15 significant digits to BigNumber ' + '(value: ' + x + '). ' + 'Use function bignumber(x) to convert to BigNumber.');
      }
      return new BigNumber(x);
    }
  }, {
    from: 'number',
    to: 'Complex',
    convert: function convert(x) {
      if (!Complex) {
        throwNoComplex(x);
      }
      return new Complex(x, 0);
    }
  }, {
    from: 'BigNumber',
    to: 'Complex',
    convert: function convert(x) {
      if (!Complex) {
        throwNoComplex(x);
      }
      return new Complex(x.toNumber(), 0);
    }
  }, {
    from: 'bigint',
    to: 'number',
    convert: function convert(x) {
      if (x > Number.MAX_SAFE_INTEGER) {
        throw new TypeError('Cannot implicitly convert bigint to number: ' + 'value exceeds the max safe integer value (value: ' + x + ')');
      }
      return Number(x);
    }
  }, {
    from: 'bigint',
    to: 'BigNumber',
    convert: function convert(x) {
      if (!BigNumber) {
        throwNoBignumber(x);
      }
      return new BigNumber(x.toString());
    }
  }, {
    from: 'bigint',
    to: 'Fraction',
    convert: function convert(x) {
      if (!Fraction) {
        throwNoFraction(x);
      }
      return new Fraction(x);
    }
  }, {
    from: 'Fraction',
    to: 'BigNumber',
    convert: function convert(x) {
      throw new TypeError('Cannot implicitly convert a Fraction to BigNumber or vice versa. ' + 'Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.');
    }
  }, {
    from: 'Fraction',
    to: 'Complex',
    convert: function convert(x) {
      if (!Complex) {
        throwNoComplex(x);
      }
      return new Complex(x.valueOf(), 0);
    }
  }, {
    from: 'number',
    to: 'Fraction',
    convert: function convert(x) {
      if (!Fraction) {
        throwNoFraction(x);
      }
      var f = new Fraction(x);
      if (f.valueOf() !== x) {
        throw new TypeError('Cannot implicitly convert a number to a Fraction when there will be a loss of precision ' + '(value: ' + x + '). ' + 'Use function fraction(x) to convert to Fraction.');
      }
      return f;
    }
  }, {
    // FIXME: add conversion from Fraction to number, for example for `sqrt(fraction(1,3))`
    //  from: 'Fraction',
    //  to: 'number',
    //  convert: function (x) {
    //    return x.valueOf()
    //  }
    // }, {
    from: 'string',
    to: 'number',
    convert: function convert(x) {
      var n = Number(x);
      if (isNaN(n)) {
        throw new Error('Cannot convert "' + x + '" to a number');
      }
      return n;
    }
  }, {
    from: 'string',
    to: 'BigNumber',
    convert: function convert(x) {
      if (!BigNumber) {
        throwNoBignumber(x);
      }
      try {
        return new BigNumber(x);
      } catch (err) {
        throw new Error('Cannot convert "' + x + '" to BigNumber');
      }
    }
  }, {
    from: 'string',
    to: 'bigint',
    convert: function convert(x) {
      try {
        return BigInt(x);
      } catch (err) {
        throw new Error('Cannot convert "' + x + '" to BigInt');
      }
    }
  }, {
    from: 'string',
    to: 'Fraction',
    convert: function convert(x) {
      if (!Fraction) {
        throwNoFraction(x);
      }
      try {
        return new Fraction(x);
      } catch (err) {
        throw new Error('Cannot convert "' + x + '" to Fraction');
      }
    }
  }, {
    from: 'string',
    to: 'Complex',
    convert: function convert(x) {
      if (!Complex) {
        throwNoComplex(x);
      }
      try {
        return new Complex(x);
      } catch (err) {
        throw new Error('Cannot convert "' + x + '" to Complex');
      }
    }
  }, {
    from: 'boolean',
    to: 'number',
    convert: function convert(x) {
      return +x;
    }
  }, {
    from: 'boolean',
    to: 'BigNumber',
    convert: function convert(x) {
      if (!BigNumber) {
        throwNoBignumber(x);
      }
      return new BigNumber(+x);
    }
  }, {
    from: 'boolean',
    to: 'bigint',
    convert: function convert(x) {
      return BigInt(+x);
    }
  }, {
    from: 'boolean',
    to: 'Fraction',
    convert: function convert(x) {
      if (!Fraction) {
        throwNoFraction(x);
      }
      return new Fraction(+x);
    }
  }, {
    from: 'boolean',
    to: 'string',
    convert: function convert(x) {
      return String(x);
    }
  }, {
    from: 'Array',
    to: 'Matrix',
    convert: function convert(array) {
      if (!DenseMatrix) {
        throwNoMatrix();
      }
      return new DenseMatrix(array);
    }
  }, {
    from: 'Matrix',
    to: 'Array',
    convert: function convert(matrix) {
      return matrix.valueOf();
    }
  }]);

  // Provide a suggestion on how to call a function elementwise
  // This was added primarily as guidance for the v10 -> v11 transition,
  // and could potentially be removed in the future if it no longer seems
  // to be helpful.
  typed.onMismatch = (name, args, signatures) => {
    var usualError = typed.createError(name, args, signatures);
    if (['wrongType', 'mismatch'].includes(usualError.data.category) && args.length === 1 && isCollection(args[0]) &&
    // check if the function can be unary:
    signatures.some(sig => !sig.params.includes(','))) {
      var err = new TypeError("Function '".concat(name, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(name, ")'."));
      err.data = usualError.data;
      throw err;
    }
    throw usualError;
  };

  // Provide a suggestion on how to call a function elementwise
  // This was added primarily as guidance for the v10 -> v11 transition,
  // and could potentially be removed in the future if it no longer seems
  // to be helpful.
  typed.onMismatch = (name, args, signatures) => {
    var usualError = typed.createError(name, args, signatures);
    if (['wrongType', 'mismatch'].includes(usualError.data.category) && args.length === 1 && isCollection(args[0]) &&
    // check if the function can be unary:
    signatures.some(sig => !sig.params.includes(','))) {
      var err = new TypeError("Function '".concat(name, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(name, ")'."));
      err.data = usualError.data;
      throw err;
    }
    throw usualError;
  };
  return typed;
});
function throwNoBignumber(x) {
  throw new Error("Cannot convert value ".concat(x, " into a BigNumber: no class 'BigNumber' provided"));
}
function throwNoComplex(x) {
  throw new Error("Cannot convert value ".concat(x, " into a Complex number: no class 'Complex' provided"));
}
function throwNoMatrix() {
  throw new Error('Cannot convert array into a Matrix: no class \'DenseMatrix\' provided');
}
function throwNoFraction(x) {
  throw new Error("Cannot convert value ".concat(x, " into a Fraction, no class 'Fraction' provided."));
}

/*!
 *  decimal.js v10.6.0
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */


// -----------------------------------  EDITABLE DEFAULTS  ------------------------------------ //


  // The maximum exponent magnitude.
  // The limit on the value of `toExpNeg`, `toExpPos`, `minE` and `maxE`.
var EXP_LIMIT = 9e15,                      // 0 to 9e15

  // The limit on the value of `precision`, and on the value of the first argument to
  // `toDecimalPlaces`, `toExponential`, `toFixed`, `toPrecision` and `toSignificantDigits`.
  MAX_DIGITS = 1e9,                        // 0 to 1e9

  // Base conversion alphabet.
  NUMERALS = '0123456789abcdef',

  // The natural logarithm of 10 (1025 digits).
  LN10 = '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058',

  // Pi (1025 digits).
  PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789',


  // The initial configuration properties of the Decimal constructor.
  DEFAULTS = {

    // These values must be integers within the stated ranges (inclusive).
    // Most of these values can be changed at run-time using the `Decimal.config` method.

    // The maximum number of significant digits of the result of a calculation or base conversion.
    // E.g. `Decimal.config({ precision: 20 });`
    precision: 20,                         // 1 to MAX_DIGITS

    // The rounding mode used when rounding to `precision`.
    //
    // ROUND_UP         0 Away from zero.
    // ROUND_DOWN       1 Towards zero.
    // ROUND_CEIL       2 Towards +Infinity.
    // ROUND_FLOOR      3 Towards -Infinity.
    // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
    // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
    // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
    // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
    // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
    //
    // E.g.
    // `Decimal.rounding = 4;`
    // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
    rounding: 4,                           // 0 to 8

    // The modulo mode used when calculating the modulus: a mod n.
    // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
    // The remainder (r) is calculated as: r = a - n * q.
    //
    // UP         0 The remainder is positive if the dividend is negative, else is negative.
    // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
    // FLOOR      3 The remainder has the same sign as the divisor (Python %).
    // HALF_EVEN  6 The IEEE 754 remainder function.
    // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
    //
    // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
    // division (9) are commonly used for the modulus operation. The other rounding modes can also
    // be used, but they may not give useful results.
    modulo: 1,                             // 0 to 9

    // The exponent value at and beneath which `toString` returns exponential notation.
    // JavaScript numbers: -7
    toExpNeg: -7,                          // 0 to -EXP_LIMIT

    // The exponent value at and above which `toString` returns exponential notation.
    // JavaScript numbers: 21
    toExpPos:  21,                         // 0 to EXP_LIMIT

    // The minimum exponent value, beneath which underflow to zero occurs.
    // JavaScript numbers: -324  (5e-324)
    minE: -EXP_LIMIT,                      // -1 to -EXP_LIMIT

    // The maximum exponent value, above which overflow to Infinity occurs.
    // JavaScript numbers: 308  (1.7976931348623157e+308)
    maxE: EXP_LIMIT,                       // 1 to EXP_LIMIT

    // Whether to use cryptographically-secure random number generation, if available.
    crypto: false                          // true/false
  },


// ----------------------------------- END OF EDITABLE DEFAULTS ------------------------------- //


  inexact, quadrant,
  external = true,

  decimalError = '[DecimalError] ',
  invalidArgument = decimalError + 'Invalid argument: ',
  precisionLimitExceeded = decimalError + 'Precision limit exceeded',
  cryptoUnavailable = decimalError + 'crypto unavailable',
  tag = '[object Decimal]',

  mathfloor = Math.floor,
  mathpow = Math.pow,

  isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
  isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
  isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
  isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,

  BASE = 1e7,
  LOG_BASE = 7,
  MAX_SAFE_INTEGER = 9007199254740991,

  LN10_PRECISION = LN10.length - 1,
  PI_PRECISION = PI.length - 1,

  // Decimal.prototype object
  P$4 = { toStringTag: tag };


// Decimal prototype methods


/*
 *  absoluteValue             abs
 *  ceil
 *  clampedTo                 clamp
 *  comparedTo                cmp
 *  cosine                    cos
 *  cubeRoot                  cbrt
 *  decimalPlaces             dp
 *  dividedBy                 div
 *  dividedToIntegerBy        divToInt
 *  equals                    eq
 *  floor
 *  greaterThan               gt
 *  greaterThanOrEqualTo      gte
 *  hyperbolicCosine          cosh
 *  hyperbolicSine            sinh
 *  hyperbolicTangent         tanh
 *  inverseCosine             acos
 *  inverseHyperbolicCosine   acosh
 *  inverseHyperbolicSine     asinh
 *  inverseHyperbolicTangent  atanh
 *  inverseSine               asin
 *  inverseTangent            atan
 *  isFinite
 *  isInteger                 isInt
 *  isNaN
 *  isNegative                isNeg
 *  isPositive                isPos
 *  isZero
 *  lessThan                  lt
 *  lessThanOrEqualTo         lte
 *  logarithm                 log
 *  [maximum]                 [max]
 *  [minimum]                 [min]
 *  minus                     sub
 *  modulo                    mod
 *  naturalExponential        exp
 *  naturalLogarithm          ln
 *  negated                   neg
 *  plus                      add
 *  precision                 sd
 *  round
 *  sine                      sin
 *  squareRoot                sqrt
 *  tangent                   tan
 *  times                     mul
 *  toBinary
 *  toDecimalPlaces           toDP
 *  toExponential
 *  toFixed
 *  toFraction
 *  toHexadecimal             toHex
 *  toNearest
 *  toNumber
 *  toOctal
 *  toPower                   pow
 *  toPrecision
 *  toSignificantDigits       toSD
 *  toString
 *  truncated                 trunc
 *  valueOf                   toJSON
 */


/*
 * Return a new Decimal whose value is the absolute value of this Decimal.
 *
 */
P$4.absoluteValue = P$4.abs = function () {
  var x = new this.constructor(this);
  if (x.s < 0) x.s = 1;
  return finalise(x);
};


/*
 * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
 * direction of positive Infinity.
 *
 */
P$4.ceil = function () {
  return finalise(new this.constructor(this), this.e + 1, 2);
};


/*
 * Return a new Decimal whose value is the value of this Decimal clamped to the range
 * delineated by `min` and `max`.
 *
 * min {number|string|bigint|Decimal}
 * max {number|string|bigint|Decimal}
 *
 */
P$4.clampedTo = P$4.clamp = function (min, max) {
  var k,
    x = this,
    Ctor = x.constructor;
  min = new Ctor(min);
  max = new Ctor(max);
  if (!min.s || !max.s) return new Ctor(NaN);
  if (min.gt(max)) throw Error(invalidArgument + max);
  k = x.cmp(min);
  return k < 0 ? min : x.cmp(max) > 0 ? max : new Ctor(x);
};


/*
 * Return
 *   1    if the value of this Decimal is greater than the value of `y`,
 *  -1    if the value of this Decimal is less than the value of `y`,
 *   0    if they have the same value,
 *   NaN  if the value of either Decimal is NaN.
 *
 */
P$4.comparedTo = P$4.cmp = function (y) {
  var i, j, xdL, ydL,
    x = this,
    xd = x.d,
    yd = (y = new x.constructor(y)).d,
    xs = x.s,
    ys = y.s;

  // Either NaN or ±Infinity?
  if (!xd || !yd) {
    return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
  }

  // Either zero?
  if (!xd[0] || !yd[0]) return xd[0] ? xs : yd[0] ? -ys : 0;

  // Signs differ?
  if (xs !== ys) return xs;

  // Compare exponents.
  if (x.e !== y.e) return x.e > y.e ^ xs < 0 ? 1 : -1;

  xdL = xd.length;
  ydL = yd.length;

  // Compare digit by digit.
  for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
    if (xd[i] !== yd[i]) return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
  }

  // Compare lengths.
  return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
};


/*
 * Return a new Decimal whose value is the cosine of the value in radians of this Decimal.
 *
 * Domain: [-Infinity, Infinity]
 * Range: [-1, 1]
 *
 * cos(0)         = 1
 * cos(-0)        = 1
 * cos(Infinity)  = NaN
 * cos(-Infinity) = NaN
 * cos(NaN)       = NaN
 *
 */
P$4.cosine = P$4.cos = function () {
  var pr, rm,
    x = this,
    Ctor = x.constructor;

  if (!x.d) return new Ctor(NaN);

  // cos(0) = cos(-0) = 1
  if (!x.d[0]) return new Ctor(1);

  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
  Ctor.rounding = 1;

  x = cosine(Ctor, toLessThanHalfPi(Ctor, x));

  Ctor.precision = pr;
  Ctor.rounding = rm;

  return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
};


/*
 *
 * Return a new Decimal whose value is the cube root of the value of this Decimal, rounded to
 * `precision` significant digits using rounding mode `rounding`.
 *
 *  cbrt(0)  =  0
 *  cbrt(-0) = -0
 *  cbrt(1)  =  1
 *  cbrt(-1) = -1
 *  cbrt(N)  =  N
 *  cbrt(-I) = -I
 *  cbrt(I)  =  I
 *
 * Math.cbrt(x) = (x < 0 ? -Math.pow(-x, 1/3) : Math.pow(x, 1/3))
 *
 */
P$4.cubeRoot = P$4.cbrt = function () {
  var e, m, n, r, rep, s, sd, t, t3, t3plusx,
    x = this,
    Ctor = x.constructor;

  if (!x.isFinite() || x.isZero()) return new Ctor(x);
  external = false;

  // Initial estimate.
  s = x.s * mathpow(x.s * x, 1 / 3);

   // Math.cbrt underflow/overflow?
   // Pass x to Math.pow as integer, then adjust the exponent of the result.
  if (!s || Math.abs(s) == 1 / 0) {
    n = digitsToString(x.d);
    e = x.e;

    // Adjust n exponent so it is a multiple of 3 away from x exponent.
    if (s = (e - n.length + 1) % 3) n += (s == 1 || s == -2 ? '0' : '00');
    s = mathpow(n, 1 / 3);

    // Rarely, e may be one less than the result exponent value.
    e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));

    if (s == 1 / 0) {
      n = '5e' + e;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf('e') + 1) + e;
    }

    r = new Ctor(n);
    r.s = x.s;
  } else {
    r = new Ctor(s.toString());
  }

  sd = (e = Ctor.precision) + 3;

  // Halley's method.
  // TODO? Compare Newton's method.
  for (;;) {
    t = r;
    t3 = t.times(t).times(t);
    t3plusx = t3.plus(x);
    r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);

    // TODO? Replace with for-loop and checkRoundingDigits.
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);

      // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or 4999
      // , i.e. approaching a rounding boundary, continue the iteration.
      if (n == '9999' || !rep && n == '4999') {

        // On the first iteration only, check to see if rounding up gives the exact result as the
        // nines may infinitely repeat.
        if (!rep) {
          finalise(t, e + 1, 0);

          if (t.times(t).times(t).eq(x)) {
            r = t;
            break;
          }
        }

        sd += 4;
        rep = 1;
      } else {

        // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
        // If not, then there are further digits and m will be truthy.
        if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

          // Truncate to the first rounding digit.
          finalise(r, e + 1, 1);
          m = !r.times(r).times(r).eq(x);
        }

        break;
      }
    }
  }

  external = true;

  return finalise(r, e, Ctor.rounding, m);
};


/*
 * Return the number of decimal places of the value of this Decimal.
 *
 */
P$4.decimalPlaces = P$4.dp = function () {
  var w,
    d = this.d,
    n = NaN;

  if (d) {
    w = d.length - 1;
    n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;

    // Subtract the number of trailing zeros of the last word.
    w = d[w];
    if (w) for (; w % 10 == 0; w /= 10) n--;
    if (n < 0) n = 0;
  }

  return n;
};


/*
 *  n / 0 = I
 *  n / N = N
 *  n / I = 0
 *  0 / n = 0
 *  0 / 0 = N
 *  0 / N = N
 *  0 / I = 0
 *  N / n = N
 *  N / 0 = N
 *  N / N = N
 *  N / I = N
 *  I / n = I
 *  I / 0 = I
 *  I / N = N
 *  I / I = N
 *
 * Return a new Decimal whose value is the value of this Decimal divided by `y`, rounded to
 * `precision` significant digits using rounding mode `rounding`.
 *
 */
P$4.dividedBy = P$4.div = function (y) {
  return divide(this, new this.constructor(y));
};


/*
 * Return a new Decimal whose value is the integer part of dividing the value of this Decimal
 * by the value of `y`, rounded to `precision` significant digits using rounding mode `rounding`.
 *
 */
P$4.dividedToIntegerBy = P$4.divToInt = function (y) {
  var x = this,
    Ctor = x.constructor;
  return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
};


/*
 * Return true if the value of this Decimal is equal to the value of `y`, otherwise return false.
 *
 */
P$4.equals = P$4.eq = function (y) {
  return this.cmp(y) === 0;
};


/*
 * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
 * direction of negative Infinity.
 *
 */
P$4.floor = function () {
  return finalise(new this.constructor(this), this.e + 1, 3);
};


/*
 * Return true if the value of this Decimal is greater than the value of `y`, otherwise return
 * false.
 *
 */
P$4.greaterThan = P$4.gt = function (y) {
  return this.cmp(y) > 0;
};


/*
 * Return true if the value of this Decimal is greater than or equal to the value of `y`,
 * otherwise return false.
 *
 */
P$4.greaterThanOrEqualTo = P$4.gte = function (y) {
  var k = this.cmp(y);
  return k == 1 || k === 0;
};


/*
 * Return a new Decimal whose value is the hyperbolic cosine of the value in radians of this
 * Decimal.
 *
 * Domain: [-Infinity, Infinity]
 * Range: [1, Infinity]
 *
 * cosh(x) = 1 + x^2/2! + x^4/4! + x^6/6! + ...
 *
 * cosh(0)         = 1
 * cosh(-0)        = 1
 * cosh(Infinity)  = Infinity
 * cosh(-Infinity) = Infinity
 * cosh(NaN)       = NaN
 *
 *  x        time taken (ms)   result
 * 1000      9                 9.8503555700852349694e+433
 * 10000     25                4.4034091128314607936e+4342
 * 100000    171               1.4033316802130615897e+43429
 * 1000000   3817              1.5166076984010437725e+434294
 * 10000000  abandoned after 2 minute wait
 *
 * TODO? Compare performance of cosh(x) = 0.5 * (exp(x) + exp(-x))
 *
 */
P$4.hyperbolicCosine = P$4.cosh = function () {
  var k, n, pr, rm, len,
    x = this,
    Ctor = x.constructor,
    one = new Ctor(1);

  if (!x.isFinite()) return new Ctor(x.s ? 1 / 0 : NaN);
  if (x.isZero()) return one;

  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
  Ctor.rounding = 1;
  len = x.d.length;

  // Argument reduction: cos(4x) = 1 - 8cos^2(x) + 8cos^4(x) + 1
  // i.e. cos(x) = 1 - cos^2(x/4)(8 - 8cos^2(x/4))

  // Estimate the optimum number of times to use the argument reduction.
  // TODO? Estimation reused from cosine() and may not be optimal here.
  if (len < 32) {
    k = Math.ceil(len / 3);
    n = (1 / tinyPow(4, k)).toString();
  } else {
    k = 16;
    n = '2.3283064365386962890625e-10';
  }

  x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);

  // Reverse argument reduction
  var cosh2_x,
    i = k,
    d8 = new Ctor(8);
  for (; i--;) {
    cosh2_x = x.times(x);
    x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
  }

  return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
};


/*
 * Return a new Decimal whose value is the hyperbolic sine of the value in radians of this
 * Decimal.
 *
 * Domain: [-Infinity, Infinity]
 * Range: [-Infinity, Infinity]
 *
 * sinh(x) = x + x^3/3! + x^5/5! + x^7/7! + ...
 *
 * sinh(0)         = 0
 * sinh(-0)        = -0
 * sinh(Infinity)  = Infinity
 * sinh(-Infinity) = -Infinity
 * sinh(NaN)       = NaN
 *
 * x        time taken (ms)
 * 10       2 ms
 * 100      5 ms
 * 1000     14 ms
 * 10000    82 ms
 * 100000   886 ms            1.4033316802130615897e+43429
 * 200000   2613 ms
 * 300000   5407 ms
 * 400000   8824 ms
 * 500000   13026 ms          8.7080643612718084129e+217146
 * 1000000  48543 ms
 *
 * TODO? Compare performance of sinh(x) = 0.5 * (exp(x) - exp(-x))
 *
 */
P$4.hyperbolicSine = P$4.sinh = function () {
  var k, pr, rm, len,
    x = this,
    Ctor = x.constructor;

  if (!x.isFinite() || x.isZero()) return new Ctor(x);

  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
  Ctor.rounding = 1;
  len = x.d.length;

  if (len < 3) {
    x = taylorSeries(Ctor, 2, x, x, true);
  } else {

    // Alternative argument reduction: sinh(3x) = sinh(x)(3 + 4sinh^2(x))
    // i.e. sinh(x) = sinh(x/3)(3 + 4sinh^2(x/3))
    // 3 multiplications and 1 addition

    // Argument reduction: sinh(5x) = sinh(x)(5 + sinh^2(x)(20 + 16sinh^2(x)))
    // i.e. sinh(x) = sinh(x/5)(5 + sinh^2(x/5)(20 + 16sinh^2(x/5)))
    // 4 multiplications and 2 additions

    // Estimate the optimum number of times to use the argument reduction.
    k = 1.4 * Math.sqrt(len);
    k = k > 16 ? 16 : k | 0;

    x = x.times(1 / tinyPow(5, k));
    x = taylorSeries(Ctor, 2, x, x, true);

    // Reverse argument reduction
    var sinh2_x,
      d5 = new Ctor(5),
      d16 = new Ctor(16),
      d20 = new Ctor(20);
    for (; k--;) {
      sinh2_x = x.times(x);
      x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
    }
  }

  Ctor.precision = pr;
  Ctor.rounding = rm;

  return finalise(x, pr, rm, true);
};


/*
 * Return a new Decimal whose value is the hyperbolic tangent of the value in radians of this
 * Decimal.
 *
 * Domain: [-Infinity, Infinity]
 * Range: [-1, 1]
 *
 * tanh(x) = sinh(x) / cosh(x)
 *
 * tanh(0)         = 0
 * tanh(-0)        = -0
 * tanh(Infinity)  = 1
 * tanh(-Infinity) = -1
 * tanh(NaN)       = NaN
 *
 */
P$4.hyperbolicTangent = P$4.tanh = function () {
  var pr, rm,
    x = this,
    Ctor = x.constructor;

  if (!x.isFinite()) return new Ctor(x.s);
  if (x.isZero()) return new Ctor(x);

  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 7;
  Ctor.rounding = 1;

  return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
};


/*
 * Return a new Decimal whose value is the arccosine (inverse cosine) in radians of the value of
 * this Decimal.
 *
 * Domain: [-1, 1]
 * Range: [0, pi]
 *
 * acos(x) = pi/2 - asin(x)
 *
 * acos(0)       = pi/2
 * acos(-0)      = pi/2
 * acos(1)       = 0
 * acos(-1)      = pi
 * acos(1/2)     = pi/3
 * acos(-1/2)    = 2*pi/3
 * acos(|x| > 1) = NaN
 * acos(NaN)     = NaN
 *
 */
P$4.inverseCosine = P$4.acos = function () {
  var x = this,
    Ctor = x.constructor,
    k = x.abs().cmp(1),
    pr = Ctor.precision,
    rm = Ctor.rounding;

  if (k !== -1) {
    return k === 0
      // |x| is 1
      ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0)
      // |x| > 1 or x is NaN
      : new Ctor(NaN);
  }

  if (x.isZero()) return getPi(Ctor, pr + 4, rm).times(0.5);

  // TODO? Special case acos(0.5) = pi/3 and acos(-0.5) = 2*pi/3

  Ctor.precision = pr + 6;
  Ctor.rounding = 1;

  // See https://github.com/MikeMcl/decimal.js/pull/217
  x = new Ctor(1).minus(x).div(x.plus(1)).sqrt().atan();

  Ctor.precision = pr;
  Ctor.rounding = rm;

  return x.times(2);
};


/*
 * Return a new Decimal whose value is the inverse of the hyperbolic cosine in radians of the
 * value of this Decimal.
 *
 * Domain: [1, Infinity]
 * Range: [0, Infinity]
 *
 * acosh(x) = ln(x + sqrt(x^2 - 1))
 *
 * acosh(x < 1)     = NaN
 * acosh(NaN)       = NaN
 * acosh(Infinity)  = Infinity
 * acosh(-Infinity) = NaN
 * acosh(0)         = NaN
 * acosh(-0)        = NaN
 * acosh(1)         = 0
 * acosh(-1)        = NaN
 *
 */
P$4.inverseHyperbolicCosine = P$4.acosh = function () {
  var pr, rm,
    x = this,
    Ctor = x.constructor;

  if (x.lte(1)) return new Ctor(x.eq(1) ? 0 : NaN);
  if (!x.isFinite()) return new Ctor(x);

  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
  Ctor.rounding = 1;
  external = false;

  x = x.times(x).minus(1).sqrt().plus(x);

  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm;

  return x.ln();
};


/*
 * Return a new Decimal whose value is the inverse of the hyperbolic sine in radians of the value
 * of this Decimal.
 *
 * Domain: [-Infinity, Infinity]
 * Range: [-Infinity, Infinity]
 *
 * asinh(x) = ln(x + sqrt(x^2 + 1))
 *
 * asinh(NaN)       = NaN
 * asinh(Infinity)  = Infinity
 * asinh(-Infinity) = -Infinity
 * asinh(0)         = 0
 * asinh(-0)        = -0
 *
 */
P$4.inverseHyperbolicSine = P$4.asinh = function () {
  var pr, rm,
    x = this,
    Ctor = x.constructor;

  if (!x.isFinite() || x.isZero()) return new Ctor(x);

  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
  Ctor.rounding = 1;
  external = false;

  x = x.times(x).plus(1).sqrt().plus(x);

  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm;

  return x.ln();
};


/*
 * Return a new Decimal whose value is the inverse of the hyperbolic tangent in radians of the
 * value of this Decimal.
 *
 * Domain: [-1, 1]
 * Range: [-Infinity, Infinity]
 *
 * atanh(x) = 0.5 * ln((1 + x) / (1 - x))
 *
 * atanh(|x| > 1)   = NaN
 * atanh(NaN)       = NaN
 * atanh(Infinity)  = NaN
 * atanh(-Infinity) = NaN
 * atanh(0)         = 0
 * atanh(-0)        = -0
 * atanh(1)         = Infinity
 * atanh(-1)        = -Infinity
 *
 */
P$4.inverseHyperbolicTangent = P$4.atanh = function () {
  var pr, rm, wpr, xsd,
    x = this,
    Ctor = x.constructor;

  if (!x.isFinite()) return new Ctor(NaN);
  if (x.e >= 0) return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);

  pr = Ctor.precision;
  rm = Ctor.rounding;
  xsd = x.sd();

  if (Math.max(xsd, pr) < 2 * -x.e - 1) return finalise(new Ctor(x), pr, rm, true);

  Ctor.precision = wpr = xsd - x.e;

  x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);

  Ctor.precision = pr + 4;
  Ctor.rounding = 1;

  x = x.ln();

  Ctor.precision = pr;
  Ctor.rounding = rm;

  return x.times(0.5);
};


/*
 * Return a new Decimal whose value is the arcsine (inverse sine) in radians of the value of this
 * Decimal.
 *
 * Domain: [-Infinity, Infinity]
 * Range: [-pi/2, pi/2]
 *
 * asin(x) = 2*atan(x/(1 + sqrt(1 - x^2)))
 *
 * asin(0)       = 0
 * asin(-0)      = -0
 * asin(1/2)     = pi/6
 * asin(-1/2)    = -pi/6
 * asin(1)       = pi/2
 * asin(-1)      = -pi/2
 * asin(|x| > 1) = NaN
 * asin(NaN)     = NaN
 *
 * TODO? Compare performance of Taylor series.
 *
 */
P$4.inverseSine = P$4.asin = function () {
  var halfPi, k,
    pr, rm,
    x = this,
    Ctor = x.constructor;

  if (x.isZero()) return new Ctor(x);

  k = x.abs().cmp(1);
  pr = Ctor.precision;
  rm = Ctor.rounding;

  if (k !== -1) {

    // |x| is 1
    if (k === 0) {
      halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
      halfPi.s = x.s;
      return halfPi;
    }

    // |x| > 1 or x is NaN
    return new Ctor(NaN);
  }

  // TODO? Special case asin(1/2) = pi/6 and asin(-1/2) = -pi/6

  Ctor.precision = pr + 6;
  Ctor.rounding = 1;

  x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();

  Ctor.precision = pr;
  Ctor.rounding = rm;

  return x.times(2);
};


/*
 * Return a new Decimal whose value is the arctangent (inverse tangent) in radians of the value
 * of this Decimal.
 *
 * Domain: [-Infinity, Infinity]
 * Range: [-pi/2, pi/2]
 *
 * atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
 *
 * atan(0)         = 0
 * atan(-0)        = -0
 * atan(1)         = pi/4
 * atan(-1)        = -pi/4
 * atan(Infinity)  = pi/2
 * atan(-Infinity) = -pi/2
 * atan(NaN)       = NaN
 *
 */
P$4.inverseTangent = P$4.atan = function () {
  var i, j, k, n, px, t, r, wpr, x2,
    x = this,
    Ctor = x.constructor,
    pr = Ctor.precision,
    rm = Ctor.rounding;

  if (!x.isFinite()) {
    if (!x.s) return new Ctor(NaN);
    if (pr + 4 <= PI_PRECISION) {
      r = getPi(Ctor, pr + 4, rm).times(0.5);
      r.s = x.s;
      return r;
    }
  } else if (x.isZero()) {
    return new Ctor(x);
  } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
    r = getPi(Ctor, pr + 4, rm).times(0.25);
    r.s = x.s;
    return r;
  }

  Ctor.precision = wpr = pr + 10;
  Ctor.rounding = 1;

  // TODO? if (x >= 1 && pr <= PI_PRECISION) atan(x) = halfPi * x.s - atan(1 / x);

  // Argument reduction
  // Ensure |x| < 0.42
  // atan(x) = 2 * atan(x / (1 + sqrt(1 + x^2)))

  k = Math.min(28, wpr / LOG_BASE + 2 | 0);

  for (i = k; i; --i) x = x.div(x.times(x).plus(1).sqrt().plus(1));

  external = false;

  j = Math.ceil(wpr / LOG_BASE);
  n = 1;
  x2 = x.times(x);
  r = new Ctor(x);
  px = x;

  // atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
  for (; i !== -1;) {
    px = px.times(x2);
    t = r.minus(px.div(n += 2));

    px = px.times(x2);
    r = t.plus(px.div(n += 2));

    if (r.d[j] !== void 0) for (i = j; r.d[i] === t.d[i] && i--;);
  }

  if (k) r = r.times(2 << (k - 1));

  external = true;

  return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
};


/*
 * Return true if the value of this Decimal is a finite number, otherwise return false.
 *
 */
P$4.isFinite = function () {
  return !!this.d;
};


/*
 * Return true if the value of this Decimal is an integer, otherwise return false.
 *
 */
P$4.isInteger = P$4.isInt = function () {
  return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
};


/*
 * Return true if the value of this Decimal is NaN, otherwise return false.
 *
 */
P$4.isNaN = function () {
  return !this.s;
};


/*
 * Return true if the value of this Decimal is negative, otherwise return false.
 *
 */
P$4.isNegative = P$4.isNeg = function () {
  return this.s < 0;
};


/*
 * Return true if the value of this Decimal is positive, otherwise return false.
 *
 */
P$4.isPositive = P$4.isPos = function () {
  return this.s > 0;
};


/*
 * Return true if the value of this Decimal is 0 or -0, otherwise return false.
 *
 */
P$4.isZero = function () {
  return !!this.d && this.d[0] === 0;
};


/*
 * Return true if the value of this Decimal is less than `y`, otherwise return false.
 *
 */
P$4.lessThan = P$4.lt = function (y) {
  return this.cmp(y) < 0;
};


/*
 * Return true if the value of this Decimal is less than or equal to `y`, otherwise return false.
 *
 */
P$4.lessThanOrEqualTo = P$4.lte = function (y) {
  return this.cmp(y) < 1;
};


/*
 * Return the logarithm of the value of this Decimal to the specified base, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 * If no base is specified, return log[10](arg).
 *
 * log[base](arg) = ln(arg) / ln(base)
 *
 * The result will always be correctly rounded if the base of the log is 10, and 'almost always'
 * otherwise:
 *
 * Depending on the rounding mode, the result may be incorrectly rounded if the first fifteen
 * rounding digits are [49]99999999999999 or [50]00000000000000. In that case, the maximum error
 * between the result and the correctly rounded result will be one ulp (unit in the last place).
 *
 * log[-b](a)       = NaN
 * log[0](a)        = NaN
 * log[1](a)        = NaN
 * log[NaN](a)      = NaN
 * log[Infinity](a) = NaN
 * log[b](0)        = -Infinity
 * log[b](-0)       = -Infinity
 * log[b](-a)       = NaN
 * log[b](1)        = 0
 * log[b](Infinity) = Infinity
 * log[b](NaN)      = NaN
 *
 * [base] {number|string|bigint|Decimal} The base of the logarithm.
 *
 */
P$4.logarithm = P$4.log = function (base) {
  var isBase10, d, denominator, k, inf, num, sd, r,
    arg = this,
    Ctor = arg.constructor,
    pr = Ctor.precision,
    rm = Ctor.rounding,
    guard = 5;

  // Default base is 10.
  if (base == null) {
    base = new Ctor(10);
    isBase10 = true;
  } else {
    base = new Ctor(base);
    d = base.d;

    // Return NaN if base is negative, or non-finite, or is 0 or 1.
    if (base.s < 0 || !d || !d[0] || base.eq(1)) return new Ctor(NaN);

    isBase10 = base.eq(10);
  }

  d = arg.d;

  // Is arg negative, non-finite, 0 or 1?
  if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
    return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
  }

  // The result will have a non-terminating decimal expansion if base is 10 and arg is not an
  // integer power of 10.
  if (isBase10) {
    if (d.length > 1) {
      inf = true;
    } else {
      for (k = d[0]; k % 10 === 0;) k /= 10;
      inf = k !== 1;
    }
  }

  external = false;
  sd = pr + guard;
  num = naturalLogarithm(arg, sd);
  denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);

  // The result will have 5 rounding digits.
  r = divide(num, denominator, sd, 1);

  // If at a rounding boundary, i.e. the result's rounding digits are [49]9999 or [50]0000,
  // calculate 10 further digits.
  //
  // If the result is known to have an infinite decimal expansion, repeat this until it is clear
  // that the result is above or below the boundary. Otherwise, if after calculating the 10
  // further digits, the last 14 are nines, round up and assume the result is exact.
  // Also assume the result is exact if the last 14 are zero.
  //
  // Example of a result that will be incorrectly rounded:
  // log[1048576](4503599627370502) = 2.60000000000000009610279511444746...
  // The above result correctly rounded using ROUND_CEIL to 1 decimal place should be 2.7, but it
  // will be given as 2.6 as there are 15 zeros immediately after the requested decimal place, so
  // the exact result would be assumed to be 2.6, which rounded using ROUND_CEIL to 1 decimal
  // place is still 2.6.
  if (checkRoundingDigits(r.d, k = pr, rm)) {

    do {
      sd += 10;
      num = naturalLogarithm(arg, sd);
      denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
      r = divide(num, denominator, sd, 1);

      if (!inf) {

        // Check for 14 nines from the 2nd rounding digit, as the first may be 4.
        if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
          r = finalise(r, pr + 1, 0);
        }

        break;
      }
    } while (checkRoundingDigits(r.d, k += 10, rm));
  }

  external = true;

  return finalise(r, pr, rm);
};


/*
 * Return a new Decimal whose value is the maximum of the arguments and the value of this Decimal.
 *
 * arguments {number|string|bigint|Decimal}
 *
P.max = function () {
  Array.prototype.push.call(arguments, this);
  return maxOrMin(this.constructor, arguments, -1);
};
 */


/*
 * Return a new Decimal whose value is the minimum of the arguments and the value of this Decimal.
 *
 * arguments {number|string|bigint|Decimal}
 *
P.min = function () {
  Array.prototype.push.call(arguments, this);
  return maxOrMin(this.constructor, arguments, 1);
};
 */


/*
 *  n - 0 = n
 *  n - N = N
 *  n - I = -I
 *  0 - n = -n
 *  0 - 0 = 0
 *  0 - N = N
 *  0 - I = -I
 *  N - n = N
 *  N - 0 = N
 *  N - N = N
 *  N - I = N
 *  I - n = I
 *  I - 0 = I
 *  I - N = N
 *  I - I = N
 *
 * Return a new Decimal whose value is the value of this Decimal minus `y`, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 */
P$4.minus = P$4.sub = function (y) {
  var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd,
    x = this,
    Ctor = x.constructor;

  y = new Ctor(y);

  // If either is not finite...
  if (!x.d || !y.d) {

    // Return NaN if either is NaN.
    if (!x.s || !y.s) y = new Ctor(NaN);

    // Return y negated if x is finite and y is ±Infinity.
    else if (x.d) y.s = -y.s;

    // Return x if y is finite and x is ±Infinity.
    // Return x if both are ±Infinity with different signs.
    // Return NaN if both are ±Infinity with the same sign.
    else y = new Ctor(y.d || x.s !== y.s ? x : NaN);

    return y;
  }

  // If signs differ...
  if (x.s != y.s) {
    y.s = -y.s;
    return x.plus(y);
  }

  xd = x.d;
  yd = y.d;
  pr = Ctor.precision;
  rm = Ctor.rounding;

  // If either is zero...
  if (!xd[0] || !yd[0]) {

    // Return y negated if x is zero and y is non-zero.
    if (yd[0]) y.s = -y.s;

    // Return x if y is zero and x is non-zero.
    else if (xd[0]) y = new Ctor(x);

    // Return zero if both are zero.
    // From IEEE 754 (2008) 6.3: 0 - 0 = -0 - -0 = -0 when rounding to -Infinity.
    else return new Ctor(rm === 3 ? -0 : 0);

    return external ? finalise(y, pr, rm) : y;
  }

  // x and y are finite, non-zero numbers with the same sign.

  // Calculate base 1e7 exponents.
  e = mathfloor(y.e / LOG_BASE);
  xe = mathfloor(x.e / LOG_BASE);

  xd = xd.slice();
  k = xe - e;

  // If base 1e7 exponents differ...
  if (k) {
    xLTy = k < 0;

    if (xLTy) {
      d = xd;
      k = -k;
      len = yd.length;
    } else {
      d = yd;
      e = xe;
      len = xd.length;
    }

    // Numbers with massively different exponents would result in a very high number of
    // zeros needing to be prepended, but this can be avoided while still ensuring correct
    // rounding by limiting the number of zeros to `Math.ceil(pr / LOG_BASE) + 2`.
    i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;

    if (k > i) {
      k = i;
      d.length = 1;
    }

    // Prepend zeros to equalise exponents.
    d.reverse();
    for (i = k; i--;) d.push(0);
    d.reverse();

  // Base 1e7 exponents equal.
  } else {

    // Check digits to determine which is the bigger number.

    i = xd.length;
    len = yd.length;
    xLTy = i < len;
    if (xLTy) len = i;

    for (i = 0; i < len; i++) {
      if (xd[i] != yd[i]) {
        xLTy = xd[i] < yd[i];
        break;
      }
    }

    k = 0;
  }

  if (xLTy) {
    d = xd;
    xd = yd;
    yd = d;
    y.s = -y.s;
  }

  len = xd.length;

  // Append zeros to `xd` if shorter.
  // Don't add zeros to `yd` if shorter as subtraction only needs to start at `yd` length.
  for (i = yd.length - len; i > 0; --i) xd[len++] = 0;

  // Subtract yd from xd.
  for (i = yd.length; i > k;) {

    if (xd[--i] < yd[i]) {
      for (j = i; j && xd[--j] === 0;) xd[j] = BASE - 1;
      --xd[j];
      xd[i] += BASE;
    }

    xd[i] -= yd[i];
  }

  // Remove trailing zeros.
  for (; xd[--len] === 0;) xd.pop();

  // Remove leading zeros and adjust exponent accordingly.
  for (; xd[0] === 0; xd.shift()) --e;

  // Zero?
  if (!xd[0]) return new Ctor(rm === 3 ? -0 : 0);

  y.d = xd;
  y.e = getBase10Exponent(xd, e);

  return external ? finalise(y, pr, rm) : y;
};


/*
 *   n % 0 =  N
 *   n % N =  N
 *   n % I =  n
 *   0 % n =  0
 *  -0 % n = -0
 *   0 % 0 =  N
 *   0 % N =  N
 *   0 % I =  0
 *   N % n =  N
 *   N % 0 =  N
 *   N % N =  N
 *   N % I =  N
 *   I % n =  N
 *   I % 0 =  N
 *   I % N =  N
 *   I % I =  N
 *
 * Return a new Decimal whose value is the value of this Decimal modulo `y`, rounded to
 * `precision` significant digits using rounding mode `rounding`.
 *
 * The result depends on the modulo mode.
 *
 */
P$4.modulo = P$4.mod = function (y) {
  var q,
    x = this,
    Ctor = x.constructor;

  y = new Ctor(y);

  // Return NaN if x is ±Infinity or NaN, or y is NaN or ±0.
  if (!x.d || !y.s || y.d && !y.d[0]) return new Ctor(NaN);

  // Return x if y is ±Infinity or x is ±0.
  if (!y.d || x.d && !x.d[0]) {
    return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
  }

  // Prevent rounding of intermediate calculations.
  external = false;

  if (Ctor.modulo == 9) {

    // Euclidian division: q = sign(y) * floor(x / abs(y))
    // result = x - q * y    where  0 <= result < abs(y)
    q = divide(x, y.abs(), 0, 3, 1);
    q.s *= y.s;
  } else {
    q = divide(x, y, 0, Ctor.modulo, 1);
  }

  q = q.times(y);

  external = true;

  return x.minus(q);
};


/*
 * Return a new Decimal whose value is the natural exponential of the value of this Decimal,
 * i.e. the base e raised to the power the value of this Decimal, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 */
P$4.naturalExponential = P$4.exp = function () {
  return naturalExponential(this);
};


/*
 * Return a new Decimal whose value is the natural logarithm of the value of this Decimal,
 * rounded to `precision` significant digits using rounding mode `rounding`.
 *
 */
P$4.naturalLogarithm = P$4.ln = function () {
  return naturalLogarithm(this);
};


/*
 * Return a new Decimal whose value is the value of this Decimal negated, i.e. as if multiplied by
 * -1.
 *
 */
P$4.negated = P$4.neg = function () {
  var x = new this.constructor(this);
  x.s = -x.s;
  return finalise(x);
};


/*
 *  n + 0 = n
 *  n + N = N
 *  n + I = I
 *  0 + n = n
 *  0 + 0 = 0
 *  0 + N = N
 *  0 + I = I
 *  N + n = N
 *  N + 0 = N
 *  N + N = N
 *  N + I = N
 *  I + n = I
 *  I + 0 = I
 *  I + N = N
 *  I + I = I
 *
 * Return a new Decimal whose value is the value of this Decimal plus `y`, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 */
P$4.plus = P$4.add = function (y) {
  var carry, d, e, i, k, len, pr, rm, xd, yd,
    x = this,
    Ctor = x.constructor;

  y = new Ctor(y);

  // If either is not finite...
  if (!x.d || !y.d) {

    // Return NaN if either is NaN.
    if (!x.s || !y.s) y = new Ctor(NaN);

    // Return x if y is finite and x is ±Infinity.
    // Return x if both are ±Infinity with the same sign.
    // Return NaN if both are ±Infinity with different signs.
    // Return y if x is finite and y is ±Infinity.
    else if (!x.d) y = new Ctor(y.d || x.s === y.s ? x : NaN);

    return y;
  }

   // If signs differ...
  if (x.s != y.s) {
    y.s = -y.s;
    return x.minus(y);
  }

  xd = x.d;
  yd = y.d;
  pr = Ctor.precision;
  rm = Ctor.rounding;

  // If either is zero...
  if (!xd[0] || !yd[0]) {

    // Return x if y is zero.
    // Return y if y is non-zero.
    if (!yd[0]) y = new Ctor(x);

    return external ? finalise(y, pr, rm) : y;
  }

  // x and y are finite, non-zero numbers with the same sign.

  // Calculate base 1e7 exponents.
  k = mathfloor(x.e / LOG_BASE);
  e = mathfloor(y.e / LOG_BASE);

  xd = xd.slice();
  i = k - e;

  // If base 1e7 exponents differ...
  if (i) {

    if (i < 0) {
      d = xd;
      i = -i;
      len = yd.length;
    } else {
      d = yd;
      e = k;
      len = xd.length;
    }

    // Limit number of zeros prepended to max(ceil(pr / LOG_BASE), len) + 1.
    k = Math.ceil(pr / LOG_BASE);
    len = k > len ? k + 1 : len + 1;

    if (i > len) {
      i = len;
      d.length = 1;
    }

    // Prepend zeros to equalise exponents. Note: Faster to use reverse then do unshifts.
    d.reverse();
    for (; i--;) d.push(0);
    d.reverse();
  }

  len = xd.length;
  i = yd.length;

  // If yd is longer than xd, swap xd and yd so xd points to the longer array.
  if (len - i < 0) {
    i = len;
    d = yd;
    yd = xd;
    xd = d;
  }

  // Only start adding at yd.length - 1 as the further digits of xd can be left as they are.
  for (carry = 0; i;) {
    carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
    xd[i] %= BASE;
  }

  if (carry) {
    xd.unshift(carry);
    ++e;
  }

  // Remove trailing zeros.
  // No need to check for zero, as +x + +y != 0 && -x + -y != 0
  for (len = xd.length; xd[--len] == 0;) xd.pop();

  y.d = xd;
  y.e = getBase10Exponent(xd, e);

  return external ? finalise(y, pr, rm) : y;
};


/*
 * Return the number of significant digits of the value of this Decimal.
 *
 * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
 *
 */
P$4.precision = P$4.sd = function (z) {
  var k,
    x = this;

  if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);

  if (x.d) {
    k = getPrecision(x.d);
    if (z && x.e + 1 > k) k = x.e + 1;
  } else {
    k = NaN;
  }

  return k;
};


/*
 * Return a new Decimal whose value is the value of this Decimal rounded to a whole number using
 * rounding mode `rounding`.
 *
 */
P$4.round = function () {
  var x = this,
    Ctor = x.constructor;

  return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
};


/*
 * Return a new Decimal whose value is the sine of the value in radians of this Decimal.
 *
 * Domain: [-Infinity, Infinity]
 * Range: [-1, 1]
 *
 * sin(x) = x - x^3/3! + x^5/5! - ...
 *
 * sin(0)         = 0
 * sin(-0)        = -0
 * sin(Infinity)  = NaN
 * sin(-Infinity) = NaN
 * sin(NaN)       = NaN
 *
 */
P$4.sine = P$4.sin = function () {
  var pr, rm,
    x = this,
    Ctor = x.constructor;

  if (!x.isFinite()) return new Ctor(NaN);
  if (x.isZero()) return new Ctor(x);

  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
  Ctor.rounding = 1;

  x = sine(Ctor, toLessThanHalfPi(Ctor, x));

  Ctor.precision = pr;
  Ctor.rounding = rm;

  return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
};


/*
 * Return a new Decimal whose value is the square root of this Decimal, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 *  sqrt(-n) =  N
 *  sqrt(N)  =  N
 *  sqrt(-I) =  N
 *  sqrt(I)  =  I
 *  sqrt(0)  =  0
 *  sqrt(-0) = -0
 *
 */
P$4.squareRoot = P$4.sqrt = function () {
  var m, n, sd, r, rep, t,
    x = this,
    d = x.d,
    e = x.e,
    s = x.s,
    Ctor = x.constructor;

  // Negative/NaN/Infinity/zero?
  if (s !== 1 || !d || !d[0]) {
    return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
  }

  external = false;

  // Initial estimate.
  s = Math.sqrt(+x);

  // Math.sqrt underflow/overflow?
  // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
  if (s == 0 || s == 1 / 0) {
    n = digitsToString(d);

    if ((n.length + e) % 2 == 0) n += '0';
    s = Math.sqrt(n);
    e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);

    if (s == 1 / 0) {
      n = '5e' + e;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf('e') + 1) + e;
    }

    r = new Ctor(n);
  } else {
    r = new Ctor(s.toString());
  }

  sd = (e = Ctor.precision) + 3;

  // Newton-Raphson iteration.
  for (;;) {
    t = r;
    r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);

    // TODO? Replace with for-loop and checkRoundingDigits.
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);

      // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or
      // 4999, i.e. approaching a rounding boundary, continue the iteration.
      if (n == '9999' || !rep && n == '4999') {

        // On the first iteration only, check to see if rounding up gives the exact result as the
        // nines may infinitely repeat.
        if (!rep) {
          finalise(t, e + 1, 0);

          if (t.times(t).eq(x)) {
            r = t;
            break;
          }
        }

        sd += 4;
        rep = 1;
      } else {

        // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
        // If not, then there are further digits and m will be truthy.
        if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

          // Truncate to the first rounding digit.
          finalise(r, e + 1, 1);
          m = !r.times(r).eq(x);
        }

        break;
      }
    }
  }

  external = true;

  return finalise(r, e, Ctor.rounding, m);
};


/*
 * Return a new Decimal whose value is the tangent of the value in radians of this Decimal.
 *
 * Domain: [-Infinity, Infinity]
 * Range: [-Infinity, Infinity]
 *
 * tan(0)         = 0
 * tan(-0)        = -0
 * tan(Infinity)  = NaN
 * tan(-Infinity) = NaN
 * tan(NaN)       = NaN
 *
 */
P$4.tangent = P$4.tan = function () {
  var pr, rm,
    x = this,
    Ctor = x.constructor;

  if (!x.isFinite()) return new Ctor(NaN);
  if (x.isZero()) return new Ctor(x);

  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 10;
  Ctor.rounding = 1;

  x = x.sin();
  x.s = 1;
  x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);

  Ctor.precision = pr;
  Ctor.rounding = rm;

  return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
};


/*
 *  n * 0 = 0
 *  n * N = N
 *  n * I = I
 *  0 * n = 0
 *  0 * 0 = 0
 *  0 * N = N
 *  0 * I = N
 *  N * n = N
 *  N * 0 = N
 *  N * N = N
 *  N * I = N
 *  I * n = I
 *  I * 0 = N
 *  I * N = N
 *  I * I = I
 *
 * Return a new Decimal whose value is this Decimal times `y`, rounded to `precision` significant
 * digits using rounding mode `rounding`.
 *
 */
P$4.times = P$4.mul = function (y) {
  var carry, e, i, k, r, rL, t, xdL, ydL,
    x = this,
    Ctor = x.constructor,
    xd = x.d,
    yd = (y = new Ctor(y)).d;

  y.s *= x.s;

   // If either is NaN, ±Infinity or ±0...
  if (!xd || !xd[0] || !yd || !yd[0]) {

    return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd

      // Return NaN if either is NaN.
      // Return NaN if x is ±0 and y is ±Infinity, or y is ±0 and x is ±Infinity.
      ? NaN

      // Return ±Infinity if either is ±Infinity.
      // Return ±0 if either is ±0.
      : !xd || !yd ? y.s / 0 : y.s * 0);
  }

  e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
  xdL = xd.length;
  ydL = yd.length;

  // Ensure xd points to the longer array.
  if (xdL < ydL) {
    r = xd;
    xd = yd;
    yd = r;
    rL = xdL;
    xdL = ydL;
    ydL = rL;
  }

  // Initialise the result array with zeros.
  r = [];
  rL = xdL + ydL;
  for (i = rL; i--;) r.push(0);

  // Multiply!
  for (i = ydL; --i >= 0;) {
    carry = 0;
    for (k = xdL + i; k > i;) {
      t = r[k] + yd[i] * xd[k - i - 1] + carry;
      r[k--] = t % BASE | 0;
      carry = t / BASE | 0;
    }

    r[k] = (r[k] + carry) % BASE | 0;
  }

  // Remove trailing zeros.
  for (; !r[--rL];) r.pop();

  if (carry) ++e;
  else r.shift();

  y.d = r;
  y.e = getBase10Exponent(r, e);

  return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
};


/*
 * Return a string representing the value of this Decimal in base 2, round to `sd` significant
 * digits using rounding mode `rm`.
 *
 * If the optional `sd` argument is present then return binary exponential notation.
 *
 * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 */
P$4.toBinary = function (sd, rm) {
  return toStringBinary(this, 2, sd, rm);
};


/*
 * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `dp`
 * decimal places using rounding mode `rm` or `rounding` if `rm` is omitted.
 *
 * If `dp` is omitted, return a new Decimal whose value is the value of this Decimal.
 *
 * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 */
P$4.toDecimalPlaces = P$4.toDP = function (dp, rm) {
  var x = this,
    Ctor = x.constructor;

  x = new Ctor(x);
  if (dp === void 0) return x;

  checkInt32(dp, 0, MAX_DIGITS);

  if (rm === void 0) rm = Ctor.rounding;
  else checkInt32(rm, 0, 8);

  return finalise(x, dp + x.e + 1, rm);
};


/*
 * Return a string representing the value of this Decimal in exponential notation rounded to
 * `dp` fixed decimal places using rounding mode `rounding`.
 *
 * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 */
P$4.toExponential = function (dp, rm) {
  var str,
    x = this,
    Ctor = x.constructor;

  if (dp === void 0) {
    str = finiteToString(x, true);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);

    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);

    x = finalise(new Ctor(x), dp + 1, rm);
    str = finiteToString(x, true, dp + 1);
  }

  return x.isNeg() && !x.isZero() ? '-' + str : str;
};


/*
 * Return a string representing the value of this Decimal in normal (fixed-point) notation to
 * `dp` fixed decimal places and rounded using rounding mode `rm` or `rounding` if `rm` is
 * omitted.
 *
 * As with JavaScript numbers, (-0).toFixed(0) is '0', but e.g. (-0.00001).toFixed(0) is '-0'.
 *
 * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
 * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
 * (-0).toFixed(3) is '0.000'.
 * (-0.5).toFixed(0) is '-0'.
 *
 */
P$4.toFixed = function (dp, rm) {
  var str, y,
    x = this,
    Ctor = x.constructor;

  if (dp === void 0) {
    str = finiteToString(x);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);

    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);

    y = finalise(new Ctor(x), dp + x.e + 1, rm);
    str = finiteToString(y, false, dp + y.e + 1);
  }

  // To determine whether to add the minus sign look at the value before it was rounded,
  // i.e. look at `x` rather than `y`.
  return x.isNeg() && !x.isZero() ? '-' + str : str;
};


/*
 * Return an array representing the value of this Decimal as a simple fraction with an integer
 * numerator and an integer denominator.
 *
 * The denominator will be a positive non-zero value less than or equal to the specified maximum
 * denominator. If a maximum denominator is not specified, the denominator will be the lowest
 * value necessary to represent the number exactly.
 *
 * [maxD] {number|string|bigint|Decimal} Maximum denominator. Integer >= 1 and < Infinity.
 *
 */
P$4.toFraction = function (maxD) {
  var d, d0, d1, d2, e, k, n, n0, n1, pr, q, r,
    x = this,
    xd = x.d,
    Ctor = x.constructor;

  if (!xd) return new Ctor(x);

  n1 = d0 = new Ctor(1);
  d1 = n0 = new Ctor(0);

  d = new Ctor(d1);
  e = d.e = getPrecision(xd) - x.e - 1;
  k = e % LOG_BASE;
  d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);

  if (maxD == null) {

    // d is 10**e, the minimum max-denominator needed.
    maxD = e > 0 ? d : n1;
  } else {
    n = new Ctor(maxD);
    if (!n.isInt() || n.lt(n1)) throw Error(invalidArgument + n);
    maxD = n.gt(d) ? (e > 0 ? d : n1) : n;
  }

  external = false;
  n = new Ctor(digitsToString(xd));
  pr = Ctor.precision;
  Ctor.precision = e = xd.length * LOG_BASE * 2;

  for (;;)  {
    q = divide(n, d, 0, 1, 1);
    d2 = d0.plus(q.times(d1));
    if (d2.cmp(maxD) == 1) break;
    d0 = d1;
    d1 = d2;
    d2 = n1;
    n1 = n0.plus(q.times(d2));
    n0 = d2;
    d2 = d;
    d = n.minus(q.times(d2));
    n = d2;
  }

  d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
  n0 = n0.plus(d2.times(n1));
  d0 = d0.plus(d2.times(d1));
  n0.s = n1.s = x.s;

  // Determine which fraction is closer to x, n0/d0 or n1/d1?
  r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1
      ? [n1, d1] : [n0, d0];

  Ctor.precision = pr;
  external = true;

  return r;
};


/*
 * Return a string representing the value of this Decimal in base 16, round to `sd` significant
 * digits using rounding mode `rm`.
 *
 * If the optional `sd` argument is present then return binary exponential notation.
 *
 * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 */
P$4.toHexadecimal = P$4.toHex = function (sd, rm) {
  return toStringBinary(this, 16, sd, rm);
};


/*
 * Returns a new Decimal whose value is the nearest multiple of `y` in the direction of rounding
 * mode `rm`, or `Decimal.rounding` if `rm` is omitted, to the value of this Decimal.
 *
 * The return value will always have the same sign as this Decimal, unless either this Decimal
 * or `y` is NaN, in which case the return value will be also be NaN.
 *
 * The return value is not affected by the value of `precision`.
 *
 * y {number|string|bigint|Decimal} The magnitude to round to a multiple of.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 * 'toNearest() rounding mode not an integer: {rm}'
 * 'toNearest() rounding mode out of range: {rm}'
 *
 */
P$4.toNearest = function (y, rm) {
  var x = this,
    Ctor = x.constructor;

  x = new Ctor(x);

  if (y == null) {

    // If x is not finite, return x.
    if (!x.d) return x;

    y = new Ctor(1);
    rm = Ctor.rounding;
  } else {
    y = new Ctor(y);
    if (rm === void 0) {
      rm = Ctor.rounding;
    } else {
      checkInt32(rm, 0, 8);
    }

    // If x is not finite, return x if y is not NaN, else NaN.
    if (!x.d) return y.s ? x : y;

    // If y is not finite, return Infinity with the sign of x if y is Infinity, else NaN.
    if (!y.d) {
      if (y.s) y.s = x.s;
      return y;
    }
  }

  // If y is not zero, calculate the nearest multiple of y to x.
  if (y.d[0]) {
    external = false;
    x = divide(x, y, 0, rm, 1).times(y);
    external = true;
    finalise(x);

  // If y is zero, return zero with the sign of x.
  } else {
    y.s = x.s;
    x = y;
  }

  return x;
};


/*
 * Return the value of this Decimal converted to a number primitive.
 * Zero keeps its sign.
 *
 */
P$4.toNumber = function () {
  return +this;
};


/*
 * Return a string representing the value of this Decimal in base 8, round to `sd` significant
 * digits using rounding mode `rm`.
 *
 * If the optional `sd` argument is present then return binary exponential notation.
 *
 * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 */
P$4.toOctal = function (sd, rm) {
  return toStringBinary(this, 8, sd, rm);
};


/*
 * Return a new Decimal whose value is the value of this Decimal raised to the power `y`, rounded
 * to `precision` significant digits using rounding mode `rounding`.
 *
 * ECMAScript compliant.
 *
 *   pow(x, NaN)                           = NaN
 *   pow(x, ±0)                            = 1

 *   pow(NaN, non-zero)                    = NaN
 *   pow(abs(x) > 1, +Infinity)            = +Infinity
 *   pow(abs(x) > 1, -Infinity)            = +0
 *   pow(abs(x) == 1, ±Infinity)           = NaN
 *   pow(abs(x) < 1, +Infinity)            = +0
 *   pow(abs(x) < 1, -Infinity)            = +Infinity
 *   pow(+Infinity, y > 0)                 = +Infinity
 *   pow(+Infinity, y < 0)                 = +0
 *   pow(-Infinity, odd integer > 0)       = -Infinity
 *   pow(-Infinity, even integer > 0)      = +Infinity
 *   pow(-Infinity, odd integer < 0)       = -0
 *   pow(-Infinity, even integer < 0)      = +0
 *   pow(+0, y > 0)                        = +0
 *   pow(+0, y < 0)                        = +Infinity
 *   pow(-0, odd integer > 0)              = -0
 *   pow(-0, even integer > 0)             = +0
 *   pow(-0, odd integer < 0)              = -Infinity
 *   pow(-0, even integer < 0)             = +Infinity
 *   pow(finite x < 0, finite non-integer) = NaN
 *
 * For non-integer or very large exponents pow(x, y) is calculated using
 *
 *   x^y = exp(y*ln(x))
 *
 * Assuming the first 15 rounding digits are each equally likely to be any digit 0-9, the
 * probability of an incorrectly rounded result
 * P([49]9{14} | [50]0{14}) = 2 * 0.2 * 10^-14 = 4e-15 = 1/2.5e+14
 * i.e. 1 in 250,000,000,000,000
 *
 * If a result is incorrectly rounded the maximum error will be 1 ulp (unit in last place).
 *
 * y {number|string|bigint|Decimal} The power to which to raise this Decimal.
 *
 */
P$4.toPower = P$4.pow = function (y) {
  var e, k, pr, r, rm, s,
    x = this,
    Ctor = x.constructor,
    yn = +(y = new Ctor(y));

  // Either ±Infinity, NaN or ±0?
  if (!x.d || !y.d || !x.d[0] || !y.d[0]) return new Ctor(mathpow(+x, yn));

  x = new Ctor(x);

  if (x.eq(1)) return x;

  pr = Ctor.precision;
  rm = Ctor.rounding;

  if (y.eq(1)) return finalise(x, pr, rm);

  // y exponent
  e = mathfloor(y.e / LOG_BASE);

  // If y is a small integer use the 'exponentiation by squaring' algorithm.
  if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
    r = intPow(Ctor, x, k, pr);
    return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
  }

  s = x.s;

  // if x is negative
  if (s < 0) {

    // if y is not an integer
    if (e < y.d.length - 1) return new Ctor(NaN);

    // Result is positive if x is negative and the last digit of integer y is even.
    if ((y.d[e] & 1) == 0) s = 1;

    // if x.eq(-1)
    if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
      x.s = s;
      return x;
    }
  }

  // Estimate result exponent.
  // x^y = 10^e,  where e = y * log10(x)
  // log10(x) = log10(x_significand) + x_exponent
  // log10(x_significand) = ln(x_significand) / ln(10)
  k = mathpow(+x, yn);
  e = k == 0 || !isFinite(k)
    ? mathfloor(yn * (Math.log('0.' + digitsToString(x.d)) / Math.LN10 + x.e + 1))
    : new Ctor(k + '').e;

  // Exponent estimate may be incorrect e.g. x: 0.999999999999999999, y: 2.29, e: 0, r.e: -1.

  // Overflow/underflow?
  if (e > Ctor.maxE + 1 || e < Ctor.minE - 1) return new Ctor(e > 0 ? s / 0 : 0);

  external = false;
  Ctor.rounding = x.s = 1;

  // Estimate the extra guard digits needed to ensure five correct rounding digits from
  // naturalLogarithm(x). Example of failure without these extra digits (precision: 10):
  // new Decimal(2.32456).pow('2087987436534566.46411')
  // should be 1.162377823e+764914905173815, but is 1.162355823e+764914905173815
  k = Math.min(12, (e + '').length);

  // r = x^y = exp(y*ln(x))
  r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);

  // r may be Infinity, e.g. (0.9999999999999999).pow(-1e+40)
  if (r.d) {

    // Truncate to the required precision plus five rounding digits.
    r = finalise(r, pr + 5, 1);

    // If the rounding digits are [49]9999 or [50]0000 increase the precision by 10 and recalculate
    // the result.
    if (checkRoundingDigits(r.d, pr, rm)) {
      e = pr + 10;

      // Truncate to the increased precision plus five rounding digits.
      r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);

      // Check for 14 nines from the 2nd rounding digit (the first rounding digit may be 4 or 9).
      if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
        r = finalise(r, pr + 1, 0);
      }
    }
  }

  r.s = s;
  external = true;
  Ctor.rounding = rm;

  return finalise(r, pr, rm);
};


/*
 * Return a string representing the value of this Decimal rounded to `sd` significant digits
 * using rounding mode `rounding`.
 *
 * Return exponential notation if `sd` is less than the number of digits necessary to represent
 * the integer part of the value in normal notation.
 *
 * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 */
P$4.toPrecision = function (sd, rm) {
  var str,
    x = this,
    Ctor = x.constructor;

  if (sd === void 0) {
    str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  } else {
    checkInt32(sd, 1, MAX_DIGITS);

    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);

    x = finalise(new Ctor(x), sd, rm);
    str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
  }

  return x.isNeg() && !x.isZero() ? '-' + str : str;
};


/*
 * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `sd`
 * significant digits using rounding mode `rm`, or to `precision` and `rounding` respectively if
 * omitted.
 *
 * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
 *
 * 'toSD() digits out of range: {sd}'
 * 'toSD() digits not an integer: {sd}'
 * 'toSD() rounding mode not an integer: {rm}'
 * 'toSD() rounding mode out of range: {rm}'
 *
 */
P$4.toSignificantDigits = P$4.toSD = function (sd, rm) {
  var x = this,
    Ctor = x.constructor;

  if (sd === void 0) {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  } else {
    checkInt32(sd, 1, MAX_DIGITS);

    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
  }

  return finalise(new Ctor(x), sd, rm);
};


/*
 * Return a string representing the value of this Decimal.
 *
 * Return exponential notation if this Decimal has a positive exponent equal to or greater than
 * `toExpPos`, or a negative exponent equal to or less than `toExpNeg`.
 *
 */
P$4.toString = function () {
  var x = this,
    Ctor = x.constructor,
    str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);

  return x.isNeg() && !x.isZero() ? '-' + str : str;
};


/*
 * Return a new Decimal whose value is the value of this Decimal truncated to a whole number.
 *
 */
P$4.truncated = P$4.trunc = function () {
  return finalise(new this.constructor(this), this.e + 1, 1);
};


/*
 * Return a string representing the value of this Decimal.
 * Unlike `toString`, negative zero will include the minus sign.
 *
 */
P$4.valueOf = P$4.toJSON = function () {
  var x = this,
    Ctor = x.constructor,
    str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);

  return x.isNeg() ? '-' + str : str;
};


// Helper functions for Decimal.prototype (P) and/or Decimal methods, and their callers.


/*
 *  digitsToString           P.cubeRoot, P.logarithm, P.squareRoot, P.toFraction, P.toPower,
 *                           finiteToString, naturalExponential, naturalLogarithm
 *  checkInt32               P.toDecimalPlaces, P.toExponential, P.toFixed, P.toNearest,
 *                           P.toPrecision, P.toSignificantDigits, toStringBinary, random
 *  checkRoundingDigits      P.logarithm, P.toPower, naturalExponential, naturalLogarithm
 *  convertBase              toStringBinary, parseOther
 *  cos                      P.cos
 *  divide                   P.atanh, P.cubeRoot, P.dividedBy, P.dividedToIntegerBy,
 *                           P.logarithm, P.modulo, P.squareRoot, P.tan, P.tanh, P.toFraction,
 *                           P.toNearest, toStringBinary, naturalExponential, naturalLogarithm,
 *                           taylorSeries, atan2, parseOther
 *  finalise                 P.absoluteValue, P.atan, P.atanh, P.ceil, P.cos, P.cosh,
 *                           P.cubeRoot, P.dividedToIntegerBy, P.floor, P.logarithm, P.minus,
 *                           P.modulo, P.negated, P.plus, P.round, P.sin, P.sinh, P.squareRoot,
 *                           P.tan, P.times, P.toDecimalPlaces, P.toExponential, P.toFixed,
 *                           P.toNearest, P.toPower, P.toPrecision, P.toSignificantDigits,
 *                           P.truncated, divide, getLn10, getPi, naturalExponential,
 *                           naturalLogarithm, ceil, floor, round, trunc
 *  finiteToString           P.toExponential, P.toFixed, P.toPrecision, P.toString, P.valueOf,
 *                           toStringBinary
 *  getBase10Exponent        P.minus, P.plus, P.times, parseOther
 *  getLn10                  P.logarithm, naturalLogarithm
 *  getPi                    P.acos, P.asin, P.atan, toLessThanHalfPi, atan2
 *  getPrecision             P.precision, P.toFraction
 *  getZeroString            digitsToString, finiteToString
 *  intPow                   P.toPower, parseOther
 *  isOdd                    toLessThanHalfPi
 *  maxOrMin                 max, min
 *  naturalExponential       P.naturalExponential, P.toPower
 *  naturalLogarithm         P.acosh, P.asinh, P.atanh, P.logarithm, P.naturalLogarithm,
 *                           P.toPower, naturalExponential
 *  nonFiniteToString        finiteToString, toStringBinary
 *  parseDecimal             Decimal
 *  parseOther               Decimal
 *  sin                      P.sin
 *  taylorSeries             P.cosh, P.sinh, cos, sin
 *  toLessThanHalfPi         P.cos, P.sin
 *  toStringBinary           P.toBinary, P.toHexadecimal, P.toOctal
 *  truncate                 intPow
 *
 *  Throws:                  P.logarithm, P.precision, P.toFraction, checkInt32, getLn10, getPi,
 *                           naturalLogarithm, config, parseOther, random, Decimal
 */


function digitsToString(d) {
  var i, k, ws,
    indexOfLastWord = d.length - 1,
    str = '',
    w = d[0];

  if (indexOfLastWord > 0) {
    str += w;
    for (i = 1; i < indexOfLastWord; i++) {
      ws = d[i] + '';
      k = LOG_BASE - ws.length;
      if (k) str += getZeroString(k);
      str += ws;
    }

    w = d[i];
    ws = w + '';
    k = LOG_BASE - ws.length;
    if (k) str += getZeroString(k);
  } else if (w === 0) {
    return '0';
  }

  // Remove trailing zeros of last w.
  for (; w % 10 === 0;) w /= 10;

  return str + w;
}


function checkInt32(i, min, max) {
  if (i !== ~~i || i < min || i > max) {
    throw Error(invalidArgument + i);
  }
}


/*
 * Check 5 rounding digits if `repeating` is null, 4 otherwise.
 * `repeating == null` if caller is `log` or `pow`,
 * `repeating != null` if caller is `naturalLogarithm` or `naturalExponential`.
 */
function checkRoundingDigits(d, i, rm, repeating) {
  var di, k, r, rd;

  // Get the length of the first word of the array d.
  for (k = d[0]; k >= 10; k /= 10) --i;

  // Is the rounding digit in the first word of d?
  if (--i < 0) {
    i += LOG_BASE;
    di = 0;
  } else {
    di = Math.ceil((i + 1) / LOG_BASE);
    i %= LOG_BASE;
  }

  // i is the index (0 - 6) of the rounding digit.
  // E.g. if within the word 3487563 the first rounding digit is 5,
  // then i = 4, k = 1000, rd = 3487563 % 1000 = 563
  k = mathpow(10, LOG_BASE - i);
  rd = d[di] % k | 0;

  if (repeating == null) {
    if (i < 3) {
      if (i == 0) rd = rd / 100 | 0;
      else if (i == 1) rd = rd / 10 | 0;
      r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 50000 || rd == 0;
    } else {
      r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) &&
        (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 ||
          (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
    }
  } else {
    if (i < 4) {
      if (i == 0) rd = rd / 1000 | 0;
      else if (i == 1) rd = rd / 100 | 0;
      else if (i == 2) rd = rd / 10 | 0;
      r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
    } else {
      r = ((repeating || rm < 4) && rd + 1 == k ||
      (!repeating && rm > 3) && rd + 1 == k / 2) &&
        (d[di + 1] / k / 1000 | 0) == mathpow(10, i - 3) - 1;
    }
  }

  return r;
}


// Convert string of `baseIn` to an array of numbers of `baseOut`.
// Eg. convertBase('255', 10, 16) returns [15, 15].
// Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
function convertBase(str, baseIn, baseOut) {
  var j,
    arr = [0],
    arrL,
    i = 0,
    strL = str.length;

  for (; i < strL;) {
    for (arrL = arr.length; arrL--;) arr[arrL] *= baseIn;
    arr[0] += NUMERALS.indexOf(str.charAt(i++));
    for (j = 0; j < arr.length; j++) {
      if (arr[j] > baseOut - 1) {
        if (arr[j + 1] === void 0) arr[j + 1] = 0;
        arr[j + 1] += arr[j] / baseOut | 0;
        arr[j] %= baseOut;
      }
    }
  }

  return arr.reverse();
}


/*
 * cos(x) = 1 - x^2/2! + x^4/4! - ...
 * |x| < pi/2
 *
 */
function cosine(Ctor, x) {
  var k, len, y;

  if (x.isZero()) return x;

  // Argument reduction: cos(4x) = 8*(cos^4(x) - cos^2(x)) + 1
  // i.e. cos(x) = 8*(cos^4(x/4) - cos^2(x/4)) + 1

  // Estimate the optimum number of times to use the argument reduction.
  len = x.d.length;
  if (len < 32) {
    k = Math.ceil(len / 3);
    y = (1 / tinyPow(4, k)).toString();
  } else {
    k = 16;
    y = '2.3283064365386962890625e-10';
  }

  Ctor.precision += k;

  x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));

  // Reverse argument reduction
  for (var i = k; i--;) {
    var cos2x = x.times(x);
    x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
  }

  Ctor.precision -= k;

  return x;
}


/*
 * Perform division in the specified base.
 */
var divide = (function () {

  // Assumes non-zero x and k, and hence non-zero result.
  function multiplyInteger(x, k, base) {
    var temp,
      carry = 0,
      i = x.length;

    for (x = x.slice(); i--;) {
      temp = x[i] * k + carry;
      x[i] = temp % base | 0;
      carry = temp / base | 0;
    }

    if (carry) x.unshift(carry);

    return x;
  }

  function compare(a, b, aL, bL) {
    var i, r;

    if (aL != bL) {
      r = aL > bL ? 1 : -1;
    } else {
      for (i = r = 0; i < aL; i++) {
        if (a[i] != b[i]) {
          r = a[i] > b[i] ? 1 : -1;
          break;
        }
      }
    }

    return r;
  }

  function subtract(a, b, aL, base) {
    var i = 0;

    // Subtract b from a.
    for (; aL--;) {
      a[aL] -= i;
      i = a[aL] < b[aL] ? 1 : 0;
      a[aL] = i * base + a[aL] - b[aL];
    }

    // Remove leading zeros.
    for (; !a[0] && a.length > 1;) a.shift();
  }

  return function (x, y, pr, rm, dp, base) {
    var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0,
      yL, yz,
      Ctor = x.constructor,
      sign = x.s == y.s ? 1 : -1,
      xd = x.d,
      yd = y.d;

    // Either NaN, Infinity or 0?
    if (!xd || !xd[0] || !yd || !yd[0]) {

      return new Ctor(// Return NaN if either NaN, or both Infinity or 0.
        !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN :

        // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
        xd && xd[0] == 0 || !yd ? sign * 0 : sign / 0);
    }

    if (base) {
      logBase = 1;
      e = x.e - y.e;
    } else {
      base = BASE;
      logBase = LOG_BASE;
      e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
    }

    yL = yd.length;
    xL = xd.length;
    q = new Ctor(sign);
    qd = q.d = [];

    // Result exponent may be one less than e.
    // The digit array of a Decimal from toStringBinary may have trailing zeros.
    for (i = 0; yd[i] == (xd[i] || 0); i++);

    if (yd[i] > (xd[i] || 0)) e--;

    if (pr == null) {
      sd = pr = Ctor.precision;
      rm = Ctor.rounding;
    } else if (dp) {
      sd = pr + (x.e - y.e) + 1;
    } else {
      sd = pr;
    }

    if (sd < 0) {
      qd.push(1);
      more = true;
    } else {

      // Convert precision in number of base 10 digits to base 1e7 digits.
      sd = sd / logBase + 2 | 0;
      i = 0;

      // divisor < 1e7
      if (yL == 1) {
        k = 0;
        yd = yd[0];
        sd++;

        // k is the carry.
        for (; (i < xL || k) && sd--; i++) {
          t = k * base + (xd[i] || 0);
          qd[i] = t / yd | 0;
          k = t % yd | 0;
        }

        more = k || i < xL;

      // divisor >= 1e7
      } else {

        // Normalise xd and yd so highest order digit of yd is >= base/2
        k = base / (yd[0] + 1) | 0;

        if (k > 1) {
          yd = multiplyInteger(yd, k, base);
          xd = multiplyInteger(xd, k, base);
          yL = yd.length;
          xL = xd.length;
        }

        xi = yL;
        rem = xd.slice(0, yL);
        remL = rem.length;

        // Add zeros to make remainder as long as divisor.
        for (; remL < yL;) rem[remL++] = 0;

        yz = yd.slice();
        yz.unshift(0);
        yd0 = yd[0];

        if (yd[1] >= base / 2) ++yd0;

        do {
          k = 0;

          // Compare divisor and remainder.
          cmp = compare(yd, rem, yL, remL);

          // If divisor < remainder.
          if (cmp < 0) {

            // Calculate trial digit, k.
            rem0 = rem[0];
            if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

            // k will be how many times the divisor goes into the current remainder.
            k = rem0 / yd0 | 0;

            //  Algorithm:
            //  1. product = divisor * trial digit (k)
            //  2. if product > remainder: product -= divisor, k--
            //  3. remainder -= product
            //  4. if product was < remainder at 2:
            //    5. compare new remainder and divisor
            //    6. If remainder > divisor: remainder -= divisor, k++

            if (k > 1) {
              if (k >= base) k = base - 1;

              // product = divisor * trial digit.
              prod = multiplyInteger(yd, k, base);
              prodL = prod.length;
              remL = rem.length;

              // Compare product and remainder.
              cmp = compare(prod, rem, prodL, remL);

              // product > remainder.
              if (cmp == 1) {
                k--;

                // Subtract divisor from product.
                subtract(prod, yL < prodL ? yz : yd, prodL, base);
              }
            } else {

              // cmp is -1.
              // If k is 0, there is no need to compare yd and rem again below, so change cmp to 1
              // to avoid it. If k is 1 there is a need to compare yd and rem again below.
              if (k == 0) cmp = k = 1;
              prod = yd.slice();
            }

            prodL = prod.length;
            if (prodL < remL) prod.unshift(0);

            // Subtract product from remainder.
            subtract(rem, prod, remL, base);

            // If product was < previous remainder.
            if (cmp == -1) {
              remL = rem.length;

              // Compare divisor and new remainder.
              cmp = compare(yd, rem, yL, remL);

              // If divisor < new remainder, subtract divisor from remainder.
              if (cmp < 1) {
                k++;

                // Subtract divisor from remainder.
                subtract(rem, yL < remL ? yz : yd, remL, base);
              }
            }

            remL = rem.length;
          } else if (cmp === 0) {
            k++;
            rem = [0];
          }    // if cmp === 1, k will be 0

          // Add the next digit, k, to the result array.
          qd[i++] = k;

          // Update the remainder.
          if (cmp && rem[0]) {
            rem[remL++] = xd[xi] || 0;
          } else {
            rem = [xd[xi]];
            remL = 1;
          }

        } while ((xi++ < xL || rem[0] !== void 0) && sd--);

        more = rem[0] !== void 0;
      }

      // Leading zero?
      if (!qd[0]) qd.shift();
    }

    // logBase is 1 when divide is being used for base conversion.
    if (logBase == 1) {
      q.e = e;
      inexact = more;
    } else {

      // To calculate q.e, first get the number of digits of qd[0].
      for (i = 1, k = qd[0]; k >= 10; k /= 10) i++;
      q.e = i + e * logBase - 1;

      finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
    }

    return q;
  };
})();


/*
 * Round `x` to `sd` significant digits using rounding mode `rm`.
 * Check for over/under-flow.
 */
 function finalise(x, sd, rm, isTruncated) {
  var digits, i, j, k, rd, roundUp, w, xd, xdi,
    Ctor = x.constructor;

  // Don't round if sd is null or undefined.
  out: if (sd != null) {
    xd = x.d;

    // Infinity/NaN.
    if (!xd) return x;

    // rd: the rounding digit, i.e. the digit after the digit that may be rounded up.
    // w: the word of xd containing rd, a base 1e7 number.
    // xdi: the index of w within xd.
    // digits: the number of digits of w.
    // i: what would be the index of rd within w if all the numbers were 7 digits long (i.e. if
    // they had leading zeros)
    // j: if > 0, the actual index of rd within w (if < 0, rd is a leading zero).

    // Get the length of the first word of the digits array xd.
    for (digits = 1, k = xd[0]; k >= 10; k /= 10) digits++;
    i = sd - digits;

    // Is the rounding digit in the first word of xd?
    if (i < 0) {
      i += LOG_BASE;
      j = sd;
      w = xd[xdi = 0];

      // Get the rounding digit at index j of w.
      rd = w / mathpow(10, digits - j - 1) % 10 | 0;
    } else {
      xdi = Math.ceil((i + 1) / LOG_BASE);
      k = xd.length;
      if (xdi >= k) {
        if (isTruncated) {

          // Needed by `naturalExponential`, `naturalLogarithm` and `squareRoot`.
          for (; k++ <= xdi;) xd.push(0);
          w = rd = 0;
          digits = 1;
          i %= LOG_BASE;
          j = i - LOG_BASE + 1;
        } else {
          break out;
        }
      } else {
        w = k = xd[xdi];

        // Get the number of digits of w.
        for (digits = 1; k >= 10; k /= 10) digits++;

        // Get the index of rd within w.
        i %= LOG_BASE;

        // Get the index of rd within w, adjusted for leading zeros.
        // The number of leading zeros of w is given by LOG_BASE - digits.
        j = i - LOG_BASE + digits;

        // Get the rounding digit at index j of w.
        rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
      }
    }

    // Are there any non-zero digits after the rounding digit?
    isTruncated = isTruncated || sd < 0 ||
      xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));

    // The expression `w % mathpow(10, digits - j - 1)` returns all the digits of w to the right
    // of the digit at (left-to-right) index j, e.g. if w is 908714 and j is 2, the expression
    // will give 714.

    roundUp = rm < 4
      ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
      : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 &&

        // Check whether the digit to the left of the rounding digit is odd.
        ((i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10) & 1 ||
          rm == (x.s < 0 ? 8 : 7));

    if (sd < 1 || !xd[0]) {
      xd.length = 0;
      if (roundUp) {

        // Convert sd to decimal places.
        sd -= x.e + 1;

        // 1, 0.1, 0.01, 0.001, 0.0001 etc.
        xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
        x.e = -sd || 0;
      } else {

        // Zero.
        xd[0] = x.e = 0;
      }

      return x;
    }

    // Remove excess digits.
    if (i == 0) {
      xd.length = xdi;
      k = 1;
      xdi--;
    } else {
      xd.length = xdi + 1;
      k = mathpow(10, LOG_BASE - i);

      // E.g. 56700 becomes 56000 if 7 is the rounding digit.
      // j > 0 means i > number of leading zeros of w.
      xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
    }

    if (roundUp) {
      for (;;) {

        // Is the digit to be rounded up in the first word of xd?
        if (xdi == 0) {

          // i will be the length of xd[0] before k is added.
          for (i = 1, j = xd[0]; j >= 10; j /= 10) i++;
          j = xd[0] += k;
          for (k = 1; j >= 10; j /= 10) k++;

          // if i != k the length has increased.
          if (i != k) {
            x.e++;
            if (xd[0] == BASE) xd[0] = 1;
          }

          break;
        } else {
          xd[xdi] += k;
          if (xd[xdi] != BASE) break;
          xd[xdi--] = 0;
          k = 1;
        }
      }
    }

    // Remove trailing zeros.
    for (i = xd.length; xd[--i] === 0;) xd.pop();
  }

  if (external) {

    // Overflow?
    if (x.e > Ctor.maxE) {

      // Infinity.
      x.d = null;
      x.e = NaN;

    // Underflow?
    } else if (x.e < Ctor.minE) {

      // Zero.
      x.e = 0;
      x.d = [0];
      // Ctor.underflow = true;
    } // else Ctor.underflow = false;
  }

  return x;
}


function finiteToString(x, isExp, sd) {
  if (!x.isFinite()) return nonFiniteToString(x);
  var k,
    e = x.e,
    str = digitsToString(x.d),
    len = str.length;

  if (isExp) {
    if (sd && (k = sd - len) > 0) {
      str = str.charAt(0) + '.' + str.slice(1) + getZeroString(k);
    } else if (len > 1) {
      str = str.charAt(0) + '.' + str.slice(1);
    }

    str = str + (x.e < 0 ? 'e' : 'e+') + x.e;
  } else if (e < 0) {
    str = '0.' + getZeroString(-e - 1) + str;
    if (sd && (k = sd - len) > 0) str += getZeroString(k);
  } else if (e >= len) {
    str += getZeroString(e + 1 - len);
    if (sd && (k = sd - e - 1) > 0) str = str + '.' + getZeroString(k);
  } else {
    if ((k = e + 1) < len) str = str.slice(0, k) + '.' + str.slice(k);
    if (sd && (k = sd - len) > 0) {
      if (e + 1 === len) str += '.';
      str += getZeroString(k);
    }
  }

  return str;
}


// Calculate the base 10 exponent from the base 1e7 exponent.
function getBase10Exponent(digits, e) {
  var w = digits[0];

  // Add the number of digits of the first word of the digits array.
  for ( e *= LOG_BASE; w >= 10; w /= 10) e++;
  return e;
}


function getLn10(Ctor, sd, pr) {
  if (sd > LN10_PRECISION) {

    // Reset global state in case the exception is caught.
    external = true;
    if (pr) Ctor.precision = pr;
    throw Error(precisionLimitExceeded);
  }
  return finalise(new Ctor(LN10), sd, 1, true);
}


function getPi(Ctor, sd, rm) {
  if (sd > PI_PRECISION) throw Error(precisionLimitExceeded);
  return finalise(new Ctor(PI), sd, rm, true);
}


function getPrecision(digits) {
  var w = digits.length - 1,
    len = w * LOG_BASE + 1;

  w = digits[w];

  // If non-zero...
  if (w) {

    // Subtract the number of trailing zeros of the last word.
    for (; w % 10 == 0; w /= 10) len--;

    // Add the number of digits of the first word.
    for (w = digits[0]; w >= 10; w /= 10) len++;
  }

  return len;
}


function getZeroString(k) {
  var zs = '';
  for (; k--;) zs += '0';
  return zs;
}


/*
 * Return a new Decimal whose value is the value of Decimal `x` to the power `n`, where `n` is an
 * integer of type number.
 *
 * Implements 'exponentiation by squaring'. Called by `pow` and `parseOther`.
 *
 */
function intPow(Ctor, x, n, pr) {
  var isTruncated,
    r = new Ctor(1),

    // Max n of 9007199254740991 takes 53 loop iterations.
    // Maximum digits array length; leaves [28, 34] guard digits.
    k = Math.ceil(pr / LOG_BASE + 4);

  external = false;

  for (;;) {
    if (n % 2) {
      r = r.times(x);
      if (truncate(r.d, k)) isTruncated = true;
    }

    n = mathfloor(n / 2);
    if (n === 0) {

      // To ensure correct rounding when r.d is truncated, increment the last word if it is zero.
      n = r.d.length - 1;
      if (isTruncated && r.d[n] === 0) ++r.d[n];
      break;
    }

    x = x.times(x);
    truncate(x.d, k);
  }

  external = true;

  return r;
}


function isOdd(n) {
  return n.d[n.d.length - 1] & 1;
}


/*
 * Handle `max` (`n` is -1) and `min` (`n` is 1).
 */
function maxOrMin(Ctor, args, n) {
  var k, y,
    x = new Ctor(args[0]),
    i = 0;

  for (; ++i < args.length;) {
    y = new Ctor(args[i]);

    // NaN?
    if (!y.s) {
      x = y;
      break;
    }

    k = x.cmp(y);

    if (k === n || k === 0 && x.s === n) {
      x = y;
    }
  }

  return x;
}


/*
 * Return a new Decimal whose value is the natural exponential of `x` rounded to `sd` significant
 * digits.
 *
 * Taylor/Maclaurin series.
 *
 * exp(x) = x^0/0! + x^1/1! + x^2/2! + x^3/3! + ...
 *
 * Argument reduction:
 *   Repeat x = x / 32, k += 5, until |x| < 0.1
 *   exp(x) = exp(x / 2^k)^(2^k)
 *
 * Previously, the argument was initially reduced by
 * exp(x) = exp(r) * 10^k  where r = x - k * ln10, k = floor(x / ln10)
 * to first put r in the range [0, ln10], before dividing by 32 until |x| < 0.1, but this was
 * found to be slower than just dividing repeatedly by 32 as above.
 *
 * Max integer argument: exp('20723265836946413') = 6.3e+9000000000000000
 * Min integer argument: exp('-20723265836946411') = 1.2e-9000000000000000
 * (Math object integer min/max: Math.exp(709) = 8.2e+307, Math.exp(-745) = 5e-324)
 *
 *  exp(Infinity)  = Infinity
 *  exp(-Infinity) = 0
 *  exp(NaN)       = NaN
 *  exp(±0)        = 1
 *
 *  exp(x) is non-terminating for any finite, non-zero x.
 *
 *  The result will always be correctly rounded.
 *
 */
function naturalExponential(x, sd) {
  var denominator, guard, j, pow, sum, t, wpr,
    rep = 0,
    i = 0,
    k = 0,
    Ctor = x.constructor,
    rm = Ctor.rounding,
    pr = Ctor.precision;

  // 0/NaN/Infinity?
  if (!x.d || !x.d[0] || x.e > 17) {

    return new Ctor(x.d
      ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0
      : x.s ? x.s < 0 ? 0 : x : 0 / 0);
  }

  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }

  t = new Ctor(0.03125);

  // while abs(x) >= 0.1
  while (x.e > -2) {

    // x = x / 2^5
    x = x.times(t);
    k += 5;
  }

  // Use 2 * log10(2^k) + 5 (empirically derived) to estimate the increase in precision
  // necessary to ensure the first 4 rounding digits are correct.
  guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
  wpr += guard;
  denominator = pow = sum = new Ctor(1);
  Ctor.precision = wpr;

  for (;;) {
    pow = finalise(pow.times(x), wpr, 1);
    denominator = denominator.times(++i);
    t = sum.plus(divide(pow, denominator, wpr, 1));

    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
      j = k;
      while (j--) sum = finalise(sum.times(sum), wpr, 1);

      // Check to see if the first 4 rounding digits are [49]999.
      // If so, repeat the summation with a higher precision, otherwise
      // e.g. with precision: 18, rounding: 1
      // exp(18.404272462595034083567793919843761) = 98372560.1229999999 (should be 98372560.123)
      // `wpr - guard` is the index of first rounding digit.
      if (sd == null) {

        if (rep < 3 && checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += 10;
          denominator = pow = t = new Ctor(1);
          i = 0;
          rep++;
        } else {
          return finalise(sum, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum;
      }
    }

    sum = t;
  }
}


/*
 * Return a new Decimal whose value is the natural logarithm of `x` rounded to `sd` significant
 * digits.
 *
 *  ln(-n)        = NaN
 *  ln(0)         = -Infinity
 *  ln(-0)        = -Infinity
 *  ln(1)         = 0
 *  ln(Infinity)  = Infinity
 *  ln(-Infinity) = NaN
 *  ln(NaN)       = NaN
 *
 *  ln(n) (n != 1) is non-terminating.
 *
 */
function naturalLogarithm(y, sd) {
  var c, c0, denominator, e, numerator, rep, sum, t, wpr, x1, x2,
    n = 1,
    guard = 10,
    x = y,
    xd = x.d,
    Ctor = x.constructor,
    rm = Ctor.rounding,
    pr = Ctor.precision;

  // Is x negative or Infinity, NaN, 0 or 1?
  if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
    return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
  }

  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }

  Ctor.precision = wpr += guard;
  c = digitsToString(xd);
  c0 = c.charAt(0);

  if (Math.abs(e = x.e) < 1.5e15) {

    // Argument reduction.
    // The series converges faster the closer the argument is to 1, so using
    // ln(a^b) = b * ln(a),   ln(a) = ln(a^b) / b
    // multiply the argument by itself until the leading digits of the significand are 7, 8, 9,
    // 10, 11, 12 or 13, recording the number of multiplications so the sum of the series can
    // later be divided by this number, then separate out the power of 10 using
    // ln(a*10^b) = ln(a) + b*ln(10).

    // max n is 21 (gives 0.9, 1.0 or 1.1) (9e15 / 21 = 4.2e14).
    //while (c0 < 9 && c0 != 1 || c0 == 1 && c.charAt(1) > 1) {
    // max n is 6 (gives 0.7 - 1.3)
    while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
      x = x.times(y);
      c = digitsToString(x.d);
      c0 = c.charAt(0);
      n++;
    }

    e = x.e;

    if (c0 > 1) {
      x = new Ctor('0.' + c);
      e++;
    } else {
      x = new Ctor(c0 + '.' + c.slice(1));
    }
  } else {

    // The argument reduction method above may result in overflow if the argument y is a massive
    // number with exponent >= 1500000000000000 (9e15 / 6 = 1.5e15), so instead recall this
    // function using ln(x*10^e) = ln(x) + e*ln(10).
    t = getLn10(Ctor, wpr + 2, pr).times(e + '');
    x = naturalLogarithm(new Ctor(c0 + '.' + c.slice(1)), wpr - guard).plus(t);
    Ctor.precision = pr;

    return sd == null ? finalise(x, pr, rm, external = true) : x;
  }

  // x1 is x reduced to a value near 1.
  x1 = x;

  // Taylor series.
  // ln(y) = ln((1 + x)/(1 - x)) = 2(x + x^3/3 + x^5/5 + x^7/7 + ...)
  // where x = (y - 1)/(y + 1)    (|x| < 1)
  sum = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
  x2 = finalise(x.times(x), wpr, 1);
  denominator = 3;

  for (;;) {
    numerator = finalise(numerator.times(x2), wpr, 1);
    t = sum.plus(divide(numerator, new Ctor(denominator), wpr, 1));

    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
      sum = sum.times(2);

      // Reverse the argument reduction. Check that e is not 0 because, besides preventing an
      // unnecessary calculation, -0 + 0 = +0 and to ensure correct rounding -0 needs to stay -0.
      if (e !== 0) sum = sum.plus(getLn10(Ctor, wpr + 2, pr).times(e + ''));
      sum = divide(sum, new Ctor(n), wpr, 1);

      // Is rm > 3 and the first 4 rounding digits 4999, or rm < 4 (or the summation has
      // been repeated previously) and the first 4 rounding digits 9999?
      // If so, restart the summation with a higher precision, otherwise
      // e.g. with precision: 12, rounding: 1
      // ln(135520028.6126091714265381533) = 18.7246299999 when it should be 18.72463.
      // `wpr - guard` is the index of first rounding digit.
      if (sd == null) {
        if (checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += guard;
          t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
          x2 = finalise(x.times(x), wpr, 1);
          denominator = rep = 1;
        } else {
          return finalise(sum, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum;
      }
    }

    sum = t;
    denominator += 2;
  }
}


// ±Infinity, NaN.
function nonFiniteToString(x) {
  // Unsigned.
  return String(x.s * x.s / 0);
}


/*
 * Parse the value of a new Decimal `x` from string `str`.
 */
function parseDecimal(x, str) {
  var e, i, len;

  // TODO BigInt str: no need to check for decimal point, exponential form or leading zeros.
  // Decimal point?
  if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

  // Exponential form?
  if ((i = str.search(/e/i)) > 0) {

    // Determine exponent.
    if (e < 0) e = i;
    e += +str.slice(i + 1);
    str = str.substring(0, i);
  } else if (e < 0) {

    // Integer.
    e = str.length;
  }

  // Determine leading zeros.
  for (i = 0; str.charCodeAt(i) === 48; i++);

  // Determine trailing zeros.
  for (len = str.length; str.charCodeAt(len - 1) === 48; --len);
  str = str.slice(i, len);

  if (str) {
    len -= i;
    x.e = e = e - i - 1;
    x.d = [];

    // Transform base

    // e is the base 10 exponent.
    // i is where to slice str to get the first word of the digits array.
    i = (e + 1) % LOG_BASE;
    if (e < 0) i += LOG_BASE;

    if (i < len) {
      if (i) x.d.push(+str.slice(0, i));
      for (len -= LOG_BASE; i < len;) x.d.push(+str.slice(i, i += LOG_BASE));
      str = str.slice(i);
      i = LOG_BASE - str.length;
    } else {
      i -= len;
    }

    for (; i--;) str += '0';
    x.d.push(+str);

    if (external) {

      // Overflow?
      if (x.e > x.constructor.maxE) {

        // Infinity.
        x.d = null;
        x.e = NaN;

      // Underflow?
      } else if (x.e < x.constructor.minE) {

        // Zero.
        x.e = 0;
        x.d = [0];
        // x.constructor.underflow = true;
      } // else x.constructor.underflow = false;
    }
  } else {

    // Zero.
    x.e = 0;
    x.d = [0];
  }

  return x;
}


/*
 * Parse the value of a new Decimal `x` from a string `str`, which is not a decimal value.
 */
function parseOther(x, str) {
  var base, Ctor, divisor, i, isFloat, len, p, xd, xe;

  if (str.indexOf('_') > -1) {
    str = str.replace(/(\d)_(?=\d)/g, '$1');
    if (isDecimal.test(str)) return parseDecimal(x, str);
  } else if (str === 'Infinity' || str === 'NaN') {
    if (!+str) x.s = NaN;
    x.e = NaN;
    x.d = null;
    return x;
  }

  if (isHex.test(str))  {
    base = 16;
    str = str.toLowerCase();
  } else if (isBinary.test(str))  {
    base = 2;
  } else if (isOctal.test(str))  {
    base = 8;
  } else {
    throw Error(invalidArgument + str);
  }

  // Is there a binary exponent part?
  i = str.search(/p/i);

  if (i > 0) {
    p = +str.slice(i + 1);
    str = str.substring(2, i);
  } else {
    str = str.slice(2);
  }

  // Convert `str` as an integer then divide the result by `base` raised to a power such that the
  // fraction part will be restored.
  i = str.indexOf('.');
  isFloat = i >= 0;
  Ctor = x.constructor;

  if (isFloat) {
    str = str.replace('.', '');
    len = str.length;
    i = len - i;

    // log[10](16) = 1.2041... , log[10](88) = 1.9444....
    divisor = intPow(Ctor, new Ctor(base), i, i * 2);
  }

  xd = convertBase(str, base, BASE);
  xe = xd.length - 1;

  // Remove trailing zeros.
  for (i = xe; xd[i] === 0; --i) xd.pop();
  if (i < 0) return new Ctor(x.s * 0);
  x.e = getBase10Exponent(xd, xe);
  x.d = xd;
  external = false;

  // At what precision to perform the division to ensure exact conversion?
  // maxDecimalIntegerPartDigitCount = ceil(log[10](b) * otherBaseIntegerPartDigitCount)
  // log[10](2) = 0.30103, log[10](8) = 0.90309, log[10](16) = 1.20412
  // E.g. ceil(1.2 * 3) = 4, so up to 4 decimal digits are needed to represent 3 hex int digits.
  // maxDecimalFractionPartDigitCount = {Hex:4|Oct:3|Bin:1} * otherBaseFractionPartDigitCount
  // Therefore using 4 * the number of digits of str will always be enough.
  if (isFloat) x = divide(x, divisor, len * 4);

  // Multiply by the binary exponent part if present.
  if (p) x = x.times(Math.abs(p) < 54 ? mathpow(2, p) : Decimal.pow(2, p));
  external = true;

  return x;
}


/*
 * sin(x) = x - x^3/3! + x^5/5! - ...
 * |x| < pi/2
 *
 */
function sine(Ctor, x) {
  var k,
    len = x.d.length;

  if (len < 3) {
    return x.isZero() ? x : taylorSeries(Ctor, 2, x, x);
  }

  // Argument reduction: sin(5x) = 16*sin^5(x) - 20*sin^3(x) + 5*sin(x)
  // i.e. sin(x) = 16*sin^5(x/5) - 20*sin^3(x/5) + 5*sin(x/5)
  // and  sin(x) = sin(x/5)(5 + sin^2(x/5)(16sin^2(x/5) - 20))

  // Estimate the optimum number of times to use the argument reduction.
  k = 1.4 * Math.sqrt(len);
  k = k > 16 ? 16 : k | 0;

  x = x.times(1 / tinyPow(5, k));
  x = taylorSeries(Ctor, 2, x, x);

  // Reverse argument reduction
  var sin2_x,
    d5 = new Ctor(5),
    d16 = new Ctor(16),
    d20 = new Ctor(20);
  for (; k--;) {
    sin2_x = x.times(x);
    x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
  }

  return x;
}


// Calculate Taylor series for `cos`, `cosh`, `sin` and `sinh`.
function taylorSeries(Ctor, n, x, y, isHyperbolic) {
  var j, t, u, x2,
    pr = Ctor.precision,
    k = Math.ceil(pr / LOG_BASE);

  external = false;
  x2 = x.times(x);
  u = new Ctor(y);

  for (;;) {
    t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
    u = isHyperbolic ? y.plus(t) : y.minus(t);
    y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
    t = u.plus(y);

    if (t.d[k] !== void 0) {
      for (j = k; t.d[j] === u.d[j] && j--;);
      if (j == -1) break;
    }

    j = u;
    u = y;
    y = t;
    t = j;
  }

  external = true;
  t.d.length = k + 1;

  return t;
}


// Exponent e must be positive and non-zero.
function tinyPow(b, e) {
  var n = b;
  while (--e) n *= b;
  return n;
}


// Return the absolute value of `x` reduced to less than or equal to half pi.
function toLessThanHalfPi(Ctor, x) {
  var t,
    isNeg = x.s < 0,
    pi = getPi(Ctor, Ctor.precision, 1),
    halfPi = pi.times(0.5);

  x = x.abs();

  if (x.lte(halfPi)) {
    quadrant = isNeg ? 4 : 1;
    return x;
  }

  t = x.divToInt(pi);

  if (t.isZero()) {
    quadrant = isNeg ? 3 : 2;
  } else {
    x = x.minus(t.times(pi));

    // 0 <= x < pi
    if (x.lte(halfPi)) {
      quadrant = isOdd(t) ? (isNeg ? 2 : 3) : (isNeg ? 4 : 1);
      return x;
    }

    quadrant = isOdd(t) ? (isNeg ? 1 : 4) : (isNeg ? 3 : 2);
  }

  return x.minus(pi).abs();
}


/*
 * Return the value of Decimal `x` as a string in base `baseOut`.
 *
 * If the optional `sd` argument is present include a binary exponent suffix.
 */
function toStringBinary(x, baseOut, sd, rm) {
  var base, e, i, k, len, roundUp, str, xd, y,
    Ctor = x.constructor,
    isExp = sd !== void 0;

  if (isExp) {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
  } else {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  }

  if (!x.isFinite()) {
    str = nonFiniteToString(x);
  } else {
    str = finiteToString(x);
    i = str.indexOf('.');

    // Use exponential notation according to `toExpPos` and `toExpNeg`? No, but if required:
    // maxBinaryExponent = floor((decimalExponent + 1) * log[2](10))
    // minBinaryExponent = floor(decimalExponent * log[2](10))
    // log[2](10) = 3.321928094887362347870319429489390175864

    if (isExp) {
      base = 2;
      if (baseOut == 16) {
        sd = sd * 4 - 3;
      } else if (baseOut == 8) {
        sd = sd * 3 - 2;
      }
    } else {
      base = baseOut;
    }

    // Convert the number as an integer then divide the result by its base raised to a power such
    // that the fraction part will be restored.

    // Non-integer.
    if (i >= 0) {
      str = str.replace('.', '');
      y = new Ctor(1);
      y.e = str.length - i;
      y.d = convertBase(finiteToString(y), 10, base);
      y.e = y.d.length;
    }

    xd = convertBase(str, 10, base);
    e = len = xd.length;

    // Remove trailing zeros.
    for (; xd[--len] == 0;) xd.pop();

    if (!xd[0]) {
      str = isExp ? '0p+0' : '0';
    } else {
      if (i < 0) {
        e--;
      } else {
        x = new Ctor(x);
        x.d = xd;
        x.e = e;
        x = divide(x, y, sd, rm, 0, base);
        xd = x.d;
        e = x.e;
        roundUp = inexact;
      }

      // The rounding digit, i.e. the digit after the digit that may be rounded up.
      i = xd[sd];
      k = base / 2;
      roundUp = roundUp || xd[sd + 1] !== void 0;

      roundUp = rm < 4
        ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2))
        : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 ||
          rm === (x.s < 0 ? 8 : 7));

      xd.length = sd;

      if (roundUp) {

        // Rounding up may mean the previous digit has to be rounded up and so on.
        for (; ++xd[--sd] > base - 1;) {
          xd[sd] = 0;
          if (!sd) {
            ++e;
            xd.unshift(1);
          }
        }
      }

      // Determine trailing zeros.
      for (len = xd.length; !xd[len - 1]; --len);

      // E.g. [4, 11, 15] becomes 4bf.
      for (i = 0, str = ''; i < len; i++) str += NUMERALS.charAt(xd[i]);

      // Add binary exponent suffix?
      if (isExp) {
        if (len > 1) {
          if (baseOut == 16 || baseOut == 8) {
            i = baseOut == 16 ? 4 : 3;
            for (--len; len % i; len++) str += '0';
            xd = convertBase(str, base, baseOut);
            for (len = xd.length; !xd[len - 1]; --len);

            // xd[0] will always be be 1
            for (i = 1, str = '1.'; i < len; i++) str += NUMERALS.charAt(xd[i]);
          } else {
            str = str.charAt(0) + '.' + str.slice(1);
          }
        }

        str =  str + (e < 0 ? 'p' : 'p+') + e;
      } else if (e < 0) {
        for (; ++e;) str = '0' + str;
        str = '0.' + str;
      } else {
        if (++e > len) for (e -= len; e-- ;) str += '0';
        else if (e < len) str = str.slice(0, e) + '.' + str.slice(e);
      }
    }

    str = (baseOut == 16 ? '0x' : baseOut == 2 ? '0b' : baseOut == 8 ? '0o' : '') + str;
  }

  return x.s < 0 ? '-' + str : str;
}


// Does not strip trailing zeros.
function truncate(arr, len) {
  if (arr.length > len) {
    arr.length = len;
    return true;
  }
}


// Decimal methods


/*
 *  abs
 *  acos
 *  acosh
 *  add
 *  asin
 *  asinh
 *  atan
 *  atanh
 *  atan2
 *  cbrt
 *  ceil
 *  clamp
 *  clone
 *  config
 *  cos
 *  cosh
 *  div
 *  exp
 *  floor
 *  hypot
 *  ln
 *  log
 *  log2
 *  log10
 *  max
 *  min
 *  mod
 *  mul
 *  pow
 *  random
 *  round
 *  set
 *  sign
 *  sin
 *  sinh
 *  sqrt
 *  sub
 *  sum
 *  tan
 *  tanh
 *  trunc
 */


/*
 * Return a new Decimal whose value is the absolute value of `x`.
 *
 * x {number|string|bigint|Decimal}
 *
 */
function abs$2(x) {
  return new this(x).abs();
}


/*
 * Return a new Decimal whose value is the arccosine in radians of `x`.
 *
 * x {number|string|bigint|Decimal}
 *
 */
function acos(x) {
  return new this(x).acos();
}


/*
 * Return a new Decimal whose value is the inverse of the hyperbolic cosine of `x`, rounded to
 * `precision` significant digits using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal} A value in radians.
 *
 */
function acosh(x) {
  return new this(x).acosh();
}


/*
 * Return a new Decimal whose value is the sum of `x` and `y`, rounded to `precision` significant
 * digits using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal}
 * y {number|string|bigint|Decimal}
 *
 */
function add$1(x, y) {
  return new this(x).plus(y);
}


/*
 * Return a new Decimal whose value is the arcsine in radians of `x`, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal}
 *
 */
function asin(x) {
  return new this(x).asin();
}


/*
 * Return a new Decimal whose value is the inverse of the hyperbolic sine of `x`, rounded to
 * `precision` significant digits using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal} A value in radians.
 *
 */
function asinh(x) {
  return new this(x).asinh();
}


/*
 * Return a new Decimal whose value is the arctangent in radians of `x`, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal}
 *
 */
function atan(x) {
  return new this(x).atan();
}


/*
 * Return a new Decimal whose value is the inverse of the hyperbolic tangent of `x`, rounded to
 * `precision` significant digits using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal} A value in radians.
 *
 */
function atanh(x) {
  return new this(x).atanh();
}


/*
 * Return a new Decimal whose value is the arctangent in radians of `y/x` in the range -pi to pi
 * (inclusive), rounded to `precision` significant digits using rounding mode `rounding`.
 *
 * Domain: [-Infinity, Infinity]
 * Range: [-pi, pi]
 *
 * y {number|string|bigint|Decimal} The y-coordinate.
 * x {number|string|bigint|Decimal} The x-coordinate.
 *
 * atan2(±0, -0)               = ±pi
 * atan2(±0, +0)               = ±0
 * atan2(±0, -x)               = ±pi for x > 0
 * atan2(±0, x)                = ±0 for x > 0
 * atan2(-y, ±0)               = -pi/2 for y > 0
 * atan2(y, ±0)                = pi/2 for y > 0
 * atan2(±y, -Infinity)        = ±pi for finite y > 0
 * atan2(±y, +Infinity)        = ±0 for finite y > 0
 * atan2(±Infinity, x)         = ±pi/2 for finite x
 * atan2(±Infinity, -Infinity) = ±3*pi/4
 * atan2(±Infinity, +Infinity) = ±pi/4
 * atan2(NaN, x) = NaN
 * atan2(y, NaN) = NaN
 *
 */
function atan2(y, x) {
  y = new this(y);
  x = new this(x);
  var r,
    pr = this.precision,
    rm = this.rounding,
    wpr = pr + 4;

  // Either NaN
  if (!y.s || !x.s) {
    r = new this(NaN);

  // Both ±Infinity
  } else if (!y.d && !x.d) {
    r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
    r.s = y.s;

  // x is ±Infinity or y is ±0
  } else if (!x.d || y.isZero()) {
    r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
    r.s = y.s;

  // y is ±Infinity or x is ±0
  } else if (!y.d || x.isZero()) {
    r = getPi(this, wpr, 1).times(0.5);
    r.s = y.s;

  // Both non-zero and finite
  } else if (x.s < 0) {
    this.precision = wpr;
    this.rounding = 1;
    r = this.atan(divide(y, x, wpr, 1));
    x = getPi(this, wpr, 1);
    this.precision = pr;
    this.rounding = rm;
    r = y.s < 0 ? r.minus(x) : r.plus(x);
  } else {
    r = this.atan(divide(y, x, wpr, 1));
  }

  return r;
}


/*
 * Return a new Decimal whose value is the cube root of `x`, rounded to `precision` significant
 * digits using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal}
 *
 */
function cbrt(x) {
  return new this(x).cbrt();
}


/*
 * Return a new Decimal whose value is `x` rounded to an integer using `ROUND_CEIL`.
 *
 * x {number|string|bigint|Decimal}
 *
 */
function ceil(x) {
  return finalise(x = new this(x), x.e + 1, 2);
}


/*
 * Return a new Decimal whose value is `x` clamped to the range delineated by `min` and `max`.
 *
 * x {number|string|bigint|Decimal}
 * min {number|string|bigint|Decimal}
 * max {number|string|bigint|Decimal}
 *
 */
function clamp(x, min, max) {
  return new this(x).clamp(min, max);
}


/*
 * Configure global settings for a Decimal constructor.
 *
 * `obj` is an object with one or more of the following properties,
 *
 *   precision  {number}
 *   rounding   {number}
 *   toExpNeg   {number}
 *   toExpPos   {number}
 *   maxE       {number}
 *   minE       {number}
 *   modulo     {number}
 *   crypto     {boolean|number}
 *   defaults   {true}
 *
 * E.g. Decimal.config({ precision: 20, rounding: 4 })
 *
 */
function config(obj) {
  if (!obj || typeof obj !== 'object') throw Error(decimalError + 'Object expected');
  var i, p, v,
    useDefaults = obj.defaults === true,
    ps = [
      'precision', 1, MAX_DIGITS,
      'rounding', 0, 8,
      'toExpNeg', -EXP_LIMIT, 0,
      'toExpPos', 0, EXP_LIMIT,
      'maxE', 0, EXP_LIMIT,
      'minE', -EXP_LIMIT, 0,
      'modulo', 0, 9
    ];

  for (i = 0; i < ps.length; i += 3) {
    if (p = ps[i], useDefaults) this[p] = DEFAULTS[p];
    if ((v = obj[p]) !== void 0) {
      if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
      else throw Error(invalidArgument + p + ': ' + v);
    }
  }

  if (p = 'crypto', useDefaults) this[p] = DEFAULTS[p];
  if ((v = obj[p]) !== void 0) {
    if (v === true || v === false || v === 0 || v === 1) {
      if (v) {
        if (typeof crypto != 'undefined' && crypto &&
          (crypto.getRandomValues || crypto.randomBytes)) {
          this[p] = true;
        } else {
          throw Error(cryptoUnavailable);
        }
      } else {
        this[p] = false;
      }
    } else {
      throw Error(invalidArgument + p + ': ' + v);
    }
  }

  return this;
}


/*
 * Return a new Decimal whose value is the cosine of `x`, rounded to `precision` significant
 * digits using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal} A value in radians.
 *
 */
function cos$1(x) {
  return new this(x).cos();
}


/*
 * Return a new Decimal whose value is the hyperbolic cosine of `x`, rounded to precision
 * significant digits using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal} A value in radians.
 *
 */
function cosh$1(x) {
  return new this(x).cosh();
}


/*
 * Create and return a Decimal constructor with the same configuration properties as this Decimal
 * constructor.
 *
 */
function clone$1(obj) {
  var i, p, ps;

  /*
   * The Decimal constructor and exported function.
   * Return a new Decimal instance.
   *
   * v {number|string|bigint|Decimal} A numeric value.
   *
   */
  function Decimal(v) {
    var e, i, t,
      x = this;

    // Decimal called without new.
    if (!(x instanceof Decimal)) return new Decimal(v);

    // Retain a reference to this Decimal constructor, and shadow Decimal.prototype.constructor
    // which points to Object.
    x.constructor = Decimal;

    if (isDecimalInstance(v)) {
      x.s = v.s;

      if (external) {
        if (!v.d || v.e > Decimal.maxE) {

          // Infinity.
          x.e = NaN;
          x.d = null;
        } else if (v.e < Decimal.minE) {

          // Zero.
          x.e = 0;
          x.d = [0];
        } else {
          x.e = v.e;
          x.d = v.d.slice();
        }
      } else {
        x.e = v.e;
        x.d = v.d ? v.d.slice() : v.d;
      }

      return;
    }

    t = typeof v;

    if (t === 'number') {
      if (v === 0) {
        x.s = 1 / v < 0 ? -1 : 1;
        x.e = 0;
        x.d = [0];
        return;
      }

      if (v < 0) {
        v = -v;
        x.s = -1;
      } else {
        x.s = 1;
      }

      // Fast path for small integers.
      if (v === ~~v && v < 1e7) {
        for (e = 0, i = v; i >= 10; i /= 10) e++;

        if (external) {
          if (e > Decimal.maxE) {
            x.e = NaN;
            x.d = null;
          } else if (e < Decimal.minE) {
            x.e = 0;
            x.d = [0];
          } else {
            x.e = e;
            x.d = [v];
          }
        } else {
          x.e = e;
          x.d = [v];
        }

        return;
      }

      // Infinity or NaN?
      if (v * 0 !== 0) {
        if (!v) x.s = NaN;
        x.e = NaN;
        x.d = null;
        return;
      }

      return parseDecimal(x, v.toString());
    }

    if (t === 'string') {
      if ((i = v.charCodeAt(0)) === 45) {  // minus sign
        v = v.slice(1);
        x.s = -1;
      } else {
        if (i === 43) v = v.slice(1);  // plus sign
        x.s = 1;
      }

      return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
    }

    if (t === 'bigint') {
      if (v < 0) {
        v = -v;
        x.s = -1;
      } else {
        x.s = 1;
      }

      return parseDecimal(x, v.toString());
    }

    throw Error(invalidArgument + v);
  }

  Decimal.prototype = P$4;

  Decimal.ROUND_UP = 0;
  Decimal.ROUND_DOWN = 1;
  Decimal.ROUND_CEIL = 2;
  Decimal.ROUND_FLOOR = 3;
  Decimal.ROUND_HALF_UP = 4;
  Decimal.ROUND_HALF_DOWN = 5;
  Decimal.ROUND_HALF_EVEN = 6;
  Decimal.ROUND_HALF_CEIL = 7;
  Decimal.ROUND_HALF_FLOOR = 8;
  Decimal.EUCLID = 9;

  Decimal.config = Decimal.set = config;
  Decimal.clone = clone$1;
  Decimal.isDecimal = isDecimalInstance;

  Decimal.abs = abs$2;
  Decimal.acos = acos;
  Decimal.acosh = acosh;        // ES6
  Decimal.add = add$1;
  Decimal.asin = asin;
  Decimal.asinh = asinh;        // ES6
  Decimal.atan = atan;
  Decimal.atanh = atanh;        // ES6
  Decimal.atan2 = atan2;
  Decimal.cbrt = cbrt;          // ES6
  Decimal.ceil = ceil;
  Decimal.clamp = clamp;
  Decimal.cos = cos$1;
  Decimal.cosh = cosh$1;          // ES6
  Decimal.div = div$1;
  Decimal.exp = exp$1;
  Decimal.floor = floor;
  Decimal.hypot = hypot$1;        // ES6
  Decimal.ln = ln;
  Decimal.log = log$1;
  Decimal.log10 = log10;        // ES6
  Decimal.log2 = log2;          // ES6
  Decimal.max = max$1;
  Decimal.min = min$1;
  Decimal.mod = mod$1;
  Decimal.mul = mul$1;
  Decimal.pow = pow$2;
  Decimal.random = random;
  Decimal.round = round;
  Decimal.sign = sign$1;          // ES6
  Decimal.sin = sin$1;
  Decimal.sinh = sinh$1;          // ES6
  Decimal.sqrt = sqrt$1;
  Decimal.sub = sub$1;
  Decimal.sum = sum$1;
  Decimal.tan = tan$1;
  Decimal.tanh = tanh;          // ES6
  Decimal.trunc = trunc;        // ES6

  if (obj === void 0) obj = {};
  if (obj) {
    if (obj.defaults !== true) {
      ps = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'maxE', 'minE', 'modulo', 'crypto'];
      for (i = 0; i < ps.length;) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
    }
  }

  Decimal.config(obj);

  return Decimal;
}


/*
 * Return a new Decimal whose value is `x` divided by `y`, rounded to `precision` significant
 * digits using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal}
 * y {number|string|bigint|Decimal}
 *
 */
function div$1(x, y) {
  return new this(x).div(y);
}


/*
 * Return a new Decimal whose value is the natural exponential of `x`, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal} The power to which to raise the base of the natural log.
 *
 */
function exp$1(x) {
  return new this(x).exp();
}


/*
 * Return a new Decimal whose value is `x` round to an integer using `ROUND_FLOOR`.
 *
 * x {number|string|bigint|Decimal}
 *
 */
function floor(x) {
  return finalise(x = new this(x), x.e + 1, 3);
}


/*
 * Return a new Decimal whose value is the square root of the sum of the squares of the arguments,
 * rounded to `precision` significant digits using rounding mode `rounding`.
 *
 * hypot(a, b, ...) = sqrt(a^2 + b^2 + ...)
 *
 * arguments {number|string|bigint|Decimal}
 *
 */
function hypot$1() {
  var i, n,
    t = new this(0);

  external = false;

  for (i = 0; i < arguments.length;) {
    n = new this(arguments[i++]);
    if (!n.d) {
      if (n.s) {
        external = true;
        return new this(1 / 0);
      }
      t = n;
    } else if (t.d) {
      t = t.plus(n.times(n));
    }
  }

  external = true;

  return t.sqrt();
}


/*
 * Return true if object is a Decimal instance (where Decimal is any Decimal constructor),
 * otherwise return false.
 *
 */
function isDecimalInstance(obj) {
  return obj instanceof Decimal || obj && obj.toStringTag === tag || false;
}


/*
 * Return a new Decimal whose value is the natural logarithm of `x`, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal}
 *
 */
function ln(x) {
  return new this(x).ln();
}


/*
 * Return a new Decimal whose value is the log of `x` to the base `y`, or to base 10 if no base
 * is specified, rounded to `precision` significant digits using rounding mode `rounding`.
 *
 * log[y](x)
 *
 * x {number|string|bigint|Decimal} The argument of the logarithm.
 * y {number|string|bigint|Decimal} The base of the logarithm.
 *
 */
function log$1(x, y) {
  return new this(x).log(y);
}


/*
 * Return a new Decimal whose value is the base 2 logarithm of `x`, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal}
 *
 */
function log2(x) {
  return new this(x).log(2);
}


/*
 * Return a new Decimal whose value is the base 10 logarithm of `x`, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal}
 *
 */
function log10(x) {
  return new this(x).log(10);
}


/*
 * Return a new Decimal whose value is the maximum of the arguments.
 *
 * arguments {number|string|bigint|Decimal}
 *
 */
function max$1() {
  return maxOrMin(this, arguments, -1);
}


/*
 * Return a new Decimal whose value is the minimum of the arguments.
 *
 * arguments {number|string|bigint|Decimal}
 *
 */
function min$1() {
  return maxOrMin(this, arguments, 1);
}


/*
 * Return a new Decimal whose value is `x` modulo `y`, rounded to `precision` significant digits
 * using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal}
 * y {number|string|bigint|Decimal}
 *
 */
function mod$1(x, y) {
  return new this(x).mod(y);
}


/*
 * Return a new Decimal whose value is `x` multiplied by `y`, rounded to `precision` significant
 * digits using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal}
 * y {number|string|bigint|Decimal}
 *
 */
function mul$1(x, y) {
  return new this(x).mul(y);
}


/*
 * Return a new Decimal whose value is `x` raised to the power `y`, rounded to precision
 * significant digits using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal} The base.
 * y {number|string|bigint|Decimal} The exponent.
 *
 */
function pow$2(x, y) {
  return new this(x).pow(y);
}


/*
 * Returns a new Decimal with a random value equal to or greater than 0 and less than 1, and with
 * `sd`, or `Decimal.precision` if `sd` is omitted, significant digits (or less if trailing zeros
 * are produced).
 *
 * [sd] {number} Significant digits. Integer, 0 to MAX_DIGITS inclusive.
 *
 */
function random(sd) {
  var d, e, k, n,
    i = 0,
    r = new this(1),
    rd = [];

  if (sd === void 0) sd = this.precision;
  else checkInt32(sd, 1, MAX_DIGITS);

  k = Math.ceil(sd / LOG_BASE);

  if (!this.crypto) {
    for (; i < k;) rd[i++] = Math.random() * 1e7 | 0;

  // Browsers supporting crypto.getRandomValues.
  } else if (crypto.getRandomValues) {
    d = crypto.getRandomValues(new Uint32Array(k));

    for (; i < k;) {
      n = d[i];

      // 0 <= n < 4294967296
      // Probability n >= 4.29e9, is 4967296 / 4294967296 = 0.00116 (1 in 865).
      if (n >= 4.29e9) {
        d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
      } else {

        // 0 <= n <= 4289999999
        // 0 <= (n % 1e7) <= 9999999
        rd[i++] = n % 1e7;
      }
    }

  // Node.js supporting crypto.randomBytes.
  } else if (crypto.randomBytes) {

    // buffer
    d = crypto.randomBytes(k *= 4);

    for (; i < k;) {

      // 0 <= n < 2147483648
      n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 0x7f) << 24);

      // Probability n >= 2.14e9, is 7483648 / 2147483648 = 0.0035 (1 in 286).
      if (n >= 2.14e9) {
        crypto.randomBytes(4).copy(d, i);
      } else {

        // 0 <= n <= 2139999999
        // 0 <= (n % 1e7) <= 9999999
        rd.push(n % 1e7);
        i += 4;
      }
    }

    i = k / 4;
  } else {
    throw Error(cryptoUnavailable);
  }

  k = rd[--i];
  sd %= LOG_BASE;

  // Convert trailing digits to zeros according to sd.
  if (k && sd) {
    n = mathpow(10, LOG_BASE - sd);
    rd[i] = (k / n | 0) * n;
  }

  // Remove trailing words which are zero.
  for (; rd[i] === 0; i--) rd.pop();

  // Zero?
  if (i < 0) {
    e = 0;
    rd = [0];
  } else {
    e = -1;

    // Remove leading words which are zero and adjust exponent accordingly.
    for (; rd[0] === 0; e -= LOG_BASE) rd.shift();

    // Count the digits of the first word of rd to determine leading zeros.
    for (k = 1, n = rd[0]; n >= 10; n /= 10) k++;

    // Adjust the exponent for leading zeros of the first word of rd.
    if (k < LOG_BASE) e -= LOG_BASE - k;
  }

  r.e = e;
  r.d = rd;

  return r;
}


/*
 * Return a new Decimal whose value is `x` rounded to an integer using rounding mode `rounding`.
 *
 * To emulate `Math.round`, set rounding to 7 (ROUND_HALF_CEIL).
 *
 * x {number|string|bigint|Decimal}
 *
 */
function round(x) {
  return finalise(x = new this(x), x.e + 1, this.rounding);
}


/*
 * Return
 *   1    if x > 0,
 *  -1    if x < 0,
 *   0    if x is 0,
 *  -0    if x is -0,
 *   NaN  otherwise
 *
 * x {number|string|bigint|Decimal}
 *
 */
function sign$1(x) {
  x = new this(x);
  return x.d ? (x.d[0] ? x.s : 0 * x.s) : x.s || NaN;
}


/*
 * Return a new Decimal whose value is the sine of `x`, rounded to `precision` significant digits
 * using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal} A value in radians.
 *
 */
function sin$1(x) {
  return new this(x).sin();
}


/*
 * Return a new Decimal whose value is the hyperbolic sine of `x`, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal} A value in radians.
 *
 */
function sinh$1(x) {
  return new this(x).sinh();
}


/*
 * Return a new Decimal whose value is the square root of `x`, rounded to `precision` significant
 * digits using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal}
 *
 */
function sqrt$1(x) {
  return new this(x).sqrt();
}


/*
 * Return a new Decimal whose value is `x` minus `y`, rounded to `precision` significant digits
 * using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal}
 * y {number|string|bigint|Decimal}
 *
 */
function sub$1(x, y) {
  return new this(x).sub(y);
}


/*
 * Return a new Decimal whose value is the sum of the arguments, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 * Only the result is rounded, not the intermediate calculations.
 *
 * arguments {number|string|bigint|Decimal}
 *
 */
function sum$1() {
  var i = 0,
    args = arguments,
    x = new this(args[i]);

  external = false;
  for (; x.s && ++i < args.length;) x = x.plus(args[i]);
  external = true;

  return finalise(x, this.precision, this.rounding);
}


/*
 * Return a new Decimal whose value is the tangent of `x`, rounded to `precision` significant
 * digits using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal} A value in radians.
 *
 */
function tan$1(x) {
  return new this(x).tan();
}


/*
 * Return a new Decimal whose value is the hyperbolic tangent of `x`, rounded to `precision`
 * significant digits using rounding mode `rounding`.
 *
 * x {number|string|bigint|Decimal} A value in radians.
 *
 */
function tanh(x) {
  return new this(x).tanh();
}


/*
 * Return a new Decimal whose value is `x` truncated to an integer.
 *
 * x {number|string|bigint|Decimal}
 *
 */
function trunc(x) {
  return finalise(x = new this(x), x.e + 1, 1);
}


P$4[Symbol.for('nodejs.util.inspect.custom')] = P$4.toString;
P$4[Symbol.toStringTag] = 'Decimal';

// Create and configure initial Decimal constructor.
var Decimal = P$4.constructor = clone$1(DEFAULTS);

// Create the internal constants from their string values.
LN10 = new Decimal(LN10);
PI = new Decimal(PI);

var name$w = 'BigNumber';
var dependencies$v = ['?on', 'config'];
var createBigNumberClass = /* #__PURE__ */factory(name$w, dependencies$v, _ref => {
  var {
    on,
    config
  } = _ref;
  var BigNumber = Decimal.clone({
    precision: config.precision,
    modulo: Decimal.EUCLID
  });
  BigNumber.prototype = Object.create(BigNumber.prototype);

  /**
   * Attach type information
   */
  BigNumber.prototype.type = 'BigNumber';
  BigNumber.prototype.isBigNumber = true;

  /**
   * Get a JSON representation of a BigNumber containing
   * type information
   * @returns {Object} Returns a JSON object structured as:
   *                   `{"mathjs": "BigNumber", "value": "0.2"}`
   */
  BigNumber.prototype.toJSON = function () {
    return {
      mathjs: 'BigNumber',
      value: this.toString()
    };
  };

  /**
   * Instantiate a BigNumber from a JSON object
   * @param {Object} json  a JSON object structured as:
   *                       `{"mathjs": "BigNumber", "value": "0.2"}`
   * @return {BigNumber}
   */
  BigNumber.fromJSON = function (json) {
    return new BigNumber(json.value);
  };
  if (on) {
    // listen for changed in the configuration, automatically apply changed precision
    on('config', function (curr, prev) {
      if (curr.precision !== prev.precision) {
        BigNumber.config({
          precision: curr.precision
        });
      }
    });
  }
  return BigNumber;
}, {
  isClass: true
});

/**
 *
 * This class allows the manipulation of complex numbers.
 * You can pass a complex number in different formats. Either as object, double, string or two integer parameters.
 *
 * Object form
 * { re: <real>, im: <imaginary> }
 * { arg: <angle>, abs: <radius> }
 * { phi: <angle>, r: <radius> }
 *
 * Array / Vector form
 * [ real, imaginary ]
 *
 * Double form
 * 99.3 - Single double value
 *
 * String form
 * '23.1337' - Simple real number
 * '15+3i' - a simple complex number
 * '3-i' - a simple complex number
 *
 * Example:
 *
 * const c = new Complex('99.3+8i');
 * c.mul({r: 3, i: 9}).div(4.9).sub(3, 2);
 *
 */


const cosh = Math.cosh || function (x) {
  return Math.abs(x) < 1e-9 ? 1 - x : (Math.exp(x) + Math.exp(-x)) * 0.5;
};

const sinh = Math.sinh || function (x) {
  return Math.abs(x) < 1e-9 ? x : (Math.exp(x) - Math.exp(-x)) * 0.5;
};

/**
 * Calculates cos(x) - 1 using Taylor series if x is small (-¼π ≤ x ≤ ¼π).
 *
 * @param {number} x
 * @returns {number} cos(x) - 1
 */
const cosm1 = x => {
  // cos(x) - 1 = − 2sin^2(x / 2)
  const s = Math.sin(0.5 * x);
  return -2 * s * s;
};

const hypot = function (x, y) {

  x = Math.abs(x);
  y = Math.abs(y);

  // Ensure `x` is the larger value
  if (x < y) [x, y] = [y, x];

  // If both are below the threshold, use straightforward Pythagoras
  if (x < 1e8) return Math.sqrt(x * x + y * y);

  // For larger values, scale to avoid overflow
  y /= x;
  return x * Math.sqrt(1 + y * y);
};

const parser_exit = function () {
  throw SyntaxError('Invalid Param');
};

/**
 * Calculates log(sqrt(a^2+b^2)) in a way to avoid overflows
 *
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function logHypot(a, b) {

  const _a = Math.abs(a);
  const _b = Math.abs(b);

  if (a === 0) {
    return Math.log(_b);
  }

  if (b === 0) {
    return Math.log(_a);
  }

  if (_a < 3000 && _b < 3000) {
    return Math.log(a * a + b * b) * 0.5;
  }

  /* I got 4 ideas to compute this property without overflow:
   *
   * Testing 1000000 times with random samples for a,b ∈ [1, 1000000000] against a big decimal library to get an error estimate
   *
   * 1. Only eliminate the square root: (OVERALL ERROR: 3.9122483030951116e-11)

   Math.log(a * a + b * b) / 2

   *
   *
   * 2. Try to use the non-overflowing pythagoras: (OVERALL ERROR: 8.889760039210159e-10)

   const fn = function(a, b) {
   a = Math.abs(a);
   b = Math.abs(b);
   let t = Math.min(a, b);
   a = Math.max(a, b);
   t = t / a;

   return Math.log(a) + Math.log(1 + t * t) / 2;
   };

   * 3. Abuse the identity cos(atan(y/x) = x / sqrt(x^2+y^2): (OVERALL ERROR: 3.4780178737037204e-10)

   Math.log(a / Math.cos(Math.atan2(b, a)))

   * 4. Use 3. and apply log rules: (OVERALL ERROR: 1.2014087502620896e-9)

   Math.log(a) - Math.log(Math.cos(Math.atan2(b, a)))

   */

  a = a * 0.5;
  b = b * 0.5;

  return 0.5 * Math.log(a * a + b * b) + Math.LN2;
}

const P$3 = { 're': 0, 'im': 0 };
const parse$2 = function (a, b) {

  const z = P$3;

  if (a === undefined || a === null) {
    z['re'] =
      z['im'] = 0;
  } else if (b !== undefined) {
    z['re'] = a;
    z['im'] = b;
  } else
    switch (typeof a) {

      case 'object':

        if ('im' in a && 're' in a) {
          z['re'] = a['re'];
          z['im'] = a['im'];
        } else if ('abs' in a && 'arg' in a) {
          if (!isFinite(a['abs']) && isFinite(a['arg'])) {
            return Complex$1['INFINITY'];
          }
          z['re'] = a['abs'] * Math.cos(a['arg']);
          z['im'] = a['abs'] * Math.sin(a['arg']);
        } else if ('r' in a && 'phi' in a) {
          if (!isFinite(a['r']) && isFinite(a['phi'])) {
            return Complex$1['INFINITY'];
          }
          z['re'] = a['r'] * Math.cos(a['phi']);
          z['im'] = a['r'] * Math.sin(a['phi']);
        } else if (a.length === 2) { // Quick array check
          z['re'] = a[0];
          z['im'] = a[1];
        } else {
          parser_exit();
        }
        break;

      case 'string':

        z['im'] = /* void */
          z['re'] = 0;

        const tokens = a.replace(/_/g, '')
          .match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
        let plus = 1;
        let minus = 0;

        if (tokens === null) {
          parser_exit();
        }

        for (let i = 0; i < tokens.length; i++) {

          const c = tokens[i];

          if (c === ' ' || c === '\t' || c === '\n') ; else if (c === '+') {
            plus++;
          } else if (c === '-') {
            minus++;
          } else if (c === 'i' || c === 'I') {

            if (plus + minus === 0) {
              parser_exit();
            }

            if (tokens[i + 1] !== ' ' && !isNaN(tokens[i + 1])) {
              z['im'] += parseFloat((minus % 2 ? '-' : '') + tokens[i + 1]);
              i++;
            } else {
              z['im'] += parseFloat((minus % 2 ? '-' : '') + '1');
            }
            plus = minus = 0;

          } else {

            if (plus + minus === 0 || isNaN(c)) {
              parser_exit();
            }

            if (tokens[i + 1] === 'i' || tokens[i + 1] === 'I') {
              z['im'] += parseFloat((minus % 2 ? '-' : '') + c);
              i++;
            } else {
              z['re'] += parseFloat((minus % 2 ? '-' : '') + c);
            }
            plus = minus = 0;
          }
        }

        // Still something on the stack
        if (plus + minus > 0) {
          parser_exit();
        }
        break;

      case 'number':
        z['im'] = 0;
        z['re'] = a;
        break;

      default:
        parser_exit();
    }

  if (isNaN(z['re']) || isNaN(z['im'])) ;

  return z;
};

/**
 * @constructor
 * @returns {Complex}
 */
function Complex$1(a, b) {

  if (!(this instanceof Complex$1)) {
    return new Complex$1(a, b);
  }

  const z = parse$2(a, b);

  this['re'] = z['re'];
  this['im'] = z['im'];
}

Complex$1.prototype = {

  're': 0,
  'im': 0,

  /**
   * Calculates the sign of a complex number, which is a normalized complex
   *
   * @returns {Complex}
   */
  'sign': function () {

    const abs = hypot(this['re'], this['im']);

    return new Complex$1(
      this['re'] / abs,
      this['im'] / abs);
  },

  /**
   * Adds two complex numbers
   *
   * @returns {Complex}
   */
  'add': function (a, b) {

    const z = parse$2(a, b);

    const tInfin = this['isInfinite']();
    const zInfin = !(isFinite(z['re']) && isFinite(z['im']));

    if (tInfin || zInfin) {

      if (tInfin && zInfin) {
        // Infinity + Infinity = NaN
        return Complex$1['NAN'];
      }
      // Infinity + z = Infinity { where z != Infinity }
      return Complex$1['INFINITY'];
    }

    return new Complex$1(
      this['re'] + z['re'],
      this['im'] + z['im']);
  },

  /**
   * Subtracts two complex numbers
   *
   * @returns {Complex}
   */
  'sub': function (a, b) {

    const z = parse$2(a, b);

    const tInfin = this['isInfinite']();
    const zInfin = !(isFinite(z['re']) && isFinite(z['im']));

    if (tInfin || zInfin) {

      if (tInfin && zInfin) {
        // Infinity - Infinity = NaN
        return Complex$1['NAN'];
      }
      // Infinity - z = Infinity { where z != Infinity }
      return Complex$1['INFINITY'];
    }

    return new Complex$1(
      this['re'] - z['re'],
      this['im'] - z['im']);
  },

  /**
   * Multiplies two complex numbers
   *
   * @returns {Complex}
   */
  'mul': function (a, b) {

    const z = parse$2(a, b);

    const tInfin = this['isInfinite']();
    const zInfin = !(isFinite(z['re']) && isFinite(z['im']));
    const tIsZero = this['re'] === 0 && this['im'] === 0;
    const zIsZero = z['re'] === 0 && z['im'] === 0;

    // Infinity * 0 = NaN
    if (tInfin && zIsZero || zInfin && tIsZero) {
      return Complex$1['NAN'];
    }

    // Infinity * z = Infinity { where z != 0 }
    if (tInfin || zInfin) {
      return Complex$1['INFINITY'];
    }

    // Shortcut for real values
    if (z['im'] === 0 && this['im'] === 0) {
      return new Complex$1(this['re'] * z['re'], 0);
    }

    return new Complex$1(
      this['re'] * z['re'] - this['im'] * z['im'],
      this['re'] * z['im'] + this['im'] * z['re']);
  },

  /**
   * Divides two complex numbers
   *
   * @returns {Complex}
   */
  'div': function (a, b) {

    const z = parse$2(a, b);

    const tInfin = this['isInfinite']();
    const zInfin = !(isFinite(z['re']) && isFinite(z['im']));
    const tIsZero = this['re'] === 0 && this['im'] === 0;
    const zIsZero = z['re'] === 0 && z['im'] === 0;

    // 0 / 0 = NaN and Infinity / Infinity = NaN
    if (tIsZero && zIsZero || tInfin && zInfin) {
      return Complex$1['NAN'];
    }

    // Infinity / 0 = Infinity
    if (zIsZero || tInfin) {
      return Complex$1['INFINITY'];
    }

    // 0 / Infinity = 0
    if (tIsZero || zInfin) {
      return Complex$1['ZERO'];
    }

    if (0 === z['im']) {
      // Divisor is real
      return new Complex$1(this['re'] / z['re'], this['im'] / z['re']);
    }

    if (Math.abs(z['re']) < Math.abs(z['im'])) {

      const x = z['re'] / z['im'];
      const t = z['re'] * x + z['im'];

      return new Complex$1(
        (this['re'] * x + this['im']) / t,
        (this['im'] * x - this['re']) / t);

    } else {

      const x = z['im'] / z['re'];
      const t = z['im'] * x + z['re'];

      return new Complex$1(
        (this['re'] + this['im'] * x) / t,
        (this['im'] - this['re'] * x) / t);
    }
  },

  /**
   * Calculate the power of two complex numbers
   *
   * @returns {Complex}
   */
  'pow': function (a, b) {

    const z = parse$2(a, b);

    const tIsZero = this['re'] === 0 && this['im'] === 0;
    const zIsZero = z['re'] === 0 && z['im'] === 0;

    if (zIsZero) {
      return Complex$1['ONE'];
    }

    // If the exponent is real
    if (z['im'] === 0) {

      if (this['im'] === 0 && this['re'] > 0) {

        return new Complex$1(Math.pow(this['re'], z['re']), 0);

      } else if (this['re'] === 0) { // If base is fully imaginary

        switch ((z['re'] % 4 + 4) % 4) {
          case 0:
            return new Complex$1(Math.pow(this['im'], z['re']), 0);
          case 1:
            return new Complex$1(0, Math.pow(this['im'], z['re']));
          case 2:
            return new Complex$1(-Math.pow(this['im'], z['re']), 0);
          case 3:
            return new Complex$1(0, -Math.pow(this['im'], z['re']));
        }
      }
    }

    /* I couldn't find a good formula, so here is a derivation and optimization
     *
     * z_1^z_2 = (a + bi)^(c + di)
     *         = exp((c + di) * log(a + bi)
     *         = pow(a^2 + b^2, (c + di) / 2) * exp(i(c + di)atan2(b, a))
     * =>...
     * Re = (pow(a^2 + b^2, c / 2) * exp(-d * atan2(b, a))) * cos(d * log(a^2 + b^2) / 2 + c * atan2(b, a))
     * Im = (pow(a^2 + b^2, c / 2) * exp(-d * atan2(b, a))) * sin(d * log(a^2 + b^2) / 2 + c * atan2(b, a))
     *
     * =>...
     * Re = exp(c * log(sqrt(a^2 + b^2)) - d * atan2(b, a)) * cos(d * log(sqrt(a^2 + b^2)) + c * atan2(b, a))
     * Im = exp(c * log(sqrt(a^2 + b^2)) - d * atan2(b, a)) * sin(d * log(sqrt(a^2 + b^2)) + c * atan2(b, a))
     *
     * =>
     * Re = exp(c * logsq2 - d * arg(z_1)) * cos(d * logsq2 + c * arg(z_1))
     * Im = exp(c * logsq2 - d * arg(z_1)) * sin(d * logsq2 + c * arg(z_1))
     *
     */

    if (tIsZero && z['re'] > 0) { // Same behavior as Wolframalpha, Zero if real part is zero
      return Complex$1['ZERO'];
    }

    const arg = Math.atan2(this['im'], this['re']);
    const loh = logHypot(this['re'], this['im']);

    let re = Math.exp(z['re'] * loh - z['im'] * arg);
    let im = z['im'] * loh + z['re'] * arg;
    return new Complex$1(
      re * Math.cos(im),
      re * Math.sin(im));
  },

  /**
   * Calculate the complex square root
   *
   * @returns {Complex}
   */
  'sqrt': function () {

    const a = this['re'];
    const b = this['im'];

    if (b === 0) {
      // Real number case
      if (a >= 0) {
        return new Complex$1(Math.sqrt(a), 0);
      } else {
        return new Complex$1(0, Math.sqrt(-a));
      }
    }

    const r = hypot(a, b);

    let re = Math.sqrt(0.5 * (r + Math.abs(a))); // sqrt(2x) / 2 = sqrt(x / 2)
    let im = Math.abs(b) / (2 * re);

    if (a >= 0) {
      return new Complex$1(re, b < 0 ? -im : im);
    } else {
      return new Complex$1(im, b < 0 ? -re : re);
    }
  },

  /**
   * Calculate the complex exponent
   *
   * @returns {Complex}
   */
  'exp': function () {

    const er = Math.exp(this['re']);

    if (this['im'] === 0) {
      return new Complex$1(er, 0);
    }
    return new Complex$1(
      er * Math.cos(this['im']),
      er * Math.sin(this['im']));
  },

  /**
   * Calculate the complex exponent and subtracts one.
   *
   * This may be more accurate than `Complex(x).exp().sub(1)` if
   * `x` is small.
   *
   * @returns {Complex}
   */
  'expm1': function () {

    /**
     * exp(a + i*b) - 1
     = exp(a) * (cos(b) + j*sin(b)) - 1
     = expm1(a)*cos(b) + cosm1(b) + j*exp(a)*sin(b)
     */

    const a = this['re'];
    const b = this['im'];

    return new Complex$1(
      Math.expm1(a) * Math.cos(b) + cosm1(b),
      Math.exp(a) * Math.sin(b));
  },

  /**
   * Calculate the natural log
   *
   * @returns {Complex}
   */
  'log': function () {

    const a = this['re'];
    const b = this['im'];

    if (b === 0 && a > 0) {
      return new Complex$1(Math.log(a), 0);
    }

    return new Complex$1(
      logHypot(a, b),
      Math.atan2(b, a));
  },

  /**
   * Calculate the magnitude of the complex number
   *
   * @returns {number}
   */
  'abs': function () {

    return hypot(this['re'], this['im']);
  },

  /**
   * Calculate the angle of the complex number
   *
   * @returns {number}
   */
  'arg': function () {

    return Math.atan2(this['im'], this['re']);
  },

  /**
   * Calculate the sine of the complex number
   *
   * @returns {Complex}
   */
  'sin': function () {

    // sin(z) = ( e^iz - e^-iz ) / 2i 
    //        = sin(a)cosh(b) + i cos(a)sinh(b)

    const a = this['re'];
    const b = this['im'];

    return new Complex$1(
      Math.sin(a) * cosh(b),
      Math.cos(a) * sinh(b));
  },

  /**
   * Calculate the cosine
   *
   * @returns {Complex}
   */
  'cos': function () {

    // cos(z) = ( e^iz + e^-iz ) / 2 
    //        = cos(a)cosh(b) - i sin(a)sinh(b)

    const a = this['re'];
    const b = this['im'];

    return new Complex$1(
      Math.cos(a) * cosh(b),
      -Math.sin(a) * sinh(b));
  },

  /**
   * Calculate the tangent
   *
   * @returns {Complex}
   */
  'tan': function () {

    // tan(z) = sin(z) / cos(z) 
    //        = ( e^iz - e^-iz ) / ( i( e^iz + e^-iz ) )
    //        = ( e^2iz - 1 ) / i( e^2iz + 1 )
    //        = ( sin(2a) + i sinh(2b) ) / ( cos(2a) + cosh(2b) )

    const a = 2 * this['re'];
    const b = 2 * this['im'];
    const d = Math.cos(a) + cosh(b);

    return new Complex$1(
      Math.sin(a) / d,
      sinh(b) / d);
  },

  /**
   * Calculate the cotangent
   *
   * @returns {Complex}
   */
  'cot': function () {

    // cot(c) = i(e^(ci) + e^(-ci)) / (e^(ci) - e^(-ci))

    const a = 2 * this['re'];
    const b = 2 * this['im'];
    const d = Math.cos(a) - cosh(b);

    return new Complex$1(
      -Math.sin(a) / d,
      sinh(b) / d);
  },

  /**
   * Calculate the secant
   *
   * @returns {Complex}
   */
  'sec': function () {

    // sec(c) = 2 / (e^(ci) + e^(-ci))

    const a = this['re'];
    const b = this['im'];
    const d = 0.5 * cosh(2 * b) + 0.5 * Math.cos(2 * a);

    return new Complex$1(
      Math.cos(a) * cosh(b) / d,
      Math.sin(a) * sinh(b) / d);
  },

  /**
   * Calculate the cosecans
   *
   * @returns {Complex}
   */
  'csc': function () {

    // csc(c) = 2i / (e^(ci) - e^(-ci))

    const a = this['re'];
    const b = this['im'];
    const d = 0.5 * cosh(2 * b) - 0.5 * Math.cos(2 * a);

    return new Complex$1(
      Math.sin(a) * cosh(b) / d,
      -Math.cos(a) * sinh(b) / d);
  },

  /**
   * Calculate the complex arcus sinus
   *
   * @returns {Complex}
   */
  'asin': function () {

    // asin(c) = -i * log(ci + sqrt(1 - c^2))

    const a = this['re'];
    const b = this['im'];

    const t1 = new Complex$1(
      b * b - a * a + 1,
      -2 * a * b)['sqrt']();

    const t2 = new Complex$1(
      t1['re'] - b,
      t1['im'] + a)['log']();

    return new Complex$1(t2['im'], -t2['re']);
  },

  /**
   * Calculate the complex arcus cosinus
   *
   * @returns {Complex}
   */
  'acos': function () {

    // acos(c) = i * log(c - i * sqrt(1 - c^2))

    const a = this['re'];
    const b = this['im'];

    const t1 = new Complex$1(
      b * b - a * a + 1,
      -2 * a * b)['sqrt']();

    const t2 = new Complex$1(
      t1['re'] - b,
      t1['im'] + a)['log']();

    return new Complex$1(Math.PI / 2 - t2['im'], t2['re']);
  },

  /**
   * Calculate the complex arcus tangent
   *
   * @returns {Complex}
   */
  'atan': function () {

    // atan(c) = i / 2 log((i + x) / (i - x))

    const a = this['re'];
    const b = this['im'];

    if (a === 0) {

      if (b === 1) {
        return new Complex$1(0, Infinity);
      }

      if (b === -1) {
        return new Complex$1(0, -Infinity);
      }
    }

    const d = a * a + (1.0 - b) * (1.0 - b);

    const t1 = new Complex$1(
      (1 - b * b - a * a) / d,
      -2 * a / d).log();

    return new Complex$1(-0.5 * t1['im'], 0.5 * t1['re']);
  },

  /**
   * Calculate the complex arcus cotangent
   *
   * @returns {Complex}
   */
  'acot': function () {

    // acot(c) = i / 2 log((c - i) / (c + i))

    const a = this['re'];
    const b = this['im'];

    if (b === 0) {
      return new Complex$1(Math.atan2(1, a), 0);
    }

    const d = a * a + b * b;
    return (d !== 0)
      ? new Complex$1(
        a / d,
        -b / d).atan()
      : new Complex$1(
        (a !== 0) ? a / 0 : 0,
        (b !== 0) ? -b / 0 : 0).atan();
  },

  /**
   * Calculate the complex arcus secant
   *
   * @returns {Complex}
   */
  'asec': function () {

    // asec(c) = -i * log(1 / c + sqrt(1 - i / c^2))

    const a = this['re'];
    const b = this['im'];

    if (a === 0 && b === 0) {
      return new Complex$1(0, Infinity);
    }

    const d = a * a + b * b;
    return (d !== 0)
      ? new Complex$1(
        a / d,
        -b / d).acos()
      : new Complex$1(
        (a !== 0) ? a / 0 : 0,
        (b !== 0) ? -b / 0 : 0).acos();
  },

  /**
   * Calculate the complex arcus cosecans
   *
   * @returns {Complex}
   */
  'acsc': function () {

    // acsc(c) = -i * log(i / c + sqrt(1 - 1 / c^2))

    const a = this['re'];
    const b = this['im'];

    if (a === 0 && b === 0) {
      return new Complex$1(Math.PI / 2, Infinity);
    }

    const d = a * a + b * b;
    return (d !== 0)
      ? new Complex$1(
        a / d,
        -b / d).asin()
      : new Complex$1(
        (a !== 0) ? a / 0 : 0,
        (b !== 0) ? -b / 0 : 0).asin();
  },

  /**
   * Calculate the complex sinh
   *
   * @returns {Complex}
   */
  'sinh': function () {

    // sinh(c) = (e^c - e^-c) / 2

    const a = this['re'];
    const b = this['im'];

    return new Complex$1(
      sinh(a) * Math.cos(b),
      cosh(a) * Math.sin(b));
  },

  /**
   * Calculate the complex cosh
   *
   * @returns {Complex}
   */
  'cosh': function () {

    // cosh(c) = (e^c + e^-c) / 2

    const a = this['re'];
    const b = this['im'];

    return new Complex$1(
      cosh(a) * Math.cos(b),
      sinh(a) * Math.sin(b));
  },

  /**
   * Calculate the complex tanh
   *
   * @returns {Complex}
   */
  'tanh': function () {

    // tanh(c) = (e^c - e^-c) / (e^c + e^-c)

    const a = 2 * this['re'];
    const b = 2 * this['im'];
    const d = cosh(a) + Math.cos(b);

    return new Complex$1(
      sinh(a) / d,
      Math.sin(b) / d);
  },

  /**
   * Calculate the complex coth
   *
   * @returns {Complex}
   */
  'coth': function () {

    // coth(c) = (e^c + e^-c) / (e^c - e^-c)

    const a = 2 * this['re'];
    const b = 2 * this['im'];
    const d = cosh(a) - Math.cos(b);

    return new Complex$1(
      sinh(a) / d,
      -Math.sin(b) / d);
  },

  /**
   * Calculate the complex csch
   *
   * @returns {Complex}
   */
  'csch': function () {

    // csch(c) = 2 / (e^c - e^-c)

    const a = this['re'];
    const b = this['im'];
    const d = Math.cos(2 * b) - cosh(2 * a);

    return new Complex$1(
      -2 * sinh(a) * Math.cos(b) / d,
      2 * cosh(a) * Math.sin(b) / d);
  },

  /**
   * Calculate the complex sech
   *
   * @returns {Complex}
   */
  'sech': function () {

    // sech(c) = 2 / (e^c + e^-c)

    const a = this['re'];
    const b = this['im'];
    const d = Math.cos(2 * b) + cosh(2 * a);

    return new Complex$1(
      2 * cosh(a) * Math.cos(b) / d,
      -2 * sinh(a) * Math.sin(b) / d);
  },

  /**
   * Calculate the complex asinh
   *
   * @returns {Complex}
   */
  'asinh': function () {

    // asinh(z) = log(z + sqrt(z^2 + 1))

    const a = this['re'];
    const b = this['im'];

    if (b === 0) {

      if (a === 0) {
        return new Complex$1(0, 0);
      }

      // Use |a| to keep asinh(-a) = -asinh(a) and avoid cancellation for large -a
      const x = Math.abs(a);
      const r = Math.log(x + Math.sqrt(x * x + 1));

      return new Complex$1(a < 0 ? -r : r, 0);
    }

    // z^2 + 1 = (a^2 - b^2 + 1) + i (2ab)
    const re2 = a * a - b * b + 1;
    const im2 = 2 * a * b;

    const t = new Complex$1(re2, im2)['sqrt'](); // sqrt(z^2 + 1)

    return new Complex$1(a + t['re'], b + t['im'])['log']();
  },

  /**
   * Calculate the complex acosh
   *
   * @returns {Complex}
   */
  'acosh': function () {

    // acosh(z)= log(z + sqrt(z^2 - 1)) = log(z + sqrt(z - 1) * sqrt(z + 1))

    const a = this['re'];
    const b = this['im'];

    if (b === 0) {

      // z = a is real
      if (a > 1) {
        // acosh(a) = log(a + sqrt(a - 1) * sqrt(a + 1)),  a > 1
        return new Complex$1(
          Math.log(a + Math.sqrt(a - 1) * Math.sqrt(a + 1)), 0);
      }

      if (a < -1) {
        // acosh(a) = log(-a + sqrt(a^2 - 1)) + i*pi,  a < -1
        const t = Math.sqrt(a * a - 1);
        return new Complex$1(Math.log(-a + t), Math.PI);
      }

      // -1 <= a <= 1 : purely imaginary
      // acosh(a) = i * acos(a)
      return new Complex$1(0, Math.acos(a));
    }

    const t1 = new Complex$1(a - 1, b)['sqrt'](); // sqrt(z - 1)
    const t2 = new Complex$1(a + 1, b)['sqrt'](); // sqrt(z + 1)

    return new Complex$1(
      a + t1['re'] * t2['re'] - t1['im'] * t2['im'],
      b + t1['re'] * t2['im'] + t1['im'] * t2['re']
    )['log']();
  },

  /**
   * Calculate the complex atanh
   *
   * @returns {Complex}
   */
  'atanh': function () {

    // atanh(z) = log((1 + z) / (1 - z)) / 2

    const a = this['re'];
    const b = this['im'];

    if (b === 0) {

      if (a === 0) {
        return new Complex$1(0, 0);
      }

      if (a === 1) {
        // limit x -> 1^- atanh(x) = +Infinity
        return new Complex$1(Infinity, 0);
      }

      if (a === -1) {
        // limit x -> -1^+ atanh(x) = -Infinity
        return new Complex$1(-Infinity, 0);
      }

      if (-1 < a && a < 1) {
        // Purely real
        return new Complex$1(
          0.5 * Math.log((1 + a) / (1 - a)),
          0
        );
      }

      if (a > 1) {
        // Our branch: Im(atanh(a)) = -π/2 for a > 1
        const t = (a + 1) / (a - 1); // > 0
        return new Complex$1(
          0.5 * Math.log(t),
          -Math.PI / 2
        );
      }

      // a < -1: Im(atanh(a)) = +π/2
      const t = (1 + a) / (1 - a); // < 0
      return new Complex$1(
        0.5 * Math.log(-t), // log((1 - a)/(1 + a))
        Math.PI / 2
      );
    }

    // Use atanh(z) = 0.5 * Log((1+z)/(1-z)) with principal Log.
    const oneMinus = 1 - a;
    const onePlus = 1 + a;
    const d = oneMinus * oneMinus + b * b; // |1 - z|^2

    if (d === 0) {
      // (1 - z) == 0 for finite z only at z = 1+0i, already handled above.
      // If we ever get here, just propagate infinities consistently:
      return new Complex$1(
        (a !== -1) ? (a / 0) : 0,
        (b !== 0) ? (b / 0) : 0
      );
    }

    // (1 + z) / (1 - z) with a single complex division
    const xr = (onePlus * oneMinus - b * b) / d;
    const xi = (b * oneMinus + onePlus * b) / d;

    // 0.5 * log(xr + i xi)
    return new Complex$1(
      logHypot(xr, xi) / 2,
      Math.atan2(xi, xr) / 2
    );
  },

  /**
   * Calculate the complex acoth
   *
   * @returns {Complex}
   */
  'acoth': function () {

    // acoth(z) = log((z + 1) / (z - 1)) / 2 = atanh(1 / z)

    const a = this['re'];
    const b = this['im'];

    // z = 0 -> acoth(0) = i * π / 2  (log((1+0)/(1-0))/2 = log(-1)/2)
    if (a === 0 && b === 0) {
      return new Complex$1(0, Math.PI / 2);
    }

    const d = a * a + b * b;

    if (d !== 0) {
      // 1 / z = (a - i b) / (a^2 + b^2)
      return new Complex$1(a / d, -b / d)['atanh']();
    }

    // Fallback for weird infinities/NaNs: mirror other functions' style
    return new Complex$1(
      (a !== 0) ? a / 0 : 0,
      (b !== 0) ? -b / 0 : 0
    )['atanh']();
  },

  /**
   * Calculate the complex acsch
   *
   * @returns {Complex}
   */
  'acsch': function () {

    // acsch(c) = log((1+sqrt(1+c^2))/c) = = asinh(1 / z)

    const a = this['re'];
    const b = this['im'];

    if (b === 0) {

      // z = a real
      if (a === 0) {
        // acsch(0) -> +/- Infinity, we keep your previous behavior
        return new Complex$1(Infinity, 0);
      }

      // acsch(a) = asinh(1/a) = log(1/a + sqrt(1/a^2 + 1))
      const inv = 1 / a;
      return new Complex$1(
        Math.log(inv + Math.sqrt(inv * inv + 1)),
        0
      );
    }

    const d = a * a + b * b;

    if (d !== 0) {
      // 1/z = (a - i b) / (a^2 + b^2)
      return new Complex$1(a / d, -b / d)['asinh']();
    }

    // Handle 0 + 0i or infinities in the same spirit as your existing code
    return new Complex$1(
      (a !== 0) ? a / 0 : 0,
      (b !== 0) ? -b / 0 : 0)['asinh']();
  },

  /**
   * Calculate the complex asech
   *
   * @returns {Complex}
   */
  'asech': function () {

    // asech(z) = acosh(1 / z)

    const a = this['re'];
    const b = this['im'];

    if (this['isZero']()) {
      // asech(0) = acosh(∞) -> ∞
      return Complex$1['INFINITY'];
    }

    const d = a * a + b * b;

    if (d !== 0) {
      // 1 / z = (a - i b) / (a^2 + b^2)
      return new Complex$1(a / d, -b / d)['acosh']();
    }

    // Fallback for weird infinities/NaNs
    return new Complex$1(
      (a !== 0) ? a / 0 : 0,
      (b !== 0) ? -b / 0 : 0)['acosh']();
  },

  /**
   * Calculate the complex inverse 1/z
   *
   * @returns {Complex}
   */
  'inverse': function () {

    // 1 / 0 = Infinity and 1 / Infinity = 0
    if (this['isZero']()) {
      return Complex$1['INFINITY'];
    }

    if (this['isInfinite']()) {
      return Complex$1['ZERO'];
    }

    const a = this['re'];
    const b = this['im'];

    const d = a * a + b * b;

    return new Complex$1(a / d, -b / d);
  },

  /**
   * Returns the complex conjugate
   *
   * @returns {Complex}
   */
  'conjugate': function () {

    return new Complex$1(this['re'], -this['im']);
  },

  /**
   * Gets the negated complex number
   *
   * @returns {Complex}
   */
  'neg': function () {

    return new Complex$1(-this['re'], -this['im']);
  },

  /**
   * Ceils the actual complex number
   *
   * @returns {Complex}
   */
  'ceil': function (places) {

    places = Math.pow(10, places || 0);

    return new Complex$1(
      Math.ceil(this['re'] * places) / places,
      Math.ceil(this['im'] * places) / places);
  },

  /**
   * Floors the actual complex number
   *
   * @returns {Complex}
   */
  'floor': function (places) {

    places = Math.pow(10, places || 0);

    return new Complex$1(
      Math.floor(this['re'] * places) / places,
      Math.floor(this['im'] * places) / places);
  },

  /**
   * Ceils the actual complex number
   *
   * @returns {Complex}
   */
  'round': function (places) {

    places = Math.pow(10, places || 0);

    return new Complex$1(
      Math.round(this['re'] * places) / places,
      Math.round(this['im'] * places) / places);
  },

  /**
   * Compares two complex numbers
   *
   * **Note:** new Complex(Infinity).equals(Infinity) === false
   *
   * @returns {boolean}
   */
  'equals': function (a, b) {

    const z = parse$2(a, b);

    return Math.abs(z['re'] - this['re']) <= Complex$1['EPSILON'] &&
      Math.abs(z['im'] - this['im']) <= Complex$1['EPSILON'];
  },

  /**
   * Clones the actual object
   *
   * @returns {Complex}
   */
  'clone': function () {

    return new Complex$1(this['re'], this['im']);
  },

  /**
   * Gets a string of the actual complex number
   *
   * @returns {string}
   */
  'toString': function () {

    let a = this['re'];
    let b = this['im'];
    let ret = "";

    if (this['isNaN']()) {
      return 'NaN';
    }

    if (this['isInfinite']()) {
      return 'Infinity';
    }

    if (Math.abs(a) < Complex$1['EPSILON']) {
      a = 0;
    }

    if (Math.abs(b) < Complex$1['EPSILON']) {
      b = 0;
    }

    // If is real number
    if (b === 0) {
      return ret + a;
    }

    if (a !== 0) {
      ret += a;
      ret += " ";
      if (b < 0) {
        b = -b;
        ret += "-";
      } else {
        ret += "+";
      }
      ret += " ";
    } else if (b < 0) {
      b = -b;
      ret += "-";
    }

    if (1 !== b) { // b is the absolute imaginary part
      ret += b;
    }
    return ret + "i";
  },

  /**
   * Returns the actual number as a vector
   *
   * @returns {Array}
   */
  'toVector': function () {

    return [this['re'], this['im']];
  },

  /**
   * Returns the actual real value of the current object
   *
   * @returns {number|null}
   */
  'valueOf': function () {

    if (this['im'] === 0) {
      return this['re'];
    }
    return null;
  },

  /**
   * Determines whether a complex number is not on the Riemann sphere.
   *
   * @returns {boolean}
   */
  'isNaN': function () {
    return isNaN(this['re']) || isNaN(this['im']);
  },

  /**
   * Determines whether or not a complex number is at the zero pole of the
   * Riemann sphere.
   *
   * @returns {boolean}
   */
  'isZero': function () {
    return this['im'] === 0 && this['re'] === 0;
  },

  /**
   * Determines whether a complex number is not at the infinity pole of the
   * Riemann sphere.
   *
   * @returns {boolean}
   */
  'isFinite': function () {
    return isFinite(this['re']) && isFinite(this['im']);
  },

  /**
   * Determines whether or not a complex number is at the infinity pole of the
   * Riemann sphere.
   *
   * @returns {boolean}
   */
  'isInfinite': function () {
    return !this['isFinite']();
  }
};

Complex$1['ZERO'] = new Complex$1(0, 0);
Complex$1['ONE'] = new Complex$1(1, 0);
Complex$1['I'] = new Complex$1(0, 1);
Complex$1['PI'] = new Complex$1(Math.PI, 0);
Complex$1['E'] = new Complex$1(Math.E, 0);
Complex$1['INFINITY'] = new Complex$1(Infinity, Infinity);
Complex$1['NAN'] = new Complex$1(NaN, NaN);
Complex$1['EPSILON'] = 1e-15;

var name$v = 'Complex';
var dependencies$u = [];
var createComplexClass = /* #__PURE__ */factory(name$v, dependencies$u, () => {
  /**
   * Attach type information
   */
  Object.defineProperty(Complex$1, 'name', {
    value: 'Complex'
  });
  Complex$1.prototype.constructor = Complex$1;
  Complex$1.prototype.type = 'Complex';
  Complex$1.prototype.isComplex = true;

  /**
   * Get a JSON representation of the complex number
   * @returns {Object} Returns a JSON object structured as:
   *                   `{"mathjs": "Complex", "re": 2, "im": 3}`
   */
  Complex$1.prototype.toJSON = function () {
    return {
      mathjs: 'Complex',
      re: this.re,
      im: this.im
    };
  };

  /*
   * Return the value of the complex number in polar notation
   * The angle phi will be set in the interval of [-pi, pi].
   * @return {{r: number, phi: number}} Returns and object with properties r and phi.
   */
  Complex$1.prototype.toPolar = function () {
    return {
      r: this.abs(),
      phi: this.arg()
    };
  };

  /**
   * Get a string representation of the complex number,
   * with optional formatting options.
   * @param {Object | number | Function} [options]  Formatting options. See
   *                                                lib/utils/number:format for a
   *                                                description of the available
   *                                                options.
   * @return {string} str
   */
  Complex$1.prototype.format = function (options) {
    var str = '';
    var im = this.im;
    var re = this.re;
    var strRe = format$2(this.re, options);
    var strIm = format$2(this.im, options);

    // round either re or im when smaller than the configured precision
    var precision = isNumber(options) ? options : options ? options.precision : null;
    if (precision !== null) {
      var epsilon = Math.pow(10, -precision);
      if (Math.abs(re / im) < epsilon) {
        re = 0;
      }
      if (Math.abs(im / re) < epsilon) {
        im = 0;
      }
    }
    if (im === 0) {
      // real value
      str = strRe;
    } else if (re === 0) {
      // purely complex value
      if (im === 1) {
        str = 'i';
      } else if (im === -1) {
        str = '-i';
      } else {
        str = strIm + 'i';
      }
    } else {
      // complex value
      if (im < 0) {
        if (im === -1) {
          str = strRe + ' - i';
        } else {
          str = strRe + ' - ' + strIm.substring(1) + 'i';
        }
      } else {
        if (im === 1) {
          str = strRe + ' + i';
        } else {
          str = strRe + ' + ' + strIm + 'i';
        }
      }
    }
    return str;
  };

  /**
   * Create a complex number from polar coordinates
   *
   * Usage:
   *
   *     Complex.fromPolar(r: number, phi: number) : Complex
   *     Complex.fromPolar({r: number, phi: number}) : Complex
   *
   * @param {*} args...
   * @return {Complex}
   */
  Complex$1.fromPolar = function (args) {
    switch (arguments.length) {
      case 1:
        {
          var arg = arguments[0];
          if (typeof arg === 'object') {
            return Complex$1(arg);
          } else {
            throw new TypeError('Input has to be an object with r and phi keys.');
          }
        }
      case 2:
        {
          var r = arguments[0];
          var phi = arguments[1];
          if (isNumber(r)) {
            if (isUnit(phi) && phi.hasBase('ANGLE')) {
              // convert unit to a number in radians
              phi = phi.toNumber('rad');
            }
            if (isNumber(phi)) {
              return new Complex$1({
                r,
                phi
              });
            }
            throw new TypeError('Phi is not a number nor an angle unit.');
          } else {
            throw new TypeError('Radius r is not a number.');
          }
        }
      default:
        throw new SyntaxError('Wrong number of arguments in function fromPolar');
    }
  };
  Complex$1.prototype.valueOf = Complex$1.prototype.toString;

  /**
   * Create a Complex number from a JSON object
   * @param {Object} json  A JSON Object structured as
   *                       {"mathjs": "Complex", "re": 2, "im": 3}
   *                       All properties are optional, default values
   *                       for `re` and `im` are 0.
   * @return {Complex} Returns a new Complex number
   */
  Complex$1.fromJSON = function (json) {
    return new Complex$1(json);
  };

  /**
   * Compare two complex numbers, `a` and `b`:
   *
   * - Returns 1 when the real part of `a` is larger than the real part of `b`
   * - Returns -1 when the real part of `a` is smaller than the real part of `b`
   * - Returns 1 when the real parts are equal
   *   and the imaginary part of `a` is larger than the imaginary part of `b`
   * - Returns -1 when the real parts are equal
   *   and the imaginary part of `a` is smaller than the imaginary part of `b`
   * - Returns 0 when both real and imaginary parts are equal.
   *
   * @params {Complex} a
   * @params {Complex} b
   * @returns {number} Returns the comparison result: -1, 0, or 1
   */
  Complex$1.compare = function (a, b) {
    if (a.re > b.re) {
      return 1;
    }
    if (a.re < b.re) {
      return -1;
    }
    if (a.im > b.im) {
      return 1;
    }
    if (a.im < b.im) {
      return -1;
    }
    return 0;
  };
  return Complex$1;
}, {
  isClass: true
});

/**
 *
 * This class offers the possibility to calculate fractions.
 * You can pass a fraction in different formats. Either as array, as double, as string or as an integer.
 *
 * Array/Object form
 * [ 0 => <numerator>, 1 => <denominator> ]
 * { n => <numerator>, d => <denominator> }
 *
 * Integer form
 * - Single integer value as BigInt or Number
 *
 * Double form
 * - Single double value as Number
 *
 * String form
 * 123.456 - a simple double
 * 123/456 - a string fraction
 * 123.'456' - a double with repeating decimal places
 * 123.(456) - synonym
 * 123.45'6' - a double with repeating last place
 * 123.45(6) - synonym
 *
 * Example:
 * let f = new Fraction("9.4'31'");
 * f.mul([-4, 3]).div(4.9);
 *
 */

// Set Identity function to downgrade BigInt to Number if needed
if (typeof BigInt === 'undefined') BigInt = function (n) { if (isNaN(n)) throw new Error(""); return n; };

const C_ZERO = BigInt(0);
const C_ONE = BigInt(1);
const C_TWO = BigInt(2);
const C_THREE = BigInt(3);
const C_FIVE = BigInt(5);
const C_TEN = BigInt(10);
BigInt(Number.MAX_SAFE_INTEGER);

// Maximum search depth for cyclic rational numbers. 2000 should be more than enough.
// Example: 1/7 = 0.(142857) has 6 repeating decimal places.
// If MAX_CYCLE_LEN gets reduced, long cycles will not be detected and toString() only gets the first 10 digits
const MAX_CYCLE_LEN = 2000;

// Parsed data to avoid calling "new" all the time
const P$2 = {
  "s": C_ONE,
  "n": C_ZERO,
  "d": C_ONE
};

function assign(n, s) {

  try {
    n = BigInt(n);
  } catch (e) {
    throw InvalidParameter();
  }
  return n * s;
}

function ifloor(x) {
  return typeof x === 'bigint' ? x : Math.floor(x);
}

// Creates a new Fraction internally without the need of the bulky constructor
function newFraction(n, d) {

  if (d === C_ZERO) {
    throw DivisionByZero();
  }

  const f = Object.create(Fraction$1.prototype);
  f["s"] = n < C_ZERO ? -C_ONE : C_ONE;

  n = n < C_ZERO ? -n : n;

  const a = gcd(n, d);

  f["n"] = n / a;
  f["d"] = d / a;
  return f;
}

const FACTORSTEPS = [C_TWO * C_TWO, C_TWO, C_TWO * C_TWO, C_TWO, C_TWO * C_TWO, C_TWO * C_THREE, C_TWO, C_TWO * C_THREE]; // repeats
function factorize(n) {

  const factors = Object.create(null);
  if (n <= C_ONE) {
    factors[n] = C_ONE;
    return factors;
  }

  const add = (p) => { factors[p] = (factors[p] || C_ZERO) + C_ONE; };

  while (n % C_TWO === C_ZERO) { add(C_TWO); n /= C_TWO; }
  while (n % C_THREE === C_ZERO) { add(C_THREE); n /= C_THREE; }
  while (n % C_FIVE === C_ZERO) { add(C_FIVE); n /= C_FIVE; }

  // 30-wheel trial division: test only residues coprime to 2*3*5
  // Residue step pattern after 5: 7,11,13,17,19,23,29,31, ...
  for (let si = 0, p = C_TWO + C_FIVE; p * p <= n;) {
    while (n % p === C_ZERO) { add(p); n /= p; }
    p += FACTORSTEPS[si];
    si = (si + 1) & 7; // fast modulo 8
  }
  if (n > C_ONE) add(n);
  return factors;
}

const parse$1 = function (p1, p2) {

  let n = C_ZERO, d = C_ONE, s = C_ONE;

  if (p1 === undefined || p1 === null) ; else if (p2 !== undefined) { // Two arguments

    if (typeof p1 === "bigint") {
      n = p1;
    } else if (isNaN(p1)) {
      throw InvalidParameter();
    } else if (p1 % 1 !== 0) {
      throw NonIntegerParameter();
    } else {
      n = BigInt(p1);
    }

    if (typeof p2 === "bigint") {
      d = p2;
    } else if (isNaN(p2)) {
      throw InvalidParameter();
    } else if (p2 % 1 !== 0) {
      throw NonIntegerParameter();
    } else {
      d = BigInt(p2);
    }

    s = n * d;

  } else if (typeof p1 === "object") {
    if ("d" in p1 && "n" in p1) {
      n = BigInt(p1["n"]);
      d = BigInt(p1["d"]);
      if ("s" in p1)
        n *= BigInt(p1["s"]);
    } else if (0 in p1) {
      n = BigInt(p1[0]);
      if (1 in p1)
        d = BigInt(p1[1]);
    } else if (typeof p1 === "bigint") {
      n = p1;
    } else {
      throw InvalidParameter();
    }
    s = n * d;
  } else if (typeof p1 === "number") {

    if (isNaN(p1)) {
      throw InvalidParameter();
    }

    if (p1 < 0) {
      s = -C_ONE;
      p1 = -p1;
    }

    if (p1 % 1 === 0) {
      n = BigInt(p1);
    } else {

      let z = 1;

      let A = 0, B = 1;
      let C = 1, D = 1;

      let N = 10000000;

      if (p1 >= 1) {
        z = 10 ** Math.floor(1 + Math.log10(p1));
        p1 /= z;
      }

      // Using Farey Sequences

      while (B <= N && D <= N) {
        let M = (A + C) / (B + D);

        if (p1 === M) {
          if (B + D <= N) {
            n = A + C;
            d = B + D;
          } else if (D > B) {
            n = C;
            d = D;
          } else {
            n = A;
            d = B;
          }
          break;

        } else {

          if (p1 > M) {
            A += C;
            B += D;
          } else {
            C += A;
            D += B;
          }

          if (B > N) {
            n = C;
            d = D;
          } else {
            n = A;
            d = B;
          }
        }
      }
      n = BigInt(n) * BigInt(z);
      d = BigInt(d);
    }

  } else if (typeof p1 === "string") {

    let ndx = 0;

    let v = C_ZERO, w = C_ZERO, x = C_ZERO, y = C_ONE, z = C_ONE;

    let match = p1.replace(/_/g, '').match(/\d+|./g);

    if (match === null)
      throw InvalidParameter();

    if (match[ndx] === '-') {// Check for minus sign at the beginning
      s = -C_ONE;
      ndx++;
    } else if (match[ndx] === '+') {// Check for plus sign at the beginning
      ndx++;
    }

    if (match.length === ndx + 1) { // Check if it's just a simple number "1234"
      w = assign(match[ndx++], s);
    } else if (match[ndx + 1] === '.' || match[ndx] === '.') { // Check if it's a decimal number

      if (match[ndx] !== '.') { // Handle 0.5 and .5
        v = assign(match[ndx++], s);
      }
      ndx++;

      // Check for decimal places
      if (ndx + 1 === match.length || match[ndx + 1] === '(' && match[ndx + 3] === ')' || match[ndx + 1] === "'" && match[ndx + 3] === "'") {
        w = assign(match[ndx], s);
        y = C_TEN ** BigInt(match[ndx].length);
        ndx++;
      }

      // Check for repeating places
      if (match[ndx] === '(' && match[ndx + 2] === ')' || match[ndx] === "'" && match[ndx + 2] === "'") {
        x = assign(match[ndx + 1], s);
        z = C_TEN ** BigInt(match[ndx + 1].length) - C_ONE;
        ndx += 3;
      }

    } else if (match[ndx + 1] === '/' || match[ndx + 1] === ':') { // Check for a simple fraction "123/456" or "123:456"
      w = assign(match[ndx], s);
      y = assign(match[ndx + 2], C_ONE);
      ndx += 3;
    } else if (match[ndx + 3] === '/' && match[ndx + 1] === ' ') { // Check for a complex fraction "123 1/2"
      v = assign(match[ndx], s);
      w = assign(match[ndx + 2], s);
      y = assign(match[ndx + 4], C_ONE);
      ndx += 5;
    }

    if (match.length <= ndx) { // Check for more tokens on the stack
      d = y * z;
      s = /* void */
        n = x + d * v + z * w;
    } else {
      throw InvalidParameter();
    }

  } else if (typeof p1 === "bigint") {
    n = p1;
    s = p1;
    d = C_ONE;
  } else {
    throw InvalidParameter();
  }

  if (d === C_ZERO) {
    throw DivisionByZero();
  }

  P$2["s"] = s < C_ZERO ? -C_ONE : C_ONE;
  P$2["n"] = n < C_ZERO ? -n : n;
  P$2["d"] = d < C_ZERO ? -d : d;
};

function modpow(b, e, m) {

  let r = C_ONE;
  for (; e > C_ZERO; b = (b * b) % m, e >>= C_ONE) {

    if (e & C_ONE) {
      r = (r * b) % m;
    }
  }
  return r;
}

function cycleLen(n, d) {

  for (; d % C_TWO === C_ZERO;
    d /= C_TWO) {
  }

  for (; d % C_FIVE === C_ZERO;
    d /= C_FIVE) {
  }

  if (d === C_ONE) // Catch non-cyclic numbers
    return C_ZERO;

  // If we would like to compute really large numbers quicker, we could make use of Fermat's little theorem:
  // 10^(d-1) % d == 1
  // However, we don't need such large numbers and MAX_CYCLE_LEN should be the capstone,
  // as we want to translate the numbers to strings.

  let rem = C_TEN % d;
  let t = 1;

  for (; rem !== C_ONE; t++) {
    rem = rem * C_TEN % d;

    if (t > MAX_CYCLE_LEN)
      return C_ZERO; // Returning 0 here means that we don't print it as a cyclic number. It's likely that the answer is `d-1`
  }
  return BigInt(t);
}

function cycleStart(n, d, len) {

  let rem1 = C_ONE;
  let rem2 = modpow(C_TEN, len, d);

  for (let t = 0; t < 300; t++) { // s < ~log10(Number.MAX_VALUE)
    // Solve 10^s == 10^(s+t) (mod d)

    if (rem1 === rem2)
      return BigInt(t);

    rem1 = rem1 * C_TEN % d;
    rem2 = rem2 * C_TEN % d;
  }
  return 0;
}

function gcd(a, b) {

  if (!a)
    return b;
  if (!b)
    return a;

  while (1) {
    a %= b;
    if (!a)
      return b;
    b %= a;
    if (!b)
      return a;
  }
}

/**
 * Module constructor
 *
 * @constructor
 * @param {number|Fraction=} a
 * @param {number=} b
 */
function Fraction$1(a, b) {

  parse$1(a, b);

  if (this instanceof Fraction$1) {
    a = gcd(P$2["d"], P$2["n"]); // Abuse a
    this["s"] = P$2["s"];
    this["n"] = P$2["n"] / a;
    this["d"] = P$2["d"] / a;
  } else {
    return newFraction(P$2['s'] * P$2['n'], P$2['d']);
  }
}

const DivisionByZero = function () { return new Error("Division by Zero"); };
const InvalidParameter = function () { return new Error("Invalid argument"); };
const NonIntegerParameter = function () { return new Error("Parameters must be integer"); };

Fraction$1.prototype = {

  "s": C_ONE,
  "n": C_ZERO,
  "d": C_ONE,

  /**
   * Calculates the absolute value
   *
   * Ex: new Fraction(-4).abs() => 4
   **/
  "abs": function () {

    return newFraction(this["n"], this["d"]);
  },

  /**
   * Inverts the sign of the current fraction
   *
   * Ex: new Fraction(-4).neg() => 4
   **/
  "neg": function () {

    return newFraction(-this["s"] * this["n"], this["d"]);
  },

  /**
   * Adds two rational numbers
   *
   * Ex: new Fraction({n: 2, d: 3}).add("14.9") => 467 / 30
   **/
  "add": function (a, b) {

    parse$1(a, b);
    return newFraction(
      this["s"] * this["n"] * P$2["d"] + P$2["s"] * this["d"] * P$2["n"],
      this["d"] * P$2["d"]
    );
  },

  /**
   * Subtracts two rational numbers
   *
   * Ex: new Fraction({n: 2, d: 3}).add("14.9") => -427 / 30
   **/
  "sub": function (a, b) {

    parse$1(a, b);
    return newFraction(
      this["s"] * this["n"] * P$2["d"] - P$2["s"] * this["d"] * P$2["n"],
      this["d"] * P$2["d"]
    );
  },

  /**
   * Multiplies two rational numbers
   *
   * Ex: new Fraction("-17.(345)").mul(3) => 5776 / 111
   **/
  "mul": function (a, b) {

    parse$1(a, b);
    return newFraction(
      this["s"] * P$2["s"] * this["n"] * P$2["n"],
      this["d"] * P$2["d"]
    );
  },

  /**
   * Divides two rational numbers
   *
   * Ex: new Fraction("-17.(345)").inverse().div(3)
   **/
  "div": function (a, b) {

    parse$1(a, b);
    return newFraction(
      this["s"] * P$2["s"] * this["n"] * P$2["d"],
      this["d"] * P$2["n"]
    );
  },

  /**
   * Clones the actual object
   *
   * Ex: new Fraction("-17.(345)").clone()
   **/
  "clone": function () {
    return newFraction(this['s'] * this['n'], this['d']);
  },

  /**
   * Calculates the modulo of two rational numbers - a more precise fmod
   *
   * Ex: new Fraction('4.(3)').mod([7, 8]) => (13/3) % (7/8) = (5/6)
   * Ex: new Fraction(20, 10).mod().equals(0) ? "is Integer"
   **/
  "mod": function (a, b) {

    if (a === undefined) {
      return newFraction(this["s"] * this["n"] % this["d"], C_ONE);
    }

    parse$1(a, b);
    if (C_ZERO === P$2["n"] * this["d"]) {
      throw DivisionByZero();
    }

    /**
     * I derived the rational modulo similar to the modulo for integers
     *
     * https://raw.org/book/analysis/rational-numbers/
     *
     *    n1/d1 = (n2/d2) * q + r, where 0 ≤ r < n2/d2
     * => d2 * n1 = n2 * d1 * q + d1 * d2 * r
     * => r = (d2 * n1 - n2 * d1 * q) / (d1 * d2)
     *      = (d2 * n1 - n2 * d1 * floor((d2 * n1) / (n2 * d1))) / (d1 * d2)
     *      = ((d2 * n1) % (n2 * d1)) / (d1 * d2)
     */
    return newFraction(
      this["s"] * (P$2["d"] * this["n"]) % (P$2["n"] * this["d"]),
      P$2["d"] * this["d"]);
  },

  /**
   * Calculates the fractional gcd of two rational numbers
   *
   * Ex: new Fraction(5,8).gcd(3,7) => 1/56
   */
  "gcd": function (a, b) {

    parse$1(a, b);

    // https://raw.org/book/analysis/rational-numbers/
    // gcd(a / b, c / d) = gcd(a, c) / lcm(b, d)

    return newFraction(gcd(P$2["n"], this["n"]) * gcd(P$2["d"], this["d"]), P$2["d"] * this["d"]);
  },

  /**
   * Calculates the fractional lcm of two rational numbers
   *
   * Ex: new Fraction(5,8).lcm(3,7) => 15
   */
  "lcm": function (a, b) {

    parse$1(a, b);

    // https://raw.org/book/analysis/rational-numbers/
    // lcm(a / b, c / d) = lcm(a, c) / gcd(b, d)

    if (P$2["n"] === C_ZERO && this["n"] === C_ZERO) {
      return newFraction(C_ZERO, C_ONE);
    }
    return newFraction(P$2["n"] * this["n"], gcd(P$2["n"], this["n"]) * gcd(P$2["d"], this["d"]));
  },

  /**
   * Gets the inverse of the fraction, means numerator and denominator are exchanged
   *
   * Ex: new Fraction([-3, 4]).inverse() => -4 / 3
   **/
  "inverse": function () {
    return newFraction(this["s"] * this["d"], this["n"]);
  },

  /**
   * Calculates the fraction to some integer exponent
   *
   * Ex: new Fraction(-1,2).pow(-3) => -8
   */
  "pow": function (a, b) {

    parse$1(a, b);

    // Trivial case when exp is an integer

    if (P$2['d'] === C_ONE) {

      if (P$2['s'] < C_ZERO) {
        return newFraction((this['s'] * this["d"]) ** P$2['n'], this["n"] ** P$2['n']);
      } else {
        return newFraction((this['s'] * this["n"]) ** P$2['n'], this["d"] ** P$2['n']);
      }
    }

    // Negative roots become complex
    //     (-a/b)^(c/d) = x
    // ⇔ (-1)^(c/d) * (a/b)^(c/d) = x
    // ⇔ (cos(pi) + i*sin(pi))^(c/d) * (a/b)^(c/d) = x
    // ⇔ (cos(c*pi/d) + i*sin(c*pi/d)) * (a/b)^(c/d) = x       # DeMoivre's formula
    // From which follows that only for c=0 the root is non-complex
    if (this['s'] < C_ZERO) return null;

    // Now prime factor n and d
    let N = factorize(this['n']);
    let D = factorize(this['d']);

    // Exponentiate and take root for n and d individually
    let n = C_ONE;
    let d = C_ONE;
    for (let k in N) {
      if (k === '1') continue;
      if (k === '0') {
        n = C_ZERO;
        break;
      }
      N[k] *= P$2['n'];

      if (N[k] % P$2['d'] === C_ZERO) {
        N[k] /= P$2['d'];
      } else return null;
      n *= BigInt(k) ** N[k];
    }

    for (let k in D) {
      if (k === '1') continue;
      D[k] *= P$2['n'];

      if (D[k] % P$2['d'] === C_ZERO) {
        D[k] /= P$2['d'];
      } else return null;
      d *= BigInt(k) ** D[k];
    }

    if (P$2['s'] < C_ZERO) {
      return newFraction(d, n);
    }
    return newFraction(n, d);
  },

  /**
   * Calculates the logarithm of a fraction to a given rational base
   *
   * Ex: new Fraction(27, 8).log(9, 4) => 3/2
   */
  "log": function (a, b) {

    parse$1(a, b);

    if (this['s'] <= C_ZERO || P$2['s'] <= C_ZERO) return null;

    const allPrimes = Object.create(null);

    const baseFactors = factorize(P$2['n']);
    const T1 = factorize(P$2['d']);

    const numberFactors = factorize(this['n']);
    const T2 = factorize(this['d']);

    for (const prime in T1) {
      baseFactors[prime] = (baseFactors[prime] || C_ZERO) - T1[prime];
    }
    for (const prime in T2) {
      numberFactors[prime] = (numberFactors[prime] || C_ZERO) - T2[prime];
    }

    for (const prime in baseFactors) {
      if (prime === '1') continue;
      allPrimes[prime] = true;
    }
    for (const prime in numberFactors) {
      if (prime === '1') continue;
      allPrimes[prime] = true;
    }

    let retN = null;
    let retD = null;

    // Iterate over all unique primes to determine if a consistent ratio exists
    for (const prime in allPrimes) {

      const baseExponent = baseFactors[prime] || C_ZERO;
      const numberExponent = numberFactors[prime] || C_ZERO;

      if (baseExponent === C_ZERO) {
        if (numberExponent !== C_ZERO) {
          return null; // Logarithm cannot be expressed as a rational number
        }
        continue; // Skip this prime since both exponents are zero
      }

      // Calculate the ratio of exponents for this prime
      let curN = numberExponent;
      let curD = baseExponent;

      // Simplify the current ratio
      const gcdValue = gcd(curN, curD);
      curN /= gcdValue;
      curD /= gcdValue;

      // Check if this is the first ratio; otherwise, ensure ratios are consistent
      if (retN === null && retD === null) {
        retN = curN;
        retD = curD;
      } else if (curN * retD !== retN * curD) {
        return null; // Ratios do not match, logarithm cannot be rational
      }
    }

    return retN !== null && retD !== null
      ? newFraction(retN, retD)
      : null;
  },

  /**
   * Check if two rational numbers are the same
   *
   * Ex: new Fraction(19.6).equals([98, 5]);
   **/
  "equals": function (a, b) {

    parse$1(a, b);
    return this["s"] * this["n"] * P$2["d"] === P$2["s"] * P$2["n"] * this["d"];
  },

  /**
   * Check if this rational number is less than another
   *
   * Ex: new Fraction(19.6).lt([98, 5]);
   **/
  "lt": function (a, b) {

    parse$1(a, b);
    return this["s"] * this["n"] * P$2["d"] < P$2["s"] * P$2["n"] * this["d"];
  },

  /**
   * Check if this rational number is less than or equal another
   *
   * Ex: new Fraction(19.6).lt([98, 5]);
   **/
  "lte": function (a, b) {

    parse$1(a, b);
    return this["s"] * this["n"] * P$2["d"] <= P$2["s"] * P$2["n"] * this["d"];
  },

  /**
   * Check if this rational number is greater than another
   *
   * Ex: new Fraction(19.6).lt([98, 5]);
   **/
  "gt": function (a, b) {

    parse$1(a, b);
    return this["s"] * this["n"] * P$2["d"] > P$2["s"] * P$2["n"] * this["d"];
  },

  /**
   * Check if this rational number is greater than or equal another
   *
   * Ex: new Fraction(19.6).lt([98, 5]);
   **/
  "gte": function (a, b) {

    parse$1(a, b);
    return this["s"] * this["n"] * P$2["d"] >= P$2["s"] * P$2["n"] * this["d"];
  },

  /**
   * Compare two rational numbers
   * < 0 iff this < that
   * > 0 iff this > that
   * = 0 iff this = that
   *
   * Ex: new Fraction(19.6).compare([98, 5]);
   **/
  "compare": function (a, b) {

    parse$1(a, b);
    let t = this["s"] * this["n"] * P$2["d"] - P$2["s"] * P$2["n"] * this["d"];

    return (C_ZERO < t) - (t < C_ZERO);
  },

  /**
   * Calculates the ceil of a rational number
   *
   * Ex: new Fraction('4.(3)').ceil() => (5 / 1)
   **/
  "ceil": function (places) {

    places = C_TEN ** BigInt(places || 0);

    return newFraction(ifloor(this["s"] * places * this["n"] / this["d"]) +
      (places * this["n"] % this["d"] > C_ZERO && this["s"] >= C_ZERO ? C_ONE : C_ZERO),
      places);
  },

  /**
   * Calculates the floor of a rational number
   *
   * Ex: new Fraction('4.(3)').floor() => (4 / 1)
   **/
  "floor": function (places) {

    places = C_TEN ** BigInt(places || 0);

    return newFraction(ifloor(this["s"] * places * this["n"] / this["d"]) -
      (places * this["n"] % this["d"] > C_ZERO && this["s"] < C_ZERO ? C_ONE : C_ZERO),
      places);
  },

  /**
   * Rounds a rational numbers
   *
   * Ex: new Fraction('4.(3)').round() => (4 / 1)
   **/
  "round": function (places) {

    places = C_TEN ** BigInt(places || 0);

    /* Derivation:

    s >= 0:
      round(n / d) = ifloor(n / d) + (n % d) / d >= 0.5 ? 1 : 0
                   = ifloor(n / d) + 2(n % d) >= d ? 1 : 0
    s < 0:
      round(n / d) =-ifloor(n / d) - (n % d) / d > 0.5 ? 1 : 0
                   =-ifloor(n / d) - 2(n % d) > d ? 1 : 0

    =>:

    round(s * n / d) = s * ifloor(n / d) + s * (C + 2(n % d) > d ? 1 : 0)
        where C = s >= 0 ? 1 : 0, to fix the >= for the positve case.
    */

    return newFraction(ifloor(this["s"] * places * this["n"] / this["d"]) +
      this["s"] * ((this["s"] >= C_ZERO ? C_ONE : C_ZERO) + C_TWO * (places * this["n"] % this["d"]) > this["d"] ? C_ONE : C_ZERO),
      places);
  },

  /**
    * Rounds a rational number to a multiple of another rational number
    *
    * Ex: new Fraction('0.9').roundTo("1/8") => 7 / 8
    **/
  "roundTo": function (a, b) {

    /*
    k * x/y ≤ a/b < (k+1) * x/y
    ⇔ k ≤ a/b / (x/y) < (k+1)
    ⇔ k = floor(a/b * y/x)
    ⇔ k = floor((a * y) / (b * x))
    */

    parse$1(a, b);

    const n = this['n'] * P$2['d'];
    const d = this['d'] * P$2['n'];
    const r = n % d;

    // round(n / d) = ifloor(n / d) + 2(n % d) >= d ? 1 : 0
    let k = ifloor(n / d);
    if (r + r >= d) {
      k++;
    }
    return newFraction(this['s'] * k * P$2['n'], P$2['d']);
  },

  /**
   * Check if two rational numbers are divisible
   *
   * Ex: new Fraction(19.6).divisible(1.5);
   */
  "divisible": function (a, b) {

    parse$1(a, b);
    if (P$2['n'] === C_ZERO) return false;
    return (this['n'] * P$2['d']) % (P$2['n'] * this['d']) === C_ZERO;
  },

  /**
   * Returns a decimal representation of the fraction
   *
   * Ex: new Fraction("100.'91823'").valueOf() => 100.91823918239183
   **/
  'valueOf': function () {
    //if (this['n'] <= MAX_INTEGER && this['d'] <= MAX_INTEGER) {
    return Number(this['s'] * this['n']) / Number(this['d']);
    //}
  },

  /**
   * Creates a string representation of a fraction with all digits
   *
   * Ex: new Fraction("100.'91823'").toString() => "100.(91823)"
   **/
  'toString': function (dec = 15) {

    let N = this["n"];
    let D = this["d"];

    let cycLen = cycleLen(N, D); // Cycle length
    let cycOff = cycleStart(N, D, cycLen); // Cycle start

    let str = this['s'] < C_ZERO ? "-" : "";

    // Append integer part
    str += ifloor(N / D);

    N %= D;
    N *= C_TEN;

    if (N)
      str += ".";

    if (cycLen) {

      for (let i = cycOff; i--;) {
        str += ifloor(N / D);
        N %= D;
        N *= C_TEN;
      }
      str += "(";
      for (let i = cycLen; i--;) {
        str += ifloor(N / D);
        N %= D;
        N *= C_TEN;
      }
      str += ")";
    } else {
      for (let i = dec; N && i--;) {
        str += ifloor(N / D);
        N %= D;
        N *= C_TEN;
      }
    }
    return str;
  },

  /**
   * Returns a string-fraction representation of a Fraction object
   *
   * Ex: new Fraction("1.'3'").toFraction() => "4 1/3"
   **/
  'toFraction': function (showMixed = false) {

    let n = this["n"];
    let d = this["d"];
    let str = this['s'] < C_ZERO ? "-" : "";

    if (d === C_ONE) {
      str += n;
    } else {
      const whole = ifloor(n / d);
      if (showMixed && whole > C_ZERO) {
        str += whole;
        str += " ";
        n %= d;
      }

      str += n;
      str += '/';
      str += d;
    }
    return str;
  },

  /**
   * Returns a latex representation of a Fraction object
   *
   * Ex: new Fraction("1.'3'").toLatex() => "\frac{4}{3}"
   **/
  'toLatex': function (showMixed = false) {

    let n = this["n"];
    let d = this["d"];
    let str = this['s'] < C_ZERO ? "-" : "";

    if (d === C_ONE) {
      str += n;
    } else {
      const whole = ifloor(n / d);
      if (showMixed && whole > C_ZERO) {
        str += whole;
        n %= d;
      }

      str += "\\frac{";
      str += n;
      str += '}{';
      str += d;
      str += '}';
    }
    return str;
  },

  /**
   * Returns an array of continued fraction elements
   *
   * Ex: new Fraction("7/8").toContinued() => [0,1,7]
   */
  'toContinued': function () {

    let a = this['n'];
    let b = this['d'];
    const res = [];

    while (b) {
      res.push(ifloor(a / b));
      const t = a % b;
      a = b;
      b = t;
    }
    return res;
  },

  "simplify": function (eps = 1e-3) {

    // Continued fractions give best approximations for a max denominator,
    // generally outperforming mediants in denominator–accuracy trade-offs.
    // Semiconvergents can further reduce the denominator within tolerance.

    const ieps = BigInt(Math.ceil(1 / eps));

    const thisABS = this['abs']();
    const cont = thisABS['toContinued']();

    for (let i = 1; i < cont.length; i++) {

      let s = newFraction(cont[i - 1], C_ONE);
      for (let k = i - 2; k >= 0; k--) {
        s = s['inverse']()['add'](cont[k]);
      }

      let t = s['sub'](thisABS);
      if (t['n'] * ieps < t['d']) { // More robust than Math.abs(t.valueOf()) < eps
        return s['mul'](this['s']);
      }
    }
    return this;
  }
};

var name$u = 'Fraction';
var dependencies$t = [];
var createFractionClass = /* #__PURE__ */factory(name$u, dependencies$t, () => {
  /**
   * Attach type information
   */
  Object.defineProperty(Fraction$1, 'name', {
    value: 'Fraction'
  });
  Fraction$1.prototype.constructor = Fraction$1;
  Fraction$1.prototype.type = 'Fraction';
  Fraction$1.prototype.isFraction = true;

  /**
   * Get a JSON representation of a Fraction containing type information
   * @returns {Object} Returns a JSON object structured as:
   *                   `{"mathjs": "Fraction", "n": "3", "d": "8"}`
   */
  Fraction$1.prototype.toJSON = function () {
    return {
      mathjs: 'Fraction',
      n: String(this.s * this.n),
      d: String(this.d)
    };
  };

  /**
   * Instantiate a Fraction from a JSON object
   * @param {Object} json  a JSON object structured as:
   *                       `{"mathjs": "Fraction", "n": "3", "d": "8"}`
   * @return {BigNumber}
   */
  Fraction$1.fromJSON = function (json) {
    return new Fraction$1(json);
  };
  return Fraction$1;
}, {
  isClass: true
});

var name$t = 'Matrix';
var dependencies$s = [];
var createMatrixClass = /* #__PURE__ */factory(name$t, dependencies$s, () => {
  /**
   * @constructor Matrix
   *
   * A Matrix is a wrapper around an Array. A matrix can hold a multi dimensional
   * array. A matrix can be constructed as:
   *
   *     let matrix = math.matrix(data)
   *
   * Matrix contains the functions to resize, get and set values, get the size,
   * clone the matrix and to convert the matrix to a vector, array, or scalar.
   * Furthermore, one can iterate over the matrix using map and forEach.
   * The internal Array of the Matrix can be accessed using the function valueOf.
   *
   * Example usage:
   *
   *     let matrix = math.matrix([[1, 2], [3, 4]])
   *     matix.size()              // [2, 2]
   *     matrix.resize([3, 2], 5)
   *     matrix.valueOf()          // [[1, 2], [3, 4], [5, 5]]
   *     matrix.subset([1,2])       // 3 (indexes are zero-based)
   *
   */
  function Matrix() {
    if (!(this instanceof Matrix)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }
  }

  /**
   * Attach type information
   */
  Matrix.prototype.type = 'Matrix';
  Matrix.prototype.isMatrix = true;

  /**
   * Get the storage format used by the matrix.
   *
   * Usage:
   *     const format = matrix.storage()   // retrieve storage format
   *
   * @return {string}           The storage format.
   */
  Matrix.prototype.storage = function () {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke storage on a Matrix interface');
  };

  /**
   * Get the datatype of the data stored in the matrix.
   *
   * Usage:
   *     const format = matrix.datatype()    // retrieve matrix datatype
   *
   * @return {string}           The datatype.
   */
  Matrix.prototype.datatype = function () {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke datatype on a Matrix interface');
  };

  /**
   * Create a new Matrix With the type of the current matrix instance
   * @param {Array | Object} data
   * @param {string} [datatype]
   */
  Matrix.prototype.create = function (data, datatype) {
    throw new Error('Cannot invoke create on a Matrix interface');
  };

  /**
   * Get a subset of the matrix, or replace a subset of the matrix.
   *
   * Usage:
   *     const subset = matrix.subset(index)               // retrieve subset
   *     const value = matrix.subset(index, replacement)   // replace subset
   *
   * @param {Index} index
   * @param {Array | Matrix | *} [replacement]
   * @param {*} [defaultValue=0]      Default value, filled in on new entries when
   *                                  the matrix is resized. If not provided,
   *                                  new matrix elements will be filled with zeros.
   */
  Matrix.prototype.subset = function (index, replacement, defaultValue) {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke subset on a Matrix interface');
  };

  /**
   * Get a single element from the matrix.
   * @param {number[]} index   Zero-based index
   * @return {*} value
   */
  Matrix.prototype.get = function (index) {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke get on a Matrix interface');
  };

  /**
   * Replace a single element in the matrix.
   * @param {number[]} index   Zero-based index
   * @param {*} value
   * @param {*} [defaultValue]        Default value, filled in on new entries when
   *                                  the matrix is resized. If not provided,
   *                                  new matrix elements will be left undefined.
   * @return {Matrix} self
   */
  Matrix.prototype.set = function (index, value, defaultValue) {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke set on a Matrix interface');
  };

  /**
   * Resize the matrix to the given size. Returns a copy of the matrix when
   * `copy=true`, otherwise return the matrix itself (resize in place).
   *
   * @param {number[]} size           The new size the matrix should have.
   * @param {*} [defaultValue=0]      Default value, filled in on new entries.
   *                                  If not provided, the matrix elements will
   *                                  be filled with zeros.
   * @param {boolean} [copy]          Return a resized copy of the matrix
   *
   * @return {Matrix}                 The resized matrix
   */
  Matrix.prototype.resize = function (size, defaultValue) {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke resize on a Matrix interface');
  };

  /**
   * Reshape the matrix to the given size. Returns a copy of the matrix when
   * `copy=true`, otherwise return the matrix itself (reshape in place).
   *
   * @param {number[]} size           The new size the matrix should have.
   * @param {boolean} [copy]          Return a reshaped copy of the matrix
   *
   * @return {Matrix}                 The reshaped matrix
   */
  Matrix.prototype.reshape = function (size, defaultValue) {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke reshape on a Matrix interface');
  };

  /**
   * Create a clone of the matrix
   * @return {Matrix} clone
   */
  Matrix.prototype.clone = function () {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke clone on a Matrix interface');
  };

  /**
   * Retrieve the size of the matrix.
   * @returns {number[]} size
   */
  Matrix.prototype.size = function () {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke size on a Matrix interface');
  };

  /**
   * Create a new matrix with the results of the callback function executed on
   * each entry of the matrix.
   * @param {Function} callback   The callback function is invoked with three
   *                              parameters: the value of the element, the index
   *                              of the element, and the Matrix being traversed.
   * @param {boolean} [skipZeros] Invoke callback function for non-zero values only.
   *
   * @return {Matrix} matrix
   */
  Matrix.prototype.map = function (callback, skipZeros) {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke map on a Matrix interface');
  };

  /**
   * Execute a callback function on each entry of the matrix.
   * @param {Function} callback   The callback function is invoked with three
   *                              parameters: the value of the element, the index
   *                              of the element, and the Matrix being traversed.
   */
  Matrix.prototype.forEach = function (callback) {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke forEach on a Matrix interface');
  };

  /**
   * Iterate over the matrix elements
   * @return {Iterable<{ value, index: number[] }>}
   */
  Matrix.prototype[Symbol.iterator] = function () {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot iterate a Matrix interface');
  };

  /**
   * Create an Array with a copy of the data of the Matrix
   * @returns {Array} array
   */
  Matrix.prototype.toArray = function () {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke toArray on a Matrix interface');
  };

  /**
   * Get the primitive value of the Matrix: a multidimensional array
   * @returns {Array} array
   */
  Matrix.prototype.valueOf = function () {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke valueOf on a Matrix interface');
  };

  /**
   * Get a string representation of the matrix, with optional formatting options.
   * @param {Object | number | Function} [options]  Formatting options. See
   *                                                lib/utils/number:format for a
   *                                                description of the available
   *                                                options.
   * @returns {string} str
   */
  Matrix.prototype.format = function (options) {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke format on a Matrix interface');
  };

  /**
   * Get a string representation of the matrix
   * @returns {string} str
   */
  Matrix.prototype.toString = function () {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke toString on a Matrix interface');
  };
  return Matrix;
}, {
  isClass: true
});

/**
 * Formats a BigNumber in a given base
 * @param {BigNumber} n
 * @param {number} base
 * @param {number} size
 * @returns {string}
 */
function formatBigNumberToBase(n, base, size) {
  var BigNumberCtor = n.constructor;
  var big2 = new BigNumberCtor(2);
  var suffix = '';
  if (size) {
    if (size < 1) {
      throw new Error('size must be in greater than 0');
    }
    if (!isInteger(size)) {
      throw new Error('size must be an integer');
    }
    if (n.greaterThan(big2.pow(size - 1).sub(1)) || n.lessThan(big2.pow(size - 1).mul(-1))) {
      throw new Error("Value must be in range [-2^".concat(size - 1, ", 2^").concat(size - 1, "-1]"));
    }
    if (!n.isInteger()) {
      throw new Error('Value must be an integer');
    }
    if (n.lessThan(0)) {
      n = n.add(big2.pow(size));
    }
    suffix = "i".concat(size);
  }
  switch (base) {
    case 2:
      return "".concat(n.toBinary()).concat(suffix);
    case 8:
      return "".concat(n.toOctal()).concat(suffix);
    case 16:
      return "".concat(n.toHexadecimal()).concat(suffix);
    default:
      throw new Error("Base ".concat(base, " not supported "));
  }
}

/**
 * Convert a BigNumber to a formatted string representation.
 *
 * Syntax:
 *
 *    format(value)
 *    format(value, options)
 *    format(value, precision)
 *    format(value, fn)
 *
 * Where:
 *
 *    {number} value   The value to be formatted
 *    {Object} options An object with formatting options. Available options:
 *                     {string} notation
 *                         Number notation. Choose from:
 *                         'fixed'          Always use regular number notation.
 *                                          For example '123.40' and '14000000'
 *                         'exponential'    Always use exponential notation.
 *                                          For example '1.234e+2' and '1.4e+7'
 *                         'auto' (default) Regular number notation for numbers
 *                                          having an absolute value between
 *                                          `lower` and `upper` bounds, and uses
 *                                          exponential notation elsewhere.
 *                                          Lower bound is included, upper bound
 *                                          is excluded.
 *                                          For example '123.4' and '1.4e7'.
 *                         'bin', 'oct, or
 *                         'hex'            Format the number using binary, octal,
 *                                          or hexadecimal notation.
 *                                          For example '0b1101' and '0x10fe'.
 *                     {number} wordSize    The word size in bits to use for formatting
 *                                          in binary, octal, or hexadecimal notation.
 *                                          To be used only with 'bin', 'oct', or 'hex'
 *                                          values for 'notation' option. When this option
 *                                          is defined the value is formatted as a signed
 *                                          twos complement integer of the given word size
 *                                          and the size suffix is appended to the output.
 *                                          For example
 *                                          format(-1, {notation: 'hex', wordSize: 8}) === '0xffi8'.
 *                                          Default value is undefined.
 *                     {number} precision   A number between 0 and 16 to round
 *                                          the digits of the number.
 *                                          In case of notations 'exponential',
 *                                          'engineering', and 'auto',
 *                                          `precision` defines the total
 *                                          number of significant digits returned.
 *                                          In case of notation 'fixed',
 *                                          `precision` defines the number of
 *                                          significant digits after the decimal
 *                                          point.
 *                                          `precision` is undefined by default.
 *                     {number} lowerExp    Exponent determining the lower boundary
 *                                          for formatting a value with an exponent
 *                                          when `notation='auto`.
 *                                          Default value is `-3`.
 *                     {number} upperExp    Exponent determining the upper boundary
 *                                          for formatting a value with an exponent
 *                                          when `notation='auto`.
 *                                          Default value is `5`.
 *    {Function} fn    A custom formatting function. Can be used to override the
 *                     built-in notations. Function `fn` is called with `value` as
 *                     parameter and must return a string. Is useful for example to
 *                     format all values inside a matrix in a particular way.
 *
 * Examples:
 *
 *    format(6.4)                                        // '6.4'
 *    format(1240000)                                    // '1.24e6'
 *    format(1/3)                                        // '0.3333333333333333'
 *    format(1/3, 3)                                     // '0.333'
 *    format(21385, 2)                                   // '21000'
 *    format(12e8, {notation: 'fixed'})                  // returns '1200000000'
 *    format(2.3,    {notation: 'fixed', precision: 4})  // returns '2.3000'
 *    format(52.8,   {notation: 'exponential'})          // returns '5.28e+1'
 *    format(12400,  {notation: 'engineering'})          // returns '12.400e+3'
 *
 * @param {BigNumber} value
 * @param {Object | Function | number | BigNumber} [options]
 * @return {string} str The formatted value
 */
function format$1(value, options) {
  if (typeof options === 'function') {
    // handle format(value, fn)
    return options(value);
  }

  // handle special cases
  if (!value.isFinite()) {
    return value.isNaN() ? 'NaN' : value.gt(0) ? 'Infinity' : '-Infinity';
  }
  var {
    notation,
    precision,
    wordSize
  } = normalizeFormatOptions(options);

  // handle the various notations
  switch (notation) {
    case 'fixed':
      return toFixed(value, precision);
    case 'exponential':
      return toExponential(value, precision);
    case 'engineering':
      return toEngineering(value, precision);
    case 'bin':
      return formatBigNumberToBase(value, 2, wordSize);
    case 'oct':
      return formatBigNumberToBase(value, 8, wordSize);
    case 'hex':
      return formatBigNumberToBase(value, 16, wordSize);
    case 'auto':
      {
        // determine lower and upper bound for exponential notation.
        // TODO: implement support for upper and lower to be BigNumbers themselves
        var lowerExp = _toNumberOrDefault(options === null || options === void 0 ? void 0 : options.lowerExp, -3);
        var upperExp = _toNumberOrDefault(options === null || options === void 0 ? void 0 : options.upperExp, 5);

        // handle special case zero
        if (value.isZero()) return '0';

        // determine whether or not to output exponential notation
        var str;
        var rounded = value.toSignificantDigits(precision);
        var exp = rounded.e;
        if (exp >= lowerExp && exp < upperExp) {
          // normal number notation
          str = rounded.toFixed();
        } else {
          // exponential notation
          str = toExponential(value, precision);
        }

        // remove trailing zeros after the decimal point
        return str.replace(/((\.\d*?)(0+))($|e)/, function () {
          var digits = arguments[2];
          var e = arguments[4];
          return digits !== '.' ? digits + e : e;
        });
      }
    default:
      throw new Error('Unknown notation "' + notation + '". ' + 'Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}

/**
 * Format a BigNumber in engineering notation. Like '1.23e+6', '2.3e+0', '3.500e-3'
 * @param {BigNumber} value
 * @param {number} [precision]        Optional number of significant figures to return.
 */
function toEngineering(value, precision) {
  // find nearest lower multiple of 3 for exponent
  var e = value.e;
  var newExp = e % 3 === 0 ? e : e < 0 ? e - 3 - e % 3 : e - e % 3;

  // find difference in exponents, and calculate the value without exponent
  var valueWithoutExp = value.mul(Math.pow(10, -newExp));
  var valueStr = valueWithoutExp.toPrecision(precision);
  if (valueStr.includes('e')) {
    var BigNumber = value.constructor;
    valueStr = new BigNumber(valueStr).toFixed();
  }
  return valueStr + 'e' + (e >= 0 ? '+' : '') + newExp.toString();
}

/**
 * Format a number in exponential notation. Like '1.23e+5', '2.3e+0', '3.500e-3'
 * @param {BigNumber} value
 * @param {number} [precision]  Number of digits in formatted output.
 *                              If not provided, the maximum available digits
 *                              is used.
 * @returns {string} str
 */
function toExponential(value, precision) {
  if (precision !== undefined) {
    return value.toExponential(precision - 1); // Note the offset of one
  } else {
    return value.toExponential();
  }
}

/**
 * Format a number with fixed notation.
 * @param {BigNumber} value
 * @param {number} [precision=undefined] Optional number of decimals after the
 *                                       decimal point. Undefined by default.
 */
function toFixed(value, precision) {
  return value.toFixed(precision);
}
function _toNumberOrDefault(value, defaultValue) {
  if (isNumber(value)) {
    return value;
  } else if (isBigNumber(value)) {
    return value.toNumber();
  } else {
    return defaultValue;
  }
}

/**
 * Format a value of any type into a string.
 *
 * Usage:
 *     math.format(value)
 *     math.format(value, precision)
 *     math.format(value, options)
 *
 * When value is a function:
 *
 * - When the function has a property `syntax`, it returns this
 *   syntax description.
 * - In other cases, a string `'function'` is returned.
 *
 * When `value` is an Object:
 *
 * - When the object contains a property `format` being a function, this
 *   function is invoked as `value.format(options)` and the result is returned.
 * - When the object has its own `toString` method, this method is invoked
 *   and the result is returned.
 * - In other cases the function will loop over all object properties and
 *   return JSON object notation like '{"a": 2, "b": 3}'.
 *
 * Example usage:
 *     math.format(2/7)                // '0.2857142857142857'
 *     math.format(math.pi, 3)         // '3.14'
 *     math.format(new Complex(2, 3))  // '2 + 3i'
 *     math.format('hello')            // '"hello"'
 *
 * @param {*} value             Value to be stringified
 * @param {Object | number | Function} [options]
 *     Formatting options. See src/utils/number.js:format for a
 *     description of the available options controlling number output.
 *     This generic "format" also supports the option property `truncate: NN`
 *     giving the maximum number NN of characters to return (if there would
 *     have been more, they are deleted and replaced by an ellipsis).
 * @return {string} str
 */
function format(value, options) {
  var result = _format(value, options);
  if (options && typeof options === 'object' && 'truncate' in options && result.length > options.truncate) {
    return result.substring(0, options.truncate - 3) + '...';
  }
  return result;
}
function _format(value, options) {
  if (typeof value === 'number') {
    return format$2(value, options);
  }
  if (isBigNumber(value)) {
    return format$1(value, options);
  }

  // note: we use unsafe duck-typing here to check for Fractions, this is
  // ok here since we're only invoking toString or concatenating its values
  if (looksLikeFraction(value)) {
    if (!options || options.fraction !== 'decimal') {
      // output as ratio, like '1/3'
      return "".concat(value.s * value.n, "/").concat(value.d);
    } else {
      // output as decimal, like '0.(3)'
      return value.toString();
    }
  }
  if (Array.isArray(value)) {
    return formatArray(value, options);
  }
  if (isString(value)) {
    return stringify(value);
  }
  if (typeof value === 'function') {
    return value.syntax ? String(value.syntax) : 'function';
  }
  if (value && typeof value === 'object') {
    if (typeof value.format === 'function') {
      return value.format(options);
    } else if (value && value.toString(options) !== {}.toString()) {
      // this object has a non-native toString method, use that one
      return value.toString(options);
    } else {
      var entries = Object.keys(value).map(key => {
        return stringify(key) + ': ' + format(value[key], options);
      });
      return '{' + entries.join(', ') + '}';
    }
  }
  return String(value);
}

/**
 * Stringify a value into a string enclosed in double quotes.
 * Unescaped double quotes and backslashes inside the value are escaped.
 * @param {*} value
 * @return {string}
 */
function stringify(value) {
  var text = String(value);
  var escaped = '';
  var i = 0;
  while (i < text.length) {
    var c = text.charAt(i);
    escaped += c in controlCharacters ? controlCharacters[c] : c;
    i++;
  }
  return '"' + escaped + '"';
}
var controlCharacters = {
  '"': '\\"',
  '\\': '\\\\',
  '\b': '\\b',
  '\f': '\\f',
  '\n': '\\n',
  '\r': '\\r',
  '\t': '\\t'
};

/**
 * Recursively format an n-dimensional matrix
 * Example output: "[[1, 2], [3, 4]]"
 * @param {Array} array
 * @param {Object | number | Function} [options]  Formatting options. See
 *                                                lib/utils/number:format for a
 *                                                description of the available
 *                                                options.
 * @returns {string} str
 */
function formatArray(array, options) {
  if (Array.isArray(array)) {
    var str = '[';
    var len = array.length;
    for (var i = 0; i < len; i++) {
      if (i !== 0) {
        str += ', ';
      }
      str += formatArray(array[i], options);
    }
    str += ']';
    return str;
  } else {
    return format(array, options);
  }
}

/**
 * Check whether a value looks like a Fraction (unsafe duck-type check)
 * @param {*} value
 * @return {boolean}
 */
function looksLikeFraction(value) {
  return value && typeof value === 'object' && typeof value.s === 'bigint' && typeof value.n === 'bigint' && typeof value.d === 'bigint' || false;
}

/**
 * Create a range error with the message:
 *     'Dimension mismatch (<actual size> != <expected size>)'
 * @param {number | number[]} actual        The actual size
 * @param {number | number[]} expected      The expected size
 * @param {string} [relation='!=']          Optional relation between actual
 *                                          and expected size: '!=', '<', etc.
 * @extends RangeError
 */
function DimensionError(actual, expected, relation) {
  if (!(this instanceof DimensionError)) {
    throw new SyntaxError('Constructor must be called with the new operator');
  }
  this.actual = actual;
  this.expected = expected;
  this.relation = relation;
  this.message = 'Dimension mismatch (' + (Array.isArray(actual) ? '[' + actual.join(', ') + ']' : actual) + ' ' + (this.relation || '!=') + ' ' + (Array.isArray(expected) ? '[' + expected.join(', ') + ']' : expected) + ')';
  this.stack = new Error().stack;
}
DimensionError.prototype = new RangeError();
DimensionError.prototype.constructor = RangeError;
DimensionError.prototype.name = 'DimensionError';
DimensionError.prototype.isDimensionError = true;

/**
 * Create a range error with the message:
 *     'Index out of range (index < min)'
 *     'Index out of range (index < max)'
 *
 * @param {number} index     The actual index
 * @param {number} [min=0]   Minimum index (included)
 * @param {number} [max]     Maximum index (excluded)
 * @extends RangeError
 */
function IndexError(index, min, max) {
  if (!(this instanceof IndexError)) {
    throw new SyntaxError('Constructor must be called with the new operator');
  }
  this.index = index;
  if (arguments.length < 3) {
    this.min = 0;
    this.max = min;
  } else {
    this.min = min;
    this.max = max;
  }
  if (this.min !== undefined && this.index < this.min) {
    this.message = 'Index out of range (' + this.index + ' < ' + this.min + ')';
  } else if (this.max !== undefined && this.index >= this.max) {
    this.message = 'Index out of range (' + this.index + ' > ' + (this.max - 1) + ')';
  } else {
    this.message = 'Index out of range (' + this.index + ')';
  }
  this.stack = new Error().stack;
}
IndexError.prototype = new RangeError();
IndexError.prototype.constructor = RangeError;
IndexError.prototype.name = 'IndexError';
IndexError.prototype.isIndexError = true;

/**
 * Calculate the size of a multi dimensional array.
 * This function checks the size of the first entry, it does not validate
 * whether all dimensions match. (use function `validate` for that)
 * @param {Array} x
 * @return {number[]} size
 */
function arraySize(x) {
  var s = [];
  while (Array.isArray(x)) {
    s.push(x.length);
    x = x[0];
  }
  return s;
}

/**
 * Recursively validate whether each element in a multi dimensional array
 * has a size corresponding to the provided size array.
 * @param {Array} array    Array to be validated
 * @param {number[]} size  Array with the size of each dimension
 * @param {number} dim     Current dimension
 * @throws DimensionError
 * @private
 */
function _validate(array, size, dim) {
  var i;
  var len = array.length;
  if (len !== size[dim]) {
    throw new DimensionError(len, size[dim]);
  }
  if (dim < size.length - 1) {
    // recursively validate each child array
    var dimNext = dim + 1;
    for (i = 0; i < len; i++) {
      var child = array[i];
      if (!Array.isArray(child)) {
        throw new DimensionError(size.length - 1, size.length, '<');
      }
      _validate(array[i], size, dimNext);
    }
  } else {
    // last dimension. none of the children may be an array
    for (i = 0; i < len; i++) {
      if (Array.isArray(array[i])) {
        throw new DimensionError(size.length + 1, size.length, '>');
      }
    }
  }
}

/**
 * Validate whether each element in a multi dimensional array has
 * a size corresponding to the provided size array.
 * @param {Array} array    Array to be validated
 * @param {number[]} size  Array with the size of each dimension
 * @throws DimensionError
 */
function validate(array, size) {
  var isScalar = size.length === 0;
  if (isScalar) {
    // scalar
    if (Array.isArray(array)) {
      throw new DimensionError(array.length, 0);
    }
  } else {
    // array
    _validate(array, size, 0);
  }
}

/**
 * Test whether index is an integer number with index >= 0 and index < length
 * when length is provided
 * @param {number} index    Zero-based index
 * @param {number} [length] Length of the array
 */
function validateIndex(index, length) {
  if (index !== undefined) {
    if (!isNumber(index) || !isInteger(index)) {
      throw new TypeError('Index must be an integer (value: ' + index + ')');
    }
    if (index < 0 || typeof length === 'number' && index >= length) {
      throw new IndexError(index, length);
    }
  }
}

/**
 * Resize a multi dimensional array. The resized array is returned.
 * @param {Array | number} array         Array to be resized
 * @param {number[]} size Array with the size of each dimension
 * @param {*} [defaultValue=0]  Value to be filled in new entries,
 *                              zero by default. Specify for example `null`,
 *                              to clearly see entries that are not explicitly
 *                              set.
 * @return {Array} array         The resized array
 */
function resize(array, size, defaultValue) {
  // check the type of the arguments
  if (!Array.isArray(size)) {
    throw new TypeError('Array expected');
  }
  if (size.length === 0) {
    throw new Error('Resizing to scalar is not supported');
  }

  // check whether size contains positive integers
  size.forEach(function (value) {
    if (!isNumber(value) || !isInteger(value) || value < 0) {
      throw new TypeError('Invalid size, must contain positive integers ' + '(size: ' + format(size) + ')');
    }
  });

  // convert number to an array
  if (isNumber(array) || isBigNumber(array)) {
    array = [array];
  }

  // recursively resize the array
  var _defaultValue = defaultValue !== undefined ? defaultValue : 0;
  _resize(array, size, 0, _defaultValue);
  return array;
}

/**
 * Recursively resize a multi dimensional array
 * @param {Array} array         Array to be resized
 * @param {number[]} size       Array with the size of each dimension
 * @param {number} dim          Current dimension
 * @param {*} [defaultValue]    Value to be filled in new entries,
 *                              undefined by default.
 * @private
 */
function _resize(array, size, dim, defaultValue) {
  var i;
  var elem;
  var oldLen = array.length;
  var newLen = size[dim];
  var minLen = Math.min(oldLen, newLen);

  // apply new length
  array.length = newLen;
  if (dim < size.length - 1) {
    // non-last dimension
    var dimNext = dim + 1;

    // resize existing child arrays
    for (i = 0; i < minLen; i++) {
      // resize child array
      elem = array[i];
      if (!Array.isArray(elem)) {
        elem = [elem]; // add a dimension
        array[i] = elem;
      }
      _resize(elem, size, dimNext, defaultValue);
    }

    // create new child arrays
    for (i = minLen; i < newLen; i++) {
      // get child array
      elem = [];
      array[i] = elem;

      // resize new child array
      _resize(elem, size, dimNext, defaultValue);
    }
  } else {
    // last dimension

    // remove dimensions of existing values
    for (i = 0; i < minLen; i++) {
      while (Array.isArray(array[i])) {
        array[i] = array[i][0];
      }
    }

    // fill new elements with the default value
    for (i = minLen; i < newLen; i++) {
      array[i] = defaultValue;
    }
  }
}

/**
 * Re-shape a multi dimensional array to fit the specified dimensions
 * @param {Array} array           Array to be reshaped
 * @param {number[]} sizes        List of sizes for each dimension
 * @returns {Array}               Array whose data has been formatted to fit the
 *                                specified dimensions
 *
 * @throws {DimensionError}       If the product of the new dimension sizes does
 *                                not equal that of the old ones
 */
function reshape$1(array, sizes) {
  var flatArray = flatten$1(array, true); // since it has rectangular
  var currentLength = flatArray.length;
  if (!Array.isArray(array) || !Array.isArray(sizes)) {
    throw new TypeError('Array expected');
  }
  if (sizes.length === 0) {
    throw new DimensionError(0, currentLength, '!=');
  }
  sizes = processSizesWildcard(sizes, currentLength);
  var newLength = product$1(sizes);
  if (currentLength !== newLength) {
    throw new DimensionError(newLength, currentLength, '!=');
  }
  try {
    return _reshape(flatArray, sizes);
  } catch (e) {
    if (e instanceof DimensionError) {
      throw new DimensionError(newLength, currentLength, '!=');
    }
    throw e;
  }
}

/**
 * Replaces the wildcard -1 in the sizes array.
 * @param {number[]} sizes  List of sizes for each dimension. At most one wildcard.
 * @param {number} currentLength  Number of elements in the array.
 * @throws {Error}                If more than one wildcard or unable to replace it.
 * @returns {number[]}      The sizes array with wildcard replaced.
 */
function processSizesWildcard(sizes, currentLength) {
  var newLength = product$1(sizes);
  var processedSizes = sizes.slice();
  var WILDCARD = -1;
  var wildCardIndex = sizes.indexOf(WILDCARD);
  var isMoreThanOneWildcard = sizes.indexOf(WILDCARD, wildCardIndex + 1) >= 0;
  if (isMoreThanOneWildcard) {
    throw new Error('More than one wildcard in sizes');
  }
  var hasWildcard = wildCardIndex >= 0;
  var canReplaceWildcard = currentLength % newLength === 0;
  if (hasWildcard) {
    if (canReplaceWildcard) {
      processedSizes[wildCardIndex] = -currentLength / newLength;
    } else {
      throw new Error('Could not replace wildcard, since ' + currentLength + ' is no multiple of ' + -newLength);
    }
  }
  return processedSizes;
}

/**
 * Computes the product of all array elements.
 * @param {number[]} array Array of factors
 * @returns {number}            Product of all elements
 */
function product$1(array) {
  return array.reduce((prev, curr) => prev * curr, 1);
}

/**
 * Iteratively re-shape a multi dimensional array to fit the specified dimensions
 * @param {Array} array           Array to be reshaped
 * @param {number[]} sizes  List of sizes for each dimension
 * @returns {Array}               Array whose data has been formatted to fit the
 *                                specified dimensions
 */

function _reshape(array, sizes) {
  // testing if there are enough elements for the requested shape
  var tmpArray = array;
  var tmpArray2;
  // for each dimension starting by the last one and ignoring the first one
  for (var sizeIndex = sizes.length - 1; sizeIndex > 0; sizeIndex--) {
    var size = sizes[sizeIndex];
    tmpArray2 = [];

    // aggregate the elements of the current tmpArray in elements of the requested size
    var length = tmpArray.length / size;
    for (var i = 0; i < length; i++) {
      tmpArray2.push(tmpArray.slice(i * size, (i + 1) * size));
    }
    // set it as the new tmpArray for the next loop turn or for return
    tmpArray = tmpArray2;
  }
  return tmpArray;
}

/**
 * Unsqueeze a multi dimensional array: add dimensions when missing
 *
 * Parameter `size` will be mutated to match the new, unsqueezed matrix size.
 *
 * @param {Array} array
 * @param {number} dims       Desired number of dimensions of the array
 * @param {number} [outer]    Number of outer dimensions to be added
 * @param {Array} [size] Current size of array.
 * @returns {Array} returns the array itself
 * @private
 */
function unsqueeze$1(array, dims, outer, size) {
  var s = size || arraySize(array);

  // unsqueeze outer dimensions
  if (outer) {
    for (var i = 0; i < outer; i++) {
      array = [array];
      s.unshift(1);
    }
  }

  // unsqueeze inner dimensions
  array = _unsqueeze(array, dims, 0);
  while (s.length < dims) {
    s.push(1);
  }
  return array;
}

/**
 * Recursively unsqueeze a multi dimensional array
 * @param {Array} array
 * @param {number} dims Required number of dimensions
 * @param {number} dim  Current dimension
 * @returns {Array | *} Returns the unsqueezed array
 * @private
 */
function _unsqueeze(array, dims, dim) {
  var i, ii;
  if (Array.isArray(array)) {
    var next = dim + 1;
    for (i = 0, ii = array.length; i < ii; i++) {
      array[i] = _unsqueeze(array[i], dims, next);
    }
  } else {
    for (var d = dim; d < dims; d++) {
      array = [array];
    }
  }
  return array;
}
/**
 * Flatten a multi dimensional array, put all elements in a one dimensional
 * array
 * @param {Array} array   A multi dimensional array
 * @param {boolean} isRectangular Optional. If the array is rectangular (not jagged)
 * @return {Array}        The flattened array (1 dimensional)
 */
function flatten$1(array) {
  var isRectangular = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!Array.isArray(array)) {
    // if not an array, return as is
    return array;
  }
  if (typeof isRectangular !== 'boolean') {
    throw new TypeError('Boolean expected for second argument of flatten');
  }
  var flat = [];
  if (isRectangular) {
    _flattenRectangular(array);
  } else {
    _flatten(array);
  }
  return flat;
  function _flatten(array) {
    for (var i = 0; i < array.length; i++) {
      var item = array[i];
      if (Array.isArray(item)) {
        _flatten(item);
      } else {
        flat.push(item);
      }
    }
  }
  function _flattenRectangular(array) {
    if (Array.isArray(array[0])) {
      for (var i = 0; i < array.length; i++) {
        _flattenRectangular(array[i]);
      }
    } else {
      for (var _i = 0; _i < array.length; _i++) {
        flat.push(array[_i]);
      }
    }
  }
}

/**
 * Check the datatype of a given object
 * This is a low level implementation that should only be used by
 * parent Matrix classes such as SparseMatrix or DenseMatrix
 * This method does not validate Array Matrix shape
 * @param {Array} array
 * @param {function} typeOf   Callback function to use to determine the type of a value
 * @return {string}
 */
function getArrayDataType(array, typeOf) {
  var type; // to hold type info
  var length = 0; // to hold length value to ensure it has consistent sizes

  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    var _isArray = Array.isArray(item);

    // Saving the target matrix row size
    if (i === 0 && _isArray) {
      length = item.length;
    }

    // If the current item is an array but the length does not equal the targetVectorSize
    if (_isArray && item.length !== length) {
      return undefined;
    }
    var itemType = _isArray ? getArrayDataType(item, typeOf) // recurse into a nested array
    : typeOf(item);
    if (type === undefined) {
      type = itemType; // first item
    } else if (type !== itemType) {
      return 'mixed';
    } else ;
  }
  return type;
}

/**
 * Recursively concatenate two matrices.
 * The contents of the matrices are not cloned.
 * @param {Array} a             Multi dimensional array
 * @param {Array} b             Multi dimensional array
 * @param {number} concatDim    The dimension on which to concatenate (zero-based)
 * @param {number} dim          The current dim (zero-based)
 * @return {Array} c            The concatenated matrix
 * @private
 */
function concatRecursive(a, b, concatDim, dim) {
  if (dim < concatDim) {
    // recurse into next dimension
    if (a.length !== b.length) {
      throw new DimensionError(a.length, b.length);
    }
    var c = [];
    for (var i = 0; i < a.length; i++) {
      c[i] = concatRecursive(a[i], b[i], concatDim, dim + 1);
    }
    return c;
  } else {
    // concatenate this dimension
    return a.concat(b);
  }
}

/**
 * Concatenates many arrays in the specified direction
 * @param {...Array} arrays All the arrays to concatenate
 * @param {number} concatDim The dimension on which to concatenate (zero-based)
 * @returns {Array}
 */
function concat() {
  var arrays = Array.prototype.slice.call(arguments, 0, -1);
  var concatDim = Array.prototype.slice.call(arguments, -1);
  if (arrays.length === 1) {
    return arrays[0];
  }
  if (arrays.length > 1) {
    return arrays.slice(1).reduce(function (A, B) {
      return concatRecursive(A, B, concatDim, 0);
    }, arrays[0]);
  } else {
    throw new Error('Wrong number of arguments in function concat');
  }
}

/**
 * Receives two or more sizes and gets the broadcasted size for both.
 * @param  {...number[]} sizes Sizes to broadcast together
 * @returns {number[]} The broadcasted size
 */
function broadcastSizes() {
  for (var _len = arguments.length, sizes = new Array(_len), _key = 0; _key < _len; _key++) {
    sizes[_key] = arguments[_key];
  }
  var dimensions = sizes.map(s => s.length);
  var N = Math.max(...dimensions);
  var sizeMax = new Array(N).fill(null);
  // check for every size
  for (var i = 0; i < sizes.length; i++) {
    var size = sizes[i];
    var dim = dimensions[i];
    for (var j = 0; j < dim; j++) {
      var n = N - dim + j;
      if (size[j] > sizeMax[n]) {
        sizeMax[n] = size[j];
      }
    }
  }
  for (var _i2 = 0; _i2 < sizes.length; _i2++) {
    checkBroadcastingRules(sizes[_i2], sizeMax);
  }
  return sizeMax;
}

/**
 * Checks if it's possible to broadcast a size to another size
 * @param {number[]} size The size of the array to check
 * @param {number[]} toSize The size of the array to validate if it can be broadcasted to
 */
function checkBroadcastingRules(size, toSize) {
  var N = toSize.length;
  var dim = size.length;
  for (var j = 0; j < dim; j++) {
    var n = N - dim + j;
    if (size[j] < toSize[n] && size[j] > 1 || size[j] > toSize[n]) {
      throw new Error("shape mismatch: mismatch is found in arg with shape (".concat(size, ") not possible to broadcast dimension ").concat(dim, " with size ").concat(size[j], " to size ").concat(toSize[n]));
    }
  }
}

/**
 * Broadcasts a single array to a certain size
 * @param {Array} array Array to be broadcasted
 * @param {number[]} toSize Size to broadcast the array
 * @returns {Array} The broadcasted array
 */
function broadcastTo(array, toSize) {
  var Asize = arraySize(array);
  if (deepStrictEqual(Asize, toSize)) {
    return array;
  }
  checkBroadcastingRules(Asize, toSize);
  var broadcastedSize = broadcastSizes(Asize, toSize);
  var N = broadcastedSize.length;
  var paddedSize = [...Array(N - Asize.length).fill(1), ...Asize];
  var A = clone(array);
  // reshape A if needed to make it ready for concat
  if (Asize.length < N) {
    A = reshape$1(A, paddedSize);
    Asize = arraySize(A);
  }

  // stretches the array on each dimension to make it the same size as index
  for (var dim = 0; dim < N; dim++) {
    if (Asize[dim] < broadcastedSize[dim]) {
      A = stretch(A, broadcastedSize[dim], dim);
      Asize = arraySize(A);
    }
  }
  return A;
}

/**
 * Stretches a matrix up to a certain size in a certain dimension
 * @param {Array} arrayToStretch
 * @param {number[]} sizeToStretch
 * @param {number} dimToStretch
 * @returns {Array} The stretched array
 */
function stretch(arrayToStretch, sizeToStretch, dimToStretch) {
  return concat(...Array(sizeToStretch).fill(arrayToStretch), dimToStretch);
}

/**
* Retrieves a single element from an array given an index.
*
* @param {Array} array - The array from which to retrieve the value.
* @param {Array<number>} index - An array of indices specifying the position of the desired element in each dimension.
* @returns {*} - The value at the specified position in the array.
*
* @example
* const arr = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]];
* const index = [1, 0, 1];
* console.log(get(arr, index)); // 6
*/
function get(array, index) {
  if (!Array.isArray(array)) {
    throw new Error('Array expected');
  }
  var size = arraySize(array);
  if (index.length !== size.length) {
    throw new DimensionError(index.length, size.length);
  }
  for (var x = 0; x < index.length; x++) {
    validateIndex(index[x], size[x]);
  }
  return index.reduce((acc, curr) => acc[curr], array);
}

/**
 * Recursively maps over each element of nested array using a provided callback function.
 *
 * @param {Array} array - The array to be mapped.
 * @param {Function} callback - The function to execute on each element, taking three arguments:
 *   - `value` (any): The current element being processed in the array.
 *   - `index` (Array<number>): The index of the current element being processed in the array.
 *   - `array` (Array): The array `deepMap` was called upon.
 * @param {boolean} [skipIndex=false] - If true, the callback function is called with only the value.
 * @returns {Array} A new array with each element being the result of the callback function.
 */
function deepMap$1(array, callback) {
  var skipIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (array.length === 0) {
    return [];
  }
  if (skipIndex) {
    return recursiveMap(array);
  }
  var index = [];
  return recursiveMapWithIndex(array, 0);
  function recursiveMapWithIndex(value, depth) {
    if (Array.isArray(value)) {
      var N = value.length;
      var result = Array(N);
      for (var i = 0; i < N; i++) {
        index[depth] = i;
        result[i] = recursiveMapWithIndex(value[i], depth + 1);
      }
      return result;
    } else {
      return callback(value, index.slice(0, depth), array);
    }
  }
  function recursiveMap(value) {
    if (Array.isArray(value)) {
      var N = value.length;
      var result = Array(N);
      for (var i = 0; i < N; i++) {
        result[i] = recursiveMap(value[i]);
      }
      return result;
    } else {
      return callback(value);
    }
  }
}

/**
 * Deep clones a multidimensional array
 * @param {Array} array
 * @returns {Array} cloned array
 */
function clone(array) {
  return _extends([], array);
}

/**
 * Simplifies a callback function by reducing its complexity and potentially improving its performance.
 *
 * @param {Function} callback The original callback function to simplify.
 * @param {Array|Matrix} array The array that will be used with the callback function.
 * @param {string} name The name of the function that is using the callback.
 * @param {boolean} isUnary If true, the callback function is unary and will be optimized as such.
 * @returns {Function} Returns a simplified version of the callback function.
 */
function optimizeCallback(callback, array, name, isUnary) {
  if (typedFunction.isTypedFunction(callback)) {
    var numberOfArguments;
    if (isUnary) {
      numberOfArguments = 1;
    } else {
      var firstIndex = (array.isMatrix ? array.size() : arraySize(array)).map(() => 0);
      var firstValue = array.isMatrix ? array.get(firstIndex) : get(array, firstIndex);
      numberOfArguments = _findNumberOfArgumentsTyped(callback, firstValue, firstIndex, array);
    }
    var fastCallback;
    if (array.isMatrix && array.dataType !== 'mixed' && array.dataType !== undefined) {
      var singleSignature = _findSingleSignatureWithArity(callback, numberOfArguments);
      fastCallback = singleSignature !== undefined ? singleSignature : callback;
    } else {
      fastCallback = callback;
    }
    if (numberOfArguments >= 1 && numberOfArguments <= 3) {
      return {
        isUnary: numberOfArguments === 1,
        fn: function fn() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return _tryFunctionWithArgs(fastCallback, args.slice(0, numberOfArguments), name, callback.name);
        }
      };
    }
    return {
      isUnary: false,
      fn: function fn() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return _tryFunctionWithArgs(fastCallback, args, name, callback.name);
      }
    };
  }
  if (isUnary === undefined) {
    return {
      isUnary: _findIfCallbackIsUnary(callback),
      fn: callback
    };
  } else {
    return {
      isUnary,
      fn: callback
    };
  }
}
function _findSingleSignatureWithArity(callback, arity) {
  var matchingFunctions = [];
  Object.entries(callback.signatures).forEach(_ref => {
    var [signature, func] = _ref;
    if (signature.split(',').length === arity) {
      matchingFunctions.push(func);
    }
  });
  if (matchingFunctions.length === 1) {
    return matchingFunctions[0];
  }
}

/**
 * Determines if a given callback function is unary (i.e., takes exactly one argument).
 *
 * This function checks the following conditions to determine if the callback is unary:
 * 1. The callback function should have exactly one parameter.
 * 2. The callback function should not use the `arguments` object.
 * 3. The callback function should not use rest parameters (`...`).
 * If in doubt, this function shall return `false` to be safe
 *
 * @param {Function} callback - The callback function to be checked.
 * @returns {boolean} - Returns `true` if the callback is unary, otherwise `false`.
 */
function _findIfCallbackIsUnary(callback) {
  if (callback.length !== 1) return false;
  var callbackStr = callback.toString();
  // Check if the callback function uses `arguments`
  if (/arguments/.test(callbackStr)) return false;

  // Extract the parameters of the callback function
  var paramsStr = callbackStr.match(/\(.*?\)/);
  // Check if the callback function uses rest parameters
  if (/\.\.\./.test(paramsStr)) return false;
  return true;
}
function _findNumberOfArgumentsTyped(callback, value, index, array) {
  var testArgs = [value, index, array];
  for (var i = 3; i > 0; i--) {
    var args = testArgs.slice(0, i);
    if (typedFunction.resolve(callback, args) !== null) {
      return i;
    }
  }
}

/**
   * @param {function} func The selected function taken from one of the signatures of the callback function
   * @param {Array} args List with arguments to apply to the selected signature
   * @param {string} mappingFnName the name of the function that is using the callback
   * @param {string} callbackName the name of the callback function
   * @returns {*} Returns the return value of the invoked signature
   * @throws {TypeError} Throws an error when no matching signature was found
   */
function _tryFunctionWithArgs(func, args, mappingFnName, callbackName) {
  try {
    return func(...args);
  } catch (err) {
    _createCallbackError(err, args, mappingFnName, callbackName);
  }
}

/**
 * Creates and throws a detailed TypeError when a callback function fails.
 *
 * @param {Error} err The original error thrown by the callback function.
 * @param {Array} args The arguments that were passed to the callback function.
 * @param {string} mappingFnName The name of the function that is using the callback.
 * @param {string} callbackName The name of the callback function.
 * @throws {TypeError} Throws a detailed TypeError with enriched error message.
 */
function _createCallbackError(err, args, mappingFnName, callbackName) {
  var _err$data;
  // Enrich the error message so the user understands that it took place inside the callback function
  if (err instanceof TypeError && ((_err$data = err.data) === null || _err$data === void 0 ? void 0 : _err$data.category) === 'wrongType') {
    var argsDesc = [];
    argsDesc.push("value: ".concat(typeOf(args[0])));
    if (args.length >= 2) {
      argsDesc.push("index: ".concat(typeOf(args[1])));
    }
    if (args.length >= 3) {
      argsDesc.push("array: ".concat(typeOf(args[2])));
    }
    throw new TypeError("Function ".concat(mappingFnName, " cannot apply callback arguments ") + "".concat(callbackName, "(").concat(argsDesc.join(', '), ") at index ").concat(JSON.stringify(args[1])));
  } else {
    throw new TypeError("Function ".concat(mappingFnName, " cannot apply callback arguments ") + "to function ".concat(callbackName, ": ").concat(err.message));
  }
}

// deno-lint-ignore-file no-this-alias
var name$s = 'DenseMatrix';
var dependencies$r = ['Matrix'];
var createDenseMatrixClass = /* #__PURE__ */factory(name$s, dependencies$r, _ref => {
  var {
    Matrix
  } = _ref;
  /**
   * Dense Matrix implementation. A regular, dense matrix, supporting multi-dimensional matrices. This is the default matrix type.
   * @class DenseMatrix
   * @enum {{ value, index: number[] }}
   */
  function DenseMatrix(data, datatype) {
    if (!(this instanceof DenseMatrix)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }
    if (datatype && !isString(datatype)) {
      throw new Error('Invalid datatype: ' + datatype);
    }
    if (isMatrix(data)) {
      // check data is a DenseMatrix
      if (data.type === 'DenseMatrix') {
        // clone data & size
        this._data = clone$2(data._data);
        this._size = clone$2(data._size);
        this._datatype = datatype || data._datatype;
      } else {
        // build data from existing matrix
        this._data = data.toArray();
        this._size = data.size();
        this._datatype = datatype || data._datatype;
      }
    } else if (data && isArray(data.data) && isArray(data.size)) {
      // initialize fields from JSON representation
      this._data = data.data;
      this._size = data.size;
      // verify the dimensions of the array
      validate(this._data, this._size);
      this._datatype = datatype || data.datatype;
    } else if (isArray(data)) {
      // replace nested Matrices with Arrays
      this._data = preprocess(data);
      // get the dimensions of the array
      this._size = arraySize(this._data);
      // verify the dimensions of the array, TODO: compute size while processing array
      validate(this._data, this._size);
      // data type unknown
      this._datatype = datatype;
    } else if (data) {
      // unsupported type
      throw new TypeError('Unsupported type of data (' + typeOf(data) + ')');
    } else {
      // nothing provided
      this._data = [];
      this._size = [0];
      this._datatype = datatype;
    }
  }
  DenseMatrix.prototype = new Matrix();

  /**
   * Create a new DenseMatrix
   */
  DenseMatrix.prototype.createDenseMatrix = function (data, datatype) {
    return new DenseMatrix(data, datatype);
  };

  /**
   * Attach type information
   */
  Object.defineProperty(DenseMatrix, 'name', {
    value: 'DenseMatrix'
  });
  DenseMatrix.prototype.constructor = DenseMatrix;
  DenseMatrix.prototype.type = 'DenseMatrix';
  DenseMatrix.prototype.isDenseMatrix = true;

  /**
   * Get the matrix type
   *
   * Usage:
   *    const matrixType = matrix.getDataType()  // retrieves the matrix type
   *
   * @memberOf DenseMatrix
   * @return {string}   type information; if multiple types are found from the Matrix, it will return "mixed"
   */
  DenseMatrix.prototype.getDataType = function () {
    return getArrayDataType(this._data, typeOf);
  };

  /**
   * Get the storage format used by the matrix.
   *
   * Usage:
   *     const format = matrix.storage()  // retrieve storage format
   *
   * @memberof DenseMatrix
   * @return {string}           The storage format.
   */
  DenseMatrix.prototype.storage = function () {
    return 'dense';
  };

  /**
   * Get the datatype of the data stored in the matrix.
   *
   * Usage:
   *     const format = matrix.datatype()   // retrieve matrix datatype
   *
   * @memberof DenseMatrix
   * @return {string}           The datatype.
   */
  DenseMatrix.prototype.datatype = function () {
    return this._datatype;
  };

  /**
   * Create a new DenseMatrix
   * @memberof DenseMatrix
   * @param {Array} data
   * @param {string} [datatype]
   */
  DenseMatrix.prototype.create = function (data, datatype) {
    return new DenseMatrix(data, datatype);
  };

  /**
   * Get a subset of the matrix, or replace a subset of the matrix.
   *
   * Usage:
   *     const subset = matrix.subset(index)               // retrieve subset
   *     const value = matrix.subset(index, replacement)   // replace subset
   *
   * @memberof DenseMatrix
   * @param {Index} index
   * @param {Array | Matrix | *} [replacement]
   * @param {*} [defaultValue=0]      Default value, filled in on new entries when
   *                                  the matrix is resized. If not provided,
   *                                  new matrix elements will be filled with zeros.
   */
  DenseMatrix.prototype.subset = function (index, replacement, defaultValue) {
    switch (arguments.length) {
      case 1:
        return _get(this, index);

      // intentional fall through
      case 2:
      case 3:
        return _set(this, index, replacement, defaultValue);
      default:
        throw new SyntaxError('Wrong number of arguments');
    }
  };

  /**
   * Get a single element from the matrix.
   * @memberof DenseMatrix
   * @param {number[]} index   Zero-based index
   * @return {*} value
   */
  DenseMatrix.prototype.get = function (index) {
    return get(this._data, index);
  };

  /**
   * Replace a single element in the matrix.
   * @memberof DenseMatrix
   * @param {number[]} index   Zero-based index
   * @param {*} value
   * @param {*} [defaultValue]        Default value, filled in on new entries when
   *                                  the matrix is resized. If not provided,
   *                                  new matrix elements will be left undefined.
   * @return {DenseMatrix} self
   */
  DenseMatrix.prototype.set = function (index, value, defaultValue) {
    if (!isArray(index)) {
      throw new TypeError('Array expected');
    }
    if (index.length < this._size.length) {
      throw new DimensionError(index.length, this._size.length, '<');
    }
    var i, ii, indexI;

    // enlarge matrix when needed
    var size = index.map(function (i) {
      return i + 1;
    });
    _fit(this, size, defaultValue);

    // traverse over the dimensions
    var data = this._data;
    for (i = 0, ii = index.length - 1; i < ii; i++) {
      indexI = index[i];
      validateIndex(indexI, data.length);
      data = data[indexI];
    }

    // set new value
    indexI = index[index.length - 1];
    validateIndex(indexI, data.length);
    data[indexI] = value;
    return this;
  };

  /**
   * Get a submatrix of this matrix
   * @memberof DenseMatrix
   * @param {DenseMatrix} matrix
   * @param {Index} index   Zero-based index
   * @private
   */
  function _get(matrix, index) {
    if (!isIndex(index)) {
      throw new TypeError('Invalid index');
    }
    var isScalar = index.isScalar();
    if (isScalar) {
      // return a scalar
      return matrix.get(index.min());
    } else {
      // validate dimensions
      var size = index.size();
      if (size.length !== matrix._size.length) {
        throw new DimensionError(size.length, matrix._size.length);
      }

      // validate if any of the ranges in the index is out of range
      var min = index.min();
      var max = index.max();
      for (var i = 0, ii = matrix._size.length; i < ii; i++) {
        validateIndex(min[i], matrix._size[i]);
        validateIndex(max[i], matrix._size[i]);
      }

      // retrieve submatrix
      var returnMatrix = new DenseMatrix([]);
      var submatrix = _getSubmatrix(matrix._data, index);
      returnMatrix._size = submatrix.size;
      returnMatrix._datatype = matrix._datatype;
      returnMatrix._data = submatrix.data;
      return returnMatrix;
    }
  }

  /**
   * Get a submatrix of a multi dimensional matrix.
   * Index is not checked for correct number or length of dimensions.
   * @memberof DenseMatrix
   * @param {Array} data
   * @param {Index} index
   * @return {Array} submatrix
   * @private
   */
  function _getSubmatrix(data, index) {
    var maxDepth = index.size().length - 1;
    var size = Array(maxDepth);
    return {
      data: getSubmatrixRecursive(data),
      size
    };
    function getSubmatrixRecursive(data) {
      var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var ranges = index.dimension(depth);
      size[depth] = ranges.size()[0];
      if (depth < maxDepth) {
        return ranges.map(rangeIndex => {
          validateIndex(rangeIndex, data.length);
          return getSubmatrixRecursive(data[rangeIndex], depth + 1);
        }).valueOf();
      } else {
        return ranges.map(rangeIndex => {
          validateIndex(rangeIndex, data.length);
          return data[rangeIndex];
        }).valueOf();
      }
    }
  }

  /**
   * Replace a submatrix in this matrix
   * Indexes are zero-based.
   * @memberof DenseMatrix
   * @param {DenseMatrix} matrix
   * @param {Index} index
   * @param {DenseMatrix | Array | *} submatrix
   * @param {*} defaultValue          Default value, filled in on new entries when
   *                                  the matrix is resized.
   * @return {DenseMatrix} matrix
   * @private
   */
  function _set(matrix, index, submatrix, defaultValue) {
    if (!index || index.isIndex !== true) {
      throw new TypeError('Invalid index');
    }

    // get index size and check whether the index contains a single value
    var iSize = index.size();
    var isScalar = index.isScalar();

    // calculate the size of the submatrix, and convert it into an Array if needed
    var sSize;
    if (isMatrix(submatrix)) {
      sSize = submatrix.size();
      submatrix = submatrix.valueOf();
    } else {
      sSize = arraySize(submatrix);
    }
    if (isScalar) {
      // set a scalar

      // check whether submatrix is a scalar
      if (sSize.length !== 0) {
        throw new TypeError('Scalar expected');
      }
      matrix.set(index.min(), submatrix, defaultValue);
    } else {
      // set a submatrix

      // broadcast submatrix
      if (!deepStrictEqual(sSize, iSize)) {
        try {
          if (sSize.length === 0) {
            submatrix = broadcastTo([submatrix], iSize);
          } else {
            submatrix = broadcastTo(submatrix, iSize);
          }
          sSize = arraySize(submatrix);
        } catch (_unused) {}
      }

      // validate dimensions
      if (iSize.length < matrix._size.length) {
        throw new DimensionError(iSize.length, matrix._size.length, '<');
      }
      if (sSize.length < iSize.length) {
        // calculate number of missing outer dimensions
        var i = 0;
        var outer = 0;
        while (iSize[i] === 1 && sSize[i] === 1) {
          i++;
        }
        while (iSize[i] === 1) {
          outer++;
          i++;
        }

        // unsqueeze both outer and inner dimensions
        submatrix = unsqueeze$1(submatrix, iSize.length, outer, sSize);
      }

      // check whether the size of the submatrix matches the index size
      if (!deepStrictEqual(iSize, sSize)) {
        throw new DimensionError(iSize, sSize, '>');
      }

      // enlarge matrix when needed
      var size = index.max().map(function (i) {
        return i + 1;
      });
      _fit(matrix, size, defaultValue);

      // insert the sub matrix
      _setSubmatrix(matrix._data, index, submatrix);
    }
    return matrix;
  }

  /**
   * Replace a submatrix of a multi dimensional matrix.
   * @memberof DenseMatrix
   * @param {Array} data
   * @param {Index} index
   * @param {Array} submatrix
   * @private
   */
  function _setSubmatrix(data, index, submatrix) {
    var maxDepth = index.size().length - 1;
    setSubmatrixRecursive(data, submatrix);
    function setSubmatrixRecursive(data, submatrix) {
      var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var range = index.dimension(depth);
      if (depth < maxDepth) {
        range.forEach((rangeIndex, i) => {
          validateIndex(rangeIndex, data.length);
          setSubmatrixRecursive(data[rangeIndex], submatrix[i[0]], depth + 1);
        });
      } else {
        range.forEach((rangeIndex, i) => {
          validateIndex(rangeIndex, data.length);
          data[rangeIndex] = submatrix[i[0]];
        });
      }
    }
  }

  /**
   * Resize the matrix to the given size. Returns a copy of the matrix when
   * `copy=true`, otherwise return the matrix itself (resize in place).
   *
   * @memberof DenseMatrix
   * @param {number[] || Matrix} size The new size the matrix should have.
   * @param {*} [defaultValue=0]      Default value, filled in on new entries.
   *                                  If not provided, the matrix elements will
   *                                  be filled with zeros.
   * @param {boolean} [copy]          Return a resized copy of the matrix
   *
   * @return {Matrix}                 The resized matrix
   */
  DenseMatrix.prototype.resize = function (size, defaultValue, copy) {
    // validate arguments
    if (!isCollection(size)) {
      throw new TypeError('Array or Matrix expected');
    }

    // SparseMatrix input is always 2d, flatten this into 1d if it's indeed a vector
    var sizeArray = size.valueOf().map(value => {
      return Array.isArray(value) && value.length === 1 ? value[0] : value;
    });

    // matrix to resize
    var m = copy ? this.clone() : this;
    // resize matrix
    return _resize(m, sizeArray, defaultValue);
  };
  function _resize(matrix, size, defaultValue) {
    // check size
    if (size.length === 0) {
      // first value in matrix
      var v = matrix._data;
      // go deep
      while (isArray(v)) {
        v = v[0];
      }
      return v;
    }
    // resize matrix
    matrix._size = size.slice(0); // copy the array
    matrix._data = resize(matrix._data, matrix._size, defaultValue);
    // return matrix
    return matrix;
  }

  /**
   * Reshape the matrix to the given size. Returns a copy of the matrix when
   * `copy=true`, otherwise return the matrix itself (reshape in place).
   *
   * NOTE: This might be better suited to copy by default, instead of modifying
   *       in place. For now, it operates in place to remain consistent with
   *       resize().
   *
   * @memberof DenseMatrix
   * @param {number[]} size           The new size the matrix should have.
   * @param {boolean} [copy]          Return a reshaped copy of the matrix
   *
   * @return {Matrix}                 The reshaped matrix
   */
  DenseMatrix.prototype.reshape = function (size, copy) {
    var m = copy ? this.clone() : this;
    m._data = reshape$1(m._data, size);
    var currentLength = m._size.reduce((length, size) => length * size);
    m._size = processSizesWildcard(size, currentLength);
    return m;
  };

  /**
   * Enlarge the matrix when it is smaller than given size.
   * If the matrix is larger or equal sized, nothing is done.
   * @memberof DenseMatrix
   * @param {DenseMatrix} matrix           The matrix to be resized
   * @param {number[]} size
   * @param {*} defaultValue          Default value, filled in on new entries.
   * @private
   */
  function _fit(matrix, size, defaultValue) {
    var
    // copy the array
    newSize = matrix._size.slice(0);
    var changed = false;

    // add dimensions when needed
    while (newSize.length < size.length) {
      newSize.push(0);
      changed = true;
    }

    // enlarge size when needed
    for (var i = 0, ii = size.length; i < ii; i++) {
      if (size[i] > newSize[i]) {
        newSize[i] = size[i];
        changed = true;
      }
    }
    if (changed) {
      // resize only when size is changed
      _resize(matrix, newSize, defaultValue);
    }
  }

  /**
   * Create a clone of the matrix
   * @memberof DenseMatrix
   * @return {DenseMatrix} clone
   */
  DenseMatrix.prototype.clone = function () {
    var m = new DenseMatrix({
      data: clone$2(this._data),
      size: clone$2(this._size),
      datatype: this._datatype
    });
    return m;
  };

  /**
   * Retrieve the size of the matrix.
   * @memberof DenseMatrix
   * @returns {number[]} size
   */
  DenseMatrix.prototype.size = function () {
    return this._size.slice(0); // return a clone of _size
  };

  /**
   * Create a new matrix with the results of the callback function executed on
   * each entry of the matrix.
   * @memberof DenseMatrix
   * @param {Function} callback   The callback function is invoked with three
   *                              parameters: the value of the element, the index
   *                              of the element, and the Matrix being traversed.
   * @param {boolean} skipZeros   If true, the callback function is invoked only for non-zero entries
   * @param {boolean} isUnary     If true, the callback function is invoked with one parameter
   *
   * @return {DenseMatrix} matrix
   */
  DenseMatrix.prototype.map = function (callback) {
    var isUnary = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var me = this;
    var maxDepth = me._size.length - 1;
    if (maxDepth < 0) return me.clone();
    var fastCallback = optimizeCallback(callback, me, 'map', isUnary);
    var fastCallbackFn = fastCallback.fn;
    var result = me.create(undefined, me._datatype);
    result._size = me._size;
    if (isUnary || fastCallback.isUnary) {
      result._data = iterateUnary(me._data);
      return result;
    }
    if (maxDepth === 0) {
      var inputData = me.valueOf();
      var data = Array(inputData.length);
      for (var i = 0; i < inputData.length; i++) {
        data[i] = fastCallbackFn(inputData[i], [i], me);
      }
      result._data = data;
      return result;
    }
    var index = [];
    result._data = iterate(me._data);
    return result;
    function iterate(data) {
      var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var result = Array(data.length);
      if (depth < maxDepth) {
        for (var _i = 0; _i < data.length; _i++) {
          index[depth] = _i;
          result[_i] = iterate(data[_i], depth + 1);
        }
      } else {
        for (var _i2 = 0; _i2 < data.length; _i2++) {
          index[depth] = _i2;
          result[_i2] = fastCallbackFn(data[_i2], index.slice(), me);
        }
      }
      return result;
    }
    function iterateUnary(data) {
      var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var result = Array(data.length);
      if (depth < maxDepth) {
        for (var _i3 = 0; _i3 < data.length; _i3++) {
          result[_i3] = iterateUnary(data[_i3], depth + 1);
        }
      } else {
        for (var _i4 = 0; _i4 < data.length; _i4++) {
          result[_i4] = fastCallbackFn(data[_i4]);
        }
      }
      return result;
    }
  };

  /**
   * Execute a callback function on each entry of the matrix.
   * @memberof DenseMatrix
   * @param {Function} callback   The callback function is invoked with three
   *                              parameters: the value of the element, the index
   *                              of the element, and the Matrix being traversed.
   * @param {boolean} skipZeros   If true, the callback function is invoked only for non-zero entries
   * @param {boolean} isUnary     If true, the callback function is invoked with one parameter
   */
  DenseMatrix.prototype.forEach = function (callback) {
    var isUnary = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var me = this;
    var maxDepth = me._size.length - 1;
    if (maxDepth < 0) return;
    var fastCallback = optimizeCallback(callback, me, 'map', isUnary);
    var fastCallbackFn = fastCallback.fn;
    if (isUnary || fastCallback.isUnary) {
      iterateUnary(me._data);
      return;
    }
    if (maxDepth === 0) {
      for (var i = 0; i < me._data.length; i++) {
        fastCallbackFn(me._data[i], [i], me);
      }
      return;
    }
    var index = [];
    iterate(me._data);
    function iterate(data) {
      var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (depth < maxDepth) {
        for (var _i5 = 0; _i5 < data.length; _i5++) {
          index[depth] = _i5;
          iterate(data[_i5], depth + 1);
        }
      } else {
        for (var _i6 = 0; _i6 < data.length; _i6++) {
          index[depth] = _i6;
          fastCallbackFn(data[_i6], index.slice(), me);
        }
      }
    }
    function iterateUnary(data) {
      var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (depth < maxDepth) {
        for (var _i7 = 0; _i7 < data.length; _i7++) {
          iterateUnary(data[_i7], depth + 1);
        }
      } else {
        for (var _i8 = 0; _i8 < data.length; _i8++) {
          fastCallbackFn(data[_i8]);
        }
      }
    }
  };

  /**
   * Iterate over the matrix elements
   * @return {Iterable<{ value, index: number[] }>}
   */
  DenseMatrix.prototype[Symbol.iterator] = function* () {
    var maxDepth = this._size.length - 1;
    if (maxDepth < 0) {
      return;
    }
    if (maxDepth === 0) {
      for (var i = 0; i < this._data.length; i++) {
        yield {
          value: this._data[i],
          index: [i]
        };
      }
      return;
    }

    // Multi-dimensional matrix: iterate over all elements
    var index = Array(maxDepth + 1).fill(0);
    var totalElements = this._size.reduce((a, b) => a * b, 1);
    for (var count = 0; count < totalElements; count++) {
      // Traverse to the current element using indices
      var current = this._data;
      for (var d = 0; d < maxDepth; d++) {
        current = current[index[d]];
      }
      yield {
        value: current[index[maxDepth]],
        index: index.slice()
      };

      // Increment indices for next element
      for (var _d = maxDepth; _d >= 0; _d--) {
        index[_d]++;
        if (index[_d] < this._size[_d]) break;
        index[_d] = 0;
      }
    }
  };

  /**
   * Returns an array containing the rows of a 2D matrix
   * @returns {Array<Matrix>}
   */
  DenseMatrix.prototype.rows = function () {
    var result = [];
    var s = this.size();
    if (s.length !== 2) {
      throw new TypeError('Rows can only be returned for a 2D matrix.');
    }
    var data = this._data;
    for (var row of data) {
      result.push(new DenseMatrix([row], this._datatype));
    }
    return result;
  };

  /**
   * Returns an array containing the columns of a 2D matrix
   * @returns {Array<Matrix>}
   */
  DenseMatrix.prototype.columns = function () {
    var _this = this;
    var result = [];
    var s = this.size();
    if (s.length !== 2) {
      throw new TypeError('Rows can only be returned for a 2D matrix.');
    }
    var data = this._data;
    var _loop = function _loop(i) {
      var col = data.map(row => [row[i]]);
      result.push(new DenseMatrix(col, _this._datatype));
    };
    for (var i = 0; i < s[1]; i++) {
      _loop(i);
    }
    return result;
  };

  /**
   * Create an Array with a copy of the data of the DenseMatrix
   * @memberof DenseMatrix
   * @returns {Array} array
   */
  DenseMatrix.prototype.toArray = function () {
    return clone$2(this._data);
  };

  /**
   * Get the primitive value of the DenseMatrix: a multidimensional array
   * @memberof DenseMatrix
   * @returns {Array} array
   */
  DenseMatrix.prototype.valueOf = function () {
    return this._data;
  };

  /**
   * Get a string representation of the matrix, with optional formatting options.
   * @memberof DenseMatrix
   * @param {Object | number | Function} [options]  Formatting options. See
   *                                                lib/utils/number:format for a
   *                                                description of the available
   *                                                options.
   * @returns {string} str
   */
  DenseMatrix.prototype.format = function (options) {
    return format(this._data, options);
  };

  /**
   * Get a string representation of the matrix
   * @memberof DenseMatrix
   * @returns {string} str
   */
  DenseMatrix.prototype.toString = function () {
    return format(this._data);
  };

  /**
   * Get a JSON representation of the matrix
   * @memberof DenseMatrix
   * @returns {Object}
   */
  DenseMatrix.prototype.toJSON = function () {
    return {
      mathjs: 'DenseMatrix',
      data: this._data,
      size: this._size,
      datatype: this._datatype
    };
  };

  /**
   * Get the kth Matrix diagonal.
   *
   * @memberof DenseMatrix
   * @param {number | BigNumber} [k=0]     The kth diagonal where the vector will retrieved.
   *
   * @returns {Matrix}                     The matrix with the diagonal values.
   */
  DenseMatrix.prototype.diagonal = function (k) {
    // validate k if any
    if (k) {
      // convert BigNumber to a number
      if (isBigNumber(k)) {
        k = k.toNumber();
      }
      // is must be an integer
      if (!isNumber(k) || !isInteger(k)) {
        throw new TypeError('The parameter k must be an integer number');
      }
    } else {
      // default value
      k = 0;
    }
    var kSuper = k > 0 ? k : 0;
    var kSub = k < 0 ? -k : 0;

    // rows & columns
    var rows = this._size[0];
    var columns = this._size[1];

    // number diagonal values
    var n = Math.min(rows - kSub, columns - kSuper);

    // x is a matrix get diagonal from matrix
    var data = [];

    // loop rows
    for (var i = 0; i < n; i++) {
      data[i] = this._data[i + kSub][i + kSuper];
    }

    // create DenseMatrix
    return new DenseMatrix({
      data,
      size: [n],
      datatype: this._datatype
    });
  };

  /**
   * Create a diagonal matrix.
   *
   * @memberof DenseMatrix
   * @param {Array} size                     The matrix size.
   * @param {number | Matrix | Array } value The values for the diagonal.
   * @param {number | BigNumber} [k=0]       The kth diagonal where the vector will be filled in.
   * @param {number} [defaultValue]          The default value for non-diagonal
   * @param {string} [datatype]              The datatype for the diagonal
   *
   * @returns {DenseMatrix}
   */
  DenseMatrix.diagonal = function (size, value, k, defaultValue) {
    if (!isArray(size)) {
      throw new TypeError('Array expected, size parameter');
    }
    if (size.length !== 2) {
      throw new Error('Only two dimensions matrix are supported');
    }

    // map size & validate
    size = size.map(function (s) {
      // check it is a big number
      if (isBigNumber(s)) {
        // convert it
        s = s.toNumber();
      }
      // validate arguments
      if (!isNumber(s) || !isInteger(s) || s < 1) {
        throw new Error('Size values must be positive integers');
      }
      return s;
    });

    // validate k if any
    if (k) {
      // convert BigNumber to a number
      if (isBigNumber(k)) {
        k = k.toNumber();
      }
      // is must be an integer
      if (!isNumber(k) || !isInteger(k)) {
        throw new TypeError('The parameter k must be an integer number');
      }
    } else {
      // default value
      k = 0;
    }
    var kSuper = k > 0 ? k : 0;
    var kSub = k < 0 ? -k : 0;

    // rows and columns
    var rows = size[0];
    var columns = size[1];

    // number of non-zero items
    var n = Math.min(rows - kSub, columns - kSuper);

    // value extraction function
    var _value;

    // check value
    if (isArray(value)) {
      // validate array
      if (value.length !== n) {
        // number of values in array must be n
        throw new Error('Invalid value array length');
      }
      // define function
      _value = function _value(i) {
        // return value @ i
        return value[i];
      };
    } else if (isMatrix(value)) {
      // matrix size
      var ms = value.size();
      // validate matrix
      if (ms.length !== 1 || ms[0] !== n) {
        // number of values in array must be n
        throw new Error('Invalid matrix length');
      }
      // define function
      _value = function _value(i) {
        // return value @ i
        return value.get([i]);
      };
    } else {
      // define function
      _value = function _value() {
        // return value
        return value;
      };
    }

    // discover default value if needed
    if (!defaultValue) {
      // check first value in array
      defaultValue = isBigNumber(_value(0)) ? _value(0).mul(0) // trick to create a BigNumber with value zero
      : 0;
    }

    // empty array
    var data = [];

    // check we need to resize array
    if (size.length > 0) {
      // resize array
      data = resize(data, size, defaultValue);
      // fill diagonal
      for (var d = 0; d < n; d++) {
        data[d + kSub][d + kSuper] = _value(d);
      }
    }

    // create DenseMatrix
    return new DenseMatrix({
      data,
      size: [rows, columns]
    });
  };

  /**
   * Generate a matrix from a JSON object
   * @memberof DenseMatrix
   * @param {Object} json  An object structured like
   *                       `{"mathjs": "DenseMatrix", data: [], size: []}`,
   *                       where mathjs is optional
   * @returns {DenseMatrix}
   */
  DenseMatrix.fromJSON = function (json) {
    return new DenseMatrix(json);
  };

  /**
   * Swap rows i and j in Matrix.
   *
   * @memberof DenseMatrix
   * @param {number} i       Matrix row index 1
   * @param {number} j       Matrix row index 2
   *
   * @return {Matrix}        The matrix reference
   */
  DenseMatrix.prototype.swapRows = function (i, j) {
    // check index
    if (!isNumber(i) || !isInteger(i) || !isNumber(j) || !isInteger(j)) {
      throw new Error('Row index must be positive integers');
    }
    // check dimensions
    if (this._size.length !== 2) {
      throw new Error('Only two dimensional matrix is supported');
    }
    // validate index
    validateIndex(i, this._size[0]);
    validateIndex(j, this._size[0]);

    // swap rows
    DenseMatrix._swapRows(i, j, this._data);
    // return current instance
    return this;
  };

  /**
   * Swap rows i and j in Dense Matrix data structure.
   *
   * @param {number} i       Matrix row index 1
   * @param {number} j       Matrix row index 2
   * @param {Array} data     Matrix data
   */
  DenseMatrix._swapRows = function (i, j, data) {
    // swap values i <-> j
    var vi = data[i];
    data[i] = data[j];
    data[j] = vi;
  };

  /**
   * Preprocess data, which can be an Array or DenseMatrix with nested Arrays and
   * Matrices. Clones all (nested) Arrays, and replaces all nested Matrices with Arrays
   * @memberof DenseMatrix
   * @param {Array | Matrix} data
   * @return {Array} data
   */
  function preprocess(data) {
    if (isMatrix(data)) {
      return preprocess(data.valueOf());
    }
    if (isArray(data)) {
      return data.map(preprocess);
    }
    return data;
  }
  return DenseMatrix;
}, {
  isClass: true
});

/**
 * Execute the callback function element wise for each element in array and any
 * nested array
 * Returns an array with the results
 * @param {Array | Matrix} array
 * @param {Function} callback   The callback is called with two parameters:
 *                              value1 and value2, which contain the current
 *                              element of both arrays.
 * @param {boolean} [skipZeros] Invoke callback function for non-zero values only.
 *
 * @return {Array | Matrix} res
 */
function deepMap(array, callback, skipZeros) {
  if (!skipZeros) {
    if (isMatrix(array)) {
      return array.map(x => callback(x), false, true);
    } else {
      return deepMap$1(array, callback, true);
    }
  }
  var skipZerosCallback = x => x === 0 ? x : callback(x);
  if (isMatrix(array)) {
    return array.map(x => skipZerosCallback(x), false, true);
  } else {
    return deepMap$1(array, skipZerosCallback, true);
  }
}

var n1 = 'number';
var n2 = 'number, number';
function absNumber(a) {
  return Math.abs(a);
}
absNumber.signature = n1;
function addNumber(a, b) {
  return a + b;
}
addNumber.signature = n2;
function subtractNumber(a, b) {
  return a - b;
}
subtractNumber.signature = n2;
function multiplyNumber(a, b) {
  return a * b;
}
multiplyNumber.signature = n2;
function unaryMinusNumber(x) {
  return -x;
}
unaryMinusNumber.signature = n1;

/**
 * Calculates the power of x to y, x^y, for two numbers.
 * @param {number} x
 * @param {number} y
 * @return {number} res
 */
function powNumber(x, y) {
  // x^Infinity === 0 if -1 < x < 1
  // A real number 0 is returned instead of complex(0)
  if (x * x < 1 && y === Infinity || x * x > 1 && y === -Infinity) {
    return 0;
  }
  return Math.pow(x, y);
}
powNumber.signature = n2;

/** @param {number} i
 *  @param {number} n
 *  @returns {number} product of i to n
 */
function product(i, n) {
  if (n < i) {
    return 1;
  }
  if (n === i) {
    return n;
  }
  var half = n + i >> 1; // divide (n + i) by 2 and truncate to integer
  return product(i, half) * product(half + 1, n);
}

/* eslint-disable no-loss-of-precision */

function gammaNumber(n) {
  var x;
  if (isInteger(n)) {
    if (n <= 0) {
      return isFinite(n) ? Infinity : NaN;
    }
    if (n > 171) {
      return Infinity; // Will overflow
    }
    return product(1, n - 1);
  }
  if (n < 0.5) {
    return Math.PI / (Math.sin(Math.PI * n) * gammaNumber(1 - n));
  }
  if (n >= 171.35) {
    return Infinity; // will overflow
  }
  if (n > 85.0) {
    // Extended Stirling Approx
    var twoN = n * n;
    var threeN = twoN * n;
    var fourN = threeN * n;
    var fiveN = fourN * n;
    return Math.sqrt(2 * Math.PI / n) * Math.pow(n / Math.E, n) * (1 + 1 / (12 * n) + 1 / (288 * twoN) - 139 / (51840 * threeN) - 571 / (2488320 * fourN) + 163879 / (209018880 * fiveN) + 5246819 / (75246796800 * fiveN * n));
  }
  --n;
  x = gammaP[0];
  for (var i = 1; i < gammaP.length; ++i) {
    x += gammaP[i] / (n + i);
  }
  var t = n + gammaG + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
}
gammaNumber.signature = 'number';

// TODO: comment on the variables g and p

var gammaG = 4.7421875;
var gammaP = [0.99999999999999709182, 57.156235665862923517, -59.59796035547549, 14.136097974741747174, -0.4919138160976202, 0.33994649984811888699e-4, 0.46523628927048575665e-4, -9837447530487956e-20, 0.15808870322491248884e-3, -21026444172410488e-20, 0.21743961811521264320e-3, -1643181065367639e-19, 0.84418223983852743293e-4, -26190838401581408e-21, 0.36899182659531622704e-5];

// lgamma implementation ref: https://mrob.com/pub/ries/lanczos-gamma.html#code

// log(2 * pi) / 2
var lnSqrt2PI = 0.91893853320467274178;
var lgammaG = 5; // Lanczos parameter "g"
var lgammaN = 7; // Range of coefficients "n"

var lgammaSeries = [1.000000000190015, 76.18009172947146, -86.50532032941678, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -5395239384953e-18];
function lgammaNumber(n) {
  if (n < 0) return NaN;
  if (n === 0) return Infinity;
  if (!isFinite(n)) return n;
  if (n < 0.5) {
    // Use Euler's reflection formula:
    // gamma(z) = PI / (sin(PI * z) * gamma(1 - z))
    return Math.log(Math.PI / Math.sin(Math.PI * n)) - lgammaNumber(1 - n);
  }

  // Compute the logarithm of the Gamma function using the Lanczos method

  n = n - 1;
  var base = n + lgammaG + 0.5; // Base of the Lanczos exponential
  var sum = lgammaSeries[0];

  // We start with the terms that have the smallest coefficients and largest denominator
  for (var i = lgammaN - 1; i >= 1; i--) {
    sum += lgammaSeries[i] / (n + i);
  }
  return lnSqrt2PI + (n + 0.5) * Math.log(base) - base + Math.log(sum);
}
lgammaNumber.signature = 'number';

/**
 * Compares two BigNumbers.
 * @param {BigNumber} a - First value to compare
 * @param {BigNumber} b - Second value to compare
 * @param {number} [relTol=1e-09] - The relative tolerance, indicating the maximum allowed difference relative to the larger absolute value. Must be greater than 0.
 * @param {number} [absTol=0] - The minimum absolute tolerance, useful for comparisons near zero. Must be at least 0.
 * @returns {boolean} whether the two numbers are nearly equal
 * @throws {Error} If `relTol` is less than or equal to 0.
 * @throws {Error} If `absTol` is less than 0.
 *
 * @example
 * nearlyEqual(1.000000001, 1.0, 1e-9);            // true
 * nearlyEqual(1.000000002, 1.0, 0);            // false
 * nearlyEqual(1.0, 1.009, undefined, 0.02);       // true
 * nearlyEqual(0.000000001, 0.0, undefined, 1e-8); // true
 */
function nearlyEqual(a, b) {
  var relTol = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e-9;
  var absTol = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  if (relTol <= 0) {
    throw new Error('Relative tolerance must be greater than 0');
  }
  if (absTol < 0) {
    throw new Error('Absolute tolerance must be at least 0');
  }
  // NaN
  if (a.isNaN() || b.isNaN()) {
    return false;
  }
  if (!a.isFinite() || !b.isFinite()) {
    return a.eq(b);
  }
  // use "==" operator, handles infinities
  if (a.eq(b)) {
    return true;
  }
  // abs(a-b) <= max(relTol * max(abs(a), abs(b)), absTol)
  return a.minus(b).abs().lte(a.constructor.max(a.constructor.max(a.abs(), b.abs()).mul(relTol), absTol));
}

var name$r = 'isZero';
var dependencies$q = ['typed', 'equalScalar'];
var createIsZero = /* #__PURE__ */factory(name$r, dependencies$q, _ref => {
  var {
    typed,
    equalScalar
  } = _ref;
  /**
   * Test whether a value is zero.
   * The function can check for zero for types `number`, `BigNumber`, `Fraction`,
   * `Complex`, and `Unit`.
   *
   * The function is evaluated element-wise in case of Array or Matrix input.
   *
   * Syntax:
   *
   *     math.isZero(x)
   *
   * Examples:
   *
   *    math.isZero(0)                      // returns true
   *    math.isZero(2)                      // returns false
   *    math.isZero(0.5)                    // returns false
   *    math.isZero(math.bignumber(0))      // returns true
   *    math.isZero(math.fraction(0))       // returns true
   *    math.isZero(math.fraction(1,3))     // returns false
   *    math.isZero(math.complex('2 - 4i')) // returns false
   *    math.isZero(math.complex('0i'))     // returns true
   *    math.isZero('0')                    // returns true
   *    math.isZero('2')                    // returns false
   *    math.isZero([2, 0, -3])             // returns [false, true, false]
   *
   * See also:
   *
   *    isNumeric, isPositive, isNegative, isInteger
   *
   * @param {number | BigNumber | bigint | Complex | Fraction | Unit | Array | Matrix} x       Value to be tested
   * @return {boolean}  Returns true when `x` is zero.
   *                    Throws an error in case of an unknown data type.
   */
  return typed(name$r, {
    'number | BigNumber | Complex | Fraction': x => equalScalar(x, 0),
    bigint: x => x === 0n,
    Unit: typed.referToSelf(self => x => typed.find(self, x.valueType())(x.value)),
    'Array | Matrix': typed.referToSelf(self => x => deepMap(x, self))
  });
});

/**
 * Test whether two complex values are equal provided a given relTol and absTol.
 * Does not use or change the global Complex.EPSILON setting
 * @param {Complex} x - The first complex number for comparison.
 * @param {Complex} y - The second complex number for comparison.
 * @param {number} relTol - The relative tolerance for comparison.
 * @param {number} absTol - The absolute tolerance for comparison.
 * @returns {boolean} - Returns true if the two complex numbers are equal within the given tolerances, otherwise returns false.
 */
function complexEquals(x, y, relTol, absTol) {
  return nearlyEqual$1(x.re, y.re, relTol, absTol) && nearlyEqual$1(x.im, y.im, relTol, absTol);
}

var createCompareUnits = /* #__PURE__ */factory('compareUnits', ['typed'], _ref => {
  var {
    typed
  } = _ref;
  return {
    'Unit, Unit': typed.referToSelf(self => (x, y) => {
      if (!x.equalBase(y)) {
        throw new Error('Cannot compare units with different base');
      }
      return typed.find(self, [x.valueType(), y.valueType()])(x.value, y.value);
    })
  };
});

var name$q = 'equalScalar';
var dependencies$p = ['typed', 'config'];
var createEqualScalar = /* #__PURE__ */factory(name$q, dependencies$p, _ref => {
  var {
    typed,
    config
  } = _ref;
  var compareUnits = createCompareUnits({
    typed
  });

  /**
   * Test whether two scalar values are nearly equal.
   *
   * @param  {number | BigNumber | bigint | Fraction | boolean | Complex | Unit} x   First value to compare
   * @param  {number | BigNumber | bigint | Fraction | boolean | Complex} y          Second value to compare
   * @return {boolean}                                                  Returns true when the compared values are equal, else returns false
   * @private
   */
  return typed(name$q, {
    'boolean, boolean': function boolean_boolean(x, y) {
      return x === y;
    },
    'number, number': function number_number(x, y) {
      return nearlyEqual$1(x, y, config.relTol, config.absTol);
    },
    'BigNumber, BigNumber': function BigNumber_BigNumber(x, y) {
      return x.eq(y) || nearlyEqual(x, y, config.relTol, config.absTol);
    },
    'bigint, bigint': function bigint_bigint(x, y) {
      return x === y;
    },
    'Fraction, Fraction': function Fraction_Fraction(x, y) {
      return x.equals(y);
    },
    'Complex, Complex': function Complex_Complex(x, y) {
      return complexEquals(x, y, config.relTol, config.absTol);
    }
  }, compareUnits);
});
factory(name$q, ['typed', 'config'], _ref2 => {
  var {
    typed,
    config
  } = _ref2;
  return typed(name$q, {
    'number, number': function number_number(x, y) {
      return nearlyEqual$1(x, y, config.relTol, config.absTol);
    }
  });
});

var name$p = 'SparseMatrix';
var dependencies$o = ['typed', 'equalScalar', 'Matrix'];
var createSparseMatrixClass = /* #__PURE__ */factory(name$p, dependencies$o, _ref => {
  var {
    typed,
    equalScalar,
    Matrix
  } = _ref;
  /**
   * Sparse Matrix implementation. This type implements
   * a [Compressed Column Storage](https://en.wikipedia.org/wiki/Sparse_matrix#Compressed_sparse_column_(CSC_or_CCS))
   * format for two-dimensional sparse matrices.
   * @class SparseMatrix
   */
  function SparseMatrix(data, datatype) {
    if (!(this instanceof SparseMatrix)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }
    if (datatype && !isString(datatype)) {
      throw new Error('Invalid datatype: ' + datatype);
    }
    if (isMatrix(data)) {
      // create from matrix
      _createFromMatrix(this, data, datatype);
    } else if (data && isArray(data.index) && isArray(data.ptr) && isArray(data.size)) {
      // initialize fields
      this._values = data.values;
      this._index = data.index;
      this._ptr = data.ptr;
      this._size = data.size;
      this._datatype = datatype || data.datatype;
    } else if (isArray(data)) {
      // create from array
      _createFromArray(this, data, datatype);
    } else if (data) {
      // unsupported type
      throw new TypeError('Unsupported type of data (' + typeOf(data) + ')');
    } else {
      // nothing provided
      this._values = [];
      this._index = [];
      this._ptr = [0];
      this._size = [0, 0];
      this._datatype = datatype;
    }
  }
  function _createFromMatrix(matrix, source, datatype) {
    // check matrix type
    if (source.type === 'SparseMatrix') {
      // clone arrays
      matrix._values = source._values ? clone$2(source._values) : undefined;
      matrix._index = clone$2(source._index);
      matrix._ptr = clone$2(source._ptr);
      matrix._size = clone$2(source._size);
      matrix._datatype = datatype || source._datatype;
    } else {
      // build from matrix data
      _createFromArray(matrix, source.valueOf(), datatype || source._datatype);
    }
  }
  function _createFromArray(matrix, data, datatype) {
    // initialize fields
    matrix._values = [];
    matrix._index = [];
    matrix._ptr = [];
    matrix._datatype = datatype;
    // discover rows & columns, do not use math.size() to avoid looping array twice
    var rows = data.length;
    var columns = 0;

    // equal signature to use
    var eq = equalScalar;
    // zero value
    var zero = 0;
    if (isString(datatype)) {
      // find signature that matches (datatype, datatype)
      eq = typed.find(equalScalar, [datatype, datatype]) || equalScalar;
      // convert 0 to the same datatype
      zero = typed.convert(0, datatype);
    }

    // check we have rows (empty array)
    if (rows > 0) {
      // column index
      var j = 0;
      do {
        // store pointer to values index
        matrix._ptr.push(matrix._index.length);
        // loop rows
        for (var i = 0; i < rows; i++) {
          // current row
          var row = data[i];
          // check row is an array
          if (isArray(row)) {
            // update columns if needed (only on first column)
            if (j === 0 && columns < row.length) {
              columns = row.length;
            }
            // check row has column
            if (j < row.length) {
              // value
              var v = row[j];
              // check value != 0
              if (!eq(v, zero)) {
                // store value
                matrix._values.push(v);
                // index
                matrix._index.push(i);
              }
            }
          } else {
            // update columns if needed (only on first column)
            if (j === 0 && columns < 1) {
              columns = 1;
            }
            // check value != 0 (row is a scalar)
            if (!eq(row, zero)) {
              // store value
              matrix._values.push(row);
              // index
              matrix._index.push(i);
            }
          }
        }
        // increment index
        j++;
      } while (j < columns);
    }
    // store number of values in ptr
    matrix._ptr.push(matrix._index.length);
    // size
    matrix._size = [rows, columns];
  }
  SparseMatrix.prototype = new Matrix();

  /**
   * Create a new SparseMatrix
   */
  SparseMatrix.prototype.createSparseMatrix = function (data, datatype) {
    return new SparseMatrix(data, datatype);
  };

  /**
   * Attach type information
   */
  Object.defineProperty(SparseMatrix, 'name', {
    value: 'SparseMatrix'
  });
  SparseMatrix.prototype.constructor = SparseMatrix;
  SparseMatrix.prototype.type = 'SparseMatrix';
  SparseMatrix.prototype.isSparseMatrix = true;

  /**
   * Get the matrix type
   *
   * Usage:
   *    const matrixType = matrix.getDataType()  // retrieves the matrix type
   *
   * @memberOf SparseMatrix
   * @return {string}   type information; if multiple types are found from the Matrix, it will return "mixed"
   */
  SparseMatrix.prototype.getDataType = function () {
    return getArrayDataType(this._values, typeOf);
  };

  /**
   * Get the storage format used by the matrix.
   *
   * Usage:
   *     const format = matrix.storage()   // retrieve storage format
   *
   * @memberof SparseMatrix
   * @return {string}           The storage format.
   */
  SparseMatrix.prototype.storage = function () {
    return 'sparse';
  };

  /**
   * Get the datatype of the data stored in the matrix.
   *
   * Usage:
   *     const format = matrix.datatype()    // retrieve matrix datatype
   *
   * @memberof SparseMatrix
   * @return {string}           The datatype.
   */
  SparseMatrix.prototype.datatype = function () {
    return this._datatype;
  };

  /**
   * Create a new SparseMatrix
   * @memberof SparseMatrix
   * @param {Array} data
   * @param {string} [datatype]
   */
  SparseMatrix.prototype.create = function (data, datatype) {
    return new SparseMatrix(data, datatype);
  };

  /**
   * Get the matrix density.
   *
   * Usage:
   *     const density = matrix.density()                   // retrieve matrix density
   *
   * @memberof SparseMatrix
   * @return {number}           The matrix density.
   */
  SparseMatrix.prototype.density = function () {
    // rows & columns
    var rows = this._size[0];
    var columns = this._size[1];
    // calculate density
    return rows !== 0 && columns !== 0 ? this._index.length / (rows * columns) : 0;
  };

  /**
   * Get a subset of the matrix, or replace a subset of the matrix.
   *
   * Usage:
   *     const subset = matrix.subset(index)               // retrieve subset
   *     const value = matrix.subset(index, replacement)   // replace subset
   *
   * @memberof SparseMatrix
   * @param {Index} index
   * @param {Array | Matrix | *} [replacement]
   * @param {*} [defaultValue=0]      Default value, filled in on new entries when
   *                                  the matrix is resized. If not provided,
   *                                  new matrix elements will be filled with zeros.
   */
  SparseMatrix.prototype.subset = function (index, replacement, defaultValue) {
    // check it is a pattern matrix
    if (!this._values) {
      throw new Error('Cannot invoke subset on a Pattern only matrix');
    }

    // check arguments
    switch (arguments.length) {
      case 1:
        return _getsubset(this, index);

      // intentional fall through
      case 2:
      case 3:
        return _setsubset(this, index, replacement, defaultValue);
      default:
        throw new SyntaxError('Wrong number of arguments');
    }
  };
  function _getsubset(matrix, idx) {
    // check idx
    if (!isIndex(idx)) {
      throw new TypeError('Invalid index');
    }
    var isScalar = idx.isScalar();
    if (isScalar) {
      // return a scalar
      return matrix.get(idx.min());
    }
    // validate dimensions
    var size = idx.size();
    if (size.length !== matrix._size.length) {
      throw new DimensionError(size.length, matrix._size.length);
    }

    // vars
    var i, ii, k, kk;

    // validate if any of the ranges in the index is out of range
    var min = idx.min();
    var max = idx.max();
    for (i = 0, ii = matrix._size.length; i < ii; i++) {
      validateIndex(min[i], matrix._size[i]);
      validateIndex(max[i], matrix._size[i]);
    }

    // matrix arrays
    var mvalues = matrix._values;
    var mindex = matrix._index;
    var mptr = matrix._ptr;

    // rows & columns dimensions for result matrix
    var rows = idx.dimension(0);
    var columns = idx.dimension(1);

    // workspace & permutation vector
    var w = [];
    var pv = [];

    // loop rows in resulting matrix
    rows.forEach(function (i, r) {
      // update permutation vector
      pv[i] = r[0];
      // mark i in workspace
      w[i] = true;
    });

    // result matrix arrays
    var values = mvalues ? [] : undefined;
    var index = [];
    var ptr = [];

    // loop columns in result matrix
    columns.forEach(function (j) {
      // update ptr
      ptr.push(index.length);
      // loop values in column j
      for (k = mptr[j], kk = mptr[j + 1]; k < kk; k++) {
        // row
        i = mindex[k];
        // check row is in result matrix
        if (w[i] === true) {
          // push index
          index.push(pv[i]);
          // check we need to process values
          if (values) {
            values.push(mvalues[k]);
          }
        }
      }
    });
    // update ptr
    ptr.push(index.length);

    // return matrix
    return new SparseMatrix({
      values,
      index,
      ptr,
      size,
      datatype: matrix._datatype
    });
  }
  function _setsubset(matrix, index, submatrix, defaultValue) {
    // check index
    if (!index || index.isIndex !== true) {
      throw new TypeError('Invalid index');
    }

    // get index size and check whether the index contains a single value
    var iSize = index.size();
    var isScalar = index.isScalar();

    // calculate the size of the submatrix, and convert it into an Array if needed
    var sSize;
    if (isMatrix(submatrix)) {
      // submatrix size
      sSize = submatrix.size();
      // use array representation
      submatrix = submatrix.toArray();
    } else {
      // get submatrix size (array, scalar)
      sSize = arraySize(submatrix);
    }

    // check index is a scalar
    if (isScalar) {
      // verify submatrix is a scalar
      if (sSize.length !== 0) {
        throw new TypeError('Scalar expected');
      }
      // set value
      matrix.set(index.min(), submatrix, defaultValue);
    } else {
      // validate dimensions, index size must be one or two dimensions
      if (iSize.length !== 1 && iSize.length !== 2) {
        throw new DimensionError(iSize.length, matrix._size.length, '<');
      }

      // check submatrix and index have the same dimensions
      if (sSize.length < iSize.length) {
        // calculate number of missing outer dimensions
        var i = 0;
        var outer = 0;
        while (iSize[i] === 1 && sSize[i] === 1) {
          i++;
        }
        while (iSize[i] === 1) {
          outer++;
          i++;
        }
        // unsqueeze both outer and inner dimensions
        submatrix = unsqueeze$1(submatrix, iSize.length, outer, sSize);
      }

      // check whether the size of the submatrix matches the index size
      if (!deepStrictEqual(iSize, sSize)) {
        throw new DimensionError(iSize, sSize, '>');
      }

      // insert the sub matrix
      if (iSize.length === 1) {
        // if the replacement index only has 1 dimension, go trough each one and set its value
        var range = index.dimension(0);
        range.forEach(function (dataIndex, subIndex) {
          validateIndex(dataIndex);
          matrix.set([dataIndex, 0], submatrix[subIndex[0]], defaultValue);
        });
      } else {
        // if the replacement index has 2 dimensions, go through each one and set the value in the correct index
        var firstDimensionRange = index.dimension(0);
        var secondDimensionRange = index.dimension(1);
        firstDimensionRange.forEach(function (firstDataIndex, firstSubIndex) {
          validateIndex(firstDataIndex);
          secondDimensionRange.forEach(function (secondDataIndex, secondSubIndex) {
            validateIndex(secondDataIndex);
            matrix.set([firstDataIndex, secondDataIndex], submatrix[firstSubIndex[0]][secondSubIndex[0]], defaultValue);
          });
        });
      }
    }
    return matrix;
  }

  /**
   * Get a single element from the matrix.
   * @memberof SparseMatrix
   * @param {number[]} index   Zero-based index
   * @return {*} value
   */
  SparseMatrix.prototype.get = function (index) {
    if (!isArray(index)) {
      throw new TypeError('Array expected');
    }
    if (index.length !== this._size.length) {
      throw new DimensionError(index.length, this._size.length);
    }

    // check it is a pattern matrix
    if (!this._values) {
      throw new Error('Cannot invoke get on a Pattern only matrix');
    }

    // row and column
    var i = index[0];
    var j = index[1];

    // check i, j are valid
    validateIndex(i, this._size[0]);
    validateIndex(j, this._size[1]);

    // find value index
    var k = _getValueIndex(i, this._ptr[j], this._ptr[j + 1], this._index);
    // check k is prior to next column k and it is in the correct row
    if (k < this._ptr[j + 1] && this._index[k] === i) {
      return this._values[k];
    }
    return 0;
  };

  /**
   * Replace a single element in the matrix.
   * @memberof SparseMatrix
   * @param {number[]} index   Zero-based index
   * @param {*} v
   * @param {*} [defaultValue]        Default value, filled in on new entries when
   *                                  the matrix is resized. If not provided,
   *                                  new matrix elements will be set to zero.
   * @return {SparseMatrix} self
   */
  SparseMatrix.prototype.set = function (index, v, defaultValue) {
    if (!isArray(index)) {
      throw new TypeError('Array expected');
    }
    if (index.length !== this._size.length) {
      throw new DimensionError(index.length, this._size.length);
    }

    // check it is a pattern matrix
    if (!this._values) {
      throw new Error('Cannot invoke set on a Pattern only matrix');
    }

    // row and column
    var i = index[0];
    var j = index[1];

    // rows & columns
    var rows = this._size[0];
    var columns = this._size[1];

    // equal signature to use
    var eq = equalScalar;
    // zero value
    var zero = 0;
    if (isString(this._datatype)) {
      // find signature that matches (datatype, datatype)
      eq = typed.find(equalScalar, [this._datatype, this._datatype]) || equalScalar;
      // convert 0 to the same datatype
      zero = typed.convert(0, this._datatype);
    }

    // check we need to resize matrix
    if (i > rows - 1 || j > columns - 1) {
      // resize matrix
      _resize(this, Math.max(i + 1, rows), Math.max(j + 1, columns), defaultValue);
      // update rows & columns
      rows = this._size[0];
      columns = this._size[1];
    }

    // check i, j are valid
    validateIndex(i, rows);
    validateIndex(j, columns);

    // find value index
    var k = _getValueIndex(i, this._ptr[j], this._ptr[j + 1], this._index);
    // check k is prior to next column k and it is in the correct row
    if (k < this._ptr[j + 1] && this._index[k] === i) {
      // check value != 0
      if (!eq(v, zero)) {
        // update value
        this._values[k] = v;
      } else {
        // remove value from matrix
        _remove(k, j, this._values, this._index, this._ptr);
      }
    } else {
      if (!eq(v, zero)) {
        // insert value @ (i, j)
        _insert(k, i, j, v, this._values, this._index, this._ptr);
      }
    }
    return this;
  };
  function _getValueIndex(i, top, bottom, index) {
    // check row is on the bottom side
    if (bottom - top === 0) {
      return bottom;
    }
    // loop rows [top, bottom[
    for (var r = top; r < bottom; r++) {
      // check we found value index
      if (index[r] === i) {
        return r;
      }
    }
    // we did not find row
    return top;
  }
  function _remove(k, j, values, index, ptr) {
    // remove value @ k
    values.splice(k, 1);
    index.splice(k, 1);
    // update pointers
    for (var x = j + 1; x < ptr.length; x++) {
      ptr[x]--;
    }
  }
  function _insert(k, i, j, v, values, index, ptr) {
    // insert value
    values.splice(k, 0, v);
    // update row for k
    index.splice(k, 0, i);
    // update column pointers
    for (var x = j + 1; x < ptr.length; x++) {
      ptr[x]++;
    }
  }

  /**
   * Resize the matrix to the given size. Returns a copy of the matrix when
   * `copy=true`, otherwise return the matrix itself (resize in place).
   *
   * @memberof SparseMatrix
   * @param {number[] | Matrix} size  The new size the matrix should have.
   *                                  Since sparse matrices are always two-dimensional,
   *                                  size must be two numbers in either an array or a matrix
   * @param {*} [defaultValue=0]      Default value, filled in on new entries.
   *                                  If not provided, the matrix elements will
   *                                  be filled with zeros.
   * @param {boolean} [copy]          Return a resized copy of the matrix
   *
   * @return {Matrix}                 The resized matrix
   */
  SparseMatrix.prototype.resize = function (size, defaultValue, copy) {
    // validate arguments
    if (!isCollection(size)) {
      throw new TypeError('Array or Matrix expected');
    }

    // SparseMatrix input is always 2d, flatten this into 1d if it's indeed a vector
    var sizeArray = size.valueOf().map(value => {
      return Array.isArray(value) && value.length === 1 ? value[0] : value;
    });
    if (sizeArray.length !== 2) {
      throw new Error('Only two dimensions matrix are supported');
    }

    // check sizes
    sizeArray.forEach(function (value) {
      if (!isNumber(value) || !isInteger(value) || value < 0) {
        throw new TypeError('Invalid size, must contain positive integers ' + '(size: ' + format(sizeArray) + ')');
      }
    });

    // matrix to resize
    var m = copy ? this.clone() : this;
    // resize matrix
    return _resize(m, sizeArray[0], sizeArray[1], defaultValue);
  };
  function _resize(matrix, rows, columns, defaultValue) {
    // value to insert at the time of growing matrix
    var value = defaultValue || 0;

    // equal signature to use
    var eq = equalScalar;
    // zero value
    var zero = 0;
    if (isString(matrix._datatype)) {
      // find signature that matches (datatype, datatype)
      eq = typed.find(equalScalar, [matrix._datatype, matrix._datatype]) || equalScalar;
      // convert 0 to the same datatype
      zero = typed.convert(0, matrix._datatype);
      // convert value to the same datatype
      value = typed.convert(value, matrix._datatype);
    }

    // should we insert the value?
    var ins = !eq(value, zero);

    // old columns and rows
    var r = matrix._size[0];
    var c = matrix._size[1];
    var i, j, k;

    // check we need to increase columns
    if (columns > c) {
      // loop new columns
      for (j = c; j < columns; j++) {
        // update matrix._ptr for current column
        matrix._ptr[j] = matrix._values.length;
        // check we need to insert matrix._values
        if (ins) {
          // loop rows
          for (i = 0; i < r; i++) {
            // add new matrix._values
            matrix._values.push(value);
            // update matrix._index
            matrix._index.push(i);
          }
        }
      }
      // store number of matrix._values in matrix._ptr
      matrix._ptr[columns] = matrix._values.length;
    } else if (columns < c) {
      // truncate matrix._ptr
      matrix._ptr.splice(columns + 1, c - columns);
      // truncate matrix._values and matrix._index
      matrix._values.splice(matrix._ptr[columns], matrix._values.length);
      matrix._index.splice(matrix._ptr[columns], matrix._index.length);
    }
    // update columns
    c = columns;

    // check we need to increase rows
    if (rows > r) {
      // check we have to insert values
      if (ins) {
        // inserts
        var n = 0;
        // loop columns
        for (j = 0; j < c; j++) {
          // update matrix._ptr for current column
          matrix._ptr[j] = matrix._ptr[j] + n;
          // where to insert matrix._values
          k = matrix._ptr[j + 1] + n;
          // pointer
          var p = 0;
          // loop new rows, initialize pointer
          for (i = r; i < rows; i++, p++) {
            // add value
            matrix._values.splice(k + p, 0, value);
            // update matrix._index
            matrix._index.splice(k + p, 0, i);
            // increment inserts
            n++;
          }
        }
        // store number of matrix._values in matrix._ptr
        matrix._ptr[c] = matrix._values.length;
      }
    } else if (rows < r) {
      // deletes
      var d = 0;
      // loop columns
      for (j = 0; j < c; j++) {
        // update matrix._ptr for current column
        matrix._ptr[j] = matrix._ptr[j] - d;
        // where matrix._values start for next column
        var k0 = matrix._ptr[j];
        var k1 = matrix._ptr[j + 1] - d;
        // loop matrix._index
        for (k = k0; k < k1; k++) {
          // row
          i = matrix._index[k];
          // check we need to delete value and matrix._index
          if (i > rows - 1) {
            // remove value
            matrix._values.splice(k, 1);
            // remove item from matrix._index
            matrix._index.splice(k, 1);
            // increase deletes
            d++;
          }
        }
      }
      // update matrix._ptr for current column
      matrix._ptr[j] = matrix._values.length;
    }
    // update matrix._size
    matrix._size[0] = rows;
    matrix._size[1] = columns;
    // return matrix
    return matrix;
  }

  /**
   * Reshape the matrix to the given size. Returns a copy of the matrix when
   * `copy=true`, otherwise return the matrix itself (reshape in place).
   *
   * NOTE: This might be better suited to copy by default, instead of modifying
   *       in place. For now, it operates in place to remain consistent with
   *       resize().
   *
   * @memberof SparseMatrix
   * @param {number[]} sizes          The new size the matrix should have.
   *                                  Since sparse matrices are always two-dimensional,
   *                                  size must be two numbers in either an array or a matrix
   * @param {boolean} [copy]          Return a reshaped copy of the matrix
   *
   * @return {Matrix}                 The reshaped matrix
   */
  SparseMatrix.prototype.reshape = function (sizes, copy) {
    // validate arguments
    if (!isArray(sizes)) {
      throw new TypeError('Array expected');
    }
    if (sizes.length !== 2) {
      throw new Error('Sparse matrices can only be reshaped in two dimensions');
    }

    // check sizes
    sizes.forEach(function (value) {
      if (!isNumber(value) || !isInteger(value) || value <= -2 || value === 0) {
        throw new TypeError('Invalid size, must contain positive integers or -1 ' + '(size: ' + format(sizes) + ')');
      }
    });
    var currentLength = this._size[0] * this._size[1];
    sizes = processSizesWildcard(sizes, currentLength);
    var newLength = sizes[0] * sizes[1];

    // m * n must not change
    if (currentLength !== newLength) {
      throw new Error('Reshaping sparse matrix will result in the wrong number of elements');
    }

    // matrix to reshape
    var m = copy ? this.clone() : this;

    // return unchanged if the same shape
    if (this._size[0] === sizes[0] && this._size[1] === sizes[1]) {
      return m;
    }

    // Convert to COO format (generate a column index)
    var colIndex = [];
    for (var i = 0; i < m._ptr.length; i++) {
      for (var j = 0; j < m._ptr[i + 1] - m._ptr[i]; j++) {
        colIndex.push(i);
      }
    }

    // Clone the values array
    var values = m._values.slice();

    // Clone the row index array
    var rowIndex = m._index.slice();

    // Transform the (row, column) indices
    for (var _i = 0; _i < m._index.length; _i++) {
      var r1 = rowIndex[_i];
      var c1 = colIndex[_i];
      var flat = r1 * m._size[1] + c1;
      colIndex[_i] = flat % sizes[1];
      rowIndex[_i] = Math.floor(flat / sizes[1]);
    }

    // Now reshaping is supposed to preserve the row-major order, BUT these sparse matrices are stored
    // in column-major order, so we have to reorder the value array now. One option is to use a multisort,
    // sorting several arrays based on some other array.

    // OR, we could easily just:

    // 1. Remove all values from the matrix
    m._values.length = 0;
    m._index.length = 0;
    m._ptr.length = sizes[1] + 1;
    m._size = sizes.slice();
    for (var _i2 = 0; _i2 < m._ptr.length; _i2++) {
      m._ptr[_i2] = 0;
    }

    // 2. Re-insert all elements in the proper order (simplified code from SparseMatrix.prototype.set)
    // This step is probably the most time-consuming
    for (var h = 0; h < values.length; h++) {
      var _i3 = rowIndex[h];
      var _j = colIndex[h];
      var v = values[h];
      var k = _getValueIndex(_i3, m._ptr[_j], m._ptr[_j + 1], m._index);
      _insert(k, _i3, _j, v, m._values, m._index, m._ptr);
    }

    // The value indices are inserted out of order, but apparently that's... still OK?

    return m;
  };

  /**
   * Create a clone of the matrix
   * @memberof SparseMatrix
   * @return {SparseMatrix} clone
   */
  SparseMatrix.prototype.clone = function () {
    var m = new SparseMatrix({
      values: this._values ? clone$2(this._values) : undefined,
      index: clone$2(this._index),
      ptr: clone$2(this._ptr),
      size: clone$2(this._size),
      datatype: this._datatype
    });
    return m;
  };

  /**
   * Retrieve the size of the matrix.
   * @memberof SparseMatrix
   * @returns {number[]} size
   */
  SparseMatrix.prototype.size = function () {
    return this._size.slice(0); // copy the Array
  };

  /**
   * Create a new matrix with the results of the callback function executed on
   * each entry of the matrix.
   * @memberof SparseMatrix
   * @param {Function} callback   The callback function is invoked with three
   *                              parameters: the value of the element, the index
   *                              of the element, and the Matrix being traversed.
   * @param {boolean} [skipZeros] Invoke callback function for non-zero values only.
   *
   * @return {SparseMatrix} matrix
   */
  SparseMatrix.prototype.map = function (callback, skipZeros) {
    // check it is a pattern matrix
    if (!this._values) {
      throw new Error('Cannot invoke map on a Pattern only matrix');
    }
    // matrix instance
    var me = this;
    // rows and columns
    var rows = this._size[0];
    var columns = this._size[1];
    var fastCallback = optimizeCallback(callback, me, 'map');
    // invoke callback
    var invoke = function invoke(v, i, j) {
      // invoke callback
      return fastCallback.fn(v, [i, j], me);
    };
    // invoke _map
    return _map(this, 0, rows - 1, 0, columns - 1, invoke, skipZeros);
  };

  /**
   * Create a new matrix with the results of the callback function executed on the interval
   * [minRow..maxRow, minColumn..maxColumn].
   */
  function _map(matrix, minRow, maxRow, minColumn, maxColumn, callback, skipZeros) {
    // result arrays
    var values = [];
    var index = [];
    var ptr = [];

    // equal signature to use
    var eq = equalScalar;
    // zero value
    var zero = 0;
    if (isString(matrix._datatype)) {
      // find signature that matches (datatype, datatype)
      eq = typed.find(equalScalar, [matrix._datatype, matrix._datatype]) || equalScalar;
      // convert 0 to the same datatype
      zero = typed.convert(0, matrix._datatype);
    }

    // invoke callback
    var invoke = function invoke(v, x, y) {
      // invoke callback
      var value = callback(v, x, y);
      // check value != 0
      if (!eq(value, zero)) {
        // store value
        values.push(value);
        // index
        index.push(x);
      }
    };
    // loop columns
    for (var j = minColumn; j <= maxColumn; j++) {
      // store pointer to values index
      ptr.push(values.length);
      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
      var k0 = matrix._ptr[j];
      var k1 = matrix._ptr[j + 1];
      if (skipZeros) {
        // loop k within [k0, k1[
        for (var k = k0; k < k1; k++) {
          // row index
          var i = matrix._index[k];
          // check i is in range
          if (i >= minRow && i <= maxRow) {
            // value @ k
            invoke(matrix._values[k], i - minRow, j - minColumn);
          }
        }
      } else {
        // create a cache holding all defined values
        var _values = {};
        for (var _k = k0; _k < k1; _k++) {
          var _i4 = matrix._index[_k];
          _values[_i4] = matrix._values[_k];
        }

        // loop over all rows (indexes can be unordered so we can't use that),
        // and either read the value or zero
        for (var _i5 = minRow; _i5 <= maxRow; _i5++) {
          var value = _i5 in _values ? _values[_i5] : 0;
          invoke(value, _i5 - minRow, j - minColumn);
        }
      }
    }

    // store number of values in ptr
    ptr.push(values.length);
    // return sparse matrix
    return new SparseMatrix({
      values,
      index,
      ptr,
      size: [maxRow - minRow + 1, maxColumn - minColumn + 1]
    });
  }

  /**
   * Execute a callback function on each entry of the matrix.
   * @memberof SparseMatrix
   * @param {Function} callback   The callback function is invoked with three
   *                              parameters: the value of the element, the index
   *                              of the element, and the Matrix being traversed.
   * @param {boolean} [skipZeros] Invoke callback function for non-zero values only.
   *                              If false, the indices are guaranteed to be in order,
   *                              if true, the indices can be unordered.
   */
  SparseMatrix.prototype.forEach = function (callback, skipZeros) {
    // check it is a pattern matrix
    if (!this._values) {
      throw new Error('Cannot invoke forEach on a Pattern only matrix');
    }
    // matrix instance
    var me = this;
    // rows and columns
    var rows = this._size[0];
    var columns = this._size[1];
    var fastCallback = optimizeCallback(callback, me, 'forEach');
    // loop columns
    for (var j = 0; j < columns; j++) {
      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
      var k0 = this._ptr[j];
      var k1 = this._ptr[j + 1];
      if (skipZeros) {
        // loop k within [k0, k1[
        for (var k = k0; k < k1; k++) {
          // row index
          var i = this._index[k];

          // value @ k
          // TODO apply a non indexed version of algorithm in case fastCallback is not optimized
          fastCallback.fn(this._values[k], [i, j], me);
        }
      } else {
        // create a cache holding all defined values
        var values = {};
        for (var _k2 = k0; _k2 < k1; _k2++) {
          var _i6 = this._index[_k2];
          values[_i6] = this._values[_k2];
        }

        // loop over all rows (indexes can be unordered so we can't use that),
        // and either read the value or zero
        for (var _i7 = 0; _i7 < rows; _i7++) {
          var value = _i7 in values ? values[_i7] : 0;
          fastCallback.fn(value, [_i7, j], me);
        }
      }
    }
  };

  /**
   * Iterate over the matrix elements, skipping zeros
   * @return {Iterable<{ value, index: number[] }>}
   */
  SparseMatrix.prototype[Symbol.iterator] = function* () {
    if (!this._values) {
      throw new Error('Cannot iterate a Pattern only matrix');
    }
    var columns = this._size[1];
    for (var j = 0; j < columns; j++) {
      var k0 = this._ptr[j];
      var k1 = this._ptr[j + 1];
      for (var k = k0; k < k1; k++) {
        // row index
        var i = this._index[k];
        yield {
          value: this._values[k],
          index: [i, j]
        };
      }
    }
  };

  /**
   * Create an Array with a copy of the data of the SparseMatrix
   * @memberof SparseMatrix
   * @returns {Array} array
   */
  SparseMatrix.prototype.toArray = function () {
    return _toArray(this._values, this._index, this._ptr, this._size, true);
  };

  /**
   * Get the primitive value of the SparseMatrix: a two dimensions array
   * @memberof SparseMatrix
   * @returns {Array} array
   */
  SparseMatrix.prototype.valueOf = function () {
    return _toArray(this._values, this._index, this._ptr, this._size, false);
  };
  function _toArray(values, index, ptr, size, copy) {
    // rows and columns
    var rows = size[0];
    var columns = size[1];
    // result
    var a = [];
    // vars
    var i, j;
    // initialize array
    for (i = 0; i < rows; i++) {
      a[i] = [];
      for (j = 0; j < columns; j++) {
        a[i][j] = 0;
      }
    }

    // loop columns
    for (j = 0; j < columns; j++) {
      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
      var k0 = ptr[j];
      var k1 = ptr[j + 1];
      // loop k within [k0, k1[
      for (var k = k0; k < k1; k++) {
        // row index
        i = index[k];
        // set value (use one for pattern matrix)
        a[i][j] = values ? copy ? clone$2(values[k]) : values[k] : 1;
      }
    }
    return a;
  }

  /**
   * Get a string representation of the matrix, with optional formatting options.
   * @memberof SparseMatrix
   * @param {Object | number | Function} [options]  Formatting options. See
   *                                                lib/utils/number:format for a
   *                                                description of the available
   *                                                options.
   * @returns {string} str
   */
  SparseMatrix.prototype.format = function (options) {
    // rows and columns
    var rows = this._size[0];
    var columns = this._size[1];
    // density
    var density = this.density();
    // rows & columns
    var str = 'Sparse Matrix [' + format(rows, options) + ' x ' + format(columns, options) + '] density: ' + format(density, options) + '\n';
    // loop columns
    for (var j = 0; j < columns; j++) {
      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
      var k0 = this._ptr[j];
      var k1 = this._ptr[j + 1];
      // loop k within [k0, k1[
      for (var k = k0; k < k1; k++) {
        // row index
        var i = this._index[k];
        // append value
        str += '\n    (' + format(i, options) + ', ' + format(j, options) + ') ==> ' + (this._values ? format(this._values[k], options) : 'X');
      }
    }
    return str;
  };

  /**
   * Get a string representation of the matrix
   * @memberof SparseMatrix
   * @returns {string} str
   */
  SparseMatrix.prototype.toString = function () {
    return format(this.toArray());
  };

  /**
   * Get a JSON representation of the matrix
   * @memberof SparseMatrix
   * @returns {Object}
   */
  SparseMatrix.prototype.toJSON = function () {
    return {
      mathjs: 'SparseMatrix',
      values: this._values,
      index: this._index,
      ptr: this._ptr,
      size: this._size,
      datatype: this._datatype
    };
  };

  /**
   * Get the kth Matrix diagonal.
   *
   * @memberof SparseMatrix
   * @param {number | BigNumber} [k=0]     The kth diagonal where the vector will retrieved.
   *
   * @returns {Matrix}                     The matrix vector with the diagonal values.
   */
  SparseMatrix.prototype.diagonal = function (k) {
    // validate k if any
    if (k) {
      // convert BigNumber to a number
      if (isBigNumber(k)) {
        k = k.toNumber();
      }
      // is must be an integer
      if (!isNumber(k) || !isInteger(k)) {
        throw new TypeError('The parameter k must be an integer number');
      }
    } else {
      // default value
      k = 0;
    }
    var kSuper = k > 0 ? k : 0;
    var kSub = k < 0 ? -k : 0;

    // rows & columns
    var rows = this._size[0];
    var columns = this._size[1];

    // number diagonal values
    var n = Math.min(rows - kSub, columns - kSuper);

    // diagonal arrays
    var values = [];
    var index = [];
    var ptr = [];
    // initial ptr value
    ptr[0] = 0;
    // loop columns
    for (var j = kSuper; j < columns && values.length < n; j++) {
      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
      var k0 = this._ptr[j];
      var k1 = this._ptr[j + 1];
      // loop x within [k0, k1[
      for (var x = k0; x < k1; x++) {
        // row index
        var i = this._index[x];
        // check row
        if (i === j - kSuper + kSub) {
          // value on this column
          values.push(this._values[x]);
          // store row
          index[values.length - 1] = i - kSub;
          // exit loop
          break;
        }
      }
    }
    // close ptr
    ptr.push(values.length);
    // return matrix
    return new SparseMatrix({
      values,
      index,
      ptr,
      size: [n, 1]
    });
  };

  /**
   * Generate a matrix from a JSON object
   * @memberof SparseMatrix
   * @param {Object} json  An object structured like
   *                       `{"mathjs": "SparseMatrix", "values": [], "index": [], "ptr": [], "size": []}`,
   *                       where mathjs is optional
   * @returns {SparseMatrix}
   */
  SparseMatrix.fromJSON = function (json) {
    return new SparseMatrix(json);
  };

  /**
   * Create a diagonal matrix.
   *
   * @memberof SparseMatrix
   * @param {Array} size                       The matrix size.
   * @param {number | Array | Matrix } value   The values for the diagonal.
   * @param {number | BigNumber} [k=0]         The kth diagonal where the vector will be filled in.
   * @param {number} [defaultValue]            The default value for non-diagonal
   * @param {string} [datatype]                The Matrix datatype, values must be of this datatype.
   *
   * @returns {SparseMatrix}
   */
  SparseMatrix.diagonal = function (size, value, k, defaultValue, datatype) {
    if (!isArray(size)) {
      throw new TypeError('Array expected, size parameter');
    }
    if (size.length !== 2) {
      throw new Error('Only two dimensions matrix are supported');
    }

    // map size & validate
    size = size.map(function (s) {
      // check it is a big number
      if (isBigNumber(s)) {
        // convert it
        s = s.toNumber();
      }
      // validate arguments
      if (!isNumber(s) || !isInteger(s) || s < 1) {
        throw new Error('Size values must be positive integers');
      }
      return s;
    });

    // validate k if any
    if (k) {
      // convert BigNumber to a number
      if (isBigNumber(k)) {
        k = k.toNumber();
      }
      // is must be an integer
      if (!isNumber(k) || !isInteger(k)) {
        throw new TypeError('The parameter k must be an integer number');
      }
    } else {
      // default value
      k = 0;
    }

    // equal signature to use
    var eq = equalScalar;
    // zero value
    var zero = 0;
    if (isString(datatype)) {
      // find signature that matches (datatype, datatype)
      eq = typed.find(equalScalar, [datatype, datatype]) || equalScalar;
      // convert 0 to the same datatype
      zero = typed.convert(0, datatype);
    }
    var kSuper = k > 0 ? k : 0;
    var kSub = k < 0 ? -k : 0;

    // rows and columns
    var rows = size[0];
    var columns = size[1];

    // number of non-zero items
    var n = Math.min(rows - kSub, columns - kSuper);

    // value extraction function
    var _value;

    // check value
    if (isArray(value)) {
      // validate array
      if (value.length !== n) {
        // number of values in array must be n
        throw new Error('Invalid value array length');
      }
      // define function
      _value = function _value(i) {
        // return value @ i
        return value[i];
      };
    } else if (isMatrix(value)) {
      // matrix size
      var ms = value.size();
      // validate matrix
      if (ms.length !== 1 || ms[0] !== n) {
        // number of values in array must be n
        throw new Error('Invalid matrix length');
      }
      // define function
      _value = function _value(i) {
        // return value @ i
        return value.get([i]);
      };
    } else {
      // define function
      _value = function _value() {
        // return value
        return value;
      };
    }

    // create arrays
    var values = [];
    var index = [];
    var ptr = [];

    // loop items
    for (var j = 0; j < columns; j++) {
      // number of rows with value
      ptr.push(values.length);
      // diagonal index
      var i = j - kSuper;
      // check we need to set diagonal value
      if (i >= 0 && i < n) {
        // get value @ i
        var v = _value(i);
        // check for zero
        if (!eq(v, zero)) {
          // column
          index.push(i + kSub);
          // add value
          values.push(v);
        }
      }
    }
    // last value should be number of values
    ptr.push(values.length);
    // create SparseMatrix
    return new SparseMatrix({
      values,
      index,
      ptr,
      size: [rows, columns]
    });
  };

  /**
   * Swap rows i and j in Matrix.
   *
   * @memberof SparseMatrix
   * @param {number} i       Matrix row index 1
   * @param {number} j       Matrix row index 2
   *
   * @return {Matrix}        The matrix reference
   */
  SparseMatrix.prototype.swapRows = function (i, j) {
    // check index
    if (!isNumber(i) || !isInteger(i) || !isNumber(j) || !isInteger(j)) {
      throw new Error('Row index must be positive integers');
    }
    // check dimensions
    if (this._size.length !== 2) {
      throw new Error('Only two dimensional matrix is supported');
    }
    // validate index
    validateIndex(i, this._size[0]);
    validateIndex(j, this._size[0]);

    // swap rows
    SparseMatrix._swapRows(i, j, this._size[1], this._values, this._index, this._ptr);
    // return current instance
    return this;
  };

  /**
   * Loop rows with data in column j.
   *
   * @param {number} j            Column
   * @param {Array} values        Matrix values
   * @param {Array} index         Matrix row indeces
   * @param {Array} ptr           Matrix column pointers
   * @param {Function} callback   Callback function invoked for every row in column j
   */
  SparseMatrix._forEachRow = function (j, values, index, ptr, callback) {
    // indeces for column j
    var k0 = ptr[j];
    var k1 = ptr[j + 1];

    // loop
    for (var k = k0; k < k1; k++) {
      // invoke callback
      callback(index[k], values[k]);
    }
  };

  /**
   * Swap rows x and y in Sparse Matrix data structures.
   *
   * @param {number} x         Matrix row index 1
   * @param {number} y         Matrix row index 2
   * @param {number} columns   Number of columns in matrix
   * @param {Array} values     Matrix values
   * @param {Array} index      Matrix row indeces
   * @param {Array} ptr        Matrix column pointers
   */
  SparseMatrix._swapRows = function (x, y, columns, values, index, ptr) {
    // loop columns
    for (var j = 0; j < columns; j++) {
      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
      var k0 = ptr[j];
      var k1 = ptr[j + 1];
      // find value index @ x
      var kx = _getValueIndex(x, k0, k1, index);
      // find value index @ x
      var ky = _getValueIndex(y, k0, k1, index);
      // check both rows exist in matrix
      if (kx < k1 && ky < k1 && index[kx] === x && index[ky] === y) {
        // swap values (check for pattern matrix)
        if (values) {
          var v = values[kx];
          values[kx] = values[ky];
          values[ky] = v;
        }
        // next column
        continue;
      }
      // check x row exist & no y row
      if (kx < k1 && index[kx] === x && (ky >= k1 || index[ky] !== y)) {
        // value @ x (check for pattern matrix)
        var vx = values ? values[kx] : undefined;
        // insert value @ y
        index.splice(ky, 0, y);
        if (values) {
          values.splice(ky, 0, vx);
        }
        // remove value @ x (adjust array index if needed)
        index.splice(ky <= kx ? kx + 1 : kx, 1);
        if (values) {
          values.splice(ky <= kx ? kx + 1 : kx, 1);
        }
        // next column
        continue;
      }
      // check y row exist & no x row
      if (ky < k1 && index[ky] === y && (kx >= k1 || index[kx] !== x)) {
        // value @ y (check for pattern matrix)
        var vy = values ? values[ky] : undefined;
        // insert value @ x
        index.splice(kx, 0, x);
        if (values) {
          values.splice(kx, 0, vy);
        }
        // remove value @ y (adjust array index if needed)
        index.splice(kx <= ky ? ky + 1 : ky, 1);
        if (values) {
          values.splice(kx <= ky ? ky + 1 : ky, 1);
        }
      }
    }
  };
  return SparseMatrix;
}, {
  isClass: true
});

var name$o = 'number';
var dependencies$n = ['typed'];

/**
 * Separates the radix, integer part, and fractional part of a non decimal number string
 * @param {string} input string to parse
 * @returns {object} the parts of the string or null if not a valid input
 */
function getNonDecimalNumberParts(input) {
  var nonDecimalWithRadixMatch = input.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
  if (nonDecimalWithRadixMatch) {
    var radix = {
      '0b': 2,
      '0o': 8,
      '0x': 16
    }[nonDecimalWithRadixMatch[1]];
    var integerPart = nonDecimalWithRadixMatch[2];
    var fractionalPart = nonDecimalWithRadixMatch[3];
    return {
      input,
      radix,
      integerPart,
      fractionalPart
    };
  } else {
    return null;
  }
}

/**
 * Makes a number from a radix, and integer part, and a fractional part
 * @param {parts} [x] parts of the number string (from getNonDecimalNumberParts)
 * @returns {number} the number
 */
function makeNumberFromNonDecimalParts(parts) {
  var n = parseInt(parts.integerPart, parts.radix);
  var f = 0;
  for (var i = 0; i < parts.fractionalPart.length; i++) {
    var digitValue = parseInt(parts.fractionalPart[i], parts.radix);
    f += digitValue / Math.pow(parts.radix, i + 1);
  }
  var result = n + f;
  if (isNaN(result)) {
    throw new SyntaxError('String "' + parts.input + '" is not a valid number');
  }
  return result;
}
var createNumber = /* #__PURE__ */factory(name$o, dependencies$n, _ref => {
  var {
    typed
  } = _ref;
  /**
   * Create a number or convert a string, boolean, or unit to a number.
   * When value is a matrix, all elements will be converted to number.
   *
   * Syntax:
   *
   *    math.number(value)
   *    math.number(unit, valuelessUnit)
   *
   * Examples:
   *
   *    math.number(2)                         // returns number 2
   *    math.number('7.2')                     // returns number 7.2
   *    math.number(true)                      // returns number 1
   *    math.number([true, false, true, true]) // returns [1, 0, 1, 1]
   *    math.number(math.unit('52cm'), 'm')    // returns 0.52
   *
   * See also:
   *
   *    bignumber, bigint, boolean, numeric, complex, index, matrix, string, unit
   *
   * @param {string | number | BigNumber | Fraction | boolean | Array | Matrix | Unit | null} [value]  Value to be converted
   * @param {Unit | string} [valuelessUnit] A valueless unit, used to convert a unit to a number
   * @return {number | Array | Matrix} The created number
   */
  var number = typed('number', {
    '': function _() {
      return 0;
    },
    number: function number(x) {
      return x;
    },
    string: function string(x) {
      if (x === 'NaN') return NaN;
      var nonDecimalNumberParts = getNonDecimalNumberParts(x);
      if (nonDecimalNumberParts) {
        return makeNumberFromNonDecimalParts(nonDecimalNumberParts);
      }
      var size = 0;
      var wordSizeSuffixMatch = x.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
      if (wordSizeSuffixMatch) {
        // x includes a size suffix like 0xffffi32, so we extract
        // the suffix and remove it from x
        size = Number(wordSizeSuffixMatch[2]);
        x = wordSizeSuffixMatch[1];
      }
      var num = Number(x);
      if (isNaN(num)) {
        throw new SyntaxError('String "' + x + '" is not a valid number');
      }
      if (wordSizeSuffixMatch) {
        // x is a signed bin, oct, or hex literal
        // num is the value of string x if x is interpreted as unsigned
        if (num > 2 ** size - 1) {
          // literal is too large for size suffix
          throw new SyntaxError("String \"".concat(x, "\" is out of range"));
        }
        // check if the bit at index size - 1 is set and if so do the twos complement
        if (num >= 2 ** (size - 1)) {
          num = num - 2 ** size;
        }
      }
      return num;
    },
    BigNumber: function BigNumber(x) {
      return x.toNumber();
    },
    bigint: function bigint(x) {
      return Number(x);
    },
    Fraction: function Fraction(x) {
      return x.valueOf();
    },
    Unit: typed.referToSelf(self => x => {
      var clone = x.clone();
      clone.value = self(x.value);
      return clone;
    }),
    null: function _null(x) {
      return 0;
    },
    'Unit, string | Unit': function Unit_string__Unit(unit, valuelessUnit) {
      return unit.toNumber(valuelessUnit);
    },
    'Array | Matrix': typed.referToSelf(self => x => deepMap(x, self))
  });

  // reviver function to parse a JSON object like:
  //
  //     {"mathjs":"number","value":"2.3"}
  //
  // into a number 2.3
  number.fromJSON = function (json) {
    return parseFloat(json.value);
  };
  return number;
});

var name$n = 'bignumber';
var dependencies$m = ['typed', 'BigNumber'];
var createBignumber = /* #__PURE__ */factory(name$n, dependencies$m, _ref => {
  var {
    typed,
    BigNumber
  } = _ref;
  /**
   * Create a BigNumber, which can store numbers with arbitrary precision.
   * When a matrix is provided, all elements will be converted to BigNumber.
   *
   * Syntax:
   *
   *    math.bignumber(x)
   *
   * Examples:
   *
   *    0.1 + 0.2                                  // returns number 0.30000000000000004
   *    math.bignumber(0.1) + math.bignumber(0.2)  // returns BigNumber 0.3
   *
   *
   *    7.2e500                                    // returns number Infinity
   *    math.bignumber('7.2e500')                  // returns BigNumber 7.2e500
   *
   * See also:
   *
   *    number, bigint, boolean, complex, index, matrix, string, unit
   *
   * @param {number | string | Fraction | BigNumber | bigint | Array | Matrix | boolean | null} [value]  Value for the big number,
   *                                                    0 by default.
   * @returns {BigNumber} The created bignumber
   */
  return typed('bignumber', {
    '': function _() {
      return new BigNumber(0);
    },
    number: function number(x) {
      // convert to string to prevent errors in case of >15 digits
      return new BigNumber(x + '');
    },
    string: function string(x) {
      var wordSizeSuffixMatch = x.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
      if (wordSizeSuffixMatch) {
        // x has a word size suffix
        var size = wordSizeSuffixMatch[2];
        var n = BigNumber(wordSizeSuffixMatch[1]);
        var twoPowSize = new BigNumber(2).pow(Number(size));
        if (n.gt(twoPowSize.sub(1))) {
          throw new SyntaxError("String \"".concat(x, "\" is out of range"));
        }
        var twoPowSizeSubOne = new BigNumber(2).pow(Number(size) - 1);
        if (n.gte(twoPowSizeSubOne)) {
          return n.sub(twoPowSize);
        } else {
          return n;
        }
      }
      return new BigNumber(x);
    },
    BigNumber: function BigNumber(x) {
      // we assume a BigNumber is immutable
      return x;
    },
    bigint: function bigint(x) {
      return new BigNumber(x.toString());
    },
    Unit: typed.referToSelf(self => x => {
      var clone = x.clone();
      clone.value = self(x.value);
      return clone;
    }),
    Fraction: function Fraction(x) {
      return new BigNumber(String(x.n)).div(String(x.d)).times(String(x.s));
    },
    null: function _null(_x) {
      return new BigNumber(0);
    },
    'Array | Matrix': typed.referToSelf(self => x => deepMap(x, self))
  });
});

var name$m = 'fraction';
var dependencies$l = ['typed', 'Fraction'];
var createFraction = /* #__PURE__ */factory(name$m, dependencies$l, _ref => {
  var {
    typed,
    Fraction
  } = _ref;
  /**
   * Create a fraction or convert a value to a fraction.
   *
   * With one numeric argument, produces the closest rational approximation to the
   * input.
   * With two arguments, the first is the numerator and the second is the denominator,
   * and creates the corresponding fraction. Both numerator and denominator must be
   * integers.
   * With one object argument, looks for the integer numerator as the value of property
   * 'n' and the integer denominator as the value of property 'd'.
   * With a matrix argument, creates a matrix of the same shape with entries
   * converted into fractions.
   *
   * Syntax:
   *     math.fraction(value)
   *     math.fraction(numerator, denominator)
   *     math.fraction({n: numerator, d: denominator})
   *     math.fraction(matrix: Array | Matrix)
   *
   * Examples:
   *
   *     math.fraction(6.283)             // returns Fraction 6283/1000
   *     math.fraction(1, 3)              // returns Fraction 1/3
   *     math.fraction('2/3')             // returns Fraction 2/3
   *     math.fraction({n: 2, d: 3})      // returns Fraction 2/3
   *     math.fraction([0.2, 0.25, 1.25]) // returns Array [1/5, 1/4, 5/4]
   *     math.fraction(4, 5.1)            // throws Error: Parameters must be integer
   *
   * See also:
   *
   *    bignumber, number, string, unit
   *
   * @param {number | string | Fraction | BigNumber | bigint | Unit | Array | Matrix} [args]
   *            Arguments specifying the value, or numerator and denominator of
   *            the fraction
   * @return {Fraction | Array | Matrix} Returns a fraction
   */
  return typed('fraction', {
    number: function number(x) {
      if (!isFinite(x) || isNaN(x)) {
        throw new Error(x + ' cannot be represented as a fraction');
      }
      return new Fraction(x);
    },
    string: function string(x) {
      return new Fraction(x);
    },
    'number, number': function number_number(numerator, denominator) {
      return new Fraction(numerator, denominator);
    },
    'bigint, bigint': function bigint_bigint(numerator, denominator) {
      return new Fraction(numerator, denominator);
    },
    null: function _null(x) {
      return new Fraction(0);
    },
    BigNumber: function BigNumber(x) {
      return new Fraction(x.toString());
    },
    bigint: function bigint(x) {
      return new Fraction(x.toString());
    },
    Fraction: function Fraction(x) {
      return x; // fractions are immutable
    },
    Unit: typed.referToSelf(self => x => {
      var clone = x.clone();
      clone.value = self(x.value);
      return clone;
    }),
    Object: function Object(x) {
      return new Fraction(x);
    },
    'Array | Matrix': typed.referToSelf(self => x => deepMap(x, self))
  });
});

var name$l = 'matrix';
var dependencies$k = ['typed', 'Matrix', 'DenseMatrix', 'SparseMatrix'];
var createMatrix = /* #__PURE__ */factory(name$l, dependencies$k, _ref => {
  var {
    typed,
    Matrix,
    DenseMatrix,
    SparseMatrix
  } = _ref;
  /**
   * Create a Matrix. The function creates a new `math.Matrix` object from
   * an `Array`. A Matrix has utility functions to manipulate the data in the
   * matrix, like getting the size and getting or setting values in the matrix.
   * Supported storage formats are 'dense' and 'sparse'.
   *
   * Syntax:
   *
   *    math.matrix()                         // creates an empty matrix using default storage format (dense).
   *    math.matrix(data)                     // creates a matrix with initial data using default storage format (dense).
   *    math.matrix('dense')                  // creates an empty matrix using the given storage format.
   *    math.matrix(data, 'dense')            // creates a matrix with initial data using the given storage format.
   *    math.matrix(data, 'sparse')           // creates a sparse matrix with initial data.
   *    math.matrix(data, 'sparse', 'number') // creates a sparse matrix with initial data, number data type.
   *
   * Examples:
   *
   *    let m = math.matrix([[1, 2], [3, 4]])
   *    m.size()                        // Array [2, 2]
   *    m.resize([3, 2], 5)
   *    m.valueOf()                     // Array [[1, 2], [3, 4], [5, 5]]
   *    m.get([1, 0])                    // number 3
   *
   * See also:
   *
   *    bignumber, boolean, complex, index, number, string, unit, sparse
   *
   * @param {Array | Matrix} [data]    A multi dimensional array
   * @param {string} [format]          The Matrix storage format, either `'dense'` or `'sparse'`
   * @param {string} [datatype]        Type of the values
   *
   * @return {Matrix} The created matrix
   */
  return typed(name$l, {
    '': function _() {
      return _create([]);
    },
    string: function string(format) {
      return _create([], format);
    },
    'string, string': function string_string(format, datatype) {
      return _create([], format, datatype);
    },
    Array: function Array(data) {
      return _create(data);
    },
    Matrix: function Matrix(data) {
      return _create(data, data.storage());
    },
    'Array | Matrix, string': _create,
    'Array | Matrix, string, string': _create
  });

  /**
   * Create a new Matrix with given storage format
   * @param {Array} data
   * @param {string} [format]
   * @param {string} [datatype]
   * @returns {Matrix} Returns a new Matrix
   * @private
   */
  function _create(data, format, datatype) {
    // get storage format constructor
    if (format === 'dense' || format === 'default' || format === undefined) {
      return new DenseMatrix(data, datatype);
    }
    if (format === 'sparse') {
      return new SparseMatrix(data, datatype);
    }
    throw new TypeError('Unknown matrix type ' + JSON.stringify(format) + '.');
  }
});

var name$k = 'unaryMinus';
var dependencies$j = ['typed'];
var createUnaryMinus = /* #__PURE__ */factory(name$k, dependencies$j, _ref => {
  var {
    typed
  } = _ref;
  /**
   * Inverse the sign of a value, apply a unary minus operation.
   *
   * For matrices, the function is evaluated element wise. Boolean values and
   * strings will be converted to a number. For complex numbers, both real and
   * complex value are inverted.
   *
   * Syntax:
   *
   *    math.unaryMinus(x)
   *
   * Examples:
   *
   *    math.unaryMinus(3.5)      // returns -3.5
   *    math.unaryMinus(-4.2)     // returns 4.2
   *
   * See also:
   *
   *    add, subtract, unaryPlus
   *
   * @param  {number | BigNumber | bigint | Fraction | Complex | Unit | Array | Matrix} x Number to be inverted.
   * @return {number | BigNumber | bigint | Fraction | Complex | Unit | Array | Matrix} Returns the value with inverted sign.
   */
  return typed(name$k, {
    number: unaryMinusNumber,
    'Complex | BigNumber | Fraction': x => x.neg(),
    bigint: x => -x,
    Unit: typed.referToSelf(self => x => {
      var res = x.clone();
      res.value = typed.find(self, res.valueType())(x.value);
      return res;
    }),
    // deep map collection, skip zeros since unaryMinus(0) = 0
    'Array | Matrix': typed.referToSelf(self => x => deepMap(x, self, true))

    // TODO: add support for string
  });
});

var name$j = 'abs';
var dependencies$i = ['typed'];
var createAbs = /* #__PURE__ */factory(name$j, dependencies$i, _ref => {
  var {
    typed
  } = _ref;
  /**
   * Calculate the absolute value of a number. For matrices, the function is
   * evaluated element wise.
   *
   * Syntax:
   *
   *    math.abs(x)
   *
   * Examples:
   *
   *    math.abs(3.5)                // returns number 3.5
   *    math.abs(-4.2)               // returns number 4.2
   *
   *    math.abs([3, -5, -1, 0, 2])  // returns Array [3, 5, 1, 0, 2]
   *
   * See also:
   *
   *    sign
   *
   * @param  {number | BigNumber | bigint | Fraction | Complex | Array | Matrix | Unit} x
   *            A number or matrix for which to get the absolute value
   * @return {number | BigNumber | bigint | Fraction | Complex | Array | Matrix | Unit}
   *            Absolute value of `x`
   */
  return typed(name$j, {
    number: absNumber,
    'Complex | BigNumber | Fraction | Unit': x => x.abs(),
    bigint: x => x < 0n ? -x : x,
    // deep map collection, skip zeros since abs(0) = 0
    'Array | Matrix': typed.referToSelf(self => x => deepMap(x, self, true))
  });
});

var name$i = 'addScalar';
var dependencies$h = ['typed'];
var createAddScalar = /* #__PURE__ */factory(name$i, dependencies$h, _ref => {
  var {
    typed
  } = _ref;
  /**
   * Add two scalar values, `x + y`.
   * This function is meant for internal use: it is used by the public function
   * `add`
   *
   * This function does not support collections (Array or Matrix).
   *
   * @param  {number | BigNumber | bigint | Fraction | Complex | Unit} x   First value to add
   * @param  {number | BigNumber | bigint | Fraction | Complex} y          Second value to add
   * @return {number | BigNumber | bigint | Fraction | Complex | Unit}     Sum of `x` and `y`
   * @private
   */
  return typed(name$i, {
    'number, number': addNumber,
    'Complex, Complex': function Complex_Complex(x, y) {
      return x.add(y);
    },
    'BigNumber, BigNumber': function BigNumber_BigNumber(x, y) {
      return x.plus(y);
    },
    'bigint, bigint': function bigint_bigint(x, y) {
      return x + y;
    },
    'Fraction, Fraction': function Fraction_Fraction(x, y) {
      return x.add(y);
    },
    'Unit, Unit': typed.referToSelf(self => (x, y) => {
      if (x.value === null || x.value === undefined) {
        throw new Error('Parameter x contains a unit with undefined value');
      }
      if (y.value === null || y.value === undefined) {
        throw new Error('Parameter y contains a unit with undefined value');
      }
      if (!x.equalBase(y)) throw new Error('Units do not match');
      var res = x.clone();
      res.value = typed.find(self, [res.valueType(), y.valueType()])(res.value, y.value);
      res.fixPrefix = false;
      return res;
    })
  });
});

var name$h = 'subtractScalar';
var dependencies$g = ['typed'];
var createSubtractScalar = /* #__PURE__ */factory(name$h, dependencies$g, _ref => {
  var {
    typed
  } = _ref;
  /**
   * Subtract two scalar values, `x - y`.
   * This function is meant for internal use: it is used by the public function
   * `subtract`
   *
   * This function does not support collections (Array or Matrix).
   *
   * @param  {number | BigNumber | bigint | Fraction | Complex | Unit} x   First value
   * @param  {number | BigNumber | bigint | Fraction | Complex} y          Second value to be subtracted from `x`
   * @return {number | BigNumber | bigint | Fraction | Complex | Unit}     Difference of `x` and `y`
   * @private
   */
  return typed(name$h, {
    'number, number': subtractNumber,
    'Complex, Complex': function Complex_Complex(x, y) {
      return x.sub(y);
    },
    'BigNumber, BigNumber': function BigNumber_BigNumber(x, y) {
      return x.minus(y);
    },
    'bigint, bigint': function bigint_bigint(x, y) {
      return x - y;
    },
    'Fraction, Fraction': function Fraction_Fraction(x, y) {
      return x.sub(y);
    },
    'Unit, Unit': typed.referToSelf(self => (x, y) => {
      if (x.value === null || x.value === undefined) {
        throw new Error('Parameter x contains a unit with undefined value');
      }
      if (y.value === null || y.value === undefined) {
        throw new Error('Parameter y contains a unit with undefined value');
      }
      if (!x.equalBase(y)) throw new Error('Units do not match');
      var res = x.clone();
      res.value = typed.find(self, [res.valueType(), y.valueType()])(res.value, y.value);
      res.fixPrefix = false;
      return res;
    })
  });
});

var name$g = 'matAlgo11xS0s';
var dependencies$f = ['typed', 'equalScalar'];
var createMatAlgo11xS0s = /* #__PURE__ */factory(name$g, dependencies$f, _ref => {
  var {
    typed,
    equalScalar
  } = _ref;
  /**
   * Iterates over SparseMatrix S nonzero items and invokes the callback function f(Sij, b).
   * Callback function invoked NZ times (number of nonzero items in S).
   *
   *
   *          ┌  f(Sij, b)  ; S(i,j) !== 0
   * C(i,j) = ┤
   *          └  0          ; otherwise
   *
   *
   * @param {Matrix}   s                 The SparseMatrix instance (S)
   * @param {Scalar}   b                 The Scalar value
   * @param {Function} callback          The f(Aij,b) operation to invoke
   * @param {boolean}  inverse           A true value indicates callback should be invoked f(b,Sij)
   *
   * @return {Matrix}                    SparseMatrix (C)
   *
   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97626813
   */
  return function matAlgo11xS0s(s, b, callback, inverse) {
    // sparse matrix arrays
    var avalues = s._values;
    var aindex = s._index;
    var aptr = s._ptr;
    var asize = s._size;
    var adt = s._datatype;

    // sparse matrix cannot be a Pattern matrix
    if (!avalues) {
      throw new Error('Cannot perform operation on Pattern Sparse Matrix and Scalar value');
    }

    // rows & columns
    var rows = asize[0];
    var columns = asize[1];

    // datatype
    var dt;
    // equal signature to use
    var eq = equalScalar;
    // zero value
    var zero = 0;
    // callback signature to use
    var cf = callback;

    // process data types
    if (typeof adt === 'string') {
      // datatype
      dt = adt;
      // find signature that matches (dt, dt)
      eq = typed.find(equalScalar, [dt, dt]);
      // convert 0 to the same datatype
      zero = typed.convert(0, dt);
      // convert b to the same datatype
      b = typed.convert(b, dt);
      // callback
      cf = typed.find(callback, [dt, dt]);
    }

    // result arrays
    var cvalues = [];
    var cindex = [];
    var cptr = [];

    // loop columns
    for (var j = 0; j < columns; j++) {
      // initialize ptr
      cptr[j] = cindex.length;
      // values in j
      for (var k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
        // row
        var i = aindex[k];
        // invoke callback
        var v = inverse ? cf(b, avalues[k]) : cf(avalues[k], b);
        // check value is zero
        if (!eq(v, zero)) {
          // push index & value
          cindex.push(i);
          cvalues.push(v);
        }
      }
    }
    // update ptr
    cptr[columns] = cindex.length;

    // return sparse matrix
    return s.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [rows, columns],
      datatype: dt
    });
  };
});

var name$f = 'matAlgo14xDs';
var dependencies$e = ['typed'];
var createMatAlgo14xDs = /* #__PURE__ */factory(name$f, dependencies$e, _ref => {
  var {
    typed
  } = _ref;
  /**
   * Iterates over DenseMatrix items and invokes the callback function f(Aij..z, b).
   * Callback function invoked MxN times.
   *
   * C(i,j,...z) = f(Aij..z, b)
   *
   * @param {Matrix}   a                 The DenseMatrix instance (A)
   * @param {Scalar}   b                 The Scalar value
   * @param {Function} callback          The f(Aij..z,b) operation to invoke
   * @param {boolean}  inverse           A true value indicates callback should be invoked f(b,Aij..z)
   *
   * @return {Matrix}                    DenseMatrix (C)
   *
   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97659042
   */
  return function matAlgo14xDs(a, b, callback, inverse) {
    // a arrays
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype;

    // datatype
    var dt;
    // callback signature to use
    var cf = callback;

    // process data types
    if (typeof adt === 'string') {
      // datatype
      dt = adt;
      // convert b to the same datatype
      b = typed.convert(b, dt);
      // callback
      cf = typed.find(callback, [dt, dt]);
    }

    // populate cdata, iterate through dimensions
    var cdata = asize.length > 0 ? _iterate(cf, 0, asize, asize[0], adata, b, inverse) : [];

    // c matrix
    return a.createDenseMatrix({
      data: cdata,
      size: clone$2(asize),
      datatype: dt
    });
  };

  // recursive function
  function _iterate(f, level, s, n, av, bv, inverse) {
    // initialize array for this level
    var cv = [];
    // check we reach the last level
    if (level === s.length - 1) {
      // loop arrays in last level
      for (var i = 0; i < n; i++) {
        // invoke callback and store value
        cv[i] = inverse ? f(bv, av[i]) : f(av[i], bv);
      }
    } else {
      // iterate current level
      for (var j = 0; j < n; j++) {
        // iterate next level
        cv[j] = _iterate(f, level + 1, s, s[level + 1], av[j], bv, inverse);
      }
    }
    return cv;
  }
});

var name$e = 'multiplyScalar';
var dependencies$d = ['typed'];
var createMultiplyScalar = /* #__PURE__ */factory(name$e, dependencies$d, _ref => {
  var {
    typed
  } = _ref;
  /**
   * Multiply two scalar values, `x * y`.
   * This function is meant for internal use: it is used by the public function
   * `multiply`
   *
   * This function does not support collections (Array or Matrix).
   *
   * @param  {number | BigNumber | bigint | Fraction | Complex | Unit} x   First value to multiply
   * @param  {number | BigNumber | bigint | Fraction | Complex} y          Second value to multiply
   * @return {number | BigNumber | bigint | Fraction | Complex | Unit}     Multiplication of `x` and `y`
   * @private
   */
  return typed('multiplyScalar', {
    'number, number': multiplyNumber,
    'Complex, Complex': function Complex_Complex(x, y) {
      return x.mul(y);
    },
    'BigNumber, BigNumber': function BigNumber_BigNumber(x, y) {
      return x.times(y);
    },
    'bigint, bigint': function bigint_bigint(x, y) {
      return x * y;
    },
    'Fraction, Fraction': function Fraction_Fraction(x, y) {
      return x.mul(y);
    },
    'number | Fraction | BigNumber | Complex, Unit': (x, y) => y.multiply(x),
    'Unit, number | Fraction | BigNumber | Complex | Unit': (x, y) => x.multiply(y)
  });
});

var name$d = 'multiply';
var dependencies$c = ['typed', 'matrix', 'addScalar', 'multiplyScalar', 'equalScalar', 'dot'];
var createMultiply = /* #__PURE__ */factory(name$d, dependencies$c, _ref => {
  var {
    typed,
    matrix,
    addScalar,
    multiplyScalar,
    equalScalar,
    dot
  } = _ref;
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed,
    equalScalar
  });
  var matAlgo14xDs = createMatAlgo14xDs({
    typed
  });
  function _validateMatrixDimensions(size1, size2) {
    // check left operand dimensions
    switch (size1.length) {
      case 1:
        // check size2
        switch (size2.length) {
          case 1:
            // Vector x Vector
            if (size1[0] !== size2[0]) {
              // throw error
              throw new RangeError('Dimension mismatch in multiplication. Vectors must have the same length');
            }
            break;
          case 2:
            // Vector x Matrix
            if (size1[0] !== size2[0]) {
              // throw error
              throw new RangeError('Dimension mismatch in multiplication. Vector length (' + size1[0] + ') must match Matrix rows (' + size2[0] + ')');
            }
            break;
          default:
            throw new Error('Can only multiply a 1 or 2 dimensional matrix (Matrix B has ' + size2.length + ' dimensions)');
        }
        break;
      case 2:
        // check size2
        switch (size2.length) {
          case 1:
            // Matrix x Vector
            if (size1[1] !== size2[0]) {
              // throw error
              throw new RangeError('Dimension mismatch in multiplication. Matrix columns (' + size1[1] + ') must match Vector length (' + size2[0] + ')');
            }
            break;
          case 2:
            // Matrix x Matrix
            if (size1[1] !== size2[0]) {
              // throw error
              throw new RangeError('Dimension mismatch in multiplication. Matrix A columns (' + size1[1] + ') must match Matrix B rows (' + size2[0] + ')');
            }
            break;
          default:
            throw new Error('Can only multiply a 1 or 2 dimensional matrix (Matrix B has ' + size2.length + ' dimensions)');
        }
        break;
      default:
        throw new Error('Can only multiply a 1 or 2 dimensional matrix (Matrix A has ' + size1.length + ' dimensions)');
    }
  }

  /**
   * C = A * B
   *
   * @param {Matrix} a            Dense Vector   (N)
   * @param {Matrix} b            Dense Vector   (N)
   *
   * @return {number}             Scalar value
   */
  function _multiplyVectorVector(a, b, n) {
    // check empty vector
    if (n === 0) {
      throw new Error('Cannot multiply two empty vectors');
    }
    return dot(a, b);
  }

  /**
   * C = A * B
   *
   * @param {Matrix} a            Dense Vector   (M)
   * @param {Matrix} b            Matrix         (MxN)
   *
   * @return {Matrix}             Dense Vector   (N)
   */
  function _multiplyVectorMatrix(a, b) {
    // process storage
    if (b.storage() !== 'dense') {
      throw new Error('Support for SparseMatrix not implemented');
    }
    return _multiplyVectorDenseMatrix(a, b);
  }

  /**
   * C = A * B
   *
   * @param {Matrix} a            Dense Vector   (M)
   * @param {Matrix} b            Dense Matrix   (MxN)
   *
   * @return {Matrix}             Dense Vector   (N)
   */
  function _multiplyVectorDenseMatrix(a, b) {
    // a dense
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype || a.getDataType();
    // b dense
    var bdata = b._data;
    var bsize = b._size;
    var bdt = b._datatype || b.getDataType();
    // rows & columns
    var alength = asize[0];
    var bcolumns = bsize[1];

    // datatype
    var dt;
    // addScalar signature to use
    var af = addScalar;
    // multiplyScalar signature to use
    var mf = multiplyScalar;

    // process data types
    if (adt && bdt && adt === bdt && typeof adt === 'string' && adt !== 'mixed') {
      // datatype
      dt = adt;
      // find signatures that matches (dt, dt)
      af = typed.find(addScalar, [dt, dt]);
      mf = typed.find(multiplyScalar, [dt, dt]);
    }

    // result
    var c = [];

    // loop matrix columns
    for (var j = 0; j < bcolumns; j++) {
      // sum (do not initialize it with zero)
      var sum = mf(adata[0], bdata[0][j]);
      // loop vector
      for (var i = 1; i < alength; i++) {
        // multiply & accumulate
        sum = af(sum, mf(adata[i], bdata[i][j]));
      }
      c[j] = sum;
    }

    // return matrix
    return a.createDenseMatrix({
      data: c,
      size: [bcolumns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : undefined
    });
  }

  /**
   * C = A * B
   *
   * @param {Matrix} a            Matrix         (MxN)
   * @param {Matrix} b            Dense Vector   (N)
   *
   * @return {Matrix}             Dense Vector   (M)
   */
  var _multiplyMatrixVector = typed('_multiplyMatrixVector', {
    'DenseMatrix, any': _multiplyDenseMatrixVector,
    'SparseMatrix, any': _multiplySparseMatrixVector
  });

  /**
   * C = A * B
   *
   * @param {Matrix} a            Matrix         (MxN)
   * @param {Matrix} b            Matrix         (NxC)
   *
   * @return {Matrix}             Matrix         (MxC)
   */
  var _multiplyMatrixMatrix = typed('_multiplyMatrixMatrix', {
    'DenseMatrix, DenseMatrix': _multiplyDenseMatrixDenseMatrix,
    'DenseMatrix, SparseMatrix': _multiplyDenseMatrixSparseMatrix,
    'SparseMatrix, DenseMatrix': _multiplySparseMatrixDenseMatrix,
    'SparseMatrix, SparseMatrix': _multiplySparseMatrixSparseMatrix
  });

  /**
   * C = A * B
   *
   * @param {Matrix} a            DenseMatrix  (MxN)
   * @param {Matrix} b            Dense Vector (N)
   *
   * @return {Matrix}             Dense Vector (M)
   */
  function _multiplyDenseMatrixVector(a, b) {
    // a dense
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype || a.getDataType();
    // b dense
    var bdata = b._data;
    var bdt = b._datatype || b.getDataType();
    // rows & columns
    var arows = asize[0];
    var acolumns = asize[1];

    // datatype
    var dt;
    // addScalar signature to use
    var af = addScalar;
    // multiplyScalar signature to use
    var mf = multiplyScalar;

    // process data types
    if (adt && bdt && adt === bdt && typeof adt === 'string' && adt !== 'mixed') {
      // datatype
      dt = adt;
      // find signatures that matches (dt, dt)
      af = typed.find(addScalar, [dt, dt]);
      mf = typed.find(multiplyScalar, [dt, dt]);
    }

    // result
    var c = [];

    // loop matrix a rows
    for (var i = 0; i < arows; i++) {
      // current row
      var row = adata[i];
      // sum (do not initialize it with zero)
      var sum = mf(row[0], bdata[0]);
      // loop matrix a columns
      for (var j = 1; j < acolumns; j++) {
        // multiply & accumulate
        sum = af(sum, mf(row[j], bdata[j]));
      }
      c[i] = sum;
    }

    // return matrix
    return a.createDenseMatrix({
      data: c,
      size: [arows],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : undefined
    });
  }

  /**
   * C = A * B
   *
   * @param {Matrix} a            DenseMatrix    (MxN)
   * @param {Matrix} b            DenseMatrix    (NxC)
   *
   * @return {Matrix}             DenseMatrix    (MxC)
   */
  function _multiplyDenseMatrixDenseMatrix(a, b) {
    // getDataType()
    // a dense
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype || a.getDataType();
    // b dense
    var bdata = b._data;
    var bsize = b._size;
    var bdt = b._datatype || b.getDataType();
    // rows & columns
    var arows = asize[0];
    var acolumns = asize[1];
    var bcolumns = bsize[1];

    // datatype
    var dt;
    // addScalar signature to use
    var af = addScalar;
    // multiplyScalar signature to use
    var mf = multiplyScalar;

    // process data types
    if (adt && bdt && adt === bdt && typeof adt === 'string' && adt !== 'mixed' && adt !== 'mixed') {
      // datatype
      dt = adt;
      // find signatures that matches (dt, dt)
      af = typed.find(addScalar, [dt, dt]);
      mf = typed.find(multiplyScalar, [dt, dt]);
    }

    // result
    var c = [];

    // loop matrix a rows
    for (var i = 0; i < arows; i++) {
      // current row
      var row = adata[i];
      // initialize row array
      c[i] = [];
      // loop matrix b columns
      for (var j = 0; j < bcolumns; j++) {
        // sum (avoid initializing sum to zero)
        var sum = mf(row[0], bdata[0][j]);
        // loop matrix a columns
        for (var x = 1; x < acolumns; x++) {
          // multiply & accumulate
          sum = af(sum, mf(row[x], bdata[x][j]));
        }
        c[i][j] = sum;
      }
    }

    // return matrix
    return a.createDenseMatrix({
      data: c,
      size: [arows, bcolumns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : undefined
    });
  }

  /**
   * C = A * B
   *
   * @param {Matrix} a            DenseMatrix    (MxN)
   * @param {Matrix} b            SparseMatrix   (NxC)
   *
   * @return {Matrix}             SparseMatrix   (MxC)
   */
  function _multiplyDenseMatrixSparseMatrix(a, b) {
    // a dense
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype || a.getDataType();
    // b sparse
    var bvalues = b._values;
    var bindex = b._index;
    var bptr = b._ptr;
    var bsize = b._size;
    var bdt = b._datatype || b._data === undefined ? b._datatype : b.getDataType();
    // validate b matrix
    if (!bvalues) {
      throw new Error('Cannot multiply Dense Matrix times Pattern only Matrix');
    }
    // rows & columns
    var arows = asize[0];
    var bcolumns = bsize[1];

    // datatype
    var dt;
    // addScalar signature to use
    var af = addScalar;
    // multiplyScalar signature to use
    var mf = multiplyScalar;
    // equalScalar signature to use
    var eq = equalScalar;
    // zero value
    var zero = 0;

    // process data types
    if (adt && bdt && adt === bdt && typeof adt === 'string' && adt !== 'mixed') {
      // datatype
      dt = adt;
      // find signatures that matches (dt, dt)
      af = typed.find(addScalar, [dt, dt]);
      mf = typed.find(multiplyScalar, [dt, dt]);
      eq = typed.find(equalScalar, [dt, dt]);
      // convert 0 to the same datatype
      zero = typed.convert(0, dt);
    }

    // result
    var cvalues = [];
    var cindex = [];
    var cptr = [];
    // c matrix
    var c = b.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [arows, bcolumns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : undefined
    });

    // loop b columns
    for (var jb = 0; jb < bcolumns; jb++) {
      // update ptr
      cptr[jb] = cindex.length;
      // indeces in column jb
      var kb0 = bptr[jb];
      var kb1 = bptr[jb + 1];
      // do not process column jb if no data exists
      if (kb1 > kb0) {
        // last row mark processed
        var last = 0;
        // loop a rows
        for (var i = 0; i < arows; i++) {
          // column mark
          var mark = i + 1;
          // C[i, jb]
          var cij = void 0;
          // values in b column j
          for (var kb = kb0; kb < kb1; kb++) {
            // row
            var ib = bindex[kb];
            // check value has been initialized
            if (last !== mark) {
              // first value in column jb
              cij = mf(adata[i][ib], bvalues[kb]);
              // update mark
              last = mark;
            } else {
              // accumulate value
              cij = af(cij, mf(adata[i][ib], bvalues[kb]));
            }
          }
          // check column has been processed and value != 0
          if (last === mark && !eq(cij, zero)) {
            // push row & value
            cindex.push(i);
            cvalues.push(cij);
          }
        }
      }
    }
    // update ptr
    cptr[bcolumns] = cindex.length;

    // return sparse matrix
    return c;
  }

  /**
   * C = A * B
   *
   * @param {Matrix} a            SparseMatrix    (MxN)
   * @param {Matrix} b            Dense Vector (N)
   *
   * @return {Matrix}             SparseMatrix    (M, 1)
   */
  function _multiplySparseMatrixVector(a, b) {
    // a sparse
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var adt = a._datatype || a._data === undefined ? a._datatype : a.getDataType();
    // validate a matrix
    if (!avalues) {
      throw new Error('Cannot multiply Pattern only Matrix times Dense Matrix');
    }
    // b dense
    var bdata = b._data;
    var bdt = b._datatype || b.getDataType();
    // rows & columns
    var arows = a._size[0];
    var brows = b._size[0];
    // result
    var cvalues = [];
    var cindex = [];
    var cptr = [];

    // datatype
    var dt;
    // addScalar signature to use
    var af = addScalar;
    // multiplyScalar signature to use
    var mf = multiplyScalar;
    // equalScalar signature to use
    var eq = equalScalar;
    // zero value
    var zero = 0;

    // process data types
    if (adt && bdt && adt === bdt && typeof adt === 'string' && adt !== 'mixed') {
      // datatype
      dt = adt;
      // find signatures that matches (dt, dt)
      af = typed.find(addScalar, [dt, dt]);
      mf = typed.find(multiplyScalar, [dt, dt]);
      eq = typed.find(equalScalar, [dt, dt]);
      // convert 0 to the same datatype
      zero = typed.convert(0, dt);
    }

    // workspace
    var x = [];
    // vector with marks indicating a value x[i] exists in a given column
    var w = [];

    // update ptr
    cptr[0] = 0;
    // rows in b
    for (var ib = 0; ib < brows; ib++) {
      // b[ib]
      var vbi = bdata[ib];
      // check b[ib] != 0, avoid loops
      if (!eq(vbi, zero)) {
        // A values & index in ib column
        for (var ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
          // a row
          var ia = aindex[ka];
          // check value exists in current j
          if (!w[ia]) {
            // ia is new entry in j
            w[ia] = true;
            // add i to pattern of C
            cindex.push(ia);
            // x(ia) = A
            x[ia] = mf(vbi, avalues[ka]);
          } else {
            // i exists in C already
            x[ia] = af(x[ia], mf(vbi, avalues[ka]));
          }
        }
      }
    }
    // copy values from x to column jb of c
    for (var p1 = cindex.length, p = 0; p < p1; p++) {
      // row
      var ic = cindex[p];
      // copy value
      cvalues[p] = x[ic];
    }
    // update ptr
    cptr[1] = cindex.length;

    // matrix to return
    return a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [arows, 1],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : undefined
    });
  }

  /**
   * C = A * B
   *
   * @param {Matrix} a            SparseMatrix      (MxN)
   * @param {Matrix} b            DenseMatrix       (NxC)
   *
   * @return {Matrix}             SparseMatrix      (MxC)
   */
  function _multiplySparseMatrixDenseMatrix(a, b) {
    // a sparse
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var adt = a._datatype || a._data === undefined ? a._datatype : a.getDataType();
    // validate a matrix
    if (!avalues) {
      throw new Error('Cannot multiply Pattern only Matrix times Dense Matrix');
    }
    // b dense
    var bdata = b._data;
    var bdt = b._datatype || b.getDataType();
    // rows & columns
    var arows = a._size[0];
    var brows = b._size[0];
    var bcolumns = b._size[1];

    // datatype
    var dt;
    // addScalar signature to use
    var af = addScalar;
    // multiplyScalar signature to use
    var mf = multiplyScalar;
    // equalScalar signature to use
    var eq = equalScalar;
    // zero value
    var zero = 0;

    // process data types
    if (adt && bdt && adt === bdt && typeof adt === 'string' && adt !== 'mixed') {
      // datatype
      dt = adt;
      // find signatures that matches (dt, dt)
      af = typed.find(addScalar, [dt, dt]);
      mf = typed.find(multiplyScalar, [dt, dt]);
      eq = typed.find(equalScalar, [dt, dt]);
      // convert 0 to the same datatype
      zero = typed.convert(0, dt);
    }

    // result
    var cvalues = [];
    var cindex = [];
    var cptr = [];
    // c matrix
    var c = a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [arows, bcolumns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : undefined
    });

    // workspace
    var x = [];
    // vector with marks indicating a value x[i] exists in a given column
    var w = [];

    // loop b columns
    for (var jb = 0; jb < bcolumns; jb++) {
      // update ptr
      cptr[jb] = cindex.length;
      // mark in workspace for current column
      var mark = jb + 1;
      // rows in jb
      for (var ib = 0; ib < brows; ib++) {
        // b[ib, jb]
        var vbij = bdata[ib][jb];
        // check b[ib, jb] != 0, avoid loops
        if (!eq(vbij, zero)) {
          // A values & index in ib column
          for (var ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
            // a row
            var ia = aindex[ka];
            // check value exists in current j
            if (w[ia] !== mark) {
              // ia is new entry in j
              w[ia] = mark;
              // add i to pattern of C
              cindex.push(ia);
              // x(ia) = A
              x[ia] = mf(vbij, avalues[ka]);
            } else {
              // i exists in C already
              x[ia] = af(x[ia], mf(vbij, avalues[ka]));
            }
          }
        }
      }
      // copy values from x to column jb of c
      for (var p0 = cptr[jb], p1 = cindex.length, p = p0; p < p1; p++) {
        // row
        var ic = cindex[p];
        // copy value
        cvalues[p] = x[ic];
      }
    }
    // update ptr
    cptr[bcolumns] = cindex.length;

    // return sparse matrix
    return c;
  }

  /**
   * C = A * B
   *
   * @param {Matrix} a            SparseMatrix      (MxN)
   * @param {Matrix} b            SparseMatrix      (NxC)
   *
   * @return {Matrix}             SparseMatrix      (MxC)
   */
  function _multiplySparseMatrixSparseMatrix(a, b) {
    // a sparse
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var adt = a._datatype || a._data === undefined ? a._datatype : a.getDataType();
    // b sparse
    var bvalues = b._values;
    var bindex = b._index;
    var bptr = b._ptr;
    var bdt = b._datatype || b._data === undefined ? b._datatype : b.getDataType();

    // rows & columns
    var arows = a._size[0];
    var bcolumns = b._size[1];
    // flag indicating both matrices (a & b) contain data
    var values = avalues && bvalues;

    // datatype
    var dt;
    // addScalar signature to use
    var af = addScalar;
    // multiplyScalar signature to use
    var mf = multiplyScalar;

    // process data types
    if (adt && bdt && adt === bdt && typeof adt === 'string' && adt !== 'mixed') {
      // datatype
      dt = adt;
      // find signatures that matches (dt, dt)
      af = typed.find(addScalar, [dt, dt]);
      mf = typed.find(multiplyScalar, [dt, dt]);
    }

    // result
    var cvalues = values ? [] : undefined;
    var cindex = [];
    var cptr = [];
    // c matrix
    var c = a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [arows, bcolumns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : undefined
    });

    // workspace
    var x = values ? [] : undefined;
    // vector with marks indicating a value x[i] exists in a given column
    var w = [];
    // variables
    var ka, ka0, ka1, kb, kb0, kb1, ia, ib;
    // loop b columns
    for (var jb = 0; jb < bcolumns; jb++) {
      // update ptr
      cptr[jb] = cindex.length;
      // mark in workspace for current column
      var mark = jb + 1;
      // B values & index in j
      for (kb0 = bptr[jb], kb1 = bptr[jb + 1], kb = kb0; kb < kb1; kb++) {
        // b row
        ib = bindex[kb];
        // check we need to process values
        if (values) {
          // loop values in a[:,ib]
          for (ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
            // row
            ia = aindex[ka];
            // check value exists in current j
            if (w[ia] !== mark) {
              // ia is new entry in j
              w[ia] = mark;
              // add i to pattern of C
              cindex.push(ia);
              // x(ia) = A
              x[ia] = mf(bvalues[kb], avalues[ka]);
            } else {
              // i exists in C already
              x[ia] = af(x[ia], mf(bvalues[kb], avalues[ka]));
            }
          }
        } else {
          // loop values in a[:,ib]
          for (ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
            // row
            ia = aindex[ka];
            // check value exists in current j
            if (w[ia] !== mark) {
              // ia is new entry in j
              w[ia] = mark;
              // add i to pattern of C
              cindex.push(ia);
            }
          }
        }
      }
      // check we need to process matrix values (pattern matrix)
      if (values) {
        // copy values from x to column jb of c
        for (var p0 = cptr[jb], p1 = cindex.length, p = p0; p < p1; p++) {
          // row
          var ic = cindex[p];
          // copy value
          cvalues[p] = x[ic];
        }
      }
    }
    // update ptr
    cptr[bcolumns] = cindex.length;

    // return sparse matrix
    return c;
  }

  /**
   * Multiply two or more values, `x * y`.
   * For matrices, the matrix product is calculated.
   *
   * Syntax:
   *
   *    math.multiply(x, y)
   *    math.multiply(x, y, z, ...)
   *
   * Examples:
   *
   *    math.multiply(4, 5.2)        // returns number 20.8
   *    math.multiply(2, 3, 4)       // returns number 24
   *
   *    const a = math.complex(2, 3)
   *    const b = math.complex(4, 1)
   *    math.multiply(a, b)          // returns Complex 5 + 14i
   *
   *    const c = [[1, 2], [4, 3]]
   *    const d = [[1, 2, 3], [3, -4, 7]]
   *    math.multiply(c, d)          // returns Array [[7, -6, 17], [13, -4, 33]]
   *
   *    const e = math.unit('2.1 km')
   *    math.multiply(3, e)          // returns Unit 6.3 km
   *
   * See also:
   *
   *    divide, prod, cross, dot
   *
   * @param  {number | BigNumber | bigint | Fraction | Complex | Unit | Array | Matrix} x First value to multiply
   * @param  {number | BigNumber | bigint | Fraction | Complex | Unit | Array | Matrix} y Second value to multiply
   * @return {number | BigNumber | bigint | Fraction | Complex | Unit | Array | Matrix} Multiplication of `x` and `y`
   */
  return typed(name$d, multiplyScalar, {
    // we extend the signatures of multiplyScalar with signatures dealing with matrices

    'Array, Array': typed.referTo('Matrix, Matrix', selfMM => (x, y) => {
      // check dimensions
      _validateMatrixDimensions(arraySize(x), arraySize(y));

      // use dense matrix implementation
      var m = selfMM(matrix(x), matrix(y));
      // return array or scalar
      return isMatrix(m) ? m.valueOf() : m;
    }),
    'Matrix, Matrix': function Matrix_Matrix(x, y) {
      // dimensions
      var xsize = x.size();
      var ysize = y.size();

      // check dimensions
      _validateMatrixDimensions(xsize, ysize);

      // process dimensions
      if (xsize.length === 1) {
        // process y dimensions
        if (ysize.length === 1) {
          // Vector * Vector
          return _multiplyVectorVector(x, y, xsize[0]);
        }
        // Vector * Matrix
        return _multiplyVectorMatrix(x, y);
      }
      // process y dimensions
      if (ysize.length === 1) {
        // Matrix * Vector
        return _multiplyMatrixVector(x, y);
      }
      // Matrix * Matrix
      return _multiplyMatrixMatrix(x, y);
    },
    'Matrix, Array': typed.referTo('Matrix,Matrix', selfMM => (x, y) => selfMM(x, matrix(y))),
    'Array, Matrix': typed.referToSelf(self => (x, y) => {
      // use Matrix * Matrix implementation
      return self(matrix(x, y.storage()), y);
    }),
    'SparseMatrix, any': function SparseMatrix_any(x, y) {
      return matAlgo11xS0s(x, y, multiplyScalar, false);
    },
    'DenseMatrix, any': function DenseMatrix_any(x, y) {
      return matAlgo14xDs(x, y, multiplyScalar, false);
    },
    'any, SparseMatrix': function any_SparseMatrix(x, y) {
      return matAlgo11xS0s(y, x, multiplyScalar, true);
    },
    'any, DenseMatrix': function any_DenseMatrix(x, y) {
      return matAlgo14xDs(y, x, multiplyScalar, true);
    },
    'Array, any': function Array_any(x, y) {
      // use matrix implementation
      return matAlgo14xDs(matrix(x), y, multiplyScalar, false).valueOf();
    },
    'any, Array': function any_Array(x, y) {
      // use matrix implementation
      return matAlgo14xDs(matrix(y), x, multiplyScalar, true).valueOf();
    },
    'any, any': multiplyScalar,
    'any, any, ...any': typed.referToSelf(self => (x, y, rest) => {
      var result = self(x, y);
      for (var i = 0; i < rest.length; i++) {
        result = self(result, rest[i]);
      }
      return result;
    })
  });
});

var name$c = 'conj';
var dependencies$b = ['typed'];
var createConj = /* #__PURE__ */factory(name$c, dependencies$b, _ref => {
  var {
    typed
  } = _ref;
  /**
   * Compute the complex conjugate of a complex value.
   * If `x = a+bi`, the complex conjugate of `x` is `a - bi`.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.conj(x)
   *
   * Examples:
   *
   *    math.conj(math.complex('2 + 3i'))  // returns Complex 2 - 3i
   *    math.conj(math.complex('2 - 3i'))  // returns Complex 2 + 3i
   *    math.conj(math.complex('-5.2i'))  // returns Complex 5.2i
   *
   * See also:
   *
   *    re, im, arg, abs
   *
   * @param {number | BigNumber | Complex | Array | Matrix | Unit} x
   *            A complex number or array with complex numbers
   * @return {number | BigNumber | Complex | Array | Matrix | Unit}
   *            The complex conjugate of x
   */
  return typed(name$c, {
    'number | BigNumber | Fraction': x => x,
    Complex: x => x.conjugate(),
    Unit: typed.referToSelf(self => x => new x.constructor(self(x.toNumeric()), x.formatUnits())),
    'Array | Matrix': typed.referToSelf(self => x => deepMap(x, self))
  });
});

var name$b = 'identity';
var dependencies$a = ['typed', 'config', 'matrix', 'BigNumber', 'DenseMatrix', 'SparseMatrix'];
var createIdentity = /* #__PURE__ */factory(name$b, dependencies$a, _ref => {
  var {
    typed,
    config,
    matrix,
    BigNumber,
    DenseMatrix,
    SparseMatrix
  } = _ref;
  /**
   * Create a 2-dimensional identity matrix with size m x n or n x n.
   * The matrix has ones on the diagonal and zeros elsewhere.
   *
   * Syntax:
   *
   *    math.identity(n)
   *    math.identity(n, format)
   *    math.identity(m, n)
   *    math.identity(m, n, format)
   *    math.identity([m, n])
   *    math.identity([m, n], format)
   *
   * Examples:
   *
   *    math.identity(3)                    // returns [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
   *    math.identity(3, 2)                 // returns [[1, 0], [0, 1], [0, 0]]
   *
   *    const A = [[1, 2, 3], [4, 5, 6]]
   *    math.identity(math.size(A))         // returns [[1, 0, 0], [0, 1, 0]]
   *
   * See also:
   *
   *    diag, ones, zeros, size, range
   *
   * @param {...number | Matrix | Array} size   The size for the matrix
   * @param {string} [format]                   The Matrix storage format
   *
   * @return {Matrix | Array | number} A matrix with ones on the diagonal.
   */
  return typed(name$b, {
    '': function _() {
      return config.matrix === 'Matrix' ? matrix([]) : [];
    },
    string: function string(format) {
      return matrix(format);
    },
    'number | BigNumber': function number__BigNumber(rows) {
      return _identity(rows, rows, config.matrix === 'Matrix' ? 'dense' : undefined);
    },
    'number | BigNumber, string': function number__BigNumber_string(rows, format) {
      return _identity(rows, rows, format);
    },
    'number | BigNumber, number | BigNumber': function number__BigNumber_number__BigNumber(rows, cols) {
      return _identity(rows, cols, config.matrix === 'Matrix' ? 'dense' : undefined);
    },
    'number | BigNumber, number | BigNumber, string': function number__BigNumber_number__BigNumber_string(rows, cols, format) {
      return _identity(rows, cols, format);
    },
    Array: function Array(size) {
      return _identityVector(size);
    },
    'Array, string': function Array_string(size, format) {
      return _identityVector(size, format);
    },
    Matrix: function Matrix(size) {
      return _identityVector(size.valueOf(), size.storage());
    },
    'Matrix, string': function Matrix_string(size, format) {
      return _identityVector(size.valueOf(), format);
    }
  });
  function _identityVector(size, format) {
    switch (size.length) {
      case 0:
        return format ? matrix(format) : [];
      case 1:
        return _identity(size[0], size[0], format);
      case 2:
        return _identity(size[0], size[1], format);
      default:
        throw new Error('Vector containing two values expected');
    }
  }

  /**
   * Create an identity matrix
   * @param {number | BigNumber} rows
   * @param {number | BigNumber} cols
   * @param {string} [format]
   * @returns {Matrix}
   * @private
   */
  function _identity(rows, cols, format) {
    // BigNumber constructor with the right precision
    var Big = isBigNumber(rows) || isBigNumber(cols) ? BigNumber : null;
    if (isBigNumber(rows)) rows = rows.toNumber();
    if (isBigNumber(cols)) cols = cols.toNumber();
    if (!isInteger(rows) || rows < 1) {
      throw new Error('Parameters in function identity must be positive integers');
    }
    if (!isInteger(cols) || cols < 1) {
      throw new Error('Parameters in function identity must be positive integers');
    }
    var one = Big ? new BigNumber(1) : 1;
    var defaultValue = Big ? new Big(0) : 0;
    var size = [rows, cols];

    // check we need to return a matrix
    if (format) {
      // create diagonal matrix (use optimized implementation for storage format)
      if (format === 'sparse') {
        return SparseMatrix.diagonal(size, one, 0, defaultValue);
      }
      if (format === 'dense') {
        return DenseMatrix.diagonal(size, one, 0, defaultValue);
      }
      throw new TypeError("Unknown matrix type \"".concat(format, "\""));
    }

    // create and resize array
    var res = resize([], size, defaultValue);
    // fill in ones on the diagonal
    var minimum = rows < cols ? rows : cols;
    // fill diagonal
    for (var d = 0; d < minimum; d++) {
      res[d][d] = one;
    }
    return res;
  }
});

function noBignumber() {
  throw new Error('No "bignumber" implementation available');
}
function noFraction() {
  throw new Error('No "fraction" implementation available');
}
function noMatrix() {
  throw new Error('No "matrix" implementation available');
}

var name$a = 'size';
var dependencies$9 = ['typed', 'config', '?matrix'];
var createSize = /* #__PURE__ */factory(name$a, dependencies$9, _ref => {
  var {
    typed,
    config,
    matrix
  } = _ref;
  /**
   * Calculate the size of a matrix or scalar.
   *
   * Syntax:
   *
   *     math.size(x)
   *
   * Examples:
   *
   *     math.size(2.3)                       // returns []
   *     math.size('hello world')             // returns [11]
   *
   *     const A = [[1, 2, 3], [4, 5, 6]]
   *     math.size(A)                         // returns [2, 3]
   *     math.size(math.range(1,6).toArray()) // returns [5]
   *
   * See also:
   *
   *     count, resize, squeeze, subset
   *
   * @param {boolean | number | Complex | Unit | string | Array | Matrix} x  A matrix
   * @return {Array | Matrix} A vector with size of `x`.
   */
  return typed(name$a, {
    Matrix: function Matrix(x) {
      return x.create(x.size(), 'number');
    },
    Array: arraySize,
    string: function string(x) {
      return config.matrix === 'Array' ? [x.length] : matrix([x.length], 'dense', 'number');
    },
    'number | Complex | BigNumber | Unit | boolean | null': function number__Complex__BigNumber__Unit__boolean__null(x) {
      // scalar
      return config.matrix === 'Array' ? [] : matrix ? matrix([], 'dense', 'number') : noMatrix();
    }
  });
});

/* eslint-disable no-loss-of-precision */

var name$9 = 'erf';
var dependencies$8 = ['typed'];
var createErf = /* #__PURE__ */factory(name$9, dependencies$8, _ref => {
  var {
    typed
  } = _ref;
  /**
   * Compute the erf function of a value using a rational Chebyshev
   * approximations for different intervals of x.
   *
   * This is a translation of W. J. Cody's Fortran implementation from 1987
   * ( https://www.netlib.org/specfun/erf ). See the AMS publication
   * "Rational Chebyshev Approximations for the Error Function" by W. J. Cody
   * for an explanation of this process.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.erf(x)
   *
   * Examples:
   *
   *    math.erf(0.2)    // returns 0.22270258921047847
   *    math.erf(-0.5)   // returns -0.5204998778130465
   *    math.erf(4)      // returns 0.9999999845827421
   *
   * See also:
   *    zeta
   *
   * @param {number | Array | Matrix} x   A real number
   * @return {number | Array | Matrix}    The erf of `x`
   */
  return typed('name', {
    number: function number(x) {
      var y = Math.abs(x);
      if (y >= MAX_NUM) {
        return sign$2(x);
      }
      if (y <= THRESH) {
        return sign$2(x) * erf1(y);
      }
      if (y <= 4.0) {
        return sign$2(x) * (1 - erfc2(y));
      }
      return sign$2(x) * (1 - erfc3(y));
    },
    'Array | Matrix': typed.referToSelf(self => n => deepMap(n, self))

    // TODO: For complex numbers, use the approximation for the Faddeeva function
    //  from "More Efficient Computation of the Complex Error Function" (AMS)
  });

  /**
   * Approximates the error function erf() for x <= 0.46875 using this function:
   *               n
   * erf(x) = x * sum (p_j * x^(2j)) / (q_j * x^(2j))
   *              j=0
   */
  function erf1(y) {
    var ysq = y * y;
    var xnum = P$1[0][4] * ysq;
    var xden = ysq;
    var i;
    for (i = 0; i < 3; i += 1) {
      xnum = (xnum + P$1[0][i]) * ysq;
      xden = (xden + Q[0][i]) * ysq;
    }
    return y * (xnum + P$1[0][3]) / (xden + Q[0][3]);
  }

  /**
   * Approximates the complement of the error function erfc() for
   * 0.46875 <= x <= 4.0 using this function:
   *                       n
   * erfc(x) = e^(-x^2) * sum (p_j * x^j) / (q_j * x^j)
   *                      j=0
   */
  function erfc2(y) {
    var xnum = P$1[1][8] * y;
    var xden = y;
    var i;
    for (i = 0; i < 7; i += 1) {
      xnum = (xnum + P$1[1][i]) * y;
      xden = (xden + Q[1][i]) * y;
    }
    var result = (xnum + P$1[1][7]) / (xden + Q[1][7]);
    var ysq = parseInt(y * 16) / 16;
    var del = (y - ysq) * (y + ysq);
    return Math.exp(-ysq * ysq) * Math.exp(-del) * result;
  }

  /**
   * Approximates the complement of the error function erfc() for x > 4.0 using
   * this function:
   *
   * erfc(x) = (e^(-x^2) / x) * [ 1/sqrt(pi) +
   *               n
   *    1/(x^2) * sum (p_j * x^(-2j)) / (q_j * x^(-2j)) ]
   *              j=0
   */
  function erfc3(y) {
    var ysq = 1 / (y * y);
    var xnum = P$1[2][5] * ysq;
    var xden = ysq;
    var i;
    for (i = 0; i < 4; i += 1) {
      xnum = (xnum + P$1[2][i]) * ysq;
      xden = (xden + Q[2][i]) * ysq;
    }
    var result = ysq * (xnum + P$1[2][4]) / (xden + Q[2][4]);
    result = (SQRPI - result) / y;
    ysq = parseInt(y * 16) / 16;
    var del = (y - ysq) * (y + ysq);
    return Math.exp(-ysq * ysq) * Math.exp(-del) * result;
  }
});

/**
 * Upper bound for the first approximation interval, 0 <= x <= THRESH
 * @constant
 */
var THRESH = 0.46875;

/**
 * Constant used by W. J. Cody's Fortran77 implementation to denote sqrt(pi)
 * @constant
 */
var SQRPI = 5.6418958354775628695e-1;

/**
 * Coefficients for each term of the numerator sum (p_j) for each approximation
 * interval (see W. J. Cody's paper for more details)
 * @constant
 */
var P$1 = [[3.16112374387056560e00, 1.13864154151050156e02, 3.77485237685302021e02, 3.20937758913846947e03, 1.85777706184603153e-1], [5.64188496988670089e-1, 8.88314979438837594e00, 6.61191906371416295e01, 2.98635138197400131e02, 8.81952221241769090e02, 1.71204761263407058e03, 2.05107837782607147e03, 1.23033935479799725e03, 2.15311535474403846e-8], [3.05326634961232344e-1, 3.60344899949804439e-1, 1.25781726111229246e-1, 1.60837851487422766e-2, 6.58749161529837803e-4, 1.63153871373020978e-2]];

/**
 * Coefficients for each term of the denominator sum (q_j) for each approximation
 * interval (see W. J. Cody's paper for more details)
 * @constant
 */
var Q = [[2.36012909523441209e01, 2.44024637934444173e02, 1.28261652607737228e03, 2.84423683343917062e03], [1.57449261107098347e01, 1.17693950891312499e02, 5.37181101862009858e02, 1.62138957456669019e03, 3.29079923573345963e03, 4.36261909014324716e03, 3.43936767414372164e03, 1.23033935480374942e03], [2.56852019228982242e00, 1.87295284992346047e00, 5.27905102951428412e-1, 6.05183413124413191e-2, 2.33520497626869185e-3]];

/**
 * Maximum/minimum safe numbers to input to erf() (in ES6+, this number is
 * Number.[MAX|MIN]_SAFE_INTEGER). erf() for all numbers beyond this limit will
 * return 1
 */
var MAX_NUM = Math.pow(2, 53);

var name$8 = 'numeric';
var dependencies$7 = ['number', '?bignumber', '?fraction'];
var createNumeric = /* #__PURE__ */factory(name$8, dependencies$7, _ref => {
  var {
    number: _number,
    bignumber,
    fraction
  } = _ref;
  var validInputTypes = {
    string: true,
    number: true,
    BigNumber: true,
    Fraction: true
  };

  // Load the conversion functions for each output type
  var validOutputTypes = {
    number: x => _number(x),
    BigNumber: bignumber ? x => bignumber(x) : noBignumber,
    bigint: x => BigInt(x),
    Fraction: fraction ? x => fraction(x) : noFraction
  };

  /**
   * Convert a numeric input to a specific numeric type: number, BigNumber, bigint, or Fraction.
   *
   * Syntax:
   *
   *    math.numeric(x)
   *    math.numeric(value, outputType)
   *
   * Examples:
   *
   *    math.numeric('4')                           // returns 4
   *    math.numeric('4', 'number')                 // returns 4
   *    math.numeric('4', 'bigint')                 // returns 4n
   *    math.numeric('4', 'BigNumber')              // returns BigNumber 4
   *    math.numeric('4', 'Fraction')               // returns Fraction 4
   *    math.numeric(4, 'Fraction')                 // returns Fraction 4
   *    math.numeric(math.fraction(2, 5), 'number') // returns 0.4
   *
   * See also:
   *
   *    number, fraction, bignumber, bigint, string, format
   *
   * @param {string | number | BigNumber | bigint | Fraction } value
   *              A numeric value or a string containing a numeric value
   * @param {string} outputType
   *              Desired numeric output type.
   *              Available values: 'number', 'BigNumber', or 'Fraction'
   * @return {number | BigNumber | bigint | Fraction}
   *              Returns an instance of the numeric in the requested type
   */
  return function numeric(value) {
    var outputType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'number';
    var check = arguments.length > 2 ? arguments[2] : undefined;
    if (check !== undefined) {
      throw new SyntaxError('numeric() takes one or two arguments');
    }
    var inputType = typeOf(value);
    if (!(inputType in validInputTypes)) {
      throw new TypeError('Cannot convert ' + value + ' of type "' + inputType + '"; valid input types are ' + Object.keys(validInputTypes).join(', '));
    }
    if (!(outputType in validOutputTypes)) {
      throw new TypeError('Cannot convert ' + value + ' to type "' + outputType + '"; valid output types are ' + Object.keys(validOutputTypes).join(', '));
    }
    if (outputType === inputType) {
      return value;
    } else {
      return validOutputTypes[outputType](value);
    }
  };
});

var name$7 = 'divideScalar';
var dependencies$6 = ['typed', 'numeric'];
var createDivideScalar = /* #__PURE__ */factory(name$7, dependencies$6, _ref => {
  var {
    typed,
    numeric
  } = _ref;
  /**
   * Divide two scalar values, `x / y`.
   * This function is meant for internal use: it is used by the public functions
   * `divide` and `inv`.
   *
   * This function does not support collections (Array or Matrix).
   *
   * @param  {number | BigNumber | bigint | Fraction | Complex | Unit} x   Numerator
   * @param  {number | BigNumber | bigint | Fraction | Complex} y          Denominator
   * @return {number | BigNumber | bigint | Fraction | Complex | Unit}     Quotient, `x / y`
   * @private
   */
  return typed(name$7, {
    'number, number': function number_number(x, y) {
      return x / y;
    },
    'Complex, Complex': function Complex_Complex(x, y) {
      return x.div(y);
    },
    'BigNumber, BigNumber': function BigNumber_BigNumber(x, y) {
      return x.div(y);
    },
    'bigint, bigint': function bigint_bigint(x, y) {
      return x / y;
    },
    'Fraction, Fraction': function Fraction_Fraction(x, y) {
      return x.div(y);
    },
    'Unit, number | Complex | Fraction | BigNumber | Unit': (x, y) => x.divide(y),
    'number | Fraction | Complex | BigNumber, Unit': (x, y) => y.divideInto(x)
  });
});

var name$6 = 'pow';
var dependencies$5 = ['typed', 'config', 'identity', 'multiply', 'matrix', 'inv', 'fraction', 'number', 'Complex'];
var createPow = /* #__PURE__ */factory(name$6, dependencies$5, _ref => {
  var {
    typed,
    config,
    identity,
    multiply,
    matrix,
    inv,
    number,
    fraction,
    Complex
  } = _ref;
  /**
   * Calculates the power of x to y, `x ^ y`.
   *
   * Matrix exponentiation is supported for square matrices `x` and integers `y`:
   * when `y` is nonnegative, `x` may be any square matrix; and when `y` is
   * negative, `x` must be invertible, and then this function returns
   * inv(x)^(-y).
   *
   * For cubic roots of negative numbers, the function returns the principal
   * root by default. In order to let the function return the real root,
   * math.js can be configured with `math.config({predictable: true})`.
   * To retrieve all cubic roots of a value, use `math.cbrt(x, true)`.
   *
   * Syntax:
   *
   *    math.pow(x, y)
   *
   * Examples:
   *
   *    math.pow(2, 3)               // returns number 8
   *
   *    const a = math.complex(2, 3)
   *    math.pow(a, 2)                // returns Complex -5 + 12i
   *
   *    const b = [[1, 2], [4, 3]]
   *    math.pow(b, 2)               // returns Array [[9, 8], [16, 17]]
   *
   *    const c = [[1, 2], [4, 3]]
   *    math.pow(c, -1)               // returns Array [[-0.6, 0.4], [0.8, -0.2]]
   *
   * See also:
   *
   *    multiply, sqrt, cbrt, nthRoot
   *
   * @param  {number | BigNumber | bigint | Complex | Unit | Array | Matrix} x  The base
   * @param  {number | BigNumber | bigint | Complex} y                          The exponent
   * @return {number | BigNumber | bigint | Complex | Array | Matrix} The value of `x` to the power `y`
   */
  return typed(name$6, {
    'number, number': _pow,
    'Complex, Complex': function Complex_Complex(x, y) {
      return x.pow(y);
    },
    'BigNumber, BigNumber': function BigNumber_BigNumber(x, y) {
      if (y.isInteger() || x >= 0 || config.predictable) {
        return x.pow(y);
      } else {
        return new Complex(x.toNumber(), 0).pow(y.toNumber(), 0);
      }
    },
    'bigint, bigint': (x, y) => x ** y,
    'Fraction, Fraction': function Fraction_Fraction(x, y) {
      var result = x.pow(y);
      if (result != null) {
        return result;
      }
      if (config.predictable) {
        throw new Error('Result of pow is non-rational and cannot be expressed as a fraction');
      } else {
        return _pow(x.valueOf(), y.valueOf());
      }
    },
    'Array, number': _powArray,
    'Array, BigNumber': function Array_BigNumber(x, y) {
      return _powArray(x, y.toNumber());
    },
    'Matrix, number': _powMatrix,
    'Matrix, BigNumber': function Matrix_BigNumber(x, y) {
      return _powMatrix(x, y.toNumber());
    },
    'Unit, number | BigNumber': function Unit_number__BigNumber(x, y) {
      return x.pow(y);
    }
  });

  /**
   * Calculates the power of x to y, x^y, for two numbers.
   * @param {number} x
   * @param {number} y
   * @return {number | Complex} res
   * @private
   */
  function _pow(x, y) {
    // Alternatively could define a 'realmode' config option or something, but
    // 'predictable' will work for now
    if (config.predictable && !isInteger(y) && x < 0) {
      // Check to see if y can be represented as a fraction
      try {
        var yFrac = fraction(y);
        var yNum = number(yFrac);
        if (y === yNum || Math.abs((y - yNum) / y) < 1e-14) {
          if (yFrac.d % 2n === 1n) {
            return (yFrac.n % 2n === 0n ? 1 : -1) * Math.pow(-x, y);
          }
        }
      } catch (ex) {
        // fraction() throws an error if y is Infinity, etc.
      }

      // Unable to express y as a fraction, so continue on
    }

    // **for predictable mode** x^Infinity === NaN if x < -1
    // N.B. this behavour is different from `Math.pow` which gives
    // (-2)^Infinity === Infinity
    if (config.predictable && (x < -1 && y === Infinity || x > -1 && x < 0 && y === -Infinity)) {
      return NaN;
    }
    if (isInteger(y) || x >= 0 || config.predictable) {
      return powNumber(x, y);
    } else {
      // TODO: the following infinity checks are duplicated from powNumber. Deduplicate this somehow

      // x^Infinity === 0 if -1 < x < 1
      // A real number 0 is returned instead of complex(0)
      if (x * x < 1 && y === Infinity || x * x > 1 && y === -Infinity) {
        return 0;
      }
      return new Complex(x, 0).pow(y, 0);
    }
  }

  /**
   * Calculate the power of a 2d array
   * @param {Array} x     must be a 2 dimensional, square matrix
   * @param {number} y    a integer value (positive if `x` is not invertible)
   * @returns {Array}
   * @private
   */
  function _powArray(x, y) {
    if (!isInteger(y)) {
      throw new TypeError('For A^b, b must be an integer (value is ' + y + ')');
    }
    // verify that A is a 2 dimensional square matrix
    var s = arraySize(x);
    if (s.length !== 2) {
      throw new Error('For A^b, A must be 2 dimensional (A has ' + s.length + ' dimensions)');
    }
    if (s[0] !== s[1]) {
      throw new Error('For A^b, A must be square (size is ' + s[0] + 'x' + s[1] + ')');
    }
    if (y < 0) {
      try {
        return _powArray(inv(x), -y);
      } catch (error) {
        if (error.message === 'Cannot calculate inverse, determinant is zero') {
          throw new TypeError('For A^b, when A is not invertible, b must be a positive integer (value is ' + y + ')');
        }
        throw error;
      }
    }
    var res = identity(s[0]).valueOf();
    var px = x;
    while (y >= 1) {
      if ((y & 1) === 1) {
        res = multiply(px, res);
      }
      y >>= 1;
      px = multiply(px, px);
    }
    return res;
  }

  /**
   * Calculate the power of a 2d matrix
   * @param {Matrix} x     must be a 2 dimensional, square matrix
   * @param {number} y    a positive, integer value
   * @returns {Matrix}
   * @private
   */
  function _powMatrix(x, y) {
    return matrix(_powArray(x.valueOf(), y));
  }
});

var name$5 = 'dot';
var dependencies$4 = ['typed', 'addScalar', 'multiplyScalar', 'conj', 'size'];
var createDot = /* #__PURE__ */factory(name$5, dependencies$4, _ref => {
  var {
    typed,
    addScalar,
    multiplyScalar,
    conj,
    size
  } = _ref;
  /**
   * Calculate the dot product of two vectors. The dot product of
   * `A = [a1, a2, ..., an]` and `B = [b1, b2, ..., bn]` is defined as:
   *
   *    dot(A, B) = conj(a1) * b1 + conj(a2) * b2 + ... + conj(an) * bn
   *
   * Syntax:
   *
   *    math.dot(x, y)
   *
   * Examples:
   *
   *    math.dot([2, 4, 1], [2, 2, 3])       // returns number 15
   *    math.multiply([2, 4, 1], [2, 2, 3])  // returns number 15
   *
   * See also:
   *
   *    multiply, cross
   *
   * @param  {Array | Matrix} x     First vector
   * @param  {Array | Matrix} y     Second vector
   * @return {number}               Returns the dot product of `x` and `y`
   */
  return typed(name$5, {
    'Array | DenseMatrix, Array | DenseMatrix': _denseDot,
    'SparseMatrix, SparseMatrix': _sparseDot
  });
  function _validateDim(x, y) {
    var xSize = _size(x);
    var ySize = _size(y);
    var xLen, yLen;
    if (xSize.length === 1) {
      xLen = xSize[0];
    } else if (xSize.length === 2 && xSize[1] === 1) {
      xLen = xSize[0];
    } else {
      throw new RangeError('Expected a column vector, instead got a matrix of size (' + xSize.join(', ') + ')');
    }
    if (ySize.length === 1) {
      yLen = ySize[0];
    } else if (ySize.length === 2 && ySize[1] === 1) {
      yLen = ySize[0];
    } else {
      throw new RangeError('Expected a column vector, instead got a matrix of size (' + ySize.join(', ') + ')');
    }
    if (xLen !== yLen) throw new RangeError('Vectors must have equal length (' + xLen + ' != ' + yLen + ')');
    if (xLen === 0) throw new RangeError('Cannot calculate the dot product of empty vectors');
    return xLen;
  }
  function _denseDot(a, b) {
    var N = _validateDim(a, b);
    var adata = isMatrix(a) ? a._data : a;
    var adt = isMatrix(a) ? a._datatype || a.getDataType() : undefined;
    var bdata = isMatrix(b) ? b._data : b;
    var bdt = isMatrix(b) ? b._datatype || b.getDataType() : undefined;

    // are these 2-dimensional column vectors? (as opposed to 1-dimensional vectors)
    var aIsColumn = _size(a).length === 2;
    var bIsColumn = _size(b).length === 2;
    var add = addScalar;
    var mul = multiplyScalar;

    // process data types
    if (adt && bdt && adt === bdt && typeof adt === 'string' && adt !== 'mixed') {
      var dt = adt;
      // find signatures that matches (dt, dt)
      add = typed.find(addScalar, [dt, dt]);
      mul = typed.find(multiplyScalar, [dt, dt]);
    }

    // both vectors 1-dimensional
    if (!aIsColumn && !bIsColumn) {
      var c = mul(conj(adata[0]), bdata[0]);
      for (var i = 1; i < N; i++) {
        c = add(c, mul(conj(adata[i]), bdata[i]));
      }
      return c;
    }

    // a is 1-dim, b is column
    if (!aIsColumn && bIsColumn) {
      var _c = mul(conj(adata[0]), bdata[0][0]);
      for (var _i = 1; _i < N; _i++) {
        _c = add(_c, mul(conj(adata[_i]), bdata[_i][0]));
      }
      return _c;
    }

    // a is column, b is 1-dim
    if (aIsColumn && !bIsColumn) {
      var _c2 = mul(conj(adata[0][0]), bdata[0]);
      for (var _i2 = 1; _i2 < N; _i2++) {
        _c2 = add(_c2, mul(conj(adata[_i2][0]), bdata[_i2]));
      }
      return _c2;
    }

    // both vectors are column
    if (aIsColumn && bIsColumn) {
      var _c3 = mul(conj(adata[0][0]), bdata[0][0]);
      for (var _i3 = 1; _i3 < N; _i3++) {
        _c3 = add(_c3, mul(conj(adata[_i3][0]), bdata[_i3][0]));
      }
      return _c3;
    }
  }
  function _sparseDot(x, y) {
    _validateDim(x, y);
    var xindex = x._index;
    var xvalues = x._values;
    var yindex = y._index;
    var yvalues = y._values;

    // TODO optimize add & mul using datatype
    var c = 0;
    var add = addScalar;
    var mul = multiplyScalar;
    var i = 0;
    var j = 0;
    while (i < xindex.length && j < yindex.length) {
      var I = xindex[i];
      var J = yindex[j];
      if (I < J) {
        i++;
        continue;
      }
      if (I > J) {
        j++;
        continue;
      }
      if (I === J) {
        c = add(c, mul(xvalues[i], yvalues[j]));
        i++;
        j++;
      }
    }
    return c;
  }

  // TODO remove this once #1771 is fixed
  function _size(x) {
    return isMatrix(x) ? x.size() : size(x);
  }
});

var name$4 = 'det';
var dependencies$3 = ['typed', 'matrix', 'subtractScalar', 'multiply', 'divideScalar', 'isZero', 'unaryMinus'];
var createDet = /* #__PURE__ */factory(name$4, dependencies$3, _ref => {
  var {
    typed,
    matrix,
    subtractScalar,
    multiply,
    divideScalar,
    isZero,
    unaryMinus
  } = _ref;
  /**
   * Calculate the determinant of a matrix.
   *
   * Syntax:
   *
   *    math.det(x)
   *
   * Examples:
   *
   *    math.det([[1, 2], [3, 4]]) // returns -2
   *
   *    const A = [
   *      [-2, 2, 3],
   *      [-1, 1, 3],
   *      [2, 0, -1]
   *    ]
   *    math.det(A) // returns 6
   *
   * See also:
   *
   *    inv
   *
   * @param {Array | Matrix} x  A matrix
   * @return {number} The determinant of `x`
   */
  return typed(name$4, {
    any: function any(x) {
      return clone$2(x);
    },
    'Array | Matrix': function det(x) {
      var size;
      if (isMatrix(x)) {
        size = x.size();
      } else if (Array.isArray(x)) {
        x = matrix(x);
        size = x.size();
      } else {
        // a scalar
        size = [];
      }
      switch (size.length) {
        case 0:
          // scalar
          return clone$2(x);
        case 1:
          // vector
          if (size[0] === 1) {
            return clone$2(x.valueOf()[0]);
          }
          if (size[0] === 0) {
            return 1; // det of an empty matrix is per definition 1
          } else {
            throw new RangeError('Matrix must be square ' + '(size: ' + format(size) + ')');
          }
        case 2:
          {
            // two-dimensional array
            var rows = size[0];
            var cols = size[1];
            if (rows === cols) {
              return _det(x.clone().valueOf(), rows);
            }
            if (cols === 0) {
              return 1; // det of an empty matrix is per definition 1
            } else {
              throw new RangeError('Matrix must be square ' + '(size: ' + format(size) + ')');
            }
          }
        default:
          // multi dimensional array
          throw new RangeError('Matrix must be two dimensional ' + '(size: ' + format(size) + ')');
      }
    }
  });

  /**
   * Calculate the determinant of a matrix
   * @param {Array[]} matrix  A square, two dimensional matrix
   * @param {number} rows     Number of rows of the matrix (zero-based)
   * @param {number} cols     Number of columns of the matrix (zero-based)
   * @returns {number} det
   * @private
   */
  function _det(matrix, rows, cols) {
    if (rows === 1) {
      // this is a 1 x 1 matrix
      return clone$2(matrix[0][0]);
    } else if (rows === 2) {
      // this is a 2 x 2 matrix
      // the determinant of [a11,a12;a21,a22] is det = a11*a22-a21*a12
      return subtractScalar(multiply(matrix[0][0], matrix[1][1]), multiply(matrix[1][0], matrix[0][1]));
    } else {
      // Bareiss algorithm
      // this algorithm have same complexity as LUP decomposition (O(n^3))
      // but it preserve precision of floating point more relative to the LUP decomposition
      var negated = false;
      var rowIndices = new Array(rows).fill(0).map((_, i) => i); // matrix index of row i
      for (var k = 0; k < rows; k++) {
        var k_ = rowIndices[k];
        if (isZero(matrix[k_][k])) {
          var _k = void 0;
          for (_k = k + 1; _k < rows; _k++) {
            if (!isZero(matrix[rowIndices[_k]][k])) {
              k_ = rowIndices[_k];
              rowIndices[_k] = rowIndices[k];
              rowIndices[k] = k_;
              negated = !negated;
              break;
            }
          }
          if (_k === rows) return matrix[k_][k]; // some zero of the type
        }
        var piv = matrix[k_][k];
        var piv_ = k === 0 ? 1 : matrix[rowIndices[k - 1]][k - 1];
        for (var i = k + 1; i < rows; i++) {
          var i_ = rowIndices[i];
          for (var j = k + 1; j < rows; j++) {
            matrix[i_][j] = divideScalar(subtractScalar(multiply(matrix[i_][j], piv), multiply(matrix[i_][k], matrix[k_][j])), piv_);
          }
        }
      }
      var det = matrix[rowIndices[rows - 1]][rows - 1];
      return negated ? unaryMinus(det) : det;
    }
  }
});

var name$3 = 'inv';
var dependencies$2 = ['typed', 'matrix', 'divideScalar', 'addScalar', 'multiply', 'unaryMinus', 'det', 'identity', 'abs'];
var createInv = /* #__PURE__ */factory(name$3, dependencies$2, _ref => {
  var {
    typed,
    matrix,
    divideScalar,
    addScalar,
    multiply,
    unaryMinus,
    det,
    identity,
    abs
  } = _ref;
  /**
   * Calculate the inverse of a square matrix.
   *
   * Syntax:
   *
   *     math.inv(x)
   *
   * Examples:
   *
   *     math.inv([[1, 2], [3, 4]])  // returns [[-2, 1], [1.5, -0.5]]
   *     math.inv(4)                 // returns 0.25
   *     1 / 4                       // returns 0.25
   *
   * See also:
   *
   *     det, transpose
   *
   * @param {number | Complex | Array | Matrix} x     Matrix to be inversed
   * @return {number | Complex | Array | Matrix} The inverse of `x`.
   */
  return typed(name$3, {
    'Array | Matrix': function Array__Matrix(x) {
      var size = isMatrix(x) ? x.size() : arraySize(x);
      switch (size.length) {
        case 1:
          // vector
          if (size[0] === 1) {
            if (isMatrix(x)) {
              return matrix([divideScalar(1, x.valueOf()[0])]);
            } else {
              return [divideScalar(1, x[0])];
            }
          } else {
            throw new RangeError('Matrix must be square ' + '(size: ' + format(size) + ')');
          }
        case 2:
          // two dimensional array
          {
            var rows = size[0];
            var cols = size[1];
            if (rows === cols) {
              if (isMatrix(x)) {
                return matrix(_inv(x.valueOf(), rows, cols), x.storage());
              } else {
                // return an Array
                return _inv(x, rows, cols);
              }
            } else {
              throw new RangeError('Matrix must be square ' + '(size: ' + format(size) + ')');
            }
          }
        default:
          // multi dimensional array
          throw new RangeError('Matrix must be two dimensional ' + '(size: ' + format(size) + ')');
      }
    },
    any: function any(x) {
      // scalar
      return divideScalar(1, x); // FIXME: create a BigNumber one when configured for bignumbers
    }
  });

  /**
   * Calculate the inverse of a square matrix
   * @param {Array[]} mat     A square matrix
   * @param {number} rows     Number of rows
   * @param {number} cols     Number of columns, must equal rows
   * @return {Array[]} inv    Inverse matrix
   * @private
   */
  function _inv(mat, rows, cols) {
    var r, s, f, value, temp;
    if (rows === 1) {
      // this is a 1 x 1 matrix
      value = mat[0][0];
      if (value === 0) {
        throw Error('Cannot calculate inverse, determinant is zero');
      }
      return [[divideScalar(1, value)]];
    } else if (rows === 2) {
      // this is a 2 x 2 matrix
      var d = det(mat);
      if (d === 0) {
        throw Error('Cannot calculate inverse, determinant is zero');
      }
      return [[divideScalar(mat[1][1], d), divideScalar(unaryMinus(mat[0][1]), d)], [divideScalar(unaryMinus(mat[1][0]), d), divideScalar(mat[0][0], d)]];
    } else {
      // this is a matrix of 3 x 3 or larger
      // calculate inverse using gauss-jordan elimination
      //      https://en.wikipedia.org/wiki/Gaussian_elimination
      //      http://mathworld.wolfram.com/MatrixInverse.html
      //      http://math.uww.edu/~mcfarlat/inverse.htm

      // make a copy of the matrix (only the arrays, not of the elements)
      var A = mat.concat();
      for (r = 0; r < rows; r++) {
        A[r] = A[r].concat();
      }

      // create an identity matrix which in the end will contain the
      // matrix inverse
      var B = identity(rows).valueOf();

      // loop over all columns, and perform row reductions
      for (var c = 0; c < cols; c++) {
        // Pivoting: Swap row c with row r, where row r contains the largest element A[r][c]
        var ABig = abs(A[c][c]);
        var rBig = c;
        r = c + 1;
        while (r < rows) {
          if (abs(A[r][c]) > ABig) {
            ABig = abs(A[r][c]);
            rBig = r;
          }
          r++;
        }
        if (ABig === 0) {
          throw Error('Cannot calculate inverse, determinant is zero');
        }
        r = rBig;
        if (r !== c) {
          temp = A[c];
          A[c] = A[r];
          A[r] = temp;
          temp = B[c];
          B[c] = B[r];
          B[r] = temp;
        }

        // eliminate non-zero values on the other rows at column c
        var Ac = A[c];
        var Bc = B[c];
        for (r = 0; r < rows; r++) {
          var Ar = A[r];
          var Br = B[r];
          if (r !== c) {
            // eliminate value at column c and row r
            if (Ar[c] !== 0) {
              f = divideScalar(unaryMinus(Ar[c]), Ac[c]);

              // add (f * row c) to row r to eliminate the value
              // at column c
              for (s = c; s < cols; s++) {
                Ar[s] = addScalar(Ar[s], multiply(f, Ac[s]));
              }
              for (s = 0; s < cols; s++) {
                Br[s] = addScalar(Br[s], multiply(f, Bc[s]));
              }
            }
          } else {
            // normalize value at Acc to 1,
            // divide each value on row r with the value at Acc
            f = Ac[c];
            for (s = c; s < cols; s++) {
              Ar[s] = divideScalar(Ar[s], f);
            }
            for (s = 0; s < cols; s++) {
              Br[s] = divideScalar(Br[s], f);
            }
          }
        }
      }
      return B;
    }
  }
});

var name$2 = 'gamma';
var dependencies$1 = ['typed', 'config', 'multiplyScalar', 'pow', 'BigNumber', 'Complex'];
var createGamma = /* #__PURE__ */factory(name$2, dependencies$1, _ref => {
  var {
    typed,
    config,
    multiplyScalar,
    pow,
    BigNumber: _BigNumber,
    Complex
  } = _ref;
  /**
   * Compute the gamma function of a value using Lanczos approximation for
   * small values, and an extended Stirling approximation for large values.
   *
   * To avoid confusion with the matrix Gamma function, this function does
   * not apply to matrices.
   *
   * Syntax:
   *
   *    math.gamma(n)
   *
   * Examples:
   *
   *    math.gamma(5)       // returns 24
   *    math.gamma(-0.5)    // returns -3.5449077018110335
   *    math.gamma(math.i)  // returns -0.15494982830180973 - 0.49801566811835596i
   *
   * See also:
   *
   *    combinations, factorial, permutations
   *
   * @param {number | BigNumber | Complex} n   A real or complex number
   * @return {number | BigNumber | Complex}    The gamma of `n`
   */

  function gammaComplex(n) {
    if (n.im === 0) {
      return gammaNumber(n.re);
    }

    // Lanczos approximation doesn't work well with real part lower than 0.5
    // So reflection formula is required
    if (n.re < 0.5) {
      // Euler's reflection formula
      // gamma(1-z) * gamma(z) = PI / sin(PI * z)
      // real part of Z should not be integer [sin(PI) == 0 -> 1/0 - undefined]
      // thanks to imperfect sin implementation sin(PI * n) != 0
      // we can safely use it anyway
      var _t = new Complex(1 - n.re, -n.im);
      var r = new Complex(Math.PI * n.re, Math.PI * n.im);
      return new Complex(Math.PI).div(r.sin()).div(gammaComplex(_t));
    }

    // Lanczos approximation
    // z -= 1
    n = new Complex(n.re - 1, n.im);

    // x = gammaPval[0]
    var x = new Complex(gammaP[0], 0);
    // for (i, gammaPval) in enumerate(gammaP):
    for (var i = 1; i < gammaP.length; ++i) {
      // x += gammaPval / (z + i)
      var gammaPval = new Complex(gammaP[i], 0);
      x = x.add(gammaPval.div(n.add(i)));
    }
    // t = z + gammaG + 0.5
    var t = new Complex(n.re + gammaG + 0.5, n.im);

    // y = sqrt(2 * pi) * t ** (z + 0.5) * exp(-t) * x
    var twoPiSqrt = Math.sqrt(2 * Math.PI);
    var tpow = t.pow(n.add(0.5));
    var expt = t.neg().exp();

    // y = [x] * [sqrt(2 * pi)] * [t ** (z + 0.5)] * [exp(-t)]
    return x.mul(twoPiSqrt).mul(tpow).mul(expt);
  }
  return typed(name$2, {
    number: gammaNumber,
    Complex: gammaComplex,
    BigNumber: function BigNumber(n) {
      if (n.isInteger()) {
        return n.isNegative() || n.isZero() ? new _BigNumber(Infinity) : bigFactorial(n.minus(1));
      }
      if (!n.isFinite()) {
        return new _BigNumber(n.isNegative() ? NaN : Infinity);
      }
      throw new Error('Integer BigNumber expected');
    }
  });

  /**
   * Calculate factorial for a BigNumber
   * @param {BigNumber} n
   * @returns {BigNumber} Returns the factorial of n
   */
  function bigFactorial(n) {
    if (n < 8) {
      return new _BigNumber([1, 1, 2, 6, 24, 120, 720, 5040][n]);
    }
    var precision = config.precision + (Math.log(n.toNumber()) | 0);
    var Big = _BigNumber.clone({
      precision
    });
    if (n % 2 === 1) {
      return n.times(bigFactorial(new _BigNumber(n - 1)));
    }
    var p = n;
    var prod = new Big(n);
    var sum = n.toNumber();
    while (p > 2) {
      p -= 2;
      sum += p;
      prod = prod.times(sum);
    }
    return new _BigNumber(prod.toPrecision(_BigNumber.precision));
  }
});

/* eslint-disable no-loss-of-precision */

var name$1 = 'lgamma';
var dependencies = ['Complex', 'typed'];
var createLgamma = /* #__PURE__ */factory(name$1, dependencies, _ref => {
  var {
    Complex,
    typed
  } = _ref;
  // Stirling series is non-convergent, we need to use the recurrence `lgamma(z) = lgamma(z+1) - log z` to get
  // sufficient accuracy.
  //
  // These two values are copied from Scipy implementation:
  // https://github.com/scipy/scipy/blob/v1.8.0/scipy/special/_loggamma.pxd#L37
  var SMALL_RE = 7;
  var SMALL_IM = 7;

  /**
   * The coefficients are B[2*n]/(2*n*(2*n - 1)) where B[2*n] is the (2*n)th Bernoulli number. See (1.1) in [1].
   *
   * If you cannot access the paper, can also get these values from the formula in [2].
   *
   *    1 /     12 = 0.00833333333333333333333333333333
   *    1 /    360 = 0.00277777777777777777777777777778
   * ...
   * 3617 / 133400 = 0.02955065359477124183006535947712
   */
  var coeffs = [-0.029550653594771242, 6.4102564102564102564e-3, -0.0019175269175269176, 8.4175084175084175084e-4, -5952380952380953e-19, 7.9365079365079365079e-4, -0.002777777777777778, 8.3333333333333333333e-2];

  /**
   * Logarithm of the gamma function for real, positive numbers and complex numbers,
   * using Lanczos approximation for numbers and Stirling series for complex numbers.
   *
   * Syntax:
   *
   *    math.lgamma(n)
   *
   * Examples:
   *
   *    math.lgamma(5)       // returns 3.178053830347945
   *    math.lgamma(0)       // returns Infinity
   *    math.lgamma(-0.5)    // returns NaN
   *    math.lgamma(math.i)  // returns -0.6509231993018536 - 1.8724366472624294i
   *
   * See also:
   *
   *    gamma
   *
   * @param {number | Complex} n   A real or complex number
   * @return {number | Complex}    The log gamma of `n`
   */
  return typed(name$1, {
    number: lgammaNumber,
    Complex: lgammaComplex,
    BigNumber: function BigNumber() {
      throw new Error("mathjs doesn't yet provide an implementation of the algorithm lgamma for BigNumber");
    }
  });
  function lgammaComplex(n) {
    var TWOPI = 6.2831853071795864769252842; // 2*pi
    var LOGPI = 1.1447298858494001741434262; // log(pi)

    var REFLECTION = 0.1;
    if (n.isNaN()) {
      return new Complex(NaN, NaN);
    } else if (n.im === 0) {
      return new Complex(lgammaNumber(n.re), 0);
    } else if (n.re >= SMALL_RE || Math.abs(n.im) >= SMALL_IM) {
      return lgammaStirling(n);
    } else if (n.re <= REFLECTION) {
      // Reflection formula. see Proposition 3.1 in [1]
      var tmp = copysign(TWOPI, n.im) * Math.floor(0.5 * n.re + 0.25);
      var a = n.mul(Math.PI).sin().log();
      var b = lgammaComplex(new Complex(1 - n.re, -n.im));
      return new Complex(LOGPI, tmp).sub(a).sub(b);
    } else if (n.im >= 0) {
      return lgammaRecurrence(n);
    } else {
      return lgammaRecurrence(n.conjugate()).conjugate();
    }
  }
  function lgammaStirling(z) {
    // formula ref in [2]
    // computation ref:
    // https://github.com/scipy/scipy/blob/v1.8.0/scipy/special/_loggamma.pxd#L101

    // left part

    // x (log(x) - 1) + 1/2 (log(2PI) - log(x))
    // => (x - 0.5) * log(x) - x + log(2PI) / 2
    var leftPart = z.sub(0.5).mul(z.log()).sub(z).add(lnSqrt2PI);

    // right part

    var rz = new Complex(1, 0).div(z);
    var rzz = rz.div(z);
    var a = coeffs[0];
    var b = coeffs[1];
    var r = 2 * rzz.re;
    var s = rzz.re * rzz.re + rzz.im * rzz.im;
    for (var i = 2; i < 8; i++) {
      var tmp = b;
      b = -s * a + coeffs[i];
      a = r * a + tmp;
    }
    var rightPart = rz.mul(rzz.mul(a).add(b));

    // plus left and right

    return leftPart.add(rightPart);
  }
  function lgammaRecurrence(z) {
    // computation ref:
    // https://github.com/scipy/scipy/blob/v1.8.0/scipy/special/_loggamma.pxd#L78

    var signflips = 0;
    var sb = 0;
    var shiftprod = z;
    z = z.add(1);
    while (z.re <= SMALL_RE) {
      shiftprod = shiftprod.mul(z);
      var nsb = shiftprod.im < 0 ? 1 : 0;
      if (nsb !== 0 && sb === 0) signflips++;
      sb = nsb;
      z = z.add(1);
    }
    return lgammaStirling(z).sub(shiftprod.log()).sub(new Complex(0, signflips * 2 * Math.PI * 1));
  }
});

var _nodeResolve_empty = {};

var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: _nodeResolve_empty
});

/**
 * THIS FILE IS AUTO-GENERATED
 * DON'T MAKE CHANGES HERE
 */
var BigNumber = /* #__PURE__ */createBigNumberClass({
  config: config$1
});
var Complex = /* #__PURE__ */createComplexClass({});
var Fraction = /* #__PURE__ */createFractionClass({});
var Matrix = /* #__PURE__ */createMatrixClass({});
var DenseMatrix = /* #__PURE__ */createDenseMatrixClass({
  Matrix
});
var typed = /* #__PURE__ */createTyped({
  BigNumber,
  Complex,
  DenseMatrix,
  Fraction
});
var abs$1 = /* #__PURE__ */createAbs({
  typed
});
var addScalar = /* #__PURE__ */createAddScalar({
  typed
});
var conj = /* #__PURE__ */createConj({
  typed
});
var equalScalar = /* #__PURE__ */createEqualScalar({
  config: config$1,
  typed
});
var erf = /* #__PURE__ */createErf({
  typed
});
var isZero = /* #__PURE__ */createIsZero({
  equalScalar,
  typed
});
var lgamma = /* #__PURE__ */createLgamma({
  Complex,
  typed
});
var multiplyScalar = /* #__PURE__ */createMultiplyScalar({
  typed
});
var number = /* #__PURE__ */createNumber({
  typed
});
var SparseMatrix = /* #__PURE__ */createSparseMatrixClass({
  Matrix,
  equalScalar,
  typed
});
var subtractScalar = /* #__PURE__ */createSubtractScalar({
  typed
});
var bignumber = /* #__PURE__ */createBignumber({
  BigNumber,
  typed
});
var matrix = /* #__PURE__ */createMatrix({
  DenseMatrix,
  Matrix,
  SparseMatrix,
  typed
});
var fraction = /* #__PURE__ */createFraction({
  Fraction,
  typed
});
var identity = /* #__PURE__ */createIdentity({
  BigNumber,
  DenseMatrix,
  SparseMatrix,
  config: config$1,
  matrix,
  typed
});
var numeric = /* #__PURE__ */createNumeric({
  bignumber,
  fraction,
  number
});
var size = /* #__PURE__ */createSize({
  matrix,
  config: config$1,
  typed
});
var unaryMinus = /* #__PURE__ */createUnaryMinus({
  typed
});
var divideScalar = /* #__PURE__ */createDivideScalar({
  numeric,
  typed
});
var dot = /* #__PURE__ */createDot({
  addScalar,
  conj,
  multiplyScalar,
  size,
  typed
});
var multiply = /* #__PURE__ */createMultiply({
  addScalar,
  dot,
  equalScalar,
  matrix,
  multiplyScalar,
  typed
});
var det = /* #__PURE__ */createDet({
  divideScalar,
  isZero,
  matrix,
  multiply,
  subtractScalar,
  typed,
  unaryMinus
});
var inv = /* #__PURE__ */createInv({
  abs: abs$1,
  addScalar,
  det,
  divideScalar,
  identity,
  matrix,
  multiply,
  typed,
  unaryMinus
});
var pow$1 = /* #__PURE__ */createPow({
  Complex,
  config: config$1,
  fraction,
  identity,
  inv,
  matrix,
  multiply,
  number,
  typed
});
var gamma = /* #__PURE__ */createGamma({
  BigNumber,
  Complex,
  config: config$1,
  multiplyScalar,
  pow: pow$1,
  typed
});

var TokenType;
(function (TokenType) {
    TokenType[TokenType["ENDMARKER"] = 0] = "ENDMARKER";
    TokenType[TokenType["NAME"] = 1] = "NAME";
    TokenType[TokenType["NUMBER"] = 2] = "NUMBER";
    TokenType[TokenType["BIGINT"] = 3] = "BIGINT";
    TokenType[TokenType["STRING"] = 4] = "STRING";
    TokenType[TokenType["NEWLINE"] = 5] = "NEWLINE";
    TokenType[TokenType["INDENT"] = 6] = "INDENT";
    TokenType[TokenType["DEDENT"] = 7] = "DEDENT";
    TokenType[TokenType["LPAR"] = 8] = "LPAR";
    TokenType[TokenType["RPAR"] = 9] = "RPAR";
    TokenType[TokenType["COLON"] = 10] = "COLON";
    TokenType[TokenType["DOUBLECOLON"] = 11] = "DOUBLECOLON";
    TokenType[TokenType["COMMA"] = 12] = "COMMA";
    TokenType[TokenType["PLUS"] = 13] = "PLUS";
    TokenType[TokenType["MINUS"] = 14] = "MINUS";
    TokenType[TokenType["BANG"] = 15] = "BANG";
    TokenType[TokenType["STAR"] = 16] = "STAR";
    TokenType[TokenType["SLASH"] = 17] = "SLASH";
    TokenType[TokenType["VBAR"] = 18] = "VBAR";
    TokenType[TokenType["AMPER"] = 19] = "AMPER";
    TokenType[TokenType["LESS"] = 20] = "LESS";
    TokenType[TokenType["GREATER"] = 21] = "GREATER";
    TokenType[TokenType["EQUAL"] = 22] = "EQUAL";
    TokenType[TokenType["PERCENT"] = 23] = "PERCENT";
    TokenType[TokenType["DOUBLEEQUAL"] = 24] = "DOUBLEEQUAL";
    TokenType[TokenType["NOTEQUAL"] = 25] = "NOTEQUAL";
    TokenType[TokenType["LESSEQUAL"] = 26] = "LESSEQUAL";
    TokenType[TokenType["GREATEREQUAL"] = 27] = "GREATEREQUAL";
    TokenType[TokenType["DOUBLESTAR"] = 28] = "DOUBLESTAR";
    TokenType[TokenType["COMPLEX"] = 29] = "COMPLEX";
    TokenType[TokenType["AND"] = 30] = "AND";
    TokenType[TokenType["OR"] = 31] = "OR";
    TokenType[TokenType["FOR"] = 32] = "FOR";
    TokenType[TokenType["WHILE"] = 33] = "WHILE";
    TokenType[TokenType["NONE"] = 34] = "NONE";
    TokenType[TokenType["TRUE"] = 35] = "TRUE";
    TokenType[TokenType["FALSE"] = 36] = "FALSE";
    TokenType[TokenType["IS"] = 37] = "IS";
    TokenType[TokenType["NOT"] = 38] = "NOT";
    TokenType[TokenType["ISNOT"] = 39] = "ISNOT";
    TokenType[TokenType["PASS"] = 40] = "PASS";
    TokenType[TokenType["DEF"] = 41] = "DEF";
    TokenType[TokenType["LAMBDA"] = 42] = "LAMBDA";
    TokenType[TokenType["FROM"] = 43] = "FROM";
    TokenType[TokenType["DOUBLESLASH"] = 44] = "DOUBLESLASH";
    TokenType[TokenType["BREAK"] = 45] = "BREAK";
    TokenType[TokenType["CONTINUE"] = 46] = "CONTINUE";
    TokenType[TokenType["RETURN"] = 47] = "RETURN";
    TokenType[TokenType["ASSERT"] = 48] = "ASSERT";
    TokenType[TokenType["IMPORT"] = 49] = "IMPORT";
    TokenType[TokenType["GLOBAL"] = 50] = "GLOBAL";
    TokenType[TokenType["NONLOCAL"] = 51] = "NONLOCAL";
    TokenType[TokenType["IF"] = 52] = "IF";
    TokenType[TokenType["ELSE"] = 53] = "ELSE";
    TokenType[TokenType["ELIF"] = 54] = "ELIF";
    TokenType[TokenType["IN"] = 55] = "IN";
    TokenType[TokenType["NOTIN"] = 56] = "NOTIN";
    TokenType[TokenType["RSQB"] = 57] = "RSQB";
    TokenType[TokenType["LSQB"] = 58] = "LSQB";
    TokenType[TokenType["ELLIPSIS"] = 59] = "ELLIPSIS";
    TokenType[TokenType["SEMI"] = 60] = "SEMI";
    TokenType[TokenType["DOT"] = 61] = "DOT";
    TokenType[TokenType["LBRACE"] = 62] = "LBRACE";
    TokenType[TokenType["RBRACE"] = 63] = "RBRACE";
    TokenType[TokenType["TILDE"] = 64] = "TILDE";
    TokenType[TokenType["CIRCUMFLEX"] = 65] = "CIRCUMFLEX";
    TokenType[TokenType["LEFTSHIFT"] = 66] = "LEFTSHIFT";
    TokenType[TokenType["RIGHTSHIFT"] = 67] = "RIGHTSHIFT";
    TokenType[TokenType["PLUSEQUAL"] = 68] = "PLUSEQUAL";
    TokenType[TokenType["MINEQUAL"] = 69] = "MINEQUAL";
    TokenType[TokenType["STAREQUAL"] = 70] = "STAREQUAL";
    TokenType[TokenType["SLASHEQUAL"] = 71] = "SLASHEQUAL";
    TokenType[TokenType["PERCENTEQUAL"] = 72] = "PERCENTEQUAL";
    TokenType[TokenType["AMPEREQUAL"] = 73] = "AMPEREQUAL";
    TokenType[TokenType["VBAREQUAL"] = 74] = "VBAREQUAL";
    TokenType[TokenType["CIRCUMFLEXEQUAL"] = 75] = "CIRCUMFLEXEQUAL";
    TokenType[TokenType["LEFTSHIFTEQUAL"] = 76] = "LEFTSHIFTEQUAL";
    TokenType[TokenType["RIGHTSHIFTEQUAL"] = 77] = "RIGHTSHIFTEQUAL";
    TokenType[TokenType["DOUBLESTAREQUAL"] = 78] = "DOUBLESTAREQUAL";
    TokenType[TokenType["DOUBLESLASHEQUAL"] = 79] = "DOUBLESLASHEQUAL";
    TokenType[TokenType["AT"] = 80] = "AT";
    TokenType[TokenType["ATEQUAL"] = 81] = "ATEQUAL";
    TokenType[TokenType["RARROW"] = 82] = "RARROW";
    TokenType[TokenType["COLONEQUAL"] = 83] = "COLONEQUAL";
    TokenType[TokenType["OP"] = 84] = "OP";
    TokenType[TokenType["AWAIT"] = 85] = "AWAIT";
    TokenType[TokenType["ASYNC"] = 86] = "ASYNC";
    TokenType[TokenType["TYPE_IGNORE"] = 87] = "TYPE_IGNORE";
    TokenType[TokenType["TYPE_COMMENT"] = 88] = "TYPE_COMMENT";
    TokenType[TokenType["YIELD"] = 89] = "YIELD";
    TokenType[TokenType["WITH"] = 90] = "WITH";
    TokenType[TokenType["DEL"] = 91] = "DEL";
    TokenType[TokenType["TRY"] = 92] = "TRY";
    TokenType[TokenType["EXCEPT"] = 93] = "EXCEPT";
    TokenType[TokenType["FINALLY"] = 94] = "FINALLY";
    TokenType[TokenType["RAISE"] = 95] = "RAISE";
})(TokenType || (TokenType = {}));

var InstrType;
(function (InstrType) {
    InstrType["RESET"] = "Reset";
    InstrType["WHILE"] = "While";
    InstrType["FOR"] = "For";
    InstrType["ASSIGNMENT"] = "Assignment";
    InstrType["ANN_ASSIGNMENT"] = "AnnAssignment";
    InstrType["APPLICATION"] = "Application";
    InstrType["UNARY_OP"] = "UnaryOperation";
    InstrType["BINARY_OP"] = "BinaryOperation";
    InstrType["BOOL_OP"] = "BoolOperation";
    InstrType["COMPARE"] = "Compare";
    InstrType["CALL"] = "Call";
    InstrType["RETURN"] = "Return";
    InstrType["BREAK"] = "Break";
    InstrType["CONTINUE"] = "Continue";
    InstrType["IF"] = "If";
    InstrType["FUNCTION_DEF"] = "FunctionDef";
    InstrType["LAMBDA"] = "Lambda";
    InstrType["MULTI_LAMBDA"] = "MultiLambda";
    InstrType["GROUPING"] = "Grouping";
    InstrType["LITERAL"] = "Literal";
    InstrType["VARIABLE"] = "Variable";
    InstrType["TERNARY"] = "Ternary";
    InstrType["PASS"] = "Pass";
    InstrType["ASSERT"] = "Assert";
    InstrType["IMPORT"] = "Import";
    InstrType["GLOBAL"] = "Global";
    InstrType["NONLOCAL"] = "NonLocal";
    InstrType["Program"] = "Program";
    InstrType["BRANCH"] = "Branch";
    InstrType["POP"] = "Pop";
    InstrType["ENVIRONMENT"] = "environment";
    InstrType["MARKER"] = "marker";
    InstrType["END_OF_FUNCTION_BODY"] = "EndOfFunctionBody";
})(InstrType || (InstrType = {}));

var ErrorType;
(function (ErrorType) {
    ErrorType["IMPORT"] = "Import";
    ErrorType["RUNTIME"] = "Runtime";
    ErrorType["SYNTAX"] = "Syntax";
    ErrorType["TYPE"] = "Type";
})(ErrorType || (ErrorType = {}));
var ErrorSeverity;
(function (ErrorSeverity) {
    ErrorSeverity["WARNING"] = "Warning";
    ErrorSeverity["ERROR"] = "Error";
})(ErrorSeverity || (ErrorSeverity = {}));
// Base error and shared helpers
const UNKNOWN_LOCATION = {
    start: {
        line: -1,
        column: -1,
    },
    end: {
        line: -1,
        column: -1,
    },
};
class RuntimeSourceError {
    constructor(node) {
        this.type = ErrorType.RUNTIME;
        this.severity = ErrorSeverity.ERROR;
        this.message = "Error";
        if (node) {
            this.location = {
                start: {
                    line: node.startToken.line,
                    column: node.startToken.col,
                },
                end: {
                    line: node.startToken.line,
                    column: node.startToken.col,
                },
            };
        }
        else {
            this.location = UNKNOWN_LOCATION;
        }
    }
    explain() {
        return "";
    }
    elaborate() {
        return this.explain();
    }
}
// Local copy to avoid circular import from utils
function typeTranslator(type) {
    switch (type) {
        case "bigint":
            return "int";
        case "number":
            return "float";
        case "boolean":
            return "bool";
        case "bool":
            return "bool";
        case "string":
            return "string";
        case "complex":
            return "complex";
        default:
            return "unknown";
    }
}
/* Searches backwards and forwards till it hits a newline */
function getFullLine(source, current) {
    let back = current;
    let forward = current;
    while (back > 0 && source[back] != "\n") {
        back--;
    }
    if (source[back] === "\n") {
        back++;
    }
    while (forward < source.length && source[forward] != "\n") {
        forward++;
    }
    const lineIndex = source.slice(0, back).split("\n").length;
    const fullLine = source.slice(back, forward);
    return { lineIndex, fullLine };
}
function createErrorIndicator(snippet, errorPos) {
    let indicator = "";
    for (let i = 0; i < snippet.length; i++) {
        indicator += i === errorPos ? "^" : "~";
    }
    return indicator;
}
// TODO: fix this class, since it doesn't seem to be functional
class MissingRequiredPositionalError extends RuntimeSourceError {
    constructor(source, node, functionName, params, args, variadic) {
        super(node);
        this.type = ErrorType.TYPE;
        this.functionName = functionName;
        let adverb = "exactly";
        if (variadic) {
            adverb = "at least";
        }
        const index = node.startToken.indexInSource;
        const { lineIndex, fullLine } = getFullLine(source, index);
        this.message = "TypeError at line " + lineIndex + "\n\n    " + fullLine + "\n";
        if (typeof params === "number") {
            this.missingParamCnt = params;
            this.missingParamName = "";
            const givenParamCnt = args.length;
            if (this.missingParamCnt === 1 || this.missingParamCnt === 0) ;
            const msg = `TypeError: ${this.functionName}() takes ${adverb} ${this.missingParamCnt} argument (${givenParamCnt} given)
Check the function definition of '${this.functionName}' and make sure to provide all required positional arguments in the correct order.`;
            this.message += msg;
        }
        else {
            this.missingParamCnt = params.length - args.length;
            const missingNames = [];
            for (let i = args.length; i < params.length; i++) {
                const param = params[i].name;
                missingNames.push("\'" + param + "\'");
            }
            this.missingParamName = this.joinWithCommasAndAnd(missingNames);
            const msg = `TypeError: ${this.functionName}() missing ${this.missingParamCnt} required positional argument(s): ${this.missingParamName}
You called ${this.functionName}() without providing the required positional argument ${this.missingParamName}. Make sure to pass all required arguments when calling ${this.functionName}.`;
            this.message += msg;
        }
    }
    joinWithCommasAndAnd(names) {
        if (names.length === 0) {
            return "";
        }
        else if (names.length === 1) {
            return names[0];
        }
        else if (names.length === 2) {
            return `${names[0]} and ${names[1]}`;
        }
        else {
            const last = names.pop();
            return `${names.join(", ")} and ${last}`;
        }
    }
}
class TooManyPositionalArgumentsError extends RuntimeSourceError {
    constructor(source, node, functionName, params, args, variadic) {
        super(node);
        this.type = ErrorType.TYPE;
        this.functionName = functionName;
        let adverb = "exactly";
        if (variadic) {
            adverb = "at most";
        }
        const index = node.startToken.indexInSource;
        const { lineIndex, fullLine } = getFullLine(source, index);
        this.message = "TypeError at line " + lineIndex + "\n\n    " + fullLine + "\n";
        if (typeof params === "number") {
            this.expectedCount = params;
            this.givenCount = args.length;
            if (this.expectedCount === 1 || this.expectedCount === 0) {
                this.message += `TypeError: ${this.functionName}() takes ${adverb} ${this.expectedCount} argument (${this.givenCount} given)`;
            }
            else {
                this.message += `TypeError: ${this.functionName}() takes ${adverb} ${this.expectedCount} arguments (${this.givenCount} given)`;
            }
        }
        else {
            this.expectedCount = params.length;
            this.givenCount = args.length;
            if (this.expectedCount === 1 || this.expectedCount === 0) {
                this.message += `TypeError: ${this.functionName}() takes ${this.expectedCount} positional argument but ${this.givenCount} were given`;
            }
            else {
                this.message += `TypeError: ${this.functionName}() takes ${this.expectedCount} positional arguments but ${this.givenCount} were given`;
            }
        }
        this.message += `\nRemove the extra argument(s) when calling '${this.functionName}', or check if the function definition accepts more arguments.`;
    }
}
class ValueError extends RuntimeSourceError {
    constructor(source, node, context, functionName) {
        super(node);
        this.type = ErrorType.TYPE;
        const index = node.startToken.indexInSource;
        const { lineIndex, fullLine } = getFullLine(source, index);
        const snippet = source.substring(node.startToken.indexInSource, node.endToken.indexInSource + node.endToken.lexeme.length);
        const hint = "ValueError: math domain error. ";
        const offset = fullLine.indexOf(snippet);
        const errorPos = 0;
        const indicator = createErrorIndicator(snippet, errorPos);
        const name = "ValueError";
        const suggestion = `Ensure that the input value(s) passed to '${functionName}' satisfy the mathematical requirements`;
        const msg = name +
            " at line " +
            lineIndex +
            "\n\n    " +
            fullLine +
            "\n    " +
            " ".repeat(offset) +
            indicator +
            "\n" +
            hint +
            suggestion;
        this.message = msg;
    }
}
let TypeError$1 = class TypeError extends RuntimeSourceError {
    constructor(source, node, context, originalType, targetType) {
        super(node);
        originalType = typeTranslator(originalType);
        this.type = ErrorType.TYPE;
        const index = node.startToken.indexInSource;
        const { lineIndex, fullLine } = getFullLine(source, index);
        const snippet = source.substring(node.startToken.indexInSource, node.endToken.indexInSource + node.endToken.lexeme.length);
        const hint = "TypeError: '" + originalType + "' cannot be interpreted as an '" + targetType + "'.";
        const offset = fullLine.indexOf(snippet);
        const adjustedOffset = offset >= 0 ? offset : 0;
        const errorPos = 0;
        const indicator = createErrorIndicator(snippet, errorPos);
        const name = "TypeError";
        const suggestion = " Make sure the value you are passing is compatible with the expected type.";
        const msg = name +
            " at line " +
            lineIndex +
            "\n\n    " +
            fullLine +
            "\n    " +
            " ".repeat(adjustedOffset) +
            indicator +
            "\n" +
            hint +
            suggestion;
        this.message = msg;
    }
};
class SublanguageError extends RuntimeSourceError {
    constructor(source, node, context, functionName, chapter, details) {
        super(node);
        this.type = ErrorType.TYPE;
        const index = node.startToken.indexInSource;
        const { lineIndex, fullLine } = getFullLine(source, index);
        const snippet = source.substring(node.startToken.indexInSource, node.endToken.indexInSource + node.endToken.lexeme.length);
        const offset = fullLine.indexOf(snippet);
        const errorPos = 0;
        const indicator = createErrorIndicator(snippet, errorPos);
        const name = "SublanguageError";
        const hint = "Feature not supported in Python §" + chapter + ". ";
        const suggestion = `The call to '${functionName}()' relies on behaviour that is valid in full Python but outside the Python §1 sublanguage${details ? ": " + details : ""}.`;
        this.message = `${name} at line ${lineIndex}\n\n ${fullLine}\n ${" ".repeat(offset)}${indicator}\n${hint}${suggestion}`;
    }
}
/*
    The offset is calculated as follows:
    Current position is one after real position of end of token: 1
*/
const MAGIC_OFFSET = 1;

function handleRuntimeError(context, error) {
    context.errors.push(error);
    throw error;
}

const displayOutput = async (context, output) => {
    if (context.streams.initialised) {
        await context.streams.stdout.writer.write(output);
    }
};
const receiveInput = async (context) => {
    if (context.streams.initialised) {
        const reader = context.streams.stdin.reader;
        const { value } = await reader.read();
        return value ?? "";
    }
    return "";
};

var builtInFuncs = [
	"_int",
	"_int_from_string",
	"abs",
	"error",
	"isinstance",
	"math_acos",
	"math_acosh",
	"math_asin",
	"math_asinh",
	"math_atan",
	"math_atan2",
	"math_atanh",
	"math_cos",
	"math_cosh",
	"math_degrees",
	"math_erf",
	"math_erfc",
	"char_at",
	"math_comb",
	"math_factorial",
	"math_gcd",
	"math_isqrt",
	"math_lcm",
	"math_perm",
	"math_ceil",
	"math_fabs",
	"math_floor",
	"math_fma",
	"math_fmod",
	"math_remainder",
	"math_trunc",
	"math_copysign",
	"math_isfinite",
	"math_isinf",
	"math_isnan",
	"math_ldexp",
	"math_nextafter",
	"math_ulp",
	"math_cbrt",
	"math_exp",
	"math_exp2",
	"math_expm1",
	"math_gamma",
	"math_lgamma",
	"math_log",
	"math_log10",
	"math_log1p",
	"math_log2",
	"math_pow",
	"math_radians",
	"math_sin",
	"math_sinh",
	"math_tan",
	"math_tanh",
	"math_sqrt",
	"max",
	"min",
	"random_random",
	"round",
	"time_time",
	"str",
	"print",
	"input"
];
var constants$1 = [
	"math_e",
	"math_inf",
	"math_nan",
	"math_pi",
	"math_tau"
];
var py_s1_constants = {
	builtInFuncs: builtInFuncs,
	constants: constants$1
};

function Validate(minArgs, maxArgs, functionName, strict) {
    return function (_target, _propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (args, source, command, context) {
            if (minArgs !== null && args.length < minArgs) {
                throw new MissingRequiredPositionalError(source, command, functionName, minArgs, args, strict);
            }
            if (maxArgs !== null && args.length > maxArgs) {
                throw new TooManyPositionalArgumentsError(source, command, functionName, maxArgs, args, strict);
            }
            return originalMethod.call(this, args, source, command, context);
        };
    };
}
class BuiltInFunctions {
    static _int(args, source, command, context) {
        if (args.length === 0) {
            return { type: "bigint", value: BigInt(0) };
        }
        const arg = args[0];
        if (args.length === 1) {
            if (arg.type === "number") {
                const truncated = Math.trunc(arg.value);
                return { type: "bigint", value: BigInt(truncated) };
            }
            if (arg.type === "bigint") {
                return { type: "bigint", value: arg.value };
            }
            if (arg.type === "string") {
                const str = arg.value.trim().replace(/_/g, "");
                if (!/^[+-]?\d+$/.test(str)) {
                    handleRuntimeError(context, new ValueError(source, command, context, "int"));
                }
                return { type: "bigint", value: BigInt(str) };
            }
        }
        else if (args.length === 2) {
            const baseArg = args[1];
            if (arg.type !== "string") {
                handleRuntimeError(context, new TypeError$1(source, command, context, arg.type, "string"));
            }
            if (baseArg.type !== "bigint") {
                handleRuntimeError(context, new TypeError$1(source, command, context, baseArg.type, "float' or 'int"));
            }
            let base = Number(baseArg.value);
            let str = arg.value.trim().replace(/_/g, "");
            const sign = str.startsWith("-") ? -1 : 1;
            if (str.startsWith("+") || str.startsWith("-")) {
                str = str.substring(1);
            }
            if (base === 0) {
                if (str.startsWith("0x") || str.startsWith("0X")) {
                    base = 16;
                    str = str.substring(2);
                }
                else if (str.startsWith("0o") || str.startsWith("0O")) {
                    base = 8;
                    str = str.substring(2);
                }
                else if (str.startsWith("0b") || str.startsWith("0B")) {
                    base = 2;
                    str = str.substring(2);
                }
                else {
                    base = 10;
                }
            }
            if (base < 2 || base > 36) {
                handleRuntimeError(context, new ValueError(source, command, context, "float' or 'int"));
            }
            const validChars = "0123456789abcdefghijklmnopqrstuvwxyz".substring(0, base);
            const regex = new RegExp(`^[${validChars}]+$`, "i");
            if (!regex.test(str)) {
                handleRuntimeError(context, new ValueError(source, command, context, "float' or 'int"));
            }
            const parsed = parseInt(str, base);
            return { type: "bigint", value: BigInt(sign * parsed) };
        }
        handleRuntimeError(context, new TypeError$1(source, command, context, arg.type, "string, a bytes-like object or a real number"));
    }
    static _int_from_string(args, source, command, context) {
        const strVal = args[0];
        if (strVal.type !== "string") {
            handleRuntimeError(context, new TypeError$1(source, command, context, args[0].type, "string"));
        }
        let base = 10;
        if (args.length === 2) {
            // The second argument must be either a bigint or a number (it will be converted to a number for uniform processing).
            const baseVal = args[1];
            if (baseVal.type === "bigint") {
                base = Number(baseVal.value);
            }
            else {
                handleRuntimeError(context, new TypeError$1(source, command, context, args[1].type, "float' or 'int"));
            }
        }
        // base should be in between 2 and 36
        if (base < 2 || base > 36) {
            handleRuntimeError(context, new ValueError(source, command, context, "_int_from_string"));
        }
        let str = strVal.value;
        str = str.trim();
        str = str.replace(/_/g, "");
        // Parse the sign (determine if the value is positive or negative)
        let sign = BigInt(1);
        if (str.startsWith("+")) {
            str = str.slice(1);
        }
        else if (str.startsWith("-")) {
            sign = BigInt(-1);
            str = str.slice(1);
        }
        // The remaining portion must consist of valid characters for the specified base.
        const parsedNumber = parseInt(str, base);
        if (isNaN(parsedNumber)) {
            handleRuntimeError(context, new ValueError(source, command, context, "_int_from_string"));
        }
        const result = sign * BigInt(parsedNumber);
        return { type: "bigint", value: result };
    }
    static abs(args, source, command, context) {
        const x = args[0];
        switch (x.type) {
            case "bigint": {
                const intVal = x.value;
                const result = intVal < 0 ? -intVal : intVal;
                return { type: "bigint", value: result };
            }
            case "number": {
                return { type: "number", value: Math.abs(x.value) };
            }
            case "complex": {
                // Calculate the modulus (absolute value) of a complex number.
                const real = x.value.real;
                const imag = x.value.imag;
                const modulus = Math.sqrt(real * real + imag * imag);
                return { type: "number", value: modulus };
            }
            default:
                handleRuntimeError(context, new TypeError$1(source, command, context, args[0].type, "float', 'int' or 'complex"));
        }
    }
    static toStr(val) {
        return toPythonString(val);
    }
    static error(args, _source, _command, _context) {
        const output = "Error: " + args.map(arg => BuiltInFunctions.toStr(arg)).join(" ") + "\n";
        throw new Error(output);
    }
    static isinstance(args, source, command, context) {
        const obj = args[0];
        const classinfo = args[1];
        let expectedType;
        if (classinfo.type === "string") {
            switch (classinfo.value) {
                case "int":
                    expectedType = "bigint";
                    if (obj.type === "bool") {
                        handleRuntimeError(context, new SublanguageError(source, command, context, "isinstance", "1", "Python §1 does not treat bool as a subtype of int"));
                    }
                    break;
                case "float":
                    expectedType = "number";
                    break;
                case "string":
                    expectedType = "string";
                    break;
                case "bool":
                    expectedType = "bool";
                    break;
                case "complex":
                    expectedType = "complex";
                    break;
                case "NoneType":
                    expectedType = "NoneType";
                    break;
                default:
                    handleRuntimeError(context, new ValueError(source, command, context, "isinstance"));
            }
        }
        else {
            handleRuntimeError(context, new TypeError$1(source, command, context, args[0].type, "string"));
        }
        const result = obj.type === expectedType;
        return { type: "bool", value: result };
    }
    static math_acos(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        let num;
        if (x.type === "number") {
            num = x.value;
        }
        else {
            num = Number(x.value);
        }
        if (num < -1 || num > 1) {
            handleRuntimeError(context, new ValueError(source, command, context, "math_acos"));
        }
        const result = Math.acos(num);
        return { type: "number", value: result };
    }
    static math_acosh(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        let num;
        if (x.type === "number") {
            num = x.value;
        }
        else {
            num = Number(x.value);
        }
        if (num < 1) {
            handleRuntimeError(context, new ValueError(source, command, context, "math_acosh"));
        }
        const result = Math.acosh(num);
        return { type: "number", value: result };
    }
    static math_asin(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        let num;
        if (x.type === "number") {
            num = x.value;
        }
        else {
            num = Number(x.value);
        }
        if (num < -1 || num > 1) {
            handleRuntimeError(context, new ValueError(source, command, context, "math_asin"));
        }
        const result = Math.asin(num);
        return { type: "number", value: result };
    }
    static math_asinh(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        let num;
        if (x.type === "number") {
            num = x.value;
        }
        else {
            num = Number(x.value);
        }
        const result = Math.asinh(num);
        return { type: "number", value: result };
    }
    static math_atan(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        let num;
        if (x.type === "number") {
            num = x.value;
        }
        else {
            num = Number(x.value);
        }
        const result = Math.atan(num);
        return { type: "number", value: result };
    }
    static math_atan2(args, source, command, context) {
        const y = args[0];
        const x = args[1];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        else if (y.type !== "number" && y.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, y.type, "float' or 'int"));
        }
        let yNum, xNum;
        if (y.type === "number") {
            yNum = y.value;
        }
        else {
            yNum = Number(y.value);
        }
        if (x.type === "number") {
            xNum = x.value;
        }
        else {
            xNum = Number(x.value);
        }
        const result = Math.atan2(yNum, xNum);
        return { type: "number", value: result };
    }
    static math_atanh(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        let num;
        if (x.type === "number") {
            num = x.value;
        }
        else {
            num = Number(x.value);
        }
        if (num <= -1 || num >= 1) {
            handleRuntimeError(context, new ValueError(source, command, context, "math_atanh"));
        }
        const result = Math.atanh(num);
        return { type: "number", value: result };
    }
    static math_cos(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        let num;
        if (x.type === "number") {
            num = x.value;
        }
        else {
            num = Number(x.value);
        }
        const result = Math.cos(num);
        return { type: "number", value: result };
    }
    static math_cosh(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        let num;
        if (x.type === "number") {
            num = x.value;
        }
        else {
            num = Number(x.value);
        }
        const result = Math.cosh(num);
        return { type: "number", value: result };
    }
    static math_degrees(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        let num;
        if (x.type === "number") {
            num = x.value;
        }
        else {
            num = Number(x.value);
        }
        const result = (num * 180) / Math.PI;
        return { type: "number", value: result };
    }
    static math_erf(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        let num;
        if (x.type === "number") {
            num = x.value;
        }
        else {
            num = Number(x.value);
        }
        const erfnum = erf(num);
        return { type: "number", value: erfnum };
    }
    static math_erfc(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        const num = BuiltInFunctions.math_erf(args, source, command, context);
        if (num.type !== "number") {
            handleRuntimeError(context, new TypeError$1(source, command, context, num.type, "float' or 'int"));
        }
        const erfc = 1 - num.value;
        return { type: "number", value: erfc };
    }
    static char_at(args, source, command, context) {
        const s = args[0];
        const i = args[1];
        if (s.type !== "string") {
            handleRuntimeError(context, new TypeError$1(source, command, context, s.type, "string"));
        }
        if (i.type !== "number" && i.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, i.type, "float' or 'int"));
        }
        const index = i.value;
        return { type: "string", value: s.value[Number(index)] };
    }
    static math_comb(args, source, command, context) {
        const n = args[0];
        const k = args[1];
        if (n.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, n.type, "int"));
        }
        else if (k.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, k.type, "int"));
        }
        const nVal = BigInt(n.value);
        const kVal = BigInt(k.value);
        if (nVal < 0 || kVal < 0) {
            handleRuntimeError(context, new ValueError(source, command, context, "math_comb"));
        }
        if (kVal > nVal) {
            return { type: "bigint", value: BigInt(0) };
        }
        let result = BigInt(1);
        const kk = kVal > nVal - kVal ? nVal - kVal : kVal;
        for (let i = BigInt(0); i < kk; i++) {
            result = (result * (nVal - i)) / (i + BigInt(1));
        }
        return { type: "bigint", value: result };
    }
    static math_factorial(args, source, command, context) {
        const n = args[0];
        if (n.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, n.type, "int"));
        }
        const nVal = BigInt(n.value);
        if (nVal < 0) {
            handleRuntimeError(context, new ValueError(source, command, context, "math_factorial"));
        }
        // 0! = 1
        if (nVal === BigInt(0)) {
            return { type: "bigint", value: BigInt(1) };
        }
        let result = BigInt(1);
        for (let i = BigInt(1); i <= nVal; i++) {
            result *= i;
        }
        return { type: "bigint", value: result };
    }
    static math_gcd(args, source, command, context) {
        if (args.length === 0) {
            return { type: "bigint", value: BigInt(0) };
        }
        const values = args.map(v => {
            if (v.type !== "bigint") {
                handleRuntimeError(context, new TypeError$1(source, command, context, v.type, "int"));
            }
            return BigInt(v.value);
        });
        const allZero = values.every(val => val === BigInt(0));
        if (allZero) {
            return { type: "bigint", value: BigInt(0) };
        }
        let currentGcd = values[0] < 0 ? -values[0] : values[0];
        for (let i = 1; i < values.length; i++) {
            currentGcd = BuiltInFunctions.gcdOfTwo(currentGcd, values[i] < 0 ? -values[i] : values[i]);
            if (currentGcd === BigInt(1)) {
                break;
            }
        }
        return { type: "bigint", value: currentGcd };
    }
    static gcdOfTwo(a, b) {
        let x = a;
        let y = b;
        while (y !== BigInt(0)) {
            const temp = x % y;
            x = y;
            y = temp;
        }
        return x < 0 ? -x : x;
    }
    static math_isqrt(args, source, command, context) {
        const nValObj = args[0];
        if (nValObj.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, nValObj.type, "int"));
        }
        const n = nValObj.value;
        if (n < 0) {
            handleRuntimeError(context, new ValueError(source, command, context, "math_isqrt"));
        }
        if (n < 2) {
            return { type: "bigint", value: n };
        }
        let low = BigInt(1);
        let high = n;
        while (low < high) {
            const mid = (low + high + BigInt(1)) >> BigInt(1);
            const sq = mid * mid;
            if (sq <= n) {
                low = mid;
            }
            else {
                high = mid - BigInt(1);
            }
        }
        return { type: "bigint", value: low };
    }
    static math_lcm(args, source, command, context) {
        if (args.length === 0) {
            return { type: "bigint", value: BigInt(1) };
        }
        const values = args.map(val => {
            if (val.type !== "bigint") {
                handleRuntimeError(context, new TypeError$1(source, command, context, val.type, "int"));
            }
            return BigInt(val.value);
        });
        if (values.some(v => v === BigInt(0))) {
            return { type: "bigint", value: BigInt(0) };
        }
        let currentLcm = BuiltInFunctions.absBigInt(values[0]);
        for (let i = 1; i < values.length; i++) {
            currentLcm = BuiltInFunctions.lcmOfTwo(currentLcm, BuiltInFunctions.absBigInt(values[i]));
            if (currentLcm === BigInt(0)) {
                break;
            }
        }
        return { type: "bigint", value: currentLcm };
    }
    static lcmOfTwo(a, b) {
        const gcdVal = BuiltInFunctions.gcdOfTwo(a, b);
        return BigInt((a / gcdVal) * b);
    }
    static absBigInt(x) {
        return x < 0 ? -x : x;
    }
    static math_perm(args, source, command, context) {
        const nValObj = args[0];
        if (nValObj.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, nValObj.type, "int"));
        }
        const n = BigInt(nValObj.value);
        let k = n;
        if (args.length === 2) {
            const kValObj = args[1];
            if (kValObj.type === "none") {
                k = n;
            }
            else if (kValObj.type === "bigint") {
                k = BigInt(kValObj.value);
            }
            else {
                handleRuntimeError(context, new TypeError$1(source, command, context, kValObj.type, "int' or 'None"));
            }
        }
        if (n < 0 || k < 0) {
            handleRuntimeError(context, new ValueError(source, command, context, "math_perm"));
        }
        if (k > n) {
            return { type: "bigint", value: BigInt(0) };
        }
        let result = BigInt(1);
        for (let i = BigInt(0); i < k; i++) {
            result *= n - i;
        }
        return { type: "bigint", value: result };
    }
    static math_ceil(args, source, command, context) {
        const x = args[0];
        if (x.type === "bigint") {
            return x;
        }
        if (x.type === "number") {
            const numVal = x.value;
            const ceiled = BigInt(Math.ceil(numVal));
            return { type: "bigint", value: ceiled };
        }
        handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
    }
    static math_fabs(args, source, command, context) {
        const x = args[0];
        if (x.type === "bigint") {
            const bigVal = BigInt(x.value);
            const absVal = bigVal < 0 ? -Number(bigVal) : Number(bigVal);
            return { type: "number", value: absVal };
        }
        if (x.type === "number") {
            const numVal = x.value;
            if (typeof numVal !== "number") {
                handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
            }
            const absVal = Math.abs(numVal);
            return { type: "number", value: absVal };
        }
        handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
    }
    static math_floor(args, source, command, context) {
        const x = args[0];
        if (x.type === "bigint") {
            return x;
        }
        if (x.type === "number") {
            const numVal = x.value;
            if (typeof numVal !== "number") {
                handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
            }
            const floored = BigInt(Math.floor(numVal));
            return { type: "bigint", value: floored };
        }
        handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
    }
    // Computes the product of a and b along with the rounding error using Dekker's algorithm.
    static twoProd(a, b) {
        const prod = a * b;
        const c = 134217729; // 2^27 + 1
        const a_hi = a * c - (a * c - a);
        const a_lo = a - a_hi;
        const b_hi = b * c - (b * c - b);
        const b_lo = b - b_hi;
        const err = a_lo * b_lo - (prod - a_hi * b_hi - a_lo * b_hi - a_hi * b_lo);
        return { prod, err };
    }
    // Computes the sum of a and b along with the rounding error using Fast TwoSum.
    static twoSum(a, b) {
        const sum = a + b;
        const v = sum - a;
        const err = a - (sum - v) + (b - v);
        return { sum, err };
    }
    // Performs a fused multiply-add operation: computes (x * y) + z with a single rounding.
    static fusedMultiplyAdd(x, y, z) {
        const { prod, err: prodErr } = BuiltInFunctions.twoProd(x, y);
        const { sum, err: sumErr } = BuiltInFunctions.twoSum(prod, z);
        const result = sum + (prodErr + sumErr);
        return result;
    }
    static toNumber(val, source, command, context) {
        if (val.type === "bigint") {
            return Number(val.value);
        }
        else if (val.type === "number") {
            return val.value;
        }
        else {
            handleRuntimeError(context, new TypeError$1(source, command, context, val.type, "float' or 'int"));
        }
    }
    static math_fma(args, source, command, context) {
        const xVal = BuiltInFunctions.toNumber(args[0], source, command, context);
        const yVal = BuiltInFunctions.toNumber(args[1], source, command, context);
        const zVal = BuiltInFunctions.toNumber(args[2], source, command, context);
        // Special-case handling: According to the IEEE 754 standard, fma(0, inf, nan)
        // and fma(inf, 0, nan) should return NaN.
        if (isNaN(xVal) || isNaN(yVal) || isNaN(zVal)) {
            return { type: "number", value: NaN };
        }
        if (xVal === 0 && !isFinite(yVal) && isNaN(zVal)) {
            return { type: "number", value: NaN };
        }
        if (yVal === 0 && !isFinite(xVal) && isNaN(zVal)) {
            return { type: "number", value: NaN };
        }
        const result = BuiltInFunctions.fusedMultiplyAdd(xVal, yVal, zVal);
        return { type: "number", value: result };
    }
    static math_fmod(args, source, command, context) {
        // Convert inputs to numbers
        const xVal = BuiltInFunctions.toNumber(args[0], source, command, context);
        const yVal = BuiltInFunctions.toNumber(args[1], source, command, context);
        // Divisor cannot be zero
        if (yVal === 0) {
            handleRuntimeError(context, new ValueError(source, command, context, "math_fmod"));
        }
        // JavaScript's % operator behaves similarly to C's fmod
        // in that the sign of the result is the same as the sign of x.
        // For corner cases (NaN, Infinity), JavaScript remainder
        // yields results consistent with typical C library fmod behavior.
        const remainder = xVal % yVal;
        return { type: "number", value: remainder };
    }
    static roundToEven(num) {
        const floorVal = Math.floor(num);
        const ceilVal = Math.ceil(num);
        const diffFloor = num - floorVal;
        const diffCeil = ceilVal - num;
        if (diffFloor < diffCeil) {
            return floorVal;
        }
        else if (diffCeil < diffFloor) {
            return ceilVal;
        }
        else {
            return floorVal % 2 === 0 ? floorVal : ceilVal;
        }
    }
    static math_remainder(args, source, command, context) {
        const x = args[0];
        const y = args[1];
        let xValue;
        if (x.type === "bigint") {
            xValue = Number(x.value);
        }
        else if (x.type === "number") {
            xValue = x.value;
        }
        else {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        let yValue;
        if (y.type === "bigint") {
            yValue = Number(y.value);
        }
        else if (y.type === "number") {
            yValue = y.value;
        }
        else {
            handleRuntimeError(context, new TypeError$1(source, command, context, y.type, "float' or 'int"));
        }
        if (yValue === 0) {
            handleRuntimeError(context, new ValueError(source, command, context, "math_remainder"));
        }
        const quotient = xValue / yValue;
        const n = BuiltInFunctions.roundToEven(quotient);
        const remainder = xValue - n * yValue;
        return { type: "number", value: remainder };
    }
    static math_trunc(args, source, command, context) {
        const x = args[0];
        if (x.type === "bigint") {
            return x;
        }
        if (x.type === "number") {
            const numVal = x.value;
            if (typeof numVal !== "number") {
                handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
            }
            let truncated;
            if (numVal === 0) {
                truncated = 0;
            }
            else if (numVal < 0) {
                truncated = Math.ceil(numVal);
            }
            else {
                truncated = Math.floor(numVal);
            }
            return { type: "bigint", value: BigInt(truncated) };
        }
        handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
    }
    static math_copysign(args, source, command, context) {
        const [x, y] = args;
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        else if (y.type !== "number" && y.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, y.type, "float' or 'int"));
        }
        const xVal = Number(x.value);
        const yVal = Number(y.value);
        const absVal = Math.abs(xVal);
        const isNegative = yVal < 0 || Object.is(yVal, -0);
        const result = isNegative ? -absVal : absVal;
        return { type: "number", value: Number(result) };
    }
    static math_isfinite(args, source, command, context) {
        const xValObj = args[0];
        if (xValObj.type !== "number" && xValObj.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, xValObj.type, "float' or 'int"));
        }
        const x = Number(xValObj.value);
        const result = Number.isFinite(x);
        return { type: "bool", value: result };
    }
    static math_isinf(args, source, command, context) {
        const xValObj = args[0];
        if (xValObj.type !== "number" && xValObj.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, xValObj.type, "float' or 'int"));
        }
        const x = Number(xValObj.value);
        const result = x === Infinity || x === -Infinity;
        return { type: "bool", value: result };
    }
    static math_isnan(args, source, command, context) {
        const xValObj = args[0];
        if (xValObj.type !== "number" && xValObj.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, xValObj.type, "float' or 'int"));
        }
        const x = Number(xValObj.value);
        const result = Number.isNaN(x);
        return { type: "bool", value: result };
    }
    static math_ldexp(args, source, command, context) {
        const xVal = BuiltInFunctions.toNumber(args[0], source, command, context);
        if (args[1].type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, args[1].type, "int"));
        }
        const expVal = args[1].value;
        // Perform x * 2^expVal
        // In JavaScript, 2**expVal may overflow or underflow, yielding Infinity or 0 respectively.
        // That behavior parallels typical C library rules for ldexp.
        const result = xVal * Math.pow(2, Number(expVal));
        return { type: "number", value: result };
    }
    static math_nextafter(_args, _source, _command, _context) {
        // TODO: Implement math_nextafter using proper bit-level manipulation and handling special cases (NaN, Infinity, steps, etc.)
        throw new Error("math_nextafter not implemented");
    }
    static math_ulp(_args, _source, _command, _context) {
        // TODO: Implement math_ulp to return the unit in the last place (ULP) of the given floating-point number.
        throw new Error("math_ulp not implemented");
    }
    static math_cbrt(args, source, command, context) {
        const xVal = args[0];
        let x;
        if (xVal.type !== "number") {
            if (xVal.type === "bigint") {
                x = Number(xVal.value);
            }
            else {
                handleRuntimeError(context, new TypeError$1(source, command, context, xVal.type, "float' or 'int"));
            }
        }
        else {
            x = xVal.value;
        }
        const result = Math.cbrt(x);
        return { type: "number", value: result };
    }
    static math_exp(args, source, command, context) {
        const xVal = args[0];
        let x;
        if (xVal.type !== "number") {
            if (xVal.type === "bigint") {
                x = Number(xVal.value);
            }
            else {
                handleRuntimeError(context, new TypeError$1(source, command, context, xVal.type, "float' or 'int"));
            }
        }
        else {
            x = xVal.value;
        }
        const result = Math.exp(x);
        return { type: "number", value: result };
    }
    static math_exp2(args, source, command, context) {
        const xVal = args[0];
        let x;
        if (xVal.type !== "number") {
            if (xVal.type === "bigint") {
                x = Number(xVal.value);
            }
            else {
                handleRuntimeError(context, new TypeError$1(source, command, context, xVal.type, "float' or 'int"));
            }
        }
        else {
            x = xVal.value;
        }
        const result = Math.pow(2, x);
        return { type: "number", value: result };
    }
    static math_expm1(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        let num;
        if (x.type === "number") {
            num = x.value;
        }
        else {
            num = Number(x.value);
        }
        const result = Math.expm1(num);
        return { type: "number", value: result };
    }
    static math_gamma(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        const z = BuiltInFunctions.toNumber(x, source, command, context);
        const result = gamma(z);
        return { type: "number", value: result };
    }
    static math_lgamma(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        const z = BuiltInFunctions.toNumber(x, source, command, context);
        const result = lgamma(z);
        return { type: "number", value: result };
    }
    static math_log(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        let num;
        if (x.type === "number") {
            num = x.value;
        }
        else {
            num = Number(x.value);
        }
        if (num <= 0) {
            handleRuntimeError(context, new ValueError(source, command, context, "math_log"));
        }
        if (args.length === 1) {
            return { type: "number", value: Math.log(num) };
        }
        const baseArg = args[1];
        if (baseArg.type !== "number" && baseArg.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, baseArg.type, "float' or 'int"));
        }
        let baseNum;
        if (baseArg.type === "number") {
            baseNum = baseArg.value;
        }
        else {
            baseNum = Number(baseArg.value);
        }
        if (baseNum <= 0) {
            handleRuntimeError(context, new ValueError(source, command, context, "math_log"));
        }
        const result = Math.log(num) / Math.log(baseNum);
        return { type: "number", value: result };
    }
    static math_log10(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, args[0].type, "float' or 'int"));
        }
        let num;
        if (x.type === "number") {
            num = x.value;
        }
        else {
            num = Number(x.value);
        }
        if (num <= 0) {
            handleRuntimeError(context, new ValueError(source, command, context, "math_log10"));
        }
        const result = Math.log10(num);
        return { type: "number", value: result };
    }
    static math_log1p(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, args[0].type, "float' or 'int"));
        }
        let num;
        if (x.type === "number") {
            num = x.value;
        }
        else {
            num = Number(x.value);
        }
        if (1 + num <= 0) {
            handleRuntimeError(context, new ValueError(source, command, context, "math_log1p"));
        }
        const result = Math.log1p(num);
        return { type: "number", value: result };
    }
    static math_log2(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, args[0].type, "float' or 'int"));
        }
        let num;
        if (x.type === "number") {
            num = x.value;
        }
        else {
            num = Number(x.value);
        }
        if (num <= 0) {
            handleRuntimeError(context, new ValueError(source, command, context, "math_log2"));
        }
        const result = Math.log2(num);
        return { type: "number", value: result };
    }
    static math_pow(args, source, command, context) {
        const base = args[0];
        const exp = args[1];
        if (base.type !== "number" && base.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, base.type, "float' or 'int"));
        }
        else if (exp.type !== "number" && exp.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, exp.type, "float' or 'int"));
        }
        let baseNum;
        if (base.type === "number") {
            baseNum = base.value;
        }
        else {
            baseNum = Number(base.value);
        }
        let expNum;
        if (exp.type === "number") {
            expNum = exp.value;
        }
        else {
            expNum = Number(exp.value);
        }
        const result = Math.pow(baseNum, expNum);
        return { type: "number", value: result };
    }
    static math_radians(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        let deg;
        if (x.type === "number") {
            deg = x.value;
        }
        else {
            deg = Number(x.value);
        }
        const radians = (deg * Math.PI) / 180;
        return { type: "number", value: radians };
    }
    static math_sin(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        let num;
        if (x.type === "number") {
            num = x.value;
        }
        else {
            num = Number(x.value);
        }
        const result = Math.sin(num);
        return { type: "number", value: result };
    }
    static math_sinh(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        let num;
        if (x.type === "number") {
            num = x.value;
        }
        else {
            num = Number(x.value);
        }
        const result = Math.sinh(num);
        return { type: "number", value: result };
    }
    static math_tan(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        let num;
        if (x.type === "number") {
            num = x.value;
        }
        else {
            num = Number(x.value);
        }
        const result = Math.tan(num);
        return { type: "number", value: result };
    }
    static math_tanh(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        let num;
        if (x.type === "number") {
            num = x.value;
        }
        else {
            num = Number(x.value);
        }
        const result = Math.tanh(num);
        return { type: "number", value: result };
    }
    static math_sqrt(args, source, command, context) {
        const x = args[0];
        if (x.type !== "number" && x.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, x.type, "float' or 'int"));
        }
        let num;
        if (x.type === "number") {
            num = x.value;
        }
        else {
            num = Number(x.value);
        }
        if (num < 0) {
            handleRuntimeError(context, new ValueError(source, command, context, "math_sqrt"));
        }
        const result = Math.sqrt(num);
        return { type: "number", value: result };
    }
    static max(args, source, command, context) {
        const numericTypes = ["bigint", "number"];
        const firstType = args[0].type;
        const isNumeric = numericTypes.includes(firstType);
        const isString = firstType === "string";
        for (let i = 1; i < args.length; i++) {
            const t = args[i].type;
            if (isNumeric && !numericTypes.includes(t)) {
                handleRuntimeError(context, new TypeError$1(source, command, context, args[i].type, "float' or 'int"));
            }
            if (isString && t !== "string") {
                handleRuntimeError(context, new TypeError$1(source, command, context, args[i].type, "string"));
            }
        }
        let useFloat = false;
        if (isNumeric) {
            for (const arg of args) {
                if (arg.type === "number") {
                    useFloat = true;
                    break;
                }
            }
        }
        let maxIndex = 0;
        if (isNumeric) {
            if (useFloat) {
                if (args[0].type !== "number" && args[0].type !== "bigint") {
                    handleRuntimeError(context, new TypeError$1(source, command, context, args[0].type, "float' or 'int"));
                }
                let maxVal = Number(args[0].value);
                for (let i = 1; i < args.length; i++) {
                    const arg = args[i];
                    if (arg.type !== "number" && arg.type !== "bigint") {
                        handleRuntimeError(context, new TypeError$1(source, command, context, arg.type, "float' or 'int"));
                    }
                    const curr = Number(arg.value);
                    if (curr > maxVal) {
                        maxVal = curr;
                        maxIndex = i;
                    }
                }
            }
            else {
                if (args[0].type !== "bigint") {
                    handleRuntimeError(context, new TypeError$1(source, command, context, args[0].type, "int"));
                }
                let maxVal = args[0].value;
                for (let i = 1; i < args.length; i++) {
                    const arg = args[i];
                    if (arg.type !== "bigint") {
                        handleRuntimeError(context, new TypeError$1(source, command, context, arg.type, "int"));
                    }
                    const curr = arg.value;
                    if (curr > maxVal) {
                        maxVal = curr;
                        maxIndex = i;
                    }
                }
            }
        }
        else if (isString) {
            if (args[0].type !== "string") {
                handleRuntimeError(context, new TypeError$1(source, command, context, args[0].type, "string"));
            }
            let maxVal = args[0].value;
            for (let i = 1; i < args.length; i++) {
                const arg = args[i];
                if (arg.type !== "string") {
                    handleRuntimeError(context, new TypeError$1(source, command, context, arg.type, "string"));
                }
                const curr = arg.value;
                if (curr > maxVal) {
                    maxVal = curr;
                    maxIndex = i;
                }
            }
        }
        else {
            // Won't happen
            throw new Error(`max: unsupported type ${firstType}`);
        }
        return args[maxIndex];
    }
    static min(args, source, command, context) {
        if (args.length < 2) {
            handleRuntimeError(context, new MissingRequiredPositionalError(source, command, "min", Number(2), args, true));
        }
        const numericTypes = ["bigint", "number"];
        const firstType = args[0].type;
        const isNumeric = numericTypes.includes(firstType);
        const isString = firstType === "string";
        for (let i = 1; i < args.length; i++) {
            const t = args[i].type;
            if (isNumeric && !numericTypes.includes(t)) {
                handleRuntimeError(context, new TypeError$1(source, command, context, args[i].type, "float' or 'int"));
            }
            if (isString && t !== "string") {
                handleRuntimeError(context, new TypeError$1(source, command, context, args[i].type, "string"));
            }
        }
        let useFloat = false;
        if (isNumeric) {
            for (const arg of args) {
                if (arg.type === "number") {
                    useFloat = true;
                    break;
                }
            }
        }
        let maxIndex = 0;
        if (isNumeric) {
            if (useFloat) {
                if (args[0].type !== "number" && args[0].type !== "bigint") {
                    handleRuntimeError(context, new TypeError$1(source, command, context, args[0].type, "float' or 'int"));
                }
                let maxVal = Number(args[0].value);
                for (let i = 1; i < args.length; i++) {
                    const arg = args[i];
                    if (arg.type !== "number" && arg.type !== "bigint") {
                        handleRuntimeError(context, new TypeError$1(source, command, context, arg.type, "float' or 'int"));
                    }
                    const curr = Number(arg.value);
                    if (curr < maxVal) {
                        maxVal = curr;
                        maxIndex = i;
                    }
                }
            }
            else {
                if (args[0].type !== "bigint") {
                    handleRuntimeError(context, new TypeError$1(source, command, context, args[0].type, "int"));
                }
                let maxVal = args[0].value;
                for (let i = 1; i < args.length; i++) {
                    const arg = args[i];
                    if (arg.type !== "bigint") {
                        handleRuntimeError(context, new TypeError$1(source, command, context, arg.type, "int"));
                    }
                    const curr = arg.value;
                    if (curr < maxVal) {
                        maxVal = curr;
                        maxIndex = i;
                    }
                }
            }
        }
        else if (isString) {
            if (args[0].type !== "string") {
                handleRuntimeError(context, new TypeError$1(source, command, context, args[0].type, "string"));
            }
            let maxVal = args[0].value;
            for (let i = 1; i < args.length; i++) {
                const arg = args[i];
                if (arg.type !== "string") {
                    handleRuntimeError(context, new TypeError$1(source, command, context, arg.type, "string"));
                }
                const curr = arg.value;
                if (curr < maxVal) {
                    maxVal = curr;
                    maxIndex = i;
                }
            }
        }
        else {
            // Won't happen
            throw new Error(`min: unsupported type ${firstType}`);
        }
        return args[maxIndex];
    }
    static random_random(_args, _source, _command, _context) {
        const result = Math.random();
        return { type: "number", value: result };
    }
    static round(args, source, command, context) {
        const numArg = args[0];
        if (numArg.type !== "number" && numArg.type !== "bigint") {
            handleRuntimeError(context, new TypeError$1(source, command, context, numArg.type, "float' or 'int"));
        }
        let ndigitsArg = { value: BigInt(0) };
        if (args.length === 2 && args[1].type !== "none") {
            if (args[1].type !== "bigint") {
                handleRuntimeError(context, new TypeError$1(source, command, context, args[1].type, "int"));
            }
            ndigitsArg = args[1];
        }
        if (numArg.type === "number") {
            const numberValue = numArg.value;
            if (ndigitsArg.value > 0) {
                const shifted = Number(numberValue.toFixed(Number(ndigitsArg.value)));
                return { type: "number", value: shifted };
            }
            else if (ndigitsArg.value === BigInt(0)) {
                const shifted = Math.round(numArg.value);
                return { type: "bigint", value: BigInt(shifted) };
            }
            else {
                const shifted = Math.round(numArg.value / 10 ** -Number(ndigitsArg.value)) *
                    10 ** -Number(ndigitsArg.value);
                return { type: "number", value: shifted };
            }
        }
        else {
            if (ndigitsArg.value >= 0) {
                return numArg;
            }
            else {
                const shifted = (numArg.value / BigInt(10) ** -ndigitsArg.value) * BigInt(10) ** -ndigitsArg.value;
                return { type: "bigint", value: shifted };
            }
        }
    }
    static time_time(_args, _source, _command, _context) {
        const currentTime = Date.now();
        return { type: "number", value: currentTime };
    }
    static async input(_args, _source, _command, context) {
        const userInput = await receiveInput(context);
        return { type: "string", value: userInput };
    }
    static async print(args, _source, _command, context) {
        const output = args.map(arg => toPythonString(arg)).join(" ");
        await displayOutput(context, output);
        return { type: "none" };
    }
    static str(args, _source, _command, _context) {
        if (args.length === 0) {
            return { type: "string", value: "" };
        }
        const obj = args[0];
        const result = toPythonString(obj);
        return { type: "string", value: result };
    }
}
__decorate([
    Validate(null, 1, "_int", true)
], BuiltInFunctions, "_int", null);
__decorate([
    Validate(1, 2, "_int_from_string", true)
], BuiltInFunctions, "_int_from_string", null);
__decorate([
    Validate(1, 1, "abs", false)
], BuiltInFunctions, "abs", null);
__decorate([
    Validate(2, 2, "isinstance", false)
], BuiltInFunctions, "isinstance", null);
__decorate([
    Validate(1, 1, "math_acos", false)
], BuiltInFunctions, "math_acos", null);
__decorate([
    Validate(1, 1, "math_acosh", false)
], BuiltInFunctions, "math_acosh", null);
__decorate([
    Validate(1, 1, "math_asin", false)
], BuiltInFunctions, "math_asin", null);
__decorate([
    Validate(1, 1, "math_asinh", false)
], BuiltInFunctions, "math_asinh", null);
__decorate([
    Validate(1, 1, "math_atan", false)
], BuiltInFunctions, "math_atan", null);
__decorate([
    Validate(2, 2, "math_atan2", false)
], BuiltInFunctions, "math_atan2", null);
__decorate([
    Validate(1, 1, "math_atanh", false)
], BuiltInFunctions, "math_atanh", null);
__decorate([
    Validate(1, 1, "math_cos", false)
], BuiltInFunctions, "math_cos", null);
__decorate([
    Validate(1, 1, "math_cosh", false)
], BuiltInFunctions, "math_cosh", null);
__decorate([
    Validate(1, 1, "math_degrees", false)
], BuiltInFunctions, "math_degrees", null);
__decorate([
    Validate(1, 1, "math_erf", false)
], BuiltInFunctions, "math_erf", null);
__decorate([
    Validate(1, 1, "math_erfc", false)
], BuiltInFunctions, "math_erfc", null);
__decorate([
    Validate(2, 2, "char_at", false)
], BuiltInFunctions, "char_at", null);
__decorate([
    Validate(2, 2, "math_comb", false)
], BuiltInFunctions, "math_comb", null);
__decorate([
    Validate(1, 1, "math_factorial", false)
], BuiltInFunctions, "math_factorial", null);
__decorate([
    Validate(1, 1, "math_isqrt", false)
], BuiltInFunctions, "math_isqrt", null);
__decorate([
    Validate(1, 2, "math_perm", true)
], BuiltInFunctions, "math_perm", null);
__decorate([
    Validate(1, 1, "math_ceil", false)
], BuiltInFunctions, "math_ceil", null);
__decorate([
    Validate(1, 1, "math_fabs", false)
], BuiltInFunctions, "math_fabs", null);
__decorate([
    Validate(1, 1, "math_floor", false)
], BuiltInFunctions, "math_floor", null);
__decorate([
    Validate(3, 3, "math_fma", false)
], BuiltInFunctions, "math_fma", null);
__decorate([
    Validate(2, 2, "math_fmod", false)
], BuiltInFunctions, "math_fmod", null);
__decorate([
    Validate(2, 2, "math_remainder", false)
], BuiltInFunctions, "math_remainder", null);
__decorate([
    Validate(1, 1, "math_trunc", false)
], BuiltInFunctions, "math_trunc", null);
__decorate([
    Validate(2, 2, "math_copysign", false)
], BuiltInFunctions, "math_copysign", null);
__decorate([
    Validate(1, 1, "math_isfinite", false)
], BuiltInFunctions, "math_isfinite", null);
__decorate([
    Validate(1, 1, "math_isinf", false)
], BuiltInFunctions, "math_isinf", null);
__decorate([
    Validate(1, 1, "math_isnan", false)
], BuiltInFunctions, "math_isnan", null);
__decorate([
    Validate(2, 2, "math_ldexp", false)
], BuiltInFunctions, "math_ldexp", null);
__decorate([
    Validate(1, 1, "math_cbrt", false)
], BuiltInFunctions, "math_cbrt", null);
__decorate([
    Validate(1, 1, "math_exp", false)
], BuiltInFunctions, "math_exp", null);
__decorate([
    Validate(1, 1, "math_exps", false)
], BuiltInFunctions, "math_exp2", null);
__decorate([
    Validate(1, 1, "math_expm1", false)
], BuiltInFunctions, "math_expm1", null);
__decorate([
    Validate(1, 1, "math_gamma", false)
], BuiltInFunctions, "math_gamma", null);
__decorate([
    Validate(1, 1, "math_lgamma", false)
], BuiltInFunctions, "math_lgamma", null);
__decorate([
    Validate(1, 2, "math_log", true)
], BuiltInFunctions, "math_log", null);
__decorate([
    Validate(1, 1, "math_log10", false)
], BuiltInFunctions, "math_log10", null);
__decorate([
    Validate(1, 1, "math_log1p", false)
], BuiltInFunctions, "math_log1p", null);
__decorate([
    Validate(1, 1, "math_log2", false)
], BuiltInFunctions, "math_log2", null);
__decorate([
    Validate(2, 2, "math_pow", false)
], BuiltInFunctions, "math_pow", null);
__decorate([
    Validate(1, 1, "math_radians", false)
], BuiltInFunctions, "math_radians", null);
__decorate([
    Validate(1, 1, "math_sin", false)
], BuiltInFunctions, "math_sin", null);
__decorate([
    Validate(1, 1, "math_sinh", false)
], BuiltInFunctions, "math_sinh", null);
__decorate([
    Validate(1, 1, "math_tan", false)
], BuiltInFunctions, "math_tan", null);
__decorate([
    Validate(1, 1, "math_tanh", false)
], BuiltInFunctions, "math_tanh", null);
__decorate([
    Validate(1, 1, "math_sqrt", false)
], BuiltInFunctions, "math_sqrt", null);
__decorate([
    Validate(2, null, "max", true)
], BuiltInFunctions, "max", null);
__decorate([
    Validate(2, null, "min", true)
], BuiltInFunctions, "min", null);
__decorate([
    Validate(null, 0, "random_random", true)
], BuiltInFunctions, "random_random", null);
__decorate([
    Validate(1, 2, "round", true)
], BuiltInFunctions, "round", null);
__decorate([
    Validate(null, 0, "time_time", true)
], BuiltInFunctions, "time_time", null);
// NOTE: If we ever switch to another Python “chapter” (e.g. py_s2_constants),
//       just change the variable below to switch to the set.
const constants = py_s1_constants;
/*
    Create a map to hold built-in constants.
    Each constant is stored with a string key and its corresponding value object.
*/
const builtInConstants = new Map();
const constantMap = {
    math_e: { type: "number", value: Math.E },
    math_inf: { type: "number", value: Infinity },
    math_nan: { type: "number", value: NaN },
    math_pi: { type: "number", value: Math.PI },
    math_tau: { type: "number", value: 2 * Math.PI },
};
for (const name of constants.constants) {
    const valueObj = constantMap[name];
    if (!valueObj) {
        throw new Error(`Constant '${name}' is not implemented`);
    }
    builtInConstants.set(name, valueObj);
}
/*
    Create a map to hold built-in functions.
    The keys are strings (function names) and the values are functions that can take any arguments.
*/
const builtIns = new Map();
for (const name of constants.builtInFuncs) {
    const impl = BuiltInFunctions[name];
    if (typeof impl !== "function") {
        throw new Error(`BuiltInFunctions.${name} is not implemented`);
    }
    const builtinName = name.startsWith("_") ? name.substring(1) : name;
    builtIns.set(name, { type: "builtin", name: builtinName, func: impl });
}
/**
 * Converts a number to a string that mimics Python's float formatting behavior.
 *
 * In Python, float values are printed in scientific notation when their absolute value
 * is ≥ 1e16 or < 1e-4. This differs from JavaScript/TypeScript's default behavior,
 * so we explicitly enforce these formatting thresholds.
 *
 * The logic here is based on Python's internal `format_float_short` implementation
 * in CPython's `pystrtod.c`:
 * https://github.com/python/cpython/blob/main/Python/pystrtod.c
 *
 * Special cases such as -0, Infinity, and NaN are also handled to ensure that
 * output matches Python’s display conventions.
 */
function toPythonFloat(num) {
    if (Object.is(num, -0)) {
        return "-0.0";
    }
    if (num === 0) {
        return "0.0";
    }
    if (num === Infinity) {
        return "inf";
    }
    if (num === -Infinity) {
        return "-inf";
    }
    if (Number.isNaN(num)) {
        return "nan";
    }
    if (Math.abs(num) >= 1e16 || (num !== 0 && Math.abs(num) < 1e-4)) {
        return num.toExponential().replace(/e([+-])(\d)$/, "e$10$2");
    }
    if (Number.isInteger(num)) {
        return num.toFixed(1).toString();
    }
    return num.toString();
}
function toPythonString(obj) {
    let ret = "";
    if (!obj) {
        return "None";
    }
    if (obj.type == "builtin") {
        return `<built-in function ${obj.name}>`;
    }
    if (obj.type === "bigint" || obj.type === "complex") {
        ret = obj.value.toString();
    }
    else if (obj.type === "number") {
        ret = toPythonFloat(obj.value);
    }
    else if (obj.type === "bool") {
        if (obj.value === true) {
            return "True";
        }
        else {
            return "False";
        }
    }
    else if (obj.type === "error") {
        return obj.message;
    }
    else if (obj.type === "closure") {
        if (obj.closure.node instanceof StmtNS.FunctionDef) {
            return `<function ${obj.closure.node.name.lexeme}>`;
        }
        return "<function (anonymous)>";
    }
    else if (obj.type === "none") {
        ret = "None";
    }
    else if (obj.type === "string") {
        ret = obj.value.toString();
    }
    return ret;
}

// export class CseError {
//     constructor(public readonly error: any) {}
// }
class PyComplexNumber {
    constructor(real, imag) {
        this.real = real;
        this.imag = imag;
    }
    static fromNumber(value) {
        return new PyComplexNumber(value, 0);
    }
    static fromBigInt(value) {
        return new PyComplexNumber(Number(value), 0);
    }
    static fromString(str) {
        if (!/[jJ]/.test(str)) {
            const realVal = Number(str);
            if (isNaN(realVal)) {
                throw new Error(`Invalid complex string: ${str}`);
            }
            return new PyComplexNumber(realVal, 0);
        }
        const lower = str.toLowerCase();
        if (lower.endsWith("j")) {
            const numericPart = str.substring(0, str.length - 1);
            if (numericPart === "" || numericPart === "+" || numericPart === "-") {
                const sign = numericPart === "-" ? -1 : 1;
                return new PyComplexNumber(0, sign * 1);
            }
            const imagVal = Number(numericPart);
            if (isNaN(imagVal)) {
                throw new Error(`Invalid complex string: ${str}`);
            }
            return new PyComplexNumber(0, imagVal);
        }
        const match = str.match(/^([\+\-]?\d+(\.\d+)?([eE][+\-]?\d+)?)([\+\-]\d+(\.\d+)?([eE][+\-]?\d+)?)?[jJ]?$/);
        if (!match) {
            throw new Error(`Invalid complex string: ${str}`);
        }
        const realPart = Number(match[1]);
        let imagPart = 0;
        if (match[4]) {
            imagPart = Number(match[4]);
        }
        return new PyComplexNumber(realPart, imagPart);
    }
    static fromValue(value) {
        if (value instanceof PyComplexNumber) {
            return new PyComplexNumber(value.real, value.imag);
        }
        if (typeof value === "number") {
            return PyComplexNumber.fromNumber(value);
        }
        if (typeof value === "bigint") {
            return PyComplexNumber.fromBigInt(value);
        }
        return PyComplexNumber.fromString(value);
    }
    /**
     * operations
     */
    add(other) {
        return new PyComplexNumber(this.real + other.real, this.imag + other.imag);
    }
    sub(other) {
        return new PyComplexNumber(this.real - other.real, this.imag - other.imag);
    }
    mul(other) {
        // (a+bi)*(c+di) = (ac - bd) + (bc + ad)i
        const realPart = this.real * other.real - this.imag * other.imag;
        const imagPart = this.real * other.imag + this.imag * other.real;
        return new PyComplexNumber(realPart, imagPart);
    }
    // https://github.com/python/cpython/blob/main/Objects/complexobject.c#L986
    // In the CPython source code, a branch algorithm is used for complex division.
    // It first compares the magnitudes of the dividend and divisor, and if some components are too large or too small,
    // appropriate scaling is applied before performing the operation.
    // This approach can significantly reduce overflow or underflow, thereby ensuring that the results remain more consistent with Python.
    div(other) {
        // (a+bi)/(c+di) = ((a+bi)*(c-di)) / (c^2 + d^2)
        const denominator = other.real * other.real + other.imag * other.imag;
        if (denominator === 0) {
            throw new Error(`Division by zero in complex number.`);
        }
        const a = this.real;
        const b = this.imag;
        const c = other.real;
        const d = other.imag;
        const absC = Math.abs(c);
        const absD = Math.abs(d);
        let real;
        let imag;
        if (absD < absC) {
            const ratio = d / c;
            const denom = c + d * ratio; // c + d*(d/c) = c + d^2/c
            real = (a + b * ratio) / denom;
            imag = (b - a * ratio) / denom;
        }
        else {
            const ratio = c / d;
            const denom = d + c * ratio; // d + c*(c/d) = d + c^2/d
            real = (a * ratio + b) / denom;
            imag = (b * ratio - a) / denom;
        }
        return new PyComplexNumber(real, imag);
        //const numerator = this.mul(new PyComplexNumber(other.real, -other.imag));
        //return new PyComplexNumber(numerator.real / denominator, numerator.imag / denominator);
    }
    pow(other) {
        // z = this (a+bi), w = other (A+Bi)
        const a = this.real;
        const b = this.imag;
        const A = other.real;
        const B = other.imag;
        const r = Math.sqrt(a * a + b * b);
        const theta = Math.atan2(b, a);
        if (r === 0) {
            // In Python, raising 0 to a negative or complex power raises an error.
            // For example, 0**(1j) in CPython directly raises ValueError: complex power.
            if (A < 0 || B !== 0) {
                throw new Error("0 cannot be raised to a negative or complex power");
            }
            // Otherwise, 0**(positive number) = 0.
            return new PyComplexNumber(0, 0);
        }
        const logR = Math.log(r);
        // realExpPart = A*ln(r) - B*theta
        // imagExpPart = B*ln(r) + A*theta
        const realExpPart = A * logR - B * theta;
        const imagExpPart = B * logR + A * theta;
        // e^(x + i y) = e^x [cos(y) + i sin(y)]
        const expOfReal = Math.exp(realExpPart);
        const c = expOfReal * Math.cos(imagExpPart);
        const d = expOfReal * Math.sin(imagExpPart);
        return new PyComplexNumber(c, d);
    }
    toString() {
        if (this.real === 0) {
            return `${this.imag}j`;
        }
        // if (this.imag === 0) {
        //     return `${this.real}`;
        // }
        const sign = this.imag >= 0 ? "+" : "";
        // return `(${this.real}${sign}${this.imag}j)`;
        return `(${this.toPythonComplexFloat(this.real)}${sign}${this.toPythonComplexFloat(this.imag)}j)`;
    }
    /*
     * This function converts the real and imaginary parts of a complex number into strings.
     * In Python, float values (used for the real and imaginary parts) are formatted using scientific
     * notation when their absolute value is less than 1e-4 or at least 1e16. TypeScript's default
     * formatting thresholds differ, so here we explicitly enforce Python's behavior.
     *
     * The chosen bounds (1e-4 and 1e16) are derived from Python's internal formatting logic
     * (refer to the `format_float_short` function in CPython's pystrtod.c
     * (https://github.com/python/cpython/blob/main/Python/pystrtod.c)). This ensures that the
     * output of py-slang more closely matches that of native Python.
     */
    toPythonComplexFloat(num) {
        if (num === Infinity) {
            return "inf";
        }
        if (num === -Infinity) {
            return "-inf";
        }
        // Force scientific notation for values < 1e-4 or ≥ 1e16 to mimic Python's float formatting behavior.
        if (Math.abs(num) >= 1e16 || (num !== 0 && Math.abs(num) < 1e-4)) {
            return num.toExponential().replace(/e([+-])(\d)$/, "e$10$2");
        }
        return num.toString();
    }
    equals(other) {
        return Number(this.real) === Number(other.real) && Number(this.imag) === Number(other.imag);
    }
}

var ExprNS;
(function (ExprNS) {
    class Expr {
        constructor(startToken, endToken) {
            this.startToken = startToken;
            this.endToken = endToken;
        }
    }
    ExprNS.Expr = Expr;
    class BigIntLiteral extends Expr {
        constructor(startToken, endToken, value) {
            super(startToken, endToken);
            this.kind = "BigIntLiteral";
            this.value = value;
        }
        accept(visitor) {
            return visitor.visitBigIntLiteralExpr(this);
        }
    }
    ExprNS.BigIntLiteral = BigIntLiteral;
    class Binary extends Expr {
        constructor(startToken, endToken, left, operator, right) {
            super(startToken, endToken);
            this.kind = "Binary";
            this.left = left;
            this.operator = operator;
            this.right = right;
        }
        accept(visitor) {
            return visitor.visitBinaryExpr(this);
        }
    }
    ExprNS.Binary = Binary;
    class Compare extends Expr {
        constructor(startToken, endToken, left, operator, right) {
            super(startToken, endToken);
            this.kind = "Compare";
            this.left = left;
            this.operator = operator;
            this.right = right;
        }
        accept(visitor) {
            return visitor.visitCompareExpr(this);
        }
    }
    ExprNS.Compare = Compare;
    class BoolOp extends Expr {
        constructor(startToken, endToken, left, operator, right) {
            super(startToken, endToken);
            this.kind = "BoolOp";
            this.left = left;
            this.operator = operator;
            this.right = right;
        }
        accept(visitor) {
            return visitor.visitBoolOpExpr(this);
        }
    }
    ExprNS.BoolOp = BoolOp;
    class Grouping extends Expr {
        constructor(startToken, endToken, expression) {
            super(startToken, endToken);
            this.kind = "Grouping";
            this.expression = expression;
        }
        accept(visitor) {
            return visitor.visitGroupingExpr(this);
        }
    }
    ExprNS.Grouping = Grouping;
    class Literal extends Expr {
        constructor(startToken, endToken, value) {
            super(startToken, endToken);
            this.kind = "Literal";
            this.value = value;
        }
        accept(visitor) {
            return visitor.visitLiteralExpr(this);
        }
    }
    ExprNS.Literal = Literal;
    class Unary extends Expr {
        constructor(startToken, endToken, operator, right) {
            super(startToken, endToken);
            this.kind = "Unary";
            this.operator = operator;
            this.right = right;
        }
        accept(visitor) {
            return visitor.visitUnaryExpr(this);
        }
    }
    ExprNS.Unary = Unary;
    class Ternary extends Expr {
        constructor(startToken, endToken, predicate, consequent, alternative) {
            super(startToken, endToken);
            this.kind = "Ternary";
            this.predicate = predicate;
            this.consequent = consequent;
            this.alternative = alternative;
        }
        accept(visitor) {
            return visitor.visitTernaryExpr(this);
        }
    }
    ExprNS.Ternary = Ternary;
    class Lambda extends Expr {
        constructor(startToken, endToken, parameters, body) {
            super(startToken, endToken);
            this.kind = "Lambda";
            this.parameters = parameters;
            this.body = body;
        }
        accept(visitor) {
            return visitor.visitLambdaExpr(this);
        }
    }
    ExprNS.Lambda = Lambda;
    class MultiLambda extends Expr {
        constructor(startToken, endToken, parameters, body, varDecls) {
            super(startToken, endToken);
            this.kind = "MultiLambda";
            this.parameters = parameters;
            this.body = body;
            this.varDecls = varDecls;
        }
        accept(visitor) {
            return visitor.visitMultiLambdaExpr(this);
        }
    }
    ExprNS.MultiLambda = MultiLambda;
    class Variable extends Expr {
        constructor(startToken, endToken, name) {
            super(startToken, endToken);
            this.kind = "Variable";
            this.name = name;
        }
        accept(visitor) {
            return visitor.visitVariableExpr(this);
        }
    }
    ExprNS.Variable = Variable;
    class Call extends Expr {
        constructor(startToken, endToken, callee, args) {
            super(startToken, endToken);
            this.kind = "Call";
            this.callee = callee;
            this.args = args;
        }
        accept(visitor) {
            return visitor.visitCallExpr(this);
        }
    }
    ExprNS.Call = Call;
    class List extends Expr {
        constructor(startToken, endToken, elements) {
            super(startToken, endToken);
            this.kind = "List";
            this.elements = elements;
        }
        accept(visitor) {
            return visitor.visitListExpr(this);
        }
    }
    ExprNS.List = List;
    class Subscript extends Expr {
        constructor(startToken, endToken, value, index) {
            super(startToken, endToken);
            this.kind = "Subscript";
            this.value = value;
            this.index = index;
        }
        accept(visitor) {
            return visitor.visitSubscriptExpr(this);
        }
    }
    ExprNS.Subscript = Subscript;
    class None extends Expr {
        constructor(startToken, endToken) {
            super(startToken, endToken);
            this.kind = "None";
        }
        accept(visitor) {
            return visitor.visitNoneExpr(this);
        }
    }
    ExprNS.None = None;
    class Complex extends Expr {
        constructor(startToken, endToken, value) {
            super(startToken, endToken);
            this.kind = "Complex";
            this.value = PyComplexNumber.fromString(value);
        }
        accept(visitor) {
            return visitor.visitComplexExpr(this);
        }
    }
    ExprNS.Complex = Complex;
})(ExprNS || (ExprNS = {}));
var StmtNS;
(function (StmtNS) {
    class Stmt {
        constructor(startToken, endToken) {
            this.startToken = startToken;
            this.endToken = endToken;
        }
    }
    StmtNS.Stmt = Stmt;
    class Pass extends Stmt {
        constructor(startToken, endToken) {
            super(startToken, endToken);
            this.kind = "Pass";
        }
        accept(visitor) {
            return visitor.visitPassStmt(this);
        }
    }
    StmtNS.Pass = Pass;
    class Assign extends Stmt {
        constructor(startToken, endToken, target, value) {
            super(startToken, endToken);
            this.kind = "Assign";
            this.target = target;
            this.value = value;
        }
        accept(visitor) {
            return visitor.visitAssignStmt(this);
        }
    }
    StmtNS.Assign = Assign;
    class AnnAssign extends Stmt {
        constructor(startToken, endToken, target, value, ann) {
            super(startToken, endToken);
            this.kind = "AnnAssign";
            this.target = target;
            this.value = value;
            this.ann = ann;
        }
        accept(visitor) {
            return visitor.visitAnnAssignStmt(this);
        }
    }
    StmtNS.AnnAssign = AnnAssign;
    class Break extends Stmt {
        constructor(startToken, endToken) {
            super(startToken, endToken);
            this.kind = "Break";
        }
        accept(visitor) {
            return visitor.visitBreakStmt(this);
        }
    }
    StmtNS.Break = Break;
    class Continue extends Stmt {
        constructor(startToken, endToken) {
            super(startToken, endToken);
            this.kind = "Continue";
        }
        accept(visitor) {
            return visitor.visitContinueStmt(this);
        }
    }
    StmtNS.Continue = Continue;
    class Return extends Stmt {
        constructor(startToken, endToken, value) {
            super(startToken, endToken);
            this.kind = "Return";
            this.value = value;
        }
        accept(visitor) {
            return visitor.visitReturnStmt(this);
        }
    }
    StmtNS.Return = Return;
    class FromImport extends Stmt {
        constructor(startToken, endToken, module, names) {
            super(startToken, endToken);
            this.kind = "FromImport";
            this.module = module;
            this.names = names;
        }
        accept(visitor) {
            return visitor.visitFromImportStmt(this);
        }
    }
    StmtNS.FromImport = FromImport;
    class Global extends Stmt {
        constructor(startToken, endToken, name) {
            super(startToken, endToken);
            this.kind = "Global";
            this.name = name;
        }
        accept(visitor) {
            return visitor.visitGlobalStmt(this);
        }
    }
    StmtNS.Global = Global;
    class NonLocal extends Stmt {
        constructor(startToken, endToken, name) {
            super(startToken, endToken);
            this.kind = "NonLocal";
            this.name = name;
        }
        accept(visitor) {
            return visitor.visitNonLocalStmt(this);
        }
    }
    StmtNS.NonLocal = NonLocal;
    class Assert extends Stmt {
        constructor(startToken, endToken, value) {
            super(startToken, endToken);
            this.kind = "Assert";
            this.value = value;
        }
        accept(visitor) {
            return visitor.visitAssertStmt(this);
        }
    }
    StmtNS.Assert = Assert;
    class If extends Stmt {
        constructor(startToken, endToken, condition, body, elseBlock) {
            super(startToken, endToken);
            this.kind = "If";
            this.condition = condition;
            this.body = body;
            this.elseBlock = elseBlock;
        }
        accept(visitor) {
            return visitor.visitIfStmt(this);
        }
    }
    StmtNS.If = If;
    class While extends Stmt {
        constructor(startToken, endToken, condition, body) {
            super(startToken, endToken);
            this.kind = "While";
            this.condition = condition;
            this.body = body;
        }
        accept(visitor) {
            return visitor.visitWhileStmt(this);
        }
    }
    StmtNS.While = While;
    class For extends Stmt {
        constructor(startToken, endToken, target, iter, body) {
            super(startToken, endToken);
            this.kind = "For";
            this.target = target;
            this.iter = iter;
            this.body = body;
        }
        accept(visitor) {
            return visitor.visitForStmt(this);
        }
    }
    StmtNS.For = For;
    class FunctionDef extends Stmt {
        constructor(startToken, endToken, name, parameters, body, varDecls) {
            super(startToken, endToken);
            this.kind = "FunctionDef";
            this.name = name;
            this.parameters = parameters;
            this.body = body;
            this.varDecls = varDecls;
        }
        accept(visitor) {
            return visitor.visitFunctionDefStmt(this);
        }
    }
    StmtNS.FunctionDef = FunctionDef;
    class SimpleExpr extends Stmt {
        constructor(startToken, endToken, expression) {
            super(startToken, endToken);
            this.kind = "SimpleExpr";
            this.expression = expression;
        }
        accept(visitor) {
            return visitor.visitSimpleExprStmt(this);
        }
    }
    StmtNS.SimpleExpr = SimpleExpr;
    class FileInput extends Stmt {
        constructor(startToken, endToken, statements, varDecls) {
            super(startToken, endToken);
            this.kind = "FileInput";
            this.statements = statements;
            this.varDecls = varDecls;
        }
        accept(visitor) {
            return visitor.visitFileInputStmt(this);
        }
    }
    StmtNS.FileInput = FileInput;
})(StmtNS || (StmtNS = {}));

class Token {
    constructor(type, lexeme, line, col, indexInSource) {
        this.type = type;
        this.lexeme = lexeme;
        this.line = line;
        this.col = col;
        this.indexInSource = indexInSource;
    }
}

const MOO_TO_TOKEN_TYPE = {
    name: TokenType.NAME,
    number_float: TokenType.NUMBER,
    number_hex: TokenType.BIGINT,
    number_oct: TokenType.BIGINT,
    number_bin: TokenType.BIGINT,
    number_int: TokenType.BIGINT,
    number_complex: TokenType.COMPLEX,
    string_triple_double: TokenType.STRING,
    string_triple_single: TokenType.STRING,
    string_double: TokenType.STRING,
    string_single: TokenType.STRING,
    newline: TokenType.NEWLINE,
    indent: TokenType.INDENT,
    dedent: TokenType.DEDENT,
    kw_if: TokenType.IF,
    kw_else: TokenType.ELSE,
    kw_elif: TokenType.ELIF,
    kw_while: TokenType.WHILE,
    kw_for: TokenType.FOR,
    kw_in: TokenType.IN,
    kw_def: TokenType.DEF,
    kw_return: TokenType.RETURN,
    kw_pass: TokenType.PASS,
    kw_break: TokenType.BREAK,
    kw_continue: TokenType.CONTINUE,
    kw_lambda: TokenType.LAMBDA,
    kw_None: TokenType.NONE,
    kw_True: TokenType.TRUE,
    kw_False: TokenType.FALSE,
    kw_and: TokenType.AND,
    kw_or: TokenType.OR,
    kw_not: TokenType.NOT,
    kw_is: TokenType.IS,
    kw_from: TokenType.FROM,
    kw_import: TokenType.IMPORT,
    kw_global: TokenType.GLOBAL,
    kw_nonlocal: TokenType.NONLOCAL,
    kw_assert: TokenType.ASSERT,
    doublestar: TokenType.DOUBLESTAR,
    doubleslash: TokenType.DOUBLESLASH,
    doubleequal: TokenType.DOUBLEEQUAL,
    notequal: TokenType.NOTEQUAL,
    lessequal: TokenType.LESSEQUAL,
    greaterequal: TokenType.GREATEREQUAL,
    doublecolon: TokenType.DOUBLECOLON,
    lparen: TokenType.LPAR,
    rparen: TokenType.RPAR,
    lsqb: TokenType.LSQB,
    rsqb: TokenType.RSQB,
    colon: TokenType.COLON,
    comma: TokenType.COMMA,
    plus: TokenType.PLUS,
    minus: TokenType.MINUS,
    star: TokenType.STAR,
    slash: TokenType.SLASH,
    percent: TokenType.PERCENT,
    less: TokenType.LESS,
    greater: TokenType.GREATER,
    equal: TokenType.EQUAL,
};
function toAstToken(mooToken) {
    const type = mooToken.type !== undefined
        ? (MOO_TO_TOKEN_TYPE[mooToken.type] ?? TokenType.NAME)
        : TokenType.NAME;
    // Moo uses 1-based line, 1-based col, 0-based offset.
    // Our Token.col represents the column *after* the token, so adjust Moo's start column accordingly.
    const value = mooToken.value ?? "";
    const startCol = mooToken.col ?? 1;
    const endCol = startCol + value.length;
    return new Token(type, value, mooToken.line ?? 0, endCol, mooToken.offset ?? 0);
}

// @ts-nocheck
// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
function id(x) {
    return x[0];
}
const list = ([x]) => [x];
const drop = () => [];
/** Strip surrounding quotes and process escape sequences. */
function stripQuotes(s) {
    let inner;
    if (s.startsWith('"""') || s.startsWith("'''"))
        inner = s.slice(3, -3);
    else if (s.startsWith('"') || s.startsWith("'"))
        inner = s.slice(1, -1);
    else
        return s;
    return inner.replace(/\\(["'\\\/bfnrtav0]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|.)/g, (_, ch) => {
        switch (ch[0]) {
            case "n":
                return "\n";
            case "t":
                return "\t";
            case "r":
                return "\r";
            case "\\":
                return "\\";
            case "'":
                return "'";
            case '"':
                return '"';
            case "/":
                return "/";
            case "b":
                return "\b";
            case "f":
                return "\f";
            case "a":
                return "\x07";
            case "v":
                return "\x0B";
            case "0":
                return "\0";
            case "x":
                return String.fromCharCode(parseInt(ch.slice(1), 16));
            case "u":
                return String.fromCharCode(parseInt(ch.slice(1), 16));
            default:
                return "\\" + ch; // unrecognized escapes kept literally
        }
    });
}
// ── Leaf AST constructors (token → node) ────────────────────────────────
const astVariable = ([t]) => {
    const k = toAstToken(t);
    return new ExprNS.Variable(k, k, k);
};
const astBigInt = ([t]) => {
    const k = toAstToken(t);
    return new ExprNS.BigIntLiteral(k, k, t.value);
};
const astComplex = ([t]) => {
    const k = toAstToken(t);
    return new ExprNS.Complex(k, k, t.value);
};
const astNone = ([t]) => {
    const k = toAstToken(t);
    return new ExprNS.None(k, k);
};
const astString = ([t]) => {
    const k = toAstToken(t);
    return new ExprNS.Literal(k, k, stripQuotes(t.value));
};
const astTrue = ([t]) => {
    const k = toAstToken(t);
    return new ExprNS.Literal(k, k, true);
};
const astFalse = ([t]) => {
    const k = toAstToken(t);
    return new ExprNS.Literal(k, k, false);
};
// ── Operator AST constructors (children → node) ────────────────────────
const astBinary = ([l, op, r]) => new ExprNS.Binary(l.startToken, r.endToken, l, op, r);
const astBinaryTok = ([l, op, r]) => new ExprNS.Binary(l.startToken, r.endToken, l, toAstToken(op), r);
const astBoolOp = ([l, op, r]) => new ExprNS.BoolOp(l.startToken, r.endToken, l, toAstToken(op), r);
const astUnary = ([op, arg]) => new ExprNS.Unary(toAstToken(op), arg.endToken, toAstToken(op), arg);
const astCompare = ([l, op, r]) => new ExprNS.Compare(l.startToken, r.endToken, l, op, r);
// ── Token / list helpers ────────────────────────────────────────────────
const tok = ([t]) => toAstToken(t);
const flatList = ([first, rest]) => [first, ...rest.map(d => d[1])];
const tokList = ([first, rest]) => [toAstToken(first), ...rest.map(d => toAstToken(d[1]))];
let Lexer = pythonLexer;
let ParserRules = [
    { name: "program$ebnf$1", symbols: [] },
    {
        name: "program$ebnf$1$subexpression$1",
        symbols: ["import_stmt", pythonLexer.has("newline") ? { type: "newline" } : newline],
    },
    {
        name: "program$ebnf$1",
        symbols: ["program$ebnf$1", "program$ebnf$1$subexpression$1"],
        postprocess: function arrpush(d) {
            return d[0].concat([d[1]]);
        },
    },
    { name: "program$ebnf$2", symbols: [] },
    { name: "program$ebnf$2$subexpression$1", symbols: ["statement"] },
    {
        name: "program$ebnf$2$subexpression$1",
        symbols: [pythonLexer.has("newline") ? { type: "newline" } : newline],
    },
    {
        name: "program$ebnf$2",
        symbols: ["program$ebnf$2", "program$ebnf$2$subexpression$1"],
        postprocess: function arrpush(d) {
            return d[0].concat([d[1]]);
        },
    },
    {
        name: "program",
        symbols: ["program$ebnf$1", "program$ebnf$2"],
        postprocess: ([imports, stmts]) => {
            const importNodes = imports.map(d => d[0]);
            const stmtNodes = stmts.map(d => d[0]).filter(s => s && s.startToken !== undefined);
            const filtered = [...importNodes, ...stmtNodes];
            const start = filtered[0]
                ? filtered[0].startToken
                : toAstToken({ type: "newline", value: "", line: 1, col: 1, offset: 0 });
            const end = filtered.length > 0 ? filtered[filtered.length - 1].endToken : start;
            return new StmtNS.FileInput(start, end, filtered, []);
        },
    },
    {
        name: "import_stmt",
        symbols: [{ literal: "from" }, "dotted_name", { literal: "import" }, "import_clause"],
        postprocess: ([kw, mod, , names]) => {
            const last = names[names.length - 1];
            const endTok = last.alias || last.name;
            return new StmtNS.FromImport(toAstToken(kw), endTok, mod, names);
        },
    },
    { name: "dotted_name$ebnf$1", symbols: [] },
    {
        name: "dotted_name$ebnf$1$subexpression$1",
        symbols: [{ literal: "." }, pythonLexer.has("name") ? { type: "name" } : name],
    },
    {
        name: "dotted_name$ebnf$1",
        symbols: ["dotted_name$ebnf$1", "dotted_name$ebnf$1$subexpression$1"],
        postprocess: function arrpush(d) {
            return d[0].concat([d[1]]);
        },
    },
    {
        name: "dotted_name",
        symbols: [pythonLexer.has("name") ? { type: "name" } : name, "dotted_name$ebnf$1"],
        postprocess: ([first, rest]) => {
            let tok = toAstToken(first);
            for (const [, n] of rest) {
                const right = toAstToken(n);
                tok.lexeme = tok.lexeme + "." + right.lexeme;
            }
            return tok;
        },
    },
    { name: "import_clause", symbols: ["import_as_names"], postprocess: id },
    {
        name: "import_clause",
        symbols: [{ literal: "(" }, "import_as_names", { literal: ")" }],
        postprocess: ([, ns]) => ns,
    },
    { name: "import_as_names$ebnf$1", symbols: [] },
    { name: "import_as_names$ebnf$1$subexpression$1", symbols: [{ literal: "," }, "import_as_name"] },
    {
        name: "import_as_names$ebnf$1",
        symbols: ["import_as_names$ebnf$1", "import_as_names$ebnf$1$subexpression$1"],
        postprocess: function arrpush(d) {
            return d[0].concat([d[1]]);
        },
    },
    {
        name: "import_as_names",
        symbols: ["import_as_name", "import_as_names$ebnf$1"],
        postprocess: flatList,
    },
    {
        name: "import_as_name",
        symbols: [pythonLexer.has("name") ? { type: "name" } : name],
        postprocess: ([t]) => ({ name: toAstToken(t), alias: null }),
    },
    {
        name: "import_as_name",
        symbols: [
            pythonLexer.has("name") ? { type: "name" } : name,
            { literal: "as" },
            pythonLexer.has("name") ? { type: "name" } : name,
        ],
        postprocess: ([t, , a]) => ({ name: toAstToken(t), alias: toAstToken(a) }),
    },
    {
        name: "statement",
        symbols: ["statementAssign", pythonLexer.has("newline") ? { type: "newline" } : newline],
        postprocess: id,
    },
    {
        name: "statement",
        symbols: ["statementAnnAssign", pythonLexer.has("newline") ? { type: "newline" } : newline],
        postprocess: id,
    },
    {
        name: "statement",
        symbols: [
            "statementSubscriptAssign",
            pythonLexer.has("newline") ? { type: "newline" } : newline,
        ],
        postprocess: id,
    },
    {
        name: "statement",
        symbols: ["statementReturn", pythonLexer.has("newline") ? { type: "newline" } : newline],
        postprocess: id,
    },
    {
        name: "statement",
        symbols: ["statementPass", pythonLexer.has("newline") ? { type: "newline" } : newline],
        postprocess: id,
    },
    {
        name: "statement",
        symbols: ["statementBreak", pythonLexer.has("newline") ? { type: "newline" } : newline],
        postprocess: id,
    },
    {
        name: "statement",
        symbols: ["statementContinue", pythonLexer.has("newline") ? { type: "newline" } : newline],
        postprocess: id,
    },
    {
        name: "statement",
        symbols: ["statementGlobal", pythonLexer.has("newline") ? { type: "newline" } : newline],
        postprocess: id,
    },
    {
        name: "statement",
        symbols: ["statementNonlocal", pythonLexer.has("newline") ? { type: "newline" } : newline],
        postprocess: id,
    },
    {
        name: "statement",
        symbols: ["statementAssert", pythonLexer.has("newline") ? { type: "newline" } : newline],
        postprocess: id,
    },
    {
        name: "statement",
        symbols: ["statementExpr", pythonLexer.has("newline") ? { type: "newline" } : newline],
        postprocess: id,
    },
    { name: "statement", symbols: ["if_statement"], postprocess: id },
    { name: "statement", symbols: ["statementWhile"], postprocess: id },
    { name: "statement", symbols: ["statementFor"], postprocess: id },
    { name: "statement", symbols: ["statementDef"], postprocess: id },
    {
        name: "statementAssign",
        symbols: [pythonLexer.has("name") ? { type: "name" } : name, { literal: "=" }, "expression"],
        postprocess: ([n, , v]) => {
            const tok = toAstToken(n);
            return new StmtNS.Assign(tok, v.endToken, new ExprNS.Variable(tok, tok, tok), v);
        },
    },
    {
        name: "statementAnnAssign",
        symbols: [
            pythonLexer.has("name") ? { type: "name" } : name,
            { literal: ":" },
            "expression",
            { literal: "=" },
            "expression",
        ],
        postprocess: ([n, , ann, , v]) => {
            const tok = toAstToken(n);
            return new StmtNS.AnnAssign(tok, v.endToken, new ExprNS.Variable(tok, tok, tok), v, ann);
        },
    },
    {
        name: "statementAnnAssign",
        symbols: [pythonLexer.has("name") ? { type: "name" } : name, { literal: ":" }, "expression"],
        postprocess: ([n, , ann]) => {
            const nameTok = toAstToken(n);
            const dummyVal = new ExprNS.None(ann.endToken, ann.endToken);
            return new StmtNS.AnnAssign(nameTok, ann.endToken, new ExprNS.Variable(nameTok, nameTok, nameTok), dummyVal, ann);
        },
    },
    {
        name: "statementSubscriptAssign",
        symbols: [
            "expressionPost",
            pythonLexer.has("lsqb") ? { type: "lsqb" } : lsqb,
            "expression",
            pythonLexer.has("rsqb") ? { type: "rsqb" } : rsqb,
            { literal: "=" },
            "expression",
        ],
        postprocess: function (d) {
            var obj = d[0], idx = d[2], rsqb = d[3], val = d[5];
            var sub = new ExprNS.Subscript(obj.startToken, toAstToken(rsqb), obj, idx);
            return new StmtNS.Assign(obj.startToken, val.endToken, sub, val);
        },
    },
    {
        name: "statementReturn",
        symbols: [{ literal: "return" }, "expression"],
        postprocess: ([kw, expr]) => new StmtNS.Return(toAstToken(kw), expr.endToken, expr),
    },
    {
        name: "statementReturn",
        symbols: [{ literal: "return" }],
        postprocess: ([t]) => {
            const tok = toAstToken(t);
            return new StmtNS.Return(tok, tok, null);
        },
    },
    {
        name: "statementPass",
        symbols: [{ literal: "pass" }],
        postprocess: ([t]) => {
            const tok = toAstToken(t);
            return new StmtNS.Pass(tok, tok);
        },
    },
    {
        name: "statementBreak",
        symbols: [{ literal: "break" }],
        postprocess: ([t]) => {
            const tok = toAstToken(t);
            return new StmtNS.Break(tok, tok);
        },
    },
    {
        name: "statementContinue",
        symbols: [{ literal: "continue" }],
        postprocess: ([t]) => {
            const tok = toAstToken(t);
            return new StmtNS.Continue(tok, tok);
        },
    },
    {
        name: "statementGlobal",
        symbols: [{ literal: "global" }, pythonLexer.has("name") ? { type: "name" } : name],
        postprocess: ([kw, n]) => new StmtNS.Global(toAstToken(kw), toAstToken(n), toAstToken(n)),
    },
    {
        name: "statementNonlocal",
        symbols: [{ literal: "nonlocal" }, pythonLexer.has("name") ? { type: "name" } : name],
        postprocess: ([kw, n]) => new StmtNS.NonLocal(toAstToken(kw), toAstToken(n), toAstToken(n)),
    },
    {
        name: "statementAssert",
        symbols: [{ literal: "assert" }, "expression"],
        postprocess: ([kw, e]) => new StmtNS.Assert(toAstToken(kw), e.endToken, e),
    },
    {
        name: "statementExpr",
        symbols: ["expression"],
        postprocess: ([e]) => new StmtNS.SimpleExpr(e.startToken, e.endToken, e),
    },
    {
        name: "statementWhile",
        symbols: [{ literal: "while" }, "expression", { literal: ":" }, "block"],
        postprocess: ([kw, test, , body]) => new StmtNS.While(toAstToken(kw), body[body.length - 1].endToken, test, body),
    },
    {
        name: "statementFor",
        symbols: [
            { literal: "for" },
            pythonLexer.has("name") ? { type: "name" } : name,
            { literal: "in" },
            "expression",
            { literal: ":" },
            "block",
        ],
        postprocess: ([kw, target, , iter, , body]) => new StmtNS.For(toAstToken(kw), body[body.length - 1].endToken, toAstToken(target), iter, body),
    },
    {
        name: "statementDef",
        symbols: [
            { literal: "def" },
            pythonLexer.has("name") ? { type: "name" } : name,
            "params",
            { literal: ":" },
            "block",
        ],
        postprocess: ([kw, name, params, , body]) => new StmtNS.FunctionDef(toAstToken(kw), body[body.length - 1].endToken, toAstToken(name), params, body, []),
    },
    { name: "if_statement$ebnf$1", symbols: [] },
    {
        name: "if_statement$ebnf$1$subexpression$1",
        symbols: [{ literal: "elif" }, "expression", { literal: ":" }, "block"],
    },
    {
        name: "if_statement$ebnf$1",
        symbols: ["if_statement$ebnf$1", "if_statement$ebnf$1$subexpression$1"],
        postprocess: function arrpush(d) {
            return d[0].concat([d[1]]);
        },
    },
    {
        name: "if_statement$ebnf$2$subexpression$1",
        symbols: [{ literal: "else" }, { literal: ":" }, "block"],
    },
    {
        name: "if_statement$ebnf$2",
        symbols: ["if_statement$ebnf$2$subexpression$1"],
        postprocess: id,
    },
    {
        name: "if_statement$ebnf$2",
        symbols: [],
        postprocess: function (d) {
            return null;
        },
    },
    {
        name: "if_statement",
        symbols: [
            { literal: "if" },
            "expression",
            { literal: ":" },
            "block",
            "if_statement$ebnf$1",
            "if_statement$ebnf$2",
        ],
        postprocess: ([kw, test, , body, elifs, elseBlock]) => {
            let else_ = elseBlock ? elseBlock[0][2] : null;
            for (let i = elifs.length - 1; i >= 0; i--) {
                const [ekw, etest, ecolon, ebody] = elifs[i];
                const endTok = else_ && else_.length > 0
                    ? else_[else_.length - 1].endToken
                    : ebody[ebody.length - 1].endToken;
                else_ = [new StmtNS.If(toAstToken(ekw), endTok, etest, ebody, else_)];
            }
            const endTok = else_ && else_.length > 0
                ? else_[else_.length - 1].endToken
                : body[body.length - 1].endToken;
            return new StmtNS.If(toAstToken(kw), endTok, test, body, else_);
        },
    },
    { name: "names$ebnf$1", symbols: [] },
    {
        name: "names$ebnf$1$subexpression$1",
        symbols: [{ literal: "," }, pythonLexer.has("name") ? { type: "name" } : name],
    },
    {
        name: "names$ebnf$1",
        symbols: ["names$ebnf$1", "names$ebnf$1$subexpression$1"],
        postprocess: function arrpush(d) {
            return d[0].concat([d[1]]);
        },
    },
    {
        name: "names",
        symbols: [pythonLexer.has("name") ? { type: "name" } : name, "names$ebnf$1"],
        postprocess: tokList,
    },
    {
        name: "block",
        symbols: ["blockInline", pythonLexer.has("newline") ? { type: "newline" } : newline],
        postprocess: list,
    },
    { name: "block$ebnf$1$subexpression$1", symbols: ["statement"] },
    {
        name: "block$ebnf$1$subexpression$1",
        symbols: [pythonLexer.has("newline") ? { type: "newline" } : newline],
    },
    { name: "block$ebnf$1", symbols: ["block$ebnf$1$subexpression$1"] },
    { name: "block$ebnf$1$subexpression$2", symbols: ["statement"] },
    {
        name: "block$ebnf$1$subexpression$2",
        symbols: [pythonLexer.has("newline") ? { type: "newline" } : newline],
    },
    {
        name: "block$ebnf$1",
        symbols: ["block$ebnf$1", "block$ebnf$1$subexpression$2"],
        postprocess: function arrpush(d) {
            return d[0].concat([d[1]]);
        },
    },
    {
        name: "block",
        symbols: [
            pythonLexer.has("newline") ? { type: "newline" } : newline,
            pythonLexer.has("indent") ? { type: "indent" } : indent,
            "block$ebnf$1",
            pythonLexer.has("dedent") ? { type: "dedent" } : dedent,
        ],
        postprocess: ([, , stmts]) => stmts.map(d => d[0]).filter(s => s && s.startToken !== undefined),
    },
    { name: "blockInline", symbols: ["statementAssign"], postprocess: id },
    { name: "blockInline", symbols: ["statementAnnAssign"], postprocess: id },
    { name: "blockInline", symbols: ["statementSubscriptAssign"], postprocess: id },
    { name: "blockInline", symbols: ["statementReturn"], postprocess: id },
    { name: "blockInline", symbols: ["statementPass"], postprocess: id },
    { name: "blockInline", symbols: ["statementBreak"], postprocess: id },
    { name: "blockInline", symbols: ["statementContinue"], postprocess: id },
    { name: "blockInline", symbols: ["statementGlobal"], postprocess: id },
    { name: "blockInline", symbols: ["statementNonlocal"], postprocess: id },
    { name: "blockInline", symbols: ["statementAssert"], postprocess: id },
    { name: "blockInline", symbols: ["statementExpr"], postprocess: id },
    {
        name: "rest_names",
        symbols: [pythonLexer.has("name") ? { type: "name" } : name],
        postprocess: ([t]) => {
            const tok = toAstToken(t);
            tok.isStarred = false;
            return [tok];
        },
    },
    {
        name: "rest_names",
        symbols: [{ literal: "*" }, pythonLexer.has("name") ? { type: "name" } : name],
        postprocess: ([, t]) => {
            const tok = toAstToken(t);
            tok.isStarred = true;
            return [tok];
        },
    },
    {
        name: "rest_names",
        symbols: ["rest_names", { literal: "," }, pythonLexer.has("name") ? { type: "name" } : name],
        postprocess: ([params, , t]) => {
            const tok = toAstToken(t);
            tok.isStarred = false;
            return [...params, tok];
        },
    },
    {
        name: "rest_names",
        symbols: [
            "rest_names",
            { literal: "," },
            { literal: "*" },
            pythonLexer.has("name") ? { type: "name" } : name,
        ],
        postprocess: ([params, , , t]) => {
            const tok = toAstToken(t);
            tok.isStarred = true;
            return [...params, tok];
        },
    },
    { name: "params", symbols: [{ literal: "(" }, { literal: ")" }], postprocess: drop },
    {
        name: "params",
        symbols: [{ literal: "(" }, "rest_names", { literal: ")" }],
        postprocess: ([, ps]) => ps,
    },
    {
        name: "expression",
        symbols: ["expressionOr", { literal: "if" }, "expressionOr", { literal: "else" }, "expression"],
        postprocess: ([cons, , test, , alt]) => new ExprNS.Ternary(cons.startToken, alt.endToken, test, cons, alt),
    },
    { name: "expression", symbols: ["expressionOr"], postprocess: id },
    { name: "expression", symbols: ["lambda_expr"], postprocess: id },
    {
        name: "expressionOr",
        symbols: ["expressionOr", { literal: "or" }, "expressionAnd"],
        postprocess: astBoolOp,
    },
    { name: "expressionOr", symbols: ["expressionAnd"], postprocess: id },
    {
        name: "expressionAnd",
        symbols: ["expressionAnd", { literal: "and" }, "expressionNot"],
        postprocess: astBoolOp,
    },
    { name: "expressionAnd", symbols: ["expressionNot"], postprocess: id },
    { name: "expressionNot", symbols: [{ literal: "not" }, "expressionNot"], postprocess: astUnary },
    { name: "expressionNot", symbols: ["expressionCmp"], postprocess: id },
    {
        name: "expressionCmp",
        symbols: ["expressionCmp", "expressionCmpOp", "expressionAdd"],
        postprocess: astCompare,
    },
    { name: "expressionCmp", symbols: ["expressionAdd"], postprocess: id },
    {
        name: "expressionCmpOp",
        symbols: [pythonLexer.has("less") ? { type: "less" } : less],
        postprocess: tok,
    },
    {
        name: "expressionCmpOp",
        symbols: [pythonLexer.has("greater") ? { type: "greater" } : greater],
        postprocess: tok,
    },
    {
        name: "expressionCmpOp",
        symbols: [pythonLexer.has("doubleequal") ? { type: "doubleequal" } : doubleequal],
        postprocess: tok,
    },
    {
        name: "expressionCmpOp",
        symbols: [pythonLexer.has("greaterequal") ? { type: "greaterequal" } : greaterequal],
        postprocess: tok,
    },
    {
        name: "expressionCmpOp",
        symbols: [pythonLexer.has("lessequal") ? { type: "lessequal" } : lessequal],
        postprocess: tok,
    },
    {
        name: "expressionCmpOp",
        symbols: [pythonLexer.has("notequal") ? { type: "notequal" } : notequal],
        postprocess: tok,
    },
    { name: "expressionCmpOp", symbols: [{ literal: "in" }], postprocess: tok },
    {
        name: "expressionCmpOp",
        symbols: [{ literal: "not" }, { literal: "in" }],
        postprocess: ([t]) => {
            const tok = toAstToken(t);
            tok.lexeme = "not in";
            return tok;
        },
    },
    { name: "expressionCmpOp", symbols: [{ literal: "is" }], postprocess: tok },
    {
        name: "expressionCmpOp",
        symbols: [{ literal: "is" }, { literal: "not" }],
        postprocess: ([t]) => {
            const tok = toAstToken(t);
            tok.lexeme = "is not";
            return tok;
        },
    },
    {
        name: "expressionAdd",
        symbols: ["expressionAdd", "expressionAddOp", "expressionMul"],
        postprocess: astBinary,
    },
    { name: "expressionAdd", symbols: ["expressionMul"], postprocess: id },
    {
        name: "expressionAddOp",
        symbols: [pythonLexer.has("plus") ? { type: "plus" } : plus],
        postprocess: tok,
    },
    {
        name: "expressionAddOp",
        symbols: [pythonLexer.has("minus") ? { type: "minus" } : minus],
        postprocess: tok,
    },
    {
        name: "expressionMul",
        symbols: ["expressionMul", "expressionMulOp", "expressionUnary"],
        postprocess: astBinary,
    },
    { name: "expressionMul", symbols: ["expressionUnary"], postprocess: id },
    {
        name: "expressionMulOp",
        symbols: [pythonLexer.has("star") ? { type: "star" } : star],
        postprocess: tok,
    },
    {
        name: "expressionMulOp",
        symbols: [pythonLexer.has("slash") ? { type: "slash" } : slash],
        postprocess: tok,
    },
    {
        name: "expressionMulOp",
        symbols: [pythonLexer.has("percent") ? { type: "percent" } : percent],
        postprocess: tok,
    },
    {
        name: "expressionMulOp",
        symbols: [pythonLexer.has("doubleslash") ? { type: "doubleslash" } : doubleslash],
        postprocess: tok,
    },
    {
        name: "expressionUnary",
        symbols: [pythonLexer.has("plus") ? { type: "plus" } : plus, "expressionUnary"],
        postprocess: astUnary,
    },
    {
        name: "expressionUnary",
        symbols: [pythonLexer.has("minus") ? { type: "minus" } : minus, "expressionUnary"],
        postprocess: astUnary,
    },
    { name: "expressionUnary", symbols: ["expressionPow"], postprocess: id },
    {
        name: "expressionPow",
        symbols: [
            "expressionPost",
            pythonLexer.has("doublestar") ? { type: "doublestar" } : doublestar,
            "expressionUnary",
        ],
        postprocess: astBinaryTok,
    },
    { name: "expressionPow", symbols: ["expressionPost"], postprocess: id },
    {
        name: "expressionPost",
        symbols: [
            "expressionPost",
            pythonLexer.has("lsqb") ? { type: "lsqb" } : lsqb,
            "expression",
            pythonLexer.has("rsqb") ? { type: "rsqb" } : rsqb,
        ],
        postprocess: ([obj, , idx, rsqb]) => new ExprNS.Subscript(obj.startToken, toAstToken(rsqb), obj, idx),
    },
    {
        name: "expressionPost",
        symbols: ["expressionPost", { literal: "(" }, "expressions", { literal: ")" }],
        postprocess: ([callee, , args, rparen]) => new ExprNS.Call(callee.startToken, toAstToken(rparen), callee, args),
    },
    {
        name: "expressionPost",
        symbols: ["expressionPost", { literal: "(" }, { literal: ")" }],
        postprocess: ([callee, , rparen]) => new ExprNS.Call(callee.startToken, toAstToken(rparen), callee, []),
    },
    { name: "expressionPost", symbols: ["atom"], postprocess: id },
    {
        name: "atom",
        symbols: [{ literal: "(" }, "expression", { literal: ")" }],
        postprocess: ([, e]) => new ExprNS.Grouping(e.startToken, e.endToken, e),
    },
    {
        name: "atom",
        symbols: [
            pythonLexer.has("lsqb") ? { type: "lsqb" } : lsqb,
            pythonLexer.has("rsqb") ? { type: "rsqb" } : rsqb,
        ],
        postprocess: ([l, r]) => new ExprNS.List(toAstToken(l), toAstToken(r), []),
    },
    {
        name: "atom",
        symbols: [
            pythonLexer.has("lsqb") ? { type: "lsqb" } : lsqb,
            "expressions",
            pythonLexer.has("rsqb") ? { type: "rsqb" } : rsqb,
        ],
        postprocess: ([l, elems, r]) => new ExprNS.List(toAstToken(l), toAstToken(r), elems),
    },
    {
        name: "atom",
        symbols: [pythonLexer.has("name") ? { type: "name" } : name],
        postprocess: astVariable,
    },
    {
        name: "atom",
        symbols: [pythonLexer.has("number_float") ? { type: "number_float" } : number_float],
        postprocess: ([t]) => {
            const tok = toAstToken(t);
            return new ExprNS.Literal(tok, tok, parseFloat(t.value));
        },
    },
    {
        name: "atom",
        symbols: [pythonLexer.has("number_int") ? { type: "number_int" } : number_int],
        postprocess: astBigInt,
    },
    {
        name: "atom",
        symbols: [pythonLexer.has("number_hex") ? { type: "number_hex" } : number_hex],
        postprocess: astBigInt,
    },
    {
        name: "atom",
        symbols: [pythonLexer.has("number_oct") ? { type: "number_oct" } : number_oct],
        postprocess: astBigInt,
    },
    {
        name: "atom",
        symbols: [pythonLexer.has("number_bin") ? { type: "number_bin" } : number_bin],
        postprocess: astBigInt,
    },
    {
        name: "atom",
        symbols: [pythonLexer.has("number_complex") ? { type: "number_complex" } : number_complex],
        postprocess: astComplex,
    },
    { name: "atom", symbols: ["stringLit"], postprocess: id },
    { name: "atom", symbols: [{ literal: "None" }], postprocess: astNone },
    { name: "atom", symbols: [{ literal: "True" }], postprocess: astTrue },
    { name: "atom", symbols: [{ literal: "False" }], postprocess: astFalse },
    {
        name: "lambda_expr",
        symbols: [{ literal: "lambda" }, "names", { literal: ":" }, "expression"],
        postprocess: ([kw, params, , body]) => new ExprNS.Lambda(toAstToken(kw), body.endToken, params, body),
    },
    {
        name: "lambda_expr",
        symbols: [
            { literal: "lambda" },
            "names",
            pythonLexer.has("doublecolon") ? { type: "doublecolon" } : doublecolon,
            "block",
        ],
        postprocess: ([kw, params, , body]) => new ExprNS.MultiLambda(toAstToken(kw), body[body.length - 1].endToken, params, body, []),
    },
    {
        name: "lambda_expr",
        symbols: [{ literal: "lambda" }, { literal: ":" }, "expression"],
        postprocess: ([kw, , body]) => new ExprNS.Lambda(toAstToken(kw), body.endToken, [], body),
    },
    {
        name: "lambda_expr",
        symbols: [
            { literal: "lambda" },
            pythonLexer.has("doublecolon") ? { type: "doublecolon" } : doublecolon,
            "block",
        ],
        postprocess: ([kw, , body]) => new ExprNS.MultiLambda(toAstToken(kw), body[body.length - 1].endToken, [], body, []),
    },
    { name: "expressions$ebnf$1", symbols: [] },
    { name: "expressions$ebnf$1$subexpression$1", symbols: [{ literal: "," }, "expression"] },
    {
        name: "expressions$ebnf$1",
        symbols: ["expressions$ebnf$1", "expressions$ebnf$1$subexpression$1"],
        postprocess: function arrpush(d) {
            return d[0].concat([d[1]]);
        },
    },
    { name: "expressions$ebnf$2$subexpression$1", symbols: [{ literal: "," }] },
    { name: "expressions$ebnf$2", symbols: ["expressions$ebnf$2$subexpression$1"], postprocess: id },
    {
        name: "expressions$ebnf$2",
        symbols: [],
        postprocess: function (d) {
            return null;
        },
    },
    {
        name: "expressions",
        symbols: ["expression", "expressions$ebnf$1", "expressions$ebnf$2"],
        postprocess: flatList,
    },
    {
        name: "stringLit",
        symbols: [
            pythonLexer.has("string_triple_double")
                ? { type: "string_triple_double" }
                : string_triple_double,
        ],
        postprocess: astString,
    },
    {
        name: "stringLit",
        symbols: [
            pythonLexer.has("string_triple_single")
                ? { type: "string_triple_single" }
                : string_triple_single,
        ],
        postprocess: astString,
    },
    {
        name: "stringLit",
        symbols: [pythonLexer.has("string_double") ? { type: "string_double" } : string_double],
        postprocess: astString,
    },
    {
        name: "stringLit",
        symbols: [pythonLexer.has("string_single") ? { type: "string_single" } : string_single],
        postprocess: astString,
    },
];
let ParserStart = "program";
var grammar = { Lexer, ParserRules, ParserStart };

/**
 * Adapter for Nearley parser to match the interface of the old hand-written parser
 */
/**
 * NearleyParser - Drop-in replacement for the old Parser class
 */
class NearleyParser {
    constructor(source, _tokens) {
        // Note: Nearley doesn't use pre-tokenized input in the same way
        // The lexer is integrated into the parser
        this.source = source;
    }
    /**
     * Parse the source code and return the AST
     */
    parse() {
        // Create a new parser instance with our grammar
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled({
            ...grammar,
            Lexer: pythonLexer,
        }));
        try {
            // Feed the source code to the parser
            parser.feed(this.source);
            // Check if we got results
            if (parser.results.length === 0) {
                throw new Error("Unexpected end of input - no parse results");
            }
            // Ambiguous grammar is a bug — fail loudly so tests catch it
            if (parser.results.length > 1) {
                throw new Error(`Ambiguous grammar: ${parser.results.length} possible parses for input`);
            }
            // Return the first (or only) parse result
            return parser.results[0];
        }
        catch (error) {
            // Transform Nearley errors to match our error format
            const err = error;
            if (err.token) {
                const token = err.token;
                const line = token.line || 0;
                const col = token.col || 0;
                throw new ParseError(`Unexpected token: ${token.value || token.type} at line ${line}, column ${col}`, line, col, this.source);
            }
            throw error;
        }
    }
}
/**
 * Error class for parse errors
 */
class ParseError extends SyntaxError {
    constructor(message, line, col, source) {
        super(message);
        this.name = "ParseError";
        this.line = line;
        this.col = col;
        this.source = source;
    }
}
/**
 * Convenience function to parse Python source code
 */
function parse(source) {
    const parser = new NearleyParser(source);
    return parser.parse();
}

var ResolverErrors;
(function (ResolverErrors) {
    class BaseResolverError extends SyntaxError {
        constructor(name, message, line, col) {
            super(`${name} at line ${line}
                   ${message}`);
            this.line = line;
            this.col = col;
            this.name = "BaseResolverError";
        }
    }
    ResolverErrors.BaseResolverError = BaseResolverError;
    class NameNotFoundError extends BaseResolverError {
        constructor(line, col, source, start, current, suggestion) {
            const { lineIndex, fullLine } = getFullLine(source, start);
            let hint = ` This name is not found in the current or enclosing environment(s).`;
            const diff = current - start;
            hint = hint.padStart(hint.length + diff - MAGIC_OFFSET + 1, "^");
            hint = hint.padStart(hint.length + col - diff, " ");
            if (suggestion !== null) {
                let sugg = ` Perhaps you meant to type '${suggestion}'?`;
                sugg = sugg.padStart(sugg.length + col - MAGIC_OFFSET + 1, " ");
                sugg = "\n" + sugg;
                hint += sugg;
            }
            const name = "NameNotFoundError";
            super(name, "\n" + fullLine + "\n" + hint, lineIndex, col);
            this.name = "NameNotFoundError";
        }
    }
    ResolverErrors.NameNotFoundError = NameNotFoundError;
    class NameReassignmentError extends BaseResolverError {
        constructor(line, col, source, start, current, oldName) {
            const { lineIndex, fullLine } = getFullLine(source, start);
            let hint = ` A name has been declared here.`;
            const diff = current - start;
            hint = hint.padStart(hint.length + diff - MAGIC_OFFSET + 1, "^");
            hint = hint.padStart(hint.length + col - diff, " ");
            const { lineIndex: oldLine, fullLine: oldUnpaddedNameLine } = getFullLine(source, oldName.indexInSource);
            const oldNameLine = "\n" + oldUnpaddedNameLine + "\n";
            let sugg = ` However, it has already been declared in the same environment at line ${oldLine}, here: `;
            sugg = sugg.padStart(sugg.length + col - MAGIC_OFFSET + 1, " ");
            sugg = "\n" + sugg;
            hint += sugg;
            oldNameLine.padStart(oldNameLine.length + col - MAGIC_OFFSET + 1, " ");
            hint += oldNameLine;
            const name = "NameReassignmentError";
            super(name, "\n" + fullLine + "\n" + hint, lineIndex, col);
            this.name = "NameReassignmentError";
        }
    }
    ResolverErrors.NameReassignmentError = NameReassignmentError;
})(ResolverErrors || (ResolverErrors = {}));

var levenshtein$1 = {exports: {}};

const peq = new Uint32Array(0x10000);
const myers_32 = (a, b) => {
    const n = a.length;
    const m = b.length;
    const lst = 1 << (n - 1);
    let pv = -1;
    let mv = 0;
    let sc = n;
    let i = n;
    while (i--) {
        peq[a.charCodeAt(i)] |= 1 << i;
    }
    for (i = 0; i < m; i++) {
        let eq = peq[b.charCodeAt(i)];
        const xv = eq | mv;
        eq |= ((eq & pv) + pv) ^ pv;
        mv |= ~(eq | pv);
        pv &= eq;
        if (mv & lst) {
            sc++;
        }
        if (pv & lst) {
            sc--;
        }
        mv = (mv << 1) | 1;
        pv = (pv << 1) | ~(xv | mv);
        mv &= xv;
    }
    i = n;
    while (i--) {
        peq[a.charCodeAt(i)] = 0;
    }
    return sc;
};
const myers_x = (b, a) => {
    const n = a.length;
    const m = b.length;
    const mhc = [];
    const phc = [];
    const hsize = Math.ceil(n / 32);
    const vsize = Math.ceil(m / 32);
    for (let i = 0; i < hsize; i++) {
        phc[i] = -1;
        mhc[i] = 0;
    }
    let j = 0;
    for (; j < vsize - 1; j++) {
        let mv = 0;
        let pv = -1;
        const start = j * 32;
        const vlen = Math.min(32, m) + start;
        for (let k = start; k < vlen; k++) {
            peq[b.charCodeAt(k)] |= 1 << k;
        }
        for (let i = 0; i < n; i++) {
            const eq = peq[a.charCodeAt(i)];
            const pb = (phc[(i / 32) | 0] >>> i) & 1;
            const mb = (mhc[(i / 32) | 0] >>> i) & 1;
            const xv = eq | mv;
            const xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;
            let ph = mv | ~(xh | pv);
            let mh = pv & xh;
            if ((ph >>> 31) ^ pb) {
                phc[(i / 32) | 0] ^= 1 << i;
            }
            if ((mh >>> 31) ^ mb) {
                mhc[(i / 32) | 0] ^= 1 << i;
            }
            ph = (ph << 1) | pb;
            mh = (mh << 1) | mb;
            pv = mh | ~(xv | ph);
            mv = ph & xv;
        }
        for (let k = start; k < vlen; k++) {
            peq[b.charCodeAt(k)] = 0;
        }
    }
    let mv = 0;
    let pv = -1;
    const start = j * 32;
    const vlen = Math.min(32, m - start) + start;
    for (let k = start; k < vlen; k++) {
        peq[b.charCodeAt(k)] |= 1 << k;
    }
    let score = m;
    for (let i = 0; i < n; i++) {
        const eq = peq[a.charCodeAt(i)];
        const pb = (phc[(i / 32) | 0] >>> i) & 1;
        const mb = (mhc[(i / 32) | 0] >>> i) & 1;
        const xv = eq | mv;
        const xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;
        let ph = mv | ~(xh | pv);
        let mh = pv & xh;
        score += (ph >>> (m - 1)) & 1;
        score -= (mh >>> (m - 1)) & 1;
        if ((ph >>> 31) ^ pb) {
            phc[(i / 32) | 0] ^= 1 << i;
        }
        if ((mh >>> 31) ^ mb) {
            mhc[(i / 32) | 0] ^= 1 << i;
        }
        ph = (ph << 1) | pb;
        mh = (mh << 1) | mb;
        pv = mh | ~(xv | ph);
        mv = ph & xv;
    }
    for (let k = start; k < vlen; k++) {
        peq[b.charCodeAt(k)] = 0;
    }
    return score;
};
const distance = (a, b) => {
    if (a.length < b.length) {
        const tmp = b;
        b = a;
        a = tmp;
    }
    if (b.length === 0) {
        return a.length;
    }
    if (a.length <= 32) {
        return myers_32(a, b);
    }
    return myers_x(a, b);
};
const closest = (str, arr) => {
    let min_distance = Infinity;
    let min_index = 0;
    for (let i = 0; i < arr.length; i++) {
        const dist = distance(str, arr[i]);
        if (dist < min_distance) {
            min_distance = dist;
            min_index = i;
        }
    }
    return arr[min_index];
};

var mod = /*#__PURE__*/Object.freeze({
	__proto__: null,
	closest: closest,
	distance: distance
});

var require$$0 = /*@__PURE__*/getAugmentedNamespace(mod);

var hasRequiredLevenshtein;

function requireLevenshtein () {
	if (hasRequiredLevenshtein) return levenshtein$1.exports;
	hasRequiredLevenshtein = 1;
	(function (module, exports$1) {
		(function() {
		  
		  var collator;
		  try {
		    collator = (typeof Intl !== "undefined" && typeof Intl.Collator !== "undefined") ? Intl.Collator("generic", { sensitivity: "base" }) : null;
		  } catch (err){
		    console.log("Collator could not be initialized and wouldn't be used");
		  }

		  var levenshtein = require$$0;

		  // arrays to re-use
		  var prevRow = [],
		    str2Char = [];
		  
		  /**
		   * Based on the algorithm at http://en.wikipedia.org/wiki/Levenshtein_distance.
		   */
		  var Levenshtein = {
		    /**
		     * Calculate levenshtein distance of the two strings.
		     *
		     * @param str1 String the first string.
		     * @param str2 String the second string.
		     * @param [options] Additional options.
		     * @param [options.useCollator] Use `Intl.Collator` for locale-sensitive string comparison.
		     * @return Integer the levenshtein distance (0 and above).
		     */
		    get: function(str1, str2, options) {
		      var useCollator = (options && collator && options.useCollator);
		      
		      if (useCollator) {
		        var str1Len = str1.length,
		          str2Len = str2.length;
		        
		        // base cases
		        if (str1Len === 0) return str2Len;
		        if (str2Len === 0) return str1Len;

		        // two rows
		        var curCol, nextCol, i, j, tmp;

		        // initialise previous row
		        for (i=0; i<str2Len; ++i) {
		          prevRow[i] = i;
		          str2Char[i] = str2.charCodeAt(i);
		        }
		        prevRow[str2Len] = str2Len;

		        var strCmp;
		        // calculate current row distance from previous row using collator
		        for (i = 0; i < str1Len; ++i) {
		          nextCol = i + 1;

		          for (j = 0; j < str2Len; ++j) {
		            curCol = nextCol;

		            // substution
		            strCmp = 0 === collator.compare(str1.charAt(i), String.fromCharCode(str2Char[j]));

		            nextCol = prevRow[j] + (strCmp ? 0 : 1);

		            // insertion
		            tmp = curCol + 1;
		            if (nextCol > tmp) {
		              nextCol = tmp;
		            }
		            // deletion
		            tmp = prevRow[j + 1] + 1;
		            if (nextCol > tmp) {
		              nextCol = tmp;
		            }

		            // copy current col value into previous (in preparation for next iteration)
		            prevRow[j] = curCol;
		          }

		          // copy last col value into previous (in preparation for next iteration)
		          prevRow[j] = nextCol;
		        }
		        return nextCol;
		      }
		      return levenshtein.distance(str1, str2);
		    }

		  };

		  // amd
		  if (module !== null && 'object' !== "undefined" && module.exports === exports$1) {
		    module.exports = Levenshtein;
		  }
		  // web worker
		  else if (typeof self !== "undefined" && typeof self.postMessage === 'function' && typeof self.importScripts === 'function') {
		    self.Levenshtein = Levenshtein;
		  }
		  // browser main thread
		  else if (typeof window !== "undefined" && window !== null) {
		    window.Levenshtein = Levenshtein;
		  }
		}()); 
	} (levenshtein$1, levenshtein$1.exports));
	return levenshtein$1.exports;
}

var levenshteinExports = requireLevenshtein();
var levenshtein = /*@__PURE__*/getDefaultExportFromCjs(levenshteinExports);

// const levenshtein = require('fast-levenshtein');
const RedefineableTokenSentinel = new Token(TokenType.AT, "", 0, 0, 0);
class Environment {
    constructor(source, enclosing, names) {
        this.source = source;
        this.enclosing = enclosing;
        this.names = names;
        this.functions = new Set();
        this.moduleBindings = new Set();
        this.definedNames = new Set();
    }
    /*
     * Does a full lookup up the environment chain for a name.
     * Returns the distance of the name from the current environment.
     * If name isn't found, return -1.
     * */
    lookupName(identifier) {
        const name = identifier.lexeme;
        let distance = 0;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let curr = this;
        while (curr !== null) {
            if (curr.names.has(name)) {
                break;
            }
            distance += 1;
            curr = curr.enclosing;
        }
        return curr === null ? -1 : distance;
    }
    /* Looks up the name but only for the current environment. */
    lookupNameCurrentEnv(identifier) {
        return this.names.get(identifier.lexeme);
    }
    lookupNameCurrentEnvWithError(identifier) {
        if (this.lookupName(identifier) < 0) {
            throw new ResolverErrors.NameNotFoundError(identifier.line, identifier.col, this.source, identifier.indexInSource, identifier.indexInSource + identifier.lexeme.length, this.suggestName(identifier));
        }
    }
    lookupNameParentEnvWithError(identifier) {
        const name = identifier.lexeme;
        const parent = this.enclosing;
        if (parent === null || !parent.names.has(name)) {
            throw new ResolverErrors.NameNotFoundError(identifier.line, identifier.col, this.source, identifier.indexInSource, identifier.indexInSource + name.length, this.suggestName(identifier));
        }
    }
    declareName(identifier) {
        this.names.set(identifier.lexeme, identifier);
        this.definedNames.add(identifier.lexeme);
    }
    // Same as declareName but allowed to re-declare later.
    declarePlaceholderName(identifier) {
        const lookup = this.lookupNameCurrentEnv(identifier);
        if (lookup !== undefined) {
            throw new ResolverErrors.NameReassignmentError(identifier.line, identifier.col, this.source, identifier.indexInSource, identifier.indexInSource + identifier.lexeme.length, lookup);
        }
        this.names.set(identifier.lexeme, RedefineableTokenSentinel);
    }
    suggestNameCurrentEnv(identifier) {
        const name = identifier.lexeme;
        let minDistance = Infinity;
        let minName = null;
        for (const declName of this.names.keys()) {
            const dist = levenshtein.get(name, declName);
            if (dist < minDistance) {
                minDistance = dist;
                minName = declName;
            }
        }
        return minName;
    }
    /*
     * Finds name closest to name in all environments up to builtin environment.
     * Calculated using min levenshtein distance.
     * */
    suggestName(identifier) {
        const name = identifier.lexeme;
        let minDistance = Infinity;
        let minName = null;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let curr = this;
        while (curr !== null) {
            for (const declName of curr.names.keys()) {
                const dist = levenshtein.get(name, declName);
                if (dist < minDistance) {
                    minDistance = dist;
                    minName = declName;
                }
            }
            curr = curr.enclosing;
        }
        if (minDistance >= 4) {
            // This is pretty far, so just return null
            return null;
        }
        return minName;
    }
}
class Resolver {
    constructor(source, ast, validators = []) {
        this.source = source;
        this.ast = ast;
        this.validators = validators;
        // The global environment
        this.environment = new Environment(source, null, new Map([
            // misc library
            ["_int", new Token(TokenType.NAME, "_int", 0, 0, 0)],
            ["_int_from_string", new Token(TokenType.NAME, "_int_from_string", 0, 0, 0)],
            ["abs", new Token(TokenType.NAME, "abs", 0, 0, 0)],
            ["char_at", new Token(TokenType.NAME, "char_at", 0, 0, 0)],
            ["error", new Token(TokenType.NAME, "error", 0, 0, 0)],
            ["input", new Token(TokenType.NAME, "input", 0, 0, 0)],
            ["isinstance", new Token(TokenType.NAME, "isinstance", 0, 0, 0)],
            ["max", new Token(TokenType.NAME, "max", 0, 0, 0)],
            ["min", new Token(TokenType.NAME, "min", 0, 0, 0)],
            ["print", new Token(TokenType.NAME, "print", 0, 0, 0)],
            ["range", new Token(TokenType.NAME, "range", 0, 0, 0)],
            ["random_random", new Token(TokenType.NAME, "random_random", 0, 0, 0)],
            ["round", new Token(TokenType.NAME, "round", 0, 0, 0)],
            ["str", new Token(TokenType.NAME, "str", 0, 0, 0)],
            ["time_time", new Token(TokenType.NAME, "time_time", 0, 0, 0)],
            // math constants
            ["math_pi", new Token(TokenType.NAME, "math_pi", 0, 0, 0)],
            ["math_e", new Token(TokenType.NAME, "math_e", 0, 0, 0)],
            ["math_inf", new Token(TokenType.NAME, "math_inf", 0, 0, 0)],
            ["math_nan", new Token(TokenType.NAME, "math_nan", 0, 0, 0)],
            ["math_tau", new Token(TokenType.NAME, "math_tau", 0, 0, 0)],
            // math library
            ["math_acos", new Token(TokenType.NAME, "math_acos", 0, 0, 0)],
            ["math_acosh", new Token(TokenType.NAME, "math_acosh", 0, 0, 0)],
            ["math_asin", new Token(TokenType.NAME, "math_asin", 0, 0, 0)],
            ["math_asinh", new Token(TokenType.NAME, "math_asinh", 0, 0, 0)],
            ["math_atan", new Token(TokenType.NAME, "math_atan", 0, 0, 0)],
            ["math_atan2", new Token(TokenType.NAME, "math_atan2", 0, 0, 0)],
            ["math_atanh", new Token(TokenType.NAME, "math_atanh", 0, 0, 0)],
            ["math_cbrt", new Token(TokenType.NAME, "math_cbrt", 0, 0, 0)],
            ["math_ceil", new Token(TokenType.NAME, "math_ceil", 0, 0, 0)],
            ["math_comb", new Token(TokenType.NAME, "math_comb", 0, 0, 0)],
            ["math_copysign", new Token(TokenType.NAME, "math_copysign", 0, 0, 0)],
            ["math_cos", new Token(TokenType.NAME, "math_cos", 0, 0, 0)],
            ["math_cosh", new Token(TokenType.NAME, "math_cosh", 0, 0, 0)],
            ["math_degrees", new Token(TokenType.NAME, "math_degrees", 0, 0, 0)],
            ["math_erf", new Token(TokenType.NAME, "math_erf", 0, 0, 0)],
            ["math_erfc", new Token(TokenType.NAME, "math_erfc", 0, 0, 0)],
            ["math_exp", new Token(TokenType.NAME, "math_exp", 0, 0, 0)],
            ["math_exp2", new Token(TokenType.NAME, "math_exp2", 0, 0, 0)],
            ["math_expm1", new Token(TokenType.NAME, "math_expm1", 0, 0, 0)],
            ["math_fabs", new Token(TokenType.NAME, "math_fabs", 0, 0, 0)],
            ["math_factorial", new Token(TokenType.NAME, "math_factorial", 0, 0, 0)],
            ["math_floor", new Token(TokenType.NAME, "math_floor", 0, 0, 0)],
            ["math_fma", new Token(TokenType.NAME, "math_fma", 0, 0, 0)],
            ["math_fmod", new Token(TokenType.NAME, "math_fmod", 0, 0, 0)],
            ["math_gamma", new Token(TokenType.NAME, "math_gamma", 0, 0, 0)],
            ["math_gcd", new Token(TokenType.NAME, "math_gcd", 0, 0, 0)],
            ["math_isfinite", new Token(TokenType.NAME, "math_isfinite", 0, 0, 0)],
            ["math_isinf", new Token(TokenType.NAME, "math_isinf", 0, 0, 0)],
            ["math_isnan", new Token(TokenType.NAME, "math_isnan", 0, 0, 0)],
            ["math_isqrt", new Token(TokenType.NAME, "math_isqrt", 0, 0, 0)],
            ["math_lcm", new Token(TokenType.NAME, "math_lcm", 0, 0, 0)],
            ["math_ldexp", new Token(TokenType.NAME, "math_ldexp", 0, 0, 0)],
            ["math_lgamma", new Token(TokenType.NAME, "math_lgamma", 0, 0, 0)],
            ["math_log", new Token(TokenType.NAME, "math_log", 0, 0, 0)],
            ["math_log10", new Token(TokenType.NAME, "math_log10", 0, 0, 0)],
            ["math_log1p", new Token(TokenType.NAME, "math_log1p", 0, 0, 0)],
            ["math_log2", new Token(TokenType.NAME, "math_log2", 0, 0, 0)],
            ["math_nextafter", new Token(TokenType.NAME, "math_nextafter", 0, 0, 0)],
            ["math_perm", new Token(TokenType.NAME, "math_perm", 0, 0, 0)],
            ["math_pow", new Token(TokenType.NAME, "math_pow", 0, 0, 0)],
            ["math_radians", new Token(TokenType.NAME, "math_radians", 0, 0, 0)],
            ["math_remainder", new Token(TokenType.NAME, "math_remainder", 0, 0, 0)],
            ["math_sin", new Token(TokenType.NAME, "math_sin", 0, 0, 0)],
            ["math_sinh", new Token(TokenType.NAME, "math_sinh", 0, 0, 0)],
            ["math_sqrt", new Token(TokenType.NAME, "math_sqrt", 0, 0, 0)],
            ["math_tan", new Token(TokenType.NAME, "math_tan", 0, 0, 0)],
            ["math_tanh", new Token(TokenType.NAME, "math_tanh", 0, 0, 0)],
            ["math_trunc", new Token(TokenType.NAME, "math_trunc", 0, 0, 0)],
            ["math_ulp", new Token(TokenType.NAME, "math_ulp", 0, 0, 0)],
        ]));
        this.functionScope = null;
    }
    runValidators(node) {
        for (const v of this.validators)
            v.validate(node, this.environment ?? undefined);
    }
    resolve(stmt) {
        if (stmt === null) {
            return;
        }
        if (stmt instanceof Array) {
            // Resolve all top-level functions first. Python allows functions declared after
            // another function to be used in that function.
            for (const st of stmt) {
                if (st instanceof StmtNS.FunctionDef) {
                    this.environment?.declarePlaceholderName(st.name);
                }
            }
            for (const st of stmt) {
                this.runValidators(st);
                st.accept(this);
            }
        }
        else {
            this.runValidators(stmt);
            stmt.accept(this);
        }
    }
    varDeclNames(names) {
        const res = Array.from(names.values()).filter(name => 
        // Filter out functions and module bindings.
        // Those will be handled separately, so they don't
        // need to be hoisted.
        !this.environment?.functions.has(name.lexeme) &&
            !this.environment?.moduleBindings.has(name.lexeme));
        return res.length === 0 ? null : res;
    }
    functionVarConstraint(identifier) {
        if (this.functionScope == null) {
            return;
        }
        let curr = this.environment;
        while (curr !== this.functionScope) {
            if (curr !== null && curr.names.has(identifier.lexeme)) {
                const token = curr.names.get(identifier.lexeme);
                if (token === undefined) {
                    throw new Error("placeholder error");
                }
                throw new ResolverErrors.NameReassignmentError(identifier.line, identifier.col, this.source, identifier.indexInSource, identifier.indexInSource + identifier.lexeme.length, token);
            }
            curr = curr?.enclosing ?? null;
        }
    }
    //// STATEMENTS
    visitFileInputStmt(stmt) {
        // Create a new environment.
        const oldEnv = this.environment;
        this.environment = new Environment(this.source, this.environment, new Map());
        this.resolve(stmt.statements);
        // Grab identifiers from that new environment. That are NOT functions.
        // stmt.varDecls = this.varDeclNames(this.environment.names)
        this.environment = oldEnv;
    }
    visitFunctionDefStmt(stmt) {
        this.environment?.declareName(stmt.name);
        this.environment?.functions.add(stmt.name.lexeme);
        // Create a new environment.
        const oldEnv = this.environment;
        // Assign the parameters to the new environment.
        const newEnv = new Map(stmt.parameters.map(param => [param.lexeme, param]));
        this.environment = new Environment(this.source, this.environment, newEnv);
        // const params = new Map(
        //     stmt.parameters.map(param => [param.lexeme, param])
        // );
        // if (this.environment !== null) {
        //     this.environment.names = params;
        // }
        this.functionScope = this.environment;
        this.resolve(stmt.body);
        // Grab identifiers from that new environment. That are NOT functions.
        // stmt.varDecls = this.varDeclNames(this.environment.names)
        // Restore old environment
        this.functionScope = null;
        this.environment = oldEnv;
    }
    visitAnnAssignStmt(stmt) {
        this.resolve(stmt.ann);
        this.resolve(stmt.value);
        this.functionVarConstraint(stmt.target.name);
        this.environment?.declareName(stmt.target.name);
    }
    visitAssignStmt(stmt) {
        const target = stmt.target;
        if (target instanceof ExprNS.Subscript) {
            this.resolve(target); // dispatches to visitSubscriptExpr
            this.resolve(stmt.value);
            return;
        }
        this.resolve(stmt.value);
        this.functionVarConstraint(target.name);
        this.environment?.declareName(target.name);
    }
    visitAssertStmt(stmt) {
        this.resolve(stmt.value);
    }
    visitForStmt(stmt) {
        this.environment?.declareName(stmt.target);
        this.resolve(stmt.iter);
        this.resolve(stmt.body);
    }
    visitIfStmt(stmt) {
        this.resolve(stmt.condition);
        this.resolve(stmt.body);
        this.resolve(stmt.elseBlock);
    }
    // @TODO we need to treat all global statements as variable declarations in the global
    // scope.
    visitGlobalStmt(_stmt) {
        // Do nothing because global can also be declared in our
        // own scope.
    }
    // @TODO nonlocals mean that any variable following that name in the current env
    // should not create a variable declaration, but instead point to an outer variable.
    visitNonLocalStmt(stmt) {
        this.environment?.lookupNameParentEnvWithError(stmt.name);
    }
    visitReturnStmt(stmt) {
        if (stmt.value !== null) {
            this.resolve(stmt.value);
        }
    }
    visitWhileStmt(stmt) {
        this.resolve(stmt.condition);
        this.resolve(stmt.body);
    }
    visitSimpleExprStmt(stmt) {
        this.resolve(stmt.expression);
    }
    visitFromImportStmt(stmt) {
        for (const entry of stmt.names) {
            const binding = entry.alias ?? entry.name;
            this.environment?.declareName(binding);
            this.environment?.moduleBindings.add(binding.lexeme);
        }
    }
    visitContinueStmt(_stmt) { }
    visitBreakStmt(_stmt) { }
    visitPassStmt(_stmt) { }
    //// EXPRESSIONS
    visitVariableExpr(expr) {
        this.environment?.lookupNameCurrentEnvWithError(expr.name);
    }
    visitLambdaExpr(expr) {
        // Create a new environment.
        const oldEnv = this.environment;
        // Assign the parameters to the new environment.
        const newEnv = new Map(expr.parameters.map(param => [param.lexeme, param]));
        this.environment = new Environment(this.source, this.environment, newEnv);
        this.resolve(expr.body);
        // Restore old environment
        this.environment = oldEnv;
    }
    visitMultiLambdaExpr(expr) {
        // Create a new environment.
        const oldEnv = this.environment;
        // Assign the parameters to the new environment.
        const newEnv = new Map(expr.parameters.map(param => [param.lexeme, param]));
        this.environment = new Environment(this.source, this.environment, newEnv);
        this.resolve(expr.body);
        // Grab identifiers from that new environment.
        expr.varDecls = Array.from(this.environment.names.values());
        // Restore old environment
        this.environment = oldEnv;
    }
    visitUnaryExpr(expr) {
        this.resolve(expr.right);
    }
    visitGroupingExpr(expr) {
        this.resolve(expr.expression);
    }
    visitBinaryExpr(expr) {
        this.resolve(expr.left);
        this.resolve(expr.right);
    }
    visitBoolOpExpr(expr) {
        this.resolve(expr.left);
        this.resolve(expr.right);
    }
    visitCompareExpr(expr) {
        this.resolve(expr.left);
        this.resolve(expr.right);
    }
    visitCallExpr(expr) {
        this.resolve(expr.callee);
        this.resolve(expr.args);
    }
    visitTernaryExpr(expr) {
        this.resolve(expr.predicate);
        this.resolve(expr.consequent);
        this.resolve(expr.alternative);
    }
    visitNoneExpr(_expr) { }
    visitLiteralExpr(_expr) { }
    visitBigIntLiteralExpr(_expr) { }
    visitComplexExpr(_expr) { }
    visitListExpr(expr) {
        this.resolve(expr.elements);
    }
    visitSubscriptExpr(expr) {
        this.resolve(expr.value);
        this.resolve(expr.index);
    }
}

class FeatureNotSupportedError extends Error {
    constructor(feature, node) {
        const tok = node.startToken;
        super(`Feature not supported in this sublanguage: ${feature} (line ${tok.line}, col ${tok.col})`);
        this.name = "FeatureNotSupportedError";
        this.feature = feature;
        this.node = node;
    }
}

const NoListsValidator = {
    validate(node) {
        if (node instanceof ExprNS.List) {
            throw new FeatureNotSupportedError("list literals", node);
        }
        if (node instanceof ExprNS.Subscript) {
            throw new FeatureNotSupportedError("subscript expressions", node);
        }
    },
};

const NoLoopsValidator = {
    validate(node) {
        if (node instanceof StmtNS.While) {
            throw new FeatureNotSupportedError("while loops", node);
        }
        if (node instanceof StmtNS.For) {
            throw new FeatureNotSupportedError("for loops", node);
        }
    },
};

/**
 * Scope-aware validator that throws NameReassignmentError if a name is assigned more than once
 * within the same scope. Uses a WeakMap keyed on Environment so nested scopes are isolated.
 * Must be run inside the Resolver (with env passed) to work correctly.
 */
function createNoReassignmentValidator() {
    const declaredPerScope = new WeakMap();
    return {
        validate(node, env) {
            if (!env)
                return;
            let target = null;
            if (node instanceof StmtNS.Assign) {
                // Subscript assignment (e.g. xs[0] = 1) is not a name reassignment
                if (node.target instanceof ExprNS.Subscript)
                    return;
                if (node.target instanceof ExprNS.Variable) {
                    target = node.target;
                }
            }
            else if (node instanceof StmtNS.AnnAssign) {
                target = node.target;
            }
            else {
                return;
            }
            if (!target)
                return;
            let declared = declaredPerScope.get(env);
            if (!declared) {
                declared = new Set();
                declaredPerScope.set(env, declared);
            }
            const name = target.name.lexeme;
            if (declared.has(name)) {
                throw new ResolverErrors.NameReassignmentError(target.name.line, target.name.col, env.source, target.name.indexInSource, target.name.indexInSource + name.length, env.names.get(name));
            }
            declared.add(name);
        },
    };
}

const NoBreakContinueValidator = {
    validate(node) {
        if (node instanceof StmtNS.Break) {
            throw new FeatureNotSupportedError("break statements", node);
        }
        if (node instanceof StmtNS.Continue) {
            throw new FeatureNotSupportedError("continue statements", node);
        }
    },
};

const NoNonlocalValidator = {
    validate(node) {
        if (node instanceof StmtNS.NonLocal) {
            throw new FeatureNotSupportedError("nonlocal statements", node);
        }
    },
};

const ForRangeOnlyValidator = {
    validate(node) {
        if (!(node instanceof StmtNS.For))
            return;
        const iter = node.iter;
        if (iter instanceof ExprNS.Call &&
            iter.callee instanceof ExprNS.Variable &&
            iter.callee.name.lexeme === "range" &&
            iter.args.length >= 1 &&
            iter.args.length <= 3) {
            return; // Valid: for x in range(...)
        }
        throw new FeatureNotSupportedError("for loops must use range() — e.g. for i in range(n)", node);
    },
};

const NoRestParamsValidator = {
    validate(node) {
        if (node instanceof StmtNS.FunctionDef) {
            for (const param of node.parameters) {
                if (param.isStarred) {
                    throw new FeatureNotSupportedError("rest parameters (*name)", node);
                }
            }
        }
    },
};

/**
 * Source Chapter 1: no lists, no loops, no reassignment, no break/continue, no nonlocal, no rest params.
 * Factory function returns a fresh set of validators (stateful ones reset each time).
 */
function makeChapter1Validators() {
    return [
        NoListsValidator,
        NoLoopsValidator,
        createNoReassignmentValidator(),
        NoBreakContinueValidator,
        NoNonlocalValidator,
        NoRestParamsValidator,
    ];
}
/**
 * Source Chapter 2: no lists, no loops, no reassignment, no break/continue, no nonlocal, no rest params.
 * Linked-list library available (None as linked list expression).
 */
function makeChapter2Validators() {
    return [
        NoListsValidator,
        NoLoopsValidator,
        createNoReassignmentValidator(),
        NoBreakContinueValidator,
        NoNonlocalValidator,
        NoRestParamsValidator,
    ];
}
/**
 * Source Chapter 3: lists, loops, and reassignment are all allowed.
 * for loops are restricted to range() only.
 */
function makeChapter3Validators() {
    return [ForRangeOnlyValidator];
}
/**
 * Source Chapter 4: unrestricted. No validators.
 */
function makeChapter4Validators() {
    return [];
}
function makeValidatorsForChapter(chapter) {
    switch (chapter) {
        case 1:
            return makeChapter1Validators();
        case 2:
            return makeChapter2Validators();
        case 3:
            return makeChapter3Validators();
        case 4:
            return makeChapter4Validators();
        default:
            return makeChapter4Validators();
    }
}

/**
 * Full analysis pipeline (single-pass):
 *   1. NameResolver (scope analysis, name lookup)  — Resolver class
 *   2. FeatureGate  (chapter sublanguage restrictions) — validators run inline during resolution
 *
 * Throws on first violation found.
 */
function analyze(ast, source, chapter = 4) {
    new Resolver(source, ast, makeValidatorsForChapter(chapter)).resolve(ast);
}

/**
 * Import analysis for detecting and rewriting torch imports using Python's
 * built-in `ast` module via Pyodide.
 *
 * This avoids the limitations of py-slang's parser (which only supports a
 * subset of Python) by delegating to CPython's own parser running inside
 * Pyodide.
 */
/**
 * Python helper that uses the `ast` module to extract import info.
 * Returns a JSON string describing all FromImport statements.
 */
const ANALYZE_IMPORTS_PY = `
import ast as _ast, json as _json

def _sa_analyze_imports(source):
    """Parse source and return JSON array of from-import info."""
    try:
        tree = _ast.parse(source)
    except SyntaxError:
        return "[]"
    result = []
    for node in _ast.walk(tree):
        if isinstance(node, _ast.ImportFrom) and node.module:
            result.append({
                "module": node.module,
                "names": [
                    {"name": a.name, "alias": a.asname}
                    for a in node.names
                ],
                "line": node.lineno,
            })
    return _json.dumps(result)
`;
let helperLoaded = false;
/**
 * Ensure the Python-side `_sa_analyze_imports` function is defined.
 * Idempotent — only runs once.
 */
async function ensureHelper(pyodide) {
    if (helperLoaded)
        return;
    await pyodide.runPythonAsync(ANALYZE_IMPORTS_PY);
    helperLoaded = true;
}
/**
 * Parses the source code using Python's `ast` module (via Pyodide) and
 * returns all `from … import …` statements whose root module is "torch".
 */
async function detectTorchImports(pyodide, source) {
    await ensureHelper(pyodide);
    const json = pyodide.runPython(`_sa_analyze_imports(${JSON.stringify(source)})`);
    const allImports = JSON.parse(json);
    return allImports.filter(imp => imp.module.split(".")[0] === "torch");
}
/**
 * Returns the set of top-level module roots for all non-torch
 * `from … import …` statements. These may need to be installed via micropip.
 */
async function getNonTorchImportRoots(pyodide, source) {
    await ensureHelper(pyodide);
    const json = pyodide.runPython(`_sa_analyze_imports(${JSON.stringify(source)})`);
    const allImports = JSON.parse(json);
    const roots = new Set();
    for (const imp of allImports) {
        const root = imp.module.split(".")[0];
        if (root !== "torch") {
            roots.add(root);
        }
    }
    return roots;
}
/**
 * Generates Python assignment code that replaces a torch import statement.
 *
 * Example:
 *   from torch.nn import Linear as L, Conv2d
 *   →  L = __sa_import_torch.nn.Linear
 *      Conv2d = __sa_import_torch.nn.Conv2d
 */
function generateReplacement(imp) {
    const injected = "__sa_import_torch";
    const subparts = imp.module.split(".").slice(1);
    const base = subparts.length > 0 ? `${injected}.${subparts.join(".")}` : injected;
    return imp.names
        .map(({ name, alias }) => {
        const binding = alias ?? name;
        return `${binding} = ${base}.${name}`;
    })
        .join("\n");
}
/**
 * Rewrites the source code by replacing torch import lines with
 * variable assignments that reference the injected `__sa_import_torch` global.
 *
 * Non-torch code is passed through unchanged.
 */
async function rewriteTorchImports(pyodide, source) {
    const imports = await detectTorchImports(pyodide, source);
    if (imports.length === 0) {
        return { code: source, hasTorch: false };
    }
    const lines = source.split(/\r?\n/);
    // Process in reverse order so earlier line indices stay valid.
    for (let i = imports.length - 1; i >= 0; i--) {
        const imp = imports[i];
        const replacement = generateReplacement(imp);
        const idx = imp.line - 1;
        lines.splice(idx, 1, replacement);
    }
    return { code: lines.join("\n"), hasTorch: true };
}

var Z=Object.defineProperty;var o=(e,t)=>Z(e,"name",{value:t,configurable:true}),A=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var W=(()=>{for(var e=new Uint8Array(128),t=0;t<64;t++)e[t<26?t+65:t<52?t+71:t<62?t-4:t*4-205]=t;return n=>{for(var i=n.length,s=new Uint8Array((i-(n[i-1]=="=")-(n[i-2]=="="))*3/4|0),r=0,a=0;r<i;){var l=e[n.charCodeAt(r++)],c=e[n.charCodeAt(r++)],d=e[n.charCodeAt(r++)],u=e[n.charCodeAt(r++)];s[a++]=l<<2|c>>4,s[a++]=c<<4|d>>2,s[a++]=d<<6|u;}return s}})();function ee(e){return !isNaN(parseFloat(e))&&isFinite(e)}o(ee,"_isNumber");function P(e){return e.charAt(0).toUpperCase()+e.substring(1)}o(P,"_capitalize");function x(e){return function(){return this[e]}}o(x,"_getter");var N=["isConstructor","isEval","isNative","isToplevel"],S=["columnNumber","lineNumber"],I=["fileName","functionName","source"],te=["args"],ne$1=["evalOrigin"],F=N.concat(S,I,te,ne$1);function p(e){if(e)for(var t=0;t<F.length;t++)e[F[t]]!==void 0&&this["set"+P(F[t])](e[F[t]]);}o(p,"StackFrame");p.prototype={getArgs:o(function(){return this.args},"getArgs"),setArgs:o(function(e){if(Object.prototype.toString.call(e)!=="[object Array]")throw new TypeError("Args must be an Array");this.args=e;},"setArgs"),getEvalOrigin:o(function(){return this.evalOrigin},"getEvalOrigin"),setEvalOrigin:o(function(e){if(e instanceof p)this.evalOrigin=e;else if(e instanceof Object)this.evalOrigin=new p(e);else throw new TypeError("Eval Origin must be an Object or StackFrame")},"setEvalOrigin"),toString:o(function(){var e=this.getFileName()||"",t=this.getLineNumber()||"",n=this.getColumnNumber()||"",i=this.getFunctionName()||"";return this.getIsEval()?e?"[eval] ("+e+":"+t+":"+n+")":"[eval]:"+t+":"+n:i?i+" ("+e+":"+t+":"+n+")":e+":"+t+":"+n},"toString")};p.fromString=o(function(t){var n=t.indexOf("("),i=t.lastIndexOf(")"),s=t.substring(0,n),r=t.substring(n+1,i).split(","),a=t.substring(i+1);if(a.indexOf("@")===0)var l=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(a,""),c=l[1],d=l[2],u=l[3];return new p({functionName:s,args:r||void 0,fileName:c,lineNumber:d||void 0,columnNumber:u||void 0})},"StackFrame$$fromString");for(b=0;b<N.length;b++)p.prototype["get"+P(N[b])]=x(N[b]),p.prototype["set"+P(N[b])]=function(e){return function(t){this[e]=!!t;}}(N[b]);var b;for(v=0;v<S.length;v++)p.prototype["get"+P(S[v])]=x(S[v]),p.prototype["set"+P(S[v])]=function(e){return function(t){if(!ee(t))throw new TypeError(e+" must be a Number");this[e]=Number(t);}}(S[v]);var v;for(E=0;E<I.length;E++)p.prototype["get"+P(I[E])]=x(I[E]),p.prototype["set"+P(I[E])]=function(e){return function(t){this[e]=String(t);}}(I[E]);var E,O=p;function re(){var e=/^\s*at .*(\S+:\d+|\(native\))/m,t=/^(eval@)?(\[native code])?$/;return {parse:o(function(i){if(i.stack&&i.stack.match(e))return this.parseV8OrIE(i);if(i.stack)return this.parseFFOrSafari(i);throw new Error("Cannot parse given Error object")},"ErrorStackParser$$parse"),extractLocation:o(function(i){if(i.indexOf(":")===-1)return [i];var s=/(.+?)(?::(\d+))?(?::(\d+))?$/,r=s.exec(i.replace(/[()]/g,""));return [r[1],r[2]||void 0,r[3]||void 0]},"ErrorStackParser$$extractLocation"),parseV8OrIE:o(function(i){var s=i.stack.split(`
`).filter(function(r){return !!r.match(e)},this);return s.map(function(r){r.indexOf("(eval ")>-1&&(r=r.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));var a=r.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),l=a.match(/ (\(.+\)$)/);a=l?a.replace(l[0],""):a;var c=this.extractLocation(l?l[1]:a),d=l&&a||void 0,u=["eval","<anonymous>"].indexOf(c[0])>-1?void 0:c[0];return new O({functionName:d,fileName:u,lineNumber:c[1],columnNumber:c[2],source:r})},this)},"ErrorStackParser$$parseV8OrIE"),parseFFOrSafari:o(function(i){var s=i.stack.split(`
`).filter(function(r){return !r.match(t)},this);return s.map(function(r){if(r.indexOf(" > eval")>-1&&(r=r.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),r.indexOf("@")===-1&&r.indexOf(":")===-1)return new O({functionName:r});var a=/((.*".+"[^@]*)?[^@]*)(?:@)/,l=r.match(a),c=l&&l[1]?l[1]:void 0,d=this.extractLocation(r.replace(a,""));return new O({functionName:c,fileName:d[0],lineNumber:d[1],columnNumber:d[2],source:r})},this)},"ErrorStackParser$$parseFFOrSafari")}}o(re,"ErrorStackParser");var ie=new re;var M=ie;function oe(){if(typeof API<"u"&&API!==globalThis.API)return API.runtimeEnv;let e=typeof Bun<"u",t=typeof Deno<"u",n=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&!process.browser,i=typeof navigator=="object"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome")===-1&&navigator.userAgent.indexOf("Safari")>-1;return ae({IN_BUN:e,IN_DENO:t,IN_NODE:n,IN_SAFARI:i,IN_SHELL:typeof read=="function"&&typeof load=="function"})}o(oe,"getGlobalRuntimeEnv");var f=oe();function ae(e){let t=e.IN_NODE&&typeof module<"u"&&module.exports&&typeof A=="function"&&typeof __dirname=="string",n=e.IN_NODE&&!t,i=!e.IN_NODE&&!e.IN_DENO&&!e.IN_BUN,s=i&&typeof window<"u"&&typeof window.document<"u"&&typeof document.createElement=="function"&&"sessionStorage"in window&&typeof globalThis.importScripts!="function",r=i&&typeof globalThis.WorkerGlobalScope<"u"&&typeof globalThis.self<"u"&&globalThis.self instanceof globalThis.WorkerGlobalScope;return {...e,IN_BROWSER:i,IN_BROWSER_MAIN_THREAD:s,IN_BROWSER_WEB_WORKER:r,IN_NODE_COMMONJS:t,IN_NODE_ESM:n}}o(ae,"calculateDerivedFlags");var $,D,H,B,L;async function T(){if(!f.IN_NODE||($=(await import('node:url')).default,B=await import('node:fs'),L=await import('node:fs/promises'),H=(await import('node:vm')).default,D=await import('node:path'),C=D.sep,typeof A<"u"))return;let e=B,t=await import('node:crypto'),n=await Promise.resolve().then(function () { return _nodeResolve_empty$1; }),i=await import('node:child_process'),s={fs:e,crypto:t,ws:n,child_process:i};globalThis.require=function(r){return s[r]};}o(T,"initNodeModules");function se(e,t){return D.resolve(t||".",e)}o(se,"node_resolvePath");function le$1(e,t){return t===void 0&&(t=location),new URL(e,t).toString()}o(le$1,"browser_resolvePath");var _;f.IN_NODE?_=se:f.IN_SHELL?_=o(e=>e,"resolvePath"):_=le$1;var C;f.IN_NODE||(C="/");function ce(e,t){return e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?{response:fetch(e)}:{binary:L.readFile(e).then(n=>new Uint8Array(n.buffer,n.byteOffset,n.byteLength))}}o(ce,"node_getBinaryResponse");function de(e,t){if(e.startsWith("file://")&&(e=e.slice(7)),e.includes("://"))throw new Error("Shell cannot fetch urls");return {binary:Promise.resolve(new Uint8Array(readbuffer(e)))}}o(de,"shell_getBinaryResponse");function ue(e,t){let n=new URL(e,location);return {response:fetch(n,t?{integrity:t}:{})}}o(ue,"browser_getBinaryResponse");var R;f.IN_NODE?R=ce:f.IN_SHELL?R=de:R=ue;async function j(e,t){let{response:n,binary:i}=R(e,t);if(i)return i;let s=await n;if(!s.ok)throw new Error(`Failed to load '${e}': request failed.`);return new Uint8Array(await s.arrayBuffer())}o(j,"loadBinaryFile");var w;if(f.IN_BROWSER_MAIN_THREAD)w=o(async e=>await import(e),"loadScript");else if(f.IN_BROWSER_WEB_WORKER)w=o(async e=>{try{globalThis.importScripts(e);}catch(t){if(t instanceof TypeError)await import(e);else throw t}},"loadScript");else if(f.IN_NODE)w=fe;else if(f.IN_SHELL)w=load;else throw new Error("Cannot determine runtime environment");async function fe(e){e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?H.runInThisContext(await(await fetch(e)).text()):await import($.pathToFileURL(e).href);}o(fe,"nodeLoadScript");async function V(e){if(f.IN_NODE){await T();let t=await L.readFile(e,{encoding:"utf8"});return JSON.parse(t)}else if(f.IN_SHELL){let t=read(e);return JSON.parse(t)}else return await(await fetch(e)).json()}o(V,"loadLockFile");async function z(){if(f.IN_NODE_COMMONJS)return __dirname;let e;try{throw new Error}catch(i){e=i;}let t=M.parse(e)[0].fileName;if(f.IN_NODE&&!t.startsWith("file://")&&(t=`file://${t}`),f.IN_NODE_ESM){let i=await import('node:path');return (await import('node:url')).fileURLToPath(i.dirname(t))}let n=t.lastIndexOf(C);if(n===-1)throw new Error("Could not extract indexURL path from pyodide module location. Please pass the indexURL explicitly to loadPyodide.");return t.slice(0,n)}o(z,"calculateDirname");function J(e){return e.substring(0,e.lastIndexOf("/")+1)||globalThis.location?.toString()||"."}o(J,"calculateInstallBaseUrl");function q(e){let t=e.FS,n=e.FS.filesystems.MEMFS,i=e.PATH,s={DIR_MODE:16895,FILE_MODE:33279,mount:o(function(r){if(!r.opts.fileSystemHandle)throw new Error("opts.fileSystemHandle is required");return n.mount.apply(null,arguments)},"mount"),syncfs:o(async(r,a,l)=>{try{let c=s.getLocalSet(r),d=await s.getRemoteSet(r),u=a?d:c,y=a?c:d;await s.reconcile(r,u,y),l(null);}catch(c){l(c);}},"syncfs"),getLocalSet:o(r=>{let a=Object.create(null);function l(u){return u!=="."&&u!==".."}o(l,"isRealDir");function c(u){return y=>i.join2(u,y)}o(c,"toAbsolute");let d=t.readdir(r.mountpoint).filter(l).map(c(r.mountpoint));for(;d.length;){let u=d.pop(),y=t.stat(u);t.isDir(y.mode)&&d.push.apply(d,t.readdir(u).filter(l).map(c(u))),a[u]={timestamp:y.mtime,mode:y.mode};}return {type:"local",entries:a}},"getLocalSet"),getRemoteSet:o(async r=>{let a=Object.create(null),l=await me(r.opts.fileSystemHandle);for(let[c,d]of l)c!=="."&&(a[i.join2(r.mountpoint,c)]={timestamp:d.kind==="file"?new Date((await d.getFile()).lastModified):new Date,mode:d.kind==="file"?s.FILE_MODE:s.DIR_MODE});return {type:"remote",entries:a,handles:l}},"getRemoteSet"),loadLocalEntry:o(r=>{let l=t.lookupPath(r,{}).node,c=t.stat(r);if(t.isDir(c.mode))return {timestamp:c.mtime,mode:c.mode};if(t.isFile(c.mode))return l.contents=n.getFileDataAsTypedArray(l),{timestamp:c.mtime,mode:c.mode,contents:l.contents};throw new Error("node type not supported")},"loadLocalEntry"),storeLocalEntry:o((r,a)=>{if(t.isDir(a.mode))t.mkdirTree(r,a.mode);else if(t.isFile(a.mode))t.writeFile(r,a.contents,{canOwn:true});else throw new Error("node type not supported");t.chmod(r,a.mode),t.utime(r,a.timestamp,a.timestamp);},"storeLocalEntry"),removeLocalEntry:o(r=>{var a=t.stat(r);t.isDir(a.mode)?t.rmdir(r):t.isFile(a.mode)&&t.unlink(r);},"removeLocalEntry"),loadRemoteEntry:o(async r=>{if(r.kind==="file"){let a=await r.getFile();return {contents:new Uint8Array(await a.arrayBuffer()),mode:s.FILE_MODE,timestamp:new Date(a.lastModified)}}else {if(r.kind==="directory")return {mode:s.DIR_MODE,timestamp:new Date};throw new Error("unknown kind: "+r.kind)}},"loadRemoteEntry"),storeRemoteEntry:o(async(r,a,l)=>{let c=r.get(i.dirname(a)),d=t.isFile(l.mode)?await c.getFileHandle(i.basename(a),{create:true}):await c.getDirectoryHandle(i.basename(a),{create:true});if(d.kind==="file"){let u=await d.createWritable();await u.write(l.contents),await u.close();}r.set(a,d);},"storeRemoteEntry"),removeRemoteEntry:o(async(r,a)=>{await r.get(i.dirname(a)).removeEntry(i.basename(a)),r.delete(a);},"removeRemoteEntry"),reconcile:o(async(r,a,l)=>{let c=0,d=[];Object.keys(a.entries).forEach(function(m){let g=a.entries[m],h=l.entries[m];(!h||t.isFile(g.mode)&&g.timestamp.getTime()>h.timestamp.getTime())&&(d.push(m),c++);}),d.sort();let u=[];if(Object.keys(l.entries).forEach(function(m){a.entries[m]||(u.push(m),c++);}),u.sort().reverse(),!c)return;let y=a.type==="remote"?a.handles:l.handles;for(let m of d){let g=i.normalize(m.replace(r.mountpoint,"/")).substring(1);if(l.type==="local"){let h=y.get(g),Q=await s.loadRemoteEntry(h);s.storeLocalEntry(m,Q);}else {let h=s.loadLocalEntry(m);await s.storeRemoteEntry(y,g,h);}}for(let m of u)if(l.type==="local")s.removeLocalEntry(m);else {let g=i.normalize(m.replace(r.mountpoint,"/")).substring(1);await s.removeRemoteEntry(y,g);}},"reconcile")};e.FS.filesystems.NATIVEFS_ASYNC=s;}o(q,"initializeNativeFS");var me=o(async e=>{let t=[];async function n(s){for await(let r of s.values())t.push(r),r.kind==="directory"&&await n(r);}o(n,"collect"),await n(e);let i=new Map;i.set(".",e);for(let s of t){let r=(await e.resolve(s)).join("/");i.set(r,s);}return i},"getFsHandles");var G=W("AGFzbQEAAAABDANfAGAAAW9gAW8BfwMDAgECByECD2NyZWF0ZV9zZW50aW5lbAAAC2lzX3NlbnRpbmVsAAEKEwIHAPsBAPsbCwkAIAD7GvsUAAs=");var ye=async function(){if(!(globalThis.navigator&&(/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&typeof navigator.maxTouchPoints<"u"&&navigator.maxTouchPoints>1)))try{let t=await WebAssembly.compile(G);return await WebAssembly.instantiate(t)}catch(t){if(t instanceof WebAssembly.CompileError)return;throw t}}();async function K(){let e=await ye;if(e)return e.exports;let t=Symbol("error marker");return {create_sentinel:o(()=>t,"create_sentinel"),is_sentinel:o(n=>n===t,"is_sentinel")}}o(K,"getSentinelImport");function Y(e){let t={config:e,runtimeEnv:f},n={noImageDecoding:true,noAudioDecoding:true,noWasmDecoding:false,preRun:he(e),print:e.stdout,printErr:e.stderr,onExit(i){n.exitCode=i;},thisProgram:e._sysExecutable,arguments:e.args,API:t,locateFile:o(i=>e.indexURL+i,"locateFile"),instantiateWasm:Ne(e.indexURL)};return n}o(Y,"createSettings");function ge$1(e){return function(t){let n="/";try{t.FS.mkdirTree(e);}catch(i){console.error(`Error occurred while making a home directory '${e}':`),console.error(i),console.error(`Using '${n}' for a home directory instead`),e=n;}t.FS.chdir(e);}}o(ge$1,"createHomeDirectory");function be(e){return function(t){Object.assign(t.ENV,e);}}o(be,"setEnvironment");function ve(e){return e?[async t=>{t.addRunDependency("fsInitHook");try{await e(t.FS,{sitePackages:t.API.sitePackages});}finally{t.removeRunDependency("fsInitHook");}}]:[]}o(ve,"callFsInitHook");function Ee(e){let t=e.HEAPU32[e._Py_Version>>>2],n=t>>>24&255,i=t>>>16&255,s=t>>>8&255;return [n,i,s]}o(Ee,"computeVersionTuple");function Pe(e){let t=j(e);return async n=>{n.API.pyVersionTuple=Ee(n);let[i,s]=n.API.pyVersionTuple;n.FS.mkdirTree("/lib"),n.API.sitePackages=`/lib/python${i}.${s}/site-packages`,n.FS.mkdirTree(n.API.sitePackages),n.addRunDependency("install-stdlib");try{let r=await t;n.FS.writeFile(`/lib/python${i}${s}.zip`,r);}catch(r){console.error("Error occurred while installing the standard library:"),console.error(r);}finally{n.removeRunDependency("install-stdlib");}}}o(Pe,"installStdlib");function he(e){let t;return e.stdLibURL!=null?t=e.stdLibURL:t=e.indexURL+"python_stdlib.zip",[Pe(t),ge$1(e.env.HOME),be(e.env),q,...ve(e.fsInit)]}o(he,"getFileSystemInitializationFuncs");function Ne(e){if(typeof WasmOffsetConverter<"u")return;let{binary:t,response:n}=R(e+"pyodide.asm.wasm"),i=K();return function(s,r){return async function(){s.sentinel=await i;try{let a;n?a=await WebAssembly.instantiateStreaming(n,s):a=await WebAssembly.instantiate(await t,s);let{instance:l,module:c}=a;r(l,c);}catch(a){console.warn("wasm instantiation failed!"),console.warn(a);}}(),{}}}o(Ne,"getInstantiateWasmFunc");var X="0.29.3";function k(e){return e===void 0||e.endsWith("/")?e:e+"/"}o(k,"withTrailingSlash");var U=X;async function Se(e={}){if(await T(),e.lockFileContents&&e.lockFileURL)throw new Error("Can't pass both lockFileContents and lockFileURL");let t=e.indexURL||await z();if(t=k(_(t)),e.packageBaseUrl=k(e.packageBaseUrl),e.cdnUrl=k(e.packageBaseUrl??`https://cdn.jsdelivr.net/pyodide/v${U}/full/`),!e.lockFileContents){let s=e.lockFileURL??t+"pyodide-lock.json";e.lockFileContents=V(s),e.packageBaseUrl??=J(s);}e.indexURL=t,e.packageCacheDir&&(e.packageCacheDir=k(_(e.packageCacheDir)));let n={fullStdLib:false,jsglobals:globalThis,stdin:globalThis.prompt?()=>globalThis.prompt():void 0,args:[],env:{},packages:[],packageCacheDir:e.packageBaseUrl,enableRunUntilComplete:true,checkAPIVersion:true,BUILD_ID:"b7b7b0f46eb68e65c029c0dc739270e8a5d35251e9aab6014ee1c2f630e5d1d0"},i=Object.assign(n,e);return i.env.HOME??="/home/pyodide",i.env.PYTHONINSPECT??="1",i}o(Se,"initializeConfiguration");function Ie(e){let t=Y(e),n=t.API;return n.lockFilePromise=Promise.resolve(e.lockFileContents),t}o(Ie,"createEmscriptenSettings");async function we(e){if(typeof _createPyodideModule!="function"){let t=`${e.indexURL}pyodide.asm.js`;await w(t);}}o(we,"loadWasmScript");async function _e(e,t){if(!e._loadSnapshot)return;let n=await e._loadSnapshot,i=ArrayBuffer.isView(n)?n:new Uint8Array(n);return t.noInitialRun=true,t.INITIAL_MEMORY=i.length,i}o(_e,"prepareSnapshot");async function Re(e){let t=await _createPyodideModule(e);if(e.exitCode!==void 0)throw new t.ExitStatus(e.exitCode);return t}o(Re,"createPyodideModule");function ke(e,t){let n=e.API;if(t.pyproxyToStringRepr&&n.setPyProxyToStringMethod(true),t.convertNullToNone&&n.setCompatNullToNone(true),t.toJsLiteralMap&&n.setCompatToJsLiteralMap(true),n.version!==U&&t.checkAPIVersion)throw new Error(`Pyodide version does not match: '${U}' <==> '${n.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);e.locateFile=i=>{throw i.endsWith(".so")?new Error(`Failed to find dynamic library "${i}"`):new Error(`Unexpected call to locateFile("${i}")`)};}o(ke,"configureAPI");function Ae(e,t,n){let i=e.API,s;return t&&(s=i.restoreSnapshot(t)),i.finalizeBootstrap(s,n._snapshotDeserializer)}o(Ae,"bootstrapPyodide");async function Fe(e,t){let n=e._api;return n.sys.path.insert(0,""),n._pyodide.set_excepthook(),await n.packageIndexReady,n.initializeStreams(t.stdin,t.stdout,t.stderr),e}o(Fe,"finalizeSetup");async function ct(e={}){let t=await Se(e),n=Ie(t);await we(t);let i=await _e(t,n),s=await Re(n);ke(s,t);let r=Ae(s,i,t);return await Fe(r,t)}o(ct,"loadPyodide");

const IN_NODE = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
async function ensureLocalPyodideAssets(baseUrl) {
    const path = await import('node:path');
    const fs = await import('node:fs/promises');
    const os = await import('node:os');
    const dir = path.join(os.tmpdir(), `pyodide-${U}`);
    await fs.mkdir(dir, { recursive: true });
    const assets = [
        { name: "pyodide.asm.js", mode: "text" },
        { name: "pyodide.asm.wasm", mode: "binary" },
        { name: "python_stdlib.zip", mode: "binary" },
        { name: "pyodide-lock.json", mode: "text" },
    ];
    for (const asset of assets) {
        const url = baseUrl + asset.name;
        const dest = path.join(dir, asset.name);
        try {
            await fs.access(dest);
            continue;
        }
        catch {
            // File doesn't exist yet — download it.
        }
        const res = await fetch(url);
        if (!res.ok)
            throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
        const data = asset.mode === "text"
            ? Buffer.from(await res.text(), "utf8")
            : Buffer.from(await res.arrayBuffer());
        await fs.writeFile(dest, data);
    }
    return dir + path.sep;
}
async function loadPyodideGeneric() {
    const cdnBase = `https://cdn.jsdelivr.net/pyodide/v${U}/full/`;
    const indexURL = IN_NODE ? await ensureLocalPyodideAssets(cdnBase) : cdnBase;
    return ct({ indexURL, fullStdLib: true });
}

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function _broadcast_shape(a_shape, b_shape) {
  const result_length = Math.max(a_shape.length, b_shape.length);
  const padded_a_shape = [...Array(result_length - a_shape.length).fill(1), ...a_shape];
  const padded_b_shape = [...Array(result_length - b_shape.length).fill(1), ...b_shape];
  const result_shape = [];
  for (let i = 0; i < result_length; i++) {
    if (padded_a_shape[i] !== padded_b_shape[i] && padded_a_shape[i] !== 1 && padded_b_shape[i] !== 1) {
      throw new Error(`Shape mismatch: ${a_shape} and ${b_shape}`);
    }
    result_shape.push(Math.max(padded_a_shape[i], padded_b_shape[i]));
  }
  return result_shape;
}
__name(_broadcast_shape, "_broadcast_shape");
function _unbroadcast(result_shape, original_shape, result) {
  const this_shape = _pad_shape(original_shape, result_shape);
  const unbroadcasted_result = new Array(original_shape.reduce((acc, cur) => acc * cur, 1)).fill(0);
  for (let i = 0; i < result.length; i++) {
    unbroadcasted_result[_get_original_index(this_shape, result_shape, i)] += result[i];
  }
  return unbroadcasted_result;
}
__name(_unbroadcast, "_unbroadcast");
function _pad_shape(shape, broadcast_shape) {
  if (shape.length >= broadcast_shape.length) {
    return shape;
  }
  return [...Array(broadcast_shape.length - shape.length).fill(1), ...shape];
}
__name(_pad_shape, "_pad_shape");
function _get_original_index(original_shape, new_shape, index2) {
  let original_index = 0;
  let cur_stride = 1;
  let temp_index = index2;
  for (let i = original_shape.length - 1; i >= 0; i--) {
    if (original_shape[i] > 1) {
      const dim_index = temp_index % new_shape[i];
      original_index = original_index + dim_index * cur_stride;
    }
    cur_stride *= original_shape[i];
    temp_index = Math.floor(temp_index / new_shape[i]);
  }
  return original_index;
}
__name(_get_original_index, "_get_original_index");
let globalId = 0;
const getNextId = /* @__PURE__ */ __name(() => {
  return globalId++;
}, "getNextId");
const eventBus = new EventTarget();
const events = {
  TENSOR_BEFORE_BACKWARD: "tensor.beforeBackward",
  TENSOR_AFTER_BACKWARD: "tensor.afterBackward",
  OPERATION_BEFORE_FORWARD: "operation.beforeForward",
  OPERATION_AFTER_FORWARD: "operation.afterForward",
  OPERATION_BEFORE_BACKWARD: "operation.beforeBackward",
  OPERATION_AFTER_BACKWARD: "operation.afterBackward",
  OPERATION_BEFORE_ACCUMULATE_GRAD: "operation.beforeAccumulateGrad",
  OPERATION_AFTER_ACCUMULATE_GRAD: "operation.afterAccumulateGrad"
};
function _numel(shape) {
  return shape.reduce((a, b) => a * b, 1);
}
__name(_numel, "_numel");
function _get_shape_from_args(args) {
  if (Array.isArray(args[0])) {
    return args[0];
  }
  return args;
}
__name(_get_shape_from_args, "_get_shape_from_args");
let _rng = /* @__PURE__ */ __name(() => Math.random(), "_rng");
function getRng() {
  return _rng;
}
__name(getRng, "getRng");
function manual_seed(seed2) {
  seed2 = seed2 >>> 0;
  _rng = mulberry32(seed2);
  return seed2;
}
__name(manual_seed, "manual_seed");
function seed() {
  const s = Math.random() * 4294967295 >>> 0;
  _rng = mulberry32(s);
  return s;
}
__name(seed, "seed");
function mulberry32(seed2) {
  return function() {
    let t = seed2 += 1831565813;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
__name(mulberry32, "mulberry32");
function uniformDist(min2 = 0, max2 = 1) {
  return () => min2 + getRng()() * (max2 - min2);
}
__name(uniformDist, "uniformDist");
function normalDist(mean2 = 0, std = 1) {
  return function() {
    const u = 1 - getRng()();
    const v = getRng()();
    const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    return z * std + mean2;
  };
}
__name(normalDist, "normalDist");
function randn(...args) {
  const shape = _get_shape_from_args(args);
  const tensor2 = new Tensor(Array.from({ length: _numel(shape) }, normalDist()));
  tensor2.shape = shape;
  return tensor2;
}
__name(randn, "randn");
function rand(...args) {
  const shape = _get_shape_from_args(args);
  const tensor2 = new Tensor(Array.from({ length: _numel(shape) }, uniformDist()));
  tensor2.shape = shape;
  return tensor2;
}
__name(rand, "rand");
function randint(low, high, shape) {
  const tensor2 = new Tensor(
    Array.from({ length: _numel(shape) }, () => Math.floor(uniformDist(low, high)()))
  );
  tensor2.shape = shape;
  return tensor2;
}
__name(randint, "randint");
function randperm(n) {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = 0; i < n; i++) {
    const j = Math.floor(uniformDist()() * (n - i)) + i;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const tensor2 = new Tensor(arr);
  return tensor2;
}
__name(randperm, "randperm");
function rand_like(input) {
  return rand(input.shape);
}
__name(rand_like, "rand_like");
function randn_like(input) {
  return randn(input.shape);
}
__name(randn_like, "randn_like");
function randint_like(input, low, high) {
  return randint(low, high, input.shape);
}
__name(randint_like, "randint_like");
function tensor(data, requires_grad = false) {
  return new Tensor(data, { requires_grad });
}
__name(tensor, "tensor");
function full(shape, fill_value) {
  const t = new Tensor(Array(_numel(shape)).fill(fill_value));
  t.shape = shape;
  return t;
}
__name(full, "full");
function zeros(...args) {
  return full(_get_shape_from_args(args), 0);
}
__name(zeros, "zeros");
function ones(...args) {
  return full(_get_shape_from_args(args), 1);
}
__name(ones, "ones");
function empty(...args) {
  return full(_get_shape_from_args(args), 0);
}
__name(empty, "empty");
function full_like(input, fill_value) {
  return full(input.shape, fill_value);
}
__name(full_like, "full_like");
function zeros_like(input) {
  return full(input.shape, 0);
}
__name(zeros_like, "zeros_like");
function ones_like(input) {
  return full(input.shape, 1);
}
__name(ones_like, "ones_like");
function empty_like(input) {
  return full(input.shape, 0);
}
__name(empty_like, "empty_like");
function linspace(start, end, steps) {
  const data = [];
  const step = (end - start) / (steps - 1);
  for (let i = 0; i < steps - 1; i++) {
    data.push(start + i * step);
  }
  data.push(end);
  return new Tensor(data);
}
__name(linspace, "linspace");
function arange(start, end = void 0, step = 1) {
  const data = [];
  for (let i = start; i < end; i += step) {
    data.push(i);
  }
  return new Tensor(data);
}
__name(arange, "arange");
let _grad_enabled = true;
function is_grad_enabled() {
  return _grad_enabled;
}
__name(is_grad_enabled, "is_grad_enabled");
function enable_no_grad() {
  const prev = _grad_enabled;
  _grad_enabled = false;
  return prev;
}
__name(enable_no_grad, "enable_no_grad");
function disable_no_grad(prev) {
  _grad_enabled = prev;
}
__name(disable_no_grad, "disable_no_grad");
function no_grad(fn) {
  const prev = enable_no_grad();
  try {
    return fn();
  } finally {
    disable_no_grad(prev);
  }
}
__name(no_grad, "no_grad");
function resultRequiresGrad(...args) {
  if (!is_grad_enabled()) return false;
  for (const arg of args) {
    if (arg instanceof Tensor && arg.requires_grad) {
      return true;
    }
  }
  return false;
}
__name(resultRequiresGrad, "resultRequiresGrad");
const _TorchFunction = class _TorchFunction {
  id = getNextId();
  opName = "";
  next_functions = [];
  saved_tensors = [];
  _retained_tensors = [];
  forward(...args) {
    const requires_grad = resultRequiresGrad(...args);
    eventBus.dispatchEvent(new CustomEvent(events.OPERATION_BEFORE_FORWARD, {
      detail: {
        operation: this,
        requires_grad,
        args
      }
    }));
    const result = this._forward(...args);
    eventBus.dispatchEvent(new CustomEvent(events.OPERATION_AFTER_FORWARD, {
      detail: {
        operation: this,
        requires_grad,
        args,
        result
      }
    }));
    return result;
  }
  backward(dz) {
    eventBus.dispatchEvent(new CustomEvent(events.OPERATION_BEFORE_BACKWARD, { detail: { operation: this, dz } }));
    for (const x of this._retained_tensors) {
      if (!x.grad) {
        x.grad = new Tensor(new Array(x.dataLength()).fill(0));
      }
      x.grad = x.grad.add(dz);
    }
    this._backward(dz);
    eventBus.dispatchEvent(new CustomEvent(events.OPERATION_AFTER_BACKWARD, { detail: { operation: this, dz } }));
  }
};
__name(_TorchFunction, "TorchFunction");
let TorchFunction = _TorchFunction;
const _NullOp = class _NullOp extends TorchFunction {
  _forward(..._args) {
    throw new Error("NullOp should not be called");
  }
  _backward(_dz) {
    return;
  }
};
__name(_NullOp, "NullOp");
let NullOp = _NullOp;
const nullOp = new NullOp();
const _UnaryFunction = class _UnaryFunction extends TorchFunction {
};
__name(_UnaryFunction, "UnaryFunction");
let UnaryFunction = _UnaryFunction;
const _BinaryFunction = class _BinaryFunction extends TorchFunction {
};
__name(_BinaryFunction, "BinaryFunction");
let BinaryFunction = _BinaryFunction;
const _AccumulateGrad = class _AccumulateGrad extends UnaryFunction {
  variable;
  _forward(variable) {
    this.variable = variable;
    return variable;
  }
  _backward(dz) {
    if (!this.variable.grad) {
      this.variable.grad = zeros_like(this.variable);
    }
    eventBus.dispatchEvent(new CustomEvent(events.OPERATION_BEFORE_ACCUMULATE_GRAD, { detail: { operation: this, dz } }));
    if (typeof dz === "number") {
      this.variable.grad = this.variable.grad.add(dz);
    } else {
      const unbroadcasted_dz = _unbroadcast(dz.shape, this.variable.shape, dz.data);
      this.variable.grad = this.variable.grad.add(new Tensor(unbroadcasted_dz, {}, { shape: this.variable.shape }));
    }
    eventBus.dispatchEvent(new CustomEvent(events.OPERATION_AFTER_ACCUMULATE_GRAD, { detail: { operation: this, dz } }));
  }
};
__name(_AccumulateGrad, "AccumulateGrad");
let AccumulateGrad = _AccumulateGrad;
const operations = /* @__PURE__ */ new Map();
const operations_cache = /* @__PURE__ */ new Map();
function registerOperation(name, func) {
  operations.set(name, func);
}
__name(registerOperation, "registerOperation");
function getOperation(name) {
  const func = operations.get(name);
  if (!func) {
    throw new Error(`Operation '${name}' is not registered.`);
  }
  return func;
}
__name(getOperation, "getOperation");
function getOperationCache(name) {
  const operation = operations_cache.get(name);
  if (!operation) {
    const op = new (getOperation(name))();
    op.opName = name;
    operations_cache.set(name, op);
    return op;
  }
  return operation;
}
__name(getOperationCache, "getOperationCache");
function createOperation(name) {
  const op = new (getOperation(name))();
  op.opName = name;
  return op;
}
__name(createOperation, "createOperation");
function _get_shape(data) {
  if (ArrayBuffer.isView(data)) {
    return [data.length];
  }
  const shape = [];
  while (Array.isArray(data)) {
    shape.push(data.length);
    data = data[0];
  }
  return shape;
}
__name(_get_shape, "_get_shape");
function _assert_shape(data, shape) {
  if (Array.isArray(data)) {
    if (data.length !== shape[0]) {
      throw new Error(
        `Shape mismatch at dim ${shape.length}: expected ${shape[0]}, got ${data.length}`
      );
    }
    for (let i = 0; i < data.length; i++) {
      _assert_shape(data[i], shape.slice(1));
    }
  } else if (ArrayBuffer.isView(data)) {
    if (shape.length !== 1) {
      throw new Error(`Shape mismatch at dim ${shape.length}: expected 1D, got ${shape}`);
    }
    if (data.length !== shape[0]) {
      throw new Error(
        `Shape mismatch at dim ${shape.length}: expected ${shape[0]}, got ${data.length}`
      );
    }
  } else {
    if (shape.length !== 0) {
      throw new Error(`Shape mismatch at dim ${shape.length}: expected scalar, got ${data}`);
    }
  }
}
__name(_assert_shape, "_assert_shape");
function _get_and_assert_shape(data) {
  const shape = _get_shape(data);
  _assert_shape(data, shape);
  return shape;
}
__name(_get_and_assert_shape, "_get_and_assert_shape");
function _flatten(data) {
  if (Array.isArray(data)) {
    return data.flatMap((item) => _flatten(item));
  } else if (ArrayBuffer.isView(data)) {
    return Array.from(data);
  } else {
    return [data];
  }
}
__name(_flatten, "_flatten");
const _TensorStorage = class _TensorStorage {
  constructor(data) {
    this.data = data;
  }
};
__name(_TensorStorage, "TensorStorage");
let TensorStorage = _TensorStorage;
const _Tensor = class _Tensor {
  // Auto-generated ID
  id = getNextId();
  // Optional user-defined name
  name = null;
  // Shared backing storage and offset into it.
  // Views share the same TensorStorage but differ in _offset and shape.
  _storage = new TensorStorage([]);
  _offset = 0;
  /**
   * Returns the flat, contiguous data for this tensor.
   *
   * Fast path (non-view): returns the storage array directly — no allocation.
   * View path: materialises a contiguous slice — one allocation per call,
   * so callers inside tight loops should cache the result: `const d = t.data`.
   */
  get data() {
    const n = this.dataLength();
    if (this._offset === 0 && this._storage.data.length === n) {
      return this._storage.data;
    }
    return this._storage.data.slice(this._offset, this._offset + n);
  }
  /**
   * Sets the tensor's data.
   *
   * Non-view (offset=0, storage covers exactly this tensor's numel):
   *   replaces the shared storage's data array in-place — all other views
   *   sharing the same TensorStorage immediately see the new values.
   *
   * View (offset≠0 or storage is larger than this tensor):
   *   copies `values` element-by-element into the shared storage at the
   *   correct offset — the original tensor and sibling views are updated.
   */
  set data(values) {
    const n = values.length;
    if (this._offset === 0 && this._storage.data.length === n) {
      this._storage.data = values;
    } else {
      for (let i = 0; i < n; i++) {
        this._storage.data[this._offset + i] = values[i];
      }
    }
  }
  shape;
  grad_fn = null;
  grad = null;
  requires_grad;
  constructor(data, options = {}, internal_options = {}) {
    if (internal_options._storage !== void 0) {
      this._storage = internal_options._storage;
      this._offset = internal_options._offset ?? 0;
      this.shape = internal_options.shape ?? [];
    } else {
      this._storage = new TensorStorage(_flatten(data));
      this._offset = 0;
      this.shape = internal_options.shape ?? _get_and_assert_shape(data);
    }
    this.requires_grad = options.requires_grad ?? false;
    if (options.name) {
      this.name = options.name;
    }
    this.grad_fn = internal_options.operation ?? null;
    if (this.requires_grad && !this.grad_fn) {
      const acc = new AccumulateGrad();
      acc.variable = this;
      this.grad_fn = acc;
    }
  }
  size(dim) {
    if (dim !== void 0) {
      if (dim < 0) {
        dim += this.shape.length;
      }
      if (dim < 0 || dim >= this.shape.length) {
        throw new Error(
          `Dimension out of range (expected to be in range of [${-this.shape.length}, ${this.shape.length - 1}], but got ${dim})`
        );
      }
      return this.shape[dim];
    }
    return this.shape;
  }
  toArray_() {
    return;
  }
  toFlatArray() {
    return this.data;
  }
  toArray() {
    if (this.shape.length === 0) {
      return this.data[0];
    }
    let flatIndex = 0;
    const flatData = this.data;
    const buildDimension = /* @__PURE__ */ __name((currentDim) => {
      const size = this.shape[currentDim];
      const result = new Array(size);
      const isLastDimension = currentDim === this.shape.length - 1;
      for (let i = 0; i < size; i++) {
        if (isLastDimension) {
          result[i] = flatData[flatIndex++];
        } else {
          result[i] = buildDimension(currentDim + 1);
        }
      }
      return result;
    }, "buildDimension");
    return buildDimension(0);
  }
  toString() {
    let extra = "";
    if (this.name) {
      extra += `, name="${this.name}"`;
    }
    if (this.dataLength() == 0 && this.shape.length > 0) {
      extra += `, size=(${this.shape.join(", ")})`;
    }
    if (this.requires_grad) {
      extra += ", requires_grad=True";
    }
    function formatNum(val) {
      return String(Math.round(val * 1e4) / 1e4);
    }
    __name(formatNum, "formatNum");
    function formatArray(val) {
      if (Array.isArray(val)) {
        return "[" + val.map(formatArray).join(", ") + "]";
      }
      if (typeof val === "number") {
        return formatNum(val);
      }
      return String(val);
    }
    __name(formatArray, "formatArray");
    return `tensor(${formatArray(this.toArray())}${extra})`;
  }
  dataLength() {
    if (this.shape.length === 0) return 1;
    return this.shape.reduce((a, b) => a * b, 1);
  }
  _executeUnaryOp(opName) {
    const operation = resultRequiresGrad(this) ? createOperation(opName) : getOperationCache(opName);
    return operation.forward(this);
  }
  _executeBinaryOp(opName, other) {
    if (typeof other == "number") {
      other = new _Tensor(other);
    }
    const operation = resultRequiresGrad(this, other) ? createOperation(opName) : getOperationCache(opName);
    return operation.forward(this, other);
  }
  _executeOpRaw(opName, ...args) {
    const operation = createOperation(opName);
    return operation.forward(this, ...args);
  }
  item() {
    if (this.dataLength() !== 1) {
      throw new Error("Tensor.item() is only valid for scalars");
    }
    return this.data[0];
  }
  detach() {
    return new _Tensor(this.data, { requires_grad: false }, { shape: this.shape });
  }
  detach_() {
    this.requires_grad = false;
    this.grad = null;
    this.grad_fn = null;
  }
  zero_() {
    this.data = Array(this.dataLength()).fill(0);
  }
  is_retain_grad = false;
  retain_grad() {
    if (this.grad_fn instanceof AccumulateGrad) return;
    if (this.is_retain_grad) return;
    this.is_retain_grad = true;
    this.grad_fn._retained_tensors.push(this);
  }
  backward(grad) {
    if (!this.requires_grad) {
      return;
    }
    if (!grad) {
      if (this.dataLength() !== 1) {
        throw new Error("Gradient is required for non-scalar tensors");
      }
      grad = new _Tensor(1);
    } else {
      grad.toArray_();
    }
    if (this.grad_fn) {
      eventBus.dispatchEvent(
        new CustomEvent(events.TENSOR_BEFORE_BACKWARD, { detail: { tensor: this } })
      );
      this.grad_fn.backward(grad);
      eventBus.dispatchEvent(
        new CustomEvent(events.TENSOR_AFTER_BACKWARD, { detail: { tensor: this } })
      );
    }
  }
  /**
   * Returns a view of this tensor along dimension 0.
   *
   * The returned tensor shares the same underlying TensorStorage — mutations
   * to either tensor (via zero_(), the data setter, or the optimizer) are
   * immediately visible in the other.
   *
   * Supports negative indices (e.g. index(-1) is the last row).
   *
   * Note: the view does not carry a grad_fn; autograd does not propagate
   * through index() at this time.
   */
  index(i) {
    if (this.shape.length === 0) {
      throw new Error("Cannot index a scalar tensor");
    }
    if (i < 0) {
      i += this.shape[0];
    }
    if (i < 0 || i >= this.shape[0]) {
      throw new Error(
        `Index ${i} out of bounds for dimension 0 with size ${this.shape[0]}`
      );
    }
    const newShape = this.shape.slice(1);
    const rowSize = newShape.length === 0 ? 1 : newShape.reduce((a, b) => a * b, 1);
    const newOffset = this._offset + i * rowSize;
    return new _Tensor([], {}, { shape: newShape, _storage: this._storage, _offset: newOffset });
  }
  // operations
  // binary pointwise
  add(other) {
    return this._executeBinaryOp("add", other);
  }
  sub(other) {
    return this._executeBinaryOp("sub", other);
  }
  mul(other) {
    return this._executeBinaryOp("mul", other);
  }
  div(other) {
    return this._executeBinaryOp("div", other);
  }
  pow(other) {
    if (typeof other == "number" && other % 1 === 0) {
      return this._executeOpRaw("powint", other);
    }
    return this._executeBinaryOp("pow", other);
  }
  fmod(other) {
    return this._executeBinaryOp("fmod", other);
  }
  maximum(other) {
    return this._executeBinaryOp("maximum", other);
  }
  minimum(other) {
    return this._executeBinaryOp("minimum", other);
  }
  // unary pointwise
  log() {
    return this._executeUnaryOp("log");
  }
  sqrt() {
    return this._executeUnaryOp("sqrt");
  }
  exp() {
    return this._executeUnaryOp("exp");
  }
  square() {
    return this._executeUnaryOp("square");
  }
  abs() {
    return this._executeUnaryOp("abs");
  }
  sign() {
    return this._executeUnaryOp("sign");
  }
  neg() {
    return this._executeUnaryOp("neg");
  }
  reciprocal() {
    return this._executeUnaryOp("reciprocal");
  }
  nan_to_num() {
    return this._executeUnaryOp("nan_to_num");
  }
  reshape(shape) {
    return this._executeOpRaw("reshape", shape);
  }
  flatten(start_dim = 0, end_dim = -1) {
    return this._executeOpRaw("flatten", start_dim, end_dim);
  }
  squeeze(dim) {
    return this._executeOpRaw("squeeze", dim);
  }
  unsqueeze(dim) {
    return this._executeOpRaw("unsqueeze", dim);
  }
  expand(sizes) {
    return this._executeOpRaw("expand", sizes);
  }
  // trigonometric
  sin() {
    return this._executeUnaryOp("sin");
  }
  cos() {
    return this._executeUnaryOp("cos");
  }
  tan() {
    return this._executeUnaryOp("tan");
  }
  // reduction
  sum(dim, keepdim = false) {
    return this._executeOpRaw("sum", dim, keepdim);
  }
  mean(dim, keepdim = false) {
    return this._executeOpRaw("mean", dim, keepdim);
  }
  max(dim, keepdim = false) {
    return this._executeOpRaw("max", dim, keepdim);
  }
  min(dim, keepdim = false) {
    return this._executeOpRaw("min", dim, keepdim);
  }
  // linalg
  transpose(dim0, dim1) {
    return this._executeOpRaw("transpose", dim0, dim1);
  }
  matmul(other) {
    return this._executeBinaryOp("matmul", other);
  }
  // comparison
  lt(other) {
    return this._executeBinaryOp("lt", other);
  }
  gt(other) {
    return this._executeBinaryOp("gt", other);
  }
  le(other) {
    return this._executeBinaryOp("le", other);
  }
  ge(other) {
    return this._executeBinaryOp("ge", other);
  }
  eq(other) {
    return this._executeBinaryOp("eq", other);
  }
  ne(other) {
    return this._executeBinaryOp("ne", other);
  }
  allclose(other, rtol = 1e-5, atol = 1e-8, equal_nan = false) {
    const thisData = this.data;
    const otherData = other.data;
    if (thisData.length !== otherData.length) return false;
    for (let i = 0; i < thisData.length; i++) {
      const av = thisData[i], bv = otherData[i];
      if (equal_nan && isNaN(av) && isNaN(bv)) continue;
      if (isNaN(av) || isNaN(bv)) return false;
      if (Math.abs(av - bv) > atol + rtol * Math.abs(bv)) return false;
    }
    return true;
  }
  numel() {
    return this.dataLength();
  }
  // other
  sigmoid() {
    return this._executeUnaryOp("sigmoid");
  }
  relu() {
    return this._executeUnaryOp("relu");
  }
};
__name(_Tensor, "Tensor");
let Tensor = _Tensor;
function generate_function$1(opname) {
  return (...args) => {
    const operation = createOperation(opname);
    return operation.forward(...args);
  };
}
__name(generate_function$1, "generate_function$1");
function generate_unary_function$1(opname) {
  return (a) => {
    if (typeof a == "number") {
      a = new Tensor(a);
    }
    const operation = createOperation(opname);
    return operation.forward(a);
  };
}
__name(generate_unary_function$1, "generate_unary_function$1");
function generate_binary_function(opname) {
  return (a, b) => {
    if (typeof a == "number") {
      a = new Tensor(a);
    }
    if (typeof b == "number") {
      b = new Tensor(b);
    }
    const operation = createOperation(opname);
    return operation.forward(a, b);
  };
}
__name(generate_binary_function, "generate_binary_function");
const __left_index__ = generate_binary_function("__left_index__");
const __right_index__ = generate_binary_function("__right_index__");
const add = generate_binary_function("add");
const sub = generate_binary_function("sub");
const mul = generate_binary_function("mul");
const div = generate_binary_function("div");
const pow = generate_binary_function("pow");
const fmod = generate_binary_function("fmod");
const maximum = generate_binary_function("maximum");
const minimum = generate_binary_function("minimum");
const log = generate_unary_function$1("log");
const sqrt = generate_unary_function$1("sqrt");
const exp = generate_unary_function$1("exp");
const square = generate_unary_function$1("square");
const abs = generate_unary_function$1("abs");
const sign = generate_unary_function$1("sign");
const neg = generate_unary_function$1("neg");
const reciprocal = generate_unary_function$1("reciprocal");
const nan_to_num = generate_unary_function$1("nan_to_num");
const reshape = generate_function$1("reshape");
const squeeze = generate_function$1("squeeze");
const unsqueeze = generate_function$1("unsqueeze");
const expand = generate_function$1("expand");
const sin = generate_unary_function$1("sin");
const cos = generate_unary_function$1("cos");
const tan = generate_unary_function$1("tan");
const sum = generate_function$1("sum");
const mean = generate_function$1("mean");
const min = generate_function$1("min");
const max = generate_function$1("max");
const transpose = generate_function$1("transpose");
const matmul = generate_binary_function("matmul");
const lt = generate_binary_function("lt");
const gt = generate_binary_function("gt");
const le = generate_binary_function("le");
const ge = generate_binary_function("ge");
const eq = generate_binary_function("eq");
const ne = generate_binary_function("ne");
function allclose(a, b, rtol = 1e-5, atol = 1e-8, equal_nan = false) {
  return a.allclose(b, rtol, atol, equal_nan);
}
__name(allclose, "allclose");
function flatten(input, start_dim = 0, end_dim = -1) {
  return input.flatten(start_dim, end_dim);
}
__name(flatten, "flatten");
function _get_strides(shape) {
  const strides = new Array(shape.length).fill(1);
  for (let i = shape.length - 2; i >= 0; i--) {
    strides[i] = strides[i + 1] * shape[i + 1];
  }
  return strides;
}
__name(_get_strides, "_get_strides");
function _unravel_index(index2, strides) {
  return strides.map((stride) => {
    const coord = Math.floor(index2 / stride);
    index2 %= stride;
    return coord;
  });
}
__name(_unravel_index, "_unravel_index");
function _ravel_index(coords, strides) {
  return coords.reduce((acc, coord, i) => acc + coord * strides[i], 0);
}
__name(_ravel_index, "_ravel_index");
function _get_reduction_shape(shape, dim, keepdim = false) {
  if (dim === void 0) return keepdim ? shape.map(() => 1) : [];
  const dims = Array.isArray(dim) ? dim : [dim];
  const normalized_dims = dims.map((d) => d < 0 ? d + shape.length : d);
  if (keepdim) {
    return shape.map((s, i) => normalized_dims.includes(i) ? 1 : s);
  } else {
    return shape.filter((_, i) => !normalized_dims.includes(i));
  }
}
__name(_get_reduction_shape, "_get_reduction_shape");
function BinaryFunctionMixin(operation, backward_operations, opName = null) {
  const kernel = /* @__PURE__ */ __name((a, as, b, bs, bcs, output_size) => {
    const res = Array(output_size);
    for (let x = 0; x < output_size; x++) {
      const a_index = _get_original_index(as, bcs, x);
      const b_index = _get_original_index(bs, bcs, x);
      res[x] = operation(a, b, a_index, b_index);
    }
    return res;
  }, "kernel");
  const forward_tensor = /* @__PURE__ */ __name((a, b, operation2 = null) => {
    const broadcast_shape = _broadcast_shape(a.shape, b.shape);
    const padded_a_shape = _pad_shape(a.shape, broadcast_shape);
    const padded_b_shape = _pad_shape(b.shape, broadcast_shape);
    const output_size = broadcast_shape.reduce((acc, val) => acc * val, 1);
    return new Tensor(
      kernel(
        a.data,
        padded_a_shape,
        b.data,
        padded_b_shape,
        broadcast_shape,
        output_size
      ),
      { requires_grad: resultRequiresGrad(a, b) },
      { operation: operation2, shape: broadcast_shape }
    );
  }, "forward_tensor");
  const result = {
    [opName]: class extends BinaryFunction {
      _forward(a, b) {
        const rg = resultRequiresGrad(a, b);
        if (rg) {
          this.saved_tensors = [a, b];
        }
        this.next_functions.push(a.grad_fn ? a.grad_fn : nullOp);
        this.next_functions.push(b.grad_fn ? b.grad_fn : nullOp);
        return forward_tensor(a, b, rg ? this : null);
      }
      _backward(dz) {
        const [a, b] = this.saved_tensors;
        const [aFn, bFn] = this.next_functions;
        backward_operations(a, b, aFn, bFn, dz);
      }
    }
  }[opName];
  if (opName) {
    registerOperation(opName, result);
  }
  return result;
}
__name(BinaryFunctionMixin, "BinaryFunctionMixin");
function UnaryFunctionMixin(operation, backward_operations, opName = null) {
  const kernel = /* @__PURE__ */ __name((a, output_size) => {
    const res = Array(output_size);
    for (let x = 0; x < output_size; x++) {
      res[x] = operation(a, x);
    }
    return res;
  }, "kernel");
  const forward_tensor = /* @__PURE__ */ __name((a, operation2 = null) => {
    const output_size = a.dataLength();
    return new Tensor(
      kernel(a.data, output_size),
      { requires_grad: resultRequiresGrad(a) },
      { operation: operation2, shape: a.shape }
    );
  }, "forward_tensor");
  const result = {
    [opName]: class extends UnaryFunction {
      _forward(a) {
        const rg = resultRequiresGrad(a);
        if (rg) {
          this.saved_tensors = [a];
        }
        this.next_functions.push(a.grad_fn ? a.grad_fn : nullOp);
        return forward_tensor(a, rg ? this : null);
      }
      _backward(dz) {
        const [a] = this.saved_tensors;
        const [aFn] = this.next_functions;
        backward_operations(a, aFn, dz);
      }
    }
  }[opName];
  if (opName) {
    registerOperation(opName, result);
  }
  return result;
}
__name(UnaryFunctionMixin, "UnaryFunctionMixin");
function ReductionFunctionMixin(init_val, reduce_op, backward_operations, opName = null, finalize_op) {
  const result = {
    [opName]: class extends TorchFunction {
      dim;
      keepdim;
      _forward(a, dim, keepdim = false) {
        this.dim = dim;
        this.keepdim = keepdim;
        const rg = resultRequiresGrad(a);
        if (rg) {
          this.saved_tensors = [a];
        }
        this.next_functions.push(a.grad_fn ? a.grad_fn : nullOp);
        const out_shape = _get_reduction_shape(a.shape, dim, keepdim);
        const out_size = out_shape.reduce((acc, val) => acc * val, 1);
        const res_data = new Array(out_size).fill(init_val);
        const counts = new Array(out_size).fill(0);
        const in_strides = _get_strides(a.shape);
        const out_strides = _get_strides(out_shape);
        const dims = dim === void 0 ? [] : Array.isArray(dim) ? dim : [dim];
        const normalized_dims = dims.map((d) => d < 0 ? d + a.shape.length : d);
        const is_full_reduce = dim === void 0;
        const aData = a.data;
        for (let i = 0; i < aData.length; i++) {
          const in_coords = _unravel_index(i, in_strides);
          let out_coords;
          if (is_full_reduce) {
            out_coords = keepdim ? in_coords.map(() => 0) : [];
          } else {
            out_coords = [];
            for (let j = 0; j < a.shape.length; j++) {
              if (normalized_dims.includes(j)) {
                if (keepdim) out_coords.push(0);
              } else {
                out_coords.push(in_coords[j]);
              }
            }
          }
          const out_idx = _ravel_index(out_coords, out_strides);
          res_data[out_idx] = reduce_op(res_data[out_idx], aData[i]);
          counts[out_idx]++;
        }
        if (finalize_op) {
          for (let i = 0; i < out_size; i++) {
            res_data[i] = finalize_op(res_data[i], counts[i]);
          }
        }
        return new Tensor(
          res_data,
          { requires_grad: rg },
          { operation: rg ? this : null, shape: out_shape }
        );
      }
      _backward(dz) {
        const [a] = this.saved_tensors;
        const [aFn] = this.next_functions;
        let restored_dz = dz;
        const target_shape = _get_reduction_shape(a.shape, this.dim, true);
        if (dz.shape.length !== target_shape.length) {
          restored_dz = dz.reshape(target_shape);
        }
        const expanded_dz = restored_dz.expand(a.shape);
        const grad_a = backward_operations(a, expanded_dz, this.dim, this.keepdim);
        aFn.backward(grad_a);
      }
    }
  }[opName];
  if (opName) {
    registerOperation(opName, result);
  }
  return result;
}
__name(ReductionFunctionMixin, "ReductionFunctionMixin");
function unbroadcast(result, original_shape) {
  const unbroadcasted_result = _unbroadcast(result.shape, original_shape, result.data);
  return new Tensor(unbroadcasted_result, { requires_grad: result.requires_grad }, { shape: original_shape });
}
__name(unbroadcast, "unbroadcast");
function broadcast(tensor2, result_shape) {
  return tensor2.mul(ones(result_shape));
}
__name(broadcast, "broadcast");
BinaryFunctionMixin(
  (a, b, a_index, _b_index) => a_index,
  () => {
  },
  "__left_index__"
);
BinaryFunctionMixin(
  (a, b, _a_index, b_index) => b_index,
  () => {
  },
  "__right_index__"
);
BinaryFunctionMixin(
  (a, b, a_index, b_index) => a[a_index] + b[b_index],
  (_a, _b, aFn, bFn, dz) => {
    aFn.backward(dz);
    bFn.backward(dz);
  },
  "add"
);
BinaryFunctionMixin(
  (a, b, a_index, b_index) => a[a_index] - b[b_index],
  (_a, _b, aFn, bFn, dz) => {
    aFn.backward(dz);
    bFn.backward(dz.mul(new Tensor(-1)));
  },
  "sub"
);
BinaryFunctionMixin(
  (a, b, a_index, b_index) => a[a_index] * b[b_index],
  (a, b, aFn, bFn, dz) => {
    aFn.backward(dz.mul(b));
    bFn.backward(dz.mul(a));
  },
  "mul"
);
BinaryFunctionMixin(
  (a, b, a_index, b_index) => a[a_index] / b[b_index],
  (a, b, aFn, bFn, dz) => {
    aFn.backward(dz.div(b));
    bFn.backward(dz.mul(a).mul(new Tensor(-1)).div(b).div(b));
  },
  "div"
);
function _where(mask, x, fallback) {
  const fb = typeof fallback === "number" ? fallback : null;
  const maskData = mask.data;
  const xData = x.data;
  const fbData = fb === null ? fallback.data : null;
  const data = new Array(x.dataLength());
  for (let i = 0; i < data.length; i++) {
    data[i] = maskData[i] ? xData[i] : fb !== null ? fb : fbData[i];
  }
  return new Tensor(data, {}, { shape: x.shape });
}
__name(_where, "_where");
BinaryFunctionMixin(
  (a, b, a_index, b_index) => Math.pow(a[a_index], b[b_index]),
  (a, b, aFn, bFn, dz) => {
    const ga = dz.mul(b).mul(a.pow(b.sub(new Tensor(1))));
    const gb = dz.mul(a.pow(b)).mul(a.log());
    aFn.backward(_where(a.ne(0), ga, ga.nan_to_num()));
    bFn.backward(_where(a.ne(0), gb, 0));
  },
  "pow"
);
BinaryFunctionMixin(
  (a, b, a_index, b_index) => a[a_index] % b[b_index],
  (_a, _b, aFn, _bFn, dz) => {
    aFn.backward(dz);
  },
  "fmod"
);
BinaryFunctionMixin(
  (a, b, a_index, b_index) => Math.max(a[a_index], b[b_index]),
  (a, b, aFn, bFn, dz) => {
    const eq_mask = a.eq(b);
    const a_mask = a.gt(b).add(eq_mask.mul(new Tensor(0.5)));
    const b_mask = b.gt(a).add(eq_mask.mul(new Tensor(0.5)));
    aFn.backward(dz.mul(a_mask));
    bFn.backward(dz.mul(b_mask));
  },
  "maximum"
);
BinaryFunctionMixin(
  (a, b, a_index, b_index) => Math.min(a[a_index], b[b_index]),
  (a, b, aFn, bFn, dz) => {
    const eq_mask = a.eq(b);
    const a_mask = a.lt(b).add(eq_mask.mul(new Tensor(0.5)));
    const b_mask = b.lt(a).add(eq_mask.mul(new Tensor(0.5)));
    aFn.backward(dz.mul(a_mask));
    bFn.backward(dz.mul(b_mask));
  },
  "minimum"
);
function _powint_tensor(a, n, operation = null) {
  const aData = a.data;
  const data = new Array(a.dataLength());
  for (let i = 0; i < data.length; i++) {
    data[i] = Math.pow(aData[i], n);
  }
  return new Tensor(
    data,
    { requires_grad: resultRequiresGrad(a) },
    { operation, shape: a.shape }
  );
}
__name(_powint_tensor, "_powint_tensor");
const _PowInt = class _PowInt extends TorchFunction {
  n;
  _forward(a, n) {
    const rg = resultRequiresGrad(a);
    if (rg) {
      this.saved_tensors = [a];
      this.n = n;
    }
    this.next_functions.push(a.grad_fn ? a.grad_fn : nullOp);
    return _powint_tensor(a, n, rg ? this : null);
  }
  _backward(dz) {
    const [a] = this.saved_tensors;
    const n = this.n;
    const [aFn] = this.next_functions;
    aFn.backward(dz.mul(n).mul(a.pow(n - 1)));
  }
};
__name(_PowInt, "PowInt");
let PowInt = _PowInt;
registerOperation("powint", PowInt);
UnaryFunctionMixin(
  (a, a_index) => Math.log(a[a_index]),
  (a, aFn, dz) => {
    aFn.backward(dz.mul(new Tensor(1).div(a)));
  },
  "log"
);
UnaryFunctionMixin(
  (a, x) => Math.sqrt(a[x]),
  (a, aFn, dz) => {
    aFn.backward(dz.mul(new Tensor(1).div(a.sqrt()).div(2)));
  },
  "sqrt"
);
UnaryFunctionMixin(
  (a, x) => Math.exp(a[x]),
  (a, aFn, dz) => {
    aFn.backward(dz.mul(a.exp()));
  },
  "exp"
);
UnaryFunctionMixin(
  (a, x) => a[x] * a[x],
  (a, aFn, dz) => {
    aFn.backward(dz.mul(a).mul(new Tensor(2)));
  },
  "square"
);
UnaryFunctionMixin(
  (a, x) => Math.abs(a[x]),
  (a, aFn, dz) => {
    aFn.backward(dz.mul(sign(a)));
  },
  "abs"
);
UnaryFunctionMixin(
  (a, x) => Math.sign(a[x]),
  (_a, aFn) => {
    aFn.backward(0);
  },
  "sign"
);
UnaryFunctionMixin(
  (a, x) => -a[x],
  (_a, aFn, dz) => {
    aFn.backward(dz.mul(new Tensor(-1)));
  },
  "neg"
);
UnaryFunctionMixin(
  (a, x) => 1 / a[x],
  (a, aFn, dz) => {
    aFn.backward(dz.mul(a.pow(-2)).neg());
  },
  "reciprocal"
);
UnaryFunctionMixin(
  (a, x) => {
    const v = a[x];
    if (Number.isNaN(v)) return 0;
    if (v === Infinity) return 34028235e31;
    if (v === -Infinity) return -34028235e31;
    return v;
  },
  (a, aFn, dz) => {
    aFn.backward(dz);
  },
  "nan_to_num"
);
const _Reshape = class _Reshape extends TorchFunction {
  _forward(a, shape) {
    const previous_length = a.dataLength();
    const target_length = shape.reduce((acc, val) => acc * val, 1);
    if (previous_length !== target_length) {
      throw new Error("Shape mismatch: " + a.shape + " and " + shape);
    }
    const rg = resultRequiresGrad(a);
    if (rg) {
      this.saved_tensors = [a];
    }
    if (a.grad_fn) {
      this.next_functions.push(a.grad_fn);
    } else {
      this.next_functions.push(nullOp);
    }
    return new Tensor(
      a.data,
      { requires_grad: rg },
      { operation: rg ? this : null, shape }
    );
  }
  _backward(dz) {
    const [a] = this.saved_tensors;
    const [aFn] = this.next_functions;
    aFn.backward(dz.reshape(a.shape));
  }
};
__name(_Reshape, "Reshape");
let Reshape = _Reshape;
registerOperation("reshape", Reshape);
const _Flatten = class _Flatten extends TorchFunction {
  _forward(a, start_dim = 0, end_dim = -1) {
    const ndim = a.shape.length;
    const sd = start_dim < 0 ? start_dim + ndim : start_dim;
    const ed = end_dim < 0 ? end_dim + ndim : end_dim;
    const newShape = [
      ...a.shape.slice(0, sd),
      a.shape.slice(sd, ed + 1).reduce((acc, val) => acc * val, 1),
      ...a.shape.slice(ed + 1)
    ];
    const rg = resultRequiresGrad(a);
    if (rg) {
      this.saved_tensors = [a];
    }
    if (a.grad_fn) {
      this.next_functions.push(a.grad_fn);
    } else {
      this.next_functions.push(nullOp);
    }
    return new Tensor(
      a.data,
      { requires_grad: rg },
      { operation: rg ? this : null, shape: newShape }
    );
  }
  _backward(dz) {
    const [a] = this.saved_tensors;
    const [aFn] = this.next_functions;
    aFn.backward(dz.reshape(a.shape));
  }
};
__name(_Flatten, "Flatten");
let Flatten = _Flatten;
registerOperation("flatten", Flatten);
const _Squeeze = class _Squeeze extends TorchFunction {
  _forward(a, dim) {
    const rg = resultRequiresGrad(a);
    if (rg) {
      this.saved_tensors = [a];
    }
    if (a.grad_fn) {
      this.next_functions.push(a.grad_fn);
    } else {
      this.next_functions.push(nullOp);
    }
    let shape = [...a.shape];
    if (dim !== void 0) {
      if (dim < 0) {
        dim += a.shape.length;
      }
      if (shape[dim] === 1) {
        shape.splice(dim, 1);
      }
    } else {
      shape = shape.filter((d) => d !== 1);
    }
    return new Tensor(
      a.data,
      { requires_grad: rg },
      { operation: rg ? this : null, shape }
    );
  }
  _backward(dz) {
    const [a] = this.saved_tensors;
    const [aFn] = this.next_functions;
    aFn.backward(dz.reshape(a.shape));
  }
};
__name(_Squeeze, "Squeeze");
let Squeeze = _Squeeze;
registerOperation("squeeze", Squeeze);
const _Unsqueeze = class _Unsqueeze extends TorchFunction {
  _forward(a, dim) {
    const rg = resultRequiresGrad(a);
    if (rg) {
      this.saved_tensors = [a];
    }
    if (a.grad_fn) {
      this.next_functions.push(a.grad_fn);
    } else {
      this.next_functions.push(nullOp);
    }
    if (dim < 0) {
      dim += a.shape.length + 1;
    }
    const shape = [...a.shape];
    shape.splice(dim, 0, 1);
    return new Tensor(
      a.data,
      { requires_grad: rg },
      { operation: rg ? this : null, shape }
    );
  }
  _backward(dz) {
    const [a] = this.saved_tensors;
    const [aFn] = this.next_functions;
    aFn.backward(dz.reshape(a.shape));
  }
};
__name(_Unsqueeze, "Unsqueeze");
let Unsqueeze = _Unsqueeze;
registerOperation("unsqueeze", Unsqueeze);
const _Expand = class _Expand extends TorchFunction {
  _forward(a, expanded_shape) {
    const rg = resultRequiresGrad(a);
    if (rg) {
      this.saved_tensors = [a];
    }
    if (a.grad_fn) {
      this.next_functions.push(a.grad_fn);
    } else {
      this.next_functions.push(nullOp);
    }
    const offset = expanded_shape.length - a.shape.length;
    const target_shape = expanded_shape.map((dim, i) => {
      if (dim === -1) {
        const orig_i = i - offset;
        return orig_i >= 0 ? a.shape[orig_i] : 1;
      }
      return dim;
    });
    const outData = broadcast(a, target_shape).data;
    return new Tensor(
      outData,
      { requires_grad: rg },
      { operation: rg ? this : null, shape: target_shape }
    );
  }
  _backward(dz) {
    const [a] = this.saved_tensors;
    const [aFn] = this.next_functions;
    aFn.backward(unbroadcast(dz, a.shape));
  }
};
__name(_Expand, "Expand");
let Expand = _Expand;
registerOperation("expand", Expand);
UnaryFunctionMixin(
  (a, x) => Math.sin(a[x]),
  (a, aFn, dz) => {
    aFn.backward(dz.mul(a.cos()));
  },
  "sin"
);
UnaryFunctionMixin(
  (a, x) => Math.cos(a[x]),
  (a, aFn, dz) => {
    aFn.backward(dz.mul(a.sin().neg()));
  },
  "cos"
);
UnaryFunctionMixin(
  (a, x) => Math.tan(a[x]),
  (a, aFn, dz) => {
    aFn.backward(dz.mul(a.cos().pow(-2)));
  },
  "tan"
);
const Sum = ReductionFunctionMixin(
  0,
  (acc, val) => acc + val,
  (a, expanded_dz) => expanded_dz,
  "sum"
);
const Mean = ReductionFunctionMixin(
  0,
  (acc, val) => acc + val,
  (a, expanded_dz, dim) => {
    const target_shape = _get_reduction_shape(a.shape, dim, false);
    const out_size = target_shape.length > 0 ? target_shape.reduce((acc, v) => acc * v, 1) : 1;
    const N = a.dataLength() / out_size;
    return expanded_dz.mul(new Tensor([1 / N]));
  },
  "mean",
  (acc, count) => acc / count
);
const Max = ReductionFunctionMixin(
  -Infinity,
  (acc, val) => Math.max(acc, val),
  (a, expanded_dz, dim) => {
    const max_tensor = a.max(dim, true);
    const max_expanded = max_tensor.expand(a.shape);
    const mask = a.eq(max_expanded).detach();
    return expanded_dz.mul(mask);
  },
  "max"
);
const Min = ReductionFunctionMixin(
  Infinity,
  (acc, val) => Math.min(acc, val),
  (a, expanded_dz, dim) => {
    const min_tensor = a.min(dim, true);
    const min_expanded = min_tensor.expand(a.shape);
    const mask = a.eq(min_expanded).detach();
    return expanded_dz.mul(mask);
  },
  "min"
);
function _transpose_tensor(a, dim0, dim1, operation = null) {
  if (a.shape.length + dim0 < 0 || a.shape.length + dim1 < 0) {
    throw new Error(`Transpose: Dimension out of range (${dim0} and ${dim1})`);
  }
  dim0 = dim0 < 0 ? a.shape.length + dim0 : dim0;
  dim1 = dim1 < 0 ? a.shape.length + dim1 : dim1;
  const output_shape = [...a.shape];
  [output_shape[dim0], output_shape[dim1]] = [output_shape[dim1], output_shape[dim0]];
  const size = a.dataLength();
  const data = new Array(size);
  const aData = a.data;
  const a_strides = new Array(a.shape.length);
  const out_strides = new Array(output_shape.length);
  for (let i = a.shape.length - 1, s = 1; i >= 0; i--) {
    a_strides[i] = s;
    s *= a.shape[i];
  }
  for (let i = output_shape.length - 1, s = 1; i >= 0; i--) {
    out_strides[i] = s;
    s *= output_shape[i];
  }
  for (let i = 0; i < size; i++) {
    let idx = i;
    let input_idx = 0;
    for (let d = 0; d < output_shape.length; d++) {
      const stride = out_strides[d];
      const coord = Math.floor(idx / stride);
      idx %= stride;
      let input_d = d;
      if (d === dim0) input_d = dim1;
      else if (d === dim1) input_d = dim0;
      input_idx += coord * a_strides[input_d];
    }
    data[i] = aData[input_idx];
  }
  return new Tensor(
    data,
    { requires_grad: resultRequiresGrad(a) },
    { operation, shape: output_shape }
  );
}
__name(_transpose_tensor, "_transpose_tensor");
const _Transpose = class _Transpose extends TorchFunction {
  dim0;
  dim1;
  _forward(a, dim0, dim1) {
    const rg = resultRequiresGrad(a);
    if (rg) {
      this.saved_tensors = [a];
      this.dim0 = dim0;
      this.dim1 = dim1;
    }
    this.next_functions.push(a.grad_fn ? a.grad_fn : nullOp);
    return _transpose_tensor(a, dim0, dim1, rg ? this : null);
  }
  _backward(dz) {
    const dim0 = this.dim0;
    const dim1 = this.dim1;
    const [aFn] = this.next_functions;
    aFn.backward(dz.transpose(dim0, dim1));
  }
};
__name(_Transpose, "Transpose");
let Transpose = _Transpose;
registerOperation("transpose", Transpose);
function _matmul_tensor(a, b, operation = null) {
  if (a.shape.length == 1 && b.shape.length == 1) {
    return [a.mul(b).sum(), []];
  }
  const a_1d = a.shape.length == 1;
  const b_1d = b.shape.length == 1;
  const a_shape = a_1d ? [1, a.shape[0]] : a.shape;
  const b_shape = b_1d ? [b.shape[0], 1] : b.shape;
  if (a_shape[a_shape.length - 1] != b_shape[b_shape.length - 2]) {
    throw new Error("Shape mismatch: " + a.shape + " and " + b.shape);
  }
  const broadcast_shape = _broadcast_shape(a_shape.slice(0, -2), b_shape.slice(0, -2)).concat([
    a_shape[a_shape.length - 2],
    b_shape[b_shape.length - 1]
  ]);
  const output_size = broadcast_shape.reduce((acc, val) => acc * val, 1);
  const data = new Array(output_size).fill(0);
  const padded_a_shape = _pad_shape(a_shape, broadcast_shape);
  const padded_b_shape = _pad_shape(b_shape, broadcast_shape);
  const dim_M = broadcast_shape[broadcast_shape.length - 2];
  const dim_N = broadcast_shape[broadcast_shape.length - 1];
  const dim_K = a_shape[a_shape.length - 1];
  const aData = a.data;
  const bData = b.data;
  for (let i = 0; i < output_size; i++) {
    const mn_idx = i % (dim_M * dim_N);
    const m = Math.floor(mn_idx / dim_N);
    const n = mn_idx % dim_N;
    const base_a = _get_original_index(padded_a_shape, broadcast_shape, i - n);
    const base_b = _get_original_index(padded_b_shape, broadcast_shape, i - m * dim_N);
    let sum2 = 0;
    for (let k = 0; k < dim_K; k++) {
      sum2 += aData[base_a + k] * bData[base_b + k * dim_N];
    }
    data[i] = sum2;
  }
  let shape_after_removing_extra_dims = [...broadcast_shape];
  if (a_1d) {
    shape_after_removing_extra_dims = shape_after_removing_extra_dims.slice(0, -2).concat([broadcast_shape[broadcast_shape.length - 1]]);
  }
  if (b_1d) {
    shape_after_removing_extra_dims = shape_after_removing_extra_dims.slice(0, -1);
  }
  return [new Tensor(
    data,
    { requires_grad: resultRequiresGrad(a, b) },
    { operation, shape: shape_after_removing_extra_dims }
  ), shape_after_removing_extra_dims];
}
__name(_matmul_tensor, "_matmul_tensor");
const _Matmul = class _Matmul extends BinaryFunction {
  shape;
  _forward(a, b) {
    const rg = resultRequiresGrad(a, b);
    if (rg) {
      this.saved_tensors = [a, b];
    }
    this.next_functions.push(a.grad_fn ? a.grad_fn : nullOp);
    this.next_functions.push(b.grad_fn ? b.grad_fn : nullOp);
    const result = _matmul_tensor(a, b, rg ? this : null);
    this.shape = result[1];
    return result[0];
  }
  _backward(dz) {
    const [a, b] = this.saved_tensors;
    const [aFn, bFn] = this.next_functions;
    if (a.shape.length === 1 && b.shape.length === 1) {
      aFn.backward(dz.mul(b));
      bFn.backward(dz.mul(a));
      return;
    }
    if (a.shape.length === 1) {
      const dz1 = dz.unsqueeze(-2);
      const a1 = a.unsqueeze(-2);
      let da2 = dz1.matmul(b.transpose(-2, -1));
      let db2 = a1.transpose(-2, -1).matmul(dz1);
      da2 = da2.squeeze(-2);
      db2 = unbroadcast(db2, b.shape);
      aFn.backward(da2);
      bFn.backward(db2);
      return;
    }
    if (b.shape.length === 1) {
      const dz1 = dz.unsqueeze(-1);
      const b1 = b.unsqueeze(-1);
      let da2 = dz1.matmul(b1.transpose(-2, -1));
      let db2 = a.transpose(-2, -1).matmul(dz1);
      da2 = unbroadcast(da2, a.shape);
      db2 = db2.squeeze(-1);
      aFn.backward(da2);
      bFn.backward(db2);
      return;
    }
    let da = dz.matmul(b.transpose(-2, -1));
    let db = a.transpose(-2, -1).matmul(dz);
    da = unbroadcast(da, a.shape);
    db = unbroadcast(db, b.shape);
    aFn.backward(da);
    bFn.backward(db);
  }
};
__name(_Matmul, "Matmul");
let Matmul = _Matmul;
registerOperation("matmul", Matmul);
function _convNd_forward(input, weight, bias, stride, padding, dilation, groups, dims) {
  const stride_arr = typeof stride === "number" ? new Array(dims).fill(stride) : stride;
  const padding_arr = typeof padding === "number" ? new Array(dims).fill(padding) : padding;
  const dilation_arr = typeof dilation === "number" ? new Array(dims).fill(dilation) : dilation;
  const batch_size = input.shape[0];
  const in_channels = input.shape[1];
  const out_channels = weight.shape[0];
  const in_dims = input.shape.slice(2);
  const kernel_dims = weight.shape.slice(2);
  if (in_channels !== weight.shape[1] * groups) {
    throw new Error(`in_channels (${in_channels}) must be divisible by groups (${groups}) and match weight.shape[1] * groups (${weight.shape[1] * groups})`);
  }
  const out_dims = in_dims.map((in_dim, i) => {
    return Math.floor((in_dim + 2 * padding_arr[i] - dilation_arr[i] * (kernel_dims[i] - 1) - 1) / stride_arr[i] + 1);
  });
  const output_shape = [batch_size, out_channels, ...out_dims];
  const output_size = output_shape.reduce((a, b) => a * b, 1);
  const output_data = new Array(output_size).fill(0);
  const get_strides = /* @__PURE__ */ __name((shape) => {
    const strides = new Array(shape.length);
    let s = 1;
    for (let i = shape.length - 1; i >= 0; i--) {
      strides[i] = s;
      s *= shape[i];
    }
    return strides;
  }, "get_strides");
  const in_strides = get_strides(input.shape);
  const w_strides = get_strides(weight.shape);
  const out_strides = get_strides(output_shape);
  const in_channels_per_group = in_channels / groups;
  const out_channels_per_group = out_channels / groups;
  const inputData = input.data;
  const weightData = weight.data;
  const biasData = bias ? bias.data : null;
  for (let b = 0; b < batch_size; b++) {
    for (let g = 0; g < groups; g++) {
      for (let oc_g = 0; oc_g < out_channels_per_group; oc_g++) {
        const oc = g * out_channels_per_group + oc_g;
        const out_spatial_size = out_dims.reduce((a, b2) => a * b2, 1);
        for (let os_idx = 0; os_idx < out_spatial_size; os_idx++) {
          const os_coords = new Array(dims);
          let temp_os = os_idx;
          for (let d = dims - 1; d >= 0; d--) {
            os_coords[d] = temp_os % out_dims[d];
            temp_os = Math.floor(temp_os / out_dims[d]);
          }
          let sum2 = biasData ? biasData[oc] : 0;
          for (let ic_g = 0; ic_g < in_channels_per_group; ic_g++) {
            const ic = g * in_channels_per_group + ic_g;
            const kernel_spatial_size = kernel_dims.reduce((a, b2) => a * b2, 1);
            for (let ks_idx = 0; ks_idx < kernel_spatial_size; ks_idx++) {
              const ks_coords = new Array(dims);
              let temp_ks = ks_idx;
              for (let d = dims - 1; d >= 0; d--) {
                ks_coords[d] = temp_ks % kernel_dims[d];
                temp_ks = Math.floor(temp_ks / kernel_dims[d]);
              }
              let is_valid = true;
              const is_coords = new Array(dims);
              for (let d = 0; d < dims; d++) {
                const in_coord = os_coords[d] * stride_arr[d] + ks_coords[d] * dilation_arr[d] - padding_arr[d];
                if (in_coord < 0 || in_coord >= in_dims[d]) {
                  is_valid = false;
                  break;
                }
                is_coords[d] = in_coord;
              }
              if (is_valid) {
                let in_flat_idx = b * in_strides[0] + ic * in_strides[1];
                for (let d = 0; d < dims; d++) in_flat_idx += is_coords[d] * in_strides[d + 2];
                let w_flat_idx = oc * w_strides[0] + ic_g * w_strides[1];
                for (let d = 0; d < dims; d++) w_flat_idx += ks_coords[d] * w_strides[d + 2];
                sum2 += inputData[in_flat_idx] * weightData[w_flat_idx];
              }
            }
          }
          let out_flat_idx = b * out_strides[0] + oc * out_strides[1];
          for (let d = 0; d < dims; d++) out_flat_idx += os_coords[d] * out_strides[d + 2];
          output_data[out_flat_idx] = sum2;
        }
      }
    }
  }
  return new Tensor(output_data, { requires_grad: false }, { shape: output_shape });
}
__name(_convNd_forward, "_convNd_forward");
function _convNd_backward(dz, input, weight, bias, stride, padding, dilation, groups, dims, input_requires_grad, weight_requires_grad) {
  const stride_arr = typeof stride === "number" ? new Array(dims).fill(stride) : stride;
  const padding_arr = typeof padding === "number" ? new Array(dims).fill(padding) : padding;
  const dilation_arr = typeof dilation === "number" ? new Array(dims).fill(dilation) : dilation;
  const batch_size = input.shape[0];
  const in_channels = input.shape[1];
  const out_channels = weight.shape[0];
  const in_dims = input.shape.slice(2);
  const kernel_dims = weight.shape.slice(2);
  const out_dims = dz.shape.slice(2);
  const get_strides = /* @__PURE__ */ __name((shape) => {
    const strides = new Array(shape.length);
    let s = 1;
    for (let i = shape.length - 1; i >= 0; i--) {
      strides[i] = s;
      s *= shape[i];
    }
    return strides;
  }, "get_strides");
  const in_strides = get_strides(input.shape);
  const w_strides = get_strides(weight.shape);
  const dz_strides = get_strides(dz.shape);
  const dzData = dz.data;
  const weightDataBwd = weight.data;
  const inputDataBwd = input.data;
  let dInput = null;
  let dWeight = null;
  let dBias = null;
  let dInput_data = null;
  let dWeight_data = null;
  if (input_requires_grad) {
    dInput_data = new Array(input.dataLength()).fill(0);
  }
  if (weight_requires_grad) {
    dWeight_data = new Array(weight.dataLength()).fill(0);
  }
  const in_channels_per_group = in_channels / groups;
  const out_channels_per_group = out_channels / groups;
  for (let b = 0; b < batch_size; b++) {
    for (let g = 0; g < groups; g++) {
      for (let oc_g = 0; oc_g < out_channels_per_group; oc_g++) {
        const oc = g * out_channels_per_group + oc_g;
        const out_spatial_size = out_dims.reduce((a, b2) => a * b2, 1);
        for (let os_idx = 0; os_idx < out_spatial_size; os_idx++) {
          const os_coords = new Array(dims);
          let temp_os = os_idx;
          for (let d = dims - 1; d >= 0; d--) {
            os_coords[d] = temp_os % out_dims[d];
            temp_os = Math.floor(temp_os / out_dims[d]);
          }
          let dz_flat_idx = b * dz_strides[0] + oc * dz_strides[1];
          for (let d = 0; d < dims; d++) dz_flat_idx += os_coords[d] * dz_strides[d + 2];
          const dz_val = dzData[dz_flat_idx];
          for (let ic_g = 0; ic_g < in_channels_per_group; ic_g++) {
            const ic = g * in_channels_per_group + ic_g;
            const kernel_spatial_size = kernel_dims.reduce((a, b2) => a * b2, 1);
            for (let ks_idx = 0; ks_idx < kernel_spatial_size; ks_idx++) {
              const ks_coords = new Array(dims);
              let temp_ks = ks_idx;
              for (let d = dims - 1; d >= 0; d--) {
                ks_coords[d] = temp_ks % kernel_dims[d];
                temp_ks = Math.floor(temp_ks / kernel_dims[d]);
              }
              let is_valid = true;
              const is_coords = new Array(dims);
              for (let d = 0; d < dims; d++) {
                const in_coord = os_coords[d] * stride_arr[d] + ks_coords[d] * dilation_arr[d] - padding_arr[d];
                if (in_coord < 0 || in_coord >= in_dims[d]) {
                  is_valid = false;
                  break;
                }
                is_coords[d] = in_coord;
              }
              if (is_valid) {
                let in_flat_idx = b * in_strides[0] + ic * in_strides[1];
                for (let d = 0; d < dims; d++) in_flat_idx += is_coords[d] * in_strides[d + 2];
                let w_flat_idx = oc * w_strides[0] + ic_g * w_strides[1];
                for (let d = 0; d < dims; d++) w_flat_idx += ks_coords[d] * w_strides[d + 2];
                if (input_requires_grad) {
                  dInput_data[in_flat_idx] += dz_val * weightDataBwd[w_flat_idx];
                }
                if (weight_requires_grad) {
                  dWeight_data[w_flat_idx] += dz_val * inputDataBwd[in_flat_idx];
                }
              }
            }
          }
        }
      }
    }
  }
  if (input_requires_grad) dInput = new Tensor(dInput_data, { requires_grad: false }, { shape: input.shape });
  if (weight_requires_grad) dWeight = new Tensor(dWeight_data, { requires_grad: false }, { shape: weight.shape });
  if (bias && bias.requires_grad) {
    const sum_dims = [0];
    for (let d = 2; d < dz.shape.length; d++) sum_dims.push(d);
    dBias = dz.sum(sum_dims);
  }
  return [dInput, dWeight, dBias];
}
__name(_convNd_backward, "_convNd_backward");
const _Conv1dOp = class _Conv1dOp extends TorchFunction {
  stride;
  padding;
  dilation;
  groups;
  _forward(input, weight, bias, stride = 1, padding = 0, dilation = 1, groups = 1) {
    const rg = resultRequiresGrad(input, weight, ...bias ? [bias] : []);
    if (rg) {
      this.saved_tensors = [input, weight];
      if (bias) this.saved_tensors.push(bias);
    }
    this.next_functions.push(input.grad_fn ? input.grad_fn : nullOp);
    this.next_functions.push(weight.grad_fn ? weight.grad_fn : nullOp);
    if (bias) this.next_functions.push(bias.grad_fn ? bias.grad_fn : nullOp);
    this.stride = stride;
    this.padding = padding;
    this.dilation = dilation;
    this.groups = groups;
    const res = _convNd_forward(input, weight, bias, stride, padding, dilation, groups, 1);
    res.requires_grad = rg;
    res.grad_fn = rg ? this : null;
    return res;
  }
  _backward(dz) {
    const input = this.saved_tensors[0];
    const weight = this.saved_tensors[1];
    const bias = this.saved_tensors.length > 2 ? this.saved_tensors[2] : null;
    const [inputFn, weightFn, biasFn] = this.next_functions;
    const [dInput, dWeight, dBias] = _convNd_backward(
      dz,
      input,
      weight,
      bias,
      this.stride,
      this.padding,
      this.dilation,
      this.groups,
      1,
      input.requires_grad,
      weight.requires_grad
    );
    if (input.requires_grad) inputFn.backward(dInput);
    if (weight.requires_grad) weightFn.backward(dWeight);
    if (bias && bias.requires_grad) biasFn.backward(dBias);
  }
};
__name(_Conv1dOp, "Conv1dOp");
let Conv1dOp = _Conv1dOp;
registerOperation("conv1d", Conv1dOp);
const _Conv2dOp = class _Conv2dOp extends TorchFunction {
  stride;
  padding;
  dilation;
  groups;
  _forward(input, weight, bias, stride = 1, padding = 0, dilation = 1, groups = 1) {
    const rg = resultRequiresGrad(input, weight, ...bias ? [bias] : []);
    if (rg) {
      this.saved_tensors = [input, weight];
      if (bias) this.saved_tensors.push(bias);
    }
    this.next_functions.push(input.grad_fn ? input.grad_fn : nullOp);
    this.next_functions.push(weight.grad_fn ? weight.grad_fn : nullOp);
    if (bias) this.next_functions.push(bias.grad_fn ? bias.grad_fn : nullOp);
    this.stride = stride;
    this.padding = padding;
    this.dilation = dilation;
    this.groups = groups;
    const res = _convNd_forward(input, weight, bias, stride, padding, dilation, groups, 2);
    res.requires_grad = rg;
    res.grad_fn = rg ? this : null;
    return res;
  }
  _backward(dz) {
    const input = this.saved_tensors[0];
    const weight = this.saved_tensors[1];
    const bias = this.saved_tensors.length > 2 ? this.saved_tensors[2] : null;
    const [inputFn, weightFn, biasFn] = this.next_functions;
    const [dInput, dWeight, dBias] = _convNd_backward(
      dz,
      input,
      weight,
      bias,
      this.stride,
      this.padding,
      this.dilation,
      this.groups,
      2,
      input.requires_grad,
      weight.requires_grad
    );
    if (input.requires_grad) inputFn.backward(dInput);
    if (weight.requires_grad) weightFn.backward(dWeight);
    if (bias && bias.requires_grad) biasFn.backward(dBias);
  }
};
__name(_Conv2dOp, "Conv2dOp");
let Conv2dOp = _Conv2dOp;
registerOperation("conv2d", Conv2dOp);
const _Conv3dOp = class _Conv3dOp extends TorchFunction {
  stride;
  padding;
  dilation;
  groups;
  _forward(input, weight, bias, stride = 1, padding = 0, dilation = 1, groups = 1) {
    const rg = resultRequiresGrad(input, weight, ...bias ? [bias] : []);
    if (rg) {
      this.saved_tensors = [input, weight];
      if (bias) this.saved_tensors.push(bias);
    }
    this.next_functions.push(input.grad_fn ? input.grad_fn : nullOp);
    this.next_functions.push(weight.grad_fn ? weight.grad_fn : nullOp);
    if (bias) this.next_functions.push(bias.grad_fn ? bias.grad_fn : nullOp);
    this.stride = stride;
    this.padding = padding;
    this.dilation = dilation;
    this.groups = groups;
    const res = _convNd_forward(input, weight, bias, stride, padding, dilation, groups, 3);
    res.requires_grad = rg;
    res.grad_fn = rg ? this : null;
    return res;
  }
  _backward(dz) {
    const input = this.saved_tensors[0];
    const weight = this.saved_tensors[1];
    const bias = this.saved_tensors.length > 2 ? this.saved_tensors[2] : null;
    const [inputFn, weightFn, biasFn] = this.next_functions;
    const [dInput, dWeight, dBias] = _convNd_backward(
      dz,
      input,
      weight,
      bias,
      this.stride,
      this.padding,
      this.dilation,
      this.groups,
      3,
      input.requires_grad,
      weight.requires_grad
    );
    if (input.requires_grad) inputFn.backward(dInput);
    if (weight.requires_grad) weightFn.backward(dWeight);
    if (bias && bias.requires_grad) biasFn.backward(dBias);
  }
};
__name(_Conv3dOp, "Conv3dOp");
let Conv3dOp = _Conv3dOp;
registerOperation("conv3d", Conv3dOp);
BinaryFunctionMixin(
  (a, b, a_index, b_index) => a[a_index] < b[b_index] ? 1 : 0,
  () => {
  },
  "lt"
);
BinaryFunctionMixin(
  (a, b, a_index, b_index) => a[a_index] > b[b_index] ? 1 : 0,
  () => {
  },
  "gt"
);
BinaryFunctionMixin(
  (a, b, a_index, b_index) => a[a_index] <= b[b_index] ? 1 : 0,
  () => {
  },
  "le"
);
BinaryFunctionMixin(
  (a, b, a_index, b_index) => a[a_index] >= b[b_index] ? 1 : 0,
  () => {
  },
  "ge"
);
BinaryFunctionMixin(
  (a, b, a_index, b_index) => a[a_index] == b[b_index] ? 1 : 0,
  () => {
  },
  "eq"
);
BinaryFunctionMixin(
  (a, b, a_index, b_index) => a[a_index] != b[b_index] ? 1 : 0,
  () => {
  },
  "ne"
);
UnaryFunctionMixin(
  (a, x) => Math.max(a[x], 0),
  (a, aFn, dz) => {
    aFn.backward(dz.mul(a.gt(0)));
  },
  "relu"
);
UnaryFunctionMixin(
  (a, x) => 1 / (1 + Math.exp(-a[x])),
  (a, aFn, dz) => {
    const res = a.sigmoid();
    aFn.backward(res.mul(res.mul(-1).add(1)).mul(dz));
  },
  "sigmoid"
);
const _CrossEntropyLossOp = class _CrossEntropyLossOp extends TorchFunction {
  N = 0;
  C = 0;
  reduction = "mean";
  _forward(input, target, reduction = "mean") {
    this.reduction = reduction;
    const rg = resultRequiresGrad(input);
    if (rg) {
      this.saved_tensors = [input, target];
    }
    this.next_functions.push(input.grad_fn ? input.grad_fn : nullOp);
    const shape = input.shape;
    const N = shape[0];
    const C = shape[1];
    this.N = N;
    this.C = C;
    const inputData = input.data;
    const targetData = target.data;
    const perSampleLoss = new Array(N);
    for (let i = 0; i < N; i++) {
      const rowOffset = i * C;
      let maxVal = -Infinity;
      for (let j = 0; j < C; j++) {
        if (inputData[rowOffset + j] > maxVal) {
          maxVal = inputData[rowOffset + j];
        }
      }
      let sumExp = 0;
      for (let j = 0; j < C; j++) {
        sumExp += Math.exp(inputData[rowOffset + j] - maxVal);
      }
      const logSumExp = Math.log(sumExp);
      const t = targetData[i];
      const logSoftmax = inputData[rowOffset + t] - maxVal - logSumExp;
      perSampleLoss[i] = -logSoftmax;
    }
    let lossData;
    let resultShape;
    if (reduction === "none") {
      lossData = perSampleLoss;
      resultShape = [N];
    } else if (reduction === "sum") {
      lossData = [perSampleLoss.reduce((a, b) => a + b, 0)];
      resultShape = [];
    } else {
      lossData = [perSampleLoss.reduce((a, b) => a + b, 0) / N];
      resultShape = [];
    }
    const result = new Tensor(lossData, { requires_grad: rg }, { operation: rg ? this : null, shape: resultShape });
    return result;
  }
  _backward(dz) {
    const [input, target] = this.saved_tensors;
    const [inputFn] = this.next_functions;
    const N = this.N;
    const C = this.C;
    const reduction = this.reduction;
    const inputData = input.data;
    const targetData = target.data;
    let dzData;
    if (typeof dz === "number") {
      dzData = new Array(reduction === "none" ? N : 1).fill(dz);
    } else {
      dzData = [...dz.data];
    }
    const grad = new Array(N * C);
    for (let i = 0; i < N; i++) {
      const rowOffset = i * C;
      let maxVal = -Infinity;
      for (let j = 0; j < C; j++) {
        if (inputData[rowOffset + j] > maxVal) {
          maxVal = inputData[rowOffset + j];
        }
      }
      let sumExp = 0;
      for (let j = 0; j < C; j++) {
        sumExp += Math.exp(inputData[rowOffset + j] - maxVal);
      }
      const t = targetData[i];
      const dzVal = reduction === "none" ? dzData[i] : dzData[0];
      const scale = reduction === "mean" ? dzVal / N : dzVal;
      for (let j = 0; j < C; j++) {
        const softmax_j = Math.exp(inputData[rowOffset + j] - maxVal) / sumExp;
        const oneHot = j === t ? 1 : 0;
        grad[rowOffset + j] = (softmax_j - oneHot) * scale;
      }
    }
    const gradTensor = new Tensor(grad, {}, { shape: [N, C] });
    inputFn.backward(gradTensor);
  }
};
__name(_CrossEntropyLossOp, "CrossEntropyLossOp");
let CrossEntropyLossOp = _CrossEntropyLossOp;
registerOperation("cross_entropy_loss", CrossEntropyLossOp);
const _Parameter = class _Parameter extends Tensor {
  constructor(data, options = {
    requires_grad: true
  }, internal_options = {}) {
    if (data instanceof Tensor) {
      super(data.data, { requires_grad: true }, { shape: data.shape });
    } else if (data instanceof _Parameter) {
      super(data.data, { requires_grad: true }, { shape: data.shape });
    } else {
      super(data, options, internal_options);
    }
  }
};
__name(_Parameter, "Parameter");
let Parameter = _Parameter;
const parameter = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parameter
}, Symbol.toStringTag, { value: "Module" }));
const _Module = class _Module {
  _modules;
  _parameters;
  constructor() {
    this._parameters = {};
    this._modules = {};
  }
  register_parameter(parameter_name, parameter2) {
    this._parameters[parameter_name] = parameter2;
  }
  register_module(module_name, module) {
    this._modules[module_name] = module;
  }
  register(name, value) {
    if (value instanceof Parameter) {
      this.register_parameter(name, value);
    } else {
      this.register_module(name, value);
    }
  }
  parameters() {
    let params = Object.values(this._parameters);
    for (const module of Object.values(this._modules)) {
      params = params.concat(module.parameters());
    }
    return params;
  }
  named_parameters(prefix = "") {
    const result = [];
    for (const [name, param] of Object.entries(this._parameters)) {
      const fullName = prefix ? `${prefix}.${name}` : name;
      result.push([fullName, param]);
    }
    for (const [name, module] of Object.entries(this._modules)) {
      const fullName = prefix ? `${prefix}.${name}` : name;
      result.push(...module.named_parameters(fullName));
    }
    return result;
  }
};
__name(_Module, "Module");
let Module = _Module;
const _Sequential = class _Sequential extends Module {
  _modulesArr;
  constructor(...modules) {
    super();
    this._modulesArr = modules;
    for (let i = 0; i < modules.length; i++) {
      this.register(i.toString(), modules[i]);
    }
  }
  append(module) {
    this.register(this._modulesArr.length.toString(), module);
    this._modulesArr.push(module);
    return this;
  }
  extend(sequential) {
    for (const module of sequential._modulesArr) {
      this.append(module);
    }
    return this;
  }
  insert(index2, module) {
    this._modulesArr.splice(index2, 0, module);
    for (let i = index2; i < this._modulesArr.length; i++) {
      this.register(i.toString(), this._modulesArr[i]);
    }
    return this;
  }
  forward(input) {
    let x = input;
    for (const module of this._modulesArr) {
      x = module.forward(x);
    }
    return x;
  }
};
__name(_Sequential, "Sequential");
let Sequential = _Sequential;
function applyReduction(loss, reduction) {
  if (reduction === "mean") return loss.mean();
  if (reduction === "sum") return loss.sum();
  return loss;
}
__name(applyReduction, "applyReduction");
const _Loss = class _Loss {
};
__name(_Loss, "Loss");
let Loss = _Loss;
const _MSELoss = class _MSELoss extends Loss {
  reduction;
  constructor(reduction = "mean") {
    super();
    this.reduction = reduction;
  }
  forward(input, target) {
    const unreduced = input.sub(target).pow(2);
    return applyReduction(unreduced, this.reduction);
  }
};
__name(_MSELoss, "MSELoss");
let MSELoss = _MSELoss;
const _L1Loss = class _L1Loss extends Loss {
  reduction;
  constructor(reduction = "mean") {
    super();
    this.reduction = reduction;
  }
  forward(input, target) {
    const unreduced = input.sub(target).abs();
    return applyReduction(unreduced, this.reduction);
  }
};
__name(_L1Loss, "L1Loss");
let L1Loss = _L1Loss;
const _BCELoss = class _BCELoss extends Loss {
  weight;
  reduction;
  constructor(weight = null, reduction = "mean") {
    super();
    this.weight = weight;
    this.reduction = reduction;
  }
  forward(input, target) {
    const left = target.mul(input.log());
    const right = target.neg().add(1).mul(input.neg().add(1).log());
    let unreduced = left.add(right).neg();
    if (this.weight) {
      unreduced = unreduced.mul(this.weight);
    }
    return applyReduction(unreduced, this.reduction);
  }
};
__name(_BCELoss, "BCELoss");
let BCELoss = _BCELoss;
const _CrossEntropyLoss = class _CrossEntropyLoss extends Loss {
  reduction;
  constructor(reduction = "mean") {
    super();
    this.reduction = reduction;
  }
  forward(input, target) {
    const op = createOperation("cross_entropy_loss");
    return op.forward(input, target, this.reduction);
  }
};
__name(_CrossEntropyLoss, "CrossEntropyLoss");
let CrossEntropyLoss = _CrossEntropyLoss;
function generate_function(opname) {
  return (...args) => {
    const operation = createOperation(opname);
    return operation.forward(...args);
  };
}
__name(generate_function, "generate_function");
function generate_unary_function(opname) {
  return (a) => {
    if (typeof a == "number") {
      a = new Tensor(a);
    }
    const operation = createOperation(opname);
    return operation.forward(a);
  };
}
__name(generate_unary_function, "generate_unary_function");
const relu = generate_unary_function("relu");
const sigmoid = generate_unary_function("sigmoid");
const conv1d = generate_function("conv1d");
const conv2d = generate_function("conv2d");
const conv3d = generate_function("conv3d");
const cross_entropy = generate_function("cross_entropy_loss");
const functional = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  conv1d,
  conv2d,
  conv3d,
  cross_entropy,
  relu,
  sigmoid
}, Symbol.toStringTag, { value: "Module" }));
const _Linear = class _Linear extends Module {
  weight;
  bias;
  constructor(in_features, out_features, bias = true) {
    super();
    const k = Math.sqrt(1 / in_features);
    this.weight = new Parameter(
      rand([out_features, in_features]).mul(2 * k).sub(k)
    );
    this.register("weight", this.weight);
    if (bias) {
      this.bias = new Parameter(
        rand([out_features]).mul(2 * k).sub(k)
      );
      this.register("bias", this.bias);
    } else {
      this.bias = null;
    }
  }
  forward(input) {
    const out = input.matmul(this.weight.transpose(0, 1));
    return this.bias ? out.add(this.bias) : out;
  }
};
__name(_Linear, "Linear");
let Linear = _Linear;
const _ReLU = class _ReLU extends Module {
  constructor() {
    super();
  }
  forward(input) {
    return relu(input);
  }
};
__name(_ReLU, "ReLU");
let ReLU = _ReLU;
const _Sigmoid = class _Sigmoid extends Module {
  constructor() {
    super();
  }
  forward(input) {
    return sigmoid(input);
  }
};
__name(_Sigmoid, "Sigmoid");
let Sigmoid = _Sigmoid;
const __ConvNd = class __ConvNd extends Module {
  weight;
  bias;
  in_channels;
  out_channels;
  kernel_size;
  stride;
  padding;
  dilation;
  groups;
  constructor(in_channels, out_channels, kernel_size, stride, padding, dilation, groups, bias, dims) {
    super();
    this.in_channels = in_channels;
    this.out_channels = out_channels;
    this.kernel_size = kernel_size;
    this.stride = stride;
    this.padding = padding;
    this.dilation = dilation;
    this.groups = groups;
    if (in_channels % groups !== 0) {
      throw new Error("in_channels must be divisible by groups");
    }
    if (out_channels % groups !== 0) {
      throw new Error("out_channels must be divisible by groups");
    }
    const kernel_arr = typeof kernel_size === "number" ? new Array(dims).fill(kernel_size) : kernel_size;
    const kernel_vol = kernel_arr.reduce((a, b) => a * b, 1);
    const k = Math.sqrt(groups / (in_channels * kernel_vol));
    this.weight = new Parameter(
      rand([out_channels, in_channels / groups, ...kernel_arr]).mul(2 * k).sub(k)
    );
    this.register("weight", this.weight);
    if (bias) {
      this.bias = new Parameter(
        rand([out_channels]).mul(2 * k).sub(k)
      );
      this.register("bias", this.bias);
    } else {
      this.bias = null;
    }
  }
};
__name(__ConvNd, "_ConvNd");
let _ConvNd = __ConvNd;
const _Conv1d = class _Conv1d extends _ConvNd {
  constructor(in_channels, out_channels, kernel_size, stride = 1, padding = 0, dilation = 1, groups = 1, bias = true) {
    super(in_channels, out_channels, kernel_size, stride, padding, dilation, groups, bias, 1);
  }
  forward(input) {
    return conv1d(input, this.weight, this.bias, this.stride, this.padding, this.dilation, this.groups);
  }
};
__name(_Conv1d, "Conv1d");
let Conv1d = _Conv1d;
const _Conv2d = class _Conv2d extends _ConvNd {
  constructor(in_channels, out_channels, kernel_size, stride = 1, padding = 0, dilation = 1, groups = 1, bias = true) {
    super(in_channels, out_channels, kernel_size, stride, padding, dilation, groups, bias, 2);
  }
  forward(input) {
    return conv2d(input, this.weight, this.bias, this.stride, this.padding, this.dilation, this.groups);
  }
};
__name(_Conv2d, "Conv2d");
let Conv2d = _Conv2d;
const _Conv3d = class _Conv3d extends _ConvNd {
  constructor(in_channels, out_channels, kernel_size, stride = 1, padding = 0, dilation = 1, groups = 1, bias = true) {
    super(in_channels, out_channels, kernel_size, stride, padding, dilation, groups, bias, 3);
  }
  forward(input) {
    return conv3d(input, this.weight, this.bias, this.stride, this.padding, this.dilation, this.groups);
  }
};
__name(_Conv3d, "Conv3d");
let Conv3d = _Conv3d;
const index$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BCELoss,
  Conv1d,
  Conv2d,
  Conv3d,
  CrossEntropyLoss,
  L1Loss,
  Linear,
  MSELoss,
  Module,
  Parameter,
  ReLU,
  Sequential,
  Sigmoid,
  functional,
  parameter
}, Symbol.toStringTag, { value: "Module" }));
const _Optimizer = class _Optimizer {
  params;
  defaults;
  constructor(params, defaults) {
    this.params = params;
    this.defaults = defaults;
  }
  zero_grad() {
    for (const param of this.params) {
      param.grad = null;
    }
  }
};
__name(_Optimizer, "Optimizer");
let Optimizer = _Optimizer;
const _SGD = class _SGD extends Optimizer {
  state = /* @__PURE__ */ new Map();
  lr;
  momentum;
  dampening;
  weight_decay;
  nesterov;
  maximize;
  constructor(params, lr = 1e-3, momentum = 0, dampening = 0, weight_decay = 0, nesterov = false, maximize = false) {
    super(params, {});
    this.lr = lr;
    this.momentum = momentum;
    this.dampening = dampening;
    this.weight_decay = weight_decay;
    this.nesterov = nesterov;
    this.maximize = maximize;
  }
  step() {
    for (const param of this.params) {
      let g = this.maximize ? param.grad.mul(-1) : param.grad;
      if (this.weight_decay !== 0) {
        g = g.add(param.mul(this.weight_decay));
      }
      if (this.momentum !== 0) {
        if (this.state.has(param)) {
          let buf2 = this.state.get(param).velocity;
          buf2 = buf2.mul(this.momentum);
          buf2 = buf2.add(g.mul(1 - this.dampening));
          this.state.set(param, { velocity: buf2 });
        } else {
          this.state.set(param, { velocity: g });
        }
        const buf = this.state.get(param).velocity;
        if (this.nesterov) {
          g = g.add(buf.mul(this.momentum));
        } else {
          g = buf;
        }
        this.state.set(param, { velocity: buf });
      }
      const newParam = param.sub(g.mul(this.lr));
      param.data = newParam.data;
    }
  }
};
__name(_SGD, "SGD");
let SGD = _SGD;
const _Adam = class _Adam extends Optimizer {
  state = /* @__PURE__ */ new Map();
  step_count = 0;
  lr;
  beta1;
  beta2;
  eps;
  weight_decay;
  amsgrad;
  maximize;
  constructor(params, lr = 1e-3, betas = [0.9, 0.999], eps = 1e-8, weight_decay = 0, amsgrad = false, maximize = false) {
    super(params, {});
    this.lr = lr;
    this.beta1 = betas[0];
    this.beta2 = betas[1];
    this.eps = eps;
    this.weight_decay = weight_decay;
    this.amsgrad = amsgrad;
    this.maximize = maximize;
  }
  step() {
    this.step_count += 1;
    for (const param of this.params) {
      let grad = this.maximize ? param.grad.mul(-1) : param.grad;
      if (this.weight_decay !== 0) {
        grad = grad.add(param.mul(this.weight_decay));
      }
      if (!this.state.has(param)) {
        this.state.set(param, {
          m: zeros_like(param),
          v: zeros_like(param),
          vmax: zeros_like(param)
        });
      }
      const state = this.state.get(param);
      state.m = state.m.mul(this.beta1).add(grad.mul(1 - this.beta1));
      state.v = state.v.mul(this.beta2).add(grad.mul(grad).mul(1 - this.beta2));
      const biasCorrection1 = 1 - Math.pow(this.beta1, this.step_count);
      const biasCorrection2 = 1 - Math.pow(this.beta2, this.step_count);
      let vhat;
      const mhat = state.m.div(biasCorrection1);
      if (this.amsgrad) {
        state.vmax = state.vmax.maximum(state.v);
        vhat = state.vmax.div(biasCorrection2);
      } else {
        vhat = state.v.div(biasCorrection2);
      }
      const update = mhat.div(vhat.sqrt().add(this.eps)).mul(this.lr);
      const newParam = param.sub(update);
      param.data = newParam.data;
    }
  }
};
__name(_Adam, "Adam");
let Adam = _Adam;
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Adam,
  Optimizer,
  SGD
}, Symbol.toStringTag, { value: "Module" }));
const _atenMap = {
  "add": "aten.add.Tensor",
  "sub": "aten.sub.Tensor",
  "mul": "aten.mul.Tensor",
  "div": "aten.div.Tensor",
  "pow": "aten.pow.Tensor_Tensor",
  "powint": "aten.pow.Tensor_Scalar",
  "fmod": "aten.fmod.Tensor",
  "maximum": "aten.maximum.default",
  "minimum": "aten.minimum.default",
  "log": "aten.log.default",
  "sqrt": "aten.sqrt.default",
  "exp": "aten.exp.default",
  "square": "aten.square.default",
  "abs": "aten.abs.default",
  "sign": "aten.sign.default",
  "neg": "aten.neg.default",
  "reciprocal": "aten.reciprocal.default",
  "nan_to_num": "aten.nan_to_num.default",
  "reshape": "aten.reshape.default",
  "flatten": "aten.flatten.using_ints",
  "squeeze": "aten.squeeze.dim",
  "unsqueeze": "aten.unsqueeze.default",
  "expand": "aten.expand.default",
  "sin": "aten.sin.default",
  "cos": "aten.cos.default",
  "tan": "aten.tan.default",
  "sum": "aten.sum.default",
  "mean": "aten.mean.default",
  "min": "aten.min.default",
  "max": "aten.max.default",
  "transpose": "aten.transpose.int",
  "matmul": "aten.matmul.default",
  "relu": "aten.relu.default",
  "sigmoid": "aten.sigmoid.default",
  "lt": "aten.lt.Tensor",
  "gt": "aten.gt.Tensor",
  "le": "aten.le.Tensor",
  "ge": "aten.ge.Tensor",
  "eq": "aten.eq.Tensor",
  "ne": "aten.ne.Tensor",
  "conv1d": "aten.conv1d.default",
  "conv2d": "aten.conv2d.default",
  "conv3d": "aten.conv3d.default",
  "linear": "aten.linear.default",
  "cross_entropy_loss": "aten.cross_entropy_loss.default"
};
function toAtenTarget(opName) {
  return _atenMap[opName] || `aten.${opName}.default`;
}
__name(toAtenTarget, "toAtenTarget");
const _NameGenerator = class _NameGenerator {
  counts = /* @__PURE__ */ new Map();
  generate(baseName) {
    const count = this.counts.get(baseName) || 0;
    this.counts.set(baseName, count + 1);
    return count === 0 ? baseName : `${baseName}_${count}`;
  }
};
__name(_NameGenerator, "NameGenerator");
let NameGenerator = _NameGenerator;
const _ExportedProgram = class _ExportedProgram {
  constructor(graph, graph_signature, parameters) {
    this.graph = graph;
    this.graph_signature = graph_signature;
    this.parameters = parameters;
  }
  toString() {
    const lines = ["ExportedProgram:"];
    const inputArgs = this.graph.filter((n) => n.op === "placeholder").map((n) => {
      const shape = n.val_shape ? JSON.stringify(n.val_shape) : "?";
      return `${n.name}: "${shape}"`;
    }).join(", ");
    lines.push(`    class GraphModule(torch.nn.Module):`);
    lines.push(`        def forward(self, ${inputArgs}):`);
    for (const node of this.graph) {
      if (node.op === "call_function") {
        const args = node.args.join(", ");
        lines.push(`            ${node.name} = ${node.target}(${args})`);
      } else if (node.op === "output") {
        lines.push(`            return (${node.args.join(", ")},)`);
      }
    }
    lines.push("");
    lines.push("Graph signature:");
    lines.push("    # inputs");
    for (const spec of this.graph_signature.input_specs) {
      const target = spec.target ? ` target='${spec.target}'` : "";
      lines.push(`    ${spec.name}: ${spec.kind}${target}`);
    }
    lines.push("    # outputs");
    for (const spec of this.graph_signature.output_specs) {
      lines.push(`    ${spec.name}: ${spec.kind}`);
    }
    return lines.join("\n");
  }
};
__name(_ExportedProgram, "ExportedProgram");
let ExportedProgram = _ExportedProgram;
function export_(module, sampleInputs) {
  const graph = [];
  const nameGen = new NameGenerator();
  const tensorIdToName = /* @__PURE__ */ new Map();
  const namedParams = module.named_parameters();
  const paramTensorIds = /* @__PURE__ */ new Set();
  const inputSpecs = [];
  for (const [paramPath, param] of namedParams) {
    const placeholderName = "p_" + paramPath.replace(/\./g, "_");
    const nodeName = nameGen.generate(placeholderName);
    tensorIdToName.set(param.id, nodeName);
    paramTensorIds.add(param.id);
    graph.push({
      op: "placeholder",
      name: nodeName,
      target: nodeName,
      args: [],
      val_shape: param.shape
    });
    inputSpecs.push({
      kind: "PARAMETER",
      name: nodeName,
      target: paramPath
    });
  }
  for (let i = 0; i < sampleInputs.length; i++) {
    const baseName = "input";
    const nodeName = nameGen.generate(baseName);
    tensorIdToName.set(sampleInputs[i].id, nodeName);
    graph.push({
      op: "placeholder",
      name: nodeName,
      target: nodeName,
      args: [],
      val_shape: sampleInputs[i].shape
    });
    inputSpecs.push({
      kind: "USER_INPUT",
      name: nodeName
    });
  }
  const handler = /* @__PURE__ */ __name((e) => {
    const { operation, args, result } = e.detail;
    const opName = operation.opName;
    if (!opName) return;
    const nodeArgs = [];
    for (const arg of args) {
      if (arg instanceof Tensor) {
        const name = tensorIdToName.get(arg.id);
        if (name) {
          nodeArgs.push(name);
        }
      }
    }
    const nodeName = nameGen.generate(opName);
    tensorIdToName.set(result.id, nodeName);
    graph.push({
      op: "call_function",
      name: nodeName,
      target: toAtenTarget(opName),
      args: nodeArgs,
      val_shape: result.shape
    });
  }, "handler");
  eventBus.addEventListener(
    events.OPERATION_AFTER_FORWARD,
    handler
  );
  let output;
  try {
    output = no_grad(() => module.forward(...sampleInputs));
  } finally {
    eventBus.removeEventListener(
      events.OPERATION_AFTER_FORWARD,
      handler
    );
  }
  const outputName = tensorIdToName.get(output.id) || "output";
  graph.push({
    op: "output",
    name: "output",
    target: "output",
    args: [outputName]
  });
  const outputSpecs = [{
    kind: "USER_OUTPUT",
    name: outputName
  }];
  const parameters = /* @__PURE__ */ new Map();
  for (const [paramPath, param] of namedParams) {
    parameters.set(paramPath, {
      data: [...param.data],
      shape: [...param.shape]
    });
  }
  return new ExportedProgram(
    graph,
    { input_specs: inputSpecs, output_specs: outputSpecs },
    parameters
  );
}
__name(export_, "export_");
function is_tensor(obj) {
  return obj instanceof Tensor;
}
__name(is_tensor, "is_tensor");
function is_nonzero(input) {
  if (input.numel() !== 1) {
    throw new Error(
      `Boolean value of Tensor with more than one element is ambiguous`
    );
  }
  return input.item() !== 0;
}
__name(is_nonzero, "is_nonzero");
function numel(input) {
  return input.numel();
}
__name(numel, "numel");

var torch = /*#__PURE__*/Object.freeze({
	__proto__: null,
	AccumulateGrad: AccumulateGrad,
	ExportedProgram: ExportedProgram,
	Max: Max,
	Mean: Mean,
	Min: Min,
	Sum: Sum,
	Tensor: Tensor,
	TorchFunction: TorchFunction,
	__left_index__: __left_index__,
	__right_index__: __right_index__,
	abs: abs,
	add: add,
	allclose: allclose,
	arange: arange,
	conv1d: conv1d,
	conv2d: conv2d,
	conv3d: conv3d,
	cos: cos,
	cross_entropy: cross_entropy,
	disable_no_grad: disable_no_grad,
	div: div,
	empty: empty,
	empty_like: empty_like,
	enable_no_grad: enable_no_grad,
	eq: eq,
	eventBus: eventBus,
	events: events,
	exp: exp,
	expand: expand,
	export_: export_,
	flatten: flatten,
	fmod: fmod,
	full: full,
	full_like: full_like,
	ge: ge,
	gt: gt,
	is_grad_enabled: is_grad_enabled,
	is_nonzero: is_nonzero,
	is_tensor: is_tensor,
	le: le,
	linspace: linspace,
	log: log,
	lt: lt,
	manual_seed: manual_seed,
	matmul: matmul,
	max: max,
	maximum: maximum,
	mean: mean,
	min: min,
	minimum: minimum,
	mul: mul,
	nan_to_num: nan_to_num,
	ne: ne,
	neg: neg,
	nn: index$1,
	no_grad: no_grad,
	numel: numel,
	ones: ones,
	ones_like: ones_like,
	optim: index,
	pow: pow,
	rand: rand,
	rand_like: rand_like,
	randint: randint,
	randint_like: randint_like,
	randn: randn,
	randn_like: randn_like,
	randperm: randperm,
	reciprocal: reciprocal,
	relu: relu,
	reshape: reshape,
	seed: seed,
	sigmoid: sigmoid,
	sign: sign,
	sin: sin,
	sqrt: sqrt,
	square: square,
	squeeze: squeeze,
	sub: sub,
	sum: sum,
	tan: tan,
	tensor: tensor,
	transpose: transpose,
	unsqueeze: unsqueeze,
	zeros: zeros,
	zeros_like: zeros_like
});

var bridgeCode = "# bridge.py\n# Provides a PyTorch-compatible Python API over js_torch (the TypeScript torch library).\n#\n# Before loading this file, set the following globals in Pyodide:\n#   js_torch    - the torch module (window.torch from the UMD build)\n\nfrom pyodide.ffi import JsProxy, to_js\n\n\n# ---------------------------------------------------------------------------\n# Internal helpers\n# ---------------------------------------------------------------------------\n\ndef _wrap_result(result):\n    \"\"\"\n    Wrap a JS return value:\n      - JsProxy (JS object/Tensor) -> Python Tensor\n      - Python primitive (int, float, bool) -> return as-is\n    JS primitives are automatically converted to Python by Pyodide,\n    so they will NOT be JsProxy instances.\n    \"\"\"\n    if isinstance(result, JsProxy):\n        return Tensor(result)\n    return result\n\n\ndef _transform(obj):\n    \"\"\"Convert Python objects to JS-compatible types before passing to JS.\"\"\"\n    if isinstance(obj, Tensor):\n        return obj._js\n    if isinstance(obj, (list, tuple)):\n        return to_js([_transform(item) for item in obj])\n    return obj\n\n\ndef _transform_args(args):\n    return [_transform(a) for a in args]\n\n\n# ---------------------------------------------------------------------------\n# Tensor\n# ---------------------------------------------------------------------------\n\nclass Tensor:\n    \"\"\"Python wrapper around a JS Tensor, mirroring the PyTorch Tensor API.\"\"\"\n\n    # ------------------------------------------------------------------\n    # Construction\n    # ------------------------------------------------------------------\n\n    def __new__(cls, data, requires_grad=False):\n        # Return None for missing tensors so e.g. `tensor.grad` returns None\n        # when there is no gradient — matching PyTorch behaviour.\n        # Pyodide may represent JS null as a special JsNull type (not JsProxy, not None).\n        if data is None or type(data).__name__ in ('JsNull', 'JsUndefined'):\n            return None\n        return super().__new__(cls)\n\n    def __init__(self, data, requires_grad=False):\n        if isinstance(data, JsProxy):\n            self._js = data\n        else:\n            js_data = to_js(data) if isinstance(data, (list, tuple)) else data\n            self._js = js_torch.tensor(js_data, requires_grad)\n\n    # ------------------------------------------------------------------\n    # Representation\n    # ------------------------------------------------------------------\n\n    def __repr__(self):\n        extra = \", requires_grad=True\" if self.requires_grad else \"\"\n        return f\"tensor({self.tolist()}{extra})\"\n\n    # ------------------------------------------------------------------\n    # Data access\n    # ------------------------------------------------------------------\n\n    def tolist(self):\n        \"\"\"Return tensor data as a (nested) Python list, or a Python scalar for 0-d tensors.\"\"\"\n        result = self._js.toArray()\n        if isinstance(result, JsProxy):\n            return result.to_py()\n        return result  # scalar\n\n    def item(self):\n        return self._js.item()\n\n    # ------------------------------------------------------------------\n    # Properties\n    # ------------------------------------------------------------------\n\n    @property\n    def shape(self):\n        return tuple(self._js.shape.to_py())\n\n    @property\n    def data(self):\n        \"\"\"Detached view of the tensor data (no gradient).\"\"\"\n        return self.detach()\n\n    @property\n    def requires_grad(self):\n        return bool(self._js.requires_grad)\n\n    @requires_grad.setter\n    def requires_grad(self, value):\n        self._js.requires_grad = value\n\n    @property\n    def grad(self):\n        raw = self._js.grad\n        if raw is None or type(raw).__name__ in ('JsNull', 'JsUndefined'):\n            return None\n        return Tensor(raw)\n\n    @grad.setter\n    def grad(self, value):\n        self._js.grad = value._js if isinstance(value, Tensor) else None\n\n    @property\n    def T(self):\n        if len(self.shape) < 2:\n            return self\n        return Tensor(self._js.transpose(0, 1))\n\n    # ------------------------------------------------------------------\n    # Grad utilities\n    # ------------------------------------------------------------------\n\n    def backward(self, gradient=None):\n        if gradient is None:\n            self._js.backward()\n        else:\n            self._js.backward(gradient._js)\n\n    def detach(self):\n        return Tensor(self._js.detach())\n\n    def zero_(self):\n        self._js.zero_()\n        return self\n\n    def retain_grad(self):\n        self._js.retain_grad()\n\n    # ------------------------------------------------------------------\n    # Shape utilities\n    # ------------------------------------------------------------------\n\n    def size(self, dim=None):\n        s = self.shape\n        return s if dim is None else s[dim]\n\n    def dim(self):\n        return len(self.shape)\n\n    def numel(self):\n        n = 1\n        for s in self.shape:\n            n *= s\n        return n\n\n    def reshape(self, *args):\n        shape = list(args[0]) if len(args) == 1 and isinstance(args[0], (list, tuple)) else list(args)\n        return Tensor(self._js.reshape(to_js(shape)))\n\n    def view(self, *args):\n        return self.reshape(*args)\n\n    def squeeze(self, dim=None):\n        if dim is None:\n            new_shape = [s for s in self.shape if s != 1]\n            return Tensor(self._js.reshape(to_js(new_shape or [1])))\n        return Tensor(self._js.squeeze(dim))\n\n    def unsqueeze(self, dim):\n        return Tensor(self._js.unsqueeze(dim))\n\n    def expand(self, *args):\n        shape = list(args[0]) if len(args) == 1 and isinstance(args[0], (list, tuple)) else list(args)\n        return Tensor(self._js.expand(to_js(shape)))\n\n    def transpose(self, dim0, dim1):\n        return Tensor(self._js.transpose(dim0, dim1))\n\n    def flatten(self, start_dim=0, end_dim=-1):\n        n = self.numel()\n        return self.reshape([n])\n\n    # ------------------------------------------------------------------\n    # Reductions — default (no dim) sums all elements, matching PyTorch\n    # ------------------------------------------------------------------\n\n    def sum(self, dim=None, keepdim=False):\n        return Tensor(self._js.sum() if dim is None else self._js.sum(dim, keepdim))\n\n    def mean(self, dim=None, keepdim=False):\n        return Tensor(self._js.mean() if dim is None else self._js.mean(dim, keepdim))\n\n    def max(self, dim=None, keepdim=False):\n        return Tensor(self._js.max() if dim is None else self._js.max(dim, keepdim))\n\n    def min(self, dim=None, keepdim=False):\n        return Tensor(self._js.min() if dim is None else self._js.min(dim, keepdim))\n\n    # ------------------------------------------------------------------\n    # Arithmetic — explicit methods\n    # ------------------------------------------------------------------\n\n    def _to_js(self, other):\n        return other._js if isinstance(other, Tensor) else other\n\n    def add(self, other):  return Tensor(self._js.add(self._to_js(other)))\n    def sub(self, other):  return Tensor(self._js.sub(self._to_js(other)))\n    def mul(self, other):  return Tensor(self._js.mul(self._to_js(other)))\n    def div(self, other):  return Tensor(self._js.div(self._to_js(other)))\n    def pow(self, other):  return Tensor(self._js.pow(self._to_js(other)))\n    def matmul(self, other): return Tensor(self._js.matmul(self._to_js(other)))\n\n    # ------------------------------------------------------------------\n    # Arithmetic operators\n    # ------------------------------------------------------------------\n\n    def __add__(self, other):  return self.add(other)\n    def __radd__(self, other): return self.add(other)  # add is commutative\n    def __sub__(self, other):  return self.sub(other)\n    def __rsub__(self, other):\n        o = other if isinstance(other, Tensor) else Tensor(other)\n        return o.sub(self)\n    def __mul__(self, other):  return self.mul(other)\n    def __rmul__(self, other): return self.mul(other)  # mul is commutative\n    def __truediv__(self, other):  return self.div(other)\n    def __rtruediv__(self, other):\n        o = other if isinstance(other, Tensor) else Tensor(other)\n        return o.div(self)\n    def __pow__(self, other):  return self.pow(other)\n    def __rpow__(self, other):\n        o = other if isinstance(other, Tensor) else Tensor(other)\n        return o.pow(self)\n    def __matmul__(self, other): return self.matmul(other)\n    def __neg__(self):  return Tensor(self._js.neg())\n    def __abs__(self):  return Tensor(self._js.abs())\n\n    # ------------------------------------------------------------------\n    # Unary operations\n    # ------------------------------------------------------------------\n\n    def neg(self):        return Tensor(self._js.neg())\n    def abs(self):        return Tensor(self._js.abs())\n    def log(self):        return Tensor(self._js.log())\n    def exp(self):        return Tensor(self._js.exp())\n    def sqrt(self):       return Tensor(self._js.sqrt())\n    def square(self):     return Tensor(self._js.square())\n    def sin(self):        return Tensor(self._js.sin())\n    def cos(self):        return Tensor(self._js.cos())\n    def tan(self):        return Tensor(self._js.tan())\n    def sigmoid(self):    return Tensor(self._js.sigmoid())\n    def relu(self):       return Tensor(js_torch.nn.functional.relu(self._js))\n    def sign(self):       return Tensor(self._js.sign())\n    def reciprocal(self): return Tensor(self._js.reciprocal())\n    def nan_to_num(self): return Tensor(self._js.nan_to_num())\n\n    # ------------------------------------------------------------------\n    # Comparison\n    # ------------------------------------------------------------------\n\n    def lt(self, other):  return Tensor(self._js.lt(self._to_js(other)))\n    def gt(self, other):  return Tensor(self._js.gt(self._to_js(other)))\n    def le(self, other):  return Tensor(self._js.le(self._to_js(other)))\n    def ge(self, other):  return Tensor(self._js.ge(self._to_js(other)))\n    def eq(self, other):  return Tensor(self._js.eq(self._to_js(other)))\n    def ne(self, other):  return Tensor(self._js.ne(self._to_js(other)))\n\n    def allclose(self, other, rtol=1e-5, atol=1e-8, equal_nan=False):\n        return bool(js_torch.allclose(self._js, other._js, rtol, atol, equal_nan))\n\n    # ------------------------------------------------------------------\n    # Type conversions\n    # ------------------------------------------------------------------\n\n    def __float__(self):          return float(self.item())\n    def __int__(self):            return int(self.item())\n    def __bool__(self):           return bool(self.item())\n    def __format__(self, fmt):    return format(self.item(), fmt)\n\n    # ------------------------------------------------------------------\n    # Indexing\n    # ------------------------------------------------------------------\n\n    def __getitem__(self, key):\n        if isinstance(key, int):\n            return Tensor(self._js.index(key))\n        if isinstance(key, tuple):\n            result = self._js\n            for k in key:\n                if isinstance(k, int):\n                    result = result.index(k)\n                else:\n                    raise NotImplementedError(\n                        \"Only integer indexing is supported in multi-dimensional indexing\"\n                    )\n            return Tensor(result)\n        if isinstance(key, slice):\n            start, stop, step = key.indices(self.shape[0])\n            data = [Tensor(self._js.index(i)).tolist() for i in range(start, stop, step)]\n            return Tensor(data)\n        raise TypeError(f\"Invalid index type: {type(key).__name__}\")\n\n    # ------------------------------------------------------------------\n    # Iteration and length\n    # ------------------------------------------------------------------\n\n    def __len__(self):\n        return self.shape[0]\n\n    def __iter__(self):\n        data = self.tolist()\n        if not isinstance(data, list):\n            raise TypeError(\"iteration over a 0-d tensor\")\n        for item in data:\n            yield Tensor(item)\n\n    # ------------------------------------------------------------------\n    # Catch-all: delegate unknown attribute accesses to the JS tensor.\n    # Returned JsProxy objects are wrapped in Tensor; primitives pass through.\n    # ------------------------------------------------------------------\n\n    def __getattr__(self, name):\n        if name.startswith('_'):\n            raise AttributeError(name)\n        def method(*args, **kwargs):\n            js_args = _transform_args(args)\n            return _wrap_result(self._js.__getattribute__(name)(*js_args))\n        return method\n\n\n# ---------------------------------------------------------------------------\n# no_grad context manager — actually disables grad in the JS engine\n# ---------------------------------------------------------------------------\n\nclass _NoGrad:\n    def __enter__(self):\n        self._prev = js_torch.enable_no_grad()\n        return self\n\n    def __exit__(self, *args):\n        js_torch.disable_no_grad(self._prev)\n\n\n# ---------------------------------------------------------------------------\n# Parameter\n# ---------------------------------------------------------------------------\n\nclass Parameter(Tensor):\n    \"\"\"A Tensor that is automatically registered as a parameter.\"\"\"\n    def __init__(self, data, requires_grad=True):\n        if isinstance(data, Tensor):\n            self._js = js_torch.nn.Parameter.new(data._js)\n        elif isinstance(data, JsProxy):\n            self._js = js_torch.nn.Parameter.new(data)\n        else:\n            self._js = js_torch.nn.Parameter.new(js_torch.tensor(data))\n        if not requires_grad:\n            self._js.requires_grad = False\n\n\n# ---------------------------------------------------------------------------\n# Module — pure-Python base class for user-defined models\n# ---------------------------------------------------------------------------\n\nclass Module:\n    \"\"\"\n    Pure-Python nn.Module. Subclass this to build models using bridge Tensors.\n    Assign `Parameter` or `_NNModule` instances as attributes and they are\n    automatically tracked by `parameters()`.\n    \"\"\"\n\n    def __init__(self):\n        object.__setattr__(self, '_parameters', {})\n        object.__setattr__(self, '_modules', {})\n\n    def __setattr__(self, name, value):\n        try:\n            params  = object.__getattribute__(self, '_parameters')\n            modules = object.__getattribute__(self, '_modules')\n        except AttributeError:\n            object.__setattr__(self, name, value)\n            return\n\n        if isinstance(value, Tensor) and value.requires_grad:\n            params[name] = value\n        elif isinstance(value, (Module, _NNModule)):\n            modules[name] = value\n        object.__setattr__(self, name, value)\n\n    def __call__(self, *args, **kwargs):\n        return self.forward(*args, **kwargs)\n\n    def forward(self, *args, **kwargs):\n        raise NotImplementedError\n\n    def parameters(self):\n        params = list(object.__getattribute__(self, '_parameters').values())\n        for mod in object.__getattribute__(self, '_modules').values():\n            params.extend(mod.parameters())\n        return params\n\n    def named_parameters(self, prefix=''):\n        result = []\n        for name, p in object.__getattribute__(self, '_parameters').items():\n            full = f\"{prefix}.{name}\" if prefix else name\n            result.append((full, p))\n        for mod_name, mod in object.__getattribute__(self, '_modules').items():\n            full_mod = f\"{prefix}.{mod_name}\" if prefix else mod_name\n            result.extend(mod.named_parameters(full_mod))\n        return result\n\n    def zero_grad(self):\n        for p in self.parameters():\n            p.grad = None\n\n\n# ---------------------------------------------------------------------------\n# _NNModule — wraps a JS nn.Module instance\n# ---------------------------------------------------------------------------\n\nclass _NNModule:\n    \"\"\"Wraps a JS nn.Module returned by the nn factory functions.\"\"\"\n\n    def __init__(self, js_module):\n        self._module = js_module\n\n    def __call__(self, *args):\n        js_args = [a._js if isinstance(a, Tensor) else a for a in args]\n        return Tensor(self._module.forward(*js_args))\n\n    def forward(self, *args):\n        return self(*args)\n\n    def parameters(self):\n        return [Tensor(p) for p in self._module.parameters().to_py()]\n\n    def named_parameters(self, prefix=''):\n        raw = self._module.named_parameters(prefix).to_py()\n        return [(pair[0], Tensor(pair[1])) for pair in raw]\n\n    def zero_grad(self):\n        for p in self.parameters():\n            p.grad = None\n\n\n# ---------------------------------------------------------------------------\n# nn.functional\n# ---------------------------------------------------------------------------\n\nclass _NNFunctional:\n    def relu(self, input):\n        return Tensor(js_torch.nn.functional.relu(input._js))\n\n    def sigmoid(self, input):\n        return Tensor(js_torch.nn.functional.sigmoid(input._js))\n\n    def __getattr__(self, name):\n        if name.startswith('_'):\n            raise AttributeError(name)\n        def fn(*args, **kwargs):\n            return _wrap_result(js_torch.nn.functional.__getattribute__(name)(*_transform_args(args)))\n        return fn\n\n\n# ---------------------------------------------------------------------------\n# nn.parameter namespace\n# ---------------------------------------------------------------------------\n\nclass _NNParameterNamespace:\n    def __init__(self):\n        self.Parameter = Parameter\n\n\n# ---------------------------------------------------------------------------\n# nn namespace\n# ---------------------------------------------------------------------------\n\nclass _NNNamespace:\n    def __init__(self):\n        self.functional = _NNFunctional()\n        self.parameter = _NNParameterNamespace()\n        self.Module = Module\n        self.Parameter = Parameter\n\n    def Linear(self, in_features, out_features, bias=True):\n        return _NNModule(js_torch.nn.Linear.new(in_features, out_features, bias))\n\n    def ReLU(self):\n        return _NNModule(js_torch.nn.ReLU.new())\n\n    def Sigmoid(self):\n        return _NNModule(js_torch.nn.Sigmoid.new())\n\n    def Sequential(self, *modules):\n        js_mods = [m._module for m in modules]\n        return _NNModule(js_torch.nn.Sequential.new(*js_mods))\n\n    def MSELoss(self, reduction='mean'):\n        return _NNModule(js_torch.nn.MSELoss.new(reduction))\n\n    def L1Loss(self, reduction='mean'):\n        return _NNModule(js_torch.nn.L1Loss.new(reduction))\n\n    def BCELoss(self, weight=None, reduction='mean'):\n        js_weight = weight._js if isinstance(weight, Tensor) else None\n        return _NNModule(js_torch.nn.BCELoss.new(js_weight, reduction))\n\n    def CrossEntropyLoss(self, reduction='mean'):\n        return _NNModule(js_torch.nn.CrossEntropyLoss.new(reduction))\n\n    def Conv1d(self, in_channels, out_channels, kernel_size,\n               stride=1, padding=0, dilation=1, groups=1, bias=True):\n        return _NNModule(js_torch.nn.Conv1d.new(\n            in_channels, out_channels, kernel_size,\n            stride, padding, dilation, groups, bias\n        ))\n\n    def Conv2d(self, in_channels, out_channels, kernel_size,\n               stride=1, padding=0, dilation=1, groups=1, bias=True):\n        return _NNModule(js_torch.nn.Conv2d.new(\n            in_channels, out_channels, kernel_size,\n            stride, padding, dilation, groups, bias\n        ))\n\n    def Conv3d(self, in_channels, out_channels, kernel_size,\n               stride=1, padding=0, dilation=1, groups=1, bias=True):\n        return _NNModule(js_torch.nn.Conv3d.new(\n            in_channels, out_channels, kernel_size,\n            stride, padding, dilation, groups, bias\n        ))\n\n\n# ---------------------------------------------------------------------------\n# optim wrappers\n# ---------------------------------------------------------------------------\n\nclass _Optimizer:\n    def __init__(self, js_optim):\n        self._optim = js_optim\n\n    def step(self):\n        self._optim.step()\n\n    def zero_grad(self):\n        self._optim.zero_grad()\n\n\nclass _OptimNamespace:\n    def SGD(self, params, lr=0.001, momentum=0.0, dampening=0.0,\n            weight_decay=0.0, nesterov=False, maximize=False):\n        js_params = to_js([p._js for p in params])\n        return _Optimizer(js_torch.optim.SGD.new(\n            js_params, lr, momentum, dampening, weight_decay, nesterov, maximize\n        ))\n\n    def Adam(self, params, lr=0.001, betas=(0.9, 0.999), eps=1e-8,\n             weight_decay=0.0, amsgrad=False, maximize=False):\n        js_params = to_js([p._js for p in params])\n        js_betas = to_js(list(betas))\n        return _Optimizer(js_torch.optim.Adam.new(\n            js_params, lr, js_betas, eps, weight_decay, amsgrad, maximize\n        ))\n\n\n# ---------------------------------------------------------------------------\n# torch namespace\n# ---------------------------------------------------------------------------\n\nclass _Torch:\n    def __init__(self):\n        self.nn    = _NNNamespace()\n        self.optim = _OptimNamespace()\n        self.no_grad = _NoGrad\n\n    @property\n    def tensor(self):\n        return Tensor\n\n    # --- creation functions ---\n\n    def _shape_from_args(self, args):\n        return list(args[0]) if len(args) == 1 and isinstance(args[0], (list, tuple)) else list(args)\n\n    def zeros(self, *args, **kwargs):\n        return Tensor(js_torch.zeros(to_js(self._shape_from_args(args))))\n\n    def ones(self, *args, **kwargs):\n        return Tensor(js_torch.ones(to_js(self._shape_from_args(args))))\n\n    def zeros_like(self, input):\n        return Tensor(js_torch.zeros_like(input._js))\n\n    def ones_like(self, input):\n        return Tensor(js_torch.ones_like(input._js))\n\n    def randn(self, *args, **kwargs):\n        return Tensor(js_torch.randn(to_js(self._shape_from_args(args))))\n\n    def rand(self, *args, **kwargs):\n        return Tensor(js_torch.rand(to_js(self._shape_from_args(args))))\n\n    def arange(self, start, end=None, step=1):\n        if end is None:\n            end = start\n            start = 0\n        return Tensor(js_torch.arange(start, end, step))\n\n    def linspace(self, start, end, steps):\n        return Tensor(js_torch.linspace(start, end, steps))\n\n    def empty(self, *args, **kwargs):\n        return Tensor(js_torch.empty(to_js(self._shape_from_args(args))))\n\n    def empty_like(self, input):\n        return Tensor(js_torch.empty_like(input._js))\n\n    def full(self, shape, fill_value):\n        return Tensor(js_torch.full(to_js(list(shape)), fill_value))\n\n    def full_like(self, input, fill_value):\n        return Tensor(js_torch.full_like(input._js, fill_value))\n\n    def rand_like(self, input):\n        return Tensor(js_torch.rand_like(input._js))\n\n    def randn_like(self, input):\n        return Tensor(js_torch.randn_like(input._js))\n\n    def randint_like(self, input, low, high):\n        return Tensor(js_torch.randint_like(input._js, low, high))\n\n    # --- utility functions ---\n\n    def is_tensor(self, obj):\n        return isinstance(obj, Tensor)\n\n    def is_nonzero(self, input):\n        if input.numel() != 1:\n            raise RuntimeError(\n                \"Boolean value of Tensor with more than one element is ambiguous\"\n            )\n        return bool(input.item() != 0)\n\n    def numel(self, input):\n        return input.numel()\n\n    # --- functional wrappers ---\n\n    def sum(self, input, dim=None, keepdim=False):\n        return input.sum(dim, keepdim)\n\n    def mean(self, input, dim=None, keepdim=False):\n        return input.mean(dim, keepdim)\n\n    def sigmoid(self, input):\n        return input.sigmoid()\n\n    def relu(self, input):\n        return input.relu()\n\n    def flatten(self, input, start_dim=0, end_dim=-1):\n        return input.flatten(start_dim, end_dim)\n\n    def allclose(self, a, b, rtol=1e-5, atol=1e-8, equal_nan=False):\n        return a.allclose(b, rtol, atol, equal_nan)\n\n    def is_grad_enabled(self):\n        return bool(js_torch.is_grad_enabled())\n\n    def cat(self, tensors, dim=0):\n        \"\"\"Concatenate tensors along dim. NOTE: gradient is not tracked.\"\"\"\n        if dim != 0:\n            raise NotImplementedError(\"torch.cat only supports dim=0 in this bridge\")\n        result = []\n        for t in tensors:\n            data = t.tolist()\n            if isinstance(data, list):\n                result.extend(data)\n            else:\n                result.append(data)\n        return Tensor(result)\n\n    def Size(self, shape):\n        return list(shape)\n\n    def __getattr__(self, name):\n        if name.startswith('_'):\n            raise AttributeError(name)\n        def fn(*args, **kwargs):\n            return _wrap_result(js_torch.__getattribute__(name)(*_transform_args(args)))\n        return fn\n\n\ntorch = _Torch()\n";

/**
 * Loads the torch library into Pyodide by exposing the JS torch object
 * and running bridge.py to set up the Python-side `torch` module.
 *
 * After this call, `pyodide.globals.get("torch")` is the usable torch module.
 */
async function loadTorch(pyodide) {
    pyodide.globals.set("js_torch", torch);
    await pyodide.runPythonAsync(bridgeCode);
    const hasTorch = pyodide.runPython("'torch' in globals()");
    if (!hasTorch) {
        throw new Error("torch not found in globals after running bridge.py");
    }
}

class PyodideEvaluator extends r {
    constructor(conductor) {
        super(conductor);
        this.torchLoaded = false;
        this.pyodide = loadPyodideGeneric().then(async (pyodide) => {
            await pyodide.loadPackage("micropip");
            await pyodide.setStdout({
                batched: (output) => {
                    this.conductor.sendOutput(output);
                },
            });
            return pyodide;
        });
    }
    async evaluateChunk(chunk) {
        this.validateChunk(chunk);
        const pyodide = await this.pyodide;
        // --- Use Python's ast module (via Pyodide) to detect and rewrite torch imports ---
        const { code, hasTorch } = await rewriteTorchImports(pyodide, chunk);
        if (hasTorch && !this.torchLoaded) {
            await loadTorch(pyodide);
            pyodide.globals.set("__sa_import_torch", pyodide.globals.get("torch"));
            this.torchLoaded = true;
        }
        // --- Install any other imported modules via micropip ---
        const otherRoots = await getNonTorchImportRoots(pyodide, chunk);
        if (otherRoots.size > 0) {
            const modulesArray = Array.from(otherRoots);
            const installerCode = `
import importlib, micropip
mods = ${JSON.stringify(modulesArray)}
missing = []
for m in mods:
    try:
        importlib.import_module(m)
    except Exception:
        missing.append(m)
if missing:
    await micropip.install(missing)
`;
            await pyodide.runPythonAsync(installerCode);
        }
        // --- Execute the (possibly rewritten) code ---
        const output = await pyodide.runPythonAsync(code);
        this.conductor.sendOutput(output);
    }
}
class ChapterPyodideEvaluator extends PyodideEvaluator {
    constructor(conductor, chapter) {
        super(conductor);
        this.chapter = chapter;
    }
    validateChunk(chunk) {
        const script = chunk + "\n";
        const ast = parse(script);
        analyze(ast, script, this.chapter);
    }
}

class PyodideEvaluator1 extends ChapterPyodideEvaluator {
    constructor(conductor) {
        super(conductor, 1);
    }
}

module.exports = PyodideEvaluator1;
//# sourceMappingURL=pyodide-evaluator-1.cjs.map
