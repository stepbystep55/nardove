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
		var gripA, ballA, kdA;
		var gripB, ballB, kdB;

		var cubeend1, cubeend2, cubesrfs, cube;

		pjs.setup = function(){
			pjs.size(500, 500);
			pjs.frameRate(10);

			fulcrum = new pjsx.fac.newGvector(200, 200);
			end1 = new pjsx.fac.newGvector(250, 250);
			end2 = new pjsx.fac.newGvector(160, 130);
			ss = new pjsx.fac.newSeesaw(fulcrum, end1, end2);
			/*
			*/

			/*
			ballA = new pjsx.fac.newGvector(350, 300);
			gripA = new pjsx.fac.newGvector(300, 300);
			kdA = new pjsx.fac.newKendama(gripA, ballA);

			ballB = new pjsx.fac.newGvector(150, 100);
			gripB = new pjsx.fac.newGvector(100, 100);
			kdB = new pjsx.fac.newKendama(gripB, ballB);
			*/
			cubeend1 = new pjsx.fac.newGvector(50, 300);
			cubeend2 = new pjsx.fac.newGvector(450, 300);
			cubesrfs = [];
			cubesrfs.push(new pjsx.fac.newGvector(100, 200));
			cubesrfs.push(new pjsx.fac.newGvector(200, 150));
			cubesrfs.push(new pjsx.fac.newGvector(300, 200));
			cube = new pjsx.fac.newCube(cubeend1, cubeend2, cubesrfs);
		};

		pjs.draw = function(){
			pjs.background(200);

			ss.mvTo(pjs.mouseX, pjs.mouseY);

			pjs.fill(255);
			pjs.ellipse(ss.fulcrum.x, ss.fulcrum.y, 30, 30);
			pjs.ellipse(ss.end1.x, ss.end1.y, 30, 30);
			pjs.ellipse(ss.end2.x, ss.end2.y, 30, 30);
			pjs.fill(0);
			ss.show();

			/*
			gripA.mvTo(pjs.mouseX, pjs.mouseY);
			ballA.mvTo(pjs.mouseX, pjs.mouseY);
			pjs.ellipse(kdA.grip.x, kdA.grip.y, 10, 10);
			pjs.ellipse(kdA.ball.x, kdA.ball.y, 5, 5);

			gripB.mvTo(pjs.mouseX, pjs.mouseY);
			ballB.mvTo(pjs.mouseX, pjs.mouseY);
			pjs.ellipse(kdB.grip.x, kdB.grip.y, 10, 10);
			pjs.ellipse(kdB.ball.x, kdB.ball.y, 5, 5);
			*/

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
		};

		pjs.mousePressed = function(){
			ss.grb(pjs.mouseX, pjs.mouseY);
			/*
			gripA.grb(pjs.mouseX, pjs.mouseY);
			ballA.grb(pjs.mouseX, pjs.mouseY);
			gripB.grb(pjs.mouseX, pjs.mouseY);
			ballB.grb(pjs.mouseX, pjs.mouseY);
			*/

			cube.grb(pjs.mouseX, pjs.mouseY);
		};

		pjs.mouseReleased = function(){
			ss.rls();
			/*
			gripA.rls();
			ballA.rls();
			gripB.rls();
			ballB.rls();
			*/
			cube.rls();
		};

		pjs.setup();
	};

	return app;
});