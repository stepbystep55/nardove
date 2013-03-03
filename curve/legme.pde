Leg leg = new Leg();
void setup(){
	//size( window.innerWidth, window.innerHeight );
	size(500, 500);
	frameRate(10);
}

void draw(){
	background(#cccccc);
	leg.update();
	leg.draw();
}
void mousePressed(){
	leg.grab();
}
void mouseReleased(){
	leg.release();
}
class Leg{
	Seesaw _thighStart, _thighEnd;
	Seesaw _calfStart, _calfhEnd;

	Leg(){
		float kneeX = 400, kneeY = 240;
		_thighStart = new Seesaw(490, 250, new Gctr(490, 230), new Gctr(490, 270));
		_thighEnd = new Seesaw(kneeX, kneeY, new Gctr(400, 225), new Gctr(400, 255));
		_calfStart = new Seesaw(kneeX, kneeY, new Gctr(400, 225), new Gctr(400, 255));
		_calfEnd = new Seesaw(370, 300, new Gctr(360, 300), new Gctr(380, 300));
	}

	void grab(){
		_thighStart.grb();
		_thighEnd.grb();
		_calfStart.grb();
		_calfEnd.grb();
	}
	void release(){
		_thighStart.rls();
		_thighEnd.rls();
		_calfStart.rls();
		_calfEnd.rls();
	}
	void update(){
		_thighStart.upd();
		_thighEnd.upd();
		_calfStart.upd();
		_calfEnd.upd();
	}
	void draw(){
		stroke(204,102,0);
		line(_thighStart.x, _thighStart.y, _thighEnd.x, _thighEnd.y);
		stroke(0, 0, 0);
		line(_thighStart._e1.x, _thighStart._e1.y, _thighEnd._e1.x, _thighEnd._e1.y);
		line(_thighStart._e2.x, _thighStart._e2.y, _thighEnd._e2.x, _thighEnd._e2.y);
		
		stroke(204,102,0);
		line(_calfStart.x, _calfStart.y, _calfEnd.x, _calfEnd.y);
		stroke(0, 0, 0);
		line(_calfStart._e1.x, _calfStart._e1.y, _calfEnd._e1.x, _calfEnd._e1.y);
		line(_calfStart._e2.x, _calfStart._e2.y, _calfEnd._e2.x, _calfEnd._e2.y);
	}
}