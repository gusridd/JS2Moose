/**
* This checks for duplicated property names at literal object definitions as in the next example:
*
* var o = {p:1, p:2, a:3} 
*
**/

var DuplicatePropertyVisitor = function DuplicatePropertyVisitor(ctx) {

	this.visitObjectExpression = function visitObjectExpression(AST){

		var size = AST.properties.length;
		var keys = AST.properties.map(function(el){
			return el.key.name;
		});
		if($.unique(keys).length != size){
			// The problem is registered into the corresponding famix object
			var context = this.context[this.context.length -1];
			context.famix.use_strict_static_problems.push({description:"duplicated parameter names", loc: AST.loc, range: AST.range});
		}
	}
}

DuplicatePropertyVisitor.prototype = new ASTVisitor();