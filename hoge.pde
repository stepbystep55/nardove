Hoge hoge = new Hoge();
void setup() {
	//size( window.innerWidth, window.innerHeight );
	size(500, 500);
	frameRate(10);
}

void draw() {
	background(#cccccc);
	fill(0, 0, 0);
	text(hoge.pos, 10, 10);
}

class Hoge extends Parent {
	float pos = 2;
}

class Parent {
	float pos = 1;
}