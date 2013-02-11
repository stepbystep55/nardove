Torso torso = new Torso();
void setup() {
	//size( window.innerWidth, window.innerHeight );
	size(500, 500);
	frameRate(10);
}

void draw() {
	background(#cccccc);
	torso.update();
	torso.draw();
}
void mousePressed() {
	torso.grab();
}
void mouseReleased() {
	torso.release();
}
class Torso {
	ArrayList _pAr = new ArrayList();

	Torso() {
		GbzrSet p1 = new GbzrSet(180,80,null,new Gctr(100,90));
		GbzrSet p2 = new GbzrSet(80,250,60,190,100,300);
		GbzrSet p3 = new GbzrSet(270,300,new Gctr(170,350),null);
		_pAr.add(p1); _pAr.add(p2); _pAr.add(p3);
	}

	void grab() {
		for (GbzrSet gs : _pAr) gs.grb();
	}
	void release() {
		for (GbzrSet gs : _pAr) gs.rls();
	}
	void update() {
		for (GbzrSet gs : _pAr) gs.upd();
	}

	void draw() {
		fill(0, 0, 0);
		noFill();

		beginShape();
		GbzrSet p1 = (GbzrSet)_pAr.get(0);
		vertex(p1.x, p1.y); // first point
		for (int i = 1; i < _pAr.size(); i++) {
			GbzrSet prS = (GbzrSet)_pAr.get(i - 1);
			GbzrSet crS = (GbzrSet)_pAr.get(i);
			bezierVertex(prS._c2.x, prS._c2.y, crS._c1.x, crS._c1.y, crS.x, crS.y);
		}
		endShape();

		for (GbzrSet gs : _pAr) gs.shw();
	}
}
