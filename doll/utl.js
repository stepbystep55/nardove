define(function(){
	'use strict';

	// trigonometric util
	var trigonometry = {

		dist: function(ax, ay, bx, by){
			return Math.sqrt(Math.pow((ax - bx), 2) + Math.pow((ay - by), 2));
		}

		// = get the angle in radians between point1 and point2
		, ang: function(px, py, p2x, p2y){
			var pMag = Math.sqrt(px * px + py * py); // magnitude of p
			var npx = px / pMag; var npy = py / pMag; // normalized
			pMag = Math.sqrt(p2x * p2x + p2y * p2y); // magnitude of p2
			var np2x = p2x / pMag; var np2y = p2y / pMag; // normalized
			return (Math.atan2(np2y, np2x) - Math.atan2(npy, npx));
		}

		, sub: function(px, py, p2x, p2y, normalized){
			var x = px - p2x;
			var y = py - p2y;
			if(normalized){
				var mag = Math.sqrt(x * x + y * y);
				x = x / mag;
				y = y / mag;
			}
			return {x: x, y: y};
		}

		// = get the point moved by specified angle
		, mv: function(x, y, ang){
			var pMag = Math.sqrt(x * x + y * y); // magnitude of p
			var oAng = Math.atan2(y, x); // original angle
			return {x: (pMag * Math.cos(oAng + ang)), y: (pMag * Math.sin(oAng + ang))};
		}

		// = project the point on the base line(vector composed by the origin point &  the base point).
		, prj: function(ox, oy, bx, by, px, py){
			var bv = [bx - ox, by - oy];
			var pv = [px - ox, py - oy];
			var agl = Tri.ang(bv[0], bv[1], pv[0], pv[1]); // angle between the base point & the target point
			var oMag = Math.sqrt(pv[0] * pv[0] + pv[1] * pv[1]); // original magnitude of the target point
			var aMag = oMag * Math.cos(agl); // projected magnitude
			var bMag = Math.sqrt(bv[0] * bv[0] + bv[1] * bv[1]); // magnitude of the base point
			var nbx = bv[0] / bMag; var nby = bv[1] / bMag; // normalized
			return {x: (nbx * aMag), y: (nby * aMag)};
		}
	};

	// when you grab this vector, you can move this anywhere you want.
	var gvector = {
		name: 'anonymous'
		, x: 0
		, y: 0
		, preX: 0 // x of the previous position when moved
		, preY: 0 // y of the previous position when moved
		, rd: 10 // radious where you can grab this
		, grbd: false // grabed or not
		, callbacks: []

		, init: function(ax, ay){
			this.x = ax;
			this.y = ay;
			this.preX = ax;
			this.preY = ay;
			this.callbacks = [];
		}
		, grb: function(ax, ay){
			if(tri.dist(this.x, this.y, ax, ay) < this.rd){
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

		, show: function(){
			pjs.textSize(8);
			pjs.text("" + Math.round(this.x) + "," + Math.round(this.y), this.x, this.y);
		}
	};

	// a point with two end points which can move around fulcrum.
	var seesaw = {
		fulcrum: null // must be gvector
		, end1: null // must be gvector
		, end2: null // must be gvector

		, init: function(afulcrum, aend1, aend2){
			this.fulcrum = afulcrum;
			this.end1 = aend1;
			this.end2 = aend2;
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
				var angle = tri.ang(
					(this.end1.preX - this.fulcrum.x), (this.end1.preY - this.fulcrum.y)
					, (this.end1.x - this.fulcrum.x), (this.end1.y - this.fulcrum.y)
				);
				// calculate moved vector
				var mvd = tri.mv((this.end2.x - this.fulcrum.x), (this.end2.y - this.fulcrum.y), angle);

				this.end2.mvTo(
					this.fulcrum.x + mvd.x, this.fulcrum.y + mvd.y
					, {forced: true, nocallback: true});
			}
			if(caller === this.end2){
				// calculate moved angle
				var angle = tri.ang(
					(this.end2.preX - this.fulcrum.x), (this.end2.preY - this.fulcrum.y)
					, (this.end2.x - this.fulcrum.x), (this.end2.y - this.fulcrum.y)
				);
				// calculate moved vector
				var mvd = tri.mv((this.end1.x - this.fulcrum.x), (this.end1.y - this.fulcrum.y), angle);

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
	var kendama = {
		grip: null // must be gvector
		, ball: null // must be gvector

		, init: function(agrip, aball){
			this.grip = agrip;
			this.ball = aball;
			this.grip.pushCallbacks('upd', this);
		}

		, grb: function(ax, ay){
			//console.log(ax + '=' + ay);
			this.grip.grb(ax, ay);
			this.ball.grb(ax, ay);
		}
		, rls: function(ax, ay){
			this.grip.rls();
			this.ball.rls();
		}

		, upd: function(caller){
			this.ball.mv(
				(this.grip.x - this.grip.preX), (this.grip.y - this.grip.preY)
				, {forced: true, nocallback: true});
		}
	};

	var cube = {
		end1: null
		,end2: null
		,surfaces: []
		, init: function(e1, e2, srfs){
			this.end1 = e1;
			this.end2 = e2;
			this.surfaces = [];
			for(var i = 0; i < srfs.length; i++){
				var ss_e1 = factory.newGvector(srfs[i].x - 30, srfs[i].y);
				var ss_e2 = factory.newGvector(srfs[i].x + 30, srfs[i].y);
				var ss = factory.newSeesaw(srfs[i], ss_e1, ss_e2);
				this.surfaces.push(ss);
				//this.surfaces.push(factory.newKendama(e1, ss));
			}
		}

		, grb: function(ax, ay){
			//console.log(ax + '=' + ay);
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

	var factory = {
		newGvector: function(ax, ay){
			var clone = Object.create(gvector);
			clone.init(ax, ay);
			return clone;
		}
		, newKendama: function(agp, abl){
			if(_.isUndefined(agp) || _.isUndefined(abl)) throw 'need 2 args.';
			var clone = Object.create(kendama);
			clone.init(agp, abl);
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
	};

	return {
		tri: trigonometry
		, fac: factory
	};
});
