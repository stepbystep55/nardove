define(['pvs'], function(Pvs){
	'use strict';
	var Tri = function(){};

	// = get the angle in radians between point1 and point2
	Tri.ang = function(px, py, p2x, p2y){
		var pMag = Math.sqrt(px * px + py * py); // magnitude of p
		var npx = px / pMag; var npy = py / pMag; // normalized
		pMag = Math.sqrt(p2x * p2x + p2y * p2y); // magnitude of p2
		var np2x = p2x / pMag; var np2y = p2y / pMag; // normalized
		return (Math.atan2(np2y, np2x) - Math.atan2(npy, npx));
	};
	// = get the point in Vector that moved by specified angle
	Tri.mv = function(x, y, ang){
		var pMag = Math.sqrt(x * x + y * y); // magnitude of p
		var oAng = Math.atan2(y, x); // orginal angle
		return [pMag * cos(oAng + ang), pMag * sin(oAng + ang)];
	};
	// = project the point on the base line(vector composed by the origin point &  the base point).
	Tri.prj2 = function(ox, oy, bx, by, px, py){
		var bv = [bx - ox, by - oy];
		var pv = [px - ox, py - oy];
		var agl = Tri.ang(bv[0], bv[1], pv[0], pv[1]); // angle between the base point & the target point
		var oMag = Math.sqrt(pv[0] * pv[0] + pv[1] * pv[1]); // original magnitude of the target point
		var aMag = oMag * Math.cos(agl); // projected magnitude
		var bMag = Math.sqrt(bv[0] * bv[0] + bv[1] * bv[1]); // magnitude of the base point
		var nbx = bv[0] / bMag; var nby = bv[1] / bMag; // normalized
		return [nbx * aMag, nby * aMag];
	};

	var Gctr = function(){
		Pvs.pjs.PVector.apply(this, arguments);
	 	var _prvX = arguments[0], _prvY = arguments[1]; // the point previously situated
	 	var _rd4g = 5; // radius for grab
		var _grbd = false; // grabbed?
		// =grab
		this.grb = function(){
			var dx = this.x - Pvs.pjs.mouseX;
			var dy = this.y - Pvs.pjs.mouseY;
			if(Math.sqrt(dx*dx + dy*dy) < _rd4g){
				_grbd = true;
			}
		};
		// =release
		this.rls = function(){
			_grbd = false;
		};
		// =grabbed?
		this.grbd = function(){
			return _grbd;
		};
		this.upd = function(mx, my){
			if(_grbd){
				if(arguments.length===0){
					// = move to the mouse position
					mx = Pvs.pjs.mouseX - this.x;
					my = Pvs.pjs.mouseY - this.y;
				}
				_prvX = this.x; _prvY = this.y;
				this.x += mx; this.y += my;
				return true;
			}
			return false;
		};
		this.shw = function(){
			Pvs.pjs.fill(0,0,0);
			Pvs.pjs.textSize(8);
			Pvs.pjs.ellipse(this.x, this.y, 5, 5);
			Pvs.pjs.text(""+Math.round(this.x)+","+Math.round(this.y), this.x, this.y);
		};
	};
	Gctr.prototype = Object.create(Pvs.pjs.PVector.prototype);
	Gctr.prototype.constructor = Gctr;

	return {
		Tri: Tri
		, Gctr: Gctr
	};
});
