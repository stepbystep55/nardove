define(['underscore','utl','pjs'], function(_, utl,pjs){
	'use strict';

	// when you grab this vector, you can move this anywhere you want.
	var gvector = {

		init: function(ax, ay, options){
			// construct as local variables
			name: 'anonymous'
			this.x = ax;
			this.y = ay;
			this.preX = ax; // x of the previous position when moved
			this.preY = ay; // y of the previous position when moved
			this.rad4grab = (options) ? options.rad4grab : 10; // radious where you can grab this
			this.grab = false; // grabed or not
			this.callbacks = [];
		}
		, grb: function(ax, ay){
			if(utl.tri.dist(this.x, this.y, ax, ay) < this.rad4grab){
				this.grbd = true;
			}
		}
		, rls: function(){
			this.grbd = false;
		}
		, pushCallbacks: function(methodName, obj){
			this.callbacks.push({methodName: methodName, obj: obj});
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
					callback.obj[callback.methodName].call(callback.obj, this);
				}
			}
		}
		, mvTo: function(ax, ay, options){
			this.mv((ax - this.x), (ay - this.y), options);
		}
		, vMvd: function(){
			return {x: this.x - this.preX, y: this.y - this.preY};
		}

		, show: function(){
			pjs.textSize(8);
			pjs.text("" + Math.round(this.x) + "," + Math.round(this.y), this.x, this.y);
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
			//console.log(ax + '=' + ay);
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
			this.axel.mv(
				(this.fulcrum.x - this.fulcrum.preX), (this.fulcrum.y - this.fulcrum.preY)
				, {forced: true, nocallback: true});
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
			return {
				x: this.barEnd1.x + (this.barEnd2.x - this.barEnd1.x) / 2
				,y: this.barEnd1.y + (this.barEnd2.y - this.barEnd1.y) / 2
			};
		}
		, calcBallShadow: function(aBall){
			return utl.tri.prj(
				this.barCenter.x
				, this.barCenter.y
				, this.barEnd1.x
				, this.barEnd1.y
				, aBall.x
				, aBall.y);
		}
		, updShadow: function(caller){
			for(var i = 0; i < this.ballAndShadowList.length; i++){
				if(this.ballAndShadowList[i].ball === caller){
					var shadow = this.calcBallShadow(this.ballAndShadowList[i].ball);
					this.ballAndShadowList[i].shadow.mvTo(shadow.x, shadow.y, {forced: true, nocallback: true});
				}
			}
		}
		, addBall: function(aBalls){
			if(!_.isArray(aBalls)) aBalls = [aBalls];
			for(var i = 0; i < aBalls.length; i++){
				var shadow = this.calcBallShadow(aBalls[i]);
				this.ballAndShadowList.push({
					ball: aBalls[i]
					, shadow: factory.newGvector(shadow.x, shadow.y, {rad4grab: 0})
				});
				aBalls[i].pushCallbacks('updShadow', this);
			}
		}
		, upd: function(caller){
			var preBarCenter = this.barCenter;
			var preDistEnd1ToCenter = utl.tri.dist(
				this.barEnd1.preX
				, this.barEnd1.preY
				, preBarCenter.x
				, preBarCenter.y);

			this.barCenter = this.calcBarCenter();
			var distEnd1ToCenter = utl.tri.dist(
				this.barEnd1.x
				, this.barEnd1.y
				, this.barCenter.x
				, this.barCenter.y);

			var ratioMvd = distEnd1ToCenter / preDistEnd1ToCenter;

			for(var i = 0; i < this.ballAndShadowList.length; i++){

				var preShadow = this.ballAndShadowList[i].shadow;
				var preDistCenterToShadow = utl.tri.dist(
					preShadow.x
					, preShadow.y
					, preBarCenter.x
					, preBarCenter.y
					);
				var distCenterToShadow = preDistCenterToShadow * ratioMvd;

				var vCenterToEnd1Normalized = utl.tri.sub(
					this.barEnd1.x, this.barEnd1.y, this.barCenter.x, this.barCenter.y, true);
				//console.log(vCenterToEnd1Normalized.x + ': ' + vCenterToEnd1Normalized.y);

				var vCenterToShadow = {
					x: vCenterToEnd1Normalized.x * distCenterToShadow
					, y : vCenterToEnd1Normalized.y * distCenterToShadow};

				this.ballAndShadowList[i].shadow.mvTo(
					this.barCenter.x + vCenterToShadow.x
					, this.barCenter.y + vCenterToShadow.y
					, {forced: true, nocallback: true});

				var ball = this.ballAndShadowList[i].ball;
				var shadow = this.ballAndShadowList[i].shadow;
				ball.mv(shadow.vMvd().x, shadow.vMvd().y, {forced: true, nocallback: true});
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
		newGvector: function(ax, ay){
			var clone = Object.create(gvector);
			clone.init(ax, ay);
			return clone;
		}
		, newYoyo: function(afc, aax){
			if(_.isUndefined(afc) || _.isUndefined(aax)) throw 'need 2 args.';
			var clone = Object.create(yoyo);
			clone.init(afc, aax);
			return clone;
		}
		, newSeesaw: function(afc, ae1, ae2){
			if(_.isUndefined(afc) || _.isUndefined(ae1) || _.isUndefined(ae2)) throw 'need 3 args.';
			var clone = Object.create(seesaw);
			clone.init(afc, ae1, ae2);
			return clone;
		}
		, newCube: function(ae1, ae2, asrfs){
			var clone = Object.create(cube);
			clone.init(ae1, ae2, asrfs);
			return clone;
		}
		, newPong: function(ae1, ae2, abl){
			var clone = Object.create(pong);
			clone.init(ae1, ae2, abl);
			return clone;
		}
	};

	return {
		fac: factory
	};
});
