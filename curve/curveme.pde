Curveme curveme = new Curveme();
void setup(){
	//size( window.innerWidth, window.innerHeight );
	size(500, 500);
	frameRate(10);
}

void draw(){
	background(#cccccc);
	curveme.update();
	curveme.draw();
}
void mousePressed(){
	curveme.grab();
}
void mouseReleased(){
	curveme.release();
}
class Curveme{
	ArrayList _pAr = new ArrayList();

	Curveme(){
		Seesaw p1 = new Seesaw(180,80,null,new Gctr(100,90));
		Seesaw p2 = new Seesaw(80,250,60,190,100,300);
		Seesaw p3 = new Seesaw(270,300,new Gctr(170,350),null);
		_pAr.add(p1); _pAr.add(p2); _pAr.add(p3);
	}

	void grab(){
		for(Seesaw gs : _pAr) gs.grb();
	}
	void release(){
		for(Seesaw gs : _pAr) gs.rls();
	}
	void update(){
		for(Seesaw gs : _pAr) gs.upd();
	} 
	void draw(){
		fill(0, 0, 0);
		noFill();

		beginShape();
		Seesaw p1 = (Seesaw)_pAr.get(0);
		vertex(p1.x, p1.y); // first point
		for(int i = 1; i < _pAr.size(); i++){
			Seesaw prvS = (Seesaw)_pAr.get(i - 1);
			Seesaw curS = (Seesaw)_pAr.get(i);
			bezierVertex(prvS._e2.x, prvS._e2.y, curS._e1.x, curS._e1.y, curS.x, curS.y);
		}
		endShape();

		for(Seesaw gs : _pAr) gs.shw();
	}
}
