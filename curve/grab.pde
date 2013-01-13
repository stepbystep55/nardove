class GVector extends PVector {
	float _rd = 10;
	boolean _grbd = false; // grabbed?

	GVector(PVector pv) {
		super(pv.x, pv.y);
	}
	GVector(float x, float y) {
		super(x, y);
	}

	/** =grab */
	void grb() {
		if (dist(super.x, super.y, mouseX, mouseY) < _rd) {
			_grbd = true;
		}
	}
	/** =release */
	void rls() {
		_grbd = false;
	}

	/** =grabbed? */
	boolean grbd() {
		return _grbd;
	}

	/** =update */
	void upd() {
		if (_grbd) {
			super.x = mouseX;
			super.y = mouseY;
		}
	}
}