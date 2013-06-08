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



var EmptyVisitor = function EmptyVisitor(){


	this.visitProgram = function visitProgram(AST){
		console.log("visitProgram");
	}

	this.visitFunctionDeclaration = function visitFunctionDeclaration(AST){
		console.log("visitFunctionDeclaration");
	}

	this.visitFunctionExpression = function visitFunctionExpression(AST){
		console.log("visitFunctionExpression");
	}

	this.visitVariableDeclaration = function visitVariableDeclaration(AST){
		console.log("visitVariableDeclaration");
	}

	this.visitVariableDeclarator = function visitVariableDeclarator(AST){
		console.log("visitVariableDeclarator");
	}

	this.visitExpressionStatement = function visitExpressionStatement(AST){
		console.log("visitExpressionStatement");
	}

	this.visitWithStatement = function visitWithStatement(AST){
		console.log("visitWithStatement");
	}

	this.visitTryStatement = function visitTryStatement(AST){
		console.log("visitTryStatement");
	}

	this.visitCatchClause = function visitCatchClause(AST){
		console.log("visitCatchClause");
	}

	this.visitIdentifier = function visitIdentifier(AST){
		console.log("visitIdentifier");
	}	

	this.visitLogicalExpression = function visitLogicalExpression(AST){
		console.log("visitLogicalExpression");
	}

	this.visitNewExpression = function visitNewExpression(AST){
		console.log("visitNewExpression");
	}

	this.visitObjectExpression = function visitObjectExpression(AST){
		console.log("visitObjectExpression");
	}

	this.visitBinaryExpression = function visitBinaryExpression(AST){
		console.log("visitBinaryExpression");
	}

	this.visitLiteral = function visitLiteral(AST){
		console.log("visitLiteral");
	}

	this.visitAssignmentExpression = function visitAssignmentExpression(AST){
		console.log("visitAssignmentExpression");
	}

	this.visitCallExpression = function visitCallExpression(AST){
		console.log("visitCallExpression");
	}

	this.visitUpdateExpression = function visitUpdateExpression(AST){
		console.log("visitUpdateExpression");
	}

	this.visitBlockStatement = function visitBlockStatement(AST){
		console.log("visitBlockStatement");
	}

	this.visitReturnStatement = function visitReturnStatement(AST){
		console.log("visitReturnStatement");
	}

	this.visitProperty = function visitProperty(AST){
		console.log("visitProperty");
	}

	this.visitMemberExpression = function visitMemberExpression(AST){
		console.log("visitMemberExpression");
	}

	this.visitThisExpression = function visitThisExpression(AST){
		console.log("visitThisExpression");
	}

}