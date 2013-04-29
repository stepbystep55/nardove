class Fish extends Boid {
	
	Flagellum body;
	Flagellum tailR;
	Flagellum tailL;
	
	Flagellum finR;
	Flagellum finL;
	
	int[] colors;
	
	int numBodySegments;
	int numTailSegments;
	int numFinSegments;
	
	float bodySizeW;
	float bodySizeH;
	
	float tailSizeW;
	float tailSizeH;
	
	
	
	Fish( int[] _colors, PVector _location, float _maxSpeed, float _maxForce ) {
		super( _location, _maxSpeed, _maxForce );
		
		colors 			= _colors;
		
		numBodySegments = 10;
		bodySizeW		= random( 100, 200 );
		bodySizeH		= bodySizeW * 0.3 + random( 5 );
		
		numTailSegments = 10;
		tailSizeW		= bodySizeW * 0.6;
		tailSizeH		= bodySizeH * 0.25;
		
		body = new Flagellum( bodySizeW, bodySizeH, numBodySegments );
		
		tailR = new Flagellum( tailSizeW, tailSizeH, numTailSegments );
		tailL = new Flagellum( tailSizeW * 0.8, tailSizeH * 0.8, numTailSegments );
		
		numFinSegments = 9;
		finR = new Flagellum( tailSizeW * 0.5, tailSizeH, numFinSegments );
		finL = new Flagellum( tailSizeW * 0.5, tailSizeH, numFinSegments );
	}
	
	
	void update() {
		super.update();
		super.checkBorders( bodySizeW );
		super.wander();

		
		body.muscleFreq = norm( super.velocity.mag(), 0, 1 ) * 0.05;
		
		// Align body to velocity
		body.theta 	= super.velocity.heading2D();
		body.swim();
		
		
		float diffX 		= body.spine[numBodySegments-1][0] - body.spine[numBodySegments-2][0];
		float diffY 		= body.spine[numBodySegments-1][1] - body.spine[numBodySegments-2][1];
		float angle			= atan2( diffY, diffX );
		
		tailR.muscleFreq 	= norm( super.velocity.mag(), 0, 1 ) * 0.08;
		tailR.theta 		= angle + (PI * 0.95);
		tailR.swim();
		
		tailL.muscleFreq 	= norm( super.velocity.mag(), 0, 1 ) * 0.08;
		tailL.theta 		= angle + (PI * 1.05);
		tailL.swim();
		
		finR.muscleFreq 	= norm( super.velocity.mag(), 0, 1 ) * 0.04;
		finR.swim();
		
		finL.muscleFreq 	= norm( super.velocity.mag(), 0, 1 ) * 0.04;
		finL.swim();
	}
	
	
	void render() {
		super.debugRender();
		
		noStroke();
		
		// render fins
		PVector finLLocation = new PVector( super.location.x + body.spine[3][0], super.location.y + body.spine[3][1] );
		PVector finRLocation = new PVector( super.location.x + body.spine[3][0], super.location.y + body.spine[3][1] );
		
		fill( colors[0] );
		renderFin( finR, finLLocation,  bodySizeH * 0.5,  1 );
		renderFin( finL, finRLocation, -bodySizeH * 0.5, -1 );
		
		
		// render body
		fill( colors[2] );
		renderBody( body, super.location, 1.1, 0.1 );
		
		fill( colors[1] );
		renderBody( body, super.location, 0.8, 0.15 );
		
		fill( colors[0] );
		renderBody( body, super.location, 0.5, 0.25 );
		
		
		// render tails
		PVector tailLocation = new PVector( super.location.x + body.spine[numBodySegments - 1][0], super.location.y + body.spine[numBodySegments - 1][1] );
		
		fill( colors[0] );
		renderTail( tailR, tailLocation, 0.75 );
		renderTail( tailL, tailLocation, 0.75 );
		
		
		// render head
		PVector headLocation = new PVector( super.location.x + body.spine[1][0], super.location.y + body.spine[1][1] );
		
		renderHead( headLocation, bodySizeW * 0.1, bodySizeW * 0.06 );
		body.debugRender();
	}
	
	
	void renderHead( PVector _location, float _eyeSize, float _eyeDist ) {
		float diffX = body.spine[2][0] - body.spine[1][0];
		float diffY = body.spine[2][1] - body.spine[1][1];
		float angle	= atan2( diffY, diffX );
		
		pushMatrix();
		translate( _location.x, _location.y );
		rotate( angle );
		
		fill( colors[0] );
		ellipse( 0, _eyeDist, _eyeSize, _eyeSize );
		
		fill( colors[1] );
		ellipse( -3, _eyeDist, _eyeSize * 0.35, _eyeSize * 0.35 );
		
		popMatrix();
		
		
		pushMatrix();
		translate( _location.x, _location.y );
		rotate( angle );
		
		fill( colors[0] );
		ellipse( 0, -_eyeDist, _eyeSize, _eyeSize );
		
		fill( colors[1] );
		ellipse( -3, -_eyeDist, _eyeSize * 0.35, _eyeSize * 0.35 );
		
		popMatrix();
	}
	
	
	void renderBody( Flagellum _flag, PVector _location, float _sizeOffsetA, float _sizeOffsetB ) {
		pushMatrix();
		translate( _location.x, _location.y );
		beginShape( TRIANGLE_STRIP );
		for ( int n = 0; n < _flag.numNodes; n++ ) {
			float dx, dy;
			if ( n == 0 ) {
				dx = _flag.spine[1][0] - _flag.spine[0][0];
				dy = _flag.spine[1][1] - _flag.spine[0][1];
			}
			else {
				dx = _flag.spine[n][0] - _flag.spine[n - 1][0];
				dy = _flag.spine[n][1] - _flag.spine[n - 1][1];
			}
			
			float theta = -atan2( dy, dx );
			
			float t 	= n / float(_flag.numNodes - 1);
			float b		= bezierPoint( 3, bodySizeH * _sizeOffsetA, bodySizeH * _sizeOffsetB, 2, t );
			
			float x1	= _flag.spine[n][0] - sin( theta ) * b;
			float y1 	= _flag.spine[n][1] - cos( theta ) * b;
			
			float x2 	= _flag.spine[n][0] + sin( theta ) * b;
			float y2 	= _flag.spine[n][1] + cos( theta ) * b;
			
			vertex( x1, y1 );
			vertex( x2, y2 );
		}
		endShape();
		
		popMatrix();
	}
	
	
	void renderTail( Flagellum _flag, PVector _location, float _sizeOffset ) {
		pushMatrix();
		translate( _location.x, _location.y );
		
		beginShape( TRIANGLE_STRIP );
		for ( int n = 0; n < _flag.numNodes; n++ ) {
			float dx, dy;
			if ( n == 0 ) {
				dx = _flag.spine[1][0] - _flag.spine[0][0];
				dy = _flag.spine[1][1] - _flag.spine[0][1];
			}
			else {
				dx = _flag.spine[n][0] - _flag.spine[n - 1][0];
				dy = _flag.spine[n][1] - _flag.spine[n - 1][1];
			}
			
			float theta = -atan2( dy, dx );
			
			float t 	= n / float(_flag.numNodes - 1);
			float b		= bezierPoint( 2, _flag.sizeH, _flag.sizeH * _sizeOffset, 0, t );
			
			float x1	= _flag.spine[n][0] - sin( theta ) * b;
			float y1 	= _flag.spine[n][1] - cos( theta ) * b;
			
			float x2 	= _flag.spine[n][0] + sin( theta ) * b;
			float y2 	= _flag.spine[n][1] + cos( theta ) * b;
			
			vertex( x1, y1 );
			vertex( x2, y2 );
		}
		endShape();
		
		popMatrix();
	}
	
	
	void renderFin( Flagellum _flag, PVector _location, float _posOffset, int _flip ) {
		float diffX = body.spine[2][0] - body.spine[1][0];
		float diffY = body.spine[2][1] - body.spine[1][1];
		float angle	= atan2( diffY, diffX );
		
		pushMatrix();
		translate( _location.x, _location.y );
		rotate( angle );
		
		pushMatrix();
		translate( 0, _posOffset );
		
		beginShape( TRIANGLE_STRIP );
		for ( int n = 0; n < _flag.numNodes; n++ ) {
			float dx, dy;
			if ( n == 0 ) {
				dx = _flag.spine[1][0] - _flag.spine[0][0];
				dy = _flag.spine[1][1] - _flag.spine[0][1];
			}
			else {
				dx = _flag.spine[n][0] - _flag.spine[n - 1][0];
				dy = _flag.spine[n][1] - _flag.spine[n - 1][1];
			}
			
			float theta = -atan2( dy, dx );
			
			float t 	= n / float(_flag.numNodes - 1);
			float b		= bezierPoint( 0, _flip * _flag.sizeH * 0.75, _flip * _flag.sizeH * 0.75, 0, t );
			float v		= bezierPoint( 0, _flip * _flag.sizeH * 0.05, _flip * _flag.sizeH * 0.65, 0, t );
			
			float x1	= _flag.spine[n][0] - sin( theta ) * v;
			float y1 	= _flag.spine[n][1] - cos( theta ) * v;
			
			float x2 	= _flag.spine[n][0] + sin( theta ) * b;
			float y2 	= _flag.spine[n][1] + cos( theta ) * b;
			
			vertex( x1, y1 );
			vertex( x2, y2 );
		}
		endShape();
		
		popMatrix();
		
		popMatrix();
	}
}
