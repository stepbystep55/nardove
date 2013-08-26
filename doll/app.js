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
		var which = 4;

		var fulcrum, end1, end2, ss;
		var fulcrumA, axelA, yyA;
		var fulcrumB, axelB, yyB;
		var pe1, pe2, pb, pb2, png;

		var cubeend1, cubeend2, cubesrfs, cube;

		pjs.setup = function(){
			pjs.size(500, 500);
			pjs.frameRate(10);

			if(which == 1){
				fulcrum = new pjsx.fac.newGvector(200, 200);
				end1 = new pjsx.fac.newGvector(250, 250);
				end2 = new pjsx.fac.newGvector(160, 130);
				ss = new pjsx.fac.newSeesaw(fulcrum, end1, end2);

			}else if(which == 2){
				axelA = new pjsx.fac.newGvector(350, 300);
				fulcrumA = new pjsx.fac.newGvector(300, 300);
				yyA = new pjsx.fac.newYoyo(fulcrumA, axelA);

				axelB = new pjsx.fac.newGvector(150, 100);
				fulcrumB = new pjsx.fac.newGvector(100, 100);
				yyB = new pjsx.fac.newYoyo(fulcrumB, axelB);

			}else if(which == 3){
				cubeend1 = new pjsx.fac.newGvector(50, 300);
				cubeend2 = new pjsx.fac.newGvector(450, 300);
				cubesrfs = [];
				cubesrfs.push(new pjsx.fac.newGvector(100, 200));
				cubesrfs.push(new pjsx.fac.newGvector(200, 150));
				cubesrfs.push(new pjsx.fac.newGvector(300, 200));
				cube = new pjsx.fac.newCube(cubeend1, cubeend2, cubesrfs);

			}else if(which == 4){
				pe1 = new pjsx.fac.newGvector(150, 100);
				pe2 = new pjsx.fac.newGvector(400, 150);
				pb = new pjsx.fac.newGvector(250, 50);
				//pb2 = new pjsx.fac.newGvector(200, 50);
				//png = new pjsx.fac.newPong(pe1, pe2, [pb, pb2]);
				png = new pjsx.fac.newPong(pe1, pe2, pb);
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
				pjs.ellipse(yyA.axel.x, yyA.axel.y, 5, 5);

				yyB.mvTo(pjs.mouseX, pjs.mouseY);
				pjs.ellipse(yyB.fulcrum.x, yyB.fulcrum.y, 10, 10);
				pjs.ellipse(yyB.axel.x, yyB.axel.y, 5, 5);

			}else if(which == 3){
				cube.mvTo(pjs.mouseX, pjs.mouseY);
				pjs.noFill();
				var preP, curP;
				pjs.beginShape();
				curP = cube.surfaces[0];
				pjs.vertex(curP.fulcrum.x, curP.fulcrum.y); // first point
				for(var i = 1; i < cube.surfaces.length; i++){
					preP = cube.surfaces[i - 1];
					curP = cube.surfaces[i];
					pjs.bezierVertex(preP.end2.x, preP.end2.y, curP.end1.x, curP.end1.y, curP.fulcrum.x, curP.fulcrum.y);
				}
				pjs.endShape();
				pjs.fill(0);
				for(var i = 0; i < cube.surfaces.length; i++){
					pjs.fill(0);
					pjs.ellipse(cube.surfaces[i].fulcrum.x, cube.surfaces[i].fulcrum.y, 10, 10);
				}

			}else if(which == 4){
				pjs.fill(255);
				png.mvTo(pjs.mouseX, pjs.mouseY);
				pjs.ellipse(png.barEnd1.x, png.barEnd1.y, 10, 10);
				pjs.ellipse(png.barEnd2.x, png.barEnd2.y, 10, 10);
				pjs.ellipse(png.barCenter.x, png.barCenter.y, 5, 5);
				for(var i = 0; i < png.ballAndShadowList.length; i++){
					var ball = png.ballAndShadowList[i].ball;
					var shadow = png.ballAndShadowList[i].shadow;
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
			}else if(which == 3){
				cube.grb(pjs.mouseX, pjs.mouseY);
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
			}else if(which == 3){
				cube.rls();
			}else if(which == 4){
				png.rls();
			}
		};

		pjs.setup();
	};

	return app;
});