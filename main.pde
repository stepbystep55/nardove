PVector initBasePos = new PVector(250, 250);
Face face = new Face(initBasePos);

void setup() {
	//size( window.innerWidth, window.innerHeight );
	size(500, 500);
	frameRate(10);
}

void draw() {
	// effacer tout
	background(#cccccc);

	// render face
	face.update();
	face.render();

	// debug
	PVector moved = face.vectorMoved();
	fill(0, 0, 0);
	text("("+moved.x+","+moved.y+")", 10, 20);
}

void mousePressed() {
	face.grab();
}
void mouseReleased() {
	face.release();
}