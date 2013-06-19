var FunctionVisitor = function FunctionVisitor(){

	this.visitProgram = function visitProgram(AST){
		console.log(AST);
		this.program = AST;
	}

	this.visitFunctionDeclaration = function visitFunctionDeclaration(AST){
		this.visitFunction(AST);
	}

	this.visitFunctionExpression = function visitFunctionExpression(AST){
		this.visitFunction(AST);
	}

	this.visitFunction = function visitFunction(AST){
		var context = this.getContext(2);
		if(context.functions === undefined){
			context.functions = [];
		}
		context.functions.push(AST);
	}

	this.getFunctionJSON = function getFunctionJSON(){
		var aux = function aux(AST){
			var obj = {};
			obj.name = (AST.id === null || AST.id === undefined) ? 'anon' : AST.id.name ;
			obj.size = AST.range[1] - AST.range[0];
			obj.AST = AST;
			if(AST.functions != undefined){
				obj.children = [];
				for(var k in AST.functions){
					var fun = AST.functions[k];
					var a = aux(fun);
					obj.children.push(a);
				}
			}
			return obj;
		}
		return aux(this.program);
	}


}

FunctionVisitor.prototype = new ASTVisitor();