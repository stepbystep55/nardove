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

/*
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
*/		
		// following codes are sample
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
		println(rad + ': ' + degrees(rad));
		
		/*
		PVector mr = PVector.sub(sp2_ctr, sp1_ctr);
		float rad = atan2(mr.y, mr.x);
		println(degrees(rad));
		PVector sp1o_ctr = PVector.sub(sp1o, ctr);
		sp1o_ctr.x += cos(rad);
		sp1o_ctr.y += sin(rad);
		PVector ended = PVector.add(ctr, sp1o_ctr);
		fill(204, 102, 0); ellipse(ended.x, ended.y, 5, 5);
		*/
	}
}
