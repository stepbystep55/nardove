/**
 * grabbable Vector
 */
class GVector extends PVector {
	float _rd = 10;
	boolean _grbd = false; // grabbed?

	GVector(float x, float y) {
		super(x, y);
	}

	// =grab
	void grb() {
		if (dist(super.x, super.y, mouseX, mouseY) < _rd) {
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

	// =update
	PVector upd() {
		if (_grbd) {
			PVector trns = new PVector(mouseX - super.x, mouseY - super.y);
			super.x = mouseX;
			super.y = mouseY;
			return trns;
		}
		return new PVector();
	}
}

/**
 * Grabbable anchor with 2 controll points for smooth bezier curve
 */
class GBzrAnchor extends GVector {
	PVector _c1, _c2;
	GBzrAnchor(float x, float y, PVector c1, PVector c2) {
		super(x, y);
		_c1 = c1;
		_c2 = c2;
	}

	// =update
	void upd() {
		PVector trns = super.upd();
		//_c1.add(trns); _c2.add(trns); this doesn't work
		_c1.x += trns.x; _c1.y += trns.y;
		_c2.x += trns.x; _c2.y += trns.y;
	}
}