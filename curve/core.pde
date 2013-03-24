/**
 * grabbable Vector
 */
 class Gctr extends PVector{
 	float prvX, prvY;
 	float _rd = 5;
	boolean _grbd = false; // grabbed?

	Gctr(float x, float y){
		super(x, y);
		prvX = this.x; prvY = this.y;
	}
	// =grab
	void grb(){
		if(dist(this.x, this.y, mouseX, mouseY) < _rd){
			_grbd = true;
		}
	}
	// =release
	void rls(){
		_grbd = false;
	}
	// =grabbed?
	boolean grbd(){
		return _grbd;
	}
	// = move to the mouse position
	boolean upd(){
		float mx = mouseX - this.x;
		float my = mouseY - this.y;
		return upd(mx, my);
	}
	boolean upd(float mx, float my){
		if(_grbd){
			prvX = this.x; prvY = this.y;
			this.x += mx; this.y += my;
			return true;
		}
		return false;
	}
	void shw(){
		fill(0,0,0);
		textSize(8);
		ellipse(this.x, this.y, 5, 5);
		text(""+round(this.x)+","+round(this.y), this.x, this.y);
	}
}

/**
 * Grabbable fulcrum with 2 end points
 */
class Seesaw extends Gctr{
	Gctr _e1, _e2;
	Seesaw(float ax, float ay, float e1x, float e1y, float e2x, float e2y){
		super(ax, ay);
		_e1 = new Gctr(e1x, e1y); _e2 = new Gctr(e2x, e2y);
	}
	Seesaw(float ax, float ay, Gctr e1, Gctr e2){
		super(ax, ay);
		_e1 = e1;_e2 = e2;
	}
	void grb(){
		super.grb();
		if (_e1 != null) _e1.grb();
		if (_e2 != null) _e2.grb();
	}
	void rls() {
		super.rls();
		if(_e1 != null) _e1.rls();
		if(_e2 != null) _e2.rls();
	}
	// =update
	void upd(){
		if(super.upd()) {
			if(_e1 != null){
				_e1.x += (this.x - prvX);
				_e1.y += (this.y - prvY);
			}
			if(_e2 != null){
				_e2.x += (this.x - prvX);
				_e2.y += (this.y - prvY);
			}
		}
		if((_e1 != null) ? _e1.upd() : false){
			if(_e2 != null){
				float mvA = Utl.ang((_e1.prvX - this.x), (_e1.prvY - this.y), (_e1.x - this.x), (_e1.y - this.y));
				float[] mvP = Utl.mv((_e2.x - this.x), (_e2.y - this.y), mvA);
				_e2.x = this.x + mvP[0]; _e2.y = this.y + mvP[1];
			}
		}
		if((_e2 != null) ? _e2.upd() : false){
			if(_e1 != null){
				float mvA = Utl.ang((_e2.prvX - this.x), (_e2.prvY - this.y), (_e2.x - this.x), (_e2.y - this.y));
				float[] mvP = Utl.mv((_e1.x - this.x), (_e1.y - this.y), mvA);
				_e1.x = this.x + mvP[0]; _e1.y = this.y + mvP[1];
			}
		}
	}
	void shw(){
		super.shw();
		fill(204,102,0);
		textSize(8);
		if(_e1 != null){
			ellipse(_e1.x, _e1.y, 5, 5);
			text(""+round(_e1.x)+","+round(_e1.y), _e1.x, _e1.y);
		}
		if(_e2 != null){
			ellipse(_e2.x, _e2.y, 5, 5);
			text(""+round(_e2.x)+","+round(_e2.y), _e2.x, _e2.y);
		}
	}
}
static class Utl{
	// = get the angle in radians between point1 and point2
	static float ang(float px, float py, float p2x, float p2y){
		var pMag = Math.sqrt(px * px + py * py); // magnitude of p
		var npx = px / pMag; var npy = py / pMag; // normalized
		pMag = Math.sqrt(p2x * p2x + p2y * p2y); // magnitude of p2
		var np2x = p2x / pMag; var np2y = p2y / pMag; // normalized
		return (Math.atan2(np2y, np2x) - Math.atan2(npy, npx));
	}
	// = get the point in Vector that moved by specified angle
	static float[] mv(float x, float y, float ang){
		var pMag = Math.sqrt(x * x + y * y); // magnitude of p
		var oAng = Math.atan2(y, x); // orginal angle
		return new float[]{pMag * cos(oAng + ang), pMag * sin(oAng + ang)};
	}
	// = project the point on the base line(vector composed by the origin point &  the base point).
	static float[] prj(float bx, float by, float px, float py){
		float agl = Utl.ang(bx, by, px, py); // angle between the base point & the target point
		float oMag = Math.sqrt(px * px + py * py); // original magnitude of the target point
		float aMag = oMag * Math.cos(agl); // projected magnitude
		var bMag = Math.sqrt(bx * bx + by * by); // magnitude of the base point
		var nbx = bx / bMag; var nby = by / bMag; // normalized
		return new float[]{nbx * aMag, nby * aMag};
	}
	// = project the point on the base line(vector composed by the origin point &  the base point).
	static float[] prj2(float ox, float oy, float bx, float by, float px, float py){
		var bv = new float[]{bx - ox, by - oy};
		var pv = new float[]{px - ox, py - oy};
		var agl = Utl.ang(bv[0], bv[1], pv[0], pv[1]); // angle between the base point & the target point
		var oMag = Math.sqrt(pv[0] * pv[0] + pv[1] * pv[1]); // original magnitude of the target point
		var aMag = oMag * Math.cos(agl); // projected magnitude
		var bMag = Math.sqrt(bv[0] * bv[0] + bv[1] * bv[1]); // magnitude of the base point
		var nbx = bv[0] / bMag; var nby = bv[1] / bMag; // normalized
		return new float[]{nbx * aMag, nby * aMag};
	}
}
