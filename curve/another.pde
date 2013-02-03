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
	Gctr p1 = new Gctr(30, 70);
	Gctr c1 = new Gctr(25, 25);
	Gctr p2 = new GbzrSet(50, 100, 100, 50, 20, 130);
	PVector p3 = new PVector(120, 120);
	PVector c4 = new PVector(75, 140);
	
	void grab() {
		p1.grb();
		p2.grb();
		c1.grb();
	}
	void release() {
		p1.rls();
		p2.rls();
		c1.rls();
	}

	void update() {
		p1.upd();
		p2.upd();
		c1.upd();
	}

	void draw() {
		fill(0, 0, 0);
		noFill();


		beginShape();
		vertex(p1.x, p1.y); // first point
		bezierVertex(c1.x, c1.y, p2._c1.x, p2._c1.y, p2.x, p2.y);
		bezierVertex(p2._c2.x, p2._c2.y, c4.x, c4.y, p3.x, p3.y);
		endShape();

		ellipse(p1.x, p1.y, 5, 5);
		ellipse(p2.x, p2.y, 5, 5);
		ellipse(p2._c1.x, p2._c1.y, 5, 5);
		ellipse(p2._c2.x, p2._c2.y, 5, 5);
		fill(204, 102, 0); ellipse(c1.x, c1.y, 5, 5);
		fill(204, 102, 0); ellipse(p2._c1.x, p2._c1.y, 5, 5);
		fill(204, 102, 0); ellipse(p2._c2.x, p2._c2.y, 5, 5);
		fill(204, 102, 0); ellipse(c4.x, c4.y, 5, 5);

		// following codes are sample
		/*
		PVector ctr = new PVector(300, 300);
		PVector sp1 = new PVector(350, 310);
		PVector sp1o = new PVector(250, 290);
		PVector sp2 = new PVector(360, 380);
		fill(0, 0, 0);ellipse(ctr.x, ctr.y, 5, 5);
		line(ctr.x, ctr.y, sp1.x, sp1.y);
		fill(0, 0, 0);ellipse(sp1.x, sp1.y, 5, 5);
		line(ctr.x, ctr.y, sp1o.x, sp1o.y);
		fill(0, 0, 0);ellipse(sp1o.x, sp1o.y, 5, 5);
		line(ctr.x, ctr.y, sp2.x, sp2.y);
		fill(0, 0, 0);ellipse(sp2.x, sp2.y, 5, 5);

		PVector sp1_ctr = PVector.sub(sp1, ctr);
		sp1_ctr.normalize();
		PVector sp2_ctr = PVector.sub(sp2, ctr);
		sp2_ctr.normalize();
		float rad = atan2(sp2_ctr.y, sp2_ctr.x) - atan2(sp1_ctr.y, sp1_ctr.x);
		
		PVector sp1o_ctr = PVector.sub(sp1o, ctr);
		float leng = mag(sp1o_ctr.x, sp1o_ctr.y);
		float rad2 = atan2(sp1o_ctr.y, sp1o_ctr.x);
		PVector sp2o_ctr = new PVector(leng * cos(rad + rad2), leng * sin(rad + rad2));
		PVector sp2o = PVector.add(ctr, sp2o_ctr);
		fill(204, 102, 0); ellipse(sp2o.x, sp2o.y, 5, 5);
		line(ctr.x, ctr.y, sp2o.x, sp2o.y);
		*/
	}
}
