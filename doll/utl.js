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

		// = get the projected point on the line
		, prj: function(orgnx, orgny, endx, endy, px, py){
			var orgnToPoint = {x: px - orgnx, y: py - orgny};
			var orgnToEnd = {x: endx - orgnx, y: endy - orgny};
			var lengOrgnToPoint = Math.sqrt(Math.pow(orgnToPoint.x, 2) + Math.pow(orgnToPoint.y, 2));
			var angleBetween = this.ang(orgnToPoint.x, orgnToPoint.y, orgnToEnd.x, orgnToEnd.y);
			var lengOrgnToProjected = lengOrgnToPoint * Math.cos(angleBetween);
			var lengOrgnToEnd = Math.sqrt(Math.pow(orgnToEnd.x, 2) + Math.pow(orgnToEnd.y, 2));
			var orgnToEndNormalized = {x: orgnToEnd.x / lengOrgnToEnd, y: orgnToEnd.y / lengOrgnToEnd};
			return {
				x: orgnx + orgnToEndNormalized.x * lengOrgnToProjected
				, y: orgny + orgnToEndNormalized.y * lengOrgnToProjected
			};
		}
	};

	return {
		tri: trigonometry
	};
});
