var accept = function accept(AST, visitor){
	if(AST === null){
		return;
	}
	if(pred_is_a(AST,'Program')){

		visitor.visitProgram(AST);
		for(var key in AST.body){
			var statement = AST.body[key];
			accept(statement,visitor);
		}

	} else if(pred_is_a(AST,'Literal')){

		// Nothing to traverse here
		visitor.visitLiteral(AST);

	} else if(pred_is_a(AST,'VariableDeclarator')){

		visitor.visitVariableDeclarator(AST);
		accept(AST.id,visitor);
		accept(AST.init,visitor);

	} else if(pred_is_a(AST,'FunctionExpression')){

		visitor.visitFunctionExpression(AST);
		accept(AST.id,visitor);
		for(var key in AST.params){
			var param = AST.params[key];
			accept(param,visitor);
		}
		accept(AST.body,visitor);

	} else if(pred_is_a(AST,'WithStatement')){

		visitor.visitWithStatement(AST);
		accept(AST.object,visitor);
		accept(AST.body,visitor);

	} else if(pred_is_a(AST,'ExpressionStatement')){
		
		visitor.visitExpressionStatement(AST);
		accept(AST.expression,visitor);

	} else if(pred_is_a(AST, 'VariableDeclaration')){

		visitor.visitVariableDeclaration(AST);
		for(var key in AST.declarations){
			var declaration = AST.declarations[key];
			accept(declaration,visitor);
		}

	} else if(pred_is_a(AST, 'ObjectExpression')){

		visitor.visitObjectExpression(AST);
		for(var key in AST.properties){
			var property = AST.properties[key];
			accept(property,visitor);
		}

	} else if(pred_is_a(AST, 'CallExpression')){

		visitor.visitCallExpression(AST);
		for(key in AST.arguments){
			var argument = AST.arguments[key];
			accept(argument,visitor);
		}
		accept(AST.callee,visitor);

	} else if(pred_is_a(AST, 'FunctionDeclaration')){

		visitor.visitFunctionDeclaration(AST);
		accept(AST.body,visitor);
		for(key in AST.defaults){
			var defl = AST.defaults[key];
			accept(defl, visitor);
		}
		accept(AST.id,visitor);
		for(key in AST.params){
			var param = AST.params[key];
			accept(param, visitor);
		}

	} else if(pred_is_a(AST, 'TryStatement')){

		visitor.visitTryStatement(AST);
		accept(AST.block,visitor);
		for(var key in AST.guardedHandlers){
			var guardedHandler = AST.guardedHandlers[key];
			accept(guardedHandler,visitor);
		}
		for(var key in AST.handlers){
			var handler = AST.handlers[key];
			accept(handler,visitor);
		}

	} else if(pred_is_a(AST,'CatchClause')){

		visitor.visitCatchClause(AST);
		accept(AST.param, visitor);
		accept(AST.body, visitor);

	} else if(pred_is_a(AST,'Identifier')){

		visitor.visitIdentifier(AST);

	} else if(pred_is_a(AST,'LogicalExpression')){

		visitor.visitLogicalExpression(AST);
		accept(AST.left, visitor);
		accept(AST.right, visitor);

	} else if(pred_is_a(AST,'NewExpression')){

		visitor.visitNewExpression(AST);
		for(var key in AST.arguments){
			var argument = AST.arguments[key];
			accept(argument,visitor);
		}
		accept(AST.callee, visitor);


	} else if(pred_is_a(AST,'BinaryExpression')){

		visitor.visitBinaryExpression(AST);
		accept(AST.left, visitor);
		accept(AST.right, visitor);

	} else if(pred_is_a(AST,'AssignmentExpression')){

		visitor.visitAssignmentExpression(AST);
		accept(AST.left, visitor);
		accept(AST.right, visitor);

	} else if(pred_is_a(AST,'UpdateExpression')){

		visitor.visitUpdateExpression(AST);
		accept(AST.argument, visitor);

	} else if(pred_is_a(AST,'Property')){

		visitor.visitProperty(AST);
		accept(AST.key,visitor);
		accept(AST.value,visitor);

	} else if(pred_is_a(AST,'BlockStatement')){
		visitor.visitBlockStatement(AST);

		for(var key in AST.body){
			var statement = AST.body[key];
			accept(statement,visitor);
		}
	} else if(pred_is_a(AST,'ReturnStatement')){

		visitor.visitReturnStatement(AST);
		accept(AST.argument, visitor);

	} else if(pred_is_a(AST,'MemberExpression')){
		
		visitor.visitMemberExpression(AST);
		accept(AST.object,visitor);
		accept(AST.property,visitor);

	} else if(pred_is_a(AST,'ThisExpression')){

		// Nothing to traverse here
		visitor.visitThisExpression(AST);

	} else {

		// Default case when a predicate is missing
		console.error(AST);
		throw "accept does not have a predicate for this object";

	}
}

/**
* The base empty visitor for implementing other visitors. Other visitors should inherit from this
 **/

var ASTVisitor = function ASTVisitor(){

	this.visitProgram = function visitProgram(AST){}

	this.visitFunctionDeclaration = function visitFunctionDeclaration(AST){}

	this.visitFunctionExpression = function visitFunctionExpression(AST){}

	this.visitVariableDeclaration = function visitVariableDeclaration(AST){}

	this.visitVariableDeclarator = function visitVariableDeclarator(AST){}

	this.visitExpressionStatement = function visitExpressionStatement(AST){}

	this.visitWithStatement = function visitWithStatement(AST){}

	this.visitTryStatement = function visitTryStatement(AST){}

	this.visitCatchClause = function visitCatchClause(AST){}

	this.visitIdentifier = function visitIdentifier(AST){}	

	this.visitLogicalExpression = function visitLogicalExpression(AST){}

	this.visitNewExpression = function visitNewExpression(AST){}

	this.visitObjectExpression = function visitObjectExpression(AST){}

	this.visitBinaryExpression = function visitBinaryExpression(AST){}

	this.visitLiteral = function visitLiteral(AST){}

	this.visitAssignmentExpression = function visitAssignmentExpression(AST){}

	this.visitCallExpression = function visitCallExpression(AST){}

	this.visitUpdateExpression = function visitUpdateExpression(AST){}

	this.visitBlockStatement = function visitBlockStatement(AST){}

	this.visitReturnStatement = function visitReturnStatement(AST){}

	this.visitProperty = function visitProperty(AST){}

	this.visitMemberExpression = function visitMemberExpression(AST){}

	this.visitThisExpression = function visitThisExpression(AST){}

}