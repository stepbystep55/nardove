define(['pjs','utlx','jquery'], function(pjs, utlx, $){
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
		var which = 4;

		var fulcrum, end1, end2, ss;
		var fulcrumA, axelA, axelA2, yyA;
		var fulcrumB, axelB, yyB;
		var pe1, pe2, pb, pb2, pb3, png;

		pjs.setup = function(){
			pjs.size(500, 500);
			pjs.frameRate(10);

			if(which == 1){
				fulcrum = new utlx.fac.newGctr(200, 200);
				end1 = new utlx.fac.newGctr(250, 250);
				end2 = new utlx.fac.newGctr(160, 130);
				ss = new utlx.fac.newSsw(fulcrum, end1, end2);

			}else if(which == 2){
				axelA = new utlx.fac.newGctr(350, 300);
				axelA2 = new utlx.fac.newGctr(250, 200);
				fulcrumA = new utlx.fac.newGctr(300, 300);
				yyA = new utlx.fac.newYoyo(fulcrumA, [axelA, axelA2]);

				axelB = new utlx.fac.newGctr(150, 100);
				fulcrumB = new utlx.fac.newGctr(100, 100);
				yyB = new utlx.fac.newYoyo(fulcrumB, axelB);

			}else if(which == 4){
				pe1 = new utlx.fac.newGctr(150, 100);
				pe2 = new utlx.fac.newGctr(400, 150);
				pb = new utlx.fac.newGctr(250, 50);
				pb2 = new utlx.fac.newGctr(300, 50);
				pb3 = new utlx.fac.newGctr(350, 45);
				png = new utlx.fac.newPong(pe1, pe2, [pb, pb2, pb3]);
				//png = new utlx.fac.newPong(pe1, pe2, pb);
			}
		};

		pjs.draw = function(){
			pjs.background(200);

			if(which == 1){
				ss.mvTo(pjs.mouseX, pjs.mouseY);

				pjs.fill(255);
				pjs.ellipse(ss.fulcrum.x, ss.fulcrum.y, 30, 30);
				pjs.ellipse(ss.end1.x, ss.end1.y, 30, 30);
				pjs.ellipse(ss.end2.x, ss.end2.y, 30, 30);
				pjs.fill(0);
				ss.show();

			}else if(which == 2){
				yyA.mvTo(pjs.mouseX, pjs.mouseY);
				pjs.ellipse(yyA.fulcrum.x, yyA.fulcrum.y, 10, 10);
				for(var i = 0; i < yyA.axls.length; i++) pjs.ellipse(yyA.axls[i].x, yyA.axls[i].y, 5, 5);

				yyB.mvTo(pjs.mouseX, pjs.mouseY);
				pjs.ellipse(yyB.fulcrum.x, yyB.fulcrum.y, 10, 10);
				for(var i = 0; i < yyB.axls.length; i++) pjs.ellipse(yyB.axls[i].x, yyB.axls[i].y, 5, 5);

			}else if(which == 4){
				pjs.fill(255);
				png.mvTo(pjs.mouseX, pjs.mouseY);
				pjs.ellipse(png.barEnd1.x, png.barEnd1.y, 10, 10);
				pjs.ellipse(png.barEnd2.x, png.barEnd2.y, 10, 10);
				pjs.ellipse(png.barCenter.x, png.barCenter.y, 5, 5);
				for(var i = 0; i < png.balls.length; i++){
					var ball = png.balls[i];
					var shadow = png.balls[i].shadow;
					pjs.fill(128);
					pjs.ellipse(ball.x, ball.y, 20, 20);
					pjs.fill(0);
					pjs.ellipse(shadow.x, shadow.y, 10, 10);
				}
			}
		};

		pjs.mousePressed = function(){
			if(which == 1){
				ss.grb(pjs.mouseX, pjs.mouseY);
			}else if(which == 2){
				yyA.grb(pjs.mouseX, pjs.mouseY);
				yyB.grb(pjs.mouseX, pjs.mouseY);
			}else if(which == 4){
				png.grb(pjs.mouseX, pjs.mouseY);
			}
		};

		pjs.mouseReleased = function(){
			if(which == 1){
				ss.rls();
			}else if(which == 2){
				yyA.rls();
				yyB.rls();
			}else if(which == 4){
				png.rls();
			}
		};

		pjs.setup();
	};

	return app;
});