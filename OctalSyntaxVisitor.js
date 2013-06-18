/**
* This checks for octal syntax as in the next example:
*
* var sum = 015 + // !!! syntax error
*           197 +
*           142;
**/

var octal_regex = new RegExp("0[0-7]+");

var OctalSyntaxVisitor = function OctalSyntaxVisitor() {

	this.visitLiteral = function visitLiteral(AST){
		var match = octal_regex.exec(AST.raw)
		if(match && match[0] == AST.raw){
			// The problem is registered into the corresponding famix object
			var context = this.getContext();
			context.famix.use_strict_static_problems.push({description:"octal syntax", loc: AST.loc, range: AST.range});
		}

	}
}

OctalSyntaxVisitor.prototype = new ASTVisitor();