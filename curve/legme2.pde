void setup(){size(500, 500); frameRate(10);}

Log log = new Log();
void draw(){
	background(#cccccc);
	log.upd();
	log.drw();
	//translate(100, 100);
}
void mousePressed(){
	log.grb();
}
void mouseReleased(){
	log.rls();
}
class Log{
	Gctr end1 = new Gctr(0,0);
	Gctr end2 = new Gctr(300,300);
	Gctr outer = new Gctr(150, 100);
	PVector prjOtr = new PVector(0, 0);

	void grb(){
		end1.grb();
		end2.grb();
		outer.grb();
	}
	void rls(){
		end1.rls();
		end2.rls();
		outer.rls();
	}
	void upd(){
		end1.upd();
		end2.upd();
		outer.upd();
		float[] xy = Utl.prj2(end1.x, end1.y, end2.x, end2.y, outer.x, outer.y);
		prjOtr.x = xy[0]; prjOtr.y = xy[1];
	}
	void drw(){
		stroke(204,102,0);
		line(end1.x, end1.y, end2.x, end2.y);
		ellipse(outer.x, outer.y, 5, 5);

		line(outer.x, outer.y, prjOtr.x, prjOtr.y);
	}
}