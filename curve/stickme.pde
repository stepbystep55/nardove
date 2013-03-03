Stickme stickme = new Stickme();
void setup(){
	//size( window.innerWidth, window.innerHeight );
	size(500, 500);
	frameRate(10);
}

void draw(){
	background(#cccccc);
	stickme.update();
	stickme.draw();
}
void mousePressed(){
	stickme.grab();
}
void mouseReleased(){
	stickme.release();
}
class Stickme{
	Seesaw _shoulder;
	Gctr _espine;

	Stickme(){
		Gctr lshoulder = new Gctr(200, 100);
		Gctr rshoulder = new Gctr(300, 100);
		_shoulder = new Seesaw(
			(lshoulder.x+rshoulder.x)/2, (lshoulder.y+rshoulder.y)/2
			, lshoulder , rshoulder);
		_espine = new Gctr(250, 300);
	}

	void grab(){
		_shoulder.grb();
		_espine.grb();
	}
	void release(){
		_shoulder.rls();
		_espine.rls();
	}
	void update(){
		_shoulder.upd();
		_espine.upd();
	}
	void draw(){
		fill(0, 0, 0);
		noFill();
		line(_shoulder._e1.x, _shoulder._e1.y, _shoulder._e2.x, _shoulder._e2.y);
		line(_shoulder.x, _shoulder.y, _espine.x, _espine.y);
	}
}