define(['pjs','utl','utlx','underscore'], function(pjs, utl, utlx, _){
	'use strict';

	var torso = {
		init: function(ae1, ae2, abls, options){
			this.editable = true;
			this.baseColor = 255;
			this.lineColor = 0;
			this.png = utlx.fac.newPong(ae1, ae2);
			this.rad4grab = (options) ? options.rad4grab : 10; // radious where you can grab this
			return this;
		}
		, grb: function(ax, ay){
			if(this.editable){
				if(utl.tri.dist(this.png.barEnd1, {x: ax, y: ay}) < this.rad4grab) this.png.barEnd1.grbd = true;
				if(utl.tri.dist(this.png.barEnd2, {x: ax, y: ay}) < this.rad4grab) this.png.barEnd2.grbd = true;
			}
		}
		, rls: function(ax, ay){
			if(this.editable){
				this.png.barEnd1.grbd = false;
				this.png.barEnd2.grbd = false;
			}
		}
		, update: function(ax, ay){
			this.png.mvTo(ax, ay);
			return this;
		}
		, draw: function(){
			pjs.fill(255);
			pjs.ellipse(this.png.barEnd1.x, this.png.barEnd1.y, 10, 10);
			pjs.ellipse(this.png.barEnd2.x, this.png.barEnd2.y, 10, 10);
			pjs.ellipse(this.png.barCenter.x, this.png.barCenter.y, 5, 5);
			for(var i = 0; i < this.png.balls.length; i++){
				var ball = this.png.balls[i];
				var shadow = ball.shadow;
				pjs.fill(128);
				pjs.ellipse(ball.x, ball.y, 20, 20);
				pjs.fill(0);
				pjs.ellipse(shadow.x, shadow.y, 10, 10);
			}
			return this;
		}
		, show: function(){
			pjs.fill(0);
			pjs.textSize(10);
			pjs.text('' + Math.round(this.png.barEnd1.x) + ',' + Math.round(this.png.barEnd1.y)
				, this.png.barEnd1.x, this.png.barEnd1.y);
			pjs.text('' + Math.round(this.png.barEnd2.x) + ',' + Math.round(this.png.barEnd2.y)
				, this.png.barEnd2.x, this.png.barEnd2.y);
			return this;
		}
	};

	var factory = {
		newTorso: function(e1, e2, bls){
			var clone = Object.create(torso);
			clone.init(e1, e2, bls);
			return clone;
		}
	};

	return {
		fac: factory
	}
});