define(['underscore','utl'], function(_, utl){
	'use strict';

	// movable vector. you can move this vector anywhere you want.
	var mctr = {
		name: 'mctr'
		, init: function(x, y, options){
			// construct as local variables
			name: 'anonymous'
			this.x = x;
			this.y = y;
			this.prevX = x; // x of the previous position after moving
			this.prevY = y; // y of the previous position after moving
			this.callbacks = [];

			return this;
		}
		, _init: function(p, options){
			if(!_.isObject(p)) throw 'arg not object';
			return this.init(p.x, p.y, options);
		}

		, pushCallbacks: function(methodName, obj){
			this.callbacks.push({methodName: methodName, obj: obj});
			return this;
		}

		// move specified points
		, mv: function(x, y, options){
			if(!_.isNumber(x) || !_.isNumber(y)) throw 'arg not number';
			// options:
			//   forced - true if not mind grabed or not
			//   nocallback - true if no callback
			if(!options) options = {};

			//if(!grbd && !options.forced) return;

			this.prevX = this.x; this.prevY = this.y;
			this.x += x; this.y += y;

			if(!options.nocallback){
				for(var i = 0; i < this.callbacks.length; i++){
					var callback = this.callbacks[i];
					callback.obj[callback.methodName].call(callback.obj, this);
				}
			}
			return this;
		}
		, _mv: function(p, options){
			if(!_.isObject(p)) throw 'arg not object';
			return this.mv(p.x, p.y, options);
		}

		// move to the specified location 
		, mvTo: function(x, y, options){
			if(!_.isNumber(x) || !_.isNumber(y)) throw 'arg not number';
			return this.mv((x - this.x), (y - this.y), options);
		}
		, _mvTo: function(p, options){
			if(!_.isObject(p)) throw 'arg not object';
			return this.mvTo(p.x, p.y, options);
		}

		// get the track of moving
		, trk: function(){
			return {x: this.x - this.prevX, y: this.y - this.prevY};
		}

		// get the previous location
		, prev: function(){
			return {x: this.prevX, y: this.prevY};
		}

		// get the difference (as vector) between this and another
		, diff: function(p){
			return {x: this.x - p.x, y: this.y - p.y};
		}
		, diffPrev: function(p){
			return {x: this.prevX - p.x, y: this.prevY - p.y};
		}
		// get the sum (as vector) of this and another
		, sum: function(p){
			return {x: this.x + p.x, y: this.y + p.y};
		}

		, dump: function(){
			return 'x='+this.x+', y='+this.y+', prevX='+this.prevX+', prevY='+this.prevY;
		}
	};

	// when you grab this vector, you can move this anywhere you want.
	var gctr = Object.create(mctr, {
		name: {
			value: 'gctr'
		}
		, init: {
			value: function(x, y, options){
				mctr.init.call(this, x, y, options);
				// construct as local variables
				this.rad4grab = (options) ? options.rad4grab : 10; // radious where you can grab this
				this.grab = false; // grabed or not

				return this;
			}
		}
			// grab this
		, grb: {
			value: function(x, y){
				if(!_.isNumber(x) || !_.isNumber(y)) throw 'arg not number';
				if(utl.tri.dist(this, {x: x, y: y}) < this.rad4grab) this.grbd = true;
				return this;
			}
		}
		, _grb: {
			value: function(p){
				if(!_.isObject(p)) throw 'arg not object';
				return this.grb(p.x, p.y);
			}
		}
		// release this
		, rls: {
			value: function(){
				this.grbd = false;
				return this;
			}
		}
		, mv: {
			value: function(x, y, options){
				if(!options) options = {};
				if(!this.grbd && !options.forced) return;
				return mctr.mv.call(this, x, y, options);
			}
		}
	});

	// a point with two end points which can move around fulcrum.
	var seesaw = {
		init: function(afulcrum, aend1, aend2){
			this.fulcrum = afulcrum; // must be gvector
			this.end1 = aend1; // must be gvector
			this.end2 = aend2; // must be gvector
			this.fulcrum.pushCallbacks('upd', this);
			this.end1.pushCallbacks('upd', this);
			this.end2.pushCallbacks('upd', this);
		}

		, grb: function(ax, ay){
			this.fulcrum.grb(ax, ay);
			this.end1.grb(ax, ay);
			this.end2.grb(ax, ay);
		}
		, rls: function(){
			this.fulcrum.rls();
			this.end1.rls();
			this.end2.rls();
		}

		, upd: function(caller){
			if(caller === this.fulcrum) {
				this.end1._mv(this.fulcrum.trk(), {forced: true, nocallback: true});
				this.end2._mv(this.fulcrum.trk(), {forced: true, nocallback: true});
			}
			if(caller === this.end1){
				// calculate moved angle
				var angle = utl.tri.ang(
					this.end1.diffPrev(this.fulcrum) , this.end1.diff(this.fulcrum));
				// calculate moved vector
				var mvd = utl.tri.mv(this.end2.diff(this.fulcrum), angle);

				this.end2._mvTo(this.fulcrum.sum(mvd), {forced: true, nocallback: true});
			}
			if(caller === this.end2){
				// calculate moved angle
				var angle = utl.tri.ang(
					this.end2.diffPrev(this.fulcrum) , this.end2.diff(this.fulcrum));
				// calculate moved vector
				var mvd = utl.tri.mv(this.end1.diff(this.fulcrum), angle);

				this.end1._mvTo(this.fulcrum.sum(mvd) , {forced: true, nocallback: true});
			}
		}
		, mvTo: function(ax, ay){
			this.fulcrum.mvTo(ax, ay);
			this.end1.mvTo(ax, ay);
			this.end2.mvTo(ax, ay);
		}
	};

	// A pair of points that one's movement affect another but another can move freely.
	var yoyo = {
		init: function(afc, aaxls){
			this.fulcrum = afc; // must be gvector
			this.axls = []; this.addAxls(aaxls); // must be gvector
			this.fulcrum.pushCallbacks('upd', this);
		}
		, addAxls: function(aaxls){
			if(!_.isArray(aaxls)) aaxls = [aaxls];
			for(var i = 0; i < aaxls.length; i++) this.axls.push(aaxls[i]);
		}

		, grb: function(ax, ay){
			this.fulcrum.grb(ax, ay);
			for(var i = 0; i < this.axls.length; i++) this.axls[i].grb(ax, ay);
		}
		, rls: function(){
			this.fulcrum.rls();
			for(var i = 0; i < this.axls.length; i++) this.axls[i].rls();
		}

		, upd: function(caller){
			for(var i = 0; i < this.axls.length; i++){
				this.axls[i]._mv(this.fulcrum.trk(), {forced: true, nocallback: true});
			}
		}
		, mvTo: function(ax, ay){
			this.fulcrum.mvTo(ax, ay);
			for(var i = 0; i < this.axls.length; i++) this.axls[i].mvTo(ax, ay);
		}
	};

	// a bar and balls.
	var pong = {
		init: function(aBarEnd1, aBarEnd2, aBalls){
			this.barEnd1 = aBarEnd1;
			this.barEnd2 = aBarEnd2;
			this.barCenter = factory.newMctr(0, 0); // at the start, init by 0
			this.updBarCenter();
			this.balls = []; this.addBalls(aBalls);

			this.barEnd1.pushCallbacks('upd', this);
			this.barEnd2.pushCallbacks('upd', this);

			return this;
		}
		, updBarCenter: function(){
			var center = utl.tri.mid(this.barEnd1, this.barEnd2);
			this.barCenter._mvTo(center, {forced: true});
			return this;
		}
		, addBalls: function(aBalls){
			if(_.isUndefined(aBalls)) return this;
			if(!_.isArray(aBalls)) aBalls = [aBalls];
			var thisPong = this;

			for(var i = 0; i < aBalls.length; i++){
				var ball = aBalls[i];
				ball = this.enhanceBall(ball);
				this.balls.push(ball);
			}
			return this;
		}
		, enhanceBall: function(aBall){
			var thisPong = this;
			aBall.shadow = factory.newMctr(0, 0); // at the start, init by 0
			aBall.updShadow = function(){
				var shadow = utl.tri.prj(thisPong.barEnd1, thisPong.barEnd2, aBall);
				aBall.shadow._mvTo(shadow, {forced:true, nocallback:true});
				return aBall;
			}
			aBall.distToShadow = function(){
				return utl.tri.dist(aBall.shadow, aBall);
			}
			aBall.updShadow();
			aBall.pushCallbacks('updShadow', aBall);
			return aBall;
		}
		, ratioBarLengthVaried: function(){
			var distEnd1ToEnd2Prev = utl.tri.dist(this.barEnd2.prev(), this.barEnd1.prev());
			var distEnd1ToEnd2 = utl.tri.dist(this.barEnd2, this.barEnd1);
			return distEnd1ToEnd2 / distEnd1ToEnd2Prev;
		}
		, upd: function(caller){
			this.updBarCenter();

			for(var i = 0; i < this.balls.length; i++){
				var ball = this.balls[i];

				var distBallToShadow = utl.tri.dist(ball.shadow, ball);

				// at first, put the shadow on the bar
				ball.updShadow();
				// adjust the shadow position relative to the bar length
				var preDistCenterToShadow = utl.tri.dist(ball.shadow.prev(), this.barCenter.prev());
				var distCenterToShadow = preDistCenterToShadow * this.ratioBarLengthVaried();
				var vCenterToShadowNormalized = utl.tri.sub(ball.shadow, this.barCenter, true);
				var vCenterToShadow = utl.tri.mult(vCenterToShadowNormalized, distCenterToShadow);
				ball.shadow.mvTo(
					this.barCenter.x + vCenterToShadow.x
					, this.barCenter.y + vCenterToShadow.y
					, {forced: true, nocallback: true});

				// then, adjust the ball position
				if(caller === this.barEnd1){
					var fixed = this.barEnd2; var moved = this.barEnd1;
				}else if(caller === this.barEnd2){
					var fixed = this.barEnd1; var moved = this.barEnd2;
				}
				var vFixedToMovedPrev = utl.tri.sub(moved.prev(), fixed);
				var vFixedToMoved = utl.tri.sub(moved.prev(), fixed);
				var mvdAngle = utl.tri.ang(vFixedToMovedPrev, vFixedToMoved);
				var vShadowToBallNormalized = utl.tri.sub(ball, ball.shadow.prev(), true);
				var vShadowToBall = utl.tri.mult(vShadowToBallNormalized, distBallToShadow);
				var vShadowToBallMvd = utl.tri.mv(vShadowToBall, mvdAngle);
				ball._mvTo(ball.shadow.sum(vShadowToBallMvd), {forced:true, nocallback:true});
			}
		}

		, grb: function(ax, ay){
			this.barEnd1.grb(ax, ay);
			this.barEnd2.grb(ax, ay);
			for(var i = 0; i < this.balls.length; i++) this.balls[i].grb(ax, ay);
		}
		, rls: function(ax, ay){
			this.barEnd1.rls();
			this.barEnd2.rls();
			for(var i = 0; i < this.balls.length; i++) this.balls[i].rls();
		}
		, mvTo: function(ax, ay){
			this.barEnd1.mvTo(ax, ay);
			this.barEnd2.mvTo(ax, ay);
			for(var i = 0; i < this.balls.length; i++) this.balls[i].mvTo(ax, ay);
		}
	};

	var factory = {
		newMctr: function(x, y){
			if(!_.isNumber(x) || !_.isNumber(y)) throw 'mctr must be constructed with numbers.';
			var clone = Object.create(mctr);
			clone.init(x, y);
			return clone;
		}
		, newGctr: function(x, y){
			if(!_.isNumber(x) || !_.isNumber(y)) throw 'gctr must be constructed with numbers.';
			var clone = Object.create(gctr);
			clone.init(x, y);
			return clone;
		}
		, newYoyo: function(fc, axls){
			if(!_.isObject(fc) || !_.isObject(axls)) throw 'yoyo must be constructed with objects.';
			if(fc.name !== 'gctr' || axls.name !== 'gctr') throw 'yoyo must be constructed with gctrs.';
			var clone = Object.create(yoyo);
			clone.init(fc, axls);
			return clone;
		}
		, newSsw: function(fc, e1, e2){
			if(!_.isObject(fc) || !_.isObject(e1) || !_.isObject(e2)) throw 'ssw must be constructed with objects.';
			if(fc.name !== 'gctr' || e1.name !== 'gctr' || e2.name !== 'gctr') throw 'ssw must be constructed with gctrs.';
			var clone = Object.create(seesaw);
			clone.init(fc, e1, e2);
			return clone;
		}
		, newPong: function(e1, e2, bls){
			if(!_.isObject(e1) || !_.isObject(e2)) throw 'pong must be constructed with objects.';
			if(e1.name !== 'gctr' || e2.name !== 'gctr') throw 'pong must be constructed with gctrs.';
			if(bls){
				if(_.isArray(bls)){
					for(var i = 0; i < bls.length; i++){
						if(!_.isObject(bls[i])) throw 'pong must be constructed with objects.';
					}
				}else{
					if(!_.isObject(bls)) throw 'pong must be constructed with objects.';
				}
			}
			var clone = Object.create(pong);
			clone.init(e1, e2, bls);
			return clone;
		}
	};

	return {
		fac: factory
	};
});
