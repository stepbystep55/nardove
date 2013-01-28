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
	GVector p1 = new GVector(30, 70);
	PVector c1 = new GVector(25, 25);
	PVector c2 = new GVector(100, 50);
	PVector c3 = new PVector(20, 130);
	PVector c4 = new PVector(75, 140);
	PVector p2 = new GBzrAnchor(50, 100, c2, c3);
	PVector p3 = new PVector(120, 120);
	
	void grab() {
		p1.grb();
		p2.grb();
		c1.grb();
		c2.grb();
	}
	void release() {
		p1.rls();
		p2.rls();
		c1.rls();
		c2.rls();
	}

	void update() {
		p1.upd();
		p2.upd();
		c1.upd();
		c2.upd();
	}

	void draw() {
		fill(0, 0, 0);
		noFill();

		beginShape();
		vertex(p1.x, p1.y); // first point
		bezierVertex(c1.x, c1.y, c2.x, c2.y, p2.x, p2.y);
		bezierVertex(c3.x, c3.y, c4.x, c4.y, p3.x, p3.y);
		endShape();

		ellipse(p1.x, p1.y, 5, 5);
		ellipse(p2.x, p2.y, 5, 5);
		ellipse(p3.x, p3.y, 5, 5);
		fill(204, 102, 0); ellipse(c1.x, c1.y, 5, 5);
		fill(204, 102, 0); ellipse(c2.x, c2.y, 5, 5);
		fill(204, 102, 0); ellipse(c3.x, c3.y, 5, 5);
		fill(204, 102, 0); ellipse(c4.x, c4.y, 5, 5);
	}
}
