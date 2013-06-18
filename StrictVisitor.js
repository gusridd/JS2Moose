'use strict'
var StrictVisitor = function StrictVisitor(){
	
	this.p_elements = [];

	this.visitProgram = function visitProgram(AST){
		this.p_elements = this.p_elements.concat(AST.famix.use_strict_static_problems);
	}

	this.visitFunctionDeclaration = function visitFunctionDeclaration(AST){
		this.p_elements = this.p_elements.concat(AST.famix.use_strict_static_problems);
	}

	this.visitFunctionExpression = function visitFunctionExpression(AST){
		this.p_elements = this.p_elements.concat(AST.famix.use_strict_static_problems);
	}

	this.getUseStrictProblems = function getUseStrictProblems(){
		return this.p_elements;
	}

}

StrictVisitor.prototype = new ASTVisitor();