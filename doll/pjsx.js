define(['underscore','utl','pjs'], function(_, utl,pjs){
	'use strict';

	// when you grab this vector, you can move this as you want.
	var gvector = {
		name: 'anonymous'
		, x: 0
		, y: 0
		, preX: 0 // x of the previous position when moved
		, preY: 0 // y of the previous position when moved
		, rd: 10 // radious where you can grab this
		, grbd: false // grabed or not

		, init: function(ax, ay){
			this.x = ax;
			this.y = ay;
			this.preX = ax;
			this.preY = ay;
		}
		, grb: function(ax, ay){
			if(utl.tri.dist(this.x, this.y, ax, ay) < this.rd){
				this.grbd = true;
			}
		}
		, rls: function(){
			this.grbd = false;
		}
		, callbacks: []
		, pushCallbacks: function(methodName, obj){
			// when you copy this object using Object.create(),
			// callbacks is also shared by copys. (callbacks is mutual)
			// so added owner as an identifier for each callback.
			this.callbacks.push({owner: this, methodName: methodName, obj: obj});
		}
		, mv: function(ax, ay, options){
			// options:
			//   forced - true if not mind grabed or not
			//   nocallback - true if no callback
			if(!options) options = {};

			if(!this.grbd && !options.forced) return;

			this.preX = this.x; this.preY = this.y;
			this.x += ax; this.y += ay;

			if(!options.nocallback){
				for(var i = 0; i < this.callbacks.length; i++){
					var callback = this.callbacks[i];
					if(callback.owner === this) callback.obj[callback.methodName].call(callback.obj, this);
				}
			}
		}
		, mvTo: function(ax, ay, options){
			this.mv((ax - this.x), (ay - this.y), options);
		}
	};
	var newGvector = function(ax, ay){
		var clone = Object.create(gvector);
		clone.init(ax, ay);
		return clone;
	};

	// a point with two end points which can move around fulcrum.
	var Seesaw = function(flc, e1, e2){

		if(_.isUndefined(flc) || _.isUndefined(e1) || _.isUndefined(e2)) throw 'need three args.';

		this.fulcrum = flc; this.fulcrum.pushCallbacks('upd', this);
		this.end1 = e1; this.end1.pushCallbacks('upd', this);
		this.end2 = e2; this.end2.pushCallbacks('upd', this);

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

		this.grip = gp; this.grip.pushCallbacks('upd', this);
		this.ball = bl;

		this.upd = function(caller){
			this.ball.mv(
				(this.grip.x - this.grip.preX), (this.grip.y - this.grip.preY)
				, {forced: true, nocallback: true});
		};
	};

	return {
		newGvector: newGvector
		, Seesaw: Seesaw
		, Kendama: Kendama
	};
});
