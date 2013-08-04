define(['pjs', 'pjsx'], function(pjs, pjsx){
	'use strict';

	var app = function(){
		var fulcrum, end1, end2, ss;
		var ball, grip, head, bb;

		pjs.setup = function(){
			pjs.size(500, 500);
			pjs.frameRate(10);

			//g1 = new pjsx.GVector(100, 200);
			fulcrum = new pjsx.GVector(200, 200);
			end1 = new pjsx.GVector(250, 250);
			end2 = new pjsx.GVector(160, 130);
			ss = new pjsx.Seesaw(fulcrum, end1, end2);

			ball = new pjsx.GVector(350, 300);
			grip = new pjsx.GVector(300, 300);
			head = new pjsx.GVector(450, 350);
			bb = new pjsx.BallBat(ball, grip, head);
		};

		pjs.draw = function(){
			pjs.background(200);

			fulcrum.mvTo(pjs.mouseX, pjs.mouseY);
			end1.mvTo(pjs.mouseX, pjs.mouseY);
			end2.mvTo(pjs.mouseX, pjs.mouseY);

			pjs.ellipse(ss.fulcrum.x, ss.fulcrum.y, 30, 30);
			pjs.ellipse(ss.end1.x, ss.end1.y, 30, 30);

			pjs.ellipse(bb.ball.x, bb.ball.y, 5, 5);
			pjs.ellipse(bb.grip.x, bb.grip.y, 10, 10);
			pjs.ellipse(bb.head.x, bb.head.y, 10, 10);
			pjs.ellipse(bb.ballOnBat.x, bb.ballOnBat.y, 10, 10);
			pjs.ellipse(ss.end2.x, ss.end2.y, 30, 30);
		};

		pjs.mousePressed = function(){
			fulcrum.grb(pjs.mouseX, pjs.mouseY);
			end1.grb(pjs.mouseX, pjs.mouseY);
			end2.grb(pjs.mouseX, pjs.mouseY);
		};

		pjs.mouseReleased = function(){
			fulcrum.rls();
			end1.rls();
			end2.rls();
		};

		pjs.setup();
	};

	return app;
});