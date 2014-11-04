define( ["./templates", "text!./template.md","css!./template.css" ],
	// private properties
	var prop1;
	var prop2;
	// private method
	function myFunc( templates, template ){
		console.log( templates );
		// do something with our templates here
	}

	// object
	return {
		// public properties & methods
		prop3: false,
		myFunc1: function() {

		}
	}
});



define( ["./templates", "text!./template.md","css!./template.css" ],
	var myClass = function() {

	};

	// private properties
	var prop1;
	var prop2;
	// private method
	function myFunc( templates, template ){
		console.log( templates );
		// do something with our templates here
	}

	myClass.prototype.myFunc1 = function(first_argument) {
		// body...
	};
	myClass.prototype.prop3 = false;

	return new myClass();

});



define(function(require){
	var lib = require( "package/lib" );
	var lib1 = require( "package/lib1" );
	var lib2 = require( "package/lib2" );

	// some behaviour for our module
	function foo(){
		lib.log( "hello world!" );
	}

	// export (expose) foo for other modules
	return {
		foobar: foo
	};
});



define(function(require){
	var lib = require( "package/lib" );
	var lib1 = require( "package/lib1" );
	var lib2 = require( "package/lib2" );

	function myFunc( templates, template ){
		console.log( templates );
		// do something with our templates here
	}

	myClass.prototype.myFunc1 = function(first_argument) {
		// body...
	};
	myClass.prototype.prop3 = false;

	return new myClass();
});