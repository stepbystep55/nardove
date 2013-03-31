define(['cnvs'], function(pjs){
	'use strict';

	pjs.setup = function(){
		pjs.size(200, 200);
		pjs.background(100);
		pjs.stroke(255);
		pjs.ellipse(50, 50, 25, 25);
			pjs.println("hello web!");
	};

	return function(){
		this.init = function(){
			pjs.setup();
		}
	};
});
