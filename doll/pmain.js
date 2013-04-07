define(['pcnvs', 'utl'], function(Pcnvs, Utl){
	'use strict';

	var Proc = function(){

		this.init = function(){
			Pcnvs.pjs.setup = function(){
				Pcnvs.pjs.size(500, 500);
				Pcnvs.pjs.frameRate(10);
				Pcnvs.pjs.background(100);
				Pcnvs.pjs.stroke(255);
				Pcnvs.pjs.ellipse(50, 50, 25, 25);
				var gctr = new Utl.Gctr(100, 100);
				console.log('gx='+gctr.x);
				gctr.normalize();
				console.log('gx='+gctr.x);
				gctr.hoge();
				var ag = Utl.Trg.ang(100, 100, 200, 100);
				console.log(ag);
			};
			Pcnvs.pjs.draw = function(){
			};
			Pcnvs.pjs.setup();
		};
	};
	return {
		Proc: new Proc()
	};
});
