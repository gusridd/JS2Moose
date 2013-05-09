JS2Moose
========

This project relies on the esprima JavaScript parser from: https://github.com/ariya/esprima

Usage:

The files esprima.js, FAMIX.js and js2mse.js must be included in an html in that order.

The function getMSE recieves an string with JavaScript code and returns and String with the corresponding MSE representation.

An example using Jquery, used on index.html

```JavaScript

	$(document).ready(function(){

		$('#getmse').click(function(){
			var code = $('#input').val().trim();
			$('#mse_content').html(getMSE(code));
		});
		
	});
	
```