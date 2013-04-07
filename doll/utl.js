define(['pcnvs'], function(Pcnvs){
	'use strict';
	var Trg = function(){};

	// = get the angle in radians between point1 and point2
	Trg.ang = function(px, py, p2x, p2y){
		var pMag = Math.sqrt(px * px + py * py); // magnitude of p
		var npx = px / pMag; var npy = py / pMag; // normalized
		pMag = Math.sqrt(p2x * p2x + p2y * p2y); // magnitude of p2
		var np2x = p2x / pMag; var np2y = p2y / pMag; // normalized
		return (Math.atan2(np2y, np2x) - Math.atan2(npy, npx));
	};
	// = get the point in Vector that moved by specified angle
	Trg.mv = function(x, y, ang){
		var pMag = Math.sqrt(x * x + y * y); // magnitude of p
		var oAng = Math.atan2(y, x); // orginal angle
		return [pMag * cos(oAng + ang), pMag * sin(oAng + ang)];
	};
	// = project the point on the base line(vector composed by the origin point &  the base point).
	Trg.prj2 = function(ox, oy, bx, by, px, py){
		var bv = [bx - ox, by - oy];
		var pv = [px - ox, py - oy];
		var agl = Trg.ang(bv[0], bv[1], pv[0], pv[1]); // angle between the base point & the target point
		var oMag = Math.sqrt(pv[0] * pv[0] + pv[1] * pv[1]); // original magnitude of the target point
		var aMag = oMag * Math.cos(agl); // projected magnitude
		var bMag = Math.sqrt(bv[0] * bv[0] + bv[1] * bv[1]); // magnitude of the base point
		var nbx = bv[0] / bMag; var nby = bv[1] / bMag; // normalized
		return [nbx * aMag, nby * aMag];
	};

	var Gctr = function(){
		Pcnvs.pjs.PVector.apply(this, arguments);
		this.hoge = function(){ console.log('yeah'); };
	};
	Gctr.prototype = Object.create(Pcnvs.pjs.PVector.prototype);
	Gctr.prototype.constructor = Gctr;

	return {
		Trg: Trg
		, Gctr: Gctr
	};
});
