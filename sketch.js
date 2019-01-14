function setup(){
	var canvas=createCanvas(500, 500);
	canvas.parent("snek");
	snek=new snake();
	//snek.setLength(l);
	yum=new food();
	yum.generate();
	//frameRate(document.getElementById("rate").value);
	frameRate(25);
	death=false;
}
var snek;
var yum;
var death;
function draw() {
	background(51);
	snek.update();
	snek.show();
	if (death){
	alert("lol u died");
	death();
	}
	yum.show();
	pressed();
	eat();
}
function pressed(){
	if(keyCode===38&&(snek.getLength()==1||(snek.getySpeed()!=10))){/*Up*/
		snek.speed(0,-10);
	}
	else if(keyCode===40&&(snek.getLength()==1||(snek.getySpeed()!=-10))){/*Down*/
		snek.speed(0,10);
	}
	else if(keyCode===37&&(snek.getLength()==1||(snek.getxSpeed()!=10))){/*Left*/
		snek.speed(-10,0);
	}
	else if(keyCode===39&&(snek.getLength()==1||(snek.getxSpeed()!=-10))){/*Right*/
		snek.speed(10,0);
	}
}
function eat(){
	if(snek.getX()==yum.getX() &&
snek.getY()==yum.getY()){
	yum.generate();
	snek.grow();
}
}
function snake(){
	this.x=0;
	this.y=0;
	this.xSpeed=0;
	this.ySpeed=0;
	this.length=1;
	this.xloc=[];
	this.yloc=[];
	this.update=function(){
		this.xloc.unshift(this.x);
		this.yloc.unshift(this.y);
		//*console.log(this.xloc.toString());
		this.x=this.x+this.xSpeed;
		this.y=this.y+this.ySpeed;
		this.x=constrain(this.x,0,width-10);
		this.y=constrain(this.y,0,height-10);
		for(var i=1; i<=this.length; i=i+1){
			if(this.x==this.xloc[i-1]&&this.y==this.yloc[i-1]
				&&(this.xSpeed!=0||this.ySpeed!=0))
			death=true;
		}
	}
	this.show=function(){
		for(var i=1; i<this.length; i=i+1){
			fill(255);
			rect(this.xloc[i-1],this.yloc[i-1],10,10);
		}
		fill(255);
		rect(this.x,this.y,10,10);

	}
	this.speed=function(xx,yy){
		this.xSpeed=xx;
		this.ySpeed=yy;
	}
	this.getX=function(){return this.x;}
	this.getY=function(){return this.y;}
	this.getxSpeed=function(){return this.xSpeed;}
	this.getySpeed=function(){return this.ySpeed;}
	this.getLength=function(){return this.length;}
	//this.setLength=function(l){this.length=l;}
	this.grow=function(){this.length=this.length+4;}
}
function food(){
		this.x=10*Math.floor(Math.random()*(width/10));
		this.y=10*Math.floor(Math.random()*(height/10));
		this.getX=function(){return this.x;}
		this.getY=function(){return this.y;}
		this.generate=function(){
		this.color=color(Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256));
			this.x=10*Math.floor(Math.random()*(width/10));
			this.y=10*Math.floor(Math.random()*(height/10));
			rect(this.x,this.y,10,10);
		}
		this.show=function(){
			fill(this.color);
			rect(this.x,this.y,10,10);
		}
}
function death(){
	setInterval((function() {
    return;
	}), 5000);
}
