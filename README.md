JS2Moose
========

JS2Moose is a software that generates the necessary code for the Moose platform (http://www.moosetechnology.org/) to analyse JavaScript code.

It takes a JavaScript code as input and generates an MSE file for future analysis. MSE especification can be found at http://www.moosetechnology.org/docs/mse

Usage:

Open the file index.html and paste your code into the left textarea, then click the buttor labeled "getMSE" to obtain the resulting MSE code into the right textarea copy that into a file called as you prefer with .mse extention.


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


This project relies on the esprima JavaScript parser from: https://github.com/ariya/esprima