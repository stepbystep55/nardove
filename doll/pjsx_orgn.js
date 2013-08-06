define(['underscore','utl','pjs'], function(_, utl,pjs){
	'use strict';

	// if you grab this vector, you can move this to where you want.
	var GVector = function(){
		pjs.PVector.apply(this, arguments);

		this.preX = arguments[0] || 0;
		this.preY = arguments[1] || 0;
		this.rd = 10; // radious where you can grab this
		this.grbd = false; // grabed or not

		this.grb = function(x, y){
			if(utl.tri.dist(this.x, this.y, x, y) < this.rd){
				this.grbd = true;
			}
		};
		this.rls = function(){
			this.grbd = false;
		};

		this.callbacks = [];
		this.putCallbacks = function(methodName, obj){
			this.callbacks.push({methodName: methodName, obj: obj});
		};
		// options:
		//   forced - true if not mind grabed or not
		//   nocallback - true if no callback
		this.mv = function(x, y, options){
			if(!options) options = {};
			if(this.grbd || options.forced){
				this.preX = this.x; this.preY = this.y;
				this.x += x; this.y += y;

				if(!options.nocallback){
					for(var i = 0; i < this.callbacks.length; i++){
						var callback = this.callbacks[i];
						callback.obj[callback.methodName].call(callback.obj, this);
					}
				}
			}
		};
		this.mvTo = function(x, y, options){
			return this.mv((x - this.x), (y - this.y), options);
		};
	};
	GVector.prototype = Object.create(pjs.PVector.prototype);
	GVector.prototype.constructor = GVector;

	// a point with two end points which can move around fulcrum.
	var Seesaw = function(flc, e1, e2){

		if(_.isUndefined(flc) || _.isUndefined(e1) || _.isUndefined(e2)) throw 'need three args.';

		this.fulcrum = flc; this.fulcrum.putCallbacks('upd', this);
		this.end1 = e1; this.end1.putCallbacks('upd', this);
		this.end2 = e2; this.end2.putCallbacks('upd', this);

		this.upd = function(caller){
			if(caller === this.fulcrum) {
				this.end1.mv(
					(this.fulcrum.x - this.fulcrum.preX), (this.fulcrum.y - this.fulcrum.preY)
					, {forced: true, nocallback: true});
				this.end2.mv(
					(this.fulcrum.x - this.fulcrum.preX), (this.fulcrum.y - this.fulcrum.preY)
					, {forced: true, nocallback: true});
			}
			if(caller === this.end1){
				// calculate moved angle
				var angle = utl.tri.ang(
					(this.end1.preX - this.fulcrum.x), (this.end1.preY - this.fulcrum.y)
					, (this.end1.x - this.fulcrum.x), (this.end1.y - this.fulcrum.y)
				);
				// calculate moved vector
				var mvd = utl.tri.mv((this.end2.x - this.fulcrum.x), (this.end2.y - this.fulcrum.y), angle);

				this.end2.mvTo(
					this.fulcrum.x + mvd.x, this.fulcrum.y + mvd.y
					, {forced: true, nocallback: true});
			}
			if(caller === this.end2){
				// calculate moved angle
				var angle = utl.tri.ang(
					(this.end2.preX - this.fulcrum.x), (this.end2.preY - this.fulcrum.y)
					, (this.end2.x - this.fulcrum.x), (this.end2.y - this.fulcrum.y)
				);
				// calculate moved vector
				var mvd = utl.tri.mv((this.end1.x - this.fulcrum.x), (this.end1.y - this.fulcrum.y), angle);

				this.end1.mvTo(
					this.fulcrum.x + mvd.x, this.fulcrum.y + mvd.y
					, {forced: true, nocallback: true});
			}
		};
	};

	// A pair of points that one's movement affect another but another can move freely.
	var Kendama = function(gp, bl){
		if(_.isUndefined(gp) || _.isUndefined(bl)) throw 'need two args.';

		this.grip = gp; this.grip.putCallbacks('upd', this);
		this.ball = bl;

		this.upd = function(caller){
			this.ball.mv(
				(this.grip.x - this.grip.preX), (this.grip.y - this.grip.preY)
				, {forced: true, nocallback: true});
		};
	};

	return {
		GVector: GVector
		, Seesaw: Seesaw
		, Kendama: Kendama
	};
});
