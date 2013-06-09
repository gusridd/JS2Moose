/**
* arguments.callee is no longer supported in strict mode
**/

var CalleeVisitor = function CalleeVisitor() {

	this.visitMemberExpression = function visitMemberExpression(AST){

		var context = this.context[this.context.length -1];
		
		if(pred_is_a(AST.object,'Identifier') && AST.object.name == 'arguments' && AST.property.name == 'callee'){
			context.famix.use_strict_static_problems.push({description:"arguments.callee is no longer supported in strict mode", loc: AST.loc, range: AST.range});
		}

	}
}

CalleeVisitor.prototype = new ASTVisitor();