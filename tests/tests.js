module( "isStaticUseStrict" );

test( "object literal with duplicated property", function() {
	var code = "function some(){ var a = 3; return {p:1, p:2}; }";
	var tree = esprima.parse(code,{range:true, loc:true});
	var result = isStaticUseStrict(tree.body[0]);
  	ok( ! result, "Passed!" );
});

test( "object literal with nexted duplicated property", function() {
	var code = "function some(){ var a = 3; return {a: {p:1, p:2}, b:3}; }";
	var tree = esprima.parse(code,{range:true, loc:true});
	var result = isStaticUseStrict(tree.body[0]);
  	ok( ! result, "Passed!" );
});

test( "object literal with unique properties", function() {
	var code = "function some(){ var a = 3; return {p:1, p:2}; }";
	var tree = esprima.parse(code,{range:true, loc:true});
	var result = isStaticUseStrict(tree.body[0]);
  	ok( result, "Passed!" );
});