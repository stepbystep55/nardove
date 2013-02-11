/**
 * grabbable Vector
 */
class Gctr extends PVector {
	float prvX, prvY;
	float _rd = 10;
	boolean _grbd = false; // grabbed?

	Gctr(float x, float y) {
		super(x, y);
		prvX = this.x; prvY = this.y;
	}

	// =grab
	void grb() {
		if (dist(this.x, this.y, mouseX, mouseY) < _rd) {
			_grbd = true;
		}
	}
	// =release
	void rls() {
		_grbd = false;
	}

	// =grabbed?
	boolean grbd() {
		return _grbd;
	}

	// = move to the mouse position
	boolean upd() {
		if (_grbd) {
			prvX = this.x; prvY = this.y;
			this.x = mouseX; this.y = mouseY;
			return true;
		}
		return false;
	}
	void shw() {
		fill(0,0,0);
		textSize(8);
		ellipse(this.x, this.y, 5, 5);
		text(""+round(this.x)+","+round(this.y), this.x, this.y);
	}
}

/**
 * Grabbable anchor with 2 control points for smooth bezier curve
 */
class GbzrSet extends Gctr {
	Gctr _c1, _c2;
	GbzrSet(float ax, float ay, float c1x, float c1y, float c2x, float c2y) {
		super(ax, ay);
		_c1 = new Gctr(c1x, c1y); _c2 = new Gctr(c2x, c2y);
	}
	GbzrSet(float ax, float ay, Gctr c1, Gctr c2) {
		super(ax, ay);
		_c1 = c1;_c2 = c2;
	}
	void grb() {
		super.grb();
		if (_c1 != null) _c1.grb();
		if (_c2 != null) _c2.grb();
	}
	void rls() {
		super.rls();
		if (_c1 != null) _c1.rls();
		if (_c2 != null) _c2.rls();
	}
	// =update
	void upd() {
		if (super.upd()) {
			if (_c1 != null) {
				_c1.x += (this.x - prvX);
				_c1.y += (this.y - prvY);
			}
			if (_c2 != null) {
				_c2.x += (this.x - prvX);
				_c2.y += (this.y - prvY);
			}
		}
		if ((_c1 != null) ? _c1.upd() : false) {
			if (_c2 != null) {
				float mvA = Utl.ang((_c1.prvX - this.x), (_c1.prvY - this.y), (_c1.x - this.x), (_c1.y - this.y));
				float[] mvP = Utl.mv((_c2.x - this.x), (_c2.y - this.y), mvA);
				_c2.x = this.x + mvP[0]; _c2.y = this.y + mvP[1];
			}
		}
		if ((_c2 != null) ? _c2.upd() : false) {
			if (_c1 != null) {
				float mvA = Utl.ang((_c2.prvX - this.x), (_c2.prvY - this.y), (_c2.x - this.x), (_c2.y - this.y));
				float[] mvP = Utl.mv((_c1.x - this.x), (_c1.y - this.y), mvA);
				_c1.x = this.x + mvP[0]; _c1.y = this.y + mvP[1];
			}
		}
	}
	void shw() {
		super.shw();
		fill(204,102,0);
		textSize(8);
		if (_c1 != null) {
			ellipse(_c1.x, _c1.y, 5, 5);
			text(""+round(_c1.x)+","+round(_c1.y), _c1.x, _c1.y);
		}
		if (_c2 != null) {
			ellipse(_c2.x, _c2.y, 5, 5);
			text(""+round(_c2.x)+","+round(_c2.y), _c2.x, _c2.y);
		}
	}
}
static class Utl {
	// = get the angle in radians between point1 and point2
	static float ang(float px, float py, float p2x, float p2y) {
		PVector p1 = new PVector(px, py); p1.normalize();
		PVector p2 = new PVector(p2x, p2y); p2.normalize();
		return (atan2(p2.y, p2.x) - atan2(p1.y, p1.x));
	}
	// = get the point in Vector that moved by specified angle
	static float[] mv(float x, float y, float ang) {
		float lng = mag(x, y);
		float oAng = atan2(y, x); // orginal angle
		return new float[]{lng * cos(oAng + ang), lng * sin(oAng + ang)};
	}
}
