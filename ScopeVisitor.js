'use strict'

var EmptyEnvironment = function EmptyEnvironment(){
	
	this.resolve = function resolve(key){
		throw "No previous definition for " + key + " variable";
	}
}

var Environment = function Environment(key, value, next){
	var key = key;
	var value = value;
	var next = next || new EmptyEnvironment();

	this.resolve = function resolve(k){
		if(key == k){
			return value;
		} else {
			return next.resolve(k);
		}
	}

}

Environment.prototype = new ASTVisitor();


var ScopeVisitor = function ScopeVisitor(){
	var env = new EmptyEnvironment();

	

}