define(function(){
	'use strict';

	// trigonometric util
	var tri = {

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

	return {
		tri: tri
	};
});
