class Face extends Grabbable {

	float objWdth = 50;
	float topLeng = 100;
	float btmLeng = 100;

	Face(PVector initBasePos) {
		super(initBasePos);
		init();
	}

	ArrayList topLeftQuad0 = new ArrayList();
	ArrayList topLeftQuad1 = new ArrayList();
	ArrayList btmLeftQuad0 = new ArrayList();
	ArrayList btmLeftQuad1 = new ArrayList();
	ArrayList topRghtQuad0 = new ArrayList();
	ArrayList topRghtQuad1 = new ArrayList();
	ArrayList btmRghtQuad0 = new ArrayList();
	ArrayList btmRghtQuad1 = new ArrayList();
	void init() {
		topLeftQuad0.add(new PVector(0, -topLeng));
		topLeftQuad0.add(new PVector(-(objWdth/3), -topLeng));
		topLeftQuad0.add(new PVector(-objWdth, -(topLeng*2/3)));
		topLeftQuad0.add(new PVector(-objWdth, 0));

		topLeftQuad1.add(new PVector(0, -topLeng));
		topLeftQuad1.add(new PVector(-(objWdth*2/3), -topLeng));
		topLeftQuad1.add(new PVector(-objWdth, -(topLeng*2/3)));
		topLeftQuad1.add(new PVector(-objWdth, 0));

		btmLeftQuad0.add(new PVector(0, btmLeng));
		btmLeftQuad0.add(new PVector(-(objWdth/3), btmLeng));
		btmLeftQuad0.add(new PVector(-objWdth, (btmLeng*2/3)));
		btmLeftQuad0.add(new PVector(-objWdth, 0));

		btmLeftQuad1.add(new PVector(0, btmLeng));
		btmLeftQuad1.add(new PVector(-objWdth, btmLeng));
		btmLeftQuad1.add(new PVector(-objWdth, (btmLeng*2/3)));
		btmLeftQuad1.add(new PVector(-objWdth, 0));

		topRghtQuad0.add(new PVector(0, -topLeng));
		topRghtQuad0.add(new PVector((objWdth/3), -topLeng));
		topRghtQuad0.add(new PVector(objWdth, -(topLeng*2/3)));
		topRghtQuad0.add(new PVector(objWdth, 0));

		topRghtQuad1.add(new PVector(0, -topLeng));
		topRghtQuad1.add(new PVector((objWdth/3), -topLeng));
		topRghtQuad1.add(new PVector(objWdth, -(topLeng*2/3)));
		topRghtQuad1.add(new PVector(objWdth, 0));
		
		btmRghtQuad0.add(new PVector(0, btmLeng));
		btmRghtQuad0.add(new PVector((objWdth/3), btmLeng));
		btmRghtQuad0.add(new PVector(objWdth, (btmLeng*2/3)));
		btmRghtQuad0.add(new PVector(objWdth, 0));
		
		btmRghtQuad1.add(new PVector(0, btmLeng));
		btmRghtQuad1.add(new PVector((objWdth*2/3), btmLeng));
		btmRghtQuad1.add(new PVector(objWdth, (btmLeng*2/3)));
		btmRghtQuad1.add(new PVector(objWdth, 0));
	}

	void render() {
		super.render();

		pushMatrix();
		translate(initBasePos.x, initBasePos.y);
		noFill();
		beginShape();
		for (int i = 0; i < topLeftQuad0.size(); i++) {
			PVector pv0 = topLeftQuad0.get(i);
			PVector pv1 = topLeftQuad1.get(i);
			vertex(pv0.x + vectorMoved(abs(pv1.x - pv0.x)).x, pv0.y);
		}
		endShape();
		beginShape();
		for (int i = 0; i < btmLeftQuad0.size(); i++) {
			PVector pv0 = btmLeftQuad0.get(i);
			PVector pv1 = btmLeftQuad1.get(i);
			vertex(pv0.x + vectorMoved(abs(pv1.x - pv0.x)).x, pv0.y);
		}
		endShape();
		beginShape();
		for (int i = 0; i < topRghtQuad0.size(); i++) {
			PVector pv0 = topRghtQuad0.get(i);
			PVector pv1 = topRghtQuad1.get(i);
			vertex(pv0.x + vectorMoved(abs(pv1.x - pv0.x)).x, pv0.y);
		}
		endShape();
		beginShape();
		for (int i = 0; i < btmRghtQuad0.size(); i++) {
			PVector pv0 = btmRghtQuad0.get(i);
			PVector pv1 = btmRghtQuad1.get(i);
			vertex(pv0.x + vectorMoved(abs(pv1.x - pv0.x)).x, pv0.y);
		}
		endShape();
		popMatrix();
	}
}