class Face extends Grabbable {

	float width = 50;
	float topLeng = 100;
	float btmLeng = 100;

	Face(PVector initBasePos) {
		super(initBasePos);
		init();
	}

	ArrayList topLeftQuad0 = new ArrayList();
	ArrayList btmLeftQuad0 = new ArrayList();
	ArrayList topRghtQuad0 = new ArrayList();
	ArrayList btmRghtQuad0 = new ArrayList();
	void init() {
		topLeftQuad0.add(new PVector(0, -topLeng));
		topLeftQuad0.add(new PVector(-(width/3), -topLeng));
		topLeftQuad0.add(new PVector(-width, -(topLeng*2/3)));
		topLeftQuad0.add(new PVector(-width, 0));

		btmLeftQuad0.add(new PVector(0, btmLeng));
		btmLeftQuad0.add(new PVector(-(width/3), btmLeng));
		btmLeftQuad0.add(new PVector(-width, (btmLeng*2/3)));
		btmLeftQuad0.add(new PVector(-width, 0));

		topRghtQuad0.add(new PVector(0, -topLeng));
		topRghtQuad0.add(new PVector((width/3), -topLeng));
		topRghtQuad0.add(new PVector(width, -(topLeng*2/3)));
		topRghtQuad0.add(new PVector(width, 0));

		btmRghtQuad0.add(new PVector(0, btmLeng));
		btmRghtQuad0.add(new PVector((width/3), btmLeng));
		btmRghtQuad0.add(new PVector(width, (btmLeng*2/3)));
		btmRghtQuad0.add(new PVector(width, 0));
	}

	void render() {
		super.render();

		pushMatrix();
		translate(initBasePos.x, initBasePos.y);
		noFill();
		beginShape();
		for (Iterator itr = topLeftQuad0.iterator(); itr.hasNext(); ) {
			PVector pv = itr.next();
			vertex(pv.x, pv.y);
		}
		endShape();
		beginShape();
		for (Iterator itr = btmLeftQuad0.iterator(); itr.hasNext(); ) {
			PVector pv = itr.next();
			vertex(pv.x, pv.y);
		}
		endShape();
		beginShape();
		for (Iterator itr = topRghtQuad0.iterator(); itr.hasNext(); ) {
			PVector pv = itr.next();
			vertex(pv.x, pv.y);
		}
		endShape();
		beginShape();
		for (Iterator itr = btmRghtQuad0.iterator(); itr.hasNext(); ) {
			PVector pv = itr.next();
			vertex(pv.x, pv.y);
		}
		endShape();
		popMatrix();
	}
}