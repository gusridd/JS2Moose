JS2Moose
========

JS2Moose is a software that generates the necessary code for the Moose platform (http://www.moosetechnology.org/) to analyse JavaScript code.

It takes a JavaScript code as input and generates an MSE file for future analysis. The MSE especification can be found at http://www.moosetechnology.org/docs/mse


Usage
========

1. Download the last stable release from https://github.com/gusridd/JS2Moose/raw/master/releases/JS2Moose.zip

2. Extract the project with your favourite program
	In ubuntu this can be achieved with the command:

```bash
unzip JS2Moose.zip -d JS2Moose
```

3. Enter the folder JS2Moose

```bash
cd JS2Moose
```

4. Open the file index.html with a Web Browser

5. Paste your JavaScript code into the the left textarea, then click the button labeled "getMSE". The resulting MSE code will be generated into the right textarea

6. Click the button labeled "getMSE"

7. Copy the generated code into a file with .mse extention

8. Import the file using the Moose software.


Dependencies
========

This project relies on the esprima JavaScript parser from: https://github.com/ariya/esprima
It uses JQuery as DOM manipulator from: http://jquery.com/