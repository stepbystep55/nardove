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
}

/**
 * Grabbable anchor with 2 control points for smooth bezier curve
 */
class GbzrSet extends Gctr {
	Gctr _c1, _c2;
	GbzrSet(float ax, float ay, float c1x, float c1y, float c2x, float c2y) {
		super(ax, ay);
		_c1 = new Gctr(c1x, c1y);
		_c2 = new Gctr(c2x, c2y);
	}
	void grb() {
		super.grb();
		_c1.grb();
		_c2.grb();
	}
	void rls() {
		super.rls();
		_c1.rls();
		_c2.rls();
	}
	// =update
	void upd() {
		if (super.upd()) {
			_c1.x += (this.x - prvX); _c1.y += (this.y - prvY);
			_c2.x += (this.x - prvX); _c2.y += (this.y - prvY);
		}
		if (_c1.upd()) {
			float mvA = Utl.ang((_c1.prvX - this.x), (_c1.prvY - this.y), (_c1.x - this.x), (_c1.y - this.y));
			PVector mvV = Utl.mv((_c2.x - this.x), (_c2.y - this.y), mvA);
			_c2.x = this.x + mvV.x; _c2.y = this.y + mvV.y;
		}
		_c2.upd();
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
	static PVector mv(float x, float y, float ang) {
		float lng = mag(x, y);
		float oAng = atan2(y, x); // orginal angle
		return new PVector(lng * cos(oAng + ang), lng * sin(oAng + ang));
	}
}
