function Point(_x, _y){
  this.x = _x;
  this.y = _y;
}

var points;
var dragged;
var dragThreshold;
var controlPointSize;
var lerpPointSize;
var iter;
var radius;
var rotationOffset;
var rings;
var time;

function setup(){
	points = [new Point(100, 50), new Point(200, 500), new Point(400, 50)];
	dragged = [false, false, false];
	dragThreshold = 10;
	controlPointSize = 10;
	lerpPointSize = 1;
	iter = 100;
	radius = 250;
	rotationOffset = PI*random()/Math.ceil(random()*5);
	rings = 1000/Math.ceil(random()*10);
	time = 0;
	smooth();
	createCanvas(window.innerWidth, window.innerHeight);
	fill(255, 255, 255, 200);
	//stroke(0, 0, 0);
	noStroke();
	background(0);
	textSize(12);
	textAlign(CENTER);
	textStyle(ITALIC);
}

function draw(){
	//background(0);
	time = millis()*10-10;
	for(var i = 0; i < 2; i++){
		time++;
		points[0].x = (width/2)+cos(time/1000+rotationOffset)*radius;
		points[0].y = (height/2)+sin(time/1000+rotationOffset)*radius;
		points[1].x = (width/2)+cos(time/1000+HALF_PI)*(radius+radius*sin(time/(1000+rings)));
		points[1].y = (height/2)+sin(time/1000+HALF_PI)*(radius+radius*sin(time/(1000+rings)));
		points[2].x = (width/2)+cos(time/1000+PI)*radius;
		points[2].y = (height/2)+sin(time/1000+PI)*radius;
		for(var i = 0; i < points.length; i++){
			//ellipse(points[i].x, points[i].y, controlPointSize, controlPointSize);
			if(dragged[i]){
				points[i].x = mouseX;
				points[i].y = mouseY;
			}
			//text("P"+(i+1)+": ("+points[i].x+", "+points[i].y+")", points[i].x, points[i].y-10);
		}

		for(var i = 0; i < points.length-2; i++){
			for(var j = 0; j < iter; j++){
				j = Math.random()*iter;
				var p1 = new Point(points[i].x+(points[i+1].x-points[i].x)*(j+1)/iter,
				points[i].y+(points[i+1].y-points[i].y)*(j+1)/iter);
				var p2 = new Point(points[i+1].x+(points[i+2].x-points[i+1].x)*(j+1)/iter,
				points[i+1].y+(points[i+2].y-points[i+1].y)*(j+1)/iter);
				fill(255, 255, 255, 20*gaussian((j/iter)/0.5-1));
				ellipse(p1.x+(p2.x-p1.x)*(j+1)/iter, p1.y+(p2.y-p1.y)*(j+1)/iter, lerpPointSize, lerpPointSize);
			}
		}
	}
}

function mousePressed(){
	for(var i = 0; i < points.length; i++){
		if(distance(mouseX, mouseY, points[i].x, points[i].y) < dragThreshold){
			dragged[i] = true;
		}
	}
}

function mouseReleased(){
	for(var i = 0; i < dragged.length; i++){
		dragged[i] = false;
	}
}

function distance(x1, y1, x2, y2){
	return sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}

function gaussian(x){
	var s = 0.3;
	var e = 2.71828182845;
	return 1/(sqrt(TWO_PI)*s)*Math.pow(e, -(x*x)/(2*s*s))+(sin(10*PI*x)*0.5+0.5);
}
