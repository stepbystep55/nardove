define(['utl','pjs'], function(utl,pjs){
	'use strict';

	var GVector = function(){
		pjs.PVector.apply(this, arguments);

		var gv = this;

		gv.prvX = arguments[0] || 0;
		gv.prvY = arguments[1] || 0;
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
		gv.upd = function(x, y){
			if(gv.grbd){
				gv.prvX = gv.x; gv.prvY = gv.y;
				gv.x += x; gv.y += y;
				return true;
			}
			return false;
		};
		gv.mvTo = function(x, y){
			return gv.upd((x - gv.x), (y - gv.y));
		};
	};
	GVector.prototype = Object.create(pjs.PVector.prototype);
	GVector.prototype.constructor = GVector;


	return {
		GVector: GVector
	};
});
