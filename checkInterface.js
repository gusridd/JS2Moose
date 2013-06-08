var CheckInterface = function CheckInterface(){
	this.check = function check(){
		console.error("Unimplemented method check");
	}
}

var AssignCheck = function AssignCheck(){

}

AssignCheck.prototype = new CheckInterface();