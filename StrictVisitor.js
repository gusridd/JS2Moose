var visitAST = function visitAST(AST, visitor){
	if(AST === null){
		return;
	}
	console.log(AST);
	if(pred_isProgram(AST)){

		visitor.visitProgram(AST);
		for(var key in AST.body){
			var statement = AST.body[key];
			visitAST(statement,visitor);
		}

	} else if(pred_isLiteral(AST)){

		// Nothing to traverse here
		visitor.visitLiteral(AST);

	} else if(pred_isVariableDeclarator(AST)){

		visitor.visitVariableDeclarator(AST);
		visitAST(AST.id,visitor);
		visitAST(AST.init,visitor);

	} else if(pred_IsFunctionExpression(AST)){

		visitor.visitFunctionExpression(AST);
		visitAST(AST.id,visitor);
		for(var key in AST.params){
			var param = AST.params[key];
			visitAST(param,visitor);
		}
		visitAST(AST.body,visitor);

	} else if(pred_isWithStatement(AST)){

		visitor.visitWithStatement(AST);
		visitAST(AST.object,visitor);
		visitAST(AST.body,visitor);

	} else if(pred_isExpressionStatement(AST)){
		
		visitor.visitExpressionStatement(AST);
		visitAST(AST.expression,visitor);

	} else if(pred_isVariableDeclaration(AST)){

		visitor.visitVariableDeclaration(AST);
		for(var key in AST.declarations){
			var declaration = AST.declarations[key];
			visitAST(declaration,visitor);
		}

	} else if(pred_isObjectExpression(AST)){

		visitor.visitObjectExpression(AST);
		for(var key in AST.properties){
			var property = AST.properties[key];
			visitAST(property,visitor);
		}
		

	} else if(pred_IsCallExpression(AST)){

		visitor.visitCallExpression(AST);
		for(key in AST.arguments){
			var argument = AST.arguments[key];
			visitAST(argument,visitor);
		}
		visitAST(AST.callee,visitor);

	} else if(pred_IsFunctionDeclaration(AST)){

		visitor.visitFunctionDeclaration(AST);
		visitAST(AST.body,visitor);
		for(key in AST.defaults){
			var defl = AST.defaults[key];
			visitAST(defl, visitor);
		}
		visitAST(AST.id,visitor);
		for(key in AST.params){
			var param = AST.params[key];
			visitAST(param, visitor);
		}

	} else if(pred_isTryStatement(AST)){

		visitor.visitTryStatement(AST);
		visitAST(AST.block,visitor);
		for(var key in AST.guardedHandlers){
			var guardedHandler = AST.guardedHandlers[key];
			visitAST(guardedHandler,visitor);
		}
		for(var key in AST.handlers){
			var handler = AST.handlers[key];
			visitAST(handler,visitor);
		}

	} else if(pred_is_a(AST,'CatchClause')){

		visitor.visitCatchClause(AST);
		visitAST(AST.param, visitor);
		visitAST(AST.body, visitor);

	} else if(pred_is_a(AST,'Identifier')){

		visitor.visitIdentifier(AST);

	} else if(pred_is_a(AST,'LogicalExpression')){

		visitor.visitLogicalExpression(AST);
		visitAST(AST.left, visitor);
		visitAST(AST.right, visitor);

	} else if(pred_is_a(AST,'NewExpression')){

		visitor.visitNewExpression(AST);
		for(var key in AST.arguments){
			var argument = AST.arguments[key];
			visitAST(argument,visitor);
		}
		visitAST(AST.callee, visitor);


	} else if(pred_is_a(AST,'BinaryExpression')){

		visitor.visitBinaryExpression(AST);
		visitAST(AST.left, visitor);
		visitAST(AST.right, visitor);

	} else if(pred_is_a(AST,'AssignmentExpression')){

		visitor.visitAssignmentExpression(AST);
		visitAST(AST.left, visitor);
		visitAST(AST.right, visitor);

	} else if(pred_is_a(AST,'UpdateExpression')){

		visitor.visitUpdateExpression(AST);
		visitAST(AST.argument, visitor);

	} else if(pred_is_a(AST,'Property')){

		visitor.visitProperty(AST);
		visitAST(AST.key,visitor);
		visitAST(AST.value,visitor);

	} else if(pred_is_a(AST,'BlockStatement')){
		visitor.visitBlockStatement(AST);

		for(var key in AST.body){
			var statement = AST.body[key];
			visitAST(statement,visitor);
		}
	} else if(pred_is_a(AST,'ReturnStatement')){

		visitor.visitReturnStatement(AST);
		visitAST(AST.argument, visitor);

	} else if(pred_is_a(AST,'MemberExpression')){
		
		visitor.visitMemberExpression(AST);
		visitAST(AST.object,visitor);
		visitAST(AST.property,visitor);

	} else if(pred_is_a(AST,'ThisExpression')){

		visitor.visitThisExpression(AST);

	} else {

		console.error(AST);
		throw "visitAST does not have a predicate for this object";

	}
}



var StrictVisitor = function StrictVisitor(){


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