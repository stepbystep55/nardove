define(['pjs', 'pjsx'], function(pjs, pjsx){
	'use strict';

	var app = function(){
		var fulcrum, end1, end2, ss;
		pjs.setup = function(){
			pjs.size(500, 500);
			pjs.frameRate(10);

			//g1 = new pjsx.GVector(100, 200);
			fulcrum = new pjsx.GVector(200, 200);
			end1 = new pjsx.GVector(250, 250);
			end2 = new pjsx.GVector(160, 130);
			ss = new pjsx.Seesaw(fulcrum, end1, end2);
		};

		pjs.draw = function(){
			pjs.background(200);

			ss.mvTo(pjs.mouseX, pjs.mouseY);
			pjs.ellipse(ss.fulcrum.x, ss.fulcrum.y, 30, 30);
			pjs.ellipse(ss.end1.x, ss.end1.y, 30, 30);
			pjs.ellipse(ss.end2.x, ss.end2.y, 30, 30);
		};

		pjs.mousePressed = function(){
			ss.grb(pjs.mouseX, pjs.mouseY);
		};

		pjs.mouseReleased = function(){
			ss.rls();
		};

		pjs.setup();
	};

	return app;
});