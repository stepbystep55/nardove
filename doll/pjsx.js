define(['underscore','utl','pjs'], function(_, utl,pjs){
	'use strict';

	// when you grab this vector, you can move this anywhere you want.
	var gvector = {

		init: function(x, y, options){
			// construct as local variables
			name: 'anonymous'
			this.x = x;
			this.y = y;
			this.prevX = x; // x of the previous position after moving
			this.prevY = y; // y of the previous position after moving
			this.rad4grab = (options) ? options.rad4grab : 10; // radious where you can grab this
			this.grab = false; // grabed or not
			this.callbacks = [];

			return this;
		}
		, _init: function(p, options){
			return this.init(p.x, p.y, options);
		}

		// grab this
		, grb: function(x, y){
			if(utl.tri.dist(this, {x: x, y: y}) < this.rad4grab){
				this.grbd = true;
			}
			return this;
		}
		, _grb: function(p){
			return this.grb(p.x, p.y);
		}

		// release this
		, rls: function(){
			this.grbd = false;
			return this;
		}

		, pushCallbacks: function(methodName, obj){
			this.callbacks.push({methodName: methodName, obj: obj});
			return this;
		}

		// move specified points
		, mv: function(x, y, options){
			// options:
			//   forced - true if not mind grabed or not
			//   nocallback - true if no callback
			if(!options) options = {};

			if(!this.grbd && !options.forced) return;

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
			return this.mv(p.x, p.y, options);
		}

		// move to the specified location 
		, mvTo: function(x, y, options){
			return this.mv((x - this.x), (y - this.y), options);
		}
		, _mvTo: function(p, options){
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

		// get the difference between this and another
		, diff: function(p){
			return {x: this.x - p.x, y: this.y - p.y};
		}
		, diffInPrev: function(p){
			return {x: this.prevX - p.x, y: this.prevY - p.y};
		}
		// get the sum of this and another
		, sum: function(p){
			return {x: this.x + p.x, y: this.y + p.y};
		}

		, show: function(){
			pjs.textSize(8);
			pjs.text('' + Math.round(this.x) + ',' + Math.round(this.y), this.x, this.y);
		}
	};

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
					this.end1.diffInPrev(this.fulcrum) , this.end1.diff(this.fulcrum));
				// calculate moved vector
				var mvd = utl.tri.mv(this.end2.diff(this.fulcrum), angle);

				this.end2._mvTo(this.fulcrum.sum(mvd), {forced: true, nocallback: true});
			}
			if(caller === this.end2){
				// calculate moved angle
				var angle = utl.tri.ang(
					this.end2.diffInPrev(this.fulcrum) , this.end2.diff(this.fulcrum));
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
		, show: function(){
			this.fulcrum.show();
			this.end1.show();
			this.end2.show();
		}
	};

	// A pair of points that one's movement affect another but another can move freely.
	var yoyo = {
		init: function(afc, aax){
			this.fulcrum = afc; // must be gvector
			this.axel = aax; // must be gvector
			this.fulcrum.pushCallbacks('upd', this);
		}

		, grb: function(ax, ay){
			this.fulcrum.grb(ax, ay);
			this.axel.grb(ax, ay);
		}
		, rls: function(ax, ay){
			this.fulcrum.rls();
			this.axel.rls();
		}

		, upd: function(caller){
			this.axel._mv(this.fulcrum.trk(), {forced: true, nocallback: true});
		}
		, mvTo: function(ax, ay){
			this.fulcrum.mvTo(ax, ay);
			this.axel.mvTo(ax, ay);
		}
	};

	var cube = {
		init: function(e1, e2, srfs){
			this.end1 = e1;
			this.end2 = e2;
			this.surfaces = [];
			for(var i = 0; i < srfs.length; i++){
				var ss_e1 = factory.newGvector(srfs[i].x - 30, srfs[i].y);
				var ss_e2 = factory.newGvector(srfs[i].x + 30, srfs[i].y);
				var ss = factory.newSeesaw(srfs[i], ss_e1, ss_e2);
				this.surfaces.push(ss);
			}
		}

		, grb: function(ax, ay){
			this.end1.grb(ax, ay);
			this.end2.grb(ax, ay);
			for(var i = 0; i < this.surfaces.length; i++) this.surfaces[i].grb(ax, ay);
		}
		, rls: function(){
			this.end1.rls();
			this.end2.rls();
			for(var i = 0; i < this.surfaces.length; i++) this.surfaces[i].rls();
		}
		, mvTo: function(ax, ay){
			this.end1.mvTo(ax, ay);
			this.end2.mvTo(ax, ay);
			for(var i = 0; i < this.surfaces.length; i++) this.surfaces[i].mvTo(ax, ay);
		}
	};

	// a bar and a ball.
	var pong = {
		init: function(aBarEnd1, aBarEnd2, aBalls){
			this.barEnd1 = aBarEnd1;
			this.barEnd2 = aBarEnd2;
			this.barCenter = this.calcBarCenter();
			this.ballAndShadowList = []; this.addBall(aBalls);

			this.barEnd1.pushCallbacks('upd', this);
			this.barEnd2.pushCallbacks('upd', this);
		}
		, calcBarCenter: function(){
			return utl.tri.mid(this.barEnd1, this.barEnd2);
		}
		, calcBallShadow: function(aBall){
			return utl.tri.prj(this.barEnd1, this.barEnd2, aBall);
		}
		, updShadow: function(caller){
			for(var i = 0; i < this.ballAndShadowList.length; i++){
				if(this.ballAndShadowList[i].ball === caller){
					var shadow = this.calcBallShadow(this.ballAndShadowList[i].ball);
					this.ballAndShadowList[i].shadow._mvTo(shadow, {forced: true, nocallback: true});
				}
			}
		}
		, addBall: function(aBalls){
			if(!_.isArray(aBalls)) aBalls = [aBalls];
			for(var i = 0; i < aBalls.length; i++){
				var shadow = this.calcBallShadow(aBalls[i]);
				console.log(shadow.x + ': '+ shadow.y);
				this.ballAndShadowList.push({
					ball: aBalls[i]
					, shadow: factory.newGvector(shadow.x, shadow.y, {rad4grab: 0})
				});
				aBalls[i].pushCallbacks('updShadow', this);
			}
		}
		, upd: function(caller){
			var preBarCenter = this.barCenter;
			var preDistEnd1ToCenter = utl.tri.dist(this.barEnd1.prev(), preBarCenter);

			this.barCenter = this.calcBarCenter();
			var distEnd1ToCenter = utl.tri.dist(this.barEnd1, this.barCenter);

			var ratioMvd = distEnd1ToCenter / preDistEnd1ToCenter;

			for(var i = 0; i < this.ballAndShadowList.length; i++){

				var preShadow = this.ballAndShadowList[i].shadow;
				var preDistCenterToShadow = utl.tri.dist(preShadow, preBarCenter);
				var distCenterToShadow = preDistCenterToShadow * ratioMvd;

				var vCenterToEnd1Normalized = utl.tri.sub(this.barEnd1, this.barCenter, true);

				var vCenterToShadow = {
					x: vCenterToEnd1Normalized.x * distCenterToShadow
					, y : vCenterToEnd1Normalized.y * distCenterToShadow};

				this.ballAndShadowList[i].shadow.mvTo(
					this.barCenter.x + vCenterToShadow.x
					, this.barCenter.y + vCenterToShadow.y
					, {forced: true, nocallback: true});

				var ball = this.ballAndShadowList[i].ball;
				var shadowToBall = {
					x: ball.x - this.ballAndShadowList[i].shadow.prev().x
					, y: ball.y - this.ballAndShadowList[i].shadow.prev().y
				};
				var shadow = this.ballAndShadowList[i].shadow;
				ball._mvTo(utl.tri.add(shadow, shadowToBall), {forced: true, nocallback: true});
			}
		}

		, grb: function(ax, ay){
			this.barEnd1.grb(ax, ay);
			this.barEnd2.grb(ax, ay);
			for(var i = 0; i < this.ballAndShadowList.length; i++) this.ballAndShadowList[i].ball.grb(ax, ay);
		}
		, rls: function(ax, ay){
			this.barEnd1.rls();
			this.barEnd2.rls();
			for(var i = 0; i < this.ballAndShadowList.length; i++) this.ballAndShadowList[i].ball.rls();
		}
		, mvTo: function(ax, ay){
			this.barEnd1.mvTo(ax, ay);
			this.barEnd2.mvTo(ax, ay);
			for(var i = 0; i < this.ballAndShadowList.length; i++) this.ballAndShadowList[i].ball.mvTo(ax, ay);
		}
	};

	var factory = {
		newGvector: function(x, y){
			var clone = Object.create(gvector);
			clone.init(x, y);
			return clone;
		}
		, newYoyo: function(fc, ax){
			if(_.isUndefined(fc) || _.isUndefined(ax)) throw 'need 2 args.';
			var clone = Object.create(yoyo);
			clone.init(fc, ax);
			return clone;
		}
		, newSeesaw: function(fc, e1, e2){
			if(_.isUndefined(fc) || _.isUndefined(e1) || _.isUndefined(e2)) throw 'need 3 args.';
			var clone = Object.create(seesaw);
			clone.init(fc, e1, e2);
			return clone;
		}
		, newCube: function(e1, e2, srfs){
			var clone = Object.create(cube);
			clone.init(e1, e2, srfs);
			return clone;
		}
		, newPong: function(e1, e2, bl){
			var clone = Object.create(pong);
			clone.init(e1, e2, bl);
			return clone;
		}
	};

	return {
		fac: factory
	};
});
