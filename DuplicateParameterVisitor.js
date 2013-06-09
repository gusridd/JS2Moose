/**
* This checks for duplicated parameter names at functions as in the next example:
*
*  function sum(a, a, c){ // !!! syntax error
*   "use strict";
*   return a + b + c; // wrong if this code ran
* }
*
**/

var DuplicateParameterVisitor = function DuplicateParameterVisitor(ctx) {


	this.checkParamUniqueness = function checkParamUniqueness(AST){
		var size = AST.params.length;
		var keys = AST.params.map(function(el){
			return el.name;
		});
		if($.unique(keys).length != size){
			// The problem is registered into the corresponding famix object
			var context = this.context[this.context.length -1];
			context.famix.use_strict_static_problems.push({description:"duplicated parameter names", loc: AST.loc, range: AST.range});
		}
	}

	this.visitFunctionExpression = function visitFunctionExpression(AST){
		this.checkParamUniqueness(AST);
	}

	this.visitFunctionDeclaration = function visitFunctionDeclaration(AST){
		this.checkParamUniqueness(AST);
	}
}

DuplicateParameterVisitor.prototype = new ASTVisitor();