// FAMIX.js

var Generator = function Generator(){
	var i = 0; 
	this.generateID = function(){
		return ++i
	}
}
var g = new Generator();

var FAMIX = function FAMIX(){
	var tab = '\t';

	this.id = g.generateID();

	// Kind of and abstract method
	this.famixPrint = function famixPrint(str, spacing){
		return "Not implemented yet";
	}

	this.toString = function(spacing){
		var str = "";
		this.makeSpacing = function makeSpacing(str,s){
			for(var i = 0; i<s; i++){
				str += tab;
			}
			return str;
		}
		str = this.makeSpacing(str, spacing);
		str += '(FAMIX.' + this.type + ' (id: ' + this.id + ')\n';
		str = this.makeSpacing(str, spacing);
		
		str = this.famixPrint(str,spacing);

		return str;
	}
}

var FAMIX_FUNCTION = function FAMIX_FUNCTION(name){
	var tab = '\t';
	this.id = g.generateID();
	this.type = "Function";
	this.name = name;
	this.LOC = 1;
	this.statements = 1;
	this.static_scope_functions = [];
	this.static_scope_variables = [];
	this.params = [];

	this.famixPrint = function famixPrint(str, spacing){
		str += tab + '(name \'' + this.name + '\')\n';
		/*makeSpacing(spacing);
		str += tab + '(cyclomaticComplexity -1)\n';
		makeSpacing(spacing);
		str += tab + '(numberOfComments 0)\n';
		makeSpacing(spacing);
		str += tab + '(numberOfConditionals -1)\n';*/
		str = this.makeSpacing(str, spacing);
		str += tab + '(numberOfLinesOfCode ' + this.LOC + ')\n';
		str = this.makeSpacing(str, spacing);
		str += tab + '(numberOfStatements ' + this.statements + '))\n';
		/*makeSpacing(spacing);
		str += tab + '(numberOfParameters -1))\n';*/
		return str;
	};

}


var FAMIX_INVOCATION = function FAMIX_INVOCATION(){
	var tab = '\t';
	this.id = g.generateID();
	this.type = "Invocation";
	this.sender = null;
	this.signature = "";
	this.candidates = [];

	this.famixPrint = function famixPrint(str, spacing){
		// console.log(this.sender)
		str += tab + '(sender (ref: ' + this.sender.id + '))\n';
		str = this.makeSpacing(str, spacing);
		str += tab + '(candidates';
		for (var c_index in this.candidates){
			var candidate = this.candidates[c_index];
			str += ' (ref: ' + candidate.id + ')';
		}
		str += ')\n';
		if(this.receiver != null){
			// console.log(this.receiver);
			str = this.makeSpacing(str, spacing);
			str += tab + '(receiver (ref: ' + this.receiver.id + '))\n';
			if( typeof this.receiver.id == 'undefined'){
				console.log(this.receiver);
			}
		}
		
		str = this.makeSpacing(str, spacing);
		str += tab + '(signature \'' + this.signature + '\'))\n';
		return str;
	};
}

var FAMIX_GLOBAL_VAR = function FAMIX_GLOBAL_VAR(name){
	var tab = '\t';
	this.id = g.generateID();
	this.name = name;
	this.type = "GlobalVariable";

	this.famixPrint = function famixPrint(str, spacing){
		str += tab + '(name \'' + this.name + '\'))\n';
		return str;
	}
}

FAMIX_FUNCTION.prototype = new FAMIX();
FAMIX_INVOCATION.prototype = new FAMIX();
FAMIX_GLOBAL_VAR.prototype = new FAMIX();

// a window context is assumed
var famix_window = new FAMIX_FUNCTION("window");
