/*
Grabbable grabbable = new Grabbable(new PVector(250, 100));

void setup() {
	//size( window.innerWidth, window.innerHeight );
	size(500, 200);
	frameRate(10);
}

void draw() {
	background(#cccccc);
	grabbable.update();
	grabbable.render();
	PVector moved = grabbable.vectorMoved();
	fill(0, 0, 0);
	text("("+moved.x+","+moved.y+")", 10, 20);
}

void mousePressed() {
	grabbable.grab();
}
void mouseReleased() {
	grabbable.release();
}
*/

class Grabbable {
	PVector grabPos;
	PVector basePos;
	float radius = 10;
	boolean grabbed = false;

	Grabbable(PVector initBasePos) {
		basePos = new PVector(initBasePos.x, initBasePos.y);
		grabPos = new PVector(initBasePos.x, initBasePos.y);
	}

	void grab() {
		if (dist((grabPos.x), (grabPos.y), mouseX, mouseY) < radius) {
			grabbed = true;
		}
	}
	void release() {
		grabbed = false;
	}

	boolean isGrabbed() {
		return grabbed;
	}

	void update() {
		if (grabbed) {
			grabPos.x = mouseX;
			grabPos.y = mouseY;
		}
	}

	void vectorMoved() {
		return new PVector(grabPos.x - basePos.x, grabPos.y - basePos.y);
	}

	void render() {
		render(true);
	}
	void render(boolean showBase) {
		strokeWeight(1);
		fill(204, 102, 0);
		ellipseMode(CENTER);
		ellipse(grabPos.x, grabPos.y, radius, radius);

		if (showBase) renderBasePos();
	}

	void renderBasePos() {
		strokeWeight(1);
		fill(204, 202, 0);
		ellipseMode(CENTER);
		ellipse(basePos.x, basePos.y, 3, 3);
	}
}