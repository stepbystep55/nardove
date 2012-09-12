void setup(){ 
	size(500, 500);
	background(255);
	smooth();

	face = new Face();
}
Face face = null;
void draw(){
	background(255);

	fill(0);
	for (int i = 100; i < width; i+=100) text(""+i, i, 10);
	for (int i = 100; i < height; i+=100) text(""+i, 0, i);
	strokeWeight(2);
	for (int i = 100; i < width; i+=100) for (int k = 100; k < height; k+=100) point(i, k);

	face.show();
	face.showGrab();
}
void mousePressed() {
	face.mv();
}
void mouseReleased() {
	face.fix();
}

class Dot {
	public float x; float y;
	public Dot(float x, float y) { this.x = x; this.y = y; }
	public Dot(Dot dot) { this.x = dot.x; this.y = dot.y; }
	public void mvTo(Dot dot) { this.x = dot.x; this.y = dot.y; }
	public void mv(float x, float y) { this.x += x; this.y += y; }
}
class Node {
	public Dot base; Dot orgEnd; Dot curEnd; float xRatio;
	public Node(Dot baseDot, Dot endDot, float xRatio) {
		this.base = new Dot(baseDot);
		this.orgEnd = new Dot(endDot);
		this.curEnd = new Dot(endDot);
		this.xRatio = xRatio;
	}
	public Node(Node node) {
		this.base = new Dot(node.base);
		this.orgEnd = new Dot(node.orgEnd);
		this.curEnd = new Dot(node.curEnd);
		this.xRatio = node.xRatio;
	}
	public void mvEnd(float x, float y) {
		this.curEnd.mv((x * xRatio), y);
	}
	public void mvEndTo(Dot endDot) { this.curEnd.mvTo(endDot); }
	public void init() { this.curEnd = new Dot(this.orgEnd); }
	public float endX() { return this.curEnd.x; }
	public float endY() { return this.curEnd.y; }
}

float dist4grab = 10;
class Face {
	private Dot pivot = new Dot(width*1/2, height*1/2); // the center point of the head
	private Node ndF9L0U0 = new Node(pivot, pivot, 1);
	
	private float scale = 30;
	/*
	F(ore) <-> T(ail)
	U(pper) <-> B(ottom)
	L(eft) <-> R(ight)
   */
	private Node ndF9L0U9 = new Node(pivot, new Dot(pivot.x, pivot.y - scale*3.5), 0);
	private Node ndF9L5U9 = new Node(pivot, new Dot(pivot.x + scale*2, pivot.y - scale*2), 0.2);
	private Node ndF9L9U0 = new Node(pivot, new Dot(pivot.x + scale*2.35, pivot.y), 0.1);
	private Node ndF9L5B9 = new Node(pivot, new Dot(pivot.x + scale*2, pivot.y + scale*2), 0.2);
	private Node ndF9L0B9 = new Node(pivot, new Dot(pivot.x, pivot.y + scale*3.5), 0);
	/*
	private Node ndF9R5B9 = new Node(pivot, new Dot(pivot.x - scale*2, pivot.y + scale*2));
	private Node ndF9R9U0 = new Node(pivot, new Dot(pivot.x - scale*2.35, pivot.y));
	private Node ndF9R5U9 = new Node(pivot, new Dot(pivot.x - scale*2, pivot.y - scale*2));
	*/
	
	float xLimitF = scale * 3.6; // 0.9*4
	float xLimitT = scale * 2.7; // 0.9*3
	
	private Node grabNode = null;
	private List outlineNodes = null;
	
	public Face() {
		grabNode = new Node(ndF9L0U0);
	
		outlineNodes = new ArrayList();
		outlineNodes.add(ndF9L0U9);
		outlineNodes.add(ndF9L5U9);
		outlineNodes.add(ndF9L9U0);
		outlineNodes.add(ndF9L5B9);
		outlineNodes.add(ndF9L0B9);
		/*
		outlineNodes.add(ndF9R5B9);
		outlineNodes.add(ndF9R9U0);
		outlineNodes.add(ndF9R5U9);
		*/
		init();
	}
	
	private void init() {
		grabNode.init();
		for (int i = 0; i < outlineNodes.size(); i++) {
			((Node)outlineNodes.get(i)).init();
		}
	}
	
	private boolean canTransform = false;
	public void fix() {
		this.canTransform = false;
	}
	public void mv() {
		if (dist(grabNode.endX(), grabNode.endY(), mouseX, mouseY) < dist4grab) {
			this.canTransform = true;
		}
	}

	public void showGrab() {
		strokeWeight(1);
		fill(204, 102, 0);
		ellipseMode(CENTER);
		ellipse(grabNode.endX(), grabNode.endY(), dist4grab, dist4grab);
	}
	
	public void show() {
		float x = 0, y = 0;
		if (canTransform) {
			// init outline dots
			init();
			
			// move outline dots
			x = mouseX - ndF9L0U0.endX();
			if (xLimitF < x) x = xLimitF;
			if (x < 0) x = 0;
			y = mouseY - ndF9L0U0.endY();
			grabNode.mvEnd(x, y);
			for (int i = 0; i < outlineNodes.size(); i++) {
				((Node)outlineNodes.get(i)).mvEnd(x, y);
			}
		}
		// draw
		strokeWeight(2);
		fill(255);
		beginShape();
		for (int i = 0; i < outlineNodes.size(); i++) {
			Node node = (Node)outlineNodes.get(i);
			vertex(node.endX(), node.endY());
		}
		endShape(CLOSE);
	}
}