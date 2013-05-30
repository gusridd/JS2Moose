var functions = [];

var octal_regex = new RegExp("0[0-7]+");

	var collect = function collect(obj, predicate){
		var list = [];
		if(typeof obj === 'object'){
			if(predicate(obj)){
				list.push(obj);
			}
			for(var key in obj){
				var value = obj[key];
				var other_list = collect(value, predicate);
				list = list.concat(other_list);
			}
		} 
		return list;
	};

	var pred_is_a = function pred_is_a(obj, typeName){
		if(obj === null || obj.type === undefined){
			return false;
		} else if(obj.type === typeName){
			return true;
		} else {
			return false;
		}
	}

	var pred_IsFunctionExpression = function pred_IsFunctionExpression(obj){
		return pred_is_a(obj,'FunctionExpression');
	};

	var pred_IsFunctionDeclaration = function pred_IsFunctionDeclaration(obj){
		return pred_is_a(obj,'FunctionDeclaration');
	};

	var pred_IsFunction = function pred_IsFunction(obj){
		return pred_IsFunctionDeclaration(obj) || pred_IsFunctionExpression(obj);
	}

	var pred_IsCallExpression = function pred_IsCallExpression(obj){
		return pred_is_a(obj,'CallExpression');
	};

	var pred_IsIfStatement = function pred_IsIfStatement(obj){
		return pred_is_a(obj,'IfStatement');
	};

	var pred_IsMemberCallExpression = function pred_IsMemberCallExpression(obj){
		return pred_is_a(obj,'CallExpression') && pred_is_a(obj.callee, 'MemberExpression');
	}

	var pred_isVariableDeclarator = function pred_isVariableDeclarator(obj){
		return pred_is_a(obj,'VariableDeclarator');
	}

	var pred_isVariableDeclaration = function pred_isVariableDeclaration(obj){
		return pred_is_a(obj,'VariableDeclaration');
	}

	var pred_isVariableDeclarator = function pred_isVariableDeclarator(obj){
		return pred_is_a(obj,'VariableDeclarator');
	}

	var pred_isExpressionStatement = function pred_isExpressionStatement(obj){
		return pred_is_a(obj,'ExpressionStatement');
	}

	var pred_isObjectExpression = function pred_isObjectExpression(obj){
		return pred_is_a(obj,'ObjectExpression');
	}

	var pred_isProgram = function pred_isProgram(obj){
		return pred_is_a(obj,'Program');
	}

	var pred_isLiteral = function pred_isLiteral(obj){
		return pred_is_a(obj,'Literal');
	}

	var pred_isWithStatement = function pred_isWithStatement(obj){
		return pred_is_a(obj, 'WithStatement');
	}

	var f_functions = [];
	var f_global_variables = [];
	var f_invocations = [];

	f_functions.push(famix_window);

	var collect = function collect(AST, context){
		var obj = AST;

		// Case for global use of 'use strict'
		if(pred_isProgram(obj) && obj.body.length > 0 && pred_isExpressionStatement(obj.body[0]) && obj.body[0].expression.value == 'use strict'){
			context.use_strict = true;
		}

		if(typeof AST === 'object'){
			for(var key in obj){
				var value = obj[key];
				if(pred_IsFunction(value)){

					// Fix for anonymous functions
					var name = "$"+value.loc.start.line+"_"+value.loc.start.column;
					if(value.id != null){
						name = value.id.name;
					}


					

					var f = new FAMIX_FUNCTION(name);
					f.context = context;
					f.LOC = value.range[1] - value.range[0] + 1;
					f.statements = value.body.body.length;
					f.params = value.params.map(function(e){
						return e.name;
					});
					var params_size = f.params.length;
					if($.unique(f.params).length != params_size){
						f.use_strict_static_problems.push({description:"duplicated parameter names", location: value.loc});
					}

					// 'use strict' validation
					var body = value.body.body;
					if(body.length > 0 && body[0].type === "ExpressionStatement" && body[0].expression.value == 'use strict'){
						f.use_strict = true;
					} else {
						// 'use strict' is inherited
						f.use_strict = context.use_strict;
					}

					f_functions.push(f);

					// If a local function declaration is made, it must be added to the context static_scope_functions
					if(pred_IsFunctionDeclaration(value)){
						context.static_scope_functions[f.name] = f;
					}
					// Static scope variables is inherited
					f.static_scope_variables = context.static_scope_variables;

					// Statis scope functions is inherited
					f.static_scope_functions = context.static_scope_functions;

					collect(value,f);

				} else if (pred_IsCallExpression(value)){
					var f = new FAMIX_INVOCATION();
					f.candidates = [];
					f.sender = context;
					// It's like an object message call
					if(value.callee.type == 'MemberExpression'){
						f.signature = value.callee.property.name;
						f.receiver = context.static_scope_variables[value.callee.object.name];
					// This is just a simple function call	
					} else if (value.callee.type == 'Identifier'){
						f.signature = value.callee.name;
						f.receiver = context;
					} else if(value.callee.type == 'FunctionExpression'){

					} else if(value.callee.type == 'NewExpression'){

					} else if(value.callee.type == 'LogicalExpression'){

					} else if(value.callee.type == 'ConditionalExpression'){

					} else {
						// console.log(value);
						//throw "value.callee.type unknown " +value.loc.start.line + ":" + value.loc.start.column + " " + value.callee.type;
					}
					if(typeof f.signature == 'undefined'){
						f.signature = value.callee.object.name;
					}
					// In some cases the function map appears as a receiver
					if( typeof f.signature != 'undefined' && typeof f.receiver != 'undefined' && typeof f.receiver != 'function'){
						f_invocations.push(f);
					}
					collect(value,context);

				} else if (pred_isVariableDeclaration(value)){
					collect(value,context);
				} else if (pred_isVariableDeclarator(value)){
					var f = new FAMIX_GLOBAL_VAR(value.id.name);
					if(value.id.name != 'length'){
						context.static_scope_variables[value.id.name] = f
					} else {
						context.static_scope_variables['$length'] = f
					}
					
					f_global_variables.push(f);
					collect(value,context);
				} else if(pred_isProgram(value)){
					console.log(value.body[0]);
					if(value.body.length > 0 && pred_isExpressionStatement(value.body[0])){
						console.log("useStrict");
						console.log(context);
					}
				} else if(pred_isObjectExpression(value)) {
					// Checking for duplicated property names
					var keys = value.properties.map(function(el){
						return el.key.name;
					});
					var size = keys.length;
					if($.unique(keys).length != size){
						context.use_strict_static_problems.push({description:"duplicated property name at object literal", location:value.loc});
					}
				} else if(pred_isLiteral(value)) {
					// Check for octal syntax
					if(octal_regex.exec(value.raw)){
						context.use_strict_static_problems.push({description:"octal syntax", location:value.loc});
					}
				} else if(pred_isWithStatement(value)) {
					context.use_strict_static_problems.push({description:"'with' syntax", location:value.loc});
				} else if(pred_isExpressionStatement(value)) {
					if(value.expression.operator == "=" && value.expression.left.type == 'Identifier' && value.expression.left.name == "eval"){
						// console.log(value.expression.left);
						context.use_strict_static_problems.push({description:"trying to asign to reserved word 'eval'", location:value.loc});
					}
				} else {
					collect(value,context);
				}
			}
		} 
		return;
	}

	var newCandidates = function newCandidates(invocations, functions){
		return invocations.map(function(invocation){
			var candidates = functions.filter(function(fun){
				return fun.name == invocation.signature;
			});
			invocation.candidates = candidates;
			return invocation;
		});
	}

	/**
	* This functions returns true if an AST function is statically enabled for using 'use strict'
	* and returns an array of error otherwise
	**/
	var isStaticUseStrict = function isStaticUseStrict(AST){
		for(var es in AST.body.body){
			var prop = AST.body.body[es];
			console.log(es);
			console.log(prop);
		}

		return true;
	};

	// This functions returns the MSE text for some JavasScript code
	var getMSE = function getMSE(js_code){
		t = esprima.parse(js_code, {range:true, loc:true});
		collect(t,famix_window);
		newCandidates(f_invocations, f_functions);
		var str = "(\n";
		f_functions.map(function(e){
			str += e.toString(1);
		});	
		f_invocations.map(function(e){
			str += e.toString(1);
		});	
		f_global_variables.map(function(e){
			str += e.toString(1);
		});	
		str += ')';
		return str;
	}