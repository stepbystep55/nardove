define(['underscore','utl','pjs'], function(_, utl,pjs){
	'use strict';

	// if you grab this vector, you can move this to where you want.
	var GVector = function(){
		pjs.PVector.apply(this, arguments);

		var gv = this;

		this.preX = arguments[0] || 0;
		this.preY = arguments[1] || 0;
		this.rd = 10; // radious where you can grab this
		this.grbd = false; // grabed or not

		this.grb = function(x, y){
			if(utl.tri.dist(gv.x, gv.y, x, y) < gv.rd){
				gv.grbd = true;
			}
		};
		this.rls = function(){
			gv.grbd = false;
		};

		this.callbacks = [];
		this.putCallbacks = function(methodName, obj){
			gv.callbacks.push({methodName: methodName, obj: obj});
		};
		this.mv = function(x, y, options){
			if(!options) options = {};
			if(gv.grbd || options.forced){
				gv.preX = gv.x; gv.preY = gv.y;
				gv.x += x; gv.y += y;

				if(!options.nocallback){
					for(var i = 0; i < gv.callbacks.length; i++){
						var callback = gv.callbacks[i];
						callback.obj[callback.methodName].call(callback.obj, gv);
					}
				}
			}
		};
		this.mvTo = function(x, y, options){
			return gv.mv((x - gv.x), (y - gv.y), options);
		};
	};
	GVector.prototype = Object.create(pjs.PVector.prototype);
	GVector.prototype.constructor = GVector;

	var Seesaw = function(f, e1, e2){

		if(_.isUndefined(f) || _.isUndefined(e1) || _.isUndefined(e2)) throw 'need three args';

		var ss = this;

		this.fulcrum = f; this.fulcrum.putCallbacks('upd', this);
		this.end1 = e1; this.end1.putCallbacks('upd', this);
		this.end2 = e2; this.end2.putCallbacks('upd', this);

		this.grb = function(x, y){
			ss.fulcrum.grb(x, y);
			ss.end1.grb(x, y);
			ss.end2.grb(x, y);
		};
		this.rls = function(){
			ss.fulcrum.rls();
			ss.end1.rls();
			ss.end2.rls();
		};
		this.mvTo = function(x, y){
			ss.fulcrum.mvTo(x, y);
			ss.end1.mvTo(x, y);
			ss.end2.mvTo(x, y);
		};
		//*
		this.upd = function(caller){
			if(caller === ss.fulcrum) {
				ss.end1.mv(
					(ss.fulcrum.x - ss.fulcrum.preX), (ss.fulcrum.y - ss.fulcrum.preY)
					, {forced: true, nocallback: true});
				ss.end2.mv(
					(ss.fulcrum.x - ss.fulcrum.preX), (ss.fulcrum.y - ss.fulcrum.preY)
					, {forced: true, nocallback: true});
			}
			if(caller === ss.end1) {
				// calculate moved angle
				var mvdAngle = utl.tri.ang(
					(ss.end1.preX - ss.fulcrum.x), (ss.end1.preY - ss.fulcrum.y)
					, (ss.end1.x - ss.fulcrum.x), (ss.end1.y - ss.fulcrum.y)
				);
				// calculate moved vector
				var mvdVector = utl.tri.mv((ss.end2.x - ss.fulcrum.x), (ss.end2.y - ss.fulcrum.y), mvdAngle);

				ss.end2.mvTo(
					ss.fulcrum.x + mvdVector[0], ss.fulcrum.y + mvdVector[1]
					, {forced: true, nocallback: true});
			}
			if(caller === ss.end2) {
				// calculate moved angle
				var mvdAngle = utl.tri.ang(
					(ss.end2.preX - ss.fulcrum.x), (ss.end2.preY - ss.fulcrum.y)
					, (ss.end2.x - ss.fulcrum.x), (ss.end2.y - ss.fulcrum.y)
				);
				// calculate moved vector
				var mvdVector = utl.tri.mv((ss.end1.x - ss.fulcrum.x), (ss.end1.y - ss.fulcrum.y), mvdAngle);

				ss.end1.mvTo(
					ss.fulcrum.x + mvdVector[0], ss.fulcrum.y + mvdVector[1]
					, {forced: true, nocallback: true});
			}
		};
		//*/
	};

	return {
		GVector: GVector
		, Seesaw: Seesaw
	};
});
