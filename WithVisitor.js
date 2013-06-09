/**
* This checks for 'with' syntax as in the next example:
*
* var x = 17;
* with (obj) // !!! syntax error
* {
*   // If this weren't strict mode, would this be var x, or
*   // would it instead be obj.x?  It's impossible in general
*   // to say without running the code, so the name can't be
*   // optimized.
*   x;
* }
**/

var WithVisitor = function WithVisitor() {

	this.visitWithStatement = function visitWithStatement(AST){

		// The problem is registered into the corresponding famix object
		var context = this.context[this.context.length -1];
		context.famix.use_strict_static_problems.push({description:"'with' syntax", loc: AST.loc, range: AST.range});

	}
}

WithVisitor.prototype = new ASTVisitor();