/**
 * grabbable Vector
 */
class Gctr extends PVector {
	float _rd = 10;
	boolean _grbd = false; // grabbed?

	Gctr(float x, float y) {
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
		//float[] prNcr = {0, 0, 0, 0}; // previous & current points
		float[] prNcr; // previous & current points
		if (_grbd) {
			prNcr = {super.x, super.y, mouseX, mouseY};
			super.x = mouseX;
			super.y = mouseY;
		}
		return prNcr;
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
		float[] prNcr4a = super.upd();
		if (prNcr4a != null) {
			_c1.x += (prNcr4a[2] - prNcr4a[0]); _c1.y += (prNcr4a[3] - prNcr4a[1]);
			_c2.x += (prNcr4a[2] - prNcr4a[0]); _c2.y += (prNcr4a[3] - prNcr4a[1]);
		}

		float[] prNcr4c1 = _c1.upd();
		if (prNcr4c1 != null) {
			PVector pr_a = new PVector(prNcr4c1[0] - super.x, prNcr4c1[1] - super.y);
			pr_a.normalize();
			PVector cr_a = new PVector(prNcr4c1[2] - super.x, prNcr4c1[3] - super.y);
			cr_a.normalize();
			float mv_rd = atan2(cr_a.y, cr_a.x) - atan2(pr_a.y, pr_a.x);
			PVector c2_a = PVector.sub(new PVector(_c2.x, _c2.y), new PVector(this.x, this.y));
			float leng = mag(c2_a.x, c2_a.y);
			float rd4c2 = atan2(c2_a.y, c2_a.x);
			PVector mv_v = new PVector(leng * cos(rd4c2 + mv_rd), leng * sin(rd4c2 + mv_rd));
			_c2.x = this.x + mv_v.x; _c2.y = this.y + mv_v.y;
		}

		float[] prNcr4c2 = _c2.upd();
	}
}