define(['underscore','utl','pjs'], function(_, utl,pjs){
	'use strict';

	// if you grab this vector, you can move this to where you want.
	var GVector = function(){
		pjs.PVector.apply(this, arguments);

		var self = this;

		this.preX = arguments[0] || 0;
		this.preY = arguments[1] || 0;
		this.rd = 10; // radious where you can grab this
		this.grbd = false; // grabed or not

		this.grb = function(x, y){
			if(utl.tri.dist(self.x, self.y, x, y) < self.rd){
				self.grbd = true;
			}
		};
		this.rls = function(){
			self.grbd = false;
		};

		this.callbacks = [];
		this.putCallbacks = function(methodName, obj){
			self.callbacks.push({methodName: methodName, obj: obj});
		};
		this.mv = function(x, y, options){
			if(!options) options = {};
			if(self.grbd || options.forced){
				self.preX = self.x; self.preY = self.y;
				self.x += x; self.y += y;

				if(!options.nocallback){
					for(var i = 0; i < self.callbacks.length; i++){
						var callback = self.callbacks[i];
						callback.obj[callback.methodName].call(callback.obj, self);
					}
				}
			}
		};
		this.mvTo = function(x, y, options){
			return self.mv((x - self.x), (y - self.y), options);
		};
	};
	GVector.prototype = Object.create(pjs.PVector.prototype);
	GVector.prototype.constructor = GVector;

	// a point with two end points which can move around fulcrum.
	var Seesaw = function(flc, e1, e2){

		if(_.isUndefined(flc) || _.isUndefined(e1) || _.isUndefined(e2)) throw 'need three args.';

		var self = this;

		this.fulcrum = flc; this.fulcrum.putCallbacks('upd', this);
		this.end1 = e1; this.end1.putCallbacks('upd', this);
		this.end2 = e2; this.end2.putCallbacks('upd', this);

		this.upd = function(caller){
			if(caller === self.fulcrum) {
				self.end1.mv(
					(self.fulcrum.x - self.fulcrum.preX), (self.fulcrum.y - self.fulcrum.preY)
					, {forced: true, nocallback: true});
				self.end2.mv(
					(self.fulcrum.x - self.fulcrum.preX), (self.fulcrum.y - self.fulcrum.preY)
					, {forced: true, nocallback: true});
			}
			if(caller === self.end1) {
				// calculate moved angle
				var angle = utl.tri.ang(
					(self.end1.preX - self.fulcrum.x), (self.end1.preY - self.fulcrum.y)
					, (self.end1.x - self.fulcrum.x), (self.end1.y - self.fulcrum.y)
				);
				// calculate moved vector
				var mvd = utl.tri.mv((self.end2.x - self.fulcrum.x), (self.end2.y - self.fulcrum.y), angle);

				self.end2.mvTo(
					self.fulcrum.x + mvd.x, self.fulcrum.y + mvd.y
					, {forced: true, nocallback: true});
			}
			if(caller === self.end2) {
				// calculate moved angle
				var angle = utl.tri.ang(
					(self.end2.preX - self.fulcrum.x), (self.end2.preY - self.fulcrum.y)
					, (self.end2.x - self.fulcrum.x), (self.end2.y - self.fulcrum.y)
				);
				// calculate moved vector
				var mvd = utl.tri.mv((self.end1.x - self.fulcrum.x), (self.end1.y - self.fulcrum.y), angle);

				self.end1.mvTo(
					self.fulcrum.x + mvd.x, self.fulcrum.y + mvd.y
					, {forced: true, nocallback: true});
			}
		};
	};

	var BallBat = function(bl, gp, hd){
		if(_.isUndefined(bl) || _.isUndefined(gp) || _.isUndefined(hd)) throw 'need three args.';

		var self = this;

		this.ball = bl; this.ball.putCallbacks('upd', this);
		this.grip = gp; this.grip.putCallbacks('upd', this);
		this.head = hd; this.head.putCallbacks('upd', this);

		this.ballOnBat = null;

		this.prjBallOnBat = function(){
			var angle = utl.tri.ang(
				(self.ball.preX - self.grip.x), (self.ball.preY - self.grip.y)
				, (self.head.x - self.grip.x), (self.head.y - self.grip.y)
			);
			var dist = self.ball.dist(self.grip) * Math.cos(angle);
			var fromGrip =  utl.tri.sub(
					self.head.x, self.head.y
					, self.grip.x, self.grip.y
					, true
				);
			console.log(fromGrip.x + ', ' + fromGrip.y);
			self.ballOnBat = new GVector((self.grip.x + fromGrip.x) * dist, (self.grip.y + fromGrip.y) * dist);
		};
		this.prjBallOnBat();
		this.upd = function(caller){
			if(caller === ss.ball) {
			}
		};

	};

	return {
		GVector: GVector
		, Seesaw: Seesaw
		, BallBat: BallBat 
	};
});