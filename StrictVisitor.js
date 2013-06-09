'use strict'
var StrictVisitor = function StrictVisitor(){
	
	this.visitFunctionDeclaration = function visitFunctionDeclaration(AST){
		console.log("visitFunctionDeclaration");
		console.log(AST);
	}

	this.visitFunctionExpression = function visitFunctionExpression(AST){
		console.log("visitFunctionExpression");
		console.log(AST);
	}

}

StrictVisitor.prototype = new ASTVisitor();