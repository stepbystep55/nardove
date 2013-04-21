define(['pvs', 'utl'], function(Pvs, Utl){
	'use strict';

	var Proc = function(){

		this.init = function(){
			var gctr = new Utl.Gctr(150,150);
			Pvs.pjs.setup = function(){
				Pvs.pjs.size(500, 500);
				Pvs.pjs.frameRate(10);
				console.log(gctr.prvX);
			};
			Pvs.pjs.draw = function(){
				Pvs.pjs.background(200);
				gctr.upd();
				gctr.shw();
			};
			Pvs.pjs.mousePressed = function(){
				gctr.grb();
			};
			Pvs.pjs.mouseReleased = function(){
				gctr.rls();
			};
			Pvs.pjs.setup();
		};
	};
	return {
		Proc: new Proc()
	};
});
