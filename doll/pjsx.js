define(['utl','pjs'], function(utl,pjs){
	'use strict';

	var GVector = function(){
		pjs.PVector.apply(this, arguments);
		var gv = this;

		gv.rd = 10;
		gv.grbd = false;

		gv.grb = function(x, y){
			if(utl.tri.dist(gv.x, gv.y, x, y) < gv.rd){
				gv.grbd = true;
			}
		};
		gv.rls = function(){
			gv.grbd = false;
		};
	};
	GVector.prototype = Object.create(pjs.PVector.prototype);
	GVector.prototype.constructor = GVector;


	return {
		GVector: GVector
	};
});
