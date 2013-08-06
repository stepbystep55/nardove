define(['pjs','pjsx','jquery'], function(pjs, pjsx, $){
	'use strict';

	var loopon = false;
	$('#btn').click(function(){
		loopon = !loopon;
		if(loopon){
			pjs.loop();
		}else{
			pjs.noLoop();
		}
	});
	var app = function(){
		var fulcrum, end1, end2, ss;
		var grip, ball, kd;

		pjs.setup = function(){
			pjs.size(500, 500);
			pjs.frameRate(10);

			//g1 = new pjsx.GVector(100, 200);
			fulcrum = new pjsx.fac.newGvector(200, 200);
			end1 = new pjsx.fac.newGvector(250, 250);
			end2 = new pjsx.fac.newGvector(160, 130);
			ss = new pjsx.fac.newSeesaw(fulcrum, end1, end2);

			ball = new pjsx.fac.newGvector(350, 300);
			grip = new pjsx.fac.newGvector(300, 300);
			kd = new pjsx.fac.newKendama(grip, ball);
		};

		pjs.draw = function(){
			pjs.background(200);

			fulcrum.mvTo(pjs.mouseX, pjs.mouseY);
			end1.mvTo(pjs.mouseX, pjs.mouseY);
			end2.mvTo(pjs.mouseX, pjs.mouseY);

			pjs.fill(255);
			pjs.ellipse(ss.fulcrum.x, ss.fulcrum.y, 30, 30);
			pjs.ellipse(ss.end1.x, ss.end1.y, 30, 30);
			pjs.ellipse(ss.end2.x, ss.end2.y, 30, 30);
			pjs.fill(0);
			pjs.text("" + Math.round(ss.fulcrum.x) + "," + Math.round(ss.fulcrum.y), ss.fulcrum.x, ss.fulcrum.y);
			pjs.text("" + Math.round(ss.end1.x) + "," + Math.round(ss.end1.y), ss.end1.x, ss.end1.y);
			pjs.text("" + Math.round(ss.end2.x) + "," + Math.round(ss.end1.y), ss.end2.x, ss.end2.y);

			grip.mvTo(pjs.mouseX, pjs.mouseY);
			ball.mvTo(pjs.mouseX, pjs.mouseY);

			pjs.ellipse(kd.grip.x, kd.grip.y, 10, 10);
			pjs.ellipse(kd.ball.x, kd.ball.y, 5, 5);
		};

		pjs.mousePressed = function(){
			fulcrum.grb(pjs.mouseX, pjs.mouseY);
			end1.grb(pjs.mouseX, pjs.mouseY);
			end2.grb(pjs.mouseX, pjs.mouseY);
			grip.grb(pjs.mouseX, pjs.mouseY);
			ball.grb(pjs.mouseX, pjs.mouseY);
		};

		pjs.mouseReleased = function(){
			fulcrum.rls();
			end1.rls();
			end2.rls();
			grip.rls();
			ball.rls();
		};

		pjs.setup();
	};

	return app;
});