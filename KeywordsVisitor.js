/**
* This checks if 'eval' and 'arguments' are treated as keywords as in the next example:
*
* "use strict";
* eval = 17;
* arguments++;
* ++eval;
* var obj = { set p(arguments) { } };
* var eval;
* try { } catch (arguments) { }
* function x(eval) { }
* function arguments() { }
* var y = function eval() { };
* var f = new Function("arguments", "'use strict'; return 17;");
**/

var keyword_regex = new RegExp("eval|arguments|implements|interface|let|package|private|protected|public|static|yield");

var KeywordsVisitor = function KeywordsVisitor() {

	var that = this;

	this.isKeyword = function isKeyword(word){
		return keyword_regex.exec(word) != null;
	}

	this.visitVariableDeclaration = function visitVariableDeclaration(AST){
		
		var context = this.getContext();

		for(var key in AST.declarations){
			var declaration = AST.declarations[key];
			if(this.isKeyword(declaration.id.name)){
				context.famix.use_strict_static_problems.push({description:"Declaration of eval or arguments is not allowed in strict mode", loc: AST.loc, range: AST.range});
			}
		}
	}

	this.visitAssignmentExpression = function visitAssignmentExpression(AST){

		var context = this.getContext();

		if(this.isKeyword(AST.left.name)){
			context.famix.use_strict_static_problems.push({description:"Assignment to eval or arguments is not allowed in strict mode", loc: AST.loc, range: AST.range});
		}
	}

	this.visitUpdateExpression = function visitUpdateExpression(AST){

		var context = this.getContext();

		if(this.isKeyword(AST.argument.name)){
			context.famix.use_strict_static_problems.push({description:"Update to eval or arguments is not allowed in strict mode", loc: AST.loc, range: AST.range});
		}
	}

	this.visitCatchClause = function visitCatchClause(AST){

		var context = this.getContext();
		if(this.isKeyword(AST.param.name)){
			context.famix.use_strict_static_problems.push({description:"eval or arguments are not allowed in catch clause as a parameter", loc: AST.loc, range: AST.range});
		}
	}

	this.visitFunctionExpression = function visitFunctionExpression(AST){
		this.checkFunction(AST);
	}

	this.visitFunctionDeclaration = function FunctionDeclaration(AST){
		this.checkFunction(AST);
	}

	this.checkFunction = function checkFunction(AST){

		var context = this.getContext(2);
		if(AST.id != null && this.isKeyword(AST.id.name)){
			context.famix.use_strict_static_problems.push({description:"FunctionExpression cannot be named eval or arguments in strict mode", loc: AST.loc, range: AST.range});
		}

		var incorrect_param_names = AST.params.filter(function(el){
			return that.isKeyword(el.name);
		});

		if(incorrect_param_names.length > 0){
			context.famix.use_strict_static_problems.push({description:"Parameter names cannot be named eval or arguments in strict mode", loc: AST.loc, range: AST.range});
		}

	}
}

KeywordsVisitor.prototype = new ASTVisitor();